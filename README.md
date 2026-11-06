# Booking

K-Workspace technical resource booking and dispatch portal.

## Public schedule and monthly report

Open `public-reports.html` to view active engineers, monthly shifts, approval status, and aggregate counts. This page is read-only. The database function is installed by `supabase/migrations/20261106160000_public_engineer_schedule_monthly.sql`.

## Supabase deployment

Apply the SQL migrations in `supabase/migrations/` to the Supabase project. Deploy the `admin-create-user` and `google-calendar` Edge Functions. Configure Google OAuth secrets and redirect URI as described in [GOOGLE-CALENDAR-SETUP.md](GOOGLE-CALENDAR-SETUP.md). Never commit `.env` files, service-role keys, OAuth secrets, or refresh tokens.
