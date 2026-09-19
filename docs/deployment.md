# Deployment and domain setup

## GitHub Actions

`.github/workflows/deploy-pages.yml` publishes the static site to GitHub Pages whenever `main` changes. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once, then monitor the workflow under the **Actions** tab.

## Cloudflare custom domain: `zlegacyconsulting.com`

The repository now includes a `CNAME` file for the apex domain. In Cloudflare DNS, add these records:

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | DNS only / gray cloud |
| A | `@` | `185.199.109.153` | DNS only / gray cloud |
| A | `@` | `185.199.110.153` | DNS only / gray cloud |
| A | `@` | `185.199.111.153` | DNS only / gray cloud |
| CNAME | `www` | `bryanzevada.github.io` | DNS only / gray cloud |

Then:

1. Open **GitHub → Settings → Pages** for the repository.
2. Confirm the source is **GitHub Actions**.
3. Set the custom domain to `zlegacyconsulting.com` if GitHub has not picked it up from `CNAME`.
4. Wait for DNS verification and HTTPS certificate provisioning.
5. Enable **Enforce HTTPS** in GitHub Pages.
6. Optionally redirect `www.zlegacyconsulting.com` to the apex domain after both are working.

Keep the Cloudflare records as **DNS only** during verification. Cloudflare proxying can be evaluated after GitHub shows the certificate as active.
