# NAVEEN R

Personal AI engineering, educational video production and technology portfolio: explainer videos, promo reels, AI projects, skills, workflow and contact. Built with Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion and Lucide.

**Ideas Engineered. Intelligence Created.**

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

## Add an educational video

The site only shows videos whose MP4 file exists, so nothing broken is ever linked.

1. Copy the MP4 to `public/videos/explainers/`.
2. Optionally copy a thumbnail to `public/thumbnails/explainers/`. A placeholder is shown without one.
3. Add an entry to `src/data/videos.ts`. The file contains an example entry in a comment.

Class, subject, concept, duration, language and creation date are all set in that entry. The filters on the Videos page use them.

## Add a promo reel

Promotional and motion-graphics reels live apart from the educational library, on `/promos`.

1. Copy the MP4 to `public/videos/promos/` and a thumbnail to `public/thumbnails/promos/`.
2. Add an entry to `src/data/promos.ts`. A reel stays hidden until its MP4 exists.

## Edit projects

All projects live in `src/data/projects.ts`.

- `status` is `completed`, `experimental` or `in-progress`.
- Add `githubUrl` and `liveDemoUrl` only when real links exist. The buttons appear only for links that are set.
- Screenshots go in `public/images/projects/` and are listed in `screenshots`. The Screenshots section and the overview image appear only once their files exist.

## Profile, skills and workflow

- `src/data/profile.ts`: name, intro, interests, LinkedIn, GitHub, email, optional photo (`photoPath`) and resume (`resumePath`, e.g. `public/documents/resume.pdf`). Empty links are never rendered.
- `src/data/skills.ts`: skill categories.
- `src/data/workflow.ts`: the five production stages.

## Contact form

The form validates input on the client and the server (`src/lib/contact.ts`). Messages are forwarded to a webhook you control, such as a form service or an automation tool that emails you. Set this server-side environment variable:

```bash
CONTACT_WEBHOOK_URL=https://your-webhook.example
```

Until it is set, the API responds with a clear "not connected yet" message instead of pretending the message was sent.

Optionally set the public site URL used for metadata and the sitemap:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Project structure

```
src/
  app/            routes: home, videos, videos/[slug], promos, projects, projects/[slug],
                  skills, workflow, about, contact, api/contact, sitemap, robots, OG image
  components/     layout, hero, video, projects, skills, about, workflow, contact, ui
  data/           videos, projects, profile, skills, workflow (edit these)
  lib/            catalog (server: filters out missing media), filters, contact validation
  types/          VideoItem, ProjectItem, Profile, SkillCategory, WorkflowStep
public/
  videos/explainers, videos/promos, thumbnails/explainers, thumbnails/promos,
  images/profile, images/projects, documents
```

## Deploy

Deploy to Vercel as a standard Next.js project. Set `CONTACT_WEBHOOK_URL` and `NEXT_PUBLIC_SITE_URL` in the project's environment variables.
