#!/bin/bash
# ─────────────────────────────────────────────────────
#  P2P Solutions — One-Command GitHub Push Script
#  Usage: bash push_to_github.sh <YOUR_GITHUB_TOKEN>
# ─────────────────────────────────────────────────────

TOKEN=$1

if [ -z "$TOKEN" ]; then
  echo "❌  No token provided."
  echo "    Usage: bash push_to_github.sh ghp_YourTokenHere"
  echo ""
  echo "    Create a token at:"
  echo "    https://github.com/settings/tokens/new"
  echo "    (Scopes needed: ✅ repo)"
  exit 1
fi

REPO="https://${TOKEN}@github.com/abusilawq/P2p-Solution.git"

echo "🔄  Pushing P2P Solution to GitHub..."
git remote set-url origin "$REPO"
git push -u origin main --force

if [ $? -eq 0 ]; then
  echo ""
  echo "✅  Successfully pushed to GitHub!"
  echo "    View at: https://github.com/abusilawq/P2p-Solution"
else
  echo ""
  echo "❌  Push failed. Please check your token has 'repo' scope."
fi

# Clean token from remote URL after push (security)
git remote set-url origin "https://github.com/abusilawq/P2p-Solution.git"
echo "🔒  Token cleared from remote URL"
