import React from "react";

const AlertMessage = ({ message, type }) => {
  // Inline styles for different alert types
  const alertStyles = {
    base: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      textAlign: "center",
      fontSize: "16px",
      borderRadius: "5px",
      fontWeight: "bold",
    },
    error: {
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      color: "red",
      border: "1px solid red",
    },
    warning: {
      backgroundColor: "rgba(255, 165, 0, 0.1)",
      color: "orange",
      border: "1px solid orange",
    },
    success: {
      backgroundColor: "rgba(0, 128, 0, 0.1)",
      color: "green",
      border: "1px solid green",
    },
  };

  // Combine base styles with type-specific styles
  const alertStyle = { ...alertStyles.base, ...alertStyles[type] };

  return <div style={alertStyle}>{message}</div>;
};

export default AlertMessage;
