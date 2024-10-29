import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');  // Get the token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Attach the token to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', {
      username: userData.username,
      password: userData.password,
    });

    // Set token in cookies
    Cookies.set('token', response.data.token, { expires: 7, secure: true, sameSite: 'Strict' });  // For secure/production environments, set secure and sameSite

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Login failed.');
    } else {
      throw new Error('Network error.');
    }
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      username: userData.username,
      password: userData.password,
    });

    return response.data;  // Handle registration success (no need to store token in cookie here)
  } catch (error) {
    console.error('Error registering:', error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Registration failed. Please check the backend logs.');
    } else {
      throw new Error('Network error or server is unreachable.');
    }
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');  // Axios instance takes care of headers
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products.');
  }
};

// Update product function
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);  // Axios instance takes care of headers
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating the product.');
  }
};

export const addProducts = async (productData) => {
  try {
    // Send productData (the new product's details) to the API
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.log('Error adding product:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error adding product');
  }
};

export const deleteProducts = async (id) => {
  try {
    // The id should be part of the URL only
    const response = await api.delete(`/products/${id}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    // Corrected error message handling
    throw new Error(`Error deleting the product: ${error.response?.data?.message || error.message}`);
  }
};
 