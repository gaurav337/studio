
# Cosmic Architect: A Personal Portfolio

This is a Next.js-powered personal portfolio website, designed to showcase projects, skills, and professional experience with a sleek, modern, and cosmic-themed interface. It's built with the latest web technologies to be fast, responsive, and visually engaging.

![Cosmic Architect Screenshot](https://storage.googleapis.com/stabl-media/6c507c57843840748a3c89b4f9859f7d.png)

## Core Features

### Architecture & Technology
-   **Modern Tech Stack**: Built with **Next.js 15** using the App Router, **React 18**, and **TypeScript** for a fast, scalable, and maintainable application.
-   **Styling**: Styled with **Tailwind CSS** and **ShadCN/UI** for a consistent, utility-first approach to a polished and professional look.
-   **AI-Powered (Future-Ready)**: Integrated with **Google's Genkit** to enable future AI-powered features, such as personalized content suggestions and 3D model generation.
-   **Fully Responsive**: The entire layout and all components are designed to look and work great on all devices, from mobile phones to desktops.
-   **Firebase Integration**: Uses **Firestore** as a scalable backend to store and retrieve project data dynamically.

### UI & UX
-   **Dual Theming**: Features a beautiful **dark mode** and a clean, redesigned **light mode**, with a smooth theme toggle to respect user preference.
-   **Interactive Hero Background**: A captivating and lightweight **three.js** particle animation on the landing page that subtly reacts to mouse movements.
-   **Dynamic Animations**: Smooth page transitions and on-scroll reveal animations for components, powered by **Framer Motion**, creating an engaging user experience.
-   **Glassmorphism Header**: A sticky header with a blurred background effect that provides persistent, easy-to-use navigation.
-   **Custom Typography**: Utilizes Google Fonts (`Poppins`, `Inter`, and `Source Code Pro`) for a clean, professional, and developer-focused aesthetic.
-   **Vercel Analytics**: Integrated to provide insights into website traffic and user engagement.

### Sections & Content
-   **Featured Projects**: A dedicated section on the homepage to highlight key projects, using an alternating card layout for visual variety.
-   **All Projects Page**: A comprehensive gallery page for all projects, featuring:
    -   **Live Search**: Instantly filter projects by title or description.
    -   **Tech Stack Filtering**: Filter projects by a specific technology using a dropdown menu.
-   **About Me Section**: A personal introduction alongside a categorized showcase of technical skills.
-   **Journey & Experience**: A clean, vertical timeline that elegantly displays education, work experience, and key project milestones.
-   **Achievements & Stats**: Animated cards that count up to their final value, highlighting key accomplishments and metrics.
-   **Testimonials Carousel**: A touch-friendly, auto-playing carousel to display quotes and feedback from mentors and peers.
-   **Contact Information**: A clear and accessible contact section with links to professional profiles like GitHub and LinkedIn.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following software installed on your machine:

-   [Node.js](https://nodejs.org/en/) (v18 or later is recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the Repository**

    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install Dependencies**

    Install the required packages using npm or yarn:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**

    Create a `.env` file in the root of your project by copying the example file:

    ```bash
    cp .env.example .env
    ```

    You will need to populate this file with your Firebase project configuration to connect to the database.

4.  **Run the Development Server**

    Start the local development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

-   `src/app/`: Contains all the pages and routes for the application, following the Next.js App Router structure.
-   `src/components/`: Includes all the reusable React components, organized into UI elements, sections, and layout components.
-   `src/lib/`: Holds utility functions, data constants (like navigation links and skills), and Firebase configuration.
-   `src/services/`: Manages interactions with external services, such as fetching project data from Firestore.
-   `src/ai/`: Contains the Genkit AI flows for generative features.
-   `public/`: Stores static assets like images and fonts.
-   `tailwind.config.ts`: The configuration file for Tailwind CSS.

This project was bootstrapped and developed within **Firebase Studio**.
