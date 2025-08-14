import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
});

const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "RENTO - Your Complete Lifestyle Management Platform",
	description:
		"Find nearby services, rent houses, connect with community, and manage your daily life with ease. Developed by dot PY Nexa.",
	keywords:
		"lifestyle management, local services, property rental, community, Bangladesh, Dhaka",
	authors: [{ name: "dot PY Nexa" }],
	creator: "dot PY Nexa",
	publisher: "dot PY Nexa",
	openGraph: {
		title: "RENTO - Your Complete Lifestyle Management Platform",
		description:
			"Find nearby services, rent houses, connect with community, and manage your daily life with ease.",
		type: "website",
		locale: "en_US",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${inter.variable} ${poppins.variable} ${playfair.variable} font-inter antialiased bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 selection:bg-purple-200 selection:text-purple-900`}
			>
				<Providers>
					<Navbar />
					<main className="min-h-screen">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
