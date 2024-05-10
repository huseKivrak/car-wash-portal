'use client';

import { AutoComplete, type Option } from './ui/autocomplete';
import { useState, useEffect } from 'react';
import { DetailedUser } from '@/types/types';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ArrowBigDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { KeyCombo, Keys, ShortcutsProvider } from '@/lib/keyboardShortcuts';
export function UsersAutocomplete({ users }: { users: DetailedUser[] }) {
	const [isLoading, setLoading] = useState(false);
	const [isDisabled, setDisbled] = useState(false);
	const [value, setValue] = useState<Option>();
	const router = useRouter();

	const options: Option[] = users.map((user) => ({
		value: user.id.toString(),
		label: user.name,
		id: user.id.toString(),
	}));

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && event.shiftKey && value) {
				router.push(`/users/${value.value}`);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [value, router]);

	return (
		<div className='not-prose mt-8 flex gap-4'>
			<AutoComplete
				options={options}
				emptyMessage='No users found.'
				placeholder='Search by user name...'
				isLoading={isLoading}
				onValueChange={setValue}
				value={value}
				disabled={isDisabled}
			/>
			{value && (
				<div className='flex items-center gap-2'>
					<Link
						href={`/users/${value.value}`}
						className={cn(buttonVariants({ size: 'sm', variant: 'default' }))}
					>
						View user
					</Link>
					<div className='flex gap-1'>
						<ShortcutsProvider>
							<KeyCombo keyNames={[Keys.Shift, Keys.Enter]} />
						</ShortcutsProvider>
					</div>
				</div>
			)}
		</div>
	);
}
