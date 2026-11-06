'use client';

import * as React from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { cn } from './utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn('flex flex-col gap-4', className)}
			{...props}
		/>
	);
}

function TabsList({
	className,
	indicatorClassName,
	children,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
	indicatorClassName?: string;
}) {
	const listRef = React.useRef<HTMLDivElement>(null);
	const [indicator, setIndicator] = React.useState<{
		left: number;
		width: number;
	} | null>(null);

	React.useLayoutEffect(() => {
		const list = listRef.current;
		if (!list) return;

		const update = () => {
			const active = list.querySelector<HTMLElement>('[data-state="active"]');
			if (!active) return;
			setIndicator({
				left: active.offsetLeft,
				width: active.offsetWidth,
			});
		};

		update();

		const mutationObserver = new MutationObserver(update);
		mutationObserver.observe(list, {
			attributes: true,
			attributeFilter: ['data-state'],
			subtree: true,
		});

		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(list);
		Array.from(list.children).forEach((child) => resizeObserver.observe(child));

		return () => {
			mutationObserver.disconnect();
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<TabsPrimitive.List
			ref={listRef}
			data-slot="tabs-list"
			className={cn(
				'relative inline-flex w-fit items-center rounded-lg bg-neutral-100 p-1',
				className,
			)}
			{...props}
		>
			{indicator && (
				<span
					aria-hidden
					className={cn(
						'absolute inset-y-1 left-0 rounded-md bg-white shadow-sm transition-[transform,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none',
						indicatorClassName,
					)}
					style={{
						width: indicator.width,
						transform: `translateX(${indicator.left}px)`,
					}}
				/>
			)}
			{children}
		</TabsPrimitive.List>
	);
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				'relative z-10 inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-4 font-sans text-sm font-semibold whitespace-nowrap text-neutral-500 transition-colors duration-300 outline-none select-none hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-[#00A6A6] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-neutral-900',
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn(
				'outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 data-[state=active]:duration-300',
				className,
			)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
