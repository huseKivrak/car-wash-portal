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
	const { pending } = useFormStatus();
	const isPending = pending;
	return (
		<Button type='submit' aria-disabled={pending} {...props}>
			{isPending ? pendingText : children}
		</Button>
	);
}
