export const getYearArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for(let i = currentYear; i >= currentYear-100; i--){
        years.push(i);
    }
    return years;
}  