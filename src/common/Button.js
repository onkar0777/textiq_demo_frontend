import React from "react";
import "./Button.css";

function Button({ background, color, children, onClick }) {
  const btnStyle = {
    backgroundColor: background,
    color: color
  };
  return (
    <button onClick={onClick} style={btnStyle} className="Button">
      {children}
    </button>
  );
}

export default Button;
