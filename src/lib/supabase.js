import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase connection with smart normalization
const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
let resolvedUrl = 'https://placeholder-project.supabase.co';

if (rawUrl && !rawUrl.includes('placeholder')) {
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    resolvedUrl = rawUrl;
  } else if (rawUrl.includes('.supabase.co')) {
    resolvedUrl = `https://${rawUrl}`;
  } else {
    // If user provided just the project ref (e.g. kesqtdvbypieonqeizqb)
    resolvedUrl = `https://${rawUrl}.supabase.co`;
  }
}

const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
const resolvedKey = (rawKey && !rawKey.includes('placeholder') && !rawKey.endsWith('...'))
  ? rawKey
  : 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  !rawUrl.includes('placeholder') &&
  rawKey &&
  !rawKey.includes('placeholder') &&
  !rawKey.endsWith('...')
);

// Safe client creation fallback so malformed credentials never crash the UI
function createSafeSupabaseClient() {
  try {
    return createClient(resolvedUrl, resolvedKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  } catch (err) {
    console.warn('Supabase client initialization warning:', err.message);
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithOtp: async () => ({ data: null, error: new Error('Supabase not configured') }),
        verifyOtp: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
        select: () => ({ eq: () => ({ order: async () => ({ data: [], error: null }) }) })
      })
    };
  }
}

// Create and export singleton client instance
export const supabase = createSafeSupabaseClient();

/**
 * -----------------------------------------------------------------------------
 * AUTHENTICATION: LOGIN & OTP VERIFICATION METHODS
 * -----------------------------------------------------------------------------
 */

/**
 * Request OTP via SMS to a phone number.
 * @param {string} phone - International format phone number (e.g., +919876543210 or +12025550123)
 * @param {object} [metadata] - Optional user metadata such as username
 * @returns {Promise<{ data: any, error: any }>}
 */
export async function signInWithOtpPhone(phone, metadata = {}) {
  try {
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
      options: {
        data: metadata
      }
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Verify 6-digit SMS OTP token for phone login.
 * @param {string} phone - International format phone number
 * @param {string} token - 6-digit numeric token
 * @returns {Promise<{ data: any, error: any }>}
 */
export async function verifyOtpPhone(phone, token) {
  try {
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: token.trim(),
      type: 'sms'
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Request OTP or Magic Link via Email.
 * @param {string} email - User email address
 * @param {object} [metadata] - Optional user metadata such as username
 * @returns {Promise<{ data: any, error: any }>}
 */
export async function signInWithOtpEmail(email, metadata = {}) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        shouldCreateUser: true,
        data: metadata
      }
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Verify 6-digit email OTP token (supports both 'email' and 'magiclink' token types).
 * @param {string} email - User email address
 * @param {string} token - 6-digit numeric token
 * @returns {Promise<{ data: any, error: any }>}
 */
export async function verifyOtpEmail(email, token) {
  try {
    const cleanEmail = email.trim();
    const cleanToken = token.trim();

    // First attempt with type 'email'
    let res = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token: cleanToken,
      type: 'email'
    });

    // If initial attempt fails with token mismatch, retry with type 'magiclink'
    if (res.error) {
      const retryRes = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: cleanToken,
        type: 'magiclink'
      });
      if (!retryRes.error) {
        return retryRes;
      }
    }

    return res;
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Sign out current authenticated session.
 * @returns {Promise<{ error: any }>}
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: err };
  }
}

/**
 * Get current session.
 */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Get current user.
 */
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Listen for auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, etc.).
 * @param {function} callback
 * @returns {object} Subscription with unsubscribe()
 */
export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return subscription;
}

/**
 * -----------------------------------------------------------------------------
 * APPLICATION DATABASE ACTIONS (Bookings, Reviews, Specs)
 * -----------------------------------------------------------------------------
 */

/**
 * Save a Studio Booking to Supabase.
 */
export async function createBooking(booking) {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured. Falling back to local state.');
    return { data: { id: 'local-' + Date.now() }, error: null };
  }
  return await supabase.from('bookings').insert([booking]).select().single();
}

/**
 * Submit a Client Telemetry Review to Supabase.
 */
export async function submitReviewToDb(review) {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured. Falling back to local state.');
    return { data: review, error: null };
  }
  return await supabase.from('reviews').insert([review]).select().single();
}

/**
 * Fetch verified reviews from Supabase.
 */
export async function fetchVerifiedReviews() {
  if (!isSupabaseConfigured) return { data: null, error: null };
  return await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'verified')
    .order('created_at', { ascending: false });
}

/**
 * Submit a Client Inquiry / Telemetry Bot chat message.
 */
export async function submitInquiry(inquiry) {
  if (!isSupabaseConfigured) return { data: inquiry, error: null };
  return await supabase.from('inquiries').insert([inquiry]).select().single();
}

