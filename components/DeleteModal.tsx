'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { SubmitButton } from './SubmitButton';
import { DialogProps } from '@radix-ui/react-dialog';

export function DeleteModal({
	id,
	action,
	dialogControl,
}: {
	id: number;
	action: (formData: FormData) => Promise<any>;
	dialogControl: {
		props: DialogProps;
		dismiss: () => void;
	};
}) {
	return (
		<Dialog {...dialogControl.props}>
			<DialogContent>
				Are you sure you want to delete this subscription?
				<form>
					<input type='hidden' value={id} name='subscription_id' />
					<SubmitButton
						formAction={action}
						pendingText='Deleting...'
						onSubmit={() => {
							setTimeout(() => console.log('timeout'), 100);
							dialogControl.dismiss();
						}}
					>
						Delete
					</SubmitButton>
				</form>
				<DialogClose asChild>
					<Button>Close</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
