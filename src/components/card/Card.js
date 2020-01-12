import React from 'react';
// import PropTypes from 'prop-types';
import { sizes as camera } from './../../utils/camera';

import './Card.scss';

const Card = ({ images }) => {
  const [frontImage, backImage] = images;

  return (
    <figure className="card" style={{ height: camera.borderHeight, width: camera.borderWidth }}>
      <div className="flip">
        <div className="face front">
          <img src={frontImage} alt="" style={{ width: camera.borderWidth, height: camera.borderHeight }} />
        </div>
        <div className="face back">
          <img src={backImage} alt="" style={{ width: camera.borderWidth, height: camera.borderHeight }} />
        </div>
      </div>
    </figure>
  );
};

// Card.propTypes = {
//   image: PropTypes.string
// };

// Card.defaultProps = {};

export default Card;
