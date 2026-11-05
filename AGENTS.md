# Mimic UI project guidance

- Keep theme implementations isolated by theme and framework in `registry/themes/`.
- Do not add global CSS injection to the CLI. Copied components must not require an imported global stylesheet.
- Do not advertise a framework/theme implementation until its source exists and has been reviewed.
- Keep CLI dependencies minimal and use Node.js built-ins where practical.
- Preserve the copy-first model: source files belong to the consumer after installation.
- Format with `npm run format`; Prettier uses four-column tab width and tabs.
