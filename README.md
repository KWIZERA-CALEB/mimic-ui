<div align="center">

<img src="apps/docs/public/mimic-mark.png" alt="Mimic UI" width="96" />

# Mimic UI

**Copy-first components. Your code, your theme.**

Choose a visual theme, preview components, and copy the source into your own project.
The first component set is **Classic**, with React, Angular, Vue, and React Native implementations.

[Browse components](apps/docs/components.html) · [Quick start](apps/docs/getting-started.html) · [CLI](#cli)

</div>

## What is Mimic UI?

Mimic UI is a framework-aware component registry and CLI. Components are copied into your application, where you can edit them directly. Each component is framework-native. Mimic does not inject a global stylesheet into consumer projects.

Classic currently includes 20 components. React components preserve the supplied React source, while Angular, Vue, and React Native have framework-specific implementations. The CLI can provide TypeScript or transpile the typed sources into JavaScript.

## Quick start

Requires Node.js 18 or newer. Clone this repository and install the CLI workspace dependencies. From the consumer project, run the CLI entry point:

```sh
cd path/to/mimic_ui
npm install
cd path/to/your-project
node path/to/mimic_ui/packages/cli/src/index.js init
node path/to/mimic_ui/packages/cli/src/index.js add button
```

The setup asks for framework, language, theme, and whether to add all components or choose individually. It writes `mimic.json` in the current project.

After publishing `@mimic-ui/cli` to npm, the equivalent commands will be:

```sh
npx @mimic-ui/cli init
npx @mimic-ui/cli add button
```

## Supported Classic targets

- **React:** TypeScript or JavaScript. React components use Tailwind CSS 4 utility classes and require Radix UI, Lucide, CVA, `clsx`, and `tailwind-merge` as shown by the CLI. Mimic does not edit your global stylesheet.
- **Angular:** TypeScript or JavaScript output with component-scoped styles. Angular's JavaScript output is intended for JIT projects; Angular AOT projects should use TypeScript.
- **Vue:** TypeScript or JavaScript single-file components with scoped styles.
- **React Native:** TypeScript or JavaScript source using native controls and `StyleSheet`.

Other themes remain available as authoring placeholders. The current registry only serves Classic.

## Configuration

```json
{
	"$schema": "https://mimic-ui.dev/schema.json",
	"theme": "classic",
	"framework": "react",
	"language": "typescript",
	"components": "src/components/ui",
	"installMode": "individual"
}
```

`theme`, `framework`, and `language` select the registry source. `components` sets the destination folder. `installMode` controls whether `mimic add` selects one component or all available components.

## CLI

```sh
mimic init                 # choose framework, language, theme, and install preference
mimic list                 # list components and framework targets
mimic add button           # copy one component
mimic add                  # add all or choose one based on your preference
mimic add all              # always copy every available component
```

The CLI copies source only. It reports the required framework packages but does not install them or change global CSS. It prompts before replacing existing files.

## Documentation website

Run `npm run docs:dev`, then open the local URL shown in the terminal. Browse the [Classic component catalog](apps/docs/components.html) to filter by category, preview each component, switch framework and language snippets, and copy its CLI command.

## Repository layout

```text
apps/docs/                  Documentation website and component catalog
packages/cli/               CLI and packaged component sources
registry/themes/classic/     Theme source of truth
scripts/sync-registry.mjs    Syncs theme sources into the CLI package
templates/                   Future starter projects
.cursor/rules/               Cursor project guidance
.claude/rules/               Claude project guidance
```

## Development

```sh
pnpm install
pnpm run registry:sync
pnpm run cli -- --help
pnpm run docs:dev
pnpm run format
pnpm run format:check
```

Prettier uses tabs with a four-column tab width. Run `pnpm run registry:sync` after editing theme source so the CLI package stays aligned.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

MIT. See [LICENSE](LICENSE).
