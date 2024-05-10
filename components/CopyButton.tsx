import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { LucideClipboard } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { cn } from '@/lib/utils';

export function CopyButton({
	content,
	className,
}: {
	content: string;
	className?: string;
}) {
	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={() => {
				navigator.clipboard.writeText(content);
				toast({
					title: `"${content}" Copied to clipboard.`,
				});
			}}
			className={cn('ml-1 h-6 w-6', className)}
		>
			<LucideClipboard className='w-3 h-3' />
			<span className='sr-only'>Copy</span>
		</Button>
	);
}
