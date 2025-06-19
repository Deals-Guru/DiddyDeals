import React, { use, useEffect, useState } from 'react';
import { Star, Heart, Share2, Shield, Truck, RotateCcw, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchProductDetails } from '../api/apicalls';
import LoadingPage from './LoadingPage';

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('description');
  const [product, setProduct] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    const fetchDetails = async () => {
        try {
            const response = await fetchProductDetails(id);
            console.log(response);
            const product = {
              name: response.name,
              brand: "Sony",
            //   rating: 2,
            //   reviews: 2847,
              originalPrice: response.mrp,
              images: [
                response.imageUrl,
              ],
              highlights: [
                "Industry-leading noise canceling technology",
                "30-hour battery life with quick charge",
                "Crystal clear hands-free calling",
                "Lightweight and comfortable design"
              ],
              specifications: {
                "Driver Unit": "30mm",
                "Frequency Response": "4 Hz-40,000 Hz",
                "Battery Life": "Up to 30 hours",
                "Charging Time": "3 hours (Quick charge: 3 min for 3 hours)",
                "Weight": "250g",
                "Connectivity": "Bluetooth 5.2, NFC, 3.5mm jack"
              },
              deals: [
                {
                  platform: "Amazon",
                  price: response.price,
                  discount: response.off,
                  cashback: 1249,
                  logo: "🛒",
                  color: "bg-orange-500",
                  link: response.affiliateLink,
                  badge: "Best Seller"
                },
                {
                  platform: "Flipkart",
                  price: 25990,
                  discount: 13,
                  cashback: 1299,
                  logo: "🛍️",
                  color: "bg-blue-500",
                  link: "https://flipkart.com",
                  badge: "Big Billion Days"
                },
                {
                  platform: "Meesho",
                  price: 23990,
                  discount: 20,
                  cashback: 1199,
                  logo: "🏪",
                  color: "bg-pink-500",
                  link: "https://meesho.com",
                  badge: "Lowest Price"
                }
              ]
            };
            setProduct(product);
        } catch (error) {
            console.log(error);
            history.push('/');
        }
    }
    fetchDetails();
  }, [id]);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    product ? 
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-gray-600">
            Home / Electronics / Headphones / {product.name}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section - Full Screen Layout */}
        <div className="min-h-screen flex flex-col lg:flex-row gap-6">
          {/* Left Side - Product Images (35-45% width) */}
          <div className="w-full lg:w-2/5 space-y-4 lg:sticky lg:top-8 lg:h-fit">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-80 lg:h-96 object-contain p-4"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info & Deals (55-65% width) */}
          <div className="w-full lg:w-3/5 space-y-6">
            {/* Product Basic Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              {product.rating && <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{product.rating}</span>
                <span className="text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
              </div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {/* <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div> */}
            </div>

            {/* Deal Blocks - Prominent Position */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-lg mr-3">🔥</span>
                Best Deals Available
              </h2>
              
              {/* Desktop: Horizontal scroll, Mobile: Vertical stack */}
              <div className="lg:flex lg:space-x-4 lg:overflow-x-auto lg:pb-4 space-y-4 lg:space-y-0">
                {product.deals.map((deal, index) => (
                  <div key={index} className="lg:flex-shrink-0 lg:w-80 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow relative bg-gradient-to-br from-white to-gray-50">
                    {deal.badge && (
                      <div className={`absolute top-0 right-0 ${deal.color} text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-semibold`}>
                        {deal.badge}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 ${deal.color} rounded-lg flex items-center justify-center text-white text-2xl shadow-md`}>
                        {deal.logo}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{deal.platform}</h3>
                        <p className="text-sm text-gray-600">Trusted Partner</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-gray-900">₹{deal.price.toLocaleString()}</span>
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                          {deal.discount}% OFF
                        </span>
                        <span className="text-sm font-semibold text-blue-600">
                          Cashback: ₹{deal.cashback}
                        </span>
                      </div>
                      
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Final Price:</span>
                          <span className="font-bold text-xl text-green-600">₹{(deal.price - deal.cashback).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => window.open(deal.link, '_blank')}
                      className={`w-full ${deal.color} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center space-x-2 shadow-md`}
                    >
                      <span>Get Deal</span>
                      <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Experience exceptional sound quality with the Sony WH-1000XM5 Wireless Noise Canceling Headphones. 
                  These premium headphones feature industry-leading noise cancellation technology that adapts to your 
                  environment, ensuring crystal-clear audio in any setting.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With up to 30 hours of battery life and quick charge capability, you can enjoy uninterrupted music 
                  throughout your day. The lightweight design and soft cushioning provide exceptional comfort for 
                  extended listening sessions.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Advanced features include multipoint connection, speak-to-chat technology, and premium sound 
                  quality powered by Sony's V1 processor. Perfect for music enthusiasts, professionals, and travelers.
                </p>
              </div>
            )}
            
            {selectedTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-3">
                    <dt className="font-medium text-gray-900">{key}</dt>
                    <dd className="text-gray-700 mt-1">{value}</dd>
                  </div>
                ))}
              </div>
            )}
            
            {selectedTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{product.reviews} reviews</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "Rajesh Kumar", rating: 5, comment: "Excellent sound quality and noise cancellation. Worth every penny!", date: "2 days ago" },
                    { name: "Priya Sharma", rating: 4, comment: "Great headphones but could be more comfortable for long sessions.", date: "1 week ago" },
                    { name: "Amit Patel", rating: 5, comment: "Amazing battery life and quick charging. Highly recommended!", date: "2 weeks ago" }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div> : <LoadingPage/>
  );
}