import axios from "axios";
import { PushNotifications } from '@capacitor/push-notifications';

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

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Determine the suffix for the day
    const suffix = (day % 10 === 1 && day !== 11) ? "st" :
                   (day % 10 === 2 && day !== 12) ? "nd" :
                   (day % 10 === 3 && day !== 13) ? "rd" : "th";

    return `${day}${suffix} ${month}, ${year}`;
}

export const trimStringToLength = (number, str) => {
    if (str.length <= number) {
        return str; // If the string length is less than or equal to the number, do nothing
    }
    return str.slice(0, number) + '...'; // Cut the string and add '...'
}

export const registerPushNotifications = () => {
    PushNotifications.requestPermissions().then((permission) => {
        if (permission.receive === 'granted') {
            PushNotifications.register();
        } else {
            console.log("Push notification permission not granted");
        }
    });
};

export const setupPushNotificationListeners = () => {
    // Get the device ID (FCM token)
    PushNotifications.addListener('registration', (token) => {
        console.log('Device FCM Token:', token.value);
        // Send this token to the server for sending notifications so you can add to when the User request for OTP
    });

    // Handle registration errors
    PushNotifications.addListener('registrationError', (error) => {
        console.error('Registration error:', error);
    });

    // Handle incoming notifications
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Notification received:', notification);
        // Display notification content or trigger Framework7 alert
    });

    // Handle notification tap action
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Notification tapped:', notification);
        // Navigate to specific pages based on notification data
    });
};