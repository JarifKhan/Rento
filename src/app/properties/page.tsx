'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, Star, ArrowRight } from 'lucide-react';

const PropertiesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Type describing a property card on this page
  interface Property {
    id: number;
    title: string;
    location: string;
    price: string; // numeric as string, e.g. "25,000"
    type: 'apartment' | 'house' | 'studio' | 'penthouse' | string;
    bedrooms: number;
    bathrooms: number;
    area: number; // in sqft
    rating: number;
    reviews: number;
    image: string;
    features: string[];
    isAvailable: boolean;
  }

  // const properties = [
  //   {
  //     id: 1,
  //     title: 'Modern 2BHK Apartment',
  //     location: 'Gulshan, Dhaka',
  //     price: '25,000',
  //     type: 'apartment',
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     area: 1200,
  //     rating: 4.8,
  //     reviews: 24,
  //     image: '/api/placeholder/400/300',
  //     features: ['Furnished', 'Parking', 'Security', 'Gym'],
  //     isAvailable: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Luxury 3BHK Penthouse',
  //     location: 'Banani, Dhaka',
  //     price: '45,000',
  //     type: 'penthouse',
  //     bedrooms: 3,
  //     bathrooms: 3,
  //     area: 2000,
  //     rating: 4.9,
  //     reviews: 18,
  //     image: '/api/placeholder/400/300',
  //     features: ['Furnished', 'Rooftop', 'Parking', 'Pool'],
  //     isAvailable: true
  //   },
  //   {
  //     id: 3,
  //     title: 'Cozy 1BHK Studio',
  //     location: 'Dhanmondi, Dhaka',
  //     price: '18,000',
  //     type: 'studio',
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     area: 800,
  //     rating: 4.6,
  //     reviews: 32,
  //     image: '/api/placeholder/400/300',
  //     features: ['Furnished', 'Balcony', 'Security'],
  //     isAvailable: true
  //   }
  // ];

  // TODO: replace with real data source
  const properties: Property[] = []

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'studio', label: 'Studio' },
    { value: 'penthouse', label: 'Penthouse' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-20000', label: '৳0 - ৳20,000' },
    { value: '20000-35000', label: '৳20,000 - ৳35,000' },
    { value: '35000-50000', label: '৳35,000 - ৳50,000' },
    { value: '50000+', label: '৳50,000+' }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = parseInt(property.price.replace(',', ''));
      if (priceRange === '0-20000') matchesPrice = price <= 20000;
      else if (priceRange === '20000-35000') matchesPrice = price > 20000 && price <= 35000;
      else if (priceRange === '35000-50000') matchesPrice = price > 35000 && price <= 50000;
      else if (priceRange === '50000+') matchesPrice = price > 50000;
    }
    
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Find Your Perfect Home
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Discover amazing properties in prime locations across Dhaka
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-white/20 p-6 backdrop-blur-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
            </div>

            {/* Property Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            {/* Price Range */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>

            {/* Filter Button */}
            <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium">
              <Filter className="h-5 w-5" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {filteredProperties.length} Properties Found
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200/50 hover:border-purple-200 overflow-hidden"
            >
              {/* Property Image */}
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Available
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300">
                    <Heart className="h-5 w-5 text-slate-600 hover:text-red-500" />
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{property.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-600">{property.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-slate-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Square className="h-4 w-4" />
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-800">৳{property.price}</span>
                    <span className="text-slate-600 text-sm">/month</span>
                  </div>
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
