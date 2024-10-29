import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchProducts } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../helper/helper";
import Cookies from "js-cookie";
import { CiSearch, CiUser } from "react-icons/ci";
import Setting from "/images/setting-3.png";
import styles from "./Products.module.css";
import Table from "../templates/Table";
import AddModal from "../templates/AddModal";
import EditModal from "../templates/EditModal";
import DeleteModal from "../templates/DeleteModal";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader";

const Products = () => {
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productsList, setProductsList] = useState([]); // List of products
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products list
    const [selectedProduct, setSelectedProduct] = useState(null);

    // State for new product form
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const navigate = useNavigate();
    const token = Cookies.get("token");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const { data, error, isLoading, refetch } = useQuery("products", fetchProducts, {
        enabled: !!token,
        onSuccess: (data) => {
            const fetchedProducts = data?.data || [];
            setProductsList(fetchedProducts);
            setFilteredProducts(fetchedProducts);
        }
    });

    const openAddModal = () => setIsAddModalOpen(true);

    const updateProductList = (updatedProduct) => {
        setProductsList(prevProducts =>
            prevProducts.map(prod => (prod.id === updatedProduct.id ? updatedProduct : prod))
        );
        refetch();
    };

    const handleDeleteSuccess = (deletedProductId) => {
        setProductsList(prevProducts =>
            prevProducts.filter(product => product.id !== deletedProductId)
        );
        refetch();
    };

    // Update filtered products when search term changes
    useEffect(() => {
        setFilteredProducts(searchProducts(productsList, search));
    }, [search, productsList]);

    if (isLoading) return <Loader />

    return (
        <>
            <div className={styles.container}>
                <div className={styles.search}>
                    <CiSearch />
                    <input
                        type="text"
                        placeholder="جستجو کالا"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div>
                        <div className={styles.profile}>
                            <CiUser />
                            <p>{username || "کاربر"}</p>
                        </div>
                        <p style={{textAlign:"center"}}>مدیر</p>
                    </div>
                </div>
                <div className={styles.headTitle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={Setting} alt="تنظیمات" />
                        <h4>مدیریت کالا</h4>
                    </div>
                    <button onClick={openAddModal}>افزودن محصول</button>
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        products={filteredProducts}  // Pass filtered products to the Table component
                        setIsEditModalOpen={setIsEditModalOpen}
                        setSelectedProduct={setSelectedProduct}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                </div>
            </div>

            {isAddModalOpen && (
                <AddModal
                    setIsAddModalOpen={setIsAddModalOpen}
                    setProductsList={setProductsList}
                    name={name}
                    setName={setName}
                    price={price}
                    setPrice={setPrice}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            )}

            {isEditModalOpen && selectedProduct && (
                <EditModal
                    setIsEditModalOpen={setIsEditModalOpen}
                    isEditModalOpen={isEditModalOpen}
                    setProductsList={updateProductList}
                    product={selectedProduct}
                />
            )}

            {isDeleteModalOpen && selectedProduct && (
                <DeleteModal
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    product={selectedProduct}
                    isDeleteModalOpen={isDeleteModalOpen}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            )}

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick rtl={true}
                pauseOnFocusLoss
                pauseOnHover
            />
        </>
    );
};

export default Products;