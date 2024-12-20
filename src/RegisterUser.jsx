import React, { useState } from "react";
import Web3 from "web3";
import Cookies from 'universal-cookie';
import { BASE_URL, SMS_SUCCESS } from "./constants";
import { useNavigate } from "react-router-dom";

const RegisterUser = ()=>{

    const [mobileNumber, setMobileNumber] = useState();
    const [privateKey,setPrivateKey] = useState();
    const [otp,setOTP]= useState();
    const [checkOTP,setCheckOTP] =useState();
    const [password,setPassword] = useState();
    const [SMSSessionID,setSMSSessionID]= useState();
    const handleMobileNumberChange = (e) => {
      setMobileNumber(e.target.value);
    };

    const navigate = useNavigate();
    const handlePrivateKeyChange = (e) => {
        setPrivateKey(e.target.value);
      };

      const handlePassword= (e) =>{
        setPassword(e.target.value);

      }
const handleOTP=(e)=>{
    console.log('e.target.value ',e.target.value)
    setOTP(e.target.value)
    // console.log(`OTP: ${otp}`)
}
 const handleSendOTP=async(e)=>{
    setCheckOTP(e.target.value);
     console.log("This is mobile number",mobileNumber);

//API
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
    const handleSubmit = async () => {
        // setOTP()
        //API


        console.log(`Mobile Number: ${mobileNumber}`);
        console.log("private e=key ", privateKey);
        console.log("password  ", password);  
        console.log("otp ", otp);

        const web3 = new Web3()
        // web3.eth
        // Web3.et
        const encryptedJson = await web3.eth.accounts.encrypt(privateKey, password)

        console.log("encryptedJson ====> ",encryptedJson)
        const cookies = new Cookies();

        cookies.set("pk_json", JSON.stringify(encryptedJson))
        cookies.set("mobileNumber",mobileNumber)
        // api call
    
        const queryParams = new URLSearchParams({
            mobile_no: mobileNumber,
            pk_json: JSON.stringify(encryptedJson),
            public_key: encryptedJson.address,
            sms_session_id:SMSSessionID,
            otp,
          }).toString();
          let registerUserAPIResponse;
    try {
        const response = await fetch(
          `${BASE_URL}/register?${queryParams}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // Add body content if needed, or leave empty
          }
        );
  
        if (response.ok) {
          registerUserAPIResponse = await response.json();
          cookies.set("pk_json", encryptedJson)
          console.log("Success:", registerUserAPIResponse);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      if(registerUserAPIResponse.success){
        navigate('/');
      }
      else{console.log("Registeration of User failed")}
    };
    return(
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
    }}>
        <div  style={{  alignItems: "center", gap: "10px", display:"grid" }}>
      {/* Mobile Number Input */}
      <p>Enter Mobile Number:</p>
      <input
        type="tel"
        placeholder="Enter mobile number with country code"
        value={mobileNumber}
        onChange={handleMobileNumberChange}
        style={{ padding: "8px", fontSize: "14px" }}
      />

<button
        onClick={handleSendOTP}
        style={{
          padding: "10px 20px",
          backgroundColor: "orange",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Send OTP
      </button>
<p>Enter OTP:</p>
      <input
        type="tel"
        value={otp}
        placeholder="Enter OTP"

        onChange={handleOTP}
        style={{ padding: "8px", fontSize: "14px" }}
      />
      {/* Private key */}
      <p>Enter private key:</p>
      <input
        type="password"
        placeholder="Enter private key"
        value={privateKey}
        onChange={handlePrivateKeyChange}
        style={{ padding: "8px", fontSize: "14px" }}
      />

       {/* Private key */}
       <p>Set password</p>
      <input
        type="password"
        placeholder="Set password"
        value={password}
        onChange={handlePassword}
        style={{ padding: "8px", fontSize: "14px" }}
      />

<button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "orange",
          color: "#fff",
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

    )
}

export default RegisterUser;