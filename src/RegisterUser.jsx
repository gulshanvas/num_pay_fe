import React, { useState } from "react";
import Web3 from "web3";
import Cookies from 'universal-cookie';

const RegisterUser = ()=>{

    const [mobileNumber, setMobileNumber] = useState();
    const [privateKey,setPrivateKey] = useState();
    const [otp,setOTP]= useState();
    const [password,setPassword] = useState();
    const handleMobileNumberChange = (e) => {
      setMobileNumber(e.target.value);
    };

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
        // api call
    
        const queryParams = new URLSearchParams({
            mobile_no: mobileNumber,
            pk_json: JSON.stringify(encryptedJson),
            public_key: encryptedJson.address,
            otp,
          }).toString();

    try {
        const response = await fetch(
          `http://104.198.221.136:8080/register?${queryParams}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // Add body content if needed, or leave empty
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          cookies.set("pk_json", encryptedJson)
          console.log("Success:", data);
          alert("Form submitted successfully!");
        } else {
          console.error("Error:", response.statusText);
          alert("Failed to submit form.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
      }
    };
    return(

        <div style={{  alignItems: "center", gap: "10px", display:"grid" }}>
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
      {/* Private key */}
      <p>Enter private key:</p>
      <input
        type="text"
        placeholder="Enter private key"
        value={privateKey}
        onChange={handlePrivateKeyChange}
        style={{ padding: "8px", fontSize: "14px" }}
      />

       {/* Private key */}
       <p>Set password</p>
      <input
        type="text"
        placeholder="Set password"
        value={password}
        onChange={handlePassword}
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

    )
}

export default RegisterUser;