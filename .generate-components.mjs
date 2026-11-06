import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const sourceDir = join(root, '.archive-inspect');
const frameworks = ['react', 'angular', 'vue', 'react-native'];
const components = [
	['alert', 'Alert', 'Feedback', 'Contextual status message with an optional action.'],
	['avatar', 'Avatar', 'Display', 'Profile image with fallback and grouping primitives.'],
	['badge', 'Badge', 'Display', 'Compact label with emphasis variants and counters.'],
	['button', 'Button', 'Actions', 'Primary, secondary, outline, icon, and loading states.'],
	['card', 'Card', 'Layout', 'Composable surface with header, body, and footer slots.'],
	['checkbox', 'Checkbox', 'Forms', 'Accessible checked and indeterminate control.'],
	['dialog', 'Dialog', 'Overlays', 'Modal surface with trigger, title, and description.'],
	[
		'dropdown-menu',
		'Dropdown menu',
		'Overlays',
		'Anchored action list with selection and shortcut slots.',
	],
	['input', 'Input', 'Forms', 'Single-line text field with validation states.'],
	['label', 'Label', 'Forms', 'Form label with required state.'],
	['loader', 'Loader', 'Feedback', 'Spinner with compact, centered, and labeled states.'],
	['pagination', 'Pagination', 'Navigation', 'Page controls with current-page state.'],
	['select', 'Select', 'Forms', 'Grouped option selector with a clear trigger state.'],
	['separator', 'Separator', 'Layout', 'Horizontal or vertical divider with variants.'],
	['skeleton', 'Skeleton', 'Feedback', 'Loading placeholder for content and avatars.'],
	['table', 'Table', 'Data display', 'Composable table with sortable header primitives.'],
	['tabs', 'Tabs', 'Navigation', 'Tabbed navigation with selected panel.'],
	['tag', 'Tag', 'Display', 'Removable label for filters and selected values.'],
	['textarea', 'Textarea', 'Forms', 'Multiline field with optional character count.'],
	['toast', 'Toast', 'Feedback', 'Dismissible status notice with live announcements.'],
];
const classes = {
	alert: 'Alert',
	avatar: 'Avatar',
	badge: 'Badge',
	button: 'Button',
	card: 'Card',
	checkbox: 'Checkbox',
	dialog: 'Dialog',
	'dropdown-menu': 'DropdownMenu',
	input: 'Input',
	label: 'Label',
	loader: 'Loader',
	pagination: 'Pagination',
	select: 'Select',
	separator: 'Separator',
	skeleton: 'Skeleton',
	table: 'Table',
	tabs: 'Tabs',
	tag: 'Tag',
	textarea: 'Textarea',
	toast: 'Toast',
};
const reactTs = join(root, 'registry/themes/classic/react/typescript/components');
mkdirSync(reactTs, { recursive: true });
for (const [name] of components) {
	let content = readFileSync(join(sourceDir, `${name}.tsx`), 'utf8');
	content = content.replaceAll('from "cn"', 'from "../utils"');
	writeFileSync(join(reactTs, `${name}.tsx`), content);
}
const cnTs = `export function cn(...values: Array<string | false | null | undefined>): string {\n\treturn values.filter(Boolean).join(" ");\n}\n`;
const cnJs = `export function cn(...values) {\n\treturn values.filter(Boolean).join(" ");\n}\n`;
writeFileSync(join(reactTs, 'utils.ts'), cnTs);
const style = {
	primary: 'background:#00a3a3;color:#0f2a43;border-color:#00a3a3;',
	outline: 'background:#fff;color:#0f2a43;border-color:#cbd5df;',
	soft: 'background:#f1f5f7;color:#0f2a43;border-color:#e0e7eb;',
	panel: 'background:#fff;color:#0f2a43;border:1px solid #d9e1e7;border-radius:10px;',
	field: 'width:100%;min-height:42px;padding:10px 13px;border:1px solid #d9e1e7;border-radius:8px;background:#fff;color:#0f2a43;font:inherit;',
	label: 'color:#0f2a43;font:600 13px/1.4 system-ui,sans-serif;',
	muted: 'color:#627485;font:13px/1.5 system-ui,sans-serif;',
};
const vueTemplate = (name) => {
	const t = {
		alert: `<div class="mimic-alert" role="status"><strong>{{ title || 'Heads up' }}</strong><slot /></div>`,
		avatar: `<span class="mimic-avatar"><img v-if="src" :src="src" :alt="alt" /><span v-else>{{ initials || 'UI' }}</span></span>`,
		badge: `<span class="mimic-badge"><slot>{{ label || 'Badge' }}</slot></span>`,
		button: `<button class="mimic-button" :disabled="disabled" type="button"><slot>{{ label || 'Continue' }}</slot></button>`,
		card: `<article class="mimic-card"><header v-if="title"><strong>{{ title }}</strong><p v-if="description">{{ description }}</p></header><slot /></article>`,
		checkbox: `<label class="mimic-check"><input type="checkbox" :checked="checked" :disabled="disabled" @change="$emit('update:checked', ($event.target as HTMLInputElement).checked)" /><slot>{{ label || 'Accept terms' }}</slot></label>`,
		dialog: `<dialog class="mimic-dialog" :open="open"><strong>{{ title || 'Dialog title' }}</strong><p><slot /></p><button type="button" @click="$emit('update:open', false)">Close</button></dialog>`,
		'dropdown-menu': `<details class="mimic-menu"><summary>{{ label || 'Actions' }}</summary><div class="mimic-menu-items"><slot><button type="button">Edit</button><button type="button">Duplicate</button></slot></div></details>`,
		input: `<input class="mimic-field" :value="modelValue" :placeholder="placeholder || 'Enter a value'" :disabled="disabled" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />`,
		label: `<label class="mimic-label">{{ label || 'Email address' }}<span v-if="required">*</span><slot /></label>`,
		loader: `<div class="mimic-loader" role="status"><span class="mimic-spinner"></span><span>{{ label || 'Loading' }}</span></div>`,
		pagination: `<nav class="mimic-pagination" aria-label="Pagination"><button type="button" @click="$emit('update:page', Math.max(1, page - 1))">Previous</button><button type="button" class="current">{{ page }}</button><button type="button" @click="$emit('update:page', page + 1)">Next</button></nav>`,
		select: `<select class="mimic-field" :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"><slot><option value="">Choose an option</option><option>Option one</option><option>Option two</option></slot></select>`,
		separator: `<hr class="mimic-separator" />`,
		skeleton: `<div class="mimic-skeleton" :style="{ width: width || '100%', height: height || '16px' }" aria-hidden="true"></div>`,
		table: `<div class="mimic-table-wrap"><table class="mimic-table"><slot><thead><tr><th>Name</th><th>Status</th></tr></thead><tbody><tr><td>Sample item</td><td>Active</td></tr></tbody></slot></table></div>`,
		tabs: `<section class="mimic-tabs"><div class="mimic-tab-list" role="tablist"><button v-for="tab in tabs" :key="tab" type="button" :class="{ selected: active === tab }" @click="active = tab">{{ tab }}</button></div><div class="mimic-tab-panel"><slot :active="active">{{ active }} content</slot></div></section>`,
		tag: `<span class="mimic-tag"><slot>{{ label || 'Filter' }}</slot><button v-if="removable" type="button" aria-label="Remove" @click="$emit('remove')">×</button></span>`,
		textarea: `<div><textarea class="mimic-field mimic-textarea" :value="modelValue" :maxlength="maxLength" @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"></textarea><small v-if="showCount">{{ String(modelValue || '').length }}<span v-if="maxLength">/{{ maxLength }}</span></small></div>`,
		toast: `<div class="mimic-toast" role="status" aria-live="polite"><span class="mimic-toast-mark">✓</span><span><strong>{{ title || 'Changes saved' }}</strong><slot /></span><button type="button" aria-label="Dismiss" @click="$emit('dismiss')">×</button></div>`,
	};
	return t[name];
};
const vueStyle = `.mimic-button,.mimic-pagination button,.mimic-dialog button{border:0;border-radius:8px;padding:10px 16px;background:#00a3a3;color:#0f2a43;font:600 14px system-ui;cursor:pointer}.mimic-button:disabled{opacity:.5;cursor:not-allowed}.mimic-field{width:100%;min-height:42px;padding:10px 13px;border:1px solid #d9e1e7;border-radius:8px;background:white;color:#0f2a43;font:14px system-ui}.mimic-field:focus{outline:2px solid #00a3a3;outline-offset:2px}.mimic-label{display:block;color:#0f2a43;font:600 13px system-ui}.mimic-alert,.mimic-card,.mimic-toast{padding:16px;border:1px solid #d9e1e7;border-radius:10px;background:#fff;color:#0f2a43}.mimic-card header p{margin:4px 0 12px;color:#627485;font-size:13px}.mimic-avatar{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#e4f5f5;color:#0f2a43;font-weight:700;overflow:hidden}.mimic-avatar img{width:100%;height:100%;object-fit:cover}.mimic-badge,.mimic-tag{display:inline-flex;align-items:center;gap:8px;padding:5px 9px;border-radius:999px;background:#e4f5f5;color:#0f2a43;font:600 12px system-ui}.mimic-tag button,.mimic-toast button{border:0;background:transparent;color:inherit;cursor:pointer}.mimic-check{display:flex;gap:9px;align-items:center;color:#0f2a43;font:14px system-ui}.mimic-dialog{border:1px solid #d9e1e7;border-radius:12px;padding:24px;color:#0f2a43}.mimic-menu{position:relative;color:#0f2a43}.mimic-menu summary{cursor:pointer;padding:9px 12px;border:1px solid #d9e1e7;border-radius:8px}.mimic-menu-items{display:grid;position:absolute;z-index:1;min-width:150px;margin-top:5px;padding:5px;border:1px solid #d9e1e7;border-radius:8px;background:white}.mimic-menu-items button,.mimic-tab-list button{padding:9px;border:0;background:white;text-align:left;color:#0f2a43;cursor:pointer}.mimic-loader{display:flex;align-items:center;gap:10px;color:#627485;font:13px system-ui}.mimic-spinner{width:18px;height:18px;border:2px solid #cceaea;border-top-color:#00a3a3;border-radius:50%;animation:mimic-spin .75s linear infinite}@keyframes mimic-spin{to{transform:rotate(360deg)}}.mimic-pagination,.mimic-tab-list{display:flex;gap:6px}.mimic-pagination .current,.mimic-tab-list .selected{background:#00a3a3;color:#0f2a43}.mimic-separator{border:0;border-top:1px solid #d9e1e7}.mimic-skeleton{border-radius:6px;background:linear-gradient(90deg,#e8edf0,#f5f7f8,#e8edf0);background-size:200% 100%;animation:mimic-shimmer 1.2s infinite}@keyframes mimic-shimmer{to{background-position:-200% 0}}.mimic-table-wrap{overflow:auto}.mimic-table{border-collapse:collapse;width:100%;color:#0f2a43;font:13px system-ui}.mimic-table th,.mimic-table td{text-align:left;padding:10px;border-bottom:1px solid #e6ebee}.mimic-tab-panel{padding:14px;border:1px solid #d9e1e7;border-radius:8px;color:#0f2a43}.mimic-textarea{min-height:90px;resize:vertical}.mimic-toast{display:flex;align-items:center;gap:10px;box-shadow:0 8px 30px #0f2a4314}.mimic-toast-mark{color:#008f78;font-weight:800}.mimic-toast button{margin-left:auto}.mimic-avatar,.mimic-badge,.mimic-tag,.mimic-separator{box-sizing:border-box}`;
const propsFor = {
	alert: `title?: string;`,
	avatar: `src?: string; alt?: string; initials?: string;`,
	badge: `label?: string;`,
	button: `label?: string; disabled?: boolean; variant?: 'primary' | 'outline';`,
	card: `title?: string; description?: string;`,
	checkbox: `label?: string; checked?: boolean; disabled?: boolean;`,
	dialog: `title?: string; open?: boolean;`,
	'dropdown-menu': `label?: string;`,
	input: `modelValue?: string; placeholder?: string; disabled?: boolean;`,
	label: `label?: string; required?: boolean;`,
	loader: `label?: string;`,
	pagination: `page?: number;`,
	select: `modelValue?: string;`,
	separator: ``,
	skeleton: `width?: string; height?: string;`,
	table: ``,
	tabs: `tabs?: string[];`,
	tag: `label?: string; removable?: boolean;`,
	textarea: `modelValue?: string; maxLength?: number; showCount?: boolean;`,
	toast: `title?: string;`,
};
const angularTemplate = (name, cls) => {
	const templates = {
		alert: `<div class="surface" role="status"><strong>{{ title || 'Heads up' }}</strong><ng-content></ng-content></div>`,
		avatar: `<span class="avatar">{{ initials || 'UI' }}</span>`,
		badge: `<span class="pill"><ng-content>{{ label || 'Badge' }}</ng-content></span>`,
		button: `<button class="primary" [disabled]="disabled" type="button"><ng-content>{{ label || 'Continue' }}</ng-content></button>`,
		card: `<article class="surface"><header *ngIf="title"><strong>{{ title }}</strong><p>{{ description }}</p></header><ng-content></ng-content></article>`,
		checkbox: `<label class="check"><input type="checkbox" [checked]="checked" [disabled]="disabled" (change)="checkedChange.emit($any($event.target).checked)"><ng-content>{{ label || 'Accept terms' }}</ng-content></label>`,
		dialog: `<dialog class="surface" [open]="open"><strong>{{ title || 'Dialog title' }}</strong><ng-content></ng-content><button type="button" (click)="openChange.emit(false)">Close</button></dialog>`,
		'dropdown-menu': `<details><summary>{{ label || 'Actions' }}</summary><div class="menu"><ng-content><button type="button">Edit</button><button type="button">Duplicate</button></ng-content></div></details>`,
		input: `<input class="field" [value]="value" [placeholder]="placeholder || 'Enter a value'" [disabled]="disabled" (input)="valueChange.emit($any($event.target).value)">`,
		label: `<label class="label">{{ label || 'Email address' }}<span *ngIf="required"> *</span><ng-content></ng-content></label>`,
		loader: `<div class="loader" role="status"><span class="spinner"></span>{{ label || 'Loading' }}</div>`,
		pagination: `<nav aria-label="Pagination" class="pagination"><button type="button" (click)="pageChange.emit(page > 1 ? page - 1 : 1)">Previous</button><button class="current">{{ page }}</button><button type="button" (click)="pageChange.emit(page + 1)">Next</button></nav>`,
		select: `<select class="field" [value]="value" (change)="valueChange.emit($any($event.target).value)"><ng-content><option>Choose an option</option><option>Option one</option><option>Option two</option></ng-content></select>`,
		separator: `<hr class="separator">`,
		skeleton: `<div class="skeleton" [style.width]="width || '100%'" [style.height]="height || '16px'" aria-hidden="true"></div>`,
		table: `<div class="table-wrap"><table><ng-content><thead><tr><th>Name</th><th>Status</th></tr></thead><tbody><tr><td>Sample item</td><td>Active</td></tr></tbody></ng-content></table></div>`,
		tabs: `<section><nav class="tabs" role="tablist"><button *ngFor="let tab of tabs" [class.current]="activeTab === tab" (click)="activeTab = tab" type="button">{{ tab }}</button></nav><div class="surface"><ng-content>{{ activeTab }} content</ng-content></div></section>`,
		tag: `<span class="pill"><ng-content>{{ label || 'Filter' }}</ng-content><button *ngIf="removable" type="button" aria-label="Remove" (click)="remove.emit()">×</button></span>`,
		textarea: `<textarea class="field textarea" [value]="value" [attr.maxlength]="maxLength" (input)="valueChange.emit($any($event.target).value)"></textarea><small *ngIf="showCount">{{ value.length }}<span *ngIf="maxLength">/{{ maxLength }}</span></small>`,
		toast: `<div class="surface toast" role="status" aria-live="polite"><span class="checkmark">✓</span><strong>{{ title || 'Changes saved' }}</strong><ng-content></ng-content><button type="button" aria-label="Dismiss" (click)="dismiss.emit()">×</button></div>`,
	};
	return templates[name];
};
const angularStyles = `.primary,.pagination button{border:0;border-radius:8px;padding:10px 16px;background:#00a3a3;color:#0f2a43;font:600 14px system-ui;cursor:pointer}.primary:disabled{opacity:.5}.field{box-sizing:border-box;width:100%;min-height:42px;padding:10px 13px;border:1px solid #d9e1e7;border-radius:8px;background:white;color:#0f2a43;font:14px system-ui}.field:focus{outline:2px solid #00a3a3;outline-offset:2px}.label{display:block;color:#0f2a43;font:600 13px system-ui}.surface{padding:16px;border:1px solid #d9e1e7;border-radius:10px;background:#fff;color:#0f2a43}.surface p{color:#627485;font-size:13px}.avatar{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#e4f5f5;color:#0f2a43;font-weight:700}.pill{display:inline-flex;align-items:center;gap:8px;padding:5px 9px;border-radius:999px;background:#e4f5f5;color:#0f2a43;font:600 12px system-ui}.pill button,.toast button{border:0;background:transparent;cursor:pointer}.check{display:flex;align-items:center;gap:9px}.spinner{width:18px;height:18px;border:2px solid #cceaea;border-top-color:#00a3a3;border-radius:50%;animation:spin .75s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.loader,.pagination,.tabs{display:flex;align-items:center;gap:8px}.pagination button,.tabs button{padding:9px;border:1px solid #d9e1e7;border-radius:7px;background:#fff;color:#0f2a43}.current{background:#00a3a3!important}.separator{border:0;border-top:1px solid #d9e1e7}.skeleton{border-radius:6px;background:#e8edf0;animation:pulse 1s ease-in-out infinite alternate}@keyframes pulse{to{opacity:.55}}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;color:#0f2a43;font:13px system-ui}th,td{text-align:left;padding:10px;border-bottom:1px solid #e6ebee}.textarea{min-height:90px;resize:vertical}.toast{display:flex;align-items:center;gap:10px;box-shadow:0 8px 30px #0f2a4314}.toast button{margin-left:auto}`;
const rnTemplates = {
	alert: `return <View style={s.surface} accessibilityRole="alert"><Text style={s.title}>{label || 'Heads up'}</Text><Text style={s.copy}>{children || 'Here is some useful information.'}</Text></View>;`,
	avatar: `return <View style={s.avatar}><Text style={s.avatarText}>{initials || 'UI'}</Text></View>;`,
	badge: `return <View style={s.pill}><Text style={s.pillText}>{children || label || 'Badge'}</Text></View>;`,
	button: `return <Pressable disabled={disabled} onPress={onPress} style={[s.button, disabled && s.disabled]}><Text style={s.buttonText}>{children || label || 'Continue'}</Text></Pressable>;`,
	card: `return <View style={s.surface}><Text style={s.title}>{label || 'Card title'}</Text><Text style={s.copy}>{children || 'A flexible surface for related content.'}</Text></View>;`,
	checkbox: `return <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: !!checked, disabled }} onPress={onPress} style={s.row}><View style={[s.check, checked && s.checked]}>{checked ? <Text style={s.checkText}>✓</Text> : null}</View><Text style={s.copy}>{children || label || 'Accept terms'}</Text></Pressable>;`,
	dialog: `return <Modal visible={open} transparent animationType="fade" onRequestClose={onPress}><View style={s.scrim}><View style={s.surface}><Text style={s.title}>{label || 'Dialog title'}</Text><Text style={s.copy}>{children}</Text><Pressable onPress={onPress} style={s.button}><Text style={s.buttonText}>Close</Text></Pressable></View></View></Modal>;`,
	'dropdown-menu': `return <View><Pressable onPress={() => setOpen(!open)} style={s.outline}><Text style={s.copy}>{label || 'Actions'}⌄</Text></Pressable>{open ? <View style={s.surface}><Pressable onPress={onPress}><Text style={s.copy}>Edit</Text></Pressable><Pressable onPress={onPress}><Text style={s.copy}>Duplicate</Text></Pressable></View> : null}</View>;`,
	input: `return <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder || 'Enter a value'} editable={!disabled} style={s.field} />;`,
	label: `return <View><Text style={s.label}>{label || 'Email address'}{required ? ' *' : ''}</Text>{children}</View>;`,
	loader: `return <View style={s.row}><ActivityIndicator color="#00a3a3" /><Text style={s.copy}>{label || 'Loading'}</Text></View>;`,
	pagination: `return <View style={s.row}><Pressable onPress={onPress} style={s.outline}><Text style={s.copy}>‹</Text></Pressable><Text style={s.copy}>{label || '1 of 5'}</Text><Pressable onPress={onPress} style={s.outline}><Text style={s.copy}>›</Text></Pressable></View>;`,
	select: `return <Pressable onPress={onPress} style={s.field}><Text style={s.copy}>{value || label || 'Choose an option'}⌄</Text></Pressable>;`,
	separator: `return <View style={s.separator} />;`,
	skeleton: `return <View style={[s.skeleton, { width: width || 180, height: height || 16 }]} />;`,
	table: `return <View style={s.surface}><View style={s.row}><Text style={s.title}>Name</Text><Text style={s.title}>Status</Text></View><View style={s.row}><Text style={s.copy}>{label || 'Sample item'}</Text><Text style={s.copy}>Active</Text></View>{children}</View>;`,
	tabs: `return <View><View style={s.row}><Pressable onPress={onPress} style={s.button}><Text style={s.buttonText}>{label || 'Overview'}</Text></Pressable><Pressable onPress={onPress} style={s.outline}><Text style={s.copy}>Details</Text></Pressable></View><View style={s.surface}><Text style={s.copy}>{children || 'Selected tab content'}</Text></View></View>;`,
	tag: `return <View style={s.pill}><Text style={s.pillText}>{children || label || 'Filter'}</Text><Pressable onPress={onPress}><Text style={s.pillText}> ×</Text></Pressable></View>;`,
	textarea: `return <TextInput multiline value={value} onChangeText={onChangeText} placeholder={label || 'Write a message'} style={[s.field, s.textarea]} />;`,
	toast: `return <View accessibilityRole="alert" style={s.surface}><Text style={s.title}>✓ {label || 'Changes saved'}</Text><Text style={s.copy}>{children}</Text></View>;`,
};

