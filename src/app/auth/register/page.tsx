"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";

// Add this function above RegisterPage
async function createUserProfile(profileData: { name: string; email: string }) {
	const res = await fetch("/api/profile", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(profileData),
	});
	return await res.json();
}

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		// Simulate API call
		setTimeout(async () => {
			setIsLoading(false);
			// Create user profile in MongoDB
			await createUserProfile({
				name: formData.name,
				email: formData.email,
			});
			// Redirect or show success message here
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full space-y-8">
				<div className="text-center">
					<h2 className="text-4xl font-playfair font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-2">
						Create an Account
					</h2>
					<p className="text-lg text-slate-600">
						Join{" "}
						<span className="font-semibold text-purple-600">
							NOTUN THIKANA
						</span>{" "}
						today
					</p>
				</div>
				<div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
					{/* Social Login */}
					<div className="mb-6">
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
							<span className="ml-2">Sign up with Google</span>
						</button>
					</div>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-slate-700 mb-2"
							>
								Name
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" />
								</div>
								<input
									id="name"
									name="name"
									type="text"
									required
									value={formData.name}
									onChange={handleInputChange}
									className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
									placeholder="Enter your name"
								/>
							</div>
						</div>
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
									required
									value={formData.email}
									onChange={handleInputChange}
									className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
									placeholder="Enter your email"
								/>
							</div>
						</div>
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
									type="password"
									required
									value={formData.password}
									onChange={handleInputChange}
									className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
									placeholder="Create a password"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-slate-700 mb-2"
							>
								Confirm Password
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" />
								</div>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									required
									value={formData.confirmPassword}
									onChange={handleInputChange}
									className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
									placeholder="Confirm your password"
								/>
							</div>
						</div>
						{error && (
							<div className="text-red-500 text-sm">{error}</div>
						)}
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
										Sign Up
									</span>
									<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
								</>
							)}
						</button>
					</form>
				</div>
				<div className="text-center">
					<p className="text-sm text-slate-600">
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-300"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
