import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const root = process.cwd();
const names = [
	'alert',
	'avatar',
	'badge',
	'button',
	'card',
	'checkbox',
	'dialog',
	'dropdown-menu',
	'input',
	'label',
	'loader',
	'pagination',
	'select',
	'separator',
	'skeleton',
	'table',
	'tabs',
	'tag',
	'textarea',
	'toast',
];
const params = {
	alert: 'children, label',
	avatar: 'initials',
	badge: 'children, label',
	button: 'children, label, disabled, onPress',
	card: 'children, label',
	checkbox: 'children, label, checked, disabled, onPress',
	dialog: 'children, label, open, onPress',
	'dropdown-menu': 'label, onPress',
	input: 'value, placeholder, disabled, onChangeText',
	label: 'label, required, children',
	loader: 'label',
	pagination: 'label, onPress',
	select: 'value, label, onPress',
	separator: '',
	skeleton: 'width, height',
	table: 'label, children',
	tabs: 'label, onPress, children',
	tag: 'children, label, onPress',
	textarea: 'label, value, onChangeText',
	toast: 'label, children',
};
const imports = {
	alert: 'Text, View',
	avatar: 'Text, View',
	badge: 'Text, View',
	button: 'Pressable, Text',
	card: 'Text, View',
	checkbox: 'Pressable, Text, View',
	dialog: 'Modal, Pressable, Text, View',
	'dropdown-menu': 'Pressable, Text, View',
	input: 'TextInput',
	label: 'Text, View',
	loader: 'ActivityIndicator, Text, View',
	pagination: 'Pressable, Text, View',
	select: 'Pressable, Text',
	separator: 'View',
	skeleton: 'View',
	table: 'Text, View',
	tabs: 'Pressable, Text, View',
	tag: 'Pressable, Text, View',
	textarea: 'TextInput',
	toast: 'Text, View',
};
for (const name of names) {
	const file = join(
		root,
		`registry/themes/classic/react-native/typescript/components/${name}.tsx`,
	);
	let content = readFileSync(file, 'utf8');
	content = content.replace(
		/import \{ [^\n]+ \} from 'react-native';/,
		`import { ${imports[name]}, StyleSheet } from 'react-native';`,
	);
	content = content.replace(
		'type Props = ViewProps & {',
		"import type { ReactNode } from 'react';\ntype Props = {",
	);
	content = content.replace(
		/export function (\w+)\(\{[^}]+\}: Props\)/,
		(match, component) => `export function ${component}({ ${params[name]} }: Props)`,
	);
	content = content.replace('\tconst [menuOpen, setOpen] = useState(false);\n', '');
	content = content.replace("import { useState } from 'react';\n", '');
	if (name === 'dropdown-menu')
		content = content
			.replace(
				"import type { ReactNode } from 'react';",
				"import { useState } from 'react';\nimport type { ReactNode } from 'react';",
			)
			.replace(
				'export function DropdownMenu({ label, onPress }: Props) {',
				'export function DropdownMenu({ label, onPress }: Props) {\n\tconst [menuOpen, setOpen] = useState(false);',
			);
	writeFileSync(file, content);
}
for (const name of names) {
	const file = join(root, `registry/themes/classic/vue/typescript/components/${name}.vue`);
	let content = readFileSync(file, 'utf8');
	content = content.replace(
		'const props = defineProps({',
		name === 'tabs' ? 'const props = defineProps({' : 'defineProps({',
	);
	if (name !== 'tabs')
		content = content.replace(
			/\nconst active = ref\('Overview'\)[\s\S]*?\nconst tabs = props\.tabs[^\n]*/,
			'',
		);
	if (
		![
			'checkbox',
			'dialog',
			'input',
			'pagination',
			'select',
			'tag',
			'textarea',
			'toast',
		].includes(name)
	)
		content = content.replace(/const emit = defineEmits\(([^\n]+)\)/, 'defineEmits($1)');
	if (name === 'tabs' && !content.includes("import { ref } from 'vue'"))
		content = content.replace(
			'<script setup lang="ts">',
			'<script setup lang="ts">\nimport { ref } from \'vue\'',
		);
	writeFileSync(file, content);
}
