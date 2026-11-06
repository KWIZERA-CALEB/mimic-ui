import * as React from 'react';
import { cn } from './utils';
import { Label as LabelPrimitive } from 'radix-ui';

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
	required?: boolean;
};

function Label({ className, children, required, ...props }: LabelProps) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				'flex items-center gap-1 text-sm leading-none font-semibold text-slate-900 select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
				className,
			)}
			{...props}
		>
			{children}
			{required && (
				<span aria-hidden="true" className="text-destructive">
					*
				</span>
			)}
		</LabelPrimitive.Root>
	);
}

export { Label };
