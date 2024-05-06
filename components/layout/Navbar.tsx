'use client';

import Link from 'next/link';

import { ThemeToggle } from './ThemeToggle';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navLinks } from '@/config/navLinks';

export function Navbar() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href='/' legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<div>AMP</div>
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				{navLinks.map((link, index) => {
					return (
						<NavigationMenuItem key={index}>
							<Link href={link.href} legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									{link.label}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					);
				})}

				<NavigationMenuItem>
					<ThemeToggle />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
