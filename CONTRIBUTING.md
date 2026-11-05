# Contributing

Thanks for helping shape Mimic UI. The MVP focuses on a reliable copy-first CLI and clear theme authoring boundaries.

## Adding a component

1. Implement it in an isolated `registry/themes/<theme>/<framework>/` directory.
2. Keep its source self-contained and avoid global stylesheet requirements.
3. Verify the copied files are appropriate for the selected framework.
4. Add its copyable files to `packages/cli/templates/components/<theme>/<framework>/` and register it in `packages/cli/templates/registry.json`.
5. Update the documentation to describe the actual behavior and support.
6. Run `npm run format`.

Do not list planned adapters as supported implementations until their code is available.
