# XT CORP

Supabase-backed business panel for clients, panel keys, payments, invoices, reports and trash management.

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor** and run [`supabase-schema.sql`](supabase-schema.sql).
3. Enable Email/Password authentication in **Authentication > Providers**.
4. Copy the project URL and anon key into [`supabase-config.js`](supabase-config.js).
5. Open `index.html` locally or deploy the folder to Vercel.

The browser only uses the public anon key. Row Level Security ensures each signed-in user can access only their own client records.

## Vercel deployment

Import this folder as a GitHub repository in Vercel. No build command is required because this is a static site. Set the deployed site URL in Supabase **Authentication > URL Configuration** as the Site URL and add it to the redirect URL list.

## Data model

Client and trash records are stored in the `public.clients` table as JSONB payloads. UI preferences remain local to the browser, while business data is synced to PostgreSQL after authentication.
