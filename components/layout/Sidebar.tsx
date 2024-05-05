import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronsRight } from 'lucide-react';
import { navLinks } from '@/config/navLinks';

export function Sidebar() {
	return (
		<Sheet>
			<SheetTrigger asChild className='fixed top-1/2 ml-2'>
				<Button variant='ghost' size='icon' className='shrink-0'>
					<ChevronsRight className='h-7 w-8' />
					<span className='sr-only'>Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent className='w-[200px] sm:w-[540px] p-12' side='left'>
				<nav className='grid gap-6 text-lg font-medium'>
					{navLinks.map((link) => (
						<Link
							href={link.href}
							className='text-muted-foreground hover:text-foreground'
						>
							{link.label}
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
