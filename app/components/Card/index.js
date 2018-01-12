import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Card ({ children, heading, className }) {
  return (
    <div className={`card ${className}`}>
      <h2 className="heading">{heading}</h2>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
};
