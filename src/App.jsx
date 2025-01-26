import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MessageList from "./components/MessageList";
import retona16 from "./assets/retona16.png"; // Adjust the path as needed
import "./styles.css";

alert("Hello, World!");
const contractAddress = "0xA3Bd22f59065D49dA39C7b99C3BD0D5f3DcA93F8"; // Replace with your contract address
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

const provider = new ethers.providers.JsonRpcProvider("https://rpc.overprotocol.com");
const contract = new ethers.Contract(contractAddress, abi, provider);

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function loadMessages() {
            try {
                alert("Loading messages...");
                const messageCount = await contract.getMessageCount();
                alert("Message count: " + messageCount);
                const loadedMessages = [];

                for (let i = 0; i < messageCount; i++) {
                    const [sender, content] = await contract.getMessage(i);
                    loadedMessages.push({ sender, content });
                }
                
                alert("Messages loaded: " + loadedMessages.length);

                setMessages(loadedMessages);
            } catch (error) {
                alert("Error loading messages:", error);
            }
        }

        loadMessages();
    }, []);

    return (
        <div className="background-image" style={{ backgroundImage: `url(${retona16})` }}>
        <div className="background-image">
            <div className="messages-box">
                <h1>Wall Messages</h1>
                <MessageList messages={messages} />
            </div>
        </div>
        </div>
    );
}

export default App;