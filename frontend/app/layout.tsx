import type { Metadata } from "next";
import "../styles/globals.css";
import ThemeRegistry from "./ThemeRegistry";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Bar Table Booking System",
  description: "Reserve your table at the best bars in town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ErrorBoundary>
      </body>
    </html>
  );
}
