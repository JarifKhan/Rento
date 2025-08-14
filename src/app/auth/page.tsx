"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	User,
	Phone,
	ArrowRight,
	CheckCircle,
	AlertCircle,
	Loader2,
} from "lucide-react";

const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		role: "normal",
		agreeToTerms: false,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			// Handle registration logic here
		}, 2000);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div className="flex justify-center mb-6"></div>
					<h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">
						Join RENTO
					</h2>
					<p className="mt-2 text-sm text-slate-600">
						Create your account and start your lifestyle journey
					</p>
					<p className="text-xs text-slate-500 mt-1">
						by{" "}
						<span className="font-medium text-purple-600">
							dot PY Nexa
						</span>
					</p>
				</div>

				{/* Registration Form */}
				<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Name Field */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-slate-700 mb-2"
							>
								Full Name
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" />
								</div>
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									value={formData.name}
									onChange={handleInputChange}
									className="input-professional pl-10"
									placeholder="Enter your full name"
								/>
							</div>
						</div>

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
									className="input-professional pl-10"
									placeholder="Enter your email"
								/>
							</div>
						</div>

						{/* Phone Field */}
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-slate-700 mb-2"
							>
								Phone Number
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Phone className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" />
								</div>
								<input
									id="phone"
									name="phone"
									type="tel"
									autoComplete="tel"
									value={formData.phone}
									onChange={handleInputChange}
									className="input-professional pl-10"
									placeholder="Enter your phone number"
								/>
							</div>
						</div>

						{/* Role Selection */}
						<div>
							<label
								htmlFor="role"
								className="block text-sm font-medium text-slate-700 mb-2"
							>
								Account Type
							</label>
							<select
								id="role"
								name="role"
								value={formData.role}
								onChange={handleInputChange}
								className="input-professional"
							>
								<option value="normal">Normal User</option>
								<option value="owner">
									Service/Property Owner
								</option>
							</select>
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
									autoComplete="new-password"
									required
									value={formData.password}
									onChange={handleInputChange}
									className="input-professional pl-10 pr-12"
									placeholder="Create a password"
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

						{/* Confirm Password Field */}
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
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									autoComplete="new-password"
									required
									value={formData.confirmPassword}
									onChange={handleInputChange}
									className="input-professional pl-10 pr-12"
									placeholder="Confirm your password"
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
								>
									{showConfirmPassword ? (
										<EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-300" />
									) : (
										<Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors duration-300" />
									)}
								</button>
							</div>
						</div>

						{/* Terms Agreement */}
						<div className="flex items-start">
							<input
								id="agreeToTerms"
								name="agreeToTerms"
								type="checkbox"
								checked={formData.agreeToTerms}
								onChange={handleInputChange}
								required
								className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300 rounded mt-1 transition-colors duration-300"
							/>
							<label
								htmlFor="agreeToTerms"
								className="ml-3 block text-sm text-slate-700"
							>
								I agree to the{" "}
								<Link
									href="/terms"
									className="text-purple-600 hover:text-purple-700 font-medium"
								>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="/privacy"
									className="text-purple-600 hover:text-purple-700 font-medium"
								>
									Privacy Policy
								</Link>
							</label>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading || !formData.agreeToTerms}
							className="btn-primary w-full group relative flex justify-center py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<>
									<span className="font-poppins font-semibold">
										Create Account
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
									Or register with
								</span>
							</div>
						</div>
					</div>

					{/* Social Registration */}
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
							<span className="ml-2">Sign up with Google</span>
						</button>
					</div>
				</div>

				{/* Sign In Link */}
				<div className="text-center">
					<p className="text-sm text-slate-600">
						Already have an account?{" "}
						<Link
							href="/login"
							className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-300"
						>
							Sign in here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
