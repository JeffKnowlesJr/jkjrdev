# Public Release Process

A reusable checklist for taking a private Next.js project and publishing a clean, sanitized version to GitHub. Based on the actual process used to publish this repo.

---

## Prerequisites

1. Make a **separate copy** of the project directory (e.g. `my-project-public/`). Do not work in the original — this process is destructive.
2. Confirm the target GitHub repo exists and is **empty** (no branch, no auto-generated README, license, or `.gitignore`). Create it empty.
3. Confirm there is **no `.git` folder** in the copy. If there is, delete it. This ensures no private history leaks.

---

## Phase 1 — Audit first

Before deleting anything, run a full audit so you know exactly what you're dealing with. Look across these categories:

### Secrets and credentials
- `.env.local`, `.env.production`, any filled `.env.*` file
- `*-service-account*.json`, `credentials.json`, `*.pem`, `google-services.json`, or similar cloud credential files
- Hardcoded API keys, tokens, or passwords anywhere in source
- `.npmrc` — check for auth tokens

### Hardcoded identifiers
- Cloud account IDs (AWS 12-digit, Cloudflare 32-hex, GCP project slugs)
- Hosted zone IDs, resource ARNs, certificate UUIDs
- Real deployment site IDs or project names in config files at the repo root (e.g. a deploy config)
- Personal emails and phone numbers — decide which are intentionally public

### Internal / unpublished content
- Check every content file (blog posts, project case studies, etc.) for `status: draft` in frontmatter. Draft files should not be committed even if the site already filters them out — the raw markdown is still readable in the repo.
- Docs that are internal strategy, SEO planning, retrospectives, social media drafts, or pricing notes
- Any doc that references deleted infrastructure or unpublished features

### Legacy / dead code
- Directories from a previous stack (e.g. `archive/`, `legacy/`, `src-legacy/`)
- Dead service files that are no longer imported anywhere (grep for their import paths to confirm)
- Build scripts in `package.json` that point to files that no longer exist — these will error and look sloppy

### Build artifacts
- `out/`, `.next/`, `.swc/`, `node_modules/` — should be gitignored, not committed
- Local asset sources that have already been processed (e.g. raw screenshots in `screens/` whose resized outputs are already in `public/`)

---

## Phase 2 — Delete directories

Delete everything that must never be public. Common candidates:

| Directory | Why |
|-----------|-----|
| `archive/` or `legacy/` | Usually contains old configs, JSON policies, or source with real account IDs |
| `docs/archive/` | Legacy infra docs often embed real ARNs, API IDs, account numbers |
| `docs/keywords/` or similar | Internal SEO strategy |
| `scripts/archive/` | Legacy setup scripts for a previous stack |
| `screens/` | Raw local screenshots (resized outputs belong in `public/`) |
| `out/`, `.next/`, `.swc/` | Build artifacts — already gitignored but clean them anyway |

Run the deletions, then spot-check that the directories are gone:

```bash
ls archive/ legacy/ docs/archive/ 2>/dev/null && echo "still present" || echo "gone"
```

---

## Phase 3 — Delete individual files

Remove individual files that are internal or contain sensitive identifiers. Common candidates:

- Internal planning docs (retrospectives, social copy drafts, product notes)
- Any doc that contains a real hosted zone ID, resource ARN, or account number
- Outdated docs that describe a stack no longer in use (misleading if public)
- Dead source files with no live importers (confirm with grep before deleting)
- All content files with `status: draft` in frontmatter

---

## Phase 4 — Sanitize remaining files

### README.md
Work through the README line by line:
- Replace any literal cloud account IDs with `<your-account-id>` placeholders
- Fix or remove any broken links (e.g. links to workflow files or docs that were deleted)
- Remove references to AWS, GCP, or other infrastructure no longer in use
- Remove the "Legacy AWS docs are in `docs/archive/`" type sentences
- Update the directory tree in the README to match what actually exists now

### docs/README.md (if it exists)
- Remove any "Legacy architecture" sections
- Remove all links to deleted docs

### package.json
- Remove every script whose target file no longer exists (broken scripts make a bad impression)
- Remove dependencies that were only used by deleted code (confirm with grep)
- Run `npm install` to refresh `package-lock.json`

### Cross-reference sweep
After the above edits, grep for stale references to anything you deleted:

```bash
grep -rnE "archive/|legacy/|keywords/" \
  --include='*.md' --include='*.ts' --include='*.tsx' \
  --include='*.js' --include='*.json' --include='*.mjs' \
  docs/ src/ scripts/ functions/ content/ README.md 2>/dev/null
```

Fix any matches that reference deleted paths.

---

## Phase 5 — Harden `.gitignore`

Add entries for everything you deleted (belt-and-suspenders against accidental re-creation):

