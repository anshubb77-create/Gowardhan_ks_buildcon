# Gowardhan_ks_buildcon

Gowardhan_ks_buildcon webpage source code.

A responsive website built with native HTML, CSS and JavaScript ES modules. No backend or third-party packages are required.

## Structure

- `index.html` — document shell and module entry point.
- `styles.css` — luxury editorial theme, responsive layouts, and reduced-motion-aware transitions.
- `websiteData.js` — editable business content and imagery.
- `components.js` — shared navigation, footer and division switcher.
- `pages/` — route-specific page composition for home, construction, interiors, projects and contact.
- `script.js` — shared section rendering, form and estimate behavior, project filters, and hash routing.
- `pages/admin.js` — local admin login, content editor, and enquiry inbox.
- Consultation submissions and admin edits are stored as JSON strings in this browser's local storage.

Routes: `#/`, `#/construction-planning`, `#/space-interior-design`, `#/projects`, and `#/contact`.

Edit `websiteData.js` to update text, images (URL or a local path under `images/`), projects, materials, rates, payment milestones and form options. Local image filenames are mapped to the matching service, style and project entries.

## Run the website and configure admin access

Use VS Code Live Server or any local web server to open `index.html`. Open `#/admin` (or use the Admin link in the footer) and create an admin password the first time.

The consultation form does **not send data to anyone**. On submit, its required and optional answers are saved locally as JSON in browser storage on that device. From Admin, review the enquiries or download them as `inquiries.json`. Change the admin password from the **Change admin password** panel after logging in. Website content edits are also local to this browser.

Local storage is specific to the browser and website address: entries won't automatically appear on another device, browser, or port. Download an enquiry JSON backup from Admin before clearing browser data. The exported file can be opened outside the website, so keep it private.

This browser-only admin password is an access gate for the admin interface, not server-grade authentication. Anyone with access to the browser's developer tools or profile can access its local storage. Use a server-backed system only if you later need shared, cross-device or stronger protected storage.

All prices, projects and milestones included are sample placeholders — replace with verified data.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` deploys the site whenever changes are pushed to `main`. In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions**. After the first successful workflow run, GitHub will show the published site URL in that Pages settings screen and in the workflow deployment environment.

GitHub Pages serves static files, so the admin password, enquiry records, and content edits continue to stay in the current browser's local storage. They are not uploaded to GitHub. Use the same browser and published site address to access that browser's Admin inbox; download enquiry JSON backups from Admin if needed.
