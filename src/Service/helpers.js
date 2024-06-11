export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const deleteItem = (key) => {
    return localStorage.removeItem(key);
}

export const formatCurrency = (amount, currency) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: currency
    })
}

export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();
