'use client';

import { ArrowRightLeft, UserX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { DetailedUser } from '@/types/types';
import { LucidePhone, Mail } from 'lucide-react';
import { useDialog } from './ui/use-dialog';
import { DeleteModal } from './DeleteModal';
import { cancelUser } from '@/actions/users';
import { Dialog, DialogContent } from './ui/dialog';
import { TransferSubscriptionForm } from './forms/TransferSubscriptionForm';
import { formatDateTime, getStatusColor } from '@/lib/utils';
import { UserForm } from './forms/UserForm';

export function UserOverview({ user }: { user: DetailedUser }) {
	const cancelDialog = useDialog();
	const editDialog = useDialog();
	const transferSubscriptionDialog = useDialog();
	return (
		<Card className='max-w-xl'>
			<CardHeader className='flex flex-col items-center justify-between pb-1'>
				<div className='text-xl text-secondary-foreground'>Shortcuts</div>
				<CardTitle className='text-lg'>{user.name}</CardTitle>
			</CardHeader>
			<div className='pl-6 text-stone-400 space-y-1 '>
				<div className='hover:underline'>
					<Link href={`tel:${user.phone}`} className='flex items-center'>
						{user.phone}
						<LucidePhone className='w-3 h-3 ml-2' />
					</Link>
				</div>
				<div className='hover:underline'>
					<Link href={`mailto:${user.email}`} className='flex items-center'>
						{user.email}
						<Mail className='w-3 h-3 ml-2' />
					</Link>
				</div>
			</div>

			<Separator className='my-2' />

			<CardContent>
				<div className='flex flex-col gap-3'>
					<Button
						size='sm'
						variant='outline'
						onClick={editDialog.trigger}
						className='w-fit'
					>
						<UserX className='mr-2 h-4 w-4' />
						Edit account
					</Button>
					<Button
						size='sm'
						variant='secondary'
						onClick={transferSubscriptionDialog.trigger}
						className='w-fit'
					>
						<ArrowRightLeft className='mr-2 h-4 w-4' />
						Transfer Sub
					</Button>
					<Button
						size='sm'
						variant='destructive'
						onClick={cancelDialog.trigger}
						className='w-fit'
					>
						<UserX className='mr-2 h-4 w-4' />
						Cancel account
					</Button>
				</div>

				<Dialog {...transferSubscriptionDialog.props}>
					<DialogContent>
						<TransferSubscriptionForm
							user={user}
							onSuccess={transferSubscriptionDialog.dismiss}
						/>
					</DialogContent>
				</Dialog>

				<Dialog {...cancelDialog.props}>
					<DialogContent>
						<DeleteModal
							deleteAction={cancelUser}
							id={user.id}
							dialogControl={cancelDialog}
						/>
					</DialogContent>
				</Dialog>
				<Dialog {...editDialog.props}>
					<DialogContent>
						<UserForm user={user} onSuccess={editDialog.dismiss} />
					</DialogContent>
				</Dialog>
			</CardContent>
			<CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
				<div className='text-xs text-muted-foreground'>
					Last updated:{' '}
					<time dateTime={user.updatedAt.toString()}>
						{formatDateTime(user.updatedAt)}
					</time>
				</div>
			</CardFooter>
		</Card>
	);
}
