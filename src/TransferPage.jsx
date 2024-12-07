import React, { useState } from "react";
import Web3 from "web3";
import Cookies from 'universal-cookie';
import { odysseyTestnet } from 'viem/chains';
import { eip7702Actions } from 'viem/experimental';
import { createPublicClient, createWalletClient, encodeFunctionData, http, parseEther } from 'viem';
import { privateKeyToAccount } from "viem/accounts";


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
  const [mobileNumber, setMobileNumber] = useState("");
const [amount,setAmount] = useState();

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
    console.log(mobileNumber);
  };
   


  const handleSubmit = async() => {
    //API
    //Receivers mobile number => call API to fetch public key
    //Ask User's password
    //
    console.log("This is number ===> ", mobileNumber);
    // console.log(mobileNumber);
    console.log(amount);
    const cookies = new Cookies();
    const pk_json =cookies.get("pk_json");
    console.log("This is pk_json",pk_json)

    const web3 = new Web3()
    const retrievedObject = await web3.eth.accounts.decrypt(pk_json,'1234');// TO DO => accept password from user
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

  const tokenContract = "0xb9A3C6197b864B8d49Ef86894249B952Cbae1e34" //TO DO=> Token contract
  const transferTxEncodedData = encodeFunctionData({ address: tokenContract, abi, functionName: "transfer", args: ["0xD593EE741824fD627a9a888294547a5CA5AbF8fB", parseEther("0.001")] })//TO DO=> Receiver address, transfer amount
  
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

};

  const handleAmountChange=(e)=>{
    setAmount(e.target.value);
    console.log(amount);
  }
  return (<div className="App-header">
    <h2 > Transfer Page</h2>
    <div style={{ display: "grid", alignItems: "center", gap: "10px" }}>
       
      {/* Mobile Number Input */}
      <p>Enter Receiver's Mobile Number:</p>
      <input
        type="tel"
        placeholder="Enter Receiver's mobile number"
        value={mobileNumber}
        onChange={handleMobileNumberChange}
        style={{ padding: "8px", fontSize: "14px" }}
      />

<p>Enter the amount you want to transfer</p>
      <input
        type="tel"
        placeholder="Amount "
        value={amount}
        onChange={handleAmountChange}
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

export default TransferPage;