import React, { useState } from "react";

const MobileNumberInput = () => {
  const [mobileNumber, setMobileNumber] = useState("");


  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };
  
  const handleSubmit = () => {
    //API
    console.log("This is number ===> ", mobileNumber);
    // console.log(mobileNumber);
    const response ={
        
    "success": false,
    "message": "not present"
          
    }

    if(response.success ){console.log("already registered")}
    else {console.log("not registered")};

    alert(`Mobile Number: ${mobileNumber}`);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
  );
};

export default MobileNumberInput;
