import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from './utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto rounded-lg border border-neutral-200 bg-white"
		>
			<table
				data-slot="table"
				className={cn('w-full caption-bottom text-sm', className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead
			data-slot="table-header"
			className={cn('bg-neutral-50 [&_tr]:border-b [&_tr]:border-neutral-200', className)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot="table-body"
			className={cn('[&_tr:last-child]:border-0', className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				'border-t border-neutral-200 bg-neutral-50 font-medium [&>tr]:last:border-b-0',
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				'border-b border-neutral-200 transition-colors hover:bg-neutral-50 has-aria-expanded:bg-neutral-50 data-[state=selected]:bg-primary/5',
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				'h-12 px-4 text-left align-middle text-xs font-semibold tracking-wide whitespace-nowrap text-slate-600 uppercase [&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:pr-0',
				className,
			)}
			{...props}
		/>
	);
}

type SortDirection = 'asc' | 'desc' | false;

function TableSortHead({
	className,
	children,
	sorted = false,
	onSort,
	...props
}: React.ComponentProps<'th'> & {
	sorted?: SortDirection;
	onSort?: () => void;
}) {
	const ariaSort = sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none';

	return (
		<TableHead aria-sort={ariaSort} className={className} {...props}>
			<button
				type="button"
				onClick={onSort}
				className="inline-flex items-center gap-1.5 uppercase transition-colors outline-none hover:text-slate-900 focus-visible:text-primary"
			>
				{children}
				<span aria-hidden="true" className="flex flex-col -space-y-1.5">
					<ChevronUp
						size={12}
						strokeWidth={3}
						className={sorted === 'asc' ? 'text-primary' : 'text-neutral-400'}
					/>
					<ChevronDown
						size={12}
						strokeWidth={3}
						className={sorted === 'desc' ? 'text-primary' : 'text-neutral-400'}
					/>
				</span>
			</button>
		</TableHead>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				'px-4 py-3.5 align-middle text-sm whitespace-nowrap text-slate-800 [&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:pr-0',
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot="table-caption"
			className={cn('mt-4 text-sm text-neutral-500', className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableSortHead,
	TableRow,
	TableCell,
	TableCaption,
};
export type { SortDirection };
