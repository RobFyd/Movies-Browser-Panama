import {
  Poster,
  MainInfo,
  Wrapper,
  Title,
  Year,
  Genres,
  Genre,
  Rating,
  Star,
  Value,
  Votes,
} from "./styled";
import noPoster from "../../images/Movie.png";
import star from "../../images/Star.png";
import { useSelector } from "react-redux";
import { selectGenres } from "../../features/moviesSlice";

const securyBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w300";


export const MovieTile = ({ genre_ids, poster_path, title, release_date, vote_average, vote_count }) => {
  
  const genres = useSelector(selectGenres);

  return (
    <Wrapper>
      <Poster
        src={poster_path ? `${securyBaseUrl}${posterSize}${poster_path}` : noPoster} alt="poster"
      />

      <MainInfo>
        <Title>
          {title ? title : null}
        </Title>
        <Year>
          {release_date ? release_date.slice(0, 4) : null}
        </Year>
        <Genres>
          {genre_ids.map((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            return <Genre key={genreId}>{genre ? genre.name : "Nieznany gatunek"}</Genre>;
          })}
        </Genres>
      </MainInfo>

      <Rating>
        <Star src={star} alt="star" />
        <Value>
          {vote_average ? vote_average : null}
        </Value>
        <Votes>
          {vote_count ? vote_count : null} votes
        </Votes>
      </Rating>
    </Wrapper>
  );
};
