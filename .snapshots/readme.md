# Snapshots Directory

This directory contains snapshots of your code for AI interactions. Each snapshot is a markdown file that includes relevant code context and project structure information.

## What's included in snapshots?
- Selected code files and their contents
- Project structure (if enabled)
- Your prompt/question for the AI

## Configuration
You can customize snapshot behavior in `config.json`.

## Uploading this project to GitHub
If you want to add all of the files from your computer to GitHub, follow these steps from the project root:

1. **Initialize Git (if needed):**
   ```bash
   git init
   ```
2. **Add a remote pointing to your GitHub repository:**
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   ```
3. **Stage every file in the directory:**
   ```bash
   git add .
   ```
4. **Create a commit with a descriptive message:**
   ```bash
   git commit -m "Add initial project files"
   ```
5. **Push the commit to GitHub:**
   ```bash
   git push -u origin main
   ```

If your repository uses a branch name other than `main`, replace it in the final command. For subsequent changes, repeat steps 3–5 to keep GitHub updated.
