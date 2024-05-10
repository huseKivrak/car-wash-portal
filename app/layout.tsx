import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import { cn } from '@/lib/utils';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/layout/Sidebar';

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'CSR Portal',
	description: 'AMP Portal for Customer Service Representatives',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					quicksand.className
				)}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<div className='flex justify-end p-4'>
						<Navbar />
					</div>
					<main className='container mx-auto max-w-7xl pt-8 flex-grow'>
						{children}
					</main>
					<Sidebar />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
