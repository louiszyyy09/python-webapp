#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Prompt for the GitHub Repository URL if not provided as an argument
REPO_URL=$1
if [ -z "$REPO_URL" ]; then
    echo "Usage: ./deploy_github.sh <GITHUB_REPO_URL>"
    echo "Example: ./deploy_github.sh https://github.com/username/repository.git"
    exit 1 q
fi

echo "🚀 Starting deployment preparation..."

# 1. Build the Vite project
echo "📦 Building the project for production..."
npm run build

# 2. Automatically generate a simple 404.html in the dist directory for GitHub Pages routing
echo "📄 Generating 404.html redirect in the dist folder..."
cat << 'EOF' > dist/404.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // Mitigates 404 errors by redirecting back to the index.html
      var pathSegmentsToKeep = 0; // Number of segments to keep (e.g. 1 for username.github.io/repo)
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
EOF

# Navigate into the build output directory
cd dist
rm -rf .git

# 3. Initialize Git in the dist directory
echo "🔧 Initializing git repository..."
git init
git checkout -B main

# 4. Add all generated files and commit with a timestamp
echo "💾 Committing build files..."
git add -A
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Deploy to GitHub Pages: $TIMESTAMP"

# 5. Add remote and Force Push to GitHub
echo "☁️ Pushing to GitHub repository ($REPO_URL)..."
git remote add origin "$REPO_URL"
# We force push to the 'gh-pages' branch (standard for static deployments)
# However, the user explicitly requested pushing to 'main' branch in the script constraints. 
# We will push the build artifacts directly to 'main' as requested.
git push -f origin main

echo "✅ Deployment script executed successfully!"
echo "Your built site has been pushed to the 'main' branch of your repository."
