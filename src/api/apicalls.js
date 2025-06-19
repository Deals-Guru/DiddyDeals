// const API_BASE_URL = 'https://fancy-alfajores-b52bf1.netlify.app/.netlify/functions/api';
// const API_BASE_URL = 'https://giant-comfortable-brand.glitch.me';
const API_BASE_URL = 'http://localhost:5000'

export const fetchCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    _id: "1",
                    name: "Electronics",
                    imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    tagLine: "Latest gadgets and devices"
                },
                {
                    _id: "2",
                    name: "Home & Kitchen",
                    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    tagLine: "Essentials for Home Living"
                },
                {
                    _id: "3",
                    name: "Fashion",
                    imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    tagLine: "Express Your Personal Style"
                },
                {
                    _id: "4",
                    name: "Beauty",
                    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
                    tagLine: "Reveal Your Natural Radiance"
                },
                {
                    _id: "5",
                    name: "Fitness",
                    imageUrl: "https://plus.unsplash.com/premium_photo-1664536967999-f75d4f4b95fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3ltJTIwZXF1aXBtZW50fGVufDB8fDB8fHww",
                    tagLine: "Fuel Your Workout Goals"
                }
            ]);
        }, 500);
    });
};

export const fetchCategoryProducts = async (category) => {
    try {
        const encoded = encodeURIComponent(category); 
        const response = await fetch(`${API_BASE_URL}/products?category=${encoded}`, {
            method: 'GET',
            mode: 'cors',
        });
        if (!response.ok) throw new Error('Failed to fetch featured products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching featured products:', error);
        throw error;
    }
};

export const redirectToAffiliateLink = (productId) => {
    console.log(`Redirecting to affiliate link for product ${productId}`);
    window.location.href = `https://example.com/product/${productId}`;
};

const getAdminToken = () => {
    return localStorage.getItem('adminToken');
};
export const createProduct = async (productData) => {
    try {
        const token = getAdminToken();
        if (!token) throw new Error('Admin token not found');

        const response = await fetch(`${API_BASE_URL}/admin/products`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-token': token
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) throw new Error('Failed to create product');
        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Delete product
export const deleteProduct = async (productId) => {
    try {
        const token = getAdminToken();
        if (!token) throw new Error('Admin token not found');

        const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'x-admin-token': token
            }
        });

        if (!response.ok) throw new Error('Failed to delete product');
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Update product
export const updateProduct = async (productId, productData) => {
    try {
        const token = getAdminToken();
        if (!token) throw new Error('Admin token not found');

        const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-token': token
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) throw new Error('Failed to update product');
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Create slider
export const createSlider = async (sliderData) => {
    try {
        const token = getAdminToken();
        if (!token) throw new Error('Admin token not found');

        const response = await fetch(`${API_BASE_URL}/admin/sliders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-token': token
            },
            body: JSON.stringify(sliderData)
        });

        if (!response.ok) throw new Error('Failed to create slider');
        return await response.json();
    } catch (error) {
        console.error('Error creating slider:', error);
        throw error;
    }
};

// Delete slider
export const deleteSlider = async (sliderId) => {
    try {
        const token = getAdminToken();
        if (!token) throw new Error('Admin token not found');

        const response = await fetch(`${API_BASE_URL}/admin/sliders/${sliderId}`, {
            method: 'DELETE',
            headers: {
                'x-admin-token': token
            }
        });

        if (!response.ok) throw new Error('Failed to delete slider');
        return await response.json();
    } catch (error) {
        console.error('Error deleting slider:', error);
        throw error;
    }
};

// Update slider
export const updateSlider = async (sliderId, sliderData) => {
    try {
        const token = getAdminToken();
        if (!token) throw new Error('Admin token not found');

        const response = await fetch(`${API_BASE_URL}/admin/sliders/${sliderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-token': token
            },
            body: JSON.stringify(sliderData)
        });

        if (!response.ok) throw new Error('Failed to update slider');
        return await response.json();
    } catch (error) {
        console.error('Error updating slider:', error);
        throw error;
    }
};

export const checkAdminToken = async (token) => {
    try {
        if (!token) throw new Error('Admin token not found');
        console.log(API_BASE_URL);

        const response = await fetch(`${API_BASE_URL}/admin/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-token': token
            }
        });
        if (!response.ok) {
            return { valid: false };
        }
        const data = await response.json();
        return { valid: data.valid };
    } catch (error) {
        console.error('Error checking admin token:', error);
        throw error;
    }
}

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      headers: {
        'x-admin-token': localStorage.getItem('adminToken') || ''
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchSliders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/sliders`, {
    //   headers: {
    //     'x-admin-token': localStorage.getItem('adminToken') || ''
    //   }
    });
    
    if (!response.ok) throw new Error('Failed to fetch sliders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sliders:', error);
    throw error;
  }
};

export const fetchProductDetails = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/product-detail/${id}`);
        if (!response.ok) throw new Error('Failed to fetch sliders');
        return await response.json();
    } catch (error) {
        console.error('Error fetching sliders:', error);
        throw error;
    }
}
