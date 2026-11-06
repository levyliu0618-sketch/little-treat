# Little Treat

An interactive mobile web prototype for a personal shopping sidekick. Make yourself at home, compare sample offers, save a wishlist, and get a second thought from Momo the dog.

## Open the app

[Live demo](https://levyliu0618-sketch.github.io/little-treat/)

## Make your own version with an AI agent

1. Fork this repository to your GitHub account, or download the ZIP from **Code → Download ZIP**.
2. Open your copy in an AI coding tool, or attach the ZIP to a tool that can edit files.
3. Give it this request: “Read README.md and AGENTS.md. Keep the app working and change [describe your idea]. Preview and test the changes.”
4. Save changes in your own fork. Editing this original repository requires the owner's permission.

A shared URL lets a tool read public source when it supports browsing or GitHub access; the URL alone does not give it write access.

## Run locally

No installation, build step, API key, or paid service is required. From this folder:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. You can also open index.html directly for a quick preview.

## Files

- `index.html`: desktop presentation and mobile app shell
- `app.js`: navigation, inventory, sample prices, wishlist, chat and outfit interactions
- `style.css`: base styles
- `refinement.css`: current visual refinements, loaded after base styles
- `assets/artwork/`: illustrated rooms, character sheets and product renders
- `assets/logos/`: retailer icons and source notes

## Demo walkthrough

Open Compare, switch Almond body wash from 500 ml to the distinct 100 ml bottle, inspect five example offers, and save a plan. Visit Wishlist, preview the item in a room, or mark it as purchased. Tap the dog to chat. Wardrobe also includes an outfit board. The desktop “Try the little story” button guides a presentation.

## What is simulated

Prices and products are fictional demonstration data. Momo uses local scripted responses, not a connected language model. There is no checkout, live price tracking, automatic photo recognition, or account system. Inventory, preferences, wishlist and uploaded images stay in this browser's local storage. Use Reset demo to reset that browser's demo.

## Publish your fork

In your fork, open Settings → Pages, choose Deploy from a branch, then main and /(root). Save. Update the demo link in your README to match your GitHub username and repository name.

Artwork was AI-generated for this prototype. Retailer logos belong to their respective owners and are used only to identify example platforms; no affiliation is implied. See assets/logos/SOURCES.txt.
