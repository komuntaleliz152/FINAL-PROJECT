# Deployment Guide for Karibu Grocery System

## Prerequisites
1. GitHub account
2. Render account (https://render.com)
3. MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas and sign in
2. Create a new cluster (free tier is fine)
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string (it looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/KGL?retryWrites=true&w=majority`)
6. Replace `<password>` with your actual database password
7. Keep this connection string - you'll need it for Render

## Step 2: Push Code to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   ```

2. Add all files:
   ```bash
   git add .
   ```

3. Commit:
   ```bash
   git commit -m "Initial commit for deployment"
   ```

4. Create a new repository on GitHub (don't initialize with README)

5. Add remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy on Render

1. Go to https://render.com and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: karibu-grocery (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   - Click "Advanced" or go to "Environment" tab
   - Add the following:
     - Key: `DATABASE`
     - Value: Your MongoDB Atlas connection string (from Step 1)
     - Key: `PORT`
     - Value: `10000` (Render uses port 10000 by default)

6. Click "Create Web Service"

7. Wait for deployment (this may take 5-10 minutes)

## Step 4: Verify Deployment

1. Once deployed, Render will provide a URL like: `https://karibu-grocery.onrender.com`
2. Click the URL to open your application
3. Test the login and main features

## Troubleshooting

### If deployment fails:

1. Check the logs in Render dashboard
2. Common issues:
   - **Database connection error**: Verify your MongoDB Atlas connection string
   - **Port error**: Make sure PORT environment variable is set
   - **Build error**: Check that all dependencies are in package.json

### If the app is slow on first load:

- Free tier on Render spins down after inactivity
- First request may take 30-60 seconds to wake up
- Subsequent requests will be faster

### Database Issues:

1. In MongoDB Atlas, make sure to:
   - Whitelist all IP addresses (0.0.0.0/0) in Network Access
   - Create a database user with read/write permissions
   - Use the correct connection string format

## Environment Variables Reference

Required environment variables for Render:

```
DATABASE=mongodb+srv://username:password@cluster.mongodb.net/KGL?retryWrites=true&w=majority
PORT=10000
```

## Post-Deployment

1. Test all features:
   - Login/Signup
   - Add Stock
   - Add Procurement
   - Credit Sales
   - Produce Sales
   - All dashboards

2. Monitor logs in Render dashboard for any errors

3. Set up custom domain (optional):
   - Go to Settings in Render
   - Add custom domain
   - Update DNS records as instructed

## Support

If you encounter issues:
1. Check Render logs
2. Verify MongoDB Atlas connection
3. Ensure all environment variables are set correctly
4. Check that your GitHub repository is up to date
