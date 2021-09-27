import React from 'react';
import TreemapMovieSales from './TreeMaps/TreemapMoviesSales';

export default function MovieSalesMap() {
  return (
    <div className='App'>
      <TreemapMovieSales width={1000} height={800} />
    </div>
  );
}
