import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';
import './main.css';
import Header from './Header';
import SideMenu from '../components/SideMenu';
import Home from './Home';
import Categories from './Categories';
import MyLibrary from './MyLibrary';
import Bag from './Bag';

function Main() {
  const { library, bag } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);

  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const bagRef = useRef();

  const sections = [
    {
      name: 'home',
      ref: homeRef,
      active: true,
    },
    {
      name: 'categories',
      ref: categoriesRef,
      active: false,
    },
    {
      name: 'library',
      ref: libraryRef,
      active: false,
    },
    {
      name: 'bag',
      ref: bagRef,
      active: false,
    },
  ];

  const handleToggleActive = () => {
    setActive(!active);
  };

  const handleSectionActive = target => {
    sections.map(section => {
      section.ref.current.classList.remove('active');
      if (section.ref.current.id === target) {
        section.ref.current.classList.add('active');
      }
      return section;
    });
  };

  const fetchData = () => {
    fetch('http://localhost:3000/api/gamesData.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [abcData, setabcData] = useState(null);

  const handleNavSecOnClick = (value1 ,value2) => {
     setabcData({value1 ,value2});

  };

  return (
    <main>
      <SideMenu active={active} sectionActive={handleSectionActive} abcData={abcData} />
      <div className={`banner ${active ? 'active' : undefined}`}>
        <Header toggleActive={handleToggleActive} sectionNavActive={handleNavSecOnClick} />
        <div className="contain-fluid">
          {games && games.length > 0 && (
            <Home games={games} reference={homeRef} sectionNavActiveH={handleNavSecOnClick} />
          )}
          {games && games.length > 0 && (
            <Categories games={games} reference={categoriesRef} />
          )}
          {games && games.length > 0 && (
            <MyLibrary games={library} reference={libraryRef} />
          )}
          {games && games.length > 0 && <Bag games={bag} reference={bagRef} />}
        </div>
      </div>
    </main>
  );
}

export default Main;
