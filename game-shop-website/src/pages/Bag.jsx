/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './bag.css';
import ShopBagItem from '../components/ShopBagItem';

function Bag({ games, reference }) {
  const [total, setTotal] = useState(0);
  const [gameNames, setGameNames] = useState([]);
  

  const handleTotalPayment = () => {
    let totalAmount = games
      .map(game => game.price * (1 - game.discount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      .toFixed(2);

    let names = games.map(game => game.title);
  

    setGameNames(names);

    return totalAmount;
  };

  useEffect(() => {
    setTotal(handleTotalPayment());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = 'enter your number';  // Replace with your actual phone number

    // Assuming you want to include game names in the message
    const message =`hello I liked this Games.. \nI Wants to purchase Them!\n\nGames:\n   - ${gameNames.join(',\n   - ')}\n\nTotal Amount: $${total}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  };
  return (
    <section id="bag" className="bag" ref={reference}>
      <div className="container-fluid">
        <div className="row mb-3">
          <h1>My Bag</h1>
        </div>
        {games.length === 0 ? (
          <h2>Your bag is empty</h2>
        ) : (
          <>
            <div className="row">
              <div class="table-responsive">
                <table className="shopBagTable table table-borderless align-middle ">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Preview</th>
                      <th scope="col">Game</th>
                      <th scope="col">Price</th>
                      <th scope="col">Discount</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>

                  <tbody>
                    {games.map((game, index) => (
                      <ShopBagItem index={index} key={game._id} game={game} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row d-flex justify-content-between mt-5">
              <div className="col-lg-2 align-items-center">
                <p className="itemCount">Total Items: {games.length}</p>
              </div>
              <div className="col-lg-10 d-flex justify-content-end">
                <div className="payment">
                  Total: ${total}
                  <a href="#" onClick={handleWhatsAppRedirect}>
                    Check out <i class="bi bi-wallet-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Bag;
