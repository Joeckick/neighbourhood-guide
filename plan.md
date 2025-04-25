# Project Plan: Neighbourhood Guide App (Revised)

**Goal:** Create a web application that takes a UK postcode and user details (name, interests) to generate a multi-section, personalized neighbourhood guide. The guide should aggregate data from various sources (APIs, web searches via LLM) and present it in a well-structured format, suitable for both web display and high-quality PDF generation (intended for future paywall).

**Core Features (Target):**

1.  **Personalized Input:** Capture postcode, recipient name, and key interests.
2.  **Multi-Source Data Aggregation:** Combine location data (Postcodes.io), points of interest (Overpass), transport links (TransportAPI), demographics (ONS), potentially environmental data, healthcare info, etc.
3.  **LLM-Powered Curation & Narrative:** Use an LLM to summarize data, select relevant information based on interests, generate descriptive text, and potentially find "local tips" via web searches.
4.  **Structured Display (Web & PDF):** Present the guide in logical sections (Intro, Essentials, Food, Recreation, Transport, Community, etc.) suitable for both web view and a downloadable PDF.
5.  **User Accounts:** Basic authentication to enable saving guides or future premium features.

**Target Audience:** Individuals/Families researching potential places to live, move to, or visit within the UK, seeking a personalized and comprehensive overview.

**Technical Stack:**

*   **Frontend:** React + Vite, Material UI, `react-leaflet`, `@react-pdf/renderer`
*   **Backend:** Node.js + Express, Axios (for API calls), `@google/generative-ai` (or similar LLM), Dotenv

---

**Revised Iterative Plan:**

*   **Phase 1: Foundation - Structure & Personalization Input**
    *   **Goal:** Establish the multi-section structure for the guide display (web/PDF) and add user input for name/interests.
    *   **Tasks:**
        *   **Frontend:** UI for name/interests input; Update state (`useGuideApi`/App); Refactor `ResultsDisplay` into section components (e.g., `Introduction`, `LocalEssentials`); Refactor `GuidePdfDocument` to mirror sections; Add personalized intro text.
        *   **Backend:** Update `/api/guide/:postcode` to accept personalization params; Minor update to LLM prompt for basic name usage.
    *   **Status:** **TODO**

*   **Phase 2: Core Data Enhancement - Transport & Demographics**
    *   **Goal:** Integrate TransportAPI and ONS demographics data.
    *   **Tasks:**
        *   **Backend:** Research/select APIs; Implement `transportService.js`, `onsService.js`; Integrate into `server.js`; Manage API keys.
        *   **Frontend:** Display new data in relevant web sections (`Transport`, `LocalEssentials`); Add data to corresponding PDF sections.
    *   **Status:** **TODO**

*   **Phase 3: Enhanced Curation & LLM Personalization**
    *   **Goal:** Use LLM to select/describe POIs based on interests and find local tips.
    *   **Tasks:**
        *   **Backend:** Enhance `llmService.js` prompts (pass POIs/interests, request curation/description, potentially enable web search); Update `/api/guide/:postcode` orchestration.
        *   **Frontend:** Update web/PDF sections to display LLM-generated curated content.
    *   **Status:** **TODO**

*   **Phase 4: Broader Data Integration (Iterative)**
    *   **Goal:** Incrementally add more data sources (e.g., Environment Agency, healthcare finders, council info via scraping/search).
    *   **Tasks (Repeat per source):** Backend research/implementation; Frontend display (web/PDF); Optional LLM integration.
    *   **Status:** **TODO**

*   **Phase 5: PDF/UI Polish & Paywall Prep**
    *   **Goal:** Refine PDF output quality, improve web UI/UX, and add user authentication.
    *   **Tasks:**
        *   **Frontend (PDF):** Advanced `@react-pdf/renderer` styling (fonts, columns, images - solve map image); Refine `GuidePdfDocument` layout.
        *   **Frontend (Web):** UI/UX polish (loading, errors, responsiveness).
        *   **Backend/Frontend:** Implement user authentication (e.g., Firebase Auth, Auth0); Secure relevant API endpoints.
    *   **Status:** **TODO**

---

**Next Steps:**

1.  Begin implementation of **Revised Phase 1**: Add UI elements for capturing user name and interests on the frontend. 