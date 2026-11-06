-- Restrict booking access for technicians without changing permissions for other roles.
-- Technicians can read only their assigned active schedule and cannot insert bookings.
DROP POLICY IF EXISTS "Authenticated users can read bookings" ON public.bookings;
CREATE POLICY "Authenticated users can read bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (
    public.current_user_role() IN ('admin', 'approver', 'requester')
    OR (
      public.current_user_role() = 'technician'
      AND EXISTS (
        SELECT 1
        FROM public.technicians AS t
        WHERE lower(t.email) = lower(auth.jwt() ->> 'email')
          AND t.tech_id = public.bookings.tech_id
          AND t.is_active IS TRUE
      )
    )
  );

-- Restrictive policy layers on top of existing INSERT policies so technicians are denied
-- even if another permissive INSERT policy is present.
DROP POLICY IF EXISTS "Technicians cannot create bookings" ON public.bookings;
CREATE POLICY "Technicians cannot create bookings" ON public.bookings
  AS RESTRICTIVE
  FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() <> 'technician');
