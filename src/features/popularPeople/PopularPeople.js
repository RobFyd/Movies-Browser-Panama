import {
  Wrapper,
  Header,
  PeopleList,
  Item,
  Tile,
  Poster,
  Title,
  StyledNavLink,
} from "./styled";
import { Pagination } from "../../common/Pagination";
import { PersonTile } from "../../common/PersonTile";

const PopularPeople = () => {
  return (
    <>
      <Wrapper>
        <Header>Popular people</Header>
        <PeopleList>
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
          <PersonTile />
        </PeopleList>
        <Pagination />
      </Wrapper>
    </>
  );
};

export default PopularPeople;
