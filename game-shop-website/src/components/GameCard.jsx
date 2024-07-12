/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";

import "./gameCard.css";
import GameRating from "./GameRating";
import { AppContext } from "../App";

function GameCard({ game }) {
  const { library, setLibrary, bag, setBag } = useContext(AppContext);
  const [isClicked, setIsClicked] = useState(false);
  const [description, setDescription] = useState(null);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleAddToLibrary = (game) => {
    setLibrary([...library, game]);
  };

  const handleRemoveFromLibrary = (game) => {
    setLibrary([...library, game]);
    setLibrary(library.filter((item) => item._id !== game._id));
  };

  const handleAddToBag = (game) => {
    if (bag.includes(game)) return;
    setBag([...bag, game]);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    setDescription(isClicked ? null : game.description);
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="gameCard">
        {isContentVisible && (
          <img src={game.img} alt={game.title} className="img-fluid" />
        )}
        {isContentVisible &&<a
          href="#"
          className={`like ${library.includes(game) ? "active" : undefined}`}
          onClick={
            library.includes(game)
              ? () => handleRemoveFromLibrary(game)
              : () => handleAddToLibrary(game)
          }
        >
          <i className="bi bi-heart-fill"></i>
        </a>}
        {isContentVisible && (
          <div className="gameFeature">
            <span className="gameType">{game.level}</span>
            <GameRating rating={game.rating} />
          </div>
        )}
        <h4 className="gameTitle mt-4 mb-3">{game.title}</h4>
        <div className="viewMore">
          <div className="desc1">{description}</div>
          

          <button  onClick={handleClick}>{isClicked?"Back":"view more"}</button>
        </div>

        <div className="gamePrice">
          {game.discount !== 0 && (
            <>
              {isContentVisible && (
                <span className="discount">
                  <i>{game.discount * 100}%</i>
                </span>
              )}
              {isContentVisible && (
                <span className="prevPrice">${game.price.toFixed(2)}</span>
              )}
            </>
          )}
          {isContentVisible && (
            <span className="currentPrice">
              ${((1 - game.discount) * game.price).toFixed(2)}
            </span>
          )}
        </div>
        {isContentVisible && <a className="addBag" href="#" onClick={() => handleAddToBag(game)}>
          <i className="bi bi-bag-plus-fill"></i>
          
        </a>}
      </div>
    </div>
  );
}

export default GameCard;
