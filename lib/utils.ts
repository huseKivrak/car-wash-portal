import { Vehicle } from '@/types/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getStatusColor(status: string) {
	const statusMap = {
		active: '#10B981', // green-500
		paid: '#047857', // green-700
		cancelled: '#8a3c1a', // stone-700
		pending: '#d6d3d1', // stone-500
		failed: '#dc2626', // red-600
		overdue: '#dc2626', // red-600
	};

	type StatusKey = keyof typeof statusMap;
	const color = statusMap[status as StatusKey] || 'default-500';

	return color;
}

export function makeVehicleTitle(vehicle: Vehicle) {
	const { year, make, model } = vehicle;
	return `${year} ${make} ${model}`;
}
