# THE HUB

A responsive community website for THE HUB, a Western Cape-rooted platform for music, gaming, live streams, events, and real conversation with an international audience.

## Pages and features

- `index.html` — shows with searchable category filters and sorting, event-interest CTA, original SVG artwork with an accessible lightbox, Western Cape map, and FAQ accordions.
- `contact.html` — general contact form with client-side validation and asynchronous Netlify Forms submission.
- `enquiry.html` — show, stream, event, community, and creator/brand collaboration enquiries.
- `privacy.html` — explains form processing and the embedded map.
- `shows.json` — show catalogue dynamically loaded by the front end; the page also retains static HTML cards as a search-engine and no-JavaScript fallback.
- `styles.css` and `app.js` — shared responsive styles and accessible interactions.
- `robots.txt` and `sitemap.xml` — crawler guidance and canonical page URLs.
- `netlify.toml` — static publishing, legacy-page redirect, and security headers.

The official social account URLs are intentionally not included until THE HUB supplies and verifies them.

## Forms

Both forms use native HTML validation, additional length and phone-format constraints, an accessible status message, and an asynchronous POST suitable for Netlify Forms. On a Netlify deployment, enable form detection and configure form email notifications in the Netlify site dashboard to deliver submissions to `katakanna18@gmail.com`. Dashboard notification setup cannot be completed from this repository.

If online delivery is unavailable, the form clearly says the submission was not sent and offers a prefilled email draft. The visitor must review and send that draft from their email application. An enquiry does not confirm availability, an event place, or a booking.

## Run locally

From this directory, start Python's simple local server:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000/`. Forms require a deployed Netlify site for online submission; on a local server the email-draft fallback is available. The map requires an internet connection.

## Before launch

1. Confirm the production domain. Canonical URLs and the sitemap currently use `https://collectivehub-homepage.netlify.app/`; update them if a different domain is selected.
2. Deploy this repository to the intended Netlify site, confirm the publish directory is the repository root, and verify both forms are detected.
3. Configure and test Netlify email notifications to `katakanna18@gmail.com`.
4. Confirm the contact address, brand copy, show schedule, event venues/dates, and rights for any future event photography.
5. Add verified social channel URLs when available. They are intentionally omitted for now.
6. Conduct keyword/competitor research before treating the page topics as a final SEO strategy. Connect Search Console and an approved privacy-conscious analytics provider only after the account and consent requirements are confirmed.
