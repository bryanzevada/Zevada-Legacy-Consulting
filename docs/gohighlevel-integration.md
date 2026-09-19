# GoHighLevel integration plan

The site is prepared for a secure GoHighLevel connection without placing API keys, private tokens, or webhook credentials in the browser or repository.

## Current preparation

- `config.js` provides a public `contactEndpoint` hook and contains no credentials.
- `script.js` serializes the existing contact form and posts JSON to that endpoint when configured.
- With the endpoint blank, the current local success confirmation remains unchanged.

## Recommended production architecture

1. Create a small server-side or serverless endpoint such as `/api/contact`.
2. Store the GoHighLevel webhook URL, API key, and location information as server-side environment variables.
3. Validate required fields and reject oversized or malformed requests.
4. Add spam protection and rate limiting before forwarding submissions.
5. Map the form fields to GoHighLevel contact fields and a consultation-request opportunity or workflow.
6. Set `contactEndpoint` in `config.js` to the deployed endpoint URL only after the endpoint is live.

GitHub Pages can host this static frontend, but it cannot safely hold private GoHighLevel credentials or run the server-side proxy. Use a serverless provider or a secure CRM form/webhook service for that layer.
