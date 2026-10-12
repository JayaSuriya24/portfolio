# Deployment

The site is a fully static Next.js build hosted on Netlify. Source lives on GitHub.

| What | Where |
| --- | --- |
| Live site | https://jayasuriya-manick-portfolio.netlify.app |
| Netlify project dashboard | https://app.netlify.com/projects/jayasuriya-manick-portfolio |
| GitHub repository | https://github.com/JayaSuriya24/portfolio |
| Netlify project ID | `c63a59ee-5501-4075-a076-ccc0d4052811` |

No environment variables or secrets are needed. Netlify detects Next.js on its own and
installs its Next.js runtime, so there is no `netlify.toml`. The build settings it uses:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Build command | `npm run build` |
| Publish directory | `.next` |

## Redeploying

### From your machine (current setup)

The first deploy was uploaded from a local machine with the Netlify CLI. To publish
changes the same way:

```bash
npx netlify-cli login            # one-time, opens the browser to authorise
npx netlify-cli deploy --prod --site c63a59ee-5501-4075-a076-ccc0d4052811
```

`deploy` runs `npm run build` first, then uploads the result. The CLI keeps local state
in `.netlify/`, which is git-ignored.

### Automatically on every push (recommended)

Pushing to GitHub does **not** redeploy the site until the repository is linked:

1. Open the [project dashboard](https://app.netlify.com/projects/jayasuriya-manick-portfolio).
2. **Project configuration → Build & deploy → Link repository**.
3. Choose GitHub, authorise Netlify if asked, and select `JayaSuriya24/portfolio`.
4. Keep the build settings above and save.

After that, every push to `main` builds and publishes, and pull requests get preview URLs.

## Visitor access

Netlify created the project with **site protection** on, so visitors who are not signed in
to the Netlify team are sent to a Netlify login (HTTP 401). To make the site public:

**Project configuration → Access & security → Visitor access → Site protection → No protection.**

Check from a private window, or:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://jayasuriya-manick-portfolio.netlify.app
# 200 = public, 401 = still protected
```

## Renaming or adding a domain

- **Netlify subdomain:** Project configuration → **Change project name**. The project was
  first created as `jayasuriya-portfolio-674` (the plain name was taken) and renamed to
  `jayasuriya-manick-portfolio`; the old address no longer resolves.
- **Custom domain:** Domain management → **Add a domain**, then follow Netlify's DNS
  steps. HTTPS is provisioned automatically.

Whenever the public URL changes, update `siteUrl` in `src/data/profile.ts` and redeploy.
It feeds the canonical URL, Open Graph tags and JSON-LD; while it is still the
`[ADD CANONICAL SITE URL]` placeholder, metadata falls back to `http://localhost:3000`.

## Outstanding before launch

- [ ] Turn off site protection (see [Visitor access](#visitor-access)).
- [ ] Link the GitHub repository for automatic deploys.
- [ ] Set `siteUrl` in `src/data/profile.ts` to `https://jayasuriya-manick-portfolio.netlify.app`
      (or the custom domain).
- [ ] Add `public/resume.pdf`; the "Resume ↓" button 404s without it.
- [ ] Fill the remaining `[ADD …]` placeholders in `src/data/`: project status, GitHub and
      demo links (`projects.ts`), Tools (`skills.ts`), and one set of education dates
      (`education.ts`). Find them with `grep -rn "\[ADD" src/data`.
