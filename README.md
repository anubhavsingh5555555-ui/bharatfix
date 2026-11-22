# BharatFix AI

A responsive Next.js starter website for the BharatFix AI civic issue reporting concept.

## Included in this starter

- Responsive landing page and civic admin dashboard
- Demo issue statistics and sample civic complaints
- Search and status filters
- New issue report form with optional image filename selection
- Demo status updates (Pending / In Progress / Resolved)
- Civic workflow explanation section
- Vercel-ready Next.js project

## Important demo limitations

This version is a **frontend prototype**. Reports and status changes are held in browser memory and reset when the page is refreshed. The image selector currently records the selected filename only; it does not upload/store the image. AI categorization, duplicate matching, geolocation, authentication, database storage, and real admin permissions are not connected yet.

For a production version, connect:
1. Supabase or another database for users, reports, and issue groups.
2. Object storage for uploaded photos.
3. An image classification API/model for AI category suggestions.
4. Geocoding/maps and a distance + image similarity pipeline for duplicate detection.
5. Authentication and role-based admin access.

## Run locally

Install Node.js 18.17 or newer, then:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy with GitHub + Vercel

1. Create a new GitHub repository named `bharatfix-ai`.
2. Upload all files and folders from this project to the repository root.
3. Sign in to Vercel with your GitHub account.
4. Select **Add New → Project**, then import `bharatfix-ai`.
5. Keep the detected Next.js settings and click **Deploy**.
6. Vercel will provide a public `.vercel.app` URL.

Every new push to the connected GitHub branch can trigger a new deployment.

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Lucide icons
- CSS
