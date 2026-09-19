# GoHighLevel integration plan

The site is prepared for a secure GoHighLevel connection without placing API keys, private tokens, or webhook credentials in the browser or repository.

## Current preparation

- `config.js` provides a public `contactEndpoint` hook and contains no credentials.
- `script.js` serializes the existing contact form and posts JSON to that endpoint when configured.
- With the endpoint blank, the current local success confirmation remains unchanged.
- The form remains a standard DOM form with named fields, which keeps it compatible with HighLevel External Tracking when that script is enabled in the account.

## Recommended production architecture

1. Create a small server-side or serverless endpoint such as `/api/contact`.
2. Store the GoHighLevel webhook URL, API key, and location information as server-side environment variables.
3. Validate required fields and reject oversized or malformed requests.
4. Add spam protection and rate limiting before forwarding submissions.
5. Map the form fields to GoHighLevel contact fields and a consultation-request opportunity or workflow.
6. Set `contactEndpoint` in `config.js` to the deployed endpoint URL only after the endpoint is live.

GitHub Pages can host this static frontend, but it cannot safely hold private GoHighLevel credentials or run the server-side proxy. Use a serverless provider or a secure CRM form/webhook service for that layer.

## HighLevel connection options

### Option A: External Tracking

Use HighLevel's External Tracking script when you want to keep this custom-designed form. The script can observe standard HTML forms and named fields on an external website. Add the account-provided tracking script before `</body>` only after the tracking ID and consent approach are confirmed.

### Option B: HighLevel form embed

If you prefer HighLevel to own validation, spam controls, and submission handling, create the form in HighLevel and replace the current form markup with the official embed code from the form builder's **Integrate** panel. This is the simplest route, but it may require additional CSS work to match the current visual design.

Do not add a Private Integration Token, API key, webhook secret, or location credential to `index.html`, `script.js`, or `config.js`. HighLevel recommends Private Integration Tokens over legacy API keys for secure custom API connections; keep them in the server-side environment of the endpoint.
