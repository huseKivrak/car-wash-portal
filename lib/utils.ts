import { Vehicle } from '@/types/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getStatusColor(status: string) {
	const statusMap = {
		active: '#10B981', // green-500
		paid: '#10B981', // green-500
		cancelled: '#8a3c1a', // stone-700
		pending: '#d6d3d1', // stone-500
		failed: '#b91c1c', // red-700
		overdue: '#b91c1c', // red-700
		transferred: '#b45309', //amber-700
	};

	type StatusKey = keyof typeof statusMap;
	const color = statusMap[status as StatusKey] || 'default-500';

	return color;
}

export function makeVehicleTitle(vehicle: Vehicle) {
	const { year, make, model } = vehicle;
	return `${year} ${make} ${model}`.toUpperCase();
}

export function formatDateTime(date: Date, includeTime: boolean = true) {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
	};

	if (includeTime) {
		options.hour = '2-digit';
		options.minute = '2-digit';
	}

	const dateTimeFormatter = new Intl.DateTimeFormat('en-US', options);
	return dateTimeFormatter.format(date);
};

export function capitalize(str: string) {
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

