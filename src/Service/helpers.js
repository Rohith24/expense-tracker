export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const deleteItem = (key) => {
    return localStorage.removeItem(key);
}

export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "INR"
    })
}