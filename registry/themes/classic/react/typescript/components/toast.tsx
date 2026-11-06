'use client';

import * as React from 'react';
import { CircleAlert, CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';
import { cn } from './utils';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

type ToastItem = {
	id: number;
	variant: ToastVariant;
	title: string;
	description?: string;
	duration: number;
};

type ToastOptions = {
	description?: string;
	duration?: number;
};

const variants: Record<ToastVariant, { bar: string; icon: string; Icon: React.ElementType }> = {
	success: { bar: 'bg-green-500', icon: 'text-green-500', Icon: CircleCheck },
	error: { bar: 'bg-red-500', icon: 'text-red-500', Icon: CircleAlert },
	warning: {
		bar: 'bg-amber-500',
		icon: 'text-amber-500',
		Icon: TriangleAlert,
	},
	info: { bar: 'bg-blue-500', icon: 'text-blue-500', Icon: Info },
};

let items: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const timers = new Map<number, ReturnType<typeof setTimeout>>();

function emit() {
	listeners.forEach((listener) => listener());
}

function dismiss(id?: number) {
	if (id === undefined) {
		timers.forEach((timer) => clearTimeout(timer));
		timers.clear();
		items = [];
	} else {
		const timer = timers.get(id);
		if (timer) clearTimeout(timer);
		timers.delete(id);
		items = items.filter((item) => item.id !== id);
	}
	emit();
}

function add(variant: ToastVariant, title: string, options: ToastOptions = {}) {
	const id = nextId++;
	const duration = options.duration ?? 5000;

	items = [...items, { id, variant, title, description: options.description, duration }];
	emit();

	if (duration > 0 && Number.isFinite(duration)) {
		timers.set(
			id,
			setTimeout(() => dismiss(id), duration),
		);
	}

	return id;
}

const toast = {
	success: (title: string, options?: ToastOptions) => add('success', title, options),
	error: (title: string, options?: ToastOptions) => add('error', title, options),
	warning: (title: string, options?: ToastOptions) => add('warning', title, options),
	info: (title: string, options?: ToastOptions) => add('info', title, options),
	dismiss,
};

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

const getSnapshot = () => items;
const emptyItems: ToastItem[] = [];
const getServerSnapshot = () => emptyItems;

function Toast({
	variant = 'info',
	title,
	description,
	onClose,
	className,
}: {
	variant?: ToastVariant;
	title: string;
	description?: string;
	onClose?: () => void;
	className?: string;
}) {
	const { bar, icon, Icon } = variants[variant];

	return (
		<div
			data-slot="toast"
			data-variant={variant}
			role={variant === 'error' ? 'alert' : 'status'}
			className={cn(
				'relative flex w-full items-center gap-3 overflow-hidden rounded-lg border border-neutral-200 bg-white py-3 pr-4 pl-5 shadow-sm',
				className,
			)}
		>
			<span aria-hidden="true" className={cn('absolute inset-y-0 left-0 w-1', bar)} />
			<Icon className={cn('size-5 shrink-0', icon)} />
			<div className="min-w-0 flex-1">
				<p className="text-sm leading-tight font-semibold text-slate-900">{title}</p>
				{description && (
					<p className="mt-0.5 text-xs leading-snug text-neutral-500">{description}</p>
				)}
			</div>
			{onClose && (
				<button
					type="button"
					aria-label="Dismiss notification"
					onClick={onClose}
					className="shrink-0 rounded-full text-neutral-400 transition-colors outline-none hover:text-slate-700 focus-visible:ring-[3px] focus-visible:ring-primary/20"
				>
					<CircleX className="size-5" />
				</button>
			)}
		</div>
	);
}

function Toaster({ className }: { className?: string }) {
	const list = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	return (
		<div
			data-slot="toaster"
			className={cn(
				'pointer-events-none fixed top-4 right-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3',
				className,
			)}
		>
			{list.map((item) => (
				<div
					key={item.id}
					className="pointer-events-auto animate-in duration-200 fade-in-0 slide-in-from-right-4"
				>
					<Toast
						variant={item.variant}
						title={item.title}
						description={item.description}
						onClose={() => dismiss(item.id)}
					/>
				</div>
			))}
		</div>
	);
}

export { Toast, Toaster, toast };
export type { ToastVariant, ToastOptions };
