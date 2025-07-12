# Lobste.rs Clone

This project is a functional clone of the Lobste.rs website, built with a modern web stack. It replicates the core UI and features, including post listings, "Active" and "Recent" filters, and external link handling.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
- **Backend & Database:** [Convex](https://www.convex.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install all the necessary packages for the project.

```bash
npm install
```

### 3. Set Up Convex

1.  **Create a Convex Project:**
    - Sign up for a free Convex account at [convex.dev](https://www.convex.dev/).
    - Create a new project from your Convex dashboard.

2.  **Get Your Deployment URL:**
    - In your project's settings on the Convex dashboard, find the "Deploy URL".
    - It will look like `https://<your-project-name>.convex.site`.

3.  **Create an Environment File:**
    - In the root of your project, create a new file named `.env.local`.
    - Add your Convex deployment URL to this file:
      ```
      NEXT_PUBLIC_CONVEX_URL=https://<your-project-name>.convex.site
      ```

### 4. Run the Development Servers

You need to run two processes in separate terminals:

1.  **Convex Dev Server:**
    This command pushes your schema and functions to the Convex cloud and watches for changes.

    ```bash
    npx convex dev
    ```

2.  **Next.js Dev Server:**
    This command starts the frontend application.

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Seed the Database

To populate the application with initial data, run the seed mutation in a new terminal:

```bash
npx convex run seed
```

This will populate the `posts` table with mock data, which should then appear on the frontend.
