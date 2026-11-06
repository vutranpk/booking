-- Private storage for per-engineer Google OAuth connections and event mappings.
CREATE TABLE IF NOT EXISTS public.google_calendar_connections (
  tech_id TEXT PRIMARY KEY REFERENCES public.technicians(tech_id) ON DELETE CASCADE,
  google_email TEXT NOT NULL,
  encrypted_refresh_token TEXT NOT NULL,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.google_calendar_events (
  booking_id TEXT PRIMARY KEY REFERENCES public.bookings(booking_id) ON DELETE CASCADE,
  tech_id TEXT NOT NULL REFERENCES public.technicians(tech_id) ON DELETE CASCADE,
  google_event_id TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.google_calendar_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_calendar_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.google_calendar_connections, public.google_calendar_events FROM PUBLIC, anon, authenticated;
