import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';


const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState("");
const[otp,setOTP]=useState()
const navigate = useNavigate();

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleOTP=(e)=>{
    console.log('e.target.value ',e.target.value)
    setOTP(e.target.value)
    // console.log(`OTP: ${otp}`)
}
  
  const handleSubmit = () => {
    //API
    // console.log(mobileNumber);
    const response ={
        
    "success": true,
    "message": "not present"
          
    }

    if(response.success ){navigate('/transfer-page')}
    else {navigate('/register-page')};

    alert(`Mobile Number: ${mobileNumber}`);
  };

  return (<div className="App-header">
    <h3> Login Screen</h3>
    <div style={{ display: "grid", alignItems: "center", gap: "5px" }}>
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
        // onClick={handleOTP}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
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
<button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
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
  );
  
    
};

export default LoginScreen;
