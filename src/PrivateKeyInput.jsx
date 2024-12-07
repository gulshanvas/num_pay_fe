import React from "react";

const PrivateKeyInput=()=>{
return(
<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
{/* Private key Input */}
<p>Enter private Key:</p>
<input
  type="text"
 
  style={{ padding: "8px", fontSize: "14px" }}
/>
</div>
)}

export default PrivateKeyInput;