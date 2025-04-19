# Vercel Deployment Guide

This document provides instructions for deploying this Vue.js application to Vercel.

## Prerequisites

- A Vercel account
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

1. **Connect your repository to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing this project

2. **Configure project settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build` (this should be auto-detected)
   - Output Directory: `dist` (this should be auto-detected)
   - Install Command: `npm install` (default)

3. **Set up environment variables**:
   - In the Vercel project configuration screen, go to the "Environment Variables" section
   - Add the following environment variables:
     - `VITE_ADMIN_CLIENT_PASS`: Your admin client password
     - `VITE_PAYLOAD_SECRET`: Your payload secret key
     - `VITE_API_URL`: Your API URL (e.g., https://api.example.com)
   - Make sure to set these for all environments (Production, Preview, Development)

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build and deployment to complete

## Troubleshooting

If you encounter any issues during deployment:

1. **Check build logs**:
   - Go to your project in the Vercel dashboard
   - Click on the latest deployment
   - Check the "Build Logs" for any errors

2. **Verify environment variables**:
   - Make sure all required environment variables are set correctly
   - Environment variable names are case-sensitive

3. **Check for routing issues**:
   - If you see a 404 error, make sure the routes in `vercel.json` are correct
   - The SPA fallback route should be configured correctly

4. **Rebuild and redeploy**:
   - If you've made changes to fix issues, you can trigger a new deployment
   - Go to your project in the Vercel dashboard and click "Redeploy"

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
