# Tech Portfolio

A modern, single-page portfolio for showcasing your About, Projects (Unity, 3D, 2D, Other), and a Reach Me section that lets people email you. Built with HTML/CSS/JS and ready for GitHub Pages.

## Customize

1. Open `assets/js/main.js` and edit the `CONFIG` object:
   - `name`: Your full name
   - `email`: The email you want people to reach you at
   - `github`: Your GitHub username (updates the header link)
2. Update the sample `PROJECTS` array with your real projects.
   - `category` must be one of: `Unity`, `3D`, `2D`, `Other`
   - Add tags, GitHub repo links, and demo links.
3. Edit text in `index.html` (hero tagline and About section) to reflect your story.
4. Optional: Replace the open graph image and favicon.

Edit the Tech stack section in `index.html` (`#stack`). Each item uses a simple meter bar:

- Adjust the level by changing `--value` inline style (e.g., `--value: 70%`).
### Add your programming skills

- In `index.html` under the `#stack` section, a "Programming" card lists C#, C++, and Python.
### Theme persistence

- The theme defaults to your system setting and remembers your choice in `localStorage`.
## Run locally (no build needed)

Just open `index.html` in your browser. For best results, use a lightweight server (avoids some browser restrictions on local files):

```powershell
# from the project folder
# Option A: PowerShell simple server (requires Python)
python -m http.server 8000
# Option B: If you use VS Code, install the Live Server extension and click "Go Live"
```

Then visit http://localhost:8000 in your browser.

## Email options

- By default, the form composes a `mailto:` link and opens your mail app.
- The "Copy" button copies your email address to the clipboard.
- Want direct form submissions without opening mail? Use Formspree:
  1. Create a free form at https://formspree.io
  2. Replace the form handler in `index.html` with your Formspree endpoint, e.g.:

     ```html
     <form action="https://formspree.io/f/yourFormId" method="POST">
       <!-- keep the same fields -->
     </form>
     ```

  3. Remove the JS `submit` handler in `assets/js/main.js` (or wrap it in a feature flag) so the native POST works.

Note: GitHub Pages is static hosting—no server code runs there. Services like Formspree or EmailJS are common workarounds.

## Deploy to GitHub Pages

1. Create a new GitHub repo named `portfolio` (or any name you like).
2. Initialize the folder as a git repo, commit, and push:

```powershell
cd d:\Portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to your repo Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` (root)
   - Save. Your site will be published at `https://<your-username>.github.io/<your-repo>/`.

4. Optional: Use a custom domain (Settings → Pages → Custom domain). Create a CNAME in your DNS.

## Edit categories or tabs

- Tabs are defined in `index.html` under the Projects section.
- The filter logic reads the `category` field in `PROJECTS` from `assets/js/main.js`.
- To add a new category:
  - Add a new button with `data-filter="YourCategory"`
  - Use the same category name in your projects.

## Notes

- No frameworks or build steps; easy to host anywhere.
- Accessibility: focus styles, ARIA on tabs, and semantic HTML.
- Performance: light CSS and vanilla JS, images are lazy-loaded when provided.

## Analytics (optional)

This template includes Plausible analytics (privacy-friendly, no cookies). To enable:

1. In `index.html`, replace the `data-domain` value on the Plausible script with your domain, for example:
   - If using GitHub Pages user site: `your-username.github.io`
   - If using a project site: still use `your-username.github.io` for the domain
2. Create an account at https://plausible.io and add your site. You should see events like:
   - `Project Click` (title + demo/code click)
   - `Feedback` (emoji reaction)
3. If you don't want analytics, remove the `<script ... plausible>` tag from `index.html`.

## Feedback bar

Under the Projects section there is a tiny emoji bar (“Was this helpful?”). Clicking an emoji:

- Sends a `Feedback` event to Plausible (if enabled).
- Stores a flag in `localStorage` to avoid repeat feedback prompts.

## Resume section

- Place your PDF at `assets/resume/YourName_Resume.pdf`.
- The Resume buttons will download or open this file in the browser.

## Where to put images and videos

- Images: put project screenshots in `assets/images/projects/` and reference them in `assets/js/main.js` via relative paths, e.g.

   ```js
   media: { images: ["assets/images/projects/neon-1.jpg", "assets/images/projects/neon-2.jpg"], video: null }
   ```

- Videos: put MP4s in `assets/videos/projects/` and reference them similarly:

   ```js
   media: { images: [], video: "assets/videos/projects/demo.mp4" }
   ```

- YouTube: just paste the normal YouTube link in `media.video`; it will auto-embed.

### Add your photo to the hero

- Place your headshot at `assets/images/picture.png` (or change the path in `assets/js/main.js` under `CONFIG.photo`).
- Square image recommended (at least 512×512). It displays as a circle and scales responsively.

## Inline code examples

- Place full Unity scripts (or any text files) anywhere under `assets/scripts/`.
- In `assets/js/main.js`, set a project's snippet like:

   ```js
   snippets: [{ title: "GalacticForce/Game1.txt", language: "csharp", path: "assets/scripts/cs/Game1.txt" }]
   ```

- The modal will fetch and display the entire file so people can read the full source.
- Inline previews require serving the site via `http://` (e.g., VS Code Live Server). When opening directly via `file://`, use the "View full file" button—the overlay opens the raw script instead.

## License

MIT
