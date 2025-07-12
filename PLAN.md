### **Project Goal**

To build a fully functional, cloud-hosted clone of Lobste.rs, replicating its core UI and features using Next.js, Convex, Tailwind CSS, and Zustand.

---

### **Plan of Action**

#### **Phase 1: Analysis & Backend Setup**
- [x] **Analyze Existing Codebase:** Review the current file structure, `package.json`, and existing Next.js/Convex configurations to understand the project's starting point.
- [x] **Define Convex Schema:** Define the `posts` table schema in `convex/schema.ts` with all required fields (e.g., `title`, `url`, `points`, `author`, `tags`).
- [x] **Implement Convex Queries:** Create `getActive` and `getRecent` queries in a `convex/posts.ts` file to fetch and sort the data from the database.
- [x] **Seed Database:** Create and run a Convex mutation to populate the database with initial mock data, allowing us to see content on the frontend.

#### **Phase 2: UI Development & Frontend Integration**
- [x] **Structure Frontend Components:** Create the necessary files for our React components (`Header.tsx`, `PostList.tsx`, `PostItem.tsx`) within the `components` directory.
- [x] **Build UI Components:** Implement the JSX structure for each component to display the post data.
- [x] **Style Application:** Use **Tailwind CSS** to style the components and layout to match the Lobste.rs UI.
- [x] **Connect Frontend to Backend:** Use the `useQuery` hook from Convex within the components to fetch and display the post data in real-time.

#### **Phase 3: Core Functionality with Zustand**
- [x] **Install & Set Up Zustand:** Add Zustand to the project and create a store to manage the active filter state (e.g., `'recent'` or `'active'`).
- [x] **Implement Filter Logic:**
    -   [x] Connect the `Header` component to the Zustand store so that clicking "Recent" or "Active" updates the state.
    -   [x] The main page component will read this state from the store to dynamically choose which Convex query to run.
- [x] **Implement External Links:** Ensure that clicking on a post's title correctly opens the article's external URL in a new tab.

#### **Phase 4: Authentication**
- [ ] **Install & Configure Convex Auth:** Add the necessary authentication packages and configure them with an auth provider like Clerk.
- [ ] **Create Login & Sign-up Pages:** Build the UI components and pages for user registration and login.
- [ ] **Update Header:** Modify the `Header` to show the user's status and provide login/logout buttons.
- [ ] **Protect Routes (Optional):** Implement logic to restrict features to authenticated users.

#### **Phase 5: Finalization & Deployment**
- [x] **Documentation:** Create a `README.md` file with clear instructions on the project setup, architecture, and how to run it locally.
- [ ] **Deployment:** Deploy the final application to a cloud provider like Vercel or Netlify.
