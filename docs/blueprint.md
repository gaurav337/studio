# **App Name**: Cosmic Portfolio

## Core Features:

- Interactive 3D Hero: Display an interactive 3D model in the hero section that reacts to mouse movements, created using Three.js.  This feature could tool use generative AI to customize visuals
- Skills Showcase: Present skills using stylish tags or icons grouped by category, animated to cascade into view on scroll.
- Featured Projects: Display featured projects using cards with alternating layouts, including project title, description, tech stack (using monospace font), and links to GitHub and live demos.
- Achievement Timeline: Create a clean, minimalist vertical timeline displaying achievements, education, and certifications.
- Contact Form: Allow users to send messages directly through the portfolio.
- Theme Toggle: Allows the user to select light or dark mode.

## Style Guidelines:

- Color scheme: Dark theme with a deep space blue background (#0A192F), luminous teal accent (#64FFDA), light slate headings (#CCD6F6), and medium slate body text (#8892B0). These choices give a tech-forward look that still puts readability first. A dark theme aligns well with a space concept.
- Headings: 'Poppins' (sans-serif). Body text: 'Inter' (sans-serif). Monospace font for code/tech stacks: 'Source Code Pro'.
- Full-screen hero section with a centered layout and 3D element. Project cards alternate image and text alignment. Clean, minimalist timeline for achievements. Use of glassmorphism on the navigation bar with a blurred background.
- Initial animation draws the initials "GKJ" as constellations. Interactive 3D model with parallax effect. Skills tags animate into view on scroll. Project cards slide in or fade-in-and-up on scroll, with a soft box shadow on hover. Timeline events animate in from left and right on scroll. Stat card numbers count up to their final value. The theme toggle should transition smoothly.
- Custom cursor that transforms when hovering over links or buttons. Smooth scrolling implementation. Trigger animations using the Intersection Observer API.
- For the Light Theme: A soft gray background (#F5F7FA), a deep indigo accent (#3A41D9), charcoal headings (#1E2022), and graphite body text (#495057). UI elements/cards should use pure white (#FFFFFF) with a subtle box-shadow. This maintains professionalism but still brings energy through contrast.