export const decodeToken = (token) => {
    if (!token) return null;
    const base64Url = token.split('.')[1]; // Get the payload part of the token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);
};

export const searchProducts = (productsList,searchTerm) => {
    if(!searchTerm) return productsList;

    const lowercasedTerm = searchTerm.toLowerCase();

    const filteredItems = productsList.filter((product) =>
        product.name.toLowerCase().includes(lowercasedTerm)
    );

    return filteredItems;
}
