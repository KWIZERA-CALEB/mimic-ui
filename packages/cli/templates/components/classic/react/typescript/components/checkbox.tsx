'use client';

import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { Check, Minus } from 'lucide-react';
import { cn } from './utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				'peer flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-neutral-300 bg-white text-white shadow-none transition-colors outline-none',
				'hover:border-primary',
				'focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20',
				'aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20',
				'disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100',
				'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary',
				'data-[state=checked]:disabled:border-neutral-300 data-[state=checked]:disabled:bg-neutral-300 data-[state=indeterminate]:disabled:border-neutral-300 data-[state=indeterminate]:disabled:bg-neutral-300',
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current"
			>
				{props.checked === 'indeterminate' ? (
					<Minus className="size-3" strokeWidth={3.5} />
				) : (
					<Check className="size-3" strokeWidth={3.5} />
				)}
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
