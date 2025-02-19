/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './home.css';
import GameSwiper from '../components/GameSwiper';
import GameCard from '../components/GameCard';

function Home({ games, reference,sectionNavActiveH }) {
  return (
    <section id="home" className="home active" ref={reference}>
      <div className="container-fluid">
        <div className="row">
          <GameSwiper games={games} sectionNavActiveH={sectionNavActiveH} />
        </div>
        <div className="row mb-4 mt-4 ">
          <div className="col-lg-6">
            <h2 className="sectionTitle">Games on promotion</h2>
          </div>
          <div className="col-lg-6 d-flex justify-content-end">
            <a className="viewMore" href="#" onClick={() => sectionNavActiveH(2,'categories')}>
              View More Games <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
        <div className="row cards">
          {games.slice(0, 4).map(game => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
