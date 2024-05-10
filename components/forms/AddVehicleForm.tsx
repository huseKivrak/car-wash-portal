'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { addVehicle } from '@/actions/vehicles';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { insertVehicleSchema } from '@/database/schema';
import { toast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';

type VehicleInputs = z.infer<typeof insertVehicleSchema>;
export function AddVehicleForm({
	userId,
	onSuccess,
}: {
	userId: number;
	onSuccess: (vehicleId?: number) => void;
}) {
	const form = useForm<VehicleInputs>({
		resolver: zodResolver(insertVehicleSchema),
		defaultValues: {
			licensePlate: '',
			make: '',
			model: '',
			//@ts-ignore - fixes placeholder bug
			year: '',
			color: '',
			userId: userId,
		},
	});

	async function onSubmit(values: VehicleInputs) {
		console.log(values);
		const vehicleData = {
			...values,
			userId,
		};
		const response = await addVehicle(vehicleData);
		if (response.status === 'success') {
			const vehicleId = response.data;
			onSuccess(vehicleId);
			toast({
				variant: 'success',
				title: 'Vehicle added',
				description: response.message,
			});
		} else {
			toast({
				variant: 'destructive',
				title: 'Something went wrong',
				description: (
					<pre className='mt-2 w-[400px] rounded-md bg-red-700'>
						<p className='text-white'>{response.message}</p>
					</pre>
				),
				action: <ToastAction altText='Try Again'>Try Again</ToastAction>,
			});
		}
		form.reset();
	}

	return (
		<Form {...form}>
			<h1 className='text-3xl font-semibold'>Add a new vehicle</h1>
			<p className='text-lg text-stone-600 dark:text-stone-300'>
				Please ensure all details are correct before submitting.
			</p>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='licensePlate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>License Plate</FormLabel>
							<FormControl>
								<Input placeholder='e.g. BKU2039' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='make'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Make</FormLabel>
							<FormControl>
								<Input placeholder='Toyota' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='model'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model</FormLabel>
							<FormControl>
								<Input placeholder='Prius' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='year'
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<FormItem>
							<FormLabel>Year</FormLabel>
							<FormControl>
								<Input
									type='number'
									placeholder='2024'
									onBlur={onBlur}
									onChange={(e) => onChange(parseInt(e.target.value, 10) || '')}
									value={value}
									ref={ref}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='color'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Color</FormLabel>
							<FormControl>
								<Input placeholder='black' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
