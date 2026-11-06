# Working on Little Treat

This is a static English-language prototype, not a production shopping service.

- Read README.md first. No framework or build step is needed.
- Preserve the cream/ink/blue palette, detailed monochrome room illustrations, realistic product images, dog character, and phone proportions unless the requested change requires otherwise.
- Keep product images opaque, with normal blending, above room outlines. Do not restore multiply blending on products or their parent containers.
- The 100 ml Almond body wash has its own image; preserve size-dependent rendering in comparisons, saved wishlist plans and purchased inventory.
- Keep all visible app copy in English. Keep demo offers clearly labeled.
- Do not add API keys, tracking, checkout, live pricing or automatic photo access without a specific request.
- Browser data is local; do not publish personal photos or browser storage.
- For modifications, run `node --check app.js` if Node is available, serve the folder locally, and inspect the affected views in both desktop and mobile widths.
- Check room/product layering, size switching, dog chat, navigation, sheet safe areas and wishlist behavior when related code changes.
- Use relative asset paths so GitHub Pages project hosting works.
