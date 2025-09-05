import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Gaurav Kumar Jangid | Cosmic Architect',
  description: 'I create efficient, scalable, and intelligent software solutions, from the web to the cosmos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;500&family=Source+Code+Pro:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-sans antialiased")}>
        <AuthProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
                <div className="relative z-10">{children}</div>
                <Toaster />
            </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
