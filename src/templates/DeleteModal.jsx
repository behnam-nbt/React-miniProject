import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteProducts } from "../api/auth";

import styles from './DeleteModal.module.css'

import Close from "/images/close.png"

function DeleteModal({ setIsDeleteModalOpen, product, isDeleteModalOpen, onDeleteSuccess }) {
    const deleteHandler = async () => {
        try {
            await deleteProducts(product.id); // Delete product via API
            onDeleteSuccess(product.id); // Update the product list in parent component
            setIsDeleteModalOpen(false); // Close the modal
            toast.success('محصول با موفقیت حذف شد')
        } catch (error) {
            toast.error("خطا در حذف محصول");
        }
    };

    return (
        <>
            <div className={`${styles.modal} ${isDeleteModalOpen ? styles.modalOpen : ""}`}>
                <div className={styles.modalBackground}></div>
                <div className={styles.deleteContainer}>
                    <div className={styles.iconBox}>
                        <img src={Close} alt="حذف" />
                    </div>
                    <h2>آیا از حذف این محصول مطمئن هستید؟</h2>
                    <div className={styles.action}>
                        <button className={styles.remove} onClick={deleteHandler}>حذف</button>
                        <button className={styles.cancel} onClick={() => setIsDeleteModalOpen(false)}>لغو</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteModal;
