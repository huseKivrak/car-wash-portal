'use client';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { DetailedUser } from '@/types/types';
import { makeVehicleTitle } from '@/lib/utils';
import { AddVehicleForm } from './AddVehicleForm';
import { Dialog, DialogContent } from '../ui/dialog';
import { useDialog } from '../ui/use-dialog';
import { toast } from '@/components/ui/use-toast';
import { transferSubscription } from '@/actions/subscriptions';
import { Car } from 'lucide-react';

const formSchema = z.object({
	subscriptionId: z.string(),
	vehicleId: z.string(),
});

export function TransferSubscriptionForm({
	user,
	onSuccess,
}: {
	user: DetailedUser;
	onSuccess: () => void;
}) {
	const [newVehicleIdString, setNewVehicleIdString] = useState<string>('');
	const addVehicleDialog = useDialog();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			subscriptionId: '',
			vehicleId: newVehicleIdString,
		},
	});

	useEffect(() => {
		form.setValue('vehicleId', newVehicleIdString);
	}, [newVehicleIdString, form]);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const subscriptionId = parseInt(values.subscriptionId);
		const vehicleId = parseInt(values.vehicleId);

		const response = await transferSubscription(subscriptionId, vehicleId);
		if (response.status === 'success') {
			toast({
				variant: 'success',
				title: 'Success!',
				description: response.message,
			});
			onSuccess();
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
			form.reset();
		}
	}

	const handleNewlyAddedVehicle = (newId?: number) => {
		setNewVehicleIdString(newId!.toString());
		addVehicleDialog.dismiss();
	};
	console.log('form values before:', form.getValues());
	return (
		<div>
			<Form {...form}>
				<form
					noValidate
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
				>
					<FormField
						control={form.control}
						name='subscriptionId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Current vehicle</FormLabel>
								<FormDescription>
									Select the currently subscripted vehicle.
								</FormDescription>
								<Select
									defaultValue={field.value}
									onValueChange={field.onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select vehicle' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{user.subscriptions.map((sub) => (
											<SelectItem value={sub.id.toString()} key={sub.id}>
												{makeVehicleTitle(sub.vehicle)}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='vehicleId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Transfer subscription to:</FormLabel>
								<FormDescription>
									Choose which vehicle the subscription should be transferred
									to.
								</FormDescription>
								<Select
									value={newVehicleIdString}
									onValueChange={field.onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{user.vehicles.map((vehicle) => (
											<SelectItem
												value={vehicle.id.toString()}
												key={vehicle.id}
											>
												{makeVehicleTitle(vehicle)}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Button
									variant='secondary'
									onClick={addVehicleDialog.trigger}
									className='flex font-bold hover:font-extrabold justify-start'
								>
									<Car className='w-4 h-4 mr-2' />
									Add new vehicle
								</Button>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit'>Submit</Button>
				</form>
			</Form>
			<Dialog {...addVehicleDialog.props}>
				<DialogContent>
					<AddVehicleForm
						userId={user.id}
						onSuccess={handleNewlyAddedVehicle}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
