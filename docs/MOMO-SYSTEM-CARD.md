# Momo — system card

## Purpose and implementation
A personal shopping companion that helps someone reflect on a purchase, compare fictional offers, and use what they own. Original layout and visual assets remain unchanged.

Browser → POST /api/chat → input validation → lexical retrieval from inventory and seven shopping notes → deterministic demo prices → Gemini generateContent → labeled reply.

Production default: `gemini-3.5-flash-lite`, temperature 0.55, maximum output 600 tokens, minimal thinking. Model selection is a server environment setting. No API key goes into the browser.

## Instructions and iterations
Exact executable instructions: `lib/momo.cjs`, exports `SYSTEM_V1`, `SYSTEM_V2`, and `SYSTEM_V3`. Set `MOMO_SYSTEM_VERSION=v1` or `v2` in the deployment and redeploy to compare. Default is v3.

- v1: basic shopping help, short English responses, use context, do not claim purchases.
- v2: adds user autonomy; gift exception; inventory uncertainty; no invented numeric claims; explicit demo-price language; tone preferences; no claiming actions have been executed; ask at most one relevant follow-up.

- v3: inventory-first personal decisions; latest user purpose and stock corrections; gifts and ingredient questions handled directly; no assumed checkout; up to three short sentences; explicit price requests only.

V2 baseline source commit: `92d51079307da4f1fe19b93e817a04a728c08351`. Desktop evidence contains newly recorded V2 baseline runs, not Claude’s historical outputs. V1 instructions are preserved; no V1 live results are claimed. A single comparison run is not a reliability estimate.

## Knowledge and retrieval
At most 100 text-only inventory records are accepted. V3 selects the current product category and other categories explicitly named in recent user messages, ranks within those candidates and supplies at most four items. It does not use shared room or assistant wording as a relevance signal. Personal inventory is withheld altogether for gift, ingredient, checkout, and live-price questions, where stock jokes are irrelevant. Those turns use SYSTEM_V3_FOCUSED plus a task-specific instruction rather than the general inventory/humor instructions; exact request reconstruction is saved in the evidence package. For the default body-wash scenario, only Oat milk body wash and Backup body wash are selected, rather than all six bathroom items. Up to four relevant shopping principles are selected by lexical matches and purpose hints. Returned IDs expose what was selected. This is lightweight category/lexical RAG, not semantic embeddings; ambiguous product names and category labels remain a limitation. A retrieved subset cannot prove the user owns nothing else.

For non-price turns, offer tables, calculator totals, wishlist monetary totals, and ml volumes are absent from the model context. Only logged remaining percentages are supplied for stock discussion; this reduces opportunities for invented volume arithmetic. An explicit price/comparison/budget request supplies calculated demo data. A request for live prices does not automatically trigger a fictional comparison. Purpose hints are deterministic, fallible aids; the model must respect actual user wording.

Catalog, sample store discounts, membership conditions and shipping are fixed demo data. Server code calculates totals and selects minimum totals. For price questions the server inserts the exact calculated comparison. Gemini only supplies a nonnumeric tradeoff or follow-up. If it nevertheless includes numbers or retailer names in that commentary, the commentary is discarded and the response is labeled PRICE CALCULATOR, not Gemini. Remaining ml is calculated from user estimates. Wishlist budget context uses catalog prices and explicitly distinguishes saved retailer plans. The model can still make mistakes; the Compare screen is the source for demo amounts.

## User control and privacy
No checkout or external action execution. Recommendations never change inventory or wishlist by themselves. User chooses buttons and confirms changes. Uploaded photos are not included in API requests. Text messages and selected shopping context are sent through Vercel to Google. Free-tier Google data may be used to improve products. Avoid sensitive details. Conversation is held in browser memory; inventory remains in local storage. The app does not intentionally save chat on the server; hosting/provider logging policies still apply.

## Failure behavior
Pending state prevents duplicate sends. A failure shows an error and two explicit choices: retry Gemini or use scripted demo. Every scripted fallback is labeled. Welcome messages are labeled WELCOME, successful API responses GEMINI. No silent fallback or fake live response.

## Limits
Free quota and availability vary. No live pricing, photo recognition, verified stock sensing, persistent AI memory, or automatic checkout. Public endpoint has request-size limits, output limits, same-origin browser checks and best-effort in-instance throttling; this is not distributed abuse protection. Keep the Google project on free tier, and add durable quotas/access control before enabling billing or broad public use.

## Evaluation protocol (run, do not fabricate results)
Use the six cases in `evaluation-cases.json`. For a stronger evaluation, run each at least three times with v2 and v3; hold inputs and model fixed. Record exact outputs, model, instruction version, retrieved IDs, timestamp and pass/fail. To compare models, change GEMINI_MODEL to another available free-tier text model and repeat the same cases. Do not treat passing unit tests as model-quality evaluation.

Official references:
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/api-key
- https://ai.google.dev/api/generate-content
- https://vercel.com/docs/functions/runtimes/node-js
