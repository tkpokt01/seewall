import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MessageList from "./components/MessageList";


//import retona16 from "./assets/retona16.png"; // Adjust the path as needed
import "./styles.css";

//alert("Hello, World!");
const contractAddress = "0xa3bd22f59065d49da39c7b99c3bd0d5f3dca93f8"; // Replace with your contract address
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "name": "MessageWritten",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getMessage",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMessageCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "messages",
        "outputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            }
        ],
        "name": "writeMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];



function App() {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    // Initialize provider and contract
    useEffect(() => {
        async function initialize() {
            try {
                // Initialize provider (no signer needed for read-only operations)
                //const provider = new ethers.providers.JsonRpcProvider("https://rpc.overprotocol.com");
                const provider = new ethers.BrowserProvider(window.ethereum);
                
                // Initialize contract
                const contract = new ethers.Contract(contractAddress, abi, provider);

                // Load all messages
                loadMessages(contract);

            } catch (error) {
                alert("Error initializing:", error);
                setError("Failed to connect to the Ethereum network. Please check your connection.");
            }
        }

        initialize();
    }, []);

    // Fetch all messages from the contract
    async function loadMessages(contract) {
        try {
            const messageCount = await contract.getMessageCount();
            const loadedMessages = [];
    
            for (let i = 0; i < messageCount; i++) {
                const [sender, content] = await contract.getMessage(i);
                
                // Regular expression to detect URLs
                const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
    
                // Exclude messages containing URLs
                if (!urlPattern.test(content)) {
                    loadedMessages.push({ sender, content });
                }
            }
            
            // Reverse the array to display newest first
            loadedMessages.reverse();

            setMessages(loadedMessages);
        } catch (error) {
            console.error("Error loading messages:", error);
            setError("Failed to load messages. Please try again.");
        }
    }


    return (
       
            <div className="messages-box">
                <h1>Wall Messages</h1>
                {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
                <MessageList messages={messages} />
            </div>
       
    );
}

export default App;