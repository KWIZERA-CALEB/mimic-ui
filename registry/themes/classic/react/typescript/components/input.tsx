import * as React from 'react';
import { cn } from './utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'!min-h-11 !text-sm !text-slate-800 w-full min-w-0 rounded-lg border border-neutral-200 bg-white px-4 font-sans shadow-none transition-all outline-none',
				'placeholder:text-neutral-400',
				'focus:!border-[#00A6A6] focus:!outline-none focus:!ring-2 focus:!ring-[#00A6A6] focus:!ring-offset-2 focus:!ring-offset-white',
				'aria-invalid:border-destructive aria-invalid:focus:!border-destructive aria-invalid:focus:!ring-destructive',
				'read-only:cursor-default read-only:bg-neutral-100 read-only:focus:!border-neutral-200 read-only:focus:!ring-0 read-only:focus:!ring-offset-0',
				'disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:!text-neutral-400 disabled:placeholder:text-neutral-400',
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
