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
      <Header onClick={() => history.push('/')} setProducts={() => {}} allProducts={[]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain p-4"
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
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              {product.rating && <div className="flex items-center space-x-2 mb-4">
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
            </div>

            {/* Key Features */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Key Highlights</h3>
              <ul className="space-y-1">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-blue-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <RotateCcw className="w-5 h-5 text-purple-500" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Warranty</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {/* <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button> */}
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deal Blocks */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Deals Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.deals.map((deal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow relative">
                {deal.badge && (
                  <div className={`absolute top-0 right-0 ${deal.color} text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-semibold`}>
                    {deal.badge}
                  </div>
                )}
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${deal.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
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
                    <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                      {deal.discount}% OFF
                    </span>
                  </div>
                  
                  {/* <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cashback:</span>
                    <span className="font-semibold text-green-600">₹{deal.cashback}</span>
                  </div> */}
                  
                  {/* <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Final Price:</span>
                    <span className="font-bold text-lg text-gray-900">₹{(deal.price - deal.cashback).toLocaleString()}</span>
                  </div> */}
                </div>

                <button
                  onClick={() => window.open(deal.link, '_blank')}
                  className={`w-full ${deal.color} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
                >
                  <span>Get Deal</span>
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['description', 'specifications'].map((tab) => (
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
            
            {/* {selectedTab === 'reviews' && (
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
            )} */}
          </div>
        </div>
      </div>
    </div> : <LoadingPage/>
  );
}