#!/bin/bash

echo "🚀 CodSoft Web - Deployment Script"
echo "===================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
    git add .
    git commit -m "Initial commit: CodSoft Web Projects"
fi

# Build client
echo "📦 Building client..."
cd codsoft-web/client
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Client build successful!"
else
    echo "❌ Client build failed!"
    exit 1
fi

cd ../..

# Install server dependencies
echo "📦 Installing server dependencies..."
cd codsoft-web/server
npm install

if [ $? -eq 0 ]; then
    echo "✅ Server dependencies installed!"
else
    echo "❌ Server installation failed!"
    exit 1
fi

cd ../..

echo ""
echo "✅ Build complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy to Vercel: https://vercel.com/new"
echo "3. Or deploy to Netlify: https://app.netlify.com/drop"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
