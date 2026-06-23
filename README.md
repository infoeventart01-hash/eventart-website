# EventArt Luxury Website

A React + Vite website for EventArt, including local photo galleries, a Supabase-ready admin dashboard, and an optional Instagram feed.

## Run Locally

1. Install Node.js from https://nodejs.org if needed.
2. Open PowerShell in this project folder:

~~~powershell
cd "C:\Users\marit\Documents\Codex\2026-06-20\home-headline-luxury-event-design-coordination"
~~~

3. Install dependencies:

~~~powershell
corepack enable
pnpm install
~~~

4. Start the website:

~~~powershell
pnpm dev
~~~

Open the local address Vite prints, usually http://localhost:5173.

## Add Your EventArt Photos

1. Press Windows + E to open File Explorer.
2. Paste one of these paths into File Explorer's address bar.
3. Copy your photo into the matching folder.
4. Refresh the website.

~~~text
public/images/weddings
public/images/birthdays
public/images/baby-showers
public/images/corporate
public/images/signage
~~~

The gallery displays the JPG/JPEG filenames listed in src/data/siteContent.js.

Starting filenames:

~~~text
wedding-01.jpg
birthday-01.jpg
baby-shower-01.jpeg
corporate-01.jpg
signage-01.jpg
~~~

If a listed photo does not exist yet, the gallery shows a luxury placeholder instead of a broken image.

## Edit Website Content

Edit text, services, package names, testimonials, gallery file lists, and image fallbacks in:

~~~text
src/data/siteContent.js
~~~

## Optional Supabase Setup

Supabase is optional. Without it, the website and local photo galleries work normally.

1. Create a Supabase project.
2. Copy .env.example to .env:

~~~powershell
Copy-Item .env.example .env
~~~

3. Add your Supabase URL and anon key to .env.
4. In the Supabase SQL Editor, run supabase/schema.sql.
5. Create an admin user in Authentication > Users.
6. Restart pnpm dev, then open the Admin area on the website.

The admin dashboard can upload, organize, and delete additional portfolio photos.

## Make The Contact Form Send Email

This project uses Web3Forms. The access key is already configured locally in the ignored .env file, so the form can send inquiries to the email address connected to your Web3Forms account.

1. Go to https://web3forms.com and create a free account.
2. Create or verify infoeventart01@gmail.com as the destination inbox.
3. In the Web3Forms dashboard, confirm that your access key is associated with that inbox.
4. The local .env file contains:

~~~text
VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit
VITE_CONTACT_ACCESS_KEY=YOUR_WEB3FORMS_ACCESS_KEY
~~~

5. Restart the development server with pnpm dev after changing .env.

For GitHub Pages, add VITE_CONTACT_ENDPOINT and VITE_CONTACT_ACCESS_KEY as repository secrets in Settings > Secrets and variables > Actions. Use the Web3Forms endpoint and access key.

## Build For Production

Run this before publishing:

~~~powershell
pnpm build
~~~

The deployable website files are created in dist.

## Push To GitHub

1. Sign in to GitHub.
2. Select New repository.
3. Name it eventart-website.
4. Leave Add a README file unchecked.
5. Select Create repository.
6. In PowerShell, run these commands. Replace YOUR-GITHUB-USERNAME with your actual GitHub username:

~~~powershell
cd "C:\Users\marit\Documents\Codex\2026-06-20\home-headline-luxury-event-design-coordination"
git init
git add .
git commit -m "Initial EventArt website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/eventart-website.git
git push -u origin main
~~~

## Deploy To GitHub Pages

The project includes a GitHub Actions deployment workflow.

1. Open the EventArt repository on GitHub.
2. Select Settings > Pages.
3. Under Build and deployment, choose GitHub Actions.
4. The website will publish after the main branch is pushed.

For Supabase on the published website, add these as repository secrets in Settings > Secrets and variables > Actions:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_SUPABASE_PORTFOLIO_BUCKET
- VITE_INSTAGRAM_FEED_ENDPOINT (optional)

The Instagram Edge Function setup remains in supabase/functions/instagram-feed.
