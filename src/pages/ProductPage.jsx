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

  const copyHandler = (event, deal) => {
    console.log(`Copying link for product: ${deal}`);
    if (deal && deal.platform === 'Amazon') {
      navigator.clipboard.writeText(`https://diddy-deals.netlify.app/product?code=${deal.shareCode}`);
    } else {
      navigator.clipboard.writeText(`${deal.link}`);
    }
    event.stopPropagation();
  }

  useEffect(() => {
    console.log(id);
    const fetchDetails = async () => {
        try {
            const response = await fetchProductDetails(id);
            console.log(response);
            console.log(response.specifications[0]);
            const product = {
              name: response.name,
              brand: response.brand,
              rating: response.rating,
              reviews: response.reviews,
              originalPrice: response.mrp,
              images: response.images,
              highlights: response.highlights,            // ["", "", ""]
            //   highlights: [
            //     "Industry-leading noise canceling technology",
            //     "30-hour battery life with quick charge",
            //     "Crystal clear hands-free calling",
            //     "Lightweight and comfortable design"
            //   ],
              specifications: response.specifications,                         // {"": "", "": "", "": ""}
            //   specifications: {
            //     "Driver Unit": "30mm",
            //     "Frequency Response": "4 Hz-40,000 Hz",
            //     "Battery Life": "Up to 30 hours",
            //     "Charging Time": "3 hours (Quick charge: 3 min for 3 hours)",
            //     "Weight": "250g",
            //     "Connectivity": "Bluetooth 5.2, NFC, 3.5mm jack"
            //   },
            //   deals: [
            //     {
            //       platform: "Amazon",
            //       price: response.price,
            //       discount: response.off,
            //       logo: "🛒",
            //       color: "bg-orange-500",
            //       link: response.affiliateLink,
            //       badge: "Best Seller"
            //     },
            //     {
            //       platform: "Flipkart",
            //       price: 25990,
            //       discount: 13,
            //       cashback: 1299,
            //       logo: "🛍️",
            //       color: "bg-blue-500",
            //       link: "https://flipkart.com",
            //       badge: "Big Billion Days"
            //     },
            //     {
            //       platform: "Meesho",
            //       price: 23990,
            //       discount: 20,
            //       logo: "🏪",
            //       color: "bg-pink-500",
            //       link: "https://meesho.com",
            //       badge: "Lowest Price"
            //     }
            //   ],
              deals: response.deals,                     // [{platform: "", price: 0, discount: 0, logo: "", color: "", link: "", badge: ""}]
              description: response.description,              // ["", "", ""]
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
    <Header onClick={() => history.push('/')} searchBar={false}/>

    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      <div className="min-h-screen flex flex-col lg:flex-row gap-4 lg:gap-6">
        
        <div className="w-full lg:w-1/3 space-y-4 lg:sticky lg:top-8 lg:h-fit lg:order-1">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-64 lg:h-96 object-contain p-4"
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
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/3 space-y-4 lg:space-y-6 order-1 lg:order-2">
          
          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
            <p className="text-xs lg:text-sm text-gray-600 mb-1">{product.brand}</p>
            <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-4 leading-tight">{product.name}</h1>
            
            {product.rating && product.reviews && <div className="flex items-center space-x-2 mb-3 lg:mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 lg:w-5 lg:h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm lg:text-lg font-semibold">{product.rating}</span>
              <span className="text-xs lg:text-base text-gray-600">({product.reviews.toLocaleString()})</span>
            </div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
              {product.highlights && product.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-blue-50 rounded-lg">
                  <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span className="text-xs lg:text-sm text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 lg:px-3 lg:py-1 rounded-full text-sm lg:text-lg mr-2 lg:mr-3">🔥</span>
              Best Deals
            </h2>
            
            <div className="lg:flex lg:space-x-4 lg:overflow-x-auto lg:pb-4 space-y-3 lg:space-y-0">
              {product.deals.map((deal, index) => (
                <div key={index} className="lg:flex-shrink-0 lg:w-80 border border-gray-200 rounded-lg p-4 lg:p-6 hover:shadow-lg transition-shadow relative bg-gradient-to-br from-white to-gray-50">
                  {deal.badge && (
                    <div className={`absolute top-0 right-0 ${deal.color} text-white px-2 py-1 lg:px-3 lg:py-1 rounded-bl-lg rounded-tr-lg text-xs font-semibold`}>
                      {deal.badge}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 mb-3 lg:mb-4">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 ${deal.color} rounded-lg flex items-center justify-center text-white text-xl lg:text-2xl shadow-md`}>
                      {deal.logo}
                    </div>
                    <div>
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900">{deal.platform}</h3>
                      <p className="text-xs lg:text-sm text-gray-600">Trusted Partner</p>
                    </div>
                  </div>

                  <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl lg:text-2xl font-bold text-gray-900">₹{deal?.price?.toLocaleString()}</span>
                      <span className="text-sm lg:text-lg text-gray-500 line-through">₹{product?.originalPrice?.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs lg:text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 lg:px-3 lg:py-1 rounded-full">
                        {deal.discount}% OFF
                      </span>
                      <button className="flex items-center space-x-2 px-2 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                        onClick={(e) => copyHandler(e, deal)}
                      >
                        <Share2 className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(deal.link, '_blank')}
                    className={`w-full ${deal.color} text-white py-2.5 lg:py-3 px-4 lg:px-6 rounded-lg font-semibold hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center space-x-2 shadow-md`}
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

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4 lg:mt-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 lg:space-x-8 px-4 lg:px-6 overflow-x-auto">
            {['description', 'specifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-3 lg:py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
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

        <div className="p-4 lg:p-6">
          {product.description && selectedTab === 'description' && (
            <div className="prose max-w-none">
              {product.description.map((desc, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4 text-sm lg:text-base">
                    {desc}
                </p>
              ))}
            </div>
          )}
          
          {selectedTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {product.specifications && product.specifications.map((spec) => (
                <div key={spec.key} className="border-b border-gray-100 pb-2 lg:pb-3">
                  <dt className="font-medium text-gray-900 text-sm lg:text-base">{spec.key}</dt>
                  <dd className="text-gray-700 mt-1 text-sm lg:text-base">{spec.value}</dd>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div> : <LoadingPage/>
);
}