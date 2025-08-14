"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	ArrowRight,
	CheckCircle,
	AlertCircle,
	Loader2,
	User,
	Shield,
	Building,
	Users,
} from "lucide-react";

const LoginForm = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [userType, setUserType] = useState("user");
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	useEffect(() => {
		const type = searchParams.get("type") || "user";
		setUserType(type);
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			// Redirect to appropriate dashboard based on user type
			switch (userType) {
				case "admin":
					router.push("/dashboard/admin");
					break;
				case "business":
					router.push("/dashboard/business");
					break;
				case "moderator":
					router.push("/dashboard/moderator");
					break;
				default:
					router.push("/dashboard/user");
			}
		}, 2000);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const getUserTypeInfo = () => {
		switch (userType) {
			case "admin":
				return {
					icon: Shield,
					title: "Admin Login",
					color: "text-red-500",
				};
			case "business":
				return {
					icon: Building,
					title: "Business Login",
					color: "text-green-500",
				};
			case "moderator":
				return {
					icon: Users,
					title: "Moderator Login",
					color: "text-purple-500",
				};
			default:
				return {
					icon: User,
					title: "User Login",
					color: "text-blue-500",
				};
		}
	};

	const userTypeInfo = getUserTypeInfo();
	const IconComponent = userTypeInfo.icon;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div className="flex justify-center mb-8">
						<div className="relative group">
							<Image
								src="/logo.png"
								alt="NOTUN THIKANA Logo"
								width={120}
								height={120}
								className="transition-all duration-500 group-hover:scale-110 drop-shadow-2xl"
							/>
							<div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl"></div>
						</div>
					</div>
					<div className="flex items-center justify-center space-x-3 mb-4">
						<div
							className={`p-3 rounded-xl bg-slate-100 ${userTypeInfo.color}`}
						>
							<IconComponent className="h-6 w-6" />
						</div>
						<h2 className="text-4xl font-playfair font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">
							{userTypeInfo.title}
						</h2>
					</div>
					<p className="text-lg text-slate-600">
						Sign in to access your{" "}
						<span className="font-semibold text-purple-600">
							RENTO
						</span>{" "}
						dashboard
					</p>
				</div>

				{/* Login Form */}
				<div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-slate-700 mb-2"
							>
								Email Address
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={formData.email}
									onChange={handleInputChange}
									className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
									placeholder="Enter your email"
								/>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-slate-700 mb-2"
							>
								Password
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" />
								</div>
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									autoComplete="current-password"
									required
									value={formData.password}
									onChange={handleInputChange}
									className="block w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
									placeholder="Enter your password"
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-300" />
									) : (
										<Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-300" />
									)}
								</button>
							</div>
						</div>

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="rememberMe"
									name="rememberMe"
									type="checkbox"
									checked={formData.rememberMe}
									onChange={handleInputChange}
									className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300 rounded transition-colors duration-300"
								/>
								<label
									htmlFor="rememberMe"
									className="ml-2 block text-sm text-slate-700"
								>
									Remember me
								</label>
							</div>
							<Link
								href="/forgot-password"
								className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
							>
								Forgot password?
							</Link>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
						>
							{isLoading ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<>
									<span className="font-poppins font-semibold">
										Sign In
									</span>
									<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
								</>
							)}
						</button>
					</form>

					{/* Divider */}
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-slate-200" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-slate-500">
									Or continue with
								</span>
							</div>
						</div>
					</div>

					{/* Social Login */}
					<div className="mt-6">
						<button
							type="button"
							onClick={() => signIn("google")}
							className="w-full inline-flex justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-300 hover:shadow-md"
						>
							<svg className="h-5 w-5" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span className="ml-2">Sign in with Google</span>
						</button>
					</div>
				</div>

				{/* Sign Up Link */}
				<div className="text-center">
					<p className="text-sm text-slate-600">
						Don't have an account?{" "}
						<Link
							href="/auth/register"
							className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-300"
						>
							Sign up for free
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

const LoginPage = () => {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
						<p className="text-slate-600">Loading...</p>
					</div>
				</div>
			}
		>
			<LoginForm />
		</Suspense>
	);
};

export default LoginPage;
