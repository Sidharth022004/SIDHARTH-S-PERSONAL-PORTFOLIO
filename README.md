# Sidharth's Portfolio

## About this Project

This is a personal portfolio website built with modern web technologies to showcase my skills, projects, and experience as a software developer.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Getting Started

To run this project locally:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:8080

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Deployment

This portfolio can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

### GitHub Pages Deployment

This repository is configured with GitHub Actions for automatic deployment to GitHub Pages:

1. Any push to the `main` branch will trigger the CI/CD pipeline
2. The workflow will run tests, build the project, and deploy to GitHub Pages
3. Visit `https://[your-username].github.io/[repository-name]/` to view your deployed portfolio

For detailed information about the CI/CD setup, see [README_CICD.md](README_CICD.md).

### Manual Deployment

To manually deploy to GitHub Pages:

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy using GitHub CLI or manually push the `dist` folder to the `gh-pages` branch

## Customization

To personalize this portfolio:

1. Update the content in the `src` directory
2. Replace placeholder images with your own
3. Update the contact information in the contact section
4. Add your own projects to the projects section
5. Customize the styling to match your personal brand

## Contributing

Feel free to fork this project and customize it for your own portfolio. If you have suggestions for improvements, please open an issue or submit a pull request.
