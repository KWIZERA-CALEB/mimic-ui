# Component registry

Theme implementations belong in `themes/<theme>/<framework>/<component>/` and should remain self-contained. The CLI copies source files into the user's project; it does not add global styles or framework dependencies. Register completed components in `packages/cli/templates/registry.json`.

Themes: `classic`, `studio`, `minimal`.
Framework targets: React, Angular, Vue, Svelte, and React Native. Empty folders are intentional implementation points.
