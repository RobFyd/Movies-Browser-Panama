import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Genres from "../../common/Genres";
import Genre from "../../common/Genre";
import {
  MoviePage,
  MovieSection,
  BigPosterWithGradient,
  Poster,
  Info,
  Title,
  Year,
  ProductionAndRelease,
  StyledText,
  Rating,
  Value,
  Votes,
  Description,
  MainInfo,
  BigTitle,
  TopRating,
  TopStar,
  TopValue,
  TopSmallerText,
  TopVotes,
  SmallerText,
  PeopleList,
  StyledNavLink,
  Section,
} from "../movieDetails/styled";
import noPoster from "../../images/Movie.png";
import star from "../../images/Star.png";
import StyledStar from "../../common/StyledStar";
import { PersonTile } from "../../common/PersonTile";
import { fetchMovieDetails, selectMovieCreditsData, selectMovieDetailsData, selectMovieDetailsStatus } from "../movieDetailsSlice";
import { ErrorMessage } from "../../common/States/Error";
import { LoadingIcon } from "../../common/States/Loading";
import { useParams } from "react-router-dom";

const securyBaseUrl = "https://image.tmdb.org/t/p/";
const bigPosterSize = "original";
const posterSize = "w500";

const MovieDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const status = useSelector(selectMovieDetailsStatus);
  const movieDetails = useSelector(selectMovieDetailsData);
  const cast = useSelector(selectMovieCreditsData).cast;
  const crew = useSelector(selectMovieCreditsData).crew;

  useEffect(() => {
    if (location.includes("movies/"))
      dispatch(fetchMovieDetails(id));
  }, [dispatch, location, id]);

  switch (status) {
    case "error":
      return (
        <ErrorMessage />
      );
    case "loading":
      return (
        <LoadingIcon />
      );
    case "success":
      return movieDetails.status_message ? (
        <ErrorMessage />
      ) : (
        <>
          <MoviePage>
            <BigPosterWithGradient>
              <img
                src={movieDetails.backdrop_path ?
                  `${securyBaseUrl}${bigPosterSize}${movieDetails.backdrop_path}` : null
                }
                alt="bigPoster"
              />
              <MainInfo>
                <BigTitle>
                  {movieDetails.title ? movieDetails.title : null}
                </BigTitle>
                <TopRating>
                  <TopStar>
                    <img src={star} alt="star" />
                  </TopStar>
                  <TopValue>
                    {movieDetails.vote_average ?
                      (movieDetails.vote_average).toFixed(1) : null
                    }
                    <TopSmallerText> /10</TopSmallerText>
                  </TopValue>
                </TopRating>
                <TopVotes>
                  {movieDetails.vote_count ? movieDetails.vote_count : null} votes
                </TopVotes>
              </MainInfo>
            </BigPosterWithGradient>

            <MovieSection>

              <Poster src={movieDetails.poster_path ?
                `${securyBaseUrl}${posterSize}${movieDetails.poster_path}` : noPoster
              } />

              <Info>
                <Title>
                  {movieDetails.title ? movieDetails.title : null}
                </Title>

                <Year>
                  {movieDetails.release_date ?
                    movieDetails.release_date.slice(0, 4) : null
                  }
                </Year>

                <ProductionAndRelease>
                  <StyledText>Production: </StyledText>
                  {movieDetails.production_countries ?
                    (movieDetails.production_countries).map((country) => (
                      <span key={country.name}>{country.name}, </span>
                    )) : null
                  }
                  <br />
                  <StyledText>Release date: </StyledText>
                  {movieDetails.release_date ?
                    `${(movieDetails.release_date).slice(8, 10)}.${(movieDetails.release_date).slice(5, 7)}.${(movieDetails.release_date).slice(0, 4)}`
                    : null
                  }
                </ProductionAndRelease>

                <Genres>
                  {movieDetails.genres ?
                    (movieDetails.genres).map((genre) => (
                      <Genre key={genre.name}>{genre.name}</Genre>
                    )) : null
                  }
                </Genres>

                <Rating>
                  <StyledStar>
                    <img src={star} alt="star" />
                  </StyledStar>

                  <Value>
                    {movieDetails.vote_average ?
                      (movieDetails.vote_average).toFixed(1) : null
                    }
                  </Value>

                  <SmallerText>
                    / 10
                  </SmallerText>

                  <Votes>
                    {movieDetails.vote_count ? movieDetails.vote_count : null} votes
                  </Votes>
                </Rating>
              </Info>

              <Description>
                {movieDetails.overview ? movieDetails.overview : null}
              </Description>
            </MovieSection>

            <Section>
              <Title>Cast</Title>
            </Section>
            
            <PeopleList>
              {cast.map((actor) => (
                <StyledNavLink key={actor.id} to="/personDetails">
                  <PersonTile
                    name={actor.name}
                    profile_path={actor.profile_path}
                    id={actor.id}
                    additionalContent={actor.character}
                  />
                </StyledNavLink>
              ))}
            </PeopleList>

            <Section>
              <Title>Crew</Title>
            </Section>
            
            <PeopleList>
              {crew.map((person) => (
                <StyledNavLink key={person.id} to="/personDetails">
                  <PersonTile
                    name={person.name}
                    profile_path={person.profile_path}
                    id={person.id}
                    additionalContent={person.job}
                  />
                </StyledNavLink>
              ))}
            </PeopleList>
          </MoviePage>
        </>
      );
    default:
      return (
        <ErrorMessage />
      );
  }
};

export default MovieDetails;
