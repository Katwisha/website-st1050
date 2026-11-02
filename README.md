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

## SEO and search visibility

- Each page has a page-specific title, meta description, canonical URL, and social-sharing metadata. The homepage also declares `Organization` and `WebSite` structured data for THE HUB and its Western Cape roots.
- `robots.txt` allows crawling and points search engines to `sitemap.xml`, which lists the homepage, contact, enquiry, and privacy pages.
- The homepage includes indexable show content in its HTML as a fallback if JavaScript or the show catalogue request is unavailable. Headings, page language, image alternatives, and internal links provide additional context and accessibility.
- The current canonical domain is `https://collectivehub-homepage.netlify.app/`. If the production domain changes, update the canonical, Open Graph, and structured-data URLs in the HTML, plus the sitemap and sitemap reference in `robots.txt`.
- The page topics reflect THE HUB's music, gaming, live-stream, event, and creator-collaboration offering; they are not a substitute for keyword-volume or competitor research. No search-ranking or traffic outcome is guaranteed.
- Search Console, analytics, a live Core Web Vitals baseline, and keyword research have not been configured. After confirming the domain, verify it in Google Search Console and submit `/sitemap.xml`; choose analytics only after privacy and consent requirements are decided.

## Enquiry forms

`contact.html` contains the general contact form (`hub-contact`); `enquiry.html` contains the show, stream, event, community, and collaboration form (`hub-enquiry`). Both forms:

- Use native required-field, email, length, phone-format, and privacy-consent validation, with accessible submission-status messaging.
- Include a hidden `form-name` field and Netlify honeypot, and submit asynchronously to Netlify Forms when hosted on Netlify. Enquiry submissions do not confirm a booking, event place, or availability.
- Show an explicit failure state and offer a prefilled email draft to `katakanna18@gmail.com` if online submission fails. The visitor must review and send the draft themselves.

The production Netlify site is connected to this repository's `main` branch, publishes the repository root, and has detected both forms. Submissions can be reviewed in the site's Netlify Forms dashboard. **Email notifications are not configured:** Netlify rejected `katakanna18@gmail.com` because notification recipients must be members of the Netlify team. Add the intended recipient to the team (after reviewing the access this grants) or select an existing team-member address, then configure a notification for any form. Do not treat dashboard form detection as proof that email delivery is set up. No real enquiry has been submitted to test delivery.

## Deployment and verification

Netlify deploys the repository root from `main` when changes are pushed. For a different site or domain, confirm the Netlify site and publish directory, then update all production URLs noted in the SEO section. After deploying, verify both form names appear in Netlify Forms, configure an eligible notification recipient, and submit a controlled test enquiry before relying on email delivery.

## Run locally

From this directory, start Python's simple local server:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000/`. Forms require a deployed Netlify site for online submission; on a local server the email-draft fallback is available. The map requires an internet connection.

## Remaining launch and growth tasks

1. Resolve the Netlify team-member requirement for form email notifications, then test delivery without using a real visitor enquiry.
2. Confirm the contact address, brand copy, show schedule, event venues/dates, and rights for any future event photography.
3. Add verified social channel URLs when available. They are intentionally omitted for now.
4. Conduct keyword and competitor research before treating the current page topics as a final SEO strategy; verify the production domain in Search Console and monitor indexing and Core Web Vitals.
5. Connect an analytics provider only after the account and applicable privacy and consent requirements are confirmed.
