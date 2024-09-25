import axios from "axios";

export const getYearArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for(let i = currentYear; i >= currentYear-100; i--){
        years.push(i);
    }
    return years;
}  

export const sendOTPToPhone = async (phone) => {
    axios.post(
        'https://torux.app/api/agentsignIn',
        { mobile: phone }, // "0202944211"
        {
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
        .then(function (response) {

        if (response.status === 200) {
            const responseData = response.data;
            console.log("Response Data:", responseData);
            console.log("Error:", responseData.error);
            console.log("Message:", responseData.message);
        } else {
            console.log("Unexpected status code:", response.status);
        }
        })
        .catch(function (error) {
        if (error.response) {

            console.log("Error Status Code:", error.response.status);
            console.log("Error Data:", error.response.data);
        } else if (error.request) {

            console.log("No response received:", error.request);
        } else {

            console.log("Error", error.message);
        }
        });
}