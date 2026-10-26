# HR Tool — screen prototypes (prototypes/hr-tool)

This folder holds the HTML screens for the HR Tool product. Anything pushed here can be viewed on GitHub Pages straight away.

- Site: https://yjkim9627-gif.github.io/formee-education/
- Files in this folder: https://yjkim9627-gif.github.io/formee-education/prototypes/hr-tool/your-file.html

## Where things go

| What | Where |
|---|---|
| HR Tool screens (pages) | `prototypes/hr-tool/` ← this folder |
| HR Tool components | `components/hr-tool/` (14 components are already there) |
| Components shared across products | `components/shared/` |
| Design tokens (colour · spacing · type) | `tokens/tokens.css` |

- Feel free to split screens into subfolders, e.g. `prototypes/hr-tool/recruiting/`, `prototypes/hr-tool/onboarding/`.
- Please don't edit other products' folders (`ai-social-media`, etc.).

## Paths (so links don't break)

Use **relative paths** for CSS, images and links to other pages. From this folder:

```html
<link rel="stylesheet" href="../../tokens/tokens.css">
<link rel="stylesheet" href="../../components/hr-tool/form-field.css">
<img src="assets/sample.png" alt="">  <!-- an image kept in prototypes/hr-tool/assets/ -->
```

Inside a subfolder, add one more `../` (e.g. `../../../tokens/tokens.css`).
Paths that only exist on your computer (`C:\...`, `/Users/...`) or `file://` links won't open on the site.

## How to upload

1. Always get the latest version before you start: `git pull`
2. Put your files in this folder
3. Commit and push: `git add prototypes/hr-tool` → `git commit -m "HR Tool: ..."` → `git push`
4. Check the site after 1–2 minutes
5. To list a page on the front page (index), send Yejin the file name — `index.html` is edited by several people, so this avoids conflicts

## Please note

- The site is **visible to anyone with the link.** Don't include real employee names, contact details, salaries or other personal data — use sample data instead.
