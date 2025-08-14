# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**IMPORTANT**: Always update the "Recent Changes & Workarounds" section when making significant changes to functionality, architecture, or implementing workarounds. This ensures continuity for future development sessions.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`
- **Fix lint issues**: `npm run lint:fix`

## Node Version

This project uses **Node.js v18.7.0** (specified in `.nvmrc`). Use `nvm use` to switch to the correct version.

## Architecture Overview

This is a Next.js music application that integrates with Spotify API and Musixmatch API. The app follows a modular component architecture with TypeScript and SCSS modules.

### Key Architectural Patterns

- **Component Structure**: Each component has its own directory with `.tsx` file and corresponding `.module.scss` file
- **Pages**: Next.js pages use dynamic routing (e.g., `[...albumId].tsx` for album pages)
- **State Management**: Uses Zustand for global state, with slice-based architecture in `/store` directory
- **API Layer**: Spotify API services are organized in `/utilities/services/spotify/`
- **Type System**: Comprehensive TypeScript types in `/types/` directory with centralized exports

### Directory Structure

- `/components/` - Reusable UI components organized by feature
- `/pages/` - Next.js pages with API routes in `/pages/api/`
- `/store/` - Zustand state management with slice pattern
- `/utilities/` - Helper functions, custom hooks, and service integrations
- `/types/` - TypeScript type definitions
- `/styles/` - Global SCSS files and design system

### State Management

Uses Zustand with devtools middleware. Main store combines multiple slices (currently search functionality). Store is typed with TypeScript interfaces.

### API Integration

- **Spotify API**: Access token management with client/server-side fetching
- **Musixmatch API**: Lyrics retrieval service
- API calls are abstracted into service functions with proper TypeScript typing

### Styling Approach

- SCSS with CSS Modules for component-scoped styles
- Global styles in `/styles/` including variables, mixins, and typography
- Design system with breakpoints and consistent spacing

### Code Quality Setup

- ESLint with Airbnb TypeScript configuration
- Prettier for code formatting
- Husky for pre-commit hooks with lint-staged
- TypeScript with strict rules disabled for rapid development

### Known Issues

- **Spotify Audio Features API Deprecated**: Spotify has deprecated their audio features endpoint that provided tempo, key, danceability, and other track analysis data. This affects most core features of the app that display track metrics and analysis.
  - **Potential Solution**: Cyanite.ai API could be used as an alternative for audio analysis features, using ISRC codes or metadata matching to link Spotify tracks with audio analysis data.
- Spotify access token expires after ~1 hour requiring page reload
- Musixmatch provides only 30% of lyrics on free tier

## Recent Changes & Workarounds

**2025-08-13**: Applied fixes for deprecated Spotify Audio Features API:
- **Metronome fallback**: Added 120 BPM default when tempo unavailable (`components/pages/TrackPage/TrackPage.tsx:119`)
- **Data display fallbacks**: Added "Data unavailable" fallback for tempo, key, time signature display when API data missing
- **Duration fix**: Changed auto-scroll and duration display to use `track.duration_ms` instead of `features.duration_ms` since track duration still available from regular Spotify API
- **Test lyrics**: Added 5x repetition of fetched lyrics for scroll testing due to Musixmatch 30% limit
- **Graceful degradation**: App remains functional with basic track info while audio analysis features show unavailable

**2025-08-14**: UI improvements and better lyrics handling:
- **Conditional ScrollContent**: Only render ScrollContent component when lyrics are found, preventing unnecessary scroll controls for "Lyrics not found" state
- **Improved lyrics rendering**: Simplified Lyrics component logic to consistently use same DOM structure (div with styles.lyrics containing Paragraph elements) regardless of content state
- **Fixed UI jump**: Added min-height to right panel and adjusted sticky positioning to prevent layout shifts when switching between tracks with/without lyrics
- **Better state management**: Reset lyrics state when changing tracks to show proper loading state instead of stale content

*Note: Update this section when making significant changes that affect app functionality or architecture*