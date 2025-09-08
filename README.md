# resource-tracker-backend
git fetch origin

# 1) See what branch you’re on and if it tracks origin
git branch -vv

# 2) Do you actually have changes?
git status

# 3) Diff your branch vs remote main (should list files if there’s something to PR)
git diff --name-only origin/main...HEAD

# 4) If you have local changes, commit & push them
git add -A
git commit -m "feat: your change"
git push -u origin HEAD
