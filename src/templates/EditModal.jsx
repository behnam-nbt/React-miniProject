import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { updateProduct } from '../api/auth';
import styles from './AddModal.module.css';

function EditModal({ isEditModalOpen, setIsEditModalOpen, setProductsList, product }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (product) {
            setName(product.name);
            setQuantity(product.quantity);
            setPrice(product.price);
        }
    }, [product]);

    const editProductHandler = async (e) => {
        e.preventDefault();
    
        const updatedProductData = {
            name,
            quantity: parseInt(quantity, 10),
            price: parseFloat(price),
        };

        if (isNaN(updatedProductData.quantity) || updatedProductData.quantity <= 0) {
            toast.error("تعداد موجودی باید یک عدد مثبت باشد."); // Validate quantity
            return;
        }

        if (isNaN(updatedProductData.price) || updatedProductData.price < 0) {
            toast.error("قیمت باید یک عدد غیر منفی باشد."); // Validate price
            return;
        }
    
        try {
            const updatedProduct = await updateProduct(product.id, updatedProductData);
            // Pass the updated product back to the parent to update state
            setProductsList(updatedProduct); // Update product list in parent
            setIsEditModalOpen(false);
            toast.success('محصول با موفقیت ویرایش شد');
        } catch (error) {
            console.error("Error updating product:", error.message);
            toast.error("خطا در بروزرسانی محصول");
        }
    };

    return (
        <div className={`${styles.modal} ${isEditModalOpen ? styles.modalOpen : ""}`}>
            <div className={styles.modalBackground}></div>
            <div className={styles.addContainer}>
                <h2>ویرایش اطلاعات</h2>
                <form onSubmit={editProductHandler}>
                    <div className={styles.inputContainer}>
                        <div>
                            <label htmlFor="name">نام کالا</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity">تعداد موجودی</label>
                            <input
                                type="text"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">قیمت</label>
                            <input
                                type="text"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.create} type="submit">ثبت اطلاعات جدید</button>
                            <button
                                className={styles.cancel}
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;