```gitignore
# Local-only asset sources
/screens/

# Editor / OS
.DS_Store
Thumbs.db

# Explicit denylist — intentionally excluded from this repo
/archive/
/docs/archive/
/docs/keywords/
/scripts/archive/
```

Also verify the existing `.gitignore` covers:
- `.env*` / `.env.local` / `.env.production`
- Build output: `/out/`, `/.next/`, `/build/`
- Credentials: `*service-account*.json`, `credentials.json`, `*.pem`

---

## Phase 6 — Gate checks (run before `git add`)

All of these must print `OK` before proceeding:

```bash
# 1. No .env files will be staged (verify gitignore is working)
ls .env.local .env.production 2>/dev/null && echo "FAIL: verify these are in .gitignore" || echo "OK"

# 2. No credential files at root
ls *service-account*.json credentials.json *.pem 2>/dev/null && echo "FAIL" || echo "OK"

# 3. No hardcoded real identifiers (substitute your actual values)
grep -rE "YOUR_REAL_ACCOUNT_ID|YOUR_REAL_ZONE_ID|YOUR_REAL_API_ID" \
  docs/ src/ scripts/ functions/ content/ README.md \
  --include="*.md" --include="*.ts" --include="*.tsx" \
  --include="*.js" --include="*.mjs" --include="*.json" 2>/dev/null \
  && echo "FAIL: identifier leak" || echo "OK"

# 4. No archive directories still present
ls archive/ legacy/ docs/archive/ docs/keywords/ scripts/archive/ 2>/dev/null \
  && echo "FAIL: directory still present" || echo "OK"

# 5. No draft content files
grep -rl "status: draft" content/ 2>/dev/null \
  && echo "FAIL: draft content files still present" || echo "OK"
```

---

## Phase 7 — Initial commit and push

### Initialize and stage

```bash
git init -b main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git add -A
```

### Verify the staged index before committing

```bash
git ls-files | grep -E "\.env\.local$|service-account|/archive/|/keywords/|status: draft" \
  && echo "STOP: sensitive/unwanted file staged" || echo "index clean"
```

If anything appears above "index clean", do not proceed — remove those files and re-add.

### Create the commit, bypassing global git hooks

Global git hooks (e.g. ones that inject tool-identifying trailers into commit messages) can pollute a clean initial commit. Use `git commit-tree` to bypass them entirely:

```bash
TREE=$(git write-tree)
COMMIT=$(git commit-tree "$TREE" \
  -m "Initial public release" \
  -m "One sentence describing the project.")
git update-ref refs/heads/main "$COMMIT"
```

Confirm the commit message is clean (no injected trailers):

```bash
git log -1 --format=fuller
```

### Push

```bash
git push -u origin main
```

If the remote already has an auto-generated commit (e.g. a README from GitHub's UI), use `--force-with-lease` for the first push only:

```bash
git push --force-with-lease origin main
```

---

## Phase 8 — Post-push verification

```bash
# No internal/sensitive paths in the remote tree
git ls-tree -r --name-only HEAD | grep -E \
  "archive/|/keywords/|\.env\.local$|service-account" \
  && echo "FAIL" || echo "OK"

# No .env files tracked
git ls-files | grep -E "^\.env" && echo "FAIL" || echo "OK"

# Only one commit (clean slate)
git log --oneline | wc -l
```

Then on GitHub:
- Open **Commits** — confirm only your intended initial commit appears.
- Browse the file tree — spot-check that no sensitive directories or files are visible.
- Go to **Settings → General → Danger Zone** and set the repo to **Public** once satisfied.

---

## Phase 9 — Final touches

- Add a **LICENSE** file if open-sourcing. For MIT:

```bash
# GitHub will offer to add one via the UI, or use the template in this repo's LICENSE file
```

- Add **topics/tags** in the GitHub repo's About section for discoverability.
- Confirm the repo description is set.

---

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|----------------|-----|
| Draft content committed | Raw markdown of unpublished articles visible in repo even though the site doesn't render them | Grep for `status: draft` in `content/` before staging |
| Account IDs left in README | Cloud account ID visible to anyone reading the README | Replace with `<your-account-id>` placeholder |
| Broken `package.json` scripts | Scripts pointing to deleted files error on first `npm run` | Remove any script whose target file no longer exists |
| Archive dir re-created locally | Local work re-creates a deleted directory; next `git add` stages it | Add deleted dirs to `.gitignore` explicitly |
| `commit-tree` skipped | Global hook injects a tool-identifying trailer | Always use `git commit-tree` for the initial public commit |
| `--force-with-lease` forgotten | Push rejected when remote has a template commit | Use `--force-with-lease` for first push to a non-empty remote |
