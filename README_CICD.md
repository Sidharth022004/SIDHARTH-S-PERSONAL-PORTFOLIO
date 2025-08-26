# CI/CD Setup for Portfolio

This document explains the CI/CD (Continuous Integration/Continuous Deployment) setup for this portfolio project.

## Overview

This project uses GitHub Actions for CI/CD with two separate workflows:

1. **CI (Continuous Integration)** - Runs on every push and pull request to the main branch
2. **CD (Continuous Deployment)** - Runs only on pushes to the main branch and deploys to GitHub Pages

## CI Workflow (`.github/workflows/ci.yml`)

The CI workflow performs the following steps:

1. Checks out the code
2. Sets up Node.js (tests against multiple versions)
3. Installs dependencies using `npm ci` (faster and more reliable than `npm install`)
4. Runs the linter with `npm run lint`
5. Runs tests with `npm run test:run`
6. Runs tests with coverage with `npm run test:coverage`
7. Builds the project with `npm run build`

This workflow runs on multiple Node.js versions (18.x and 20.x) to ensure compatibility.

## CD Workflow (`.github/workflows/cd.yml`)

The CD workflow performs the following steps:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Builds the project
5. Configures GitHub Pages
6. Uploads the build artifacts
7. Deploys to GitHub Pages

This workflow only runs on pushes to the main branch and automatically deploys the built portfolio to GitHub Pages.

## Configuration

### GitHub Pages Setup

To enable GitHub Pages deployment:

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"

### Environment Variables

No environment variables are required for the basic setup. However, if you add features that require API keys or other secrets, you can add them in your repository's settings under "Settings" > "Secrets and variables" > "Actions".

## Customization

### Modifying the CI Workflow

You can customize the CI workflow by modifying `.github/workflows/ci.yml`:

- To change Node.js versions, modify the `matrix.node-version` array
- To add or remove steps, modify the `steps` section
- To change when the workflow runs, modify the `on` section

### Modifying the CD Workflow

You can customize the CD workflow by modifying `.github/workflows/cd.yml`:

- To change the Node.js version, modify the `node-version` in the setup-node step
- To change when the workflow runs, modify the `on` section
- To deploy to a different environment, modify the deployment steps

## Monitoring

You can monitor the CI/CD workflows in the "Actions" tab of your repository. Each workflow run will show:

- The status of each step
- Logs for debugging
- Test results and coverage reports

## Troubleshooting

### Common Issues

1. **Build failures**: Check the build logs in the Actions tab for specific error messages
2. **Deployment issues**: Ensure GitHub Pages is enabled in your repository settings
3. **Test failures**: Run tests locally with `npm run test` to debug

### Checking Workflow Status

You can check the status of workflows by:

1. Visiting the "Actions" tab in your repository
2. Looking for the green checkmark (success), red X (failure), or yellow circle (in progress) next to commits
3. Setting up notifications in GitHub to alert you of workflow failures

## Manual Deployment

If you prefer to deploy manually, you can:

1. Build the project locally with `npm run build`
2. Deploy the contents of the `dist` folder to any static hosting service
3. For GitHub Pages, you can use the GitHub CLI or manually push to the `gh-pages` branch

## Security Considerations

- Never commit secrets or API keys to the repository
- Use GitHub Secrets for sensitive information
- Regularly review permissions for GitHub Actions workflows
- Keep dependencies up to date to avoid security vulnerabilities