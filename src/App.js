import { useState, useEffect } from 'react';
import * as d3 from 'd3';

import './App.css';

export default function App() {
  const [kickStarterPledges] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'
  );
  const [movieSales] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
  );
  const [videoGameSales] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
  );
  let dataKickStarter;

  useEffect(() => {
    d3.json(movieSales).then((data, error) => {
      if (error) {
        console.log(data);
      } else {
        dataKickStarter = data.children.children;
        console.log(dataKickStarter);
      }
    });
  }, []);
  return <div className='App'></div>;
}
