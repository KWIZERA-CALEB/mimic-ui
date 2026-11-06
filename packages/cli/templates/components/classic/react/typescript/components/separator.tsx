'use client';

import * as React from 'react';
import { cn } from './utils';
import { Separator as SeparatorPrimitive } from 'radix-ui';

type SeparatorVariant = 'default' | 'dashed' | 'strong';
type LabelPosition = 'start' | 'center' | 'end';

const lines: Record<SeparatorVariant, { horizontal: string; vertical: string }> = {
	default: {
		horizontal: 'h-px bg-neutral-200',
		vertical: 'w-px bg-neutral-200',
	},
	dashed: {
		horizontal: 'h-0 border-t border-dashed border-neutral-300',
		vertical: 'w-0 border-l border-dashed border-neutral-300',
	},
	strong: {
		horizontal: 'h-0.5 bg-[#0F2A43]',
		vertical: 'w-0.5 bg-[#0F2A43]',
	},
};

type SeparatorProps = Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, 'children'> & {
	variant?: SeparatorVariant;
	label?: string;
	labelPosition?: LabelPosition;
};

function Separator({
	className,
	orientation = 'horizontal',
	decorative = true,
	variant = 'default',
	label,
	labelPosition = 'center',
	...props
}: SeparatorProps) {
	const isHorizontal = orientation === 'horizontal';
	const lineClass = lines[variant][isHorizontal ? 'horizontal' : 'vertical'];

	if (label && isHorizontal) {
		return (
			<div
				data-slot="separator"
				data-orientation="horizontal"
				data-variant={variant}
				role="separator"
				aria-label={label}
				className={cn('flex w-full shrink-0 items-center gap-4', className)}
			>
				{labelPosition !== 'start' && (
					<span aria-hidden="true" className={cn('min-w-0 flex-1', lineClass)} />
				)}
				<span className="text-xs font-semibold tracking-wide whitespace-nowrap text-slate-600 uppercase">
					{label}
				</span>
				{labelPosition !== 'end' && (
					<span aria-hidden="true" className={cn('min-w-0 flex-1', lineClass)} />
				)}
			</div>
		);
	}

	return (
		<SeparatorPrimitive.Root
			data-slot="separator"
			data-variant={variant}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'shrink-0',
				lineClass,
				isHorizontal ? 'w-full' : 'self-stretch',
				className,
			)}
			{...props}
		/>
	);
}

export { Separator };
export type { SeparatorProps, SeparatorVariant };
