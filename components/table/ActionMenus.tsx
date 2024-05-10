'use client';

import {
	DropdownMenu,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { Button } from '../ui/button';
import { FolderX, LucideEdit, MoreHorizontal, User, UserX } from 'lucide-react';
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { DeleteModal } from '../DeleteModal';
import { cancelUser } from '@/actions/users';
import { Dialog, DialogClose, DialogContent } from '../ui/dialog';
import { UserForm } from '../forms/UserForm';
import { DetailedSubscription, DetailedUser } from '@/types/types';
import { useDialog } from '../ui/use-dialog';
import { cancelSubscription } from '@/actions/subscriptions';

export const UserActionsMenu = ({ user }: { user: DetailedUser }) => {
	const deleteDialog = useDialog();
	const editDialog = useDialog();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end'>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href={`users/${user.id}`} className='hover:underline flex'>
							<User className='mr-1 h-4 w-4' />
							<span>User Details</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem onSelect={editDialog.trigger}>
						<LucideEdit className='mr-1 h-4 w-4' />
						<span>Edit</span>
					</DropdownMenuItem>

					<DropdownMenuItem onSelect={deleteDialog.trigger}>
						<UserX className='mr-1 h-4 w-4' />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>

			<DeleteModal
				id={user.id}
				deleteAction={cancelUser}
				dialogControl={deleteDialog}
			/>

			<Dialog {...editDialog.props}>
				<DialogContent>
					<UserForm user={user} onSuccess={editDialog.dismiss} />
				</DialogContent>
			</Dialog>
		</DropdownMenu>
	);
};

export const SubscriptionActionsMenu = ({
	subscription,
}: {
	subscription: DetailedSubscription;
}) => {
	const deleteDialog = useDialog();
	const editDialog = useDialog();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={editDialog.trigger}>
						<LucideEdit className='mr-1 h-4 w-4' />
						<span>Edit</span>
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={deleteDialog.trigger}>
						<FolderX className='mr-1 h-4 w-4' />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>

			<Dialog {...editDialog.props}>
				<DialogContent>
					Edit Subscription Form Here
					<DialogClose asChild>
						<Button>Close</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>
			<DeleteModal
				id={subscription.id}
				deleteAction={cancelSubscription}
				dialogControl={deleteDialog}
			/>
		</DropdownMenu>
	);
};
