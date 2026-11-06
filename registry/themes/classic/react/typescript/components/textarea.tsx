import * as React from 'react';
import { cn } from './utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
	showCount?: boolean;
};

function Textarea({
	className,
	showCount = false,
	maxLength,
	value,
	defaultValue,
	onChange,
	...props
}: TextareaProps) {
	const [length, setLength] = React.useState(String(value ?? defaultValue ?? '').length);
	const count = value !== undefined ? String(value).length : length;

	const field = (
		<textarea
			data-slot="textarea"
			maxLength={maxLength}
			value={value}
			defaultValue={defaultValue}
			onChange={(event) => {
				setLength(event.target.value.length);
				onChange?.(event);
			}}
			className={cn(
				'flex field-sizing-content min-h-28 w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-none transition-all outline-none',
				'placeholder:text-neutral-400',
				'focus:!border-[#00A6A6] focus:!outline-none focus:!ring-2 focus:!ring-[#00A6A6] focus:!ring-offset-2 focus:!ring-offset-white',
				'aria-invalid:border-destructive aria-invalid:focus:!border-destructive aria-invalid:focus:!ring-destructive',
				'read-only:bg-neutral-100 read-only:focus:!border-neutral-200 read-only:focus:!ring-0 read-only:focus:!ring-offset-0',
				'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 disabled:placeholder:text-neutral-400',
				showCount && 'pb-9',
				className,
			)}
			{...props}
		/>
	);

	if (!showCount) return field;

	return (
		<div data-slot="textarea-wrapper" className="relative w-full">
			{field}
			<span
				aria-live="polite"
				className="pointer-events-none absolute right-4 bottom-3 text-xs text-neutral-400"
			>
				{count}
				{maxLength ? `/${maxLength}` : ''}
			</span>
		</div>
	);
}

export { Textarea };
