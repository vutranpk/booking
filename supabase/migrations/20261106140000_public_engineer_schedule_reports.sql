-- Public read-only schedule reporting. This function returns only approved schedule fields;
-- it never exposes booking title, location, requester details, or notes.
CREATE OR REPLACE FUNCTION public.get_public_engineer_schedule_report(
  p_from DATE,
  p_to DATE
)
RETURNS TABLE (
  tech_id TEXT,
  engineer_name TEXT,
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
    b.booking_date,
    b.end_date,
    b.start_time,
    b.end_time,
    b.status
  FROM public.bookings AS b
  JOIN public.technicians AS t ON t.tech_id = b.tech_id
  WHERE p_from IS NOT NULL
    AND p_to IS NOT NULL
    AND p_from <= p_to
    AND p_to <= p_from + 89
    AND t.is_active IS TRUE
    AND b.status = 'APPROVED'
    AND b.booking_date <= p_to
    AND b.end_date >= p_from
  ORDER BY b.booking_date, b.start_time, t.name;
$$;

REVOKE ALL ON FUNCTION public.get_public_engineer_schedule_report(DATE, DATE) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_engineer_schedule_report(DATE, DATE) TO anon, authenticated;
