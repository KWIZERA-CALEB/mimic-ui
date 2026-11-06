import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { cn } from './utils';

const alertVariants = cva(
	'flex w-full items-center gap-3 rounded-md border px-4 py-3 text-sm text-slate-900',
	{
		variants: {
			variant: {
				success: 'border-green-100 bg-green-50',
				error: 'border-red-100 bg-red-50',
				warning: 'border-amber-100 bg-amber-50',
				info: 'border-blue-100 bg-blue-50',
			},
		},
		defaultVariants: {
			variant: 'info',
		},
	},
);

const icons = {
	success: { Icon: CircleCheck, color: 'text-green-500' },
	error: { Icon: CircleAlert, color: 'text-red-500' },
	warning: { Icon: TriangleAlert, color: 'text-amber-500' },
	info: { Icon: Info, color: 'text-blue-500' },
};

const actionColors = {
	success: 'text-green-600',
	error: 'text-red-500',
	warning: 'text-amber-500',
	info: 'text-blue-500',
};

type AlertAction = {
	label: string;
	href?: string;
	onClick?: () => void;
};

function Alert({
	className,
	variant = 'info',
	action,
	children,
	...props
}: Omit<React.ComponentProps<'div'>, 'role'> &
	VariantProps<typeof alertVariants> & {
		action?: AlertAction;
	}) {
	const key = variant ?? 'info';
	const { Icon, color } = icons[key];
	const actionClass = cn(
		'shrink-0 text-xs font-semibold underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
		actionColors[key],
	);

	return (
		<div
			data-slot="alert"
			data-variant={variant}
			role={key === 'error' ? 'alert' : 'status'}
			className={cn(alertVariants({ variant }), className)}
			{...props}
		>
			<Icon className={cn('size-5 shrink-0', color)} />
			<div className="min-w-0 flex-1">{children}</div>
			{action &&
				(action.href ? (
					<a href={action.href} onClick={action.onClick} className={actionClass}>
						{action.label}
					</a>
				) : (
					<button type="button" onClick={action.onClick} className={actionClass}>
						{action.label}
					</button>
				))}
		</div>
	);
}

export { Alert, alertVariants };
export type { AlertAction };
