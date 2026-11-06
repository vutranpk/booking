# Booking

K-Workspace technical resource booking and dispatch portal.

## Public schedule and monthly report

Open `public-reports.html` for the monthly engineer calendar and report. It lists active engineers, approved and pending shifts, and summary counts. Selecting a shift opens its title, time, engineer, status, location, and notes. The page is public and read-only; do not place confidential details in these fields. Install the RPC with `supabase/migrations/20261106170000_public_engineer_schedule_monthly_details.sql`.

## Supabase deployment

Apply the SQL migrations in `supabase/migrations/` to the Supabase project. Deploy the `admin-create-user` and `google-calendar` Edge Functions. Configure Google OAuth secrets and redirect URI as described in [GOOGLE-CALENDAR-SETUP.md](GOOGLE-CALENDAR-SETUP.md). Never commit `.env` files, service-role keys, OAuth secrets, or refresh tokens.
