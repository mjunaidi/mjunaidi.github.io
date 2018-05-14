@echo off
cd ..
git status
git add --all
git commit -m "Updated"
git status
git push
cd cmd
