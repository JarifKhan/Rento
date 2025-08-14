"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Edit3,
	Save,
	X,
	Camera,
	Home,
	Heart,
	Eye,
	Settings,
	Bell,
	Shield,
	CreditCard,
	History,
	Star,
	MessageSquare,
	Building,
	Users,
	Award,
	Activity,
} from "lucide-react";

interface UserProfile {
	id: string;
	name: string;
	email: string;
	phone?: string;
	location?: string;
	bio?: string;
	avatar?: string;
	joinDate: string;
	lastActive: string;
	verified: boolean;
	preferences: {
		notifications: boolean;
		emailUpdates: boolean;
		publicProfile: boolean;
	};
	stats: {
		propertiesViewed: number;
		favorites: number;
		reviews: number;
		rating: number;
	};
}

const ProfilePage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);
	const [activeTab, setActiveTab] = useState("overview");
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>(
		{}
	);

	// Redirect if not authenticated
	useEffect(() => {
		if (status === "loading") return;
		if (!session) {
			router.push("/auth/login");
		}
	}, [session, status, router]);

	// Initialize profile data
	useEffect(() => {
		if (session?.user) {
			const mockProfile: UserProfile = {
				id: "1",
				name: session.user.name || "Unknown User",
				email: session.user.email || "",
				phone: "+1 (555) 123-4567",
				location: "New York, NY",
				bio: "Real estate enthusiast looking for the perfect home. Love exploring new neighborhoods and finding hidden gems.",
				avatar: session.user.image || "",
				joinDate: "2024-01-15",
				lastActive: new Date().toISOString(),
				verified: true,
				preferences: {
					notifications: true,
					emailUpdates: true,
					publicProfile: true,
				},
				stats: {
					propertiesViewed: 45,
					favorites: 12,
					reviews: 8,
					rating: 4.8,
				},
			};
			setProfile(mockProfile);
			setEditedProfile(mockProfile);
		}
	}, [session]);

	const handleSave = () => {
		if (profile && editedProfile) {
			setProfile({ ...profile, ...editedProfile });
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setEditedProfile(profile || {});
		setIsEditing(false);
	};

	const handleInputChange = (field: string, value: any) => {
		setEditedProfile((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const tabs = [
		{ id: "overview", label: "Overview", icon: User },
		{ id: "properties", label: "My Properties", icon: Building },
		{ id: "favorites", label: "Favorites", icon: Heart },
		{ id: "reviews", label: "Reviews", icon: Star },
		{ id: "settings", label: "Settings", icon: Settings },
	];

	if (status === "loading") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
					<p className="text-slate-600">Loading profile...</p>
				</div>
			</div>
		);
	}

	if (!session || !profile) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Profile Header */}
				<div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden mb-8">
					{/* Cover Photo */}
					<div className="h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative">
						<div className="absolute inset-0 bg-black/20"></div>
						<button
							title="Change cover photo"
							aria-label="Change cover photo"
							className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
						>
							<Camera className="h-5 w-5 text-white" />
						</button>
					</div>

					{/* Profile Info */}
					<div className="relative px-8 pb-8">
						{/* Avatar */}
						<div className="absolute -top-16 left-8">
							<div className="relative">
								<div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-xl">
									{profile.avatar ? (
										<Image
											src={profile.avatar}
											alt={profile.name}
											width={128}
											height={128}
											className="w-full h-full object-cover rounded-full"
										/>
									) : (
										profile.name.charAt(0).toUpperCase()
									)}
								</div>
								<button
									title="Change profile picture"
									aria-label="Change profile picture"
									className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-300"
								>
									<Camera className="h-4 w-4 text-white" />
								</button>
							</div>
						</div>

						{/* Edit Button */}
						<div className="pt-20 flex justify-end">
							{!isEditing ? (
								<button
									onClick={() => setIsEditing(true)}
									className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300"
								>
									<Edit3 className="h-4 w-4" />
									<span>Edit Profile</span>
								</button>
							) : (
								<div className="flex space-x-2">
									<button
										onClick={handleSave}
										className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300"
									>
										<Save className="h-4 w-4" />
										<span>Save</span>
									</button>
									<button
										onClick={handleCancel}
										className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300"
									>
										<X className="h-4 w-4" />
										<span>Cancel</span>
									</button>
								</div>
							)}
						</div>

						{/* User Details */}
						<div className="mt-4">
							<div className="flex items-center space-x-3 mb-2">
								{isEditing ? (
									<input
										type="text"
										value={editedProfile.name || ""}
										onChange={(e) =>
											handleInputChange(
												"name",
												e.target.value
											)
										}
										placeholder="Enter your name"
										aria-label="Edit name"
										className="text-3xl font-bold text-slate-800 bg-transparent border-b-2 border-purple-300 focus:border-purple-600 outline-none"
									/>
								) : (
									<h1 className="text-3xl font-bold text-slate-800">
										{profile.name}
									</h1>
								)}
								{profile.verified && (
									<div className="flex items-center space-x-1 text-blue-600">
										<Shield className="h-5 w-5" />
										<span className="text-sm font-medium">
											Verified
										</span>
									</div>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
								{/* Contact Info */}
								<div className="space-y-3">
									<div className="flex items-center space-x-3 text-slate-600">
										<Mail className="h-5 w-5" />
										{isEditing ? (
											<input
												type="email"
												value={
													editedProfile.email || ""
												}
												onChange={(e) =>
													handleInputChange(
														"email",
														e.target.value
													)
												}
												placeholder="Enter your email"
												aria-label="Edit email address"
												className="flex-1 bg-transparent border-b border-slate-300 focus:border-purple-600 outline-none"
											/>
										) : (
											<span>{profile.email}</span>
										)}
									</div>

									<div className="flex items-center space-x-3 text-slate-600">
										<Phone className="h-5 w-5" />
										{isEditing ? (
											<input
												type="tel"
												value={
													editedProfile.phone || ""
												}
												onChange={(e) =>
													handleInputChange(
														"phone",
														e.target.value
													)
												}
												placeholder="Enter your phone number"
												aria-label="Edit phone number"
												className="flex-1 bg-transparent border-b border-slate-300 focus:border-purple-600 outline-none"
											/>
										) : (
											<span>
												{profile.phone ||
													"No phone number"}
											</span>
										)}
									</div>

									<div className="flex items-center space-x-3 text-slate-600">
										<MapPin className="h-5 w-5" />
										{isEditing ? (
											<input
												type="text"
												value={
													editedProfile.location || ""
												}
												onChange={(e) =>
													handleInputChange(
														"location",
														e.target.value
													)
												}
												placeholder="Enter your location"
												aria-label="Edit location"
												className="flex-1 bg-transparent border-b border-slate-300 focus:border-purple-600 outline-none"
											/>
										) : (
											<span>
												{profile.location ||
													"No location set"}
											</span>
										)}
									</div>
								</div>

								{/* Stats */}
								<div className="grid grid-cols-2 gap-4">
									<div className="text-center p-4 bg-purple-50 rounded-xl">
										<div className="text-2xl font-bold text-purple-600">
											{profile.stats.propertiesViewed}
										</div>
										<div className="text-sm text-slate-600">
											Properties Viewed
										</div>
									</div>
									<div className="text-center p-4 bg-pink-50 rounded-xl">
										<div className="text-2xl font-bold text-pink-600">
											{profile.stats.favorites}
										</div>
										<div className="text-sm text-slate-600">
											Favorites
										</div>
									</div>
									<div className="text-center p-4 bg-blue-50 rounded-xl">
										<div className="text-2xl font-bold text-blue-600">
											{profile.stats.reviews}
										</div>
										<div className="text-sm text-slate-600">
											Reviews
										</div>
									</div>
									<div className="text-center p-4 bg-yellow-50 rounded-xl">
										<div className="flex items-center justify-center space-x-1">
											<Star className="h-4 w-4 text-yellow-500 fill-current" />
											<span className="text-2xl font-bold text-yellow-600">
												{profile.stats.rating}
											</span>
										</div>
										<div className="text-sm text-slate-600">
											Rating
										</div>
									</div>
								</div>

								{/* Bio */}
								<div>
									<h3 className="text-sm font-medium text-slate-700 mb-2">
										About
									</h3>
									{isEditing ? (
										<textarea
											value={editedProfile.bio || ""}
											onChange={(e) =>
												handleInputChange(
													"bio",
													e.target.value
												)
											}
											rows={4}
											className="w-full p-3 border border-slate-300 rounded-xl focus:border-purple-600 outline-none resize-none"
											placeholder="Tell us about yourself..."
										/>
									) : (
										<p className="text-slate-600 text-sm leading-relaxed">
											{profile.bio || "No bio available."}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
					{/* Tab Navigation */}
					<div className="border-b border-slate-200">
						<nav className="flex space-x-8 px-8 py-4">
							{tabs.map((tab) => {
								const IconComponent = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
											activeTab === tab.id
												? "bg-purple-100 text-purple-700"
												: "text-slate-600 hover:text-purple-600 hover:bg-purple-50"
										}`}
									>
										<IconComponent className="h-4 w-4" />
										<span className="font-medium">
											{tab.label}
										</span>
									</button>
								);
							})}
						</nav>
					</div>

					{/* Tab Content */}
					<div className="p-8">
						{activeTab === "overview" && (
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Recent Activity */}
									<div className="bg-slate-50 rounded-xl p-6">
										<h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
											<Activity className="h-5 w-5 mr-2 text-purple-600" />
											Recent Activity
										</h3>
										<div className="space-y-3">
											{[
												{
													action: "Viewed",
													item: "Modern Apartment in Downtown",
													time: "2 hours ago",
												},
												{
													action: "Favorited",
													item: "Cozy Studio Near Central Park",
													time: "1 day ago",
												},
												{
													action: "Reviewed",
													item: "Luxury Penthouse Suite",
													time: "3 days ago",
												},
											].map((activity, index) => (
												<div
													key={index}
													className="flex items-center justify-between py-2 border-b border-slate-200 last:border-b-0"
												>
													<div>
														<span className="text-sm text-slate-600">
															{activity.action}
														</span>
														<span className="text-sm font-medium text-slate-800 ml-1">
															{activity.item}
														</span>
													</div>
													<span className="text-xs text-slate-500">
														{activity.time}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Quick Actions */}
									<div className="bg-slate-50 rounded-xl p-6">
										<h3 className="text-lg font-semibold text-slate-800 mb-4">
											Quick Actions
										</h3>
										<div className="grid grid-cols-2 gap-3">
											<button className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors duration-300">
												<Eye className="h-4 w-4 text-purple-600" />
												<span className="text-sm">
													View Properties
												</span>
											</button>
											<button className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors duration-300">
												<Heart className="h-4 w-4 text-pink-600" />
												<span className="text-sm">
													My Favorites
												</span>
											</button>
											<button className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors duration-300">
												<MessageSquare className="h-4 w-4 text-blue-600" />
												<span className="text-sm">
													Messages
												</span>
											</button>
											<button className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors duration-300">
												<Settings className="h-4 w-4 text-gray-600" />
												<span className="text-sm">
													Settings
												</span>
											</button>
										</div>
									</div>
								</div>

								{/* Account Info */}
								<div className="bg-slate-50 rounded-xl p-6">
									<h3 className="text-lg font-semibold text-slate-800 mb-4">
										Account Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
										<div>
											<span className="text-slate-600">
												Member Since:
											</span>
											<div className="font-medium text-slate-800">
												{new Date(
													profile.joinDate
												).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</div>
										</div>
										<div>
											<span className="text-slate-600">
												Last Active:
											</span>
											<div className="font-medium text-slate-800">
												{new Date(
													profile.lastActive
												).toLocaleDateString("en-US", {
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</div>
										</div>
										<div>
											<span className="text-slate-600">
												Account Status:
											</span>
											<div className="flex items-center space-x-2">
												<span className="w-2 h-2 bg-green-500 rounded-full"></span>
												<span className="font-medium text-green-600">
													Active
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{activeTab === "properties" && (
							<div className="text-center py-12">
								<Building className="h-16 w-16 text-slate-300 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-slate-600 mb-2">
									No Properties Yet
								</h3>
								<p className="text-slate-500 mb-6">
									You haven't listed any properties yet.
								</p>
								<button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300">
									List Your Property
								</button>
							</div>
						)}

						{activeTab === "favorites" && (
							<div className="text-center py-12">
								<Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-slate-600 mb-2">
									No Favorites Yet
								</h3>
								<p className="text-slate-500 mb-6">
									Start exploring properties to add them to
									your favorites.
								</p>
								<button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300">
									Browse Properties
								</button>
							</div>
						)}

						{activeTab === "reviews" && (
							<div className="text-center py-12">
								<Star className="h-16 w-16 text-slate-300 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-slate-600 mb-2">
									No Reviews Yet
								</h3>
								<p className="text-slate-500 mb-6">
									Your reviews of properties will appear here.
								</p>
							</div>
						)}

						{activeTab === "settings" && (
							<div className="space-y-6">
								<div className="bg-slate-50 rounded-xl p-6">
									<h3 className="text-lg font-semibold text-slate-800 mb-4">
										Preferences
									</h3>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium text-slate-800">
													Email Notifications
												</h4>
												<p className="text-sm text-slate-600">
													Receive updates about new
													properties
												</p>
											</div>
											<input
												type="checkbox"
												className="toggle"
												defaultChecked={
													profile.preferences
														.notifications
												}
											/>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium text-slate-800">
													Email Updates
												</h4>
												<p className="text-sm text-slate-600">
													Weekly property
													recommendations
												</p>
											</div>
											<input
												type="checkbox"
												className="toggle"
												defaultChecked={
													profile.preferences
														.emailUpdates
												}
											/>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium text-slate-800">
													Public Profile
												</h4>
												<p className="text-sm text-slate-600">
													Make your profile visible to
													others
												</p>
											</div>
											<input
												type="checkbox"
												className="toggle"
												defaultChecked={
													profile.preferences
														.publicProfile
												}
											/>
										</div>
									</div>
								</div>

								<div className="bg-slate-50 rounded-xl p-6">
									<h3 className="text-lg font-semibold text-slate-800 mb-4">
										Account Actions
									</h3>
									<div className="space-y-3">
										<button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300">
											<div className="flex items-center space-x-3">
												<CreditCard className="h-5 w-5 text-purple-600" />
												<span>Payment Methods</span>
											</div>
										</button>
										<button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300">
											<div className="flex items-center space-x-3">
												<History className="h-5 w-5 text-blue-600" />
												<span>View History</span>
											</div>
										</button>
										<button className="w-full text-left p-3 bg-white rounded-lg hover:bg-red-50 transition-colors duration-300 text-red-600">
											<div className="flex items-center space-x-3">
												<X className="h-5 w-5" />
												<span>Delete Account</span>
											</div>
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
