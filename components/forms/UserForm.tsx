'use client';

import { useForm } from 'react-hook-form';
import { insertUserSchema } from '@/database/schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DetailedUser } from '@/types/types';

import {
	Form,
	FormItem,
	FormControl,
	FormDescription,
	FormLabel,
	FormField,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

type UserInputs = z.infer<typeof insertUserSchema>;

export function UserForm({ user }: { user?: DetailedUser }) {
	const form = useForm<UserInputs>({
		resolver: zodResolver(insertUserSchema),
		defaultValues: {
			name: user?.name || '',
			email: user?.email || '',
			phone: user?.phone || '',
		},
	});

	function onSubmit(values: UserInputs) {
		console.log(values);
		toast({
			title: 'Submitted values:',
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(values, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='John Doe'
									{...field}
									value={field.value || ''}
								/>
							</FormControl>
							<FormDescription>Edit customer's name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='john@doe.com'
									{...field}
									value={field.value || ''}
								/>
							</FormControl>
							<FormDescription>Edit customer's email.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input
									placeholder='123-456-7890'
									{...field}
									value={field.value || ''}
								/>
							</FormControl>
							<FormDescription>Edit customer's phone.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
