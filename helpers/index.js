 const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
};

export const formattedDate = (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-GB", options)
}

export const convertToDong= (data) => {
    if (!data) return 0
    return data.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}