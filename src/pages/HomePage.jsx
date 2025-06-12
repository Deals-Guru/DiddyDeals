import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { fetchCategories, fetchCategoryProducts } from '../api/apicalls';
import Header from '../components/Header';
import LoadingPage from './LoadingPage';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Featured');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchCategoryProducts(selectedCategory)
        ]);
        
        setCategories(categoriesData);
        setFeaturedProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCategory]);

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div>
      <Header onClick={() => setSelectedCategory('Featured')}/>
      <Slider />
      
      <div className="container py-10">
        <section className="categories-section mb-16">
          <SectionTitle title="Shop By Category" />
          <div className="categories">
            {categories.map(category => (
              <CategoryCard key={category._id} category={category} onClick={() => {
                console.log("Category selected - ", category?.name);
                setSelectedCategory(category?.name)
              }}/>
            ))}
          </div>
        </section>

        <section className="featured-products">
          <SectionTitle title={`${selectedCategory} Products`} />
          <div className="products">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage; 