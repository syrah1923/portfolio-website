# Syrah Cansica - Information Technology Portfolio

A modern, highly responsive, and premium single-page portfolio website designed and developed for **Syrah Cansica**, an Information Technology Graduate.

Features a state-of-the-art **Glassmorphic interface** with full light/dark mode support, customized inline SVG brand icons, scroll reveals, interactive card mouse-track glowing halos, case-study modal dialogs, client-side input validations, and dynamic toast messaging.

---

## 🚀 How to Host This Website for Free on GitHub Pages

GitHub Pages is a free hosting service provided by GitHub that allows you to publish websites directly from a GitHub repository. Follow either of the two step-by-step methods below to publish your portfolio in under 2 minutes.

---

### 📂 Method 1: Using GitHub Desktop (Easiest / Visual Interface)

If you prefer a visual interface without typing command lines:

1. **Install GitHub Desktop**: Download and install it from [desktop.github.com](https://desktop.github.com/) if you haven't already.
2. **Log In**: Sign in to your GitHub account inside GitHub Desktop.
3. **Create a New Repository**:
   - Go to `File` > `New Repository...`.
   - **Name**: Give it a name (e.g., `portfolio-website` or your GitHub username).
   - **Local Path**: Choose the directory containing your portfolio files (`C:\xampp\htdocs\portfolio-website`).
   - Click **Create Repository**.
4. **Publish the Repository**:
   - Click the **Publish Repository** button at the top right.
   - Keep the repository **Public** (required for the free tier of GitHub Pages).
   - Click **Publish**.
5. **Enable GitHub Pages**:
   - Open your web browser, navigate to your GitHub profile, and open this newly published repository.
   - Click on **Settings** (near the top menu bar of the repository page).
   - Under the left-hand menu, scroll down to the **Code and automation** section and click on **Pages**.
   - Under **Build and deployment**, ensure the **Source** is set to `Deploy from a branch`.
   - Under **Branch**, select `main` (or `master`) and click **Save**.
6. **Done!**
   - After about 30 seconds, refresh the page. At the top of the Pages settings page, you will see a message: `"Your site is live at https://<username>.github.io/<repository-name>/"`. Click it to view your beautiful live site!

---

### 💻 Method 2: Using the Terminal / Git CLI (Fastest for Developers)

If you have Git installed on your machine and prefer using command line:

1. **Open your Terminal/Command Prompt** in the project folder:
   ```bash
   cd c:\xampp\htdocs\portfolio-website
   ```
2. **Initialize Git**:
   ```bash
   git init
   ```
3. **Add files to stage**:
   ```bash
   git add .
   ```
4. **Commit your files**:
   ```bash
   git commit -m "feat: initial commit of premium portfolio"
   ```
5. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Name it `portfolio` or whatever you like.
   - Select **Public** as the visibility.
   - **Do not** initialize it with a README, `.gitignore`, or License (since your local files already have these or will receive them).
   - Click **Create repository**.
6. **Link your local repository and push**:
   - Copy the commands shown under "...or push an existing repository from the command line" on your new repository page:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
7. **Enable Pages**:
   - Go to your repository page on GitHub.
   - Click **Settings** > **Pages**.
   - Under **Branch**, select `main` and click **Save**.
   - Within a few seconds, your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

---

## 🛠️ Modifying the Website

- **Modifying Visual Styles**: All style parameters, including the brand colors, are stored as easy-to-read CSS custom variables inside [styles.css](file:///c:/xampp/htdocs/portfolio-website/styles.css). Adjust the values under `:root` to change the main branding.
- **Interactive Triggers**: The file [app.js](file:///c:/xampp/htdocs/portfolio-website/app.js) controls scroll behaviors, modal contents, form submissions, and cards glowing vectors.
- **Content Blocks**: Structural containers, SVG icons, and input tags are clearly commented in [index.html](file:///c:/xampp/htdocs/portfolio-website/index.html).
