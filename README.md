# Foodbridge Dashboard — Mockup v1

Static, clickable mockup of an admin dashboard module: five KPI tiles over five report tabs, plus the
screens its row actions lead to. Plain HTML, CSS and vanilla JS driven by one seed file — no
framework, no build step, no backend.

**Live site:** https://nidhimehta9399.github.io/foodbridge-dashboard-mockup/

## What this is

A published copy of a **frozen discovery snapshot** — a design mockup used to agree on layout and
behaviour before implementation. It is not the product, and nothing here is a running service.

- Nothing is saved; every interaction is local to the page and a reload resets it.
- The data is invented — representative shapes and volumes, not real figures.
- A few edges are deliberate dead ends and say so when clicked (creating an order, sending a
  reminder, connecting a thermal printer) because they belong to other modules.

## Layout

```
index.html      landing page — links every screen and section
robots.txt
v1/             the frozen snapshot, byte-for-byte, unaltered
  index.html                     wiring hub: event → destination map
  README.md                      what v1 accepted, and its known gaps
  screens/dashboard/
    dashboard.html               the screen: 5 KPI tiles + 5 report tabs
    index.html                   module hub — what each tab answers
    order.html                   order detail        ?order=<id>&status=<status>
    order-timeline.html          fulfilment timeline ?order=<id>&status=<status>
    shell.js                     sidebar + header chrome, shared by every screen
    dashboard.js                 the five report tabs
    invoice.js                   A4 + thermal print flows
    reminders.js                 follow-up reminders modal
    icons.js                     inlined icon set
    seed.inline.js               seed mirrored as a script (file:// blocks fetching JSON)
  seed-data/seed.json            the canonical seed
```

`v1/` is frozen: it will not change. A later design iteration is added as its own version folder
alongside it, never by editing this one.

## Running it locally

Open `index.html` directly — it works from `file://`. A network connection is needed because the
stylesheet loads from a CDN at runtime.
