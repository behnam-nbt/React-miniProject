import { CiTrash } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import styles from "../components/Products.module.css";

function Table({ products = [], productsList = [], setIsEditModalOpen, setSelectedProduct, setIsDeleteModalOpen }) {
    // Ensure productsList is an array before spreading
    const allProducts = [...products, ...(Array.isArray(productsList) ? productsList : [])];

    const editProduct = (product) => {
        setSelectedProduct(product); // Set the selected product for editing
        setIsEditModalOpen(true); // Open the edit modal
    };

    const deleteProduct = (product) => {
        setSelectedProduct(product); // Set the selected product for deletion
        setIsDeleteModalOpen(true); // Open the delete modal
    };

    const handleCheckboxChange = (productId) => {
        setSelectedProduct((prev) => ({
            ...prev,
            [productId]: !prev[productId], // Toggle the checkbox state
        }));
    };

    const handleDeleteSelected = () => {
        const idsToDelete = Object.keys(selectedProducts).filter(id => selectedProducts[id]);
        onDeleteSelected(idsToDelete); // Pass the selected IDs to the parent
        setSelectedProducts({}); // Reset selection after deletion
    };

    return (
        <table>
            <thead>
                <tr>
                    <th className={styles.column1}>نام کالا</th>
                    <th className={styles.column2}>موجودی</th>
                    <th className={styles.column3}>قیمت</th>
                    <th className={styles.column4}>شناسه کالا</th>
                    <th className={styles.column5}></th>
                </tr>
            </thead>
            <tbody>
                {allProducts.length > 0 ? (
                    allProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.quantity.toLocaleString('fa-IR')}</td>
                            <td>{product.price.toLocaleString('fa-IR')} تومان</td>
                            <td>{product.id}</td>
                            <td>
                                <div className={styles.actions}>
                                    <div className={styles.edit}>
                                        <FiEdit onClick={() => editProduct(product)} />
                                    </div>
                                    <div className={styles.remove}>
                                        <CiTrash onClick={() => deleteProduct(product)} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">هیچ محصولی پیدا نشد.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;
