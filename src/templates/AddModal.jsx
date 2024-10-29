import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addProducts } from "../api/auth";
import styles from "./AddModal.module.css";

function AddModal({ setName, setPrice, setQuantity, isAddModalOpen, setIsAddModalOpen, name, price, quantity, setProductsList }) {

    const addNewProductHandler = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                name,
                quantity: parseInt(quantity, 10),
                price: parseFloat(price)
            };

            const newProduct = await addProducts(productData);
            setProductsList((prev) => [...prev, newProduct]);

            // Close the modal after successful addition
            setIsAddModalOpen(false);

            // Optionally clear the form inputs
            setName("");
            setPrice("");
            setQuantity("");

            // Show success toast notification
            toast.success('محصول با موفقیت اضافه شد');
        } catch (error) {
            toast.error('خطا در اضافه کردن محصول');
        }
    };


    return (
        <div className={`${styles.modal} ${isAddModalOpen ? styles.modalOpen : ""}`}>
            <div className={styles.modalBackground}></div>
            <div className={styles.addContainer}>
                <h2>ایجاد محصول جدید</h2>
                <form onSubmit={addNewProductHandler}>
                    <div className={styles.inputContainer}>
                        <div>
                            <label htmlFor="name">نام کالا</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="نام کالا"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity">تعداد کالا</label>
                            <input
                                type="text"
                                name="quantity"
                                value={quantity}
                                placeholder="تعداد موجودی"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">قیمت کالا</label>
                            <input
                                type="text"
                                name="price"
                                value={price}
                                placeholder="قیمت"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.create} type="submit">ایجاد</button>
                            <button
                                className={styles.cancel}
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
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

export default AddModal;
