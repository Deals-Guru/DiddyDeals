import React from 'react';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <div 
        className="category-img" 
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      ></div>
      <div className="category-content">
        <h3>{category.name}</h3>
        <p>Latest gadgets and devices</p>
      </div>
    </div>
  );
};

export default CategoryCard;