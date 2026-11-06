import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';
import { Slot } from 'radix-ui';

const buttonVariants = cva(
	"group/button inline-flex cursor-pointer shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-sans text-sm font-semibold tracking-normal whitespace-nowrap transition-all outline-none select-none focus:!outline-none focus:!ring-2 focus:!ring-[#00A6A6] focus:!ring-offset-2 focus:!ring-offset-white disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					'bg-[#00A3A3] text-[#0F2A43] hover:bg-[#00C4C4] active:bg-[#007C7C] disabled:bg-[#99DADA] disabled:text-neutral-500 disabled:opacity-100',
				outline:
					'border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200',
				dark: 'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950',
				secondary:
					'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300',
				ghost: 'text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200',
				destructive:
					'bg-destructive/10 text-destructive hover:bg-destructive/20 active:bg-destructive/30 focus:!ring-destructive',
				link: 'text-neutral-900 underline-offset-4 hover:underline normal-case',
			},
			size: {
				default:
					'h-12 gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5',
				xs: "h-7 gap-1 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
				sm: "h-9 gap-1.5 rounded-md px-4 text-xs [&_svg:not([class*='size-'])]:size-3.5",
				lg: 'h-14 gap-2 px-8 text-base',
				icon: 'size-12',
				'icon-xs': "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
				'icon-sm': 'size-9 rounded-md',
				'icon-lg': 'size-14',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

function Button({
	className,
	variant = 'default',
	size = 'default',
	asChild = false,
	loading = false,
	onClick,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		loading?: boolean;
	}) {
	const Comp = asChild ? Slot.Root : 'button';

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (loading) {
			e.preventDefault();
			return;
		}
		onClick?.(e);
	};

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			data-loading={loading || undefined}
			aria-busy={loading || undefined}
			aria-disabled={loading || undefined}
			className={cn(
				buttonVariants({ variant, size, className }),
				loading && 'loading-stripes cursor-progress',
			)}
			{...props}
			onClick={handleClick}
		/>
	);
}

export { Button, buttonVariants };
