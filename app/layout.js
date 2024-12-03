"use client";
import localFont from "next/font/local";
import "./globals.css";
import MainHeader from "./components/headers/mainheader";
import Footer from "./components/footer/footer";
import { usePathname } from "next/navigation";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default function RootLayout({ children }) {
	// const pathname = usePathname();
	// let isAuthPage = pathname.startsWith("/auth");
	// let isDashboard = pathname.startsWith("/dashboard");
	// let hideHeader = isAuthPage || isDashboard
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{/* { !hideHeader && <MainHeader />} */}
				<main className="flex flex-col">{children}</main>
				{/* {!isAuthPage || !isDashboard && <Footer />} */}
			</body>
		</html>
	);
}
