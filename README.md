# Candidate Search App (React + TypeScript + Vite)

This project is a candidate search application built with React, TypeScript, and Vite. It allows employers to browse GitHub users as potential candidates, accept or reject them, and maintain a list of saved candidates. The app uses the GitHub API and persists saved candidates in localStorage.

## Features
- Browse random GitHub users as candidates
- View candidate details: name, username, location, avatar, email, GitHub profile, and company
- Accept (+) or reject (-) candidates
- Save accepted candidates to a persistent list (localStorage)
- View and filter/sort the list of saved candidates
- Responsive, clean UI matching the provided mockups

## Setup Instructions
1. **Clone the repository and navigate to the `Develop` folder.**
2. **Create a GitHub Personal Access Token** ([instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)).
3. **Create a `.env` file in the `Develop` folder:**
   ```
   VITE_GITHUB_TOKEN=your_github_token_here
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```
6. **Open the app in your browser at** `http://localhost:5173` (or the port shown in your terminal).

## Usage
- On the Candidate Search page, review one candidate at a time. Use the `+` button to save a candidate, or the `-` button to skip.
- Saved candidates are available on the Saved Candidates page, where you can filter and sort the list.
- All data persists in your browser's localStorage.

## Project Structure
- `src/pages/CandidateSearch.tsx` — Candidate search and review UI
- `src/pages/SavedCandidates.tsx` — Saved candidates list with filtering/sorting
- `src/api/API.tsx` — GitHub API utility functions
- `src/interfaces/Candidate.interface.tsx` — TypeScript interface for candidate data
- `src/components/Nav.tsx` — Navigation bar
- `src/App.tsx`, `src/main.tsx` — App entry and routing

## Environment Variables
- The app requires a GitHub token in `.env` as `VITE_GITHUB_TOKEN`.
- **Do not commit your `.env` file or token to version control.**

## Deployment
- The app is ready for deployment to Render or any static hosting that supports Vite.
- Update this README with your deployed URL after deployment.

## Credits
- Bootcamp Module 13 Challenge
- Built with React, TypeScript, and Vite

---
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.