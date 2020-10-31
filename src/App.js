import React, { useState, useEffect } from 'react';
import api from "./services/api";
import './App.css';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/header/index';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return (
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData && (
        <FeaturedMovie item={featuredData} />
      )}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      <footer className="footer">
        <span className="linkedin">Linkedin: <a href="https://www.linkedin.com/in/thales-henrique-pb"> Thales Henrique</a></span>
        <div>Direitos de imagem para Netflix</div>
        Dados pegos do site Themoviedb.org 
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando"/>
        </div>
      )}
    </div>
  );
}