// Supabase Client Configuration & Core Production Connector
const SupabaseConfig = {
  url: 'https://jygcxjkbcsrjmxvbtvqs.supabase.co',
  publishableKey: 'sb_publishable_YJjFvGFDt0hYwwV5gTXqRg_WxV9mjZl',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5Z2N4amtiY3Nyam14dmJ0dnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2NTg1MzgsImV4cCI6MjEwOTIzNDUzOH0._bQkNNmagv1r8MngvlU9tDwP2OvXtDhuVdUDrP6RDDE',
  client: null,
  isLive: false,

  init() {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      try {
        // Standard JWT anonKey is required for Supabase Realtime WebSocket authentication
        const activeKey = this.anonKey || this.publishableKey;
        this.client = window.supabase.createClient(this.url, activeKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true
          },
          realtime: {
            params: {
              eventsPerSecond: 10
            }
          }
        });
        this.isLive = true;
        console.log('✅ Supabase Production Client initialized successfully.');

        // Keep Realtime socket synchronized with authenticated user token
        if (this.client.auth && this.client.realtime) {
          this.client.auth.onAuthStateChange((event, session) => {
            if (session?.access_token) {
              this.client.realtime.setAuth(session.access_token);
            }
          });
          this.client.auth.getSession().then(({ data: { session } = {} }) => {
            if (session?.access_token) {
              this.client.realtime.setAuth(session.access_token);
            }
          }).catch(() => {});
        }
      } catch (err) {
        console.warn('⚠️ Primary Supabase init failed, attempting fallback:', err);
        try {
          this.client = window.supabase.createClient(this.url, this.anonKey);
          this.isLive = true;
        } catch (fallbackErr) {
          console.error('❌ Supabase Client initialization failed completely:', fallbackErr);
        }
      }
    } else {
      console.warn('⚠️ Supabase JS SDK not detected on window.');
    }
    return this.client;
  },

  async setRealtimeAuth(token) {
    const client = this.getClient();
    if (!client || !client.realtime || !token) return;
    try {
      await client.realtime.setAuth(token);
      console.log('⚡ Realtime auth token synchronized.');
    } catch (e) {
      console.warn('Realtime setAuth warning:', e);
    }
  },

  getClient() {
    if (!this.client) {
      this.init();
    }
    return this.client;
  },

  async ping() {
    const client = this.getClient();
    if (!client) return { ok: false, error: 'No client' };
    try {
      const { data, error } = await client.from('technicians').select('count', { count: 'exact', head: true });
      return { ok: !error, error };
    } catch (e) {
      return { ok: false, error: e };
    }
  }
};

window.SupabaseConfig = SupabaseConfig;
