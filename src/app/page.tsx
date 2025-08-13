import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Home,
  Store,
  Users,
  Calendar,
  Trophy,
  Search,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const serviceCategories = [
    {
      name: 'Grocery Shops',
      icon: Store,
      count: '150+',
      description: 'Fresh produce & daily essentials',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50',
      iconColor: 'text-emerald-600'
    },
    {
      name: 'Restaurants',
      icon: Store,
      count: '200+',
      description: 'Delicious food & dining',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50 to-amber-50',
      iconColor: 'text-orange-600'
    },
    {
      name: 'Hospitals',
      icon: Store,
      count: '50+',
      description: 'Healthcare & medical services',
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-50 to-rose-50',
      iconColor: 'text-red-600'
    },
    {
      name: 'Pharmacies',
      icon: Store,
      count: '60+',
      description: '24/7 medicine & prescriptions',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50',
      iconColor: 'text-cyan-600'
    },
    {
      name: 'Salons',
      icon: Store,
      count: '80+',
      description: 'Beauty & personal care',
      color: 'from-teal-500 to-green-500',
      bgColor: 'from-teal-50 to-green-50',
      iconColor: 'text-teal-600'
    },
    {
      name: 'Mosques',
      icon: Store,
      count: '120+',
      description: 'Prayer & spiritual guidance',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600'
    },
    {
      name: 'Workshops',
      icon: Store,
      count: '90+',
      description: 'Repair & maintenance services',
      color: 'from-slate-500 to-gray-500',
      bgColor: 'from-slate-50 to-gray-50',
      iconColor: 'text-slate-600'
    },
  ];

  const featuredProperties = [
    {
      id: 1,
      title: "Modern 3BR Apartment in Dhanmondi",
      price: "৳25,000",
      period: "monthly",
      location: "Dhanmondi, Dhaka",
      rating: 4.8,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Cozy 2BR House in Uttara",
      price: "৳18,000",
      period: "monthly",
      location: "Uttara, Dhaka",
      rating: 4.6,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Luxury Villa in Gulshan",
      price: "৳45,000",
      period: "monthly",
      location: "Gulshan, Dhaka",
      rating: 4.9,
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 via-purple-900 to-amber-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h100v100H0z' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
          <div className="text-center">
            {/* Logo and Main Heading */}
            <div className="mb-8 space-y-6">

              <div className="inline-block">
                <span className="text-lg font-medium text-purple-300 tracking-wider uppercase mb-4 block">
                  Welcome to the Future of Lifestyle Management
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold leading-tight">
                  <span className="block text-white mb-2"></span>
                  <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                    RENTO
                  </span>
                </h1>
              </div>

            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-slate-200 max-w-4xl mx-auto leading-relaxed font-light">
              Your complete lifestyle ecosystem. Discover nearby services, find perfect homes,
              build meaningful connections, and transform your daily life experience.
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2 group-focus-within:bg-white/20 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="pl-4 flex items-center pointer-events-none">
                      <Search className="h-6 w-6 text-purple-300 group-focus-within:text-white transition-colors duration-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for services, properties, or locations..."
                      className="flex-1 px-4 py-4 text-lg bg-transparent text-white placeholder-purple-200/70 focus:outline-none focus:placeholder-white/50 transition-all duration-300 font-medium"
                    />
                    <button className="mr-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/properties"
                className="group relative bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 font-poppins">Find Properties</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-white group-hover:to-white transition-all duration-500"></div>
              </Link>
              <Link
                href="/services"
                className="group relative bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 font-poppins">Browse Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              <Link
                href="/login"
                className="group relative bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-500 transform hover:scale-105 backdrop-blur-lg shadow-xl hover:shadow-2xl"
              >
                <span className="relative z-10 font-poppins">Get Full Access</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-purple-200 font-medium">Services Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-purple-200 font-medium">Properties Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-purple-200 font-medium">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-purple-200 font-medium">Areas Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium text-sm uppercase tracking-wider mb-2 block">
              Discover Services
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-secondary mb-6">
              Find Local Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover nearby services to make your life easier. From daily essentials to specialized care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={index}
                  href={`/services?category=${category.name.toLowerCase().replace(' ', '_')}`}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-slate-100 hover:border-purple-200 overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="relative p-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-poppins font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3 group-hover:text-slate-600 transition-colors duration-300">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`text-2xl font-bold ${category.iconColor}`}>
                          {category.count}
                        </span>
                        <span className="text-sm text-slate-500">available</span>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="font-poppins">Explore All Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-lg text-gray-600">Find your perfect home or investment property</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    For Rent
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{property.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                      <span className="text-gray-500">/{property.period}</span>
                    </div>
                    <Link
                      href={`/properties/${property.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>View All Properties</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RENTO?</h2>
            <p className="text-lg text-gray-600">Everything you need for modern living in one platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location-Based</h3>
              <p className="text-gray-600">Find services and properties near your location with precise mapping</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">Connect with neighbors, make friends, and build your local community</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Reviews</h3>
              <p className="text-gray-600">Make informed decisions with authentic reviews from real users</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Available</h3>
              <p className="text-gray-600">Access services and information anytime, anywhere you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who are already making their lives easier with RENTO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    RENTO
                  </h3>
                  <p className="text-sm text-purple-300/80">by dot PY Nexa</p>
                </div>
              </div>
              <p className="text-purple-200/80 text-sm">
                Making daily life easier through technology and community connection.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-200">Services</h4>
              <ul className="space-y-2 text-sm text-purple-300/80">
                <li><Link href="/properties" className="hover:text-white transition-colors duration-300">Property Rental</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors duration-300">Local Services</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors duration-300">Community</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors duration-300">Events</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-200">Support</h4>
              <ul className="space-y-2 text-sm text-purple-300/80">
                <li><Link href="/help" className="hover:text-white transition-colors duration-300">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-200">Contact</h4>
              <div className="space-y-2 text-sm text-purple-300/80">
                <div className="flex items-center space-x-2 hover:text-white transition-colors duration-300">
                  <Phone className="h-4 w-4" />
                  <span>+880 1234-567890</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-white transition-colors duration-300">
                  <Mail className="h-4 w-4" />
                  <span>info@notunthikana.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-800/30 mt-8 pt-8 text-center text-sm text-purple-300/80">
            <p>&copy; 2024 RENTO by dot PY Nexa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
