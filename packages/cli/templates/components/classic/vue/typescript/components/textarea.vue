<script setup lang="ts">
defineProps({
	label: String,
	title: String,
	description: String,
	placeholder: String,
	initials: String,
	value: String,
	modelValue: String,
	width: String,
	height: String,
	page: Number,
	maxLength: Number,
	tabs: Array,
	disabled: Boolean,
	checked: Boolean,
	required: Boolean,
	removable: Boolean,
	open: Boolean,
	showCount: Boolean,
});
const emit = defineEmits([
	'update:modelValue',
	'update:checked',
	'update:open',
	'update:page',
	'remove',
	'dismiss',
]);
</script>
<template>
	<div>
		<textarea
			class="mimic-field mimic-textarea"
			:value="modelValue"
			:maxlength="maxLength"
			@input="emit('update:modelValue', $event.target.value)"
		></textarea
		><small v-if="showCount"
			>{{ String(modelValue || '').length
			}}<span v-if="maxLength">/{{ maxLength }}</span></small
		>
	</div>
</template>
<style scoped>
.mimic-button,
.mimic-pagination button,
.mimic-dialog button {
	border: 0;
	border-radius: 8px;
	padding: 10px 16px;
	background: #00a3a3;
	color: #0f2a43;
	font: 600 14px system-ui;
	cursor: pointer;
}
.mimic-button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
.mimic-field {
	width: 100%;
	min-height: 42px;
	padding: 10px 13px;
	border: 1px solid #d9e1e7;
	border-radius: 8px;
	background: white;
	color: #0f2a43;
	font: 14px system-ui;
}
.mimic-field:focus {
	outline: 2px solid #00a3a3;
	outline-offset: 2px;
}
.mimic-label {
	display: block;
	color: #0f2a43;
	font: 600 13px system-ui;
}
.mimic-alert,
.mimic-card,
.mimic-toast {
	padding: 16px;
	border: 1px solid #d9e1e7;
	border-radius: 10px;
	background: #fff;
	color: #0f2a43;
}
.mimic-card header p {
	margin: 4px 0 12px;
	color: #627485;
	font-size: 13px;
}
.mimic-avatar {
	display: grid;
	place-items: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #e4f5f5;
	color: #0f2a43;
	font-weight: 700;
	overflow: hidden;
}
.mimic-avatar img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.mimic-badge,
.mimic-tag {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 5px 9px;
	border-radius: 999px;
	background: #e4f5f5;
	color: #0f2a43;
	font: 600 12px system-ui;
}
.mimic-tag button,
.mimic-toast button {
	border: 0;
	background: transparent;
	color: inherit;
	cursor: pointer;
}
.mimic-check {
	display: flex;
	gap: 9px;
	align-items: center;
	color: #0f2a43;
	font: 14px system-ui;
}
.mimic-dialog {
	border: 1px solid #d9e1e7;
	border-radius: 12px;
	padding: 24px;
	color: #0f2a43;
}
.mimic-menu {
	position: relative;
	color: #0f2a43;
}
.mimic-menu summary {
	cursor: pointer;
	padding: 9px 12px;
	border: 1px solid #d9e1e7;
	border-radius: 8px;
}
.mimic-menu-items {
	display: grid;
	position: absolute;
	z-index: 1;
	min-width: 150px;
	margin-top: 5px;
	padding: 5px;
	border: 1px solid #d9e1e7;
	border-radius: 8px;
	background: white;
}
.mimic-menu-items button,
.mimic-tab-list button {
	padding: 9px;
	border: 0;
	background: white;
	text-align: left;
	color: #0f2a43;
	cursor: pointer;
}
.mimic-loader {
	display: flex;
	align-items: center;
	gap: 10px;
	color: #627485;
	font: 13px system-ui;
}
.mimic-spinner {
	width: 18px;
	height: 18px;
	border: 2px solid #cceaea;
	border-top-color: #00a3a3;
	border-radius: 50%;
	animation: mimic-spin 0.75s linear infinite;
}
@keyframes mimic-spin {
	to {
		transform: rotate(360deg);
	}
}
.mimic-pagination,
.mimic-tab-list {
	display: flex;
	gap: 6px;
}
.mimic-pagination .current,
.mimic-tab-list .selected {
	background: #00a3a3;
	color: #0f2a43;
}
.mimic-separator {
	border: 0;
	border-top: 1px solid #d9e1e7;
}
.mimic-skeleton {
	border-radius: 6px;
	background: linear-gradient(90deg, #e8edf0, #f5f7f8, #e8edf0);
	background-size: 200% 100%;
	animation: mimic-shimmer 1.2s infinite;
}
@keyframes mimic-shimmer {
	to {
		background-position: -200% 0;
	}
}
.mimic-table-wrap {
	overflow: auto;
}
.mimic-table {
	border-collapse: collapse;
	width: 100%;
	color: #0f2a43;
	font: 13px system-ui;
}
.mimic-table th,
.mimic-table td {
	text-align: left;
	padding: 10px;
	border-bottom: 1px solid #e6ebee;
}
.mimic-tab-panel {
	padding: 14px;
	border: 1px solid #d9e1e7;
	border-radius: 8px;
	color: #0f2a43;
}
.mimic-textarea {
	min-height: 90px;
	resize: vertical;
}
.mimic-toast {
	display: flex;
	align-items: center;
	gap: 10px;
	box-shadow: 0 8px 30px #0f2a4314;
}
.mimic-toast-mark {
	color: #008f78;
	font-weight: 800;
}
.mimic-toast button {
	margin-left: auto;
}
.mimic-avatar,
.mimic-badge,
.mimic-tag,
.mimic-separator {
	box-sizing: border-box;
}
</style>
