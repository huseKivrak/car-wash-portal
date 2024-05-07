'use client';
import { Button, ButtonProps } from './ui/button';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = ButtonProps & {
	pendingText?: string;
};

export function SubmitButton({
	pendingText,
	children,
	...props
}: SubmitButtonProps) {
	const { pending, action } = useFormStatus();
	const isPending = pending && action === props.formAction;

	return (
		<Button
			type='submit'
			variant='destructive'
			aria-disabled={pending}
			disabled={pending}
			{...props}
		>
			{isPending ? pendingText : children}
		</Button>
	);
}
