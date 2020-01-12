import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import Card from '../../components/card';
import { ROUTING, STORAGE } from './../../constants';

import './Home.scss';

const Home = () => {
  const photoCollection = JSON.parse(localStorage.getItem(STORAGE.CARD_HOLDERS));
  return (
    <>
      <section className="cards-wrapper">
        {photoCollection && photoCollection.photos.map((images, index) => <Card key={index} images={images} />)}
      </section>
      <Link to={`${ROUTING.CAMERA}`}>
        <Button float={true} />
      </Link>
    </>
  );
};

export default Home;
