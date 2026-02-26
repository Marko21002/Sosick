# Security Audit Report — Sosick Templates

**Date:** 2026-02-26
**Scope:** Full repository security review
**Severity Scale:** CRITICAL / HIGH / MEDIUM / LOW / INFO

---

## Summary

The Sosick codebase is a collection of static HTML landing page templates plus a Python lead-generation scraper. Since no backend server or database is included, the attack surface is relatively limited. However, several issues were found that should be addressed before production deployment.

| Severity | Count |
|----------|-------|
| HIGH     | 2     |
| MEDIUM   | 4     |
| LOW      | 3     |
| INFO     | 3     |

---

## HIGH Severity

### 1. Shell Script Command Injection (`lead-generator/simple_search.sh`)

**File:** `lead-generator/simple_search.sh:4-6`

```bash
CATEGORY="${1:-cafe}"
LOCATION="${2:-Wien}"
OUTPUT="leads_${CATEGORY}.csv"
```

The `$CATEGORY` and `$LOCATION` variables are derived from user-supplied command-line arguments and used without sanitization. While the script is currently a template with no real scraping logic, the unquoted interpolation in the echo URL and the filename construction could enable:
- Path traversal via crafted filenames (e.g., `../../etc/something`)
- Command injection if the script is later extended with `eval` or unquoted usage

**Recommendation:** Quote all variable expansions and validate inputs:
```bash
CATEGORY="$(echo "${1:-cafe}" | tr -cd '[:alnum:]-')"
```

### 2. `innerHTML` Used with Translation Data — DOM XSS Risk

**Files:**
- `templates/agency-pixelforge.html:1071` — `el.innerHTML = t[lang][key];`
- `templates/tea-ceremony-thalheim.html:1240` — `if (t[key]) el.innerHTML = t[key];`
- `templates/reinigung-multilang.html:1196` — `.innerHTML = template literal`
- `templates/universal-funnel.html:923` — `submitBtn.innerHTML = ...`

While the translation data is currently hardcoded and safe, using `innerHTML` to set content creates a latent XSS vulnerability. If translation strings are ever loaded from an external source (CMS, API, URL parameter), this becomes a direct DOM XSS vector.

**Recommendation:** Replace `innerHTML` with `textContent` wherever HTML markup is not required. For the few cases where HTML is needed (e.g., the logo span in reinigung-multilang.html), use DOM creation methods instead.

---

## MEDIUM Severity

### 3. Missing `rel="noopener noreferrer"` on All `target="_blank"` Links

**Files:** `index.html` (11 instances), `templates/agency-nexa-v4.html`, and others

Every `target="_blank"` link in the project is missing `rel="noopener noreferrer"`. This exposes users to:
- **Reverse tabnapping:** The opened page can access `window.opener` and redirect the original tab to a phishing page.

**Recommendation:** Add `rel="noopener noreferrer"` to every `target="_blank"` link.

### 4. No Content Security Policy (CSP) Headers

**Files:** All HTML files

None of the templates include a `Content-Security-Policy` meta tag or header. This means:
- Inline scripts execute without restriction
- No protection against injected scripts from browser extensions or XSS
- No restriction on which domains can serve resources

**Recommendation:** Add at minimum a meta CSP tag to each template:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;">
```

### 5. Form Data Logged to Console in Production Templates

**Files:**
- `templates/zahnarzt-quiz.html:653` — `console.log('Lead:', answers);`
- `templates/universal-funnel.html:926` — `console.log('Lead captured:', formData);`

Personal data (name, phone, email) is logged to the browser console. Any browser extension or shared-computer scenario could expose this PII.

**Recommendation:** Remove `console.log` statements that contain user PII, or gate them behind a debug flag.

### 6. Python Scraper — No SSL Certificate Verification Enforcement

**File:** `lead-generator/vienna_scraper.py:31`

```python
response = self.session.get(url, timeout=10)
```

While `requests` verifies SSL by default, there is no explicit enforcement (`verify=True`) and no error handling for SSL failures. A silent fallback or future change to `verify=False` could expose scraped data to MITM attacks.

**Recommendation:** Explicitly set `verify=True` and handle `SSLError` separately from general exceptions.

---

## LOW Severity

### 7. Fake/Placeholder Calendly Link Exposed

**File:** `templates/agency-nexa-v4.html:1261`

```html
<a href="https://calendly.com/YOUR-CALENDAR-LINK" target="_blank">
```

A placeholder URL is in the template. If deployed without replacement, users click through to an invalid Calendly page, or worse, someone could register that Calendly slug to collect leads.

**Recommendation:** Replace with a clearly broken placeholder like `#REPLACE-WITH-YOUR-LINK` or add a build-time check.

### 8. Python Scraper — Spoofed User-Agent String

**File:** `lead-generator/vienna_scraper.py:18`

```python
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
```

The scraper impersonates a real browser. While common in web scraping, this may violate the Terms of Service of herold.at and could result in IP bans or legal issues.

**Recommendation:** Use a transparent user-agent or respect `robots.txt`.

### 9. Broad Exception Handling in Scraper

**File:** `lead-generator/vienna_scraper.py:45-47, 86-87`

```python
except Exception as e:
    print(f"✗ Error on page {page}: {e}")
    continue
```

Catching all exceptions silently and continuing can mask serious issues (network failures, auth errors, rate limiting). Security-relevant errors (SSL failures, HTTP 403) are swallowed.

**Recommendation:** Catch specific exceptions (`requests.RequestException`, `ValueError`) and log appropriately.

---

## INFO

### 10. Forms Collect PII but Have No Backend

Multiple templates collect name, phone, and email data in quiz forms but the `submitForm()` functions only show a success message — data is never actually sent anywhere. This means:
- Lead data is silently lost (functional bug, not security)
- When a backend is added, proper HTTPS, CSRF protection, and input validation will be needed

### 11. No HTTPS Enforcement

None of the templates include `<meta http-equiv="Strict-Transport-Security">` or redirect logic. When deployed, the hosting provider (e.g., Vercel) typically handles HTTPS, but the templates themselves don't enforce it.

### 12. localStorage Used Without Expiry

**Files:** `index.html:442`, `templates/tea-ceremony-thalheim.html:1230`, `templates/agency-nexa-v4.html:1604`

Language preference is stored in `localStorage` indefinitely. While this is only a preference (not sensitive data), it's worth noting for GDPR compliance that any client-side storage should be documented.

---

## Files Reviewed

| Path | Type | Status |
|------|------|--------|
| `index.html` | Main landing | Reviewed |
| `lovecode/index.html` | Course template | Reviewed |
| `templates/*.html` (16 files) | Landing templates | Reviewed |
| `templates/translations.js` | i18n module | Reviewed |
| `lead-generator/vienna_scraper.py` | Python scraper | Reviewed |
| `lead-generator/simple_search.sh` | Shell script | Reviewed |
| `lead-generator/email_template_de.txt` | Email template | Reviewed |
| `lead-generator/email_template_ru.txt` | Email template | Reviewed |
| `.gitignore` | Git config | Reviewed |

---

## Positive Findings

- No hardcoded API keys, tokens, or secrets found in the repository
- `.gitignore` correctly excludes credentials, `.env`, and token files
- No external JS libraries with known vulnerabilities (no npm dependencies)
- No database connections or SQL queries (no SQL injection risk)
- No server-side code that could be exploited remotely
- Forms use basic client-side validation where applicable
