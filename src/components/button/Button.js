import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ text, float, onClick, className }) => {
  const floatBtn = float ? 'float' : '';

  return (
    <button className={`btn ${floatBtn} ${className}`} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  float: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  text: '+',
  float: false
};

export default Button;
