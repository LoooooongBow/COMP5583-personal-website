# Zhang Kanghe Academic Homepage

A static personal academic website built with HTML, CSS, and JavaScript only.

## Files

- `index.html` — page structure and content
- `style.css` — visual design and responsive layout
- `script.js` — language switch, light/dark theme switch, and active navigation state

## Run locally

### Option 1: Open directly

Open `index.html` in a web browser.

### Option 2: Use a local static server

From this directory, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy with GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the branch containing the site (normally `main`) and the `/ (root)` folder.
6. Save the settings. GitHub Pages will publish the static site.

## Add the portrait later

Replace the placeholder inside `.avatar-frame` in `index.html` with an image element, for example:

```html
<img class="avatar-image" src="assets/profile.jpg" alt="Portrait of Zhang Kanghe">
```

Then add the image file to the project.
