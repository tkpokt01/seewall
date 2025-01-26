import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function MessageList({ messages }) {
    return (
        <div id="messages" style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} style={{ marginBottom: "10px" }}>
                        <strong>{message.sender}</strong>: {message.content}
                    </div>
                ))
            ) : (
                <p>No messages to display.</p>
            )}
        </div>
    );
}

// Add PropTypes validation
MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired, // Unique identifier for each message
            sender: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
};

function App() {
    const [messages, setMessages] = useState([]);

    // Simulate real-time updates with new messages
    useEffect(() => {
        const interval = setInterval(() => {
            const newMessage = {
                id: `${Date.now()}`, // Unique ID
                sender: `User${Math.floor(Math.random() * 10)}`, // Random sender
                content: `Message at ${new Date().toLocaleTimeString()}`,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }, 2000); // Add a new message every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
            <h1>Chat Messages</h1>
            <MessageList messages={messages} />
        </div>
    );
}

export default App;