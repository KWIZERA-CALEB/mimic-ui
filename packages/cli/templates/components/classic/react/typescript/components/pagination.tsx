import * as React from 'react';
import { cn } from './utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type PaginationProps = {
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
	onPageSizeChange?: (pageSize: number) => void;
	pageSizeOptions?: number[];
	itemLabel?: string;
	className?: string;
};

type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

function getPageItems(current: number, totalPages: number): PageItem[] {
	const numbers = new Set<number>([1, totalPages, current - 1, current, current + 1]);

	const sorted = [...numbers].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);

	const items: PageItem[] = [];

	sorted.forEach((n, index) => {
		const previous = sorted[index - 1];

		if (previous !== undefined) {
			if (n - previous === 2) items.push(previous + 1);
			else if (n - previous > 2)
				items.push(previous < current ? 'ellipsis-start' : 'ellipsis-end');
		}

		items.push(n);
	});

	return items;
}

const pageButton =
	'inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50';

function Pagination({
	page,
	pageSize,
	total,
	onPageChange,
	onPageSizeChange,
	pageSizeOptions = [10, 20, 50],
	itemLabel = 'items',
	className,
}: PaginationProps) {
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const current = Math.min(Math.max(1, page), totalPages);
	const start = total === 0 ? 0 : (current - 1) * pageSize + 1;
	const end = Math.min(current * pageSize, total);
	const items = getPageItems(current, totalPages);

	return (
		<nav
			data-slot="pagination"
			aria-label="Pagination"
			className={cn(
				'flex flex-wrap items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-3',
				className,
			)}
		>
			<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
				<p>
					Showing{' '}
					<span className="font-semibold text-slate-900">
						{start} to {end}
					</span>{' '}
					of <span className="font-semibold text-slate-900">{total}</span> {itemLabel}
				</p>

				{onPageSizeChange && (
					<div className="flex items-center gap-2">
						<span>Show</span>
						<Select
							value={String(pageSize)}
							onValueChange={(value) => onPageSizeChange(Number(value))}
						>
							<SelectTrigger
								size="sm"
								aria-label="Items per page"
								className="w-20 px-3"
							>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{pageSizeOptions.map((option) => (
									<SelectItem key={option} value={String(option)}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
			</div>

			<div className="flex items-center gap-1.5">
				<button
					type="button"
					disabled={current <= 1}
					onClick={() => onPageChange(current - 1)}
					className={cn(
						pageButton,
						'border-neutral-200 bg-neutral-100 font-semibold text-slate-800 hover:bg-neutral-200',
					)}
				>
					Previous
				</button>

				{items.map((item) =>
					typeof item === 'number' ? (
						<button
							key={item}
							type="button"
							aria-label={`Page ${item}`}
							aria-current={item === current ? 'page' : undefined}
							onClick={() => onPageChange(item)}
							className={cn(
								pageButton,
								item === current
									? 'border-[#00A3A3] bg-[#00A3A3] text-[#0F2A43]'
									: 'border-neutral-200 bg-white text-slate-700 hover:bg-neutral-50',
							)}
						>
							{item}
						</button>
					) : (
						<span
							key={item}
							aria-hidden="true"
							className="px-1 text-xs text-neutral-400"
						>
							...
						</span>
					),
				)}

				<button
					type="button"
					disabled={current >= totalPages}
					onClick={() => onPageChange(current + 1)}
					className={cn(
						pageButton,
						'border-neutral-200 bg-white font-semibold text-slate-800 hover:bg-neutral-50',
					)}
				>
					Next
				</button>
			</div>
		</nav>
	);
}

export { Pagination };
export type { PaginationProps };
