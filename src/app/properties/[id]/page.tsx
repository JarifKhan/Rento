"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
	ArrowLeft,
	MapPin,
	Bed,
	Bath,
	Square,
	Heart,
	Star,
	Phone,
	Mail,
	Share2,
	Calendar,
	Shield,
	Wifi,
	Car,
	Dumbbell,
	Camera,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

interface Property {
	_id: string;
	id: number;
	title: string;
	location: string;
	price: string;
	type: string;
	bedrooms: number;
	bathrooms: number;
	area: number;
	features: string[];
	rating?: number;
	reviews?: number;
	image?: string;
	isAvailable?: boolean;
	created_at: string;
	description?: string;
	images?: string[];
}

const PropertyDetailsPage = () => {
	const params = useParams();
	const router = useRouter();
	const [property, setProperty] = useState<Property | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);

	// Mock images for demonstration (you can replace with actual property images)
	const mockImages = [
		"/api/placeholder/800/600",
		"/api/placeholder/800/600",
		"/api/placeholder/800/600",
		"/api/placeholder/800/600",
	];

	useEffect(() => {
		if (params.id) {
			fetchProperty(params.id as string);
		}
	}, [params.id]);

	const fetchProperty = async (id: string) => {
		try {
			setLoading(true);
			const response = await fetch(`/api/properties/${id}`);
			const data = await response.json();

			if (data.ok) {
				setProperty(data.property);
				setError(null);
			} else {
				setError(data.error || "Property not found");
			}
		} catch (err) {
			setError("Failed to fetch property details");
		} finally {
			setLoading(false);
		}
	};

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % mockImages.length);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prev) => (prev - 1 + mockImages.length) % mockImages.length
		);
	};

	const getFeatureIcon = (feature: string) => {
		const iconMap: { [key: string]: any } = {
			wifi: Wifi,
			parking: Car,
			gym: Dumbbell,
			security: Shield,
			furnished: Camera,
		};

		const IconComponent = iconMap[feature.toLowerCase()] || Shield;
		return <IconComponent className="h-5 w-5" />;
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/30 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
					<p className="text-lg text-slate-500">
						Loading property details...
					</p>
				</div>
			</div>
		);
	}

	if (error || !property) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/30 flex items-center justify-center">
				<div className="text-center">
					<p className="text-lg text-red-500 mb-4">
						{error || "Property not found"}
					</p>
					<button
						onClick={() => router.push("/properties")}
						className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
					>
						Back to Properties
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/30">
			{/* Header */}
			<div className="bg-white shadow-sm sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<button
							onClick={() => router.push("/properties")}
							className="flex items-center space-x-2 text-slate-600 hover:text-purple-600 transition-colors"
						>
							<ArrowLeft className="h-5 w-5" />
							<span>Back to Properties</span>
						</button>

						<div className="flex items-center space-x-4">
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className={`p-2 rounded-full transition-all duration-300 ${
									isFavorite
										? "bg-red-100 text-red-600"
										: "bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600"
								}`}
							>
								<Heart
									className={`h-5 w-5 ${
										isFavorite ? "fill-current" : ""
									}`}
								/>
							</button>
							<button className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-purple-100 hover:text-purple-600 transition-all duration-300">
								<Share2 className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Image Gallery */}
			<div className="relative h-96 md:h-[500px] bg-gradient-to-br from-purple-100 to-pink-100">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center text-slate-400">
						<Camera className="h-16 w-16 mx-auto mb-2" />
						<p>Property Image Gallery</p>
					</div>
				</div>

				{/* Navigation buttons */}
				<button
					onClick={prevImage}
					className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
				>
					<ChevronLeft className="h-6 w-6 text-slate-600" />
				</button>

				<button
					onClick={nextImage}
					className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
				>
					<ChevronRight className="h-6 w-6 text-slate-600" />
				</button>

				{/* Image indicators */}
				<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
					{mockImages.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentImageIndex(index)}
							className={`w-3 h-3 rounded-full transition-all duration-300 ${
								index === currentImageIndex
									? "bg-white"
									: "bg-white/50"
							}`}
						/>
					))}
				</div>

				{/* Availability badge */}
				<div className="absolute top-4 left-4">
					<span
						className={`px-4 py-2 rounded-full text-sm font-semibold ${
							property.isAvailable
								? "bg-green-100 text-green-700"
								: "bg-red-100 text-red-700"
						}`}
					>
						{property.isAvailable ? "Available" : "Not Available"}
					</span>
				</div>
			</div>

			{/* Property Details */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Basic Info */}
						<div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
							<div className="flex items-start justify-between mb-6">
								<div>
									<h1 className="text-3xl font-bold text-slate-800 mb-2">
										{property.title}
									</h1>
									<div className="flex items-center text-slate-600 mb-4">
										<MapPin className="h-5 w-5 mr-2" />
										<span className="text-lg">
											{property.location}
										</span>
									</div>
									<div className="flex items-center space-x-1">
										<Star className="h-5 w-5 text-yellow-400 fill-current" />
										<span className="font-semibold">
											{property.rating || 4.5}
										</span>
										<span className="text-slate-600">
											({property.reviews || 12} reviews)
										</span>
									</div>
								</div>
								<div className="text-right">
									<div className="text-3xl font-bold text-purple-600">
										৳{property.price}
									</div>
									<div className="text-slate-600">
										per month
									</div>
								</div>
							</div>

							{/* Property Stats */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-slate-200">
								<div className="text-center">
									<Bed className="h-8 w-8 mx-auto mb-2 text-purple-600" />
									<div className="font-semibold text-slate-800">
										{property.bedrooms}
									</div>
									<div className="text-sm text-slate-600">
										Bedrooms
									</div>
								</div>
								<div className="text-center">
									<Bath className="h-8 w-8 mx-auto mb-2 text-purple-600" />
									<div className="font-semibold text-slate-800">
										{property.bathrooms}
									</div>
									<div className="text-sm text-slate-600">
										Bathrooms
									</div>
								</div>
								<div className="text-center">
									<Square className="h-8 w-8 mx-auto mb-2 text-purple-600" />
									<div className="font-semibold text-slate-800">
										{property.area}
									</div>
									<div className="text-sm text-slate-600">
										Sq Ft
									</div>
								</div>
								<div className="text-center">
									<Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
									<div className="font-semibold text-slate-800">
										{property.type}
									</div>
									<div className="text-sm text-slate-600">
										Type
									</div>
								</div>
							</div>
						</div>

						{/* Description */}
						<div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
							<h2 className="text-2xl font-bold text-slate-800 mb-4">
								Description
							</h2>
							<p className="text-slate-600 leading-relaxed">
								{property.description ||
									`This beautiful ${property.type} in ${property.location} offers modern living with ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms. Located in a prime area with excellent connectivity and amenities. Perfect for families looking for a comfortable and stylish home.`}
							</p>
						</div>

						{/* Features & Amenities */}
						<div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
							<h2 className="text-2xl font-bold text-slate-800 mb-6">
								Features & Amenities
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{property.features.map((feature, index) => (
									<div
										key={index}
										className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg"
									>
										{getFeatureIcon(feature)}
										<span className="text-slate-700 font-medium">
											{feature}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Contact Card */}
						<div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6 sticky top-24">
							<h3 className="text-xl font-bold text-slate-800 mb-6">
								Contact Property Owner
							</h3>

							<div className="space-y-4 mb-6">
								<button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium">
									<Phone className="h-5 w-5" />
									<span>Call Now</span>
								</button>

								<button className="w-full flex items-center justify-center space-x-2 border-2 border-purple-600 text-purple-600 py-3 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium">
									<Mail className="h-5 w-5" />
									<span>Send Message</span>
								</button>
							</div>

							<div className="border-t border-slate-200 pt-6">
								<h4 className="font-semibold text-slate-800 mb-4">
									Schedule a Visit
								</h4>
								<div className="space-y-3">
									<input
										type="date"
										className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
									/>
									<select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300">
										<option>Select Time</option>
										<option>9:00 AM - 10:00 AM</option>
										<option>10:00 AM - 11:00 AM</option>
										<option>2:00 PM - 3:00 PM</option>
										<option>3:00 PM - 4:00 PM</option>
									</select>
									<button className="w-full bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-900 transition-all duration-300 font-medium">
										Book Visit
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetailsPage;
