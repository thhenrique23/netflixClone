import React from 'react';
import './FeaturedMovie.css';

export default ({ item }) => {
  console.log(item);

  let firstDate = new Date(item.first_air_date),
      genres = item.genres.map(g => g.name).join(', ');

  return (
    <section className="featured" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
            <div className="featured--info">
                <div className="featured--points">{item.vote_average} pontos</div>
                <div className="featured--year">{firstDate.getFullYear()}</div>
                <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="featured--description">{item.overview}</div>
            <div className="featured--buttons">
                <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assiste</a>
                <a href={`/list/add/${item.id}`} className="featured--mylistbutton" >+ Minha Lista</a>
            </div>
            <featured className="featured--genres"><strong>Generos: </strong> {genres}</featured>
        </div>
      </div>
    </section>
  )
}
