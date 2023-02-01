# Music app

A side-project during my time as an intern at Cloud Nine. A music data platform with the goal of combining features spread across multiple platforms - a good project in the learning sense due to its scalability.

Initially planned basic features:

- Track data and metrics
- Metronome
- Lyrics with auto-scroll functionality

All data comes from Spotify's API and lyrics come from Musixmatch.

## Tech and tools

- Next.js
- TypeScript
- SCSS and CSS modules
- Zustand
- Spotify API
- Musixmatch API
- Vercel
- Figma
- ClickUp

## Learnings

In this project focus has been on a lot more than just writing code - and while I've had to cut corners in some aspects I've tried to run it as close as possible to a real-world project.

I've been able to handle requirements, estimations, planning, ui and ux, tech stack, git workflow, production pipelines, code architecture, performance...and the list could probably go on.

Some of my main learnings so far include:

- Setting up an environment following the AirBnB styleguide, with Eslint, prettier and Husky in order to not cause commit and push issues.
- I've set up a solid path to production following Git flow. Utilising a Vercel pipeline I've been able to, in addition to my local environment, on feature branch and development level before pushing to production.
- The value and challenges of planning and estimation, for anything and everything... I've been using Clickup in order to plan sprints and tasks, while using t-shirt estimates. I've also tried to set up a design system in Figma. While following the AirBnB style guide, and trying to set and follow architectural rules. The main take-away is that when you have these things to lean on, you don't have to spend as much time making decisions as you go - actually being able to focus on solving issues instead of making decisions. However, the process is not straight-forward and its incredibly valueable being in a team setting, rather than on your own for most parts of it.

### Versions

#### 1.0.0

Initial version with basic API integrations

#### 1.1.0

Updated design
Initial auto-scroll functionality
Updated Metronome to work better on mobile
Fixes to Search bar on mobile

### Known bugs and issues

- If idle for ~1h the access token for the Spotify API expires and page needs re-load (priority fix)
- Musixmatch only provide 30% of lyrics without setting up a business plan, unfortunate but the project is primarily for learning purposes anyways :)

### Future priorities

- Update Auto-scroll with settings for scroll speed, as well as implementing a mobile version for it
- Update Album page in line with Track page design
- Update Metronome with additional settings
- More animations for a more engaging and enjoyable experience
- Code refactors for performance and scalability
- Update components for accessibility and SEO purposes
