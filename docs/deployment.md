# Deployment and domain setup

## GitHub Actions

`.github/workflows/deploy-pages.yml` publishes the static site to GitHub Pages whenever `main` changes. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once, then monitor the workflow under the **Actions** tab.

## Cloudflare custom domain

The exact DNS records depend on the domain name. Once the domain is confirmed:

- Add the domain in **GitHub → Settings → Pages → Custom domain**.
- Add the GitHub Pages records GitHub displays in Cloudflare DNS.
- For an apex domain, GitHub commonly provides four `A` records pointing to its Pages IPs.
- For `www`, GitHub commonly provides a `CNAME` pointing to `bryanzevada.github.io`.
- Leave DNS records as **DNS only** while GitHub verifies the domain and provisions HTTPS; Cloudflare proxying can be evaluated afterward.
- Enable **Always Use HTTPS** after the certificate is active.

Do not add a `CNAME` file until the final domain is confirmed.
