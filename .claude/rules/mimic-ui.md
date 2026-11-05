# Mimic UI repository rules

- Keep theme implementations isolated by theme and framework in `registry/themes/`.
- Never inject global CSS into consumer projects.
- Keep CLI output copy-first and components owned by the consumer.
- Document framework availability honestly; placeholders are not support.
- Format all source with `npm run format` before committing.
