import React from "react";
import PropTypes from "prop-types";
import "../../css/card.css";
import "../../css/global.css";


const Card = ({ children, className }) => {
  return (
    <div className={`card ${className}`}> 
      {children}
    </div>
  );
};

const CardContent = ({ children, className }) => {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: "",
};

CardContent.defaultProps = {
  className: "",
};

export { Card, CardContent };
