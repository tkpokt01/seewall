import PropTypes from "prop-types";

function MessageList({ messages }) {
    return (
        <div id="messages">
            {messages.map((message, index) => (
                <div key={index}>
                    <strong>{message.sender}</strong>: {message.content}
                </div>
            ))}
        </div>
    );
}

// Add PropTypes validation
MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            sender: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
};

// Optional: Define default props
MessageList.defaultProps = {
    messages: [],
};

export default MessageList;