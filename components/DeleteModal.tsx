'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { SubmitButton } from './SubmitButton';
import { DialogProps } from '@radix-ui/react-dialog';
import { toast } from './ui/use-toast';
export function DeleteModal({
	id,
	deleteAction,
	dialogControl,
}: {
	id: string | number;
	deleteAction: (id: number) => Promise<any> | void;
	dialogControl: {
		props: DialogProps;
		dismiss: () => void;
	};
}) {
	const handleSubmit = async () => {
		const userId = typeof id === 'number' ? id : parseInt(id);
		const response = await deleteAction(userId);
		console.log('response:', response);
		if (response.status === 'success') {
			toast({
				variant: 'success',
				title: 'Success!',
				description: response.message,
			});
		} else {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong',
				description: (
					<pre className='mt-2 w-[400px] rounded-md bg-red-700'>
						<p className='text-white'>{response.message}</p>
					</pre>
				),
			});
		}
		dialogControl.dismiss();
	};

	return (
		<Dialog {...dialogControl.props}>
			<DialogContent>
				Are you sure you want to cancel this?
				<form
					//todo
					//@ts-ignore
					action={deleteAction}
					onSubmit={handleSubmit}
					className='flex flex-col gap-4'
				>
					<SubmitButton variant='destructive' pendingText='Cancelling...'>
						Confirm
					</SubmitButton>
				</form>
				<DialogClose>
					<Button variant='secondary'>Close</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
