"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
	MapPin,
	Home,
	Store,
	Users,
	Calendar,
	Trophy,
	Settings,
	Menu,
	X,
	Search,
	User,
	LogOut,
	ChevronDown,
} from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { data: session, status } = useSession();

	const navigationItems = [
		{ name: "Home", href: "/", icon: Home },
		{ name: "Properties", href: "/properties", icon: Home },
		{ name: "Services", href: "/services", icon: Store },
		{ name: "Community", href: "/community", icon: Users },
		{ name: "Events", href: "/events", icon: Calendar },
		{ name: "Leaderboard", href: "/leaderboard", icon: Trophy },
	];

	return (
		<nav className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm: lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo and Brand
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/logo.png"
                alt="NOTUN THIKANA Logo"
                width={48}
                height={48}
                className="transition-all duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-playfair font-bold bg-gradient-to-r from-purple-800 via-yellow-600 to-purple-800 bg-clip-text text-transparent tracking-tight">
                  NOTUN THIKANA
                </h1>
              </div>
            </Link>
          </div> */}

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-2">
						{navigationItems.map((item) => {
							const IconComponent = item.icon;
							return (
								<Link
									key={item.name}
									href={item.href}
									className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 group relative overflow-hidden"
								>
									<IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
									<span className="font-poppins font-medium">
										{item.name}
									</span>
									<div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
								</Link>
							);
						})}
					</div>

					{/* User Actions */}
					<div className="hidden md:flex items-center space-x-4">
						<button className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 group">
							<MapPin className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
							<span className="font-poppins">Location</span>
						</button>
						<NotificationDropdown userId={1} />
						<Link
							href="/messages"
							className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-purple-700 transition-colors duration-300 font-poppins"
						>
							Messages
						</Link>

						{/* Conditional rendering based on authentication status */}
						{status === "loading" ? (
							<div className="w-8 h-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
						) : session ? (
							// Profile Menu (when authenticated)
							<div className="relative">
								<button
									onClick={() =>
										setIsProfileOpen(!isProfileOpen)
									}
									className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300"
								>
									<div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
										{session.user?.name
											?.charAt(0)
											.toUpperCase() ||
											session.user?.email
												?.charAt(0)
												.toUpperCase() ||
											"U"}
									</div>
									<span className="font-poppins">
										{session.user?.name ||
											session.user?.email}
									</span>
									<ChevronDown className="h-4 w-4" />
								</button>

								{/* Profile Dropdown */}
								{isProfileOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
										<Link
											href="/profile"
											className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-300"
											onClick={() =>
												setIsProfileOpen(false)
											}
										>
											<User className="h-4 w-4" />
											<span>Profile</span>
										</Link>
										<Link
											href="/settings"
											className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-300"
											onClick={() =>
												setIsProfileOpen(false)
											}
										>
											<Settings className="h-4 w-4" />
											<span>Settings</span>
										</Link>
										<hr className="my-2 border-slate-200" />
										<button
											onClick={() => {
												setIsProfileOpen(false);
												signOut({ callbackUrl: "/" });
											}}
											className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300"
										>
											<LogOut className="h-4 w-4" />
											<span>Sign Out</span>
										</button>
									</div>
								)}
							</div>
						) : (
							// Sign In/Register buttons (when not authenticated)
							<>
								<Link
									href="/auth/login"
									className=" py-2.5 text-sm font-semibold text-slate-700 hover:text-purple-700 transition-colors duration-300 font-poppins"
								>
									Sign In
								</Link>
								<Link
									href="/auth/register"
									className=" py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 font-poppins"
								>
									Get Started
								</Link>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-300"
						>
							{isMenuOpen ? (
								<X className="block h-6 w-6" />
							) : (
								<Menu className="block h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Search Bar */}
				<div className="md:hidden pb-3">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-purple-400" />
						</div>
						<input
							type="text"
							placeholder="Search..."
							className="block w-full pl-10 pr-3 py-2 border border-purple-600/30 rounded-lg leading-5 bg-slate-800/50 backdrop-blur-sm text-white placeholder-purple-300/70 focus:outline-none focus:placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
						/>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-slate-900 to-purple-900 border-t border-purple-800/30">
						{navigationItems.map((item) => {
							const IconComponent = item.icon;
							return (
								<Link
									key={item.name}
									href={item.href}
									className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-purple-200 hover:text-white hover:bg-purple-800/50 transition-all duration-300"
									onClick={() => setIsMenuOpen(false)}
								>
									<IconComponent className="h-5 w-5" />
									<span>{item.name}</span>
								</Link>
							);
						})}
						<div className="border-t border-purple-800/30 pt-3 mt-3">
							{session ? (
								// Profile section for mobile (when authenticated)
								<>
									<div className="flex items-center space-x-3 px-3 py-2 text-purple-200">
										<div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
											{session.user?.name
												?.charAt(0)
												.toUpperCase() ||
												session.user?.email
													?.charAt(0)
													.toUpperCase() ||
												"U"}
										</div>
										<span className="font-medium">
											{session.user?.name ||
												session.user?.email}
										</span>
									</div>
									<Link
										href="/profile"
										className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-purple-200 hover:text-white hover:bg-purple-800/50 transition-all duration-300"
										onClick={() => setIsMenuOpen(false)}
									>
										<User className="h-5 w-5" />
										<span>Profile</span>
									</Link>
									<Link
										href="/settings"
										className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-purple-200 hover:text-white hover:bg-purple-800/50 transition-all duration-300"
										onClick={() => setIsMenuOpen(false)}
									>
										<Settings className="h-5 w-5" />
										<span>Settings</span>
									</Link>
									<button
										onClick={() => {
											setIsMenuOpen(false);
											signOut({ callbackUrl: "/" });
										}}
										className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300"
									>
										<LogOut className="h-5 w-5" />
										<span>Sign Out</span>
									</button>
								</>
							) : (
								// Sign In/Register for mobile (when not authenticated)
								<>
									<Link
										href="/auth/login"
										className="block px-3 py-2 rounded-md text-base font-medium text-purple-200 hover:text-white hover:bg-purple-800/50 transition-all duration-300"
										onClick={() => setIsMenuOpen(false)}
									>
										Sign In
									</Link>
									<Link
										href="/auth/register"
										className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-2 transition-all duration-300"
										onClick={() => setIsMenuOpen(false)}
									>
										Sign Up
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
