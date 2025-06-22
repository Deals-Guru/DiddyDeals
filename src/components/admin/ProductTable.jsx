// ProductTable.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductTable = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => {
  return (
    <div className="section-card">
      <div className="section-header">
        <h2 className="section-title">Product Management</h2>
        <button 
          onClick={onAddProduct}
          className="add-button"
        >
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="table-row">
                <td>
                  <div className="product-info">
                    <img 
                      className="product-image" 
                      src={product.imageUrl || product.images[0]} 
                      alt={product.name} 
                    />
                    <div>
                      <div className="product-name">{product.name}</div>
                      <div className="product-description">
                        {product.description[0].substring(0, 40)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td>Rs {product?.price?.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    onClick={() => onEditProduct(product)}
                    className="action-button edit-button"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="action-button delete-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div className="empty-state">
            No products found. Add your first product!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;