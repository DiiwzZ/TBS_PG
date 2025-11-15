import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

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
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