for (const [name, title] of components) {
	const cls = classes[name];
	const vueDir = join(root, `registry/themes/classic/vue/typescript/components`);
	mkdirSync(vueDir, { recursive: true });
	const vueScript = `<script setup lang="ts">\nimport { ref } from 'vue'\nconst props = withDefaults(defineProps<{ ${propsFor[name]} }>(), {})\nconst emit = defineEmits(['update:modelValue', 'update:checked', 'update:open', 'update:page', 'remove', 'dismiss'])\nconst active = ref('Overview')\nconst tabs = props.tabs || ['Overview', 'Details', 'Activity']\n</script>\n<template>\n\t${vueTemplate(name)}\n</template>\n<style scoped>\n${vueStyle}\n</style>\n`;
	writeFileSync(join(vueDir, `${name}.vue`), vueScript);

	const angularDir = join(root, `registry/themes/classic/angular/typescript/components`);
	mkdirSync(angularDir, { recursive: true });
	const angularClassProps = `@Input() label = ''; @Input() title = ''; @Input() description = ''; @Input() placeholder = ''; @Input() initials = ''; @Input() value = ''; @Input() width = ''; @Input() height = ''; @Input() page = 1; @Input() maxLength = 0; @Input() modelValue = ''; @Input() tabs: string[] = ['Overview', 'Details', 'Activity']; @Input() activeTab = 'Overview'; @Input() disabled = false; @Input() checked = false; @Input() required = false; @Input() removable = false; @Input() open = false; @Input() showCount = false; @Output() valueChange = new EventEmitter<string>(); @Output() checkedChange = new EventEmitter<boolean>(); @Output() pageChange = new EventEmitter<number>(); @Output() openChange = new EventEmitter<boolean>(); @Output() remove = new EventEmitter<void>(); @Output() dismiss = new EventEmitter<void>();`;
	const angularSource = `import { Component, EventEmitter, Input, Output } from '@angular/core';\n\n@Component({\n\tselector: 'mimic-${name}',\n\tstandalone: true,\n\ttemplate: \`${angularTemplate(name, cls)}\`,\n\tstyles: [\`${angularStyles}\`],\n})\nexport class ${cls}Component {\n\t${angularClassProps}\n}\n`;
	writeFileSync(join(angularDir, `${name}.component.ts`), angularSource);

	const rnDir = join(root, `registry/themes/classic/react-native/typescript/components`);
	mkdirSync(rnDir, { recursive: true });
	const rnSource = `import React, { useState } from 'react';\nimport { ActivityIndicator, Image, Modal, Pressable, Text, TextInput, View, StyleSheet, type ViewProps } from 'react-native';\n\ntype Props = ViewProps & { children?: React.ReactNode; label?: string; title?: string; initials?: string; value?: string; placeholder?: string; width?: number | string; height?: number | string; page?: number; disabled?: boolean; checked?: boolean; open?: boolean; required?: boolean; removable?: boolean; onPress?: () => void; onChangeText?: (value: string) => void };\n\nexport function ${cls}({ children, label, title, initials, value, placeholder, width, height, disabled, checked, open, onPress, onChangeText, ...props }: Props) {\n\tconst [menuOpen, setOpen] = useState(false);\n\tconst s = styles;\n\t${rnTemplates[name]}\n}\n\nconst styles = StyleSheet.create({ button: { minHeight: 44, paddingHorizontal: 18, borderRadius: 8, backgroundColor: '#00a3a3', alignItems: 'center', justifyContent: 'center' }, buttonText: { color: '#0f2a43', fontWeight: '700' }, outline: { minHeight: 40, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#d9e1e7', justifyContent: 'center' }, field: { minHeight: 42, paddingHorizontal: 12, borderWidth: 1, borderColor: '#d9e1e7', borderRadius: 8, color: '#0f2a43' }, textarea: { minHeight: 100, textAlignVertical: 'top' }, surface: { padding: 16, borderWidth: 1, borderColor: '#d9e1e7', borderRadius: 10, backgroundColor: 'white', gap: 10 }, title: { color: '#0f2a43', fontSize: 15, fontWeight: '700' }, copy: { color: '#526575', fontSize: 13 }, label: { color: '#0f2a43', fontWeight: '600', marginBottom: 6 }, pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, backgroundColor: '#e4f5f5', alignSelf: 'flex-start' }, pillText: { color: '#0f2a43', fontWeight: '600', fontSize: 12 }, avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e4f5f5', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#0f2a43', fontWeight: '700' }, check: { width: 20, height: 20, borderWidth: 1, borderColor: '#9cabb6', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }, checked: { backgroundColor: '#00a3a3', borderColor: '#00a3a3' }, checkText: { color: '#0f2a43', fontSize: 12 }, row: { flexDirection: 'row', alignItems: 'center', gap: 10 }, disabled: { opacity: 0.5 }, scrim: { flex: 1, backgroundColor: '#0006', justifyContent: 'center', padding: 24 }, spinner: { color: '#00a3a3' }, separator: { height: StyleSheet.hairlineWidth, backgroundColor: '#d9e1e7', width: '100%' }, skeleton: { borderRadius: 6, backgroundColor: '#e8edf0' } });\n`;
	writeFileSync(join(rnDir, `${name}.tsx`), rnSource);
}

