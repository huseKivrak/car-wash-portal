import { useState } from 'react';

/**
 * Custom hook for managing dialog state in dropdown menus.
 * {@link https://github.com/radix-ui/primitives/issues/1836#issuecomment-2050627695}
 */
export function useDialog() {
	const [isOpen, setIsOpen] = useState(false);

	const trigger = () => setIsOpen(true);

	return {
		props: {
			open: isOpen,
			onOpenChange: setIsOpen,
		},
		trigger: trigger,
		dismiss: () => setIsOpen(false),
	};
}
