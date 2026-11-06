import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CircleX } from 'lucide-react';
import { cn } from './utils';

const tagVariants = cva(
	'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs leading-none font-semibold whitespace-nowrap',
	{
		variants: {
			tone: {
				neutral: 'border-slate-200 bg-slate-100 text-slate-600',
				teal: 'border-teal-200 bg-teal-50 text-teal-700',
				info: 'border-blue-200 bg-blue-50 text-blue-700',
				success: 'border-green-200 bg-green-50 text-green-700',
				warning: 'border-amber-200 bg-amber-50 text-amber-700',
				danger: 'border-red-200 bg-red-50 text-red-600',
			},
		},
		defaultVariants: {
			tone: 'neutral',
		},
	},
);

function Tag({
	className,
	tone,
	onRemove,
	removeLabel = 'Remove tag',
	children,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof tagVariants> & {
		onRemove?: () => void;
		removeLabel?: string;
	}) {
	return (
		<span
			data-slot="tag"
			data-tone={tone}
			className={cn(tagVariants({ tone }), className)}
			{...props}
		>
			{children}
			{onRemove && (
				<button
					type="button"
					aria-label={removeLabel}
					onClick={onRemove}
					className="-mr-0.5 rounded-full opacity-70 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
				>
					<CircleX className="size-3" />
				</button>
			)}
		</span>
	);
}

export { Tag, tagVariants };