// Keep the published CLI registry payload in step with the authoring source.
for (const framework of frameworks) {
	const source = join(root, `registry/themes/classic/${framework}/typescript`);
	const destination = join(
		root,
		`packages/cli/templates/components/classic/${framework}/typescript`,
	);
	mkdirSync(destination, { recursive: true });
	cpSync(source, destination, { recursive: true });
}
const manifest = {
	components: components.map(([name, title, category, description]) => ({
		name,
		title,
		category,
		description,
		frameworks: {
			react: {
				source: `classic/react/typescript/components/${name}.tsx`,
				language: 'typescript',
				output: `${name}.tsx`,
				helpers: ['classic/react/typescript/components/utils.ts'],
				dependencies: [
					'radix-ui',
					'lucide-react',
					'class-variance-authority',
					'tailwindcss',
				],
			},
			angular: {
				source: `classic/angular/typescript/components/${name}.component.ts`,
				language: 'typescript',
				output: `${name}.component.ts`,
				dependencies: ['@angular/core'],
			},
			vue: {
				source: `classic/vue/typescript/components/${name}.vue`,
				language: 'typescript',
				output: `${name}.vue`,
				dependencies: ['vue'],
			},
			'react-native': {
				source: `classic/react-native/typescript/components/${name}.tsx`,
				language: 'typescript',
				output: `${name}.tsx`,
				dependencies: ['react-native'],
			},
		},
	})),
};
writeFileSync(
	join(root, 'packages/cli/templates/registry.json'),
	`${JSON.stringify(manifest, null, 2)}\n`,
);
