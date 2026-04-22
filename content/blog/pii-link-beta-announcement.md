---
title: "I Built a Time Tracking App for Myself — It's Open for Beta"
slug: pii-link-beta-announcement
excerpt: >-
  I got tired of reconciling tools every time I needed to invoice someone. So I built Pii.link — one place for clients, projects, time, and expenses. I've been using it for my own work for a few months and I'm opening up a few free beta spots.
author: Jeff Knowles Jr
tags:
  - Freelance
  - Tools
  - Side Project
  - Firebase
  - Next.js
readingTime: 3
featuredImage: '/images/blog/pii-link-beta-featured.jpg'
status: published
datePublished: '2026-03-07'
dateModified: '2026-03-10'
description: >-
  Pii.link is a lightweight freelancer tool — time tracking, client management, invoicing, and expenses in one place. Built on Firebase and Next.js. Beta is open with a few free spots.
keywords:
  - Pii.link
  - freelancer tools
  - time tracking
  - Firebase
  - Next.js
  - business OS
ogTitle: "I Built a Freelancer Business OS — And Now I'm Opening It to Beta"
ogDescription: >-
  One login, one place for clients, projects, time, and expenses. Pii.link is live and 5 free beta spots are open.
ogImage: '/images/blog/pii-link-beta-featured.jpg'
ogType: article
twitterCard: summary_large_image
twitterCreator: '@jeffknowlesjr'
articleSection: Tools
articleAuthor: Jeff Knowles Jr
---

# I Built a Time Tracking App for Myself — It's Open for Beta

**Published:** March 7, 2026 · Updated March 10, 2026  
**Author:** Jeff Knowles Jr — [JKJR Digital Development](https://jkjrdev.com)

---

I got tired of reconciling tools every time I needed to invoice someone. A spreadsheet for clients, something for time, something else for expenses, email for everything else. Every month I'd miss something.

So I built [Pii.link](https://pii.link) — one place for clients, projects, time tracking, and expenses. I've been using it for my own work for a few months. It's not perfect, but it's useful, and I'm opening up a few free beta spots.

---

## What it does

- **Floating timer** — persists across page navigation, syncs across devices in real time via Firestore. Start it on your laptop, check your phone, it's still running.
- **Clients and projects** — create, edit, archive. Projects link to clients, with billing type (hourly, retainer, fixed) and per-client rates.
- **Timesheets** — manual entry, weekly view, and a basic analytics dashboard. Billable hours, revenue, utilization rate, 14-day chart.
- **Invoicing** — line items, tax, status tracking (draft → sent → paid). PDF export is still on the list.
- **Expenses** — log and categorize against clients and projects. Monthly totals feed into your profit margin view.
- **Data isolation** — each account gets its own Firestore path. No shared tables, no analytics, no ads.

---

## What isn't done yet

- No invoice PDF export (the invoicing workflow is built, download is missing)
- No native mobile app (PWA works on mobile, React Native prototype is shelved)

---

## Tech notes (for developers)

Next.js 15 static export on Firebase Hosting. Firestore for data and real-time sync. Material UI v7. Multi-tenant architecture where `tenantId = userId` — all data lives under `tenants/{userId}/...` and Firestore rules enforce isolation at the database level.

No servers. No devops overhead.

---

## Beta spots

There are a few free spots open. No waitlist, accounts provision instantly.

**[Sign up at pii.link/auth/register](https://pii.link/auth/register)**

If you're a freelancer looking to consolidate tools, or a developer curious about the stack, I'd genuinely appreciate feedback. Find me on [LinkedIn](https://linkedin.com) or through [jkjrdev.com](https://jkjrdev.com).

---

*Built by [JKJR Digital Development](https://jkjrdev.com)*

