import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'mimic-loader',
	standalone: true,
	imports: [CommonModule],
	template: `<div class="loader" role="status">
		<span class="spinner"></span>{{ label || 'Loading' }}
	</div>`,
	styles: [
		`
			.primary,
			.pagination button {
				border: 0;
				border-radius: 8px;
				padding: 10px 16px;
				background: #00a3a3;
				color: #0f2a43;
				font: 600 14px system-ui;
				cursor: pointer;
			}
			.primary:disabled {
				opacity: 0.5;
			}
			.field {
				box-sizing: border-box;
				width: 100%;
				min-height: 42px;
				padding: 10px 13px;
				border: 1px solid #d9e1e7;
				border-radius: 8px;
				background: white;
				color: #0f2a43;
				font: 14px system-ui;
			}
			.field:focus {
				outline: 2px solid #00a3a3;
				outline-offset: 2px;
			}
			.label {
				display: block;
				color: #0f2a43;
				font: 600 13px system-ui;
			}
			.surface {
				padding: 16px;
				border: 1px solid #d9e1e7;
				border-radius: 10px;
				background: #fff;
				color: #0f2a43;
			}
			.surface p {
				color: #627485;
				font-size: 13px;
			}
			.avatar {
				display: grid;
				place-items: center;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background: #e4f5f5;
				color: #0f2a43;
				font-weight: 700;
			}
			.pill {
				display: inline-flex;
				align-items: center;
				gap: 8px;
				padding: 5px 9px;
				border-radius: 999px;
				background: #e4f5f5;
				color: #0f2a43;
				font: 600 12px system-ui;
			}
			.pill button,
			.toast button {
				border: 0;
				background: transparent;
				cursor: pointer;
			}
			.check {
				display: flex;
				align-items: center;
				gap: 9px;
			}
			.spinner {
				width: 18px;
				height: 18px;
				border: 2px solid #cceaea;
				border-top-color: #00a3a3;
				border-radius: 50%;
				animation: spin 0.75s linear infinite;
			}
			@keyframes spin {
				to {
					transform: rotate(360deg);
				}
			}
			.loader,
			.pagination,
			.tabs {
				display: flex;
				align-items: center;
				gap: 8px;
			}
			.pagination button,
			.tabs button {
				padding: 9px;
				border: 1px solid #d9e1e7;
				border-radius: 7px;
				background: #fff;
				color: #0f2a43;
			}
			.current {
				background: #00a3a3 !important;
			}
			.separator {
				border: 0;
				border-top: 1px solid #d9e1e7;
			}
			.skeleton {
				border-radius: 6px;
				background: #e8edf0;
				animation: pulse 1s ease-in-out infinite alternate;
			}
			@keyframes pulse {
				to {
					opacity: 0.55;
				}
			}
			.table-wrap {
				overflow: auto;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				color: #0f2a43;
				font: 13px system-ui;
			}
			th,
			td {
				text-align: left;
				padding: 10px;
				border-bottom: 1px solid #e6ebee;
			}
			.textarea {
				min-height: 90px;
				resize: vertical;
			}
			.toast {
				display: flex;
				align-items: center;
				gap: 10px;
				box-shadow: 0 8px 30px #0f2a4314;
			}
			.toast button {
				margin-left: auto;
			}
		`,
	],
})
export class LoaderComponent {
	@Input() label = '';
	@Input() title = '';
	@Input() description = '';
	@Input() placeholder = '';
	@Input() initials = '';
	@Input() value = '';
	@Input() width = '';
	@Input() height = '';
	@Input() page = 1;
	@Input() maxLength = 0;
	@Input() modelValue = '';
	@Input() tabs: string[] = ['Overview', 'Details', 'Activity'];
	@Input() activeTab = 'Overview';
	@Input() disabled = false;
	@Input() checked = false;
	@Input() required = false;
	@Input() removable = false;
	@Input() open = false;
	@Input() showCount = false;
	@Output() valueChange = new EventEmitter<string>();
	@Output() checkedChange = new EventEmitter<boolean>();
	@Output() pageChange = new EventEmitter<number>();
	@Output() openChange = new EventEmitter<boolean>();
	@Output() remove = new EventEmitter<void>();
	@Output() dismiss = new EventEmitter<void>();
}
