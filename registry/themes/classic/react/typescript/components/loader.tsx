import * as React from 'react';
import { cn } from './utils';

type LoaderSize = 'sm' | 'md' | 'lg';
type LoaderTone = 'primary' | 'dark';

const sizes: Record<LoaderSize, string> = {
	sm: 'size-5',
	md: 'size-8',
	lg: 'size-12',
};

const tones: Record<LoaderTone, string> = {
	primary: 'text-[#00A3A3]',
	dark: 'text-[#0F2A43]',
};

function Spinner({
	size = 'md',
	tone = 'primary',
	className,
}: {
	size?: LoaderSize;
	tone?: LoaderTone;
	className?: string;
}) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
			className={cn('shrink-0 animate-spin', sizes[size], tones[tone], className)}
		>
			<circle
				cx="12"
				cy="12"
				r="9.5"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeDasharray="45 15"
			/>
		</svg>
	);
}

function Loader({
	size = 'md',
	tone = 'primary',
	label,
	description,
	className,
}: {
	size?: LoaderSize;
	tone?: LoaderTone;
	label?: string;
	description?: string;
	className?: string;
}) {
	if (size === 'sm') {
		return (
			<span
				data-slot="loader"
				role="status"
				aria-live="polite"
				className={cn('inline-flex items-center gap-2', className)}
			>
				<Spinner size={size} tone={tone} />
				{label && <span className="text-xs text-neutral-500">{label}</span>}
			</span>
		);
	}

	return (
		<div
			data-slot="loader"
			role="status"
			aria-live="polite"
			className={cn('flex flex-col items-center gap-3 text-center', className)}
		>
			<Spinner size={size} tone={tone} />
			{(label || description) && (
				<div>
					{label && <p className="text-sm font-semibold text-slate-900">{label}</p>}
					{description && <p className="mt-1 text-xs text-neutral-400">{description}</p>}
				</div>
			)}
		</div>
	);
}

export { Loader, Spinner };
