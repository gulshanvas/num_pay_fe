import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Cookies from 'universal-cookie';
import { odysseyTestnet } from 'viem/chains';
import { eip7702Actions } from 'viem/experimental';
import { createPublicClient, createWalletClient, encodeFunctionData, formatEther, http, parseEther } from 'viem';
import { privateKeyToAccount } from "viem/accounts";
import { BASE_URL } from "./constants";
// eslint-disable-next-line no-undef
BigInt.prototype.toJSON = function () { return this.toString() }

const batchCallAbi = [
    {
      "type": "function",
      "name": "execute",
      "inputs": [
        {
          "name": "calls",
          "type": "tuple[]",
          "internalType": "struct BatchCallDelegation.Call[]",
          "components": [
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "to",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    }
  ]
  
  const abi = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_name",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_symbol",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_decimals",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "_initialSupply",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "spender",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {
          "name": "spender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "burn",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint8",
          "internalType": "uint8"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "mint",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "spender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    }
  ]
const contractAddress = "0x654F42b74885EE6803F403f077bc0409f1066c58"

const TransferPage = () => {
  const [receiverMobileNumber, setReceiverMobileNumber] = useState("");
const [amount,setAmount] = useState();
const [password,setPassword] = useState();
const [message, setMessage] = useState(""); 
const [txHash, setTxHash] = useState(null); // To store transaction hash
const [blockNumber, setBlockNumber] = useState(null); // To store block number
const [balance, setBalance] = useState(); // Set balance dynamically based on your logic

useEffect(() => {
  // Simulate fetching balance (replace with actual API/blockchain call)
  const fetchBalance = async () => {
    const userBalance = "1000"; 
    
    let APIResponse;
let instantUserBalance;
    try {
      
    const cookies = new Cookies();
    const mobile_number= cookies.get("mobileNumber");
    console.log("Modile number in user",mobile_number)
let getMobileResponse;
let userPublicKey;
    try {
      const response = await fetch(
        `${BASE_URL}/mobile/${mobile_number}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
         // body: JSON.stringify({}), // Add body content if needed, or leave empty
        }
      );

      if (response.ok) {
        getMobileResponse = await response.json();
        console.log("This is data ",getMobileResponse)
        userPublicKey= "0x"+getMobileResponse.data.publicKey;
      } else {
        console.error("Error:", response.statusText);
      
      }
    } catch (error) {
      console.error("Error:", error);
    }
    if(!userPublicKey){return;}
console.log("Retrived public key", userPublicKey)
      const response = await fetch(
        `${BASE_URL}/erc20_balance/${userPublicKey}`,
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
        console.log("This is api response ",APIResponse)
          instantUserBalance = formatEther( APIResponse.data.balance);

        console.log("This is instant user balance  ",instantUserBalance)
        }
        else {
        console.error("Error:", response.statusText);
      
      }
    } catch (error) {
      console.error("Error:", error);
      
    }

    setBalance(instantUserBalance);
  };

  fetchBalance();
}, []);
const handlePassword=(e) =>{
  setPassword(e.target.value);
}

  const handleReceiverMobileNumberChange = (e) => {
    setReceiverMobileNumber(e.target.value);
    console.log(receiverMobileNumber);
  };
   
const handleDummySubmit = async()=>{
  console.log("This is receiver mobile number    ",receiverMobileNumber)
}
 
  const handleSubmit = async() => {
    //API
    
    console.log("This is the password  ",password);
    console.log("This is the amount  ",amount);
    const parsedAmount = parseEther(amount);

    console.log("This is receiver mobile number    ",receiverMobileNumber)
let APIResponse;
let receiverPublicKey;
    try {
      const response = await fetch(
        `${BASE_URL}/receiver-mobile/${receiverMobileNumber}`,
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
        console.log("This is api response ",APIResponse)
          receiverPublicKey = APIResponse.data.publicKey;
        if(APIResponse.data){console.log("user existed")}else{console.log("User doesnt exist")}
      } else {
        console.error("Error:", response.statusText);
      
      }
    } catch (error) {
      console.error("Error:", error);
      
    }

    //END

    //Receivers mobile number => call API to fetch public key
    //Ask User's password
    //
    
    console.log("This is number ===> ", receiverMobileNumber);
    // console.log(mobileNumber);
    console.log(amount);
    const cookies = new Cookies();
    let pk_json =cookies.get("pk_json");
    const mobile_number= cookies.get("mobileNumber")
    console.log("This is pk_json",pk_json)
    if(!pk_json){
let APIResponse;
      try {
        const response = await fetch(
          `${BASE_URL}/mobile/${mobile_number}`,
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
          pk_json =JSON.parse(APIResponse.data.pkJSON)

          console.log("This is pkjson  ",pk_json)
        } else {
          console.error("Error:", response.statusText);
        
        }
      } catch (error) {
        console.error("Error:", error);
      }

    }

    const web3 = new Web3()
    const retrievedObject = await web3.eth.accounts.decrypt(pk_json,password);// TO DO => accept password from user
   const privateKey=retrievedObject.privateKey;
   console.log("Thsi is private key",privateKey);
   const walletClientCreator = privateKeyToAccount(privateKey);

    const publicClient = createPublicClient({
    account: walletClientCreator,
    chain: odysseyTestnet,
    transport: http("https://odyssey.ithaca.xyz")
  })
  
  const walletClient = createWalletClient({
    account: walletClientCreator,
    chain: odysseyTestnet,
    transport: http("https://odyssey.ithaca.xyz")
  }).extend(eip7702Actions())

 
  
const authorization = await walletClient.signAuthorization({ contractAddress, delegate: "0xbA1c4e29714F4618215441BC3e9629054857b529" });//TO DO=> Delegate address
console.log("This is authorization list ",authorization)
  const tokenContract = "0xb9A3C6197b864B8d49Ef86894249B952Cbae1e34" //TO DO=> Token contract
  const receiverHexAddress = "0x"+receiverPublicKey;
  console.log("This is extracted address   ",receiverHexAddress)
  const transferTxEncodedData = encodeFunctionData({ address: tokenContract, abi, functionName: "transfer", args: [receiverHexAddress, parsedAmount] })//TO DO=> Receiver address, transfer amount
  const txData = encodeFunctionData({
    abi: batchCallAbi,
    functionName: 'execute',
    args: [
      [
        {
          data: transferTxEncodedData,
          to: tokenContract,
          value: "0",
        },
      ],
    ]
  })

  const queryParams = new URLSearchParams({
    authorization_list: JSON.stringify(authorization),
    encoded_data: txData,

    to: walletClient.account.address,
   
  }).toString();
  let transferAPIResponse;
try {
const response = await fetch(
  `${BASE_URL}/transfer?${queryParams}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}), // Add body content if needed, or leave empty
  }
);
let instantUserBalance;
if (response.ok) {
  transferAPIResponse = await response.json();
  console.log("Success:", transferAPIResponse);

  setTxHash(transferAPIResponse.data.transactionHash)
  setBlockNumber(transferAPIResponse.data.blockNumber)
  //Star6t

  const erc20response = await fetch(
    `${BASE_URL}/erc20_balance/${walletClient.account.address}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
     // body: JSON.stringify({}), // Add body content if needed, or leave empty
    }
  );
  if (erc20response.ok) {
    APIResponse = await erc20response.json();
    console.log("This is api response ",APIResponse)
      instantUserBalance = formatEther( APIResponse.data.balance);

    console.log("This is instant user balance  ",instantUserBalance)
    }

    setBalance(instantUserBalance);

  //end
} else {
  console.error("Error:", response.statusText);
}
} catch (error) {
console.error("Error:", error);
}
  
  /*
  const transactionPrepared = await walletClient.prepareTransactionRequest({
    // value: "12000000000000000000",
    // account: delegateAccount,
    account: "0xbA1c4e29714F4618215441BC3e9629054857b529",
    authorizationList: [authorization],
    // account: walletClient.
    data: encodeFunctionData({
      abi: batchCallAbi,
      functionName: 'execute',
      args: [
        [
          {
            data: transferTxEncodedData,
            to: tokenContract,
            value: "0",
          },
          // {
          //   data: '0x',
          //   to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
          //   value: "15000000000000000000",
          // },
        ],
      ]
    }),
    to: walletClient.account.address,
  })
   
  //console.log("This si transaction prepared",JSON.stringify(transactionPrepared))

  const serializedData = JSON.stringify(transactionPrepared, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );

  console.log("This is transaction prepared",serializedData)

  const signedTransactionPrepared = await walletClient.signTransaction(transactionPrepared);

  console.log("This signed transaction prepared",JSON.stringify(signedTransactionPrepared));


  //Backend Call

  const queryParams = new URLSearchParams({
    receiver_address:"",
    amount,
    signed_tx:"",
    from_mobile_number:"",
 
  }).toString();

try {
const response = await fetch(
  `http://104.198.221.136:8080/transfer?${queryParams}`,
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
*/
};

  const handleAmountChange=(e)=>{
    setAmount(e.target.value);
  }
  return (
  
    <div style={{display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f4f4", /* Optional: Background color for contrast */
    }}>
  <div className="App-header" style ={{ 
    width: "100%",
    backgroundColor: "blueviolet",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    borderRadius: "40%",
  }}>
    <div style={{ display: "grid", alignItems: "center", gap: "10px" }}>
       
      {/* Mobile Number Input */}
      <p>Enter Receiver's Mobile Number:</p>
      <input
        type="tel"
        placeholder="Enter Receiver's mobile number with country code"
        value={receiverMobileNumber}
        onChange={handleReceiverMobileNumberChange}
        style={{ padding: "8px", fontSize: "14px" }}
      />

<p>Enter the amount you want to transfer:</p>
      <input
        type="tel"
        placeholder="Amount "
        value={amount}
        onChange={handleAmountChange}
        style={{ padding: "8px", fontSize: "14px" }}
      />

<p>
            <strong>Balance:</strong> {balance}
          </p>


   <p>Set password:</p>
      <input
        type="password"
        placeholder="Set password"
        value={password}
        onChange={handlePassword}
        style={{ padding: "8px", fontSize: "14px" }}
      />

<button
        onClick={handleSubmit
        }
        style={{
          padding: "9px 17px",
          backgroundColor: "orange",
          color: "white",
          border: "none",
          fontWeight: "bold",
          fontSize: "17px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
      {message}{" "}
            {txHash && blockNumber && (
              <>
                <a
                  href={`https://odyssey-explorer.ithaca.xyz/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "orange" }}
                >
                  {txHash}
                </a>{" "}
                is Transaction Hash in block number{" "}
                <a
                  href={`https://odyssey-explorer.ithaca.xyz/block/${blockNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "orange" }}
                >
                  {blockNumber}
                </a>
              </>
            )}
  
    </div>
    </div>
    </div>
  );
};

export default TransferPage;
