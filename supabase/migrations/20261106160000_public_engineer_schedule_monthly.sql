-- Replace the initial public report function with an all-engineer monthly view.
-- Exposes only engineer identity/avatar, schedule dates/times and approval status.
DROP FUNCTION IF EXISTS public.get_public_engineer_schedule_report(DATE, DATE);
CREATE FUNCTION public.get_public_engineer_schedule_report(p_from DATE, p_to DATE)
RETURNS TABLE (
  tech_id TEXT,
  engineer_name TEXT,
  engineer_avatar TEXT,
  booking_date DATE,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  status TEXT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT
    t.tech_id,
    t.name,
    t.avatar,
    b.booking_date,
    b.end_date,
    b.start_time,
    b.end_time,
    b.status
  FROM public.technicians AS t
  LEFT JOIN public.bookings AS b
    ON b.tech_id = t.tech_id
    AND b.status IN ('APPROVED', 'PENDING')
    AND b.booking_date <= p_to
    AND b.end_date >= p_from
  WHERE p_from IS NOT NULL
    AND p_to IS NOT NULL
    AND p_from = date_trunc('month', p_from)::date
    AND p_to = (date_trunc('month', p_from) + INTERVAL '1 month - 1 day')::date
    AND t.is_active IS TRUE
  ORDER BY b.booking_date NULLS LAST, b.start_time NULLS LAST, t.name;
$$;
REVOKE ALL ON FUNCTION public.get_public_engineer_schedule_report(DATE, DATE) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_engineer_schedule_report(DATE, DATE) TO anon, authenticated;
