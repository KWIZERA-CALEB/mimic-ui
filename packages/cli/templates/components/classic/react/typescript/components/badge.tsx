import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const badgeVariants = cva(
	'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs leading-none font-semibold whitespace-nowrap',
	{
		variants: {
			tone: {
				teal: 'bg-teal-50 text-teal-700',
				success: 'bg-green-50 text-green-700',
				warning: 'bg-amber-100 text-amber-700',
				danger: 'bg-red-100 text-red-600',
				info: 'bg-blue-50 text-blue-700',
				neutral: 'bg-slate-100 text-slate-600',
			},
		},
		defaultVariants: {
			tone: 'teal',
		},
	},
);

function Badge({
	className,
	tone,
	dot = true,
	children,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { dot?: boolean }) {
	return (
		<span
			data-slot="badge"
			data-tone={tone}
			className={cn(badgeVariants({ tone }), className)}
			{...props}
		>
			{dot && (
				<span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
			)}
			{children}
		</span>
	);
}

const counterVariants = cva(
	'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] leading-none font-bold tabular-nums',
	{
		variants: {
			tone: {
				dark: 'bg-[#0F2A43] text-white',
				teal: 'bg-[#00A3A3] text-white',
			},
		},
		defaultVariants: {
			tone: 'dark',
		},
	},
);

function CounterBadge({
	className,
	tone,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof counterVariants>) {
	return (
		<span
			data-slot="counter-badge"
			data-tone={tone}
			className={cn(counterVariants({ tone }), className)}
			{...props}
		/>
	);
}

export { Badge, CounterBadge, badgeVariants, counterVariants };
