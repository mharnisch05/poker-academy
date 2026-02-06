#!/bin/bash

# Poker Academy - Quick Deploy Script

echo "🃏 Poker Academy - Deployment Script"
echo "====================================="
echo ""

# Check if git remote exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ Git remote already configured"
else
    echo "⚠️  Git remote not configured"
    echo "Please set your GitHub repository URL:"
    read -p "Enter GitHub repo URL (e.g., https://github.com/username/poker-academy.git): " REPO_URL
    git remote add origin "$REPO_URL"
    echo "✅ Git remote added"
fi

echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully!"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Click 'Add New Project'"
    echo "3. Import your poker-academy repository"
    echo "4. Click 'Deploy'"
    echo ""
    echo "Your app will be live in 2-3 minutes!"
else
    echo "❌ Failed to push to GitHub"
    echo "Please check your repository URL and credentials"
fi
