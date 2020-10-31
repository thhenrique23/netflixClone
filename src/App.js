import React, { useState, useEffect } from 'react';
import api from "./services/api";
import './App.css';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await api.getHomeList();
      setMovieList(list);

      let originals = list.filter(item => 'originals' == item.slug),
      randomOriginals = Math.floor(Math.random() * (originals[0].items.results.length - 1)),
      chosen = originals[0].items.results[randomOriginals],
      chosenInfo = await api.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, [])

  return (
    <div className="page">

      {featuredData && (
        <FeaturedMovie item={featuredData} />
      )}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}