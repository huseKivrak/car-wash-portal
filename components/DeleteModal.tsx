'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogFooter,
} from '@/components/ui/dialog';
import { SubmitButton } from './SubmitButton';
import { DialogProps } from '@radix-ui/react-dialog';
import { toast } from './ui/use-toast';
import { CircleAlert } from 'lucide-react';
export function DeleteModal({
	id,
	deleteAction,
	dialogControl,
}: {
	id: number;
	deleteAction: (id: number) => Promise<any> | void;
	dialogControl: {
		props: DialogProps;
		dismiss: () => void;
	};
}) {
	const handleSubmit = async () => {
		const response = await deleteAction(id);
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
			<DialogContent className='max-w-md'>
				<div className='text-lg'>Confirm Cancellation</div>
				<div className='flex items-center text-red-500'>
					<CircleAlert className='w-5 h-5 mr-2' />
					<p className='tracking-wide'>
						Warning: this action cannot be undone.
					</p>
				</div>
				<div className='flex items-center justify-evenly space-x-2'>
					<form
						//todo
						//@ts-ignore
						action={deleteAction}
						onSubmit={handleSubmit}
					>
						<SubmitButton
							variant='destructive'
							pendingText='Cancelling...'
							size='lg'
						>
							Confirm
						</SubmitButton>
					</form>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary' size='lg'>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
