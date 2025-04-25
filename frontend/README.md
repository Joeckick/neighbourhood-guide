# Neighbourhood Guide App - Frontend

This is the frontend application for the Neighbourhood Guide, built with React and Vite.

It allows users to enter a UK postcode and view information about the area, including a map, an AI-generated summary, and nearby points of interest (fetched from the project's backend service).

## Project Structure

- `src/`: Main source code directory.
  - `components/`: Reusable React components (e.g., `PostcodeForm`, `MapDisplay`, `PlacesList`, `ResultsDisplay`).
  - `hooks/`: Custom React hooks (e.g., `useGuideApi` for backend communication).
  - `App.jsx`: Main application component.
  - `main.jsx`: Entry point for the React application.
- `public/`: Static assets.
- `vite.config.js`: Vite configuration (including proxy setup for the backend).
- `package.json`: Project dependencies and scripts.

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- The [Neighbourhood Guide Backend](../backend/README.md) service running (typically on `http://localhost:3001`).

## Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

## Running the Development Server

1.  Make sure the backend server is running.
2.  Start the Vite development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
3.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Available Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Serves the production build locally for preview.
