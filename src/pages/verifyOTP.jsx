import React, { useState, useEffect } from 'react';
import {
    f7,
    Page,
    Navbar,
    Block,
    BlockTitle,
  } from 'framework7-react';
  import OTPInput from 'react-otp-input';
  import TDXLogo from '../assets/tdx_logo.png'
  import { FiEdit3 } from 'react-icons/fi'
  import axios from 'axios';
import { successToast } from '../js/toast';
import store from '../js/store';
import useToast from '../components/toast';

const verifyOTP = ({ f7route, f7router }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(true);
  const [resendCount, setResendCount] = useState(0);
  const showToast = useToast();

  const initialTime = 300; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  const phoneNumber = f7route.params.phoneNumber;

  useEffect(() => {
    const sendOtp = async () => {

      axios.post(`https://torux.app/api/agentsignIn?mobile=${phoneNumber}`)
      .then(function (response) {
        if (response.status === 200) {
          console.log("Success:", response.data);
        } else {
          console.log("Unexpected status code:", response.status);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log("Error status code:", error.response.status);
          console.log("Error data:", error.response.data);
          f7.dialog.alert('Error status code', error.response.status);
        } else if (error.request) {
          console.log("No response received:", error.request);
          f7.dialog.alert('No response received', error.request);
        } else {
          console.log("Error", error.message);
          f7.dialog.alert('Error message', error.message);
        }
      });

      // try {
      //   const response = await axios.post(`https://torux.app/api/agentsignIn?mobile=${phoneNumber}`);
      //   console.log('OTP sent successfully:', response.data);

      //   if (response.data.error === true) {
      //     console.error('Error in response:', response.data.message);
      //     f7.dialog.alert('OTP Verification Error', response.data.message);
      //   } else {
      //     // If no error, handle success
      //     console.log('OTP sent successfully:', response.data.message);
      //   }

      // } catch (error) {
      //   console.error('Error sending OTP:', error);
      //   // f7router.navigate('/login/');
      //   f7.dialog.alert('OTP Verification Error', error);
      // } finally {
      //   setLoading(false);
      // }
    };

    sendOtp();
  }, [phoneNumber, f7router, resendCount]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const resendCode = () => {
    const newCount = resendCount + 1;
    setResendCount(newCount);
    setTimeLeft(initialTime);
    setIsRunning(true);
  };

  const handleOTPChange = (value) => {
    setOtp(value);
  };

  const handleVerify = async () => {
    try {
        const response = await axios.post(`https://torux.app/api/otpverify?code=${otp}`);
        console.log('OTP verified successfully:', response.data);
        const data = response.data;
        store.dispatch('setUser', data);
        successToast('OTP verified successfully');
        f7router.navigate('/welcome/');
      } catch (error) {
        console.error('Error sending OTP:', error);
        // f7router.navigate('/login/');
        f7.dialog.alert('OTP Verification Error', error);
      } finally {
        setLoading(false);
      }
  }

  return (
    <Page name="verifyOTP">
      <div className="h-[100vh] w-[100vw] p-5 relative">
        <img
          src={TDXLogo}
          alt="TDX logo"
          className="w-[150px]"
        />
        <h1 className="text-lg font-bold mt-1">OTP Verification</h1>
        <div className="flex flex-col items-start gap-y-1">
          <p className="font-semibold">{`We have sent an OTP to ${phoneNumber}`}</p>
          <button
            onClick={() => f7router.back()}
            className="w-auto font-semibold text-green-300 text-primary flex items-center gap-x-2">
            <FiEdit3 className="" /> 
            <h6>Edit number</h6>
          </button>
        </div>
        <div className="mt-10">
          <h6 className="font-semibold">Enter code</h6>
          <div className="rounded w-full h-auto my-1">
            <OTPInput 
              value={otp}
              onChange={handleOTPChange}
              numInputs={4}
              containerStyle={{
                display: 'flex',
                justifyContent: 'space-between',
                columnGap: 15,
              }}
              inputStyle={{
                width: '25%',
                height: 60,
                fontWeight: '800',
                fontSize: 22,
                color: 'dimgrey',
                borderRadius: 4,
                border: '1px solid lightgrey',
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="w-full flex justify-start mt-2">
            {
              timeLeft !== 0 && (
                <h6 className="font-semibold text-left">
                  Resend code in
                  {' '} 
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </h6>
              )
            }
            {timeLeft === 0 && (
              <button
                onClick={resendCode}
                className=""
              >
                <h6 className="font-semibold text-left">Send another code</h6>
              </button>
            )}
          </div>
          <div className="w-full flex justify-start mt-2">
            <button
              onClick={() => handleVerify()}
              disabled={otp.length < 4 && loading}
              className={`${ (otp.length === 4 && !loading)? '' : 'opacity-50' } w-full h-10 p-[5px] rounded bg-primary text-font-light flex justify-center items-center px-5`}
            >
              <h6 className="text-base font-bold">{loading ? 'Sending OTP' : 'Verify OTP'}</h6>
            </button>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default verifyOTP;