// src/admin/pages/ProductsPage.jsx
import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'Premium sound quality with noise cancellation',
      price: 89.99,
      affiliateLink: 'https://example.com/headphones',
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      name: 'Smart Watch',
      description: 'Track fitness and notifications',
      price: 199.99,
      affiliateLink: 'https://example.com/smartwatch',
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    }
  ]);
  
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCreate = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts([...products, newProduct]);
    return true;
  };

  const handleUpdate = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? {...updatedProduct, id} : p));
    setEditingProduct(null);
    return true;
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <ProductForm 
                onSubmit={editingProduct ? (data) => handleUpdate(editingProduct.id, data) : handleCreate}
                initialData={editingProduct}
                onCancel={() => setEditingProduct(null)}
              />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <ProductList 
              products={products} 
              onEdit={setEditingProduct} 
              onDelete={handleDelete} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;