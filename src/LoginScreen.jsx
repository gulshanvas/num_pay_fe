import React, { useState } from "react";

import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, SMS_SUCCESS } from "./constants";


const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState("");
const[otp,setOTP]=useState()
const navigate = useNavigate();
const [message, setMessage] = useState(""); 
const [SMSSessionID,setSMSSessionID]= useState();
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };
  const handleOTPChange=(e)=>{
    setOTP(e.target.value);
  }

const handleLogin=async(e)=>{
console.log('handle login ',e.target.value)
console.log("This is OTPPP    ",otp)
}

  const handleOTP=async(e)=>{
    console.log('handle OTP after final submit ',e.target.value)
    const cookies = new Cookies();
    cookies.set("mobileNumber",mobileNumber)
console.log(" Mobile Number   ",mobileNumber)

console.log(" Session ID  ",SMSSessionID)

console.log("This is OTP  ",otp)
    const queryParams = new URLSearchParams({
      mobile_no: mobileNumber,
      sms_session_id:SMSSessionID,
      otp,
      
    }).toString();
   let loginAPIResponse;
  try {
  const response = await fetch(
    `${BASE_URL}/login?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // Add body content if needed, or leave empty
    }
  );
  if (response.ok) {
    loginAPIResponse = await response.json();
   console.log("Login API Response   ", loginAPIResponse)
   if(loginAPIResponse.success){
    
    navigate('/transfer-page')}
 } else {
   console.error("Error:", response.statusText);
   alert("Failed to submit form.");
 }
 } catch (error) {
 console.error("Error:", error);
 }

  
    // console.log(`OTP: ${otp}`)
}
  
  const handleSubmit = async() => {
    //API
  let APIResponse ;
    try {
        const response = await fetch(
          `${BASE_URL}/mobile/${mobileNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
           // body: JSON.stringify({}), // Add body content if needed, or leave empty
          }
        );
  
        if (response.ok) {
          APIResponse = await response.json();
          console.log("This is data ",APIResponse)
        } else {
          console.error("Error:", response.statusText);
        
        }
      } catch (error) {
        console.error("Error:", error);
      }
    // console.log(mobileNumber);
    
    if(APIResponse.success ){

      const queryParams = new URLSearchParams({
        mobile_no: mobileNumber,
        
      }).toString();
     let generateOTPAPIResponse;
    try {
    const response = await fetch(
      `${BASE_URL}/generate-otp?${queryParams}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Add body content if needed, or leave empty
      }
    );
    
    if (response.ok) {
       generateOTPAPIResponse = await response.json();
       if(generateOTPAPIResponse.data.Status == SMS_SUCCESS){
       setSMSSessionID(generateOTPAPIResponse.data.Details);
       setMessage("OTP Sent Successfully!"); 
      }
       console.log("+++++++++Generated OTP+++++++  ",generateOTPAPIResponse)
    
    } else {
      console.error("Error:", response.statusText);
      alert("Failed to submit form.");
    }
    } catch (error) {
    console.error("Error:", error);
    }


    }
    else {navigate('/register-page')};

  };

  return (
  <div style={{display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4", /* Optional: Background color for contrast */
  }}>
  <div className="App-header" style ={{ 
    width: "50%",
    backgroundColor: "blueviolet",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    borderRadius: "40%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  
    }}>
    <h3> Login Screen</h3>
    <div style={{ display: "grid", alignItems: "center", gap: "5px"}}>
      {/* Mobile Number Input */}
      <p>Enter Mobile Number:</p>
      <input
        type="tel"
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChange={handleMobileNumberChange}
        style={{ padding: "8px", fontSize: "14px" }}
      />
<button
        onClick={handleSubmit}
        style={{
          padding: "9px 17px",
          backgroundColor: "orange",
          color: "white",
    fontWeight: "bold",

    fontSize: "17px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Generate OTP
      </button>
      {message && (
            <p
              style={{
                color: message.includes("Successfully")
                  ? "red"
                  : "red",
                marginTop: "3px",fontSize:"13px"
              }}
            >
              {message}
            </p>
          )}

<p>Enter OTP:</p>
      <input
        type="tel"
        value={otp}
        placeholder="Enter OTP"

        onChange={handleOTPChange}
        style={{ padding: "8px", fontSize: "14px" }}
      />
<button
        onClick={handleOTP}
        style={{
          padding: "9px 17px",
          backgroundColor: "orange",
          color: "white",
          fontWeight: "bold",

          fontSize: "17px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          
        }}
      >
        Submit
      </button>
  
    </div>
    </div>
    </div>
  );
  
    
};

export default LoginScreen;
//Response
/*{
  "success": true,
  "data": {
      "id": 1,
      "phoneNo": "+917021093375",
      "publicKey": "1adf40848a017ca89560872292b4b71faeb8a2e5",
      "pkJSON": "{\"version\":3,\"id\":\"39480105-e1a9-4056-9bef-d0918c664b86\",\"address\":\"1adf40848a017ca89560872292b4b71faeb8a2e5\",\"crypto\":{\"ciphertext\":\"8cecfd9c63d5181ebb88fa392e419cd37b497843d0e6781f4a84698b520875c6\",\"cipherparams\":{\"iv\":\"773fcd04e649d33c677e5825d71add22\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"n\":8192,\"r\":8,\"p\":1,\"dklen\":32,\"salt\":\"3d9bf8f0ca4bbeb7b059fa3d2fa0e805b88e97e3bd78161c8139d6430660b9f5\"},\"mac\":\"65835e71645fd291ffa3b134765730945b8563c4462db3de0e80be6631b6b10b\"}}"
  }
}*/