/**
 * Villano.ai - Supabase Client (Frontend)
 * Uses anon key only — for leads + events (insert-only via RLS)
 */

const SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY'
};

/**
 * Lightweight Supabase REST client (no SDK dependency)
 * Only supports INSERT operations via anon key
 */
const SupabaseClient = {
  _getSessionId() {
    let sid = sessionStorage.getItem('villano_session');
    if (!sid) {
      sid = crypto.randomUUID ? crypto.randomUUID() :
        'xxxx-xxxx-xxxx'.replace(/x/g, () => Math.random().toString(16)[2]);
      sessionStorage.setItem('villano_session', sid);
    }
    return sid;
  },

  async _insert(table, data) {
    if (SUPABASE_CONFIG.url === 'YOUR_SUPABASE_URL') {
      console.warn('[Supabase] Not configured — skipping insert to', table);
      return { ok: false, error: 'not_configured' };
    }

    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`[Supabase] Insert to ${table} failed:`, errText);
        return { ok: false, error: errText };
      }

      return { ok: true };
    } catch (err) {
      console.error(`[Supabase] Network error inserting to ${table}:`, err);
      return { ok: false, error: err.message };
    }
  },

  /**
   * Capture an email lead
   */
  async captureEmail(email) {
    return this._insert('leads', {
      email: email.trim().toLowerCase(),
      source: 'landing',
      user_agent: navigator.userAgent
    });
  },

  /**
   * Track an analytics event (fire-and-forget)
   */
  trackEvent(type, metadata = {}) {
    this._insert('events', {
      event_type: type,
      session_id: this._getSessionId(),
      metadata: metadata
    });
  }
};

// Make globally available
window.SupabaseClient = SupabaseClient;
