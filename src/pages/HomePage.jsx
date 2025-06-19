import React, { useState, useEffect, use } from 'react';
import Slider from '../components/Slider';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { fetchCategories, fetchCategoryProducts } from '../api/apicalls';
import Header from '../components/Header';
import LoadingPage from './LoadingPage';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
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
        setProducts(productsData);
        setAllProducts(productsData); 
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setProducts(allProducts.filter(product => selectedCategory !== 'Featured' ? product.category === selectedCategory : product.category !== 'Featured'));
  }, [selectedCategory])

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div>
      <Header onClick={() => setSelectedCategory('Featured')} setProducts={setProducts} allProducts={allProducts}/>
      <Slider />
      
      <div className="container py-10">
        <section className="categories-section mb-16">
          <SectionTitle title="Shop By Category" />
          <div className="categories">
            {categories.map(category => (
              <CategoryCard key={category._id} category={category} onClick={() => {
                setSelectedCategory(category?.name)
              }}/>
            ))}
          </div>
        </section>

        <section className="featured-products">
          <SectionTitle title={`${selectedCategory} Products`} />
          <div className="products">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage; 