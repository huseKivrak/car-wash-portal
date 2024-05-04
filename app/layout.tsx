import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Providers} from './providers';
import {cn} from '@/utils/clsxMerge';
import './globals.css';

const inter = Inter({subsets: ['latin']});

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
					inter.className
				)}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
