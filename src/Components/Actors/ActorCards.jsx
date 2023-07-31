import { SearchCard, SearchImgWrapper } from '../common/SearchCard';

const ActorCard = ({ name, image, country, gender, birthday, deathday }) => {
  return (
    <SearchCard>
      <SearchImgWrapper>
        <img src={image} alt={name}></img>
      </SearchImgWrapper>
      <h3>
        {name} {!!gender && `(${gender})`}
      </h3>

      <p>{country ? `Comes from ${country}` : `No country found`}</p>
      {!!birthday && <p>{`Born ${birthday}`}</p>}
      <p>{deathday ? `Died ${deathday}` : `Alive`}</p>
    </SearchCard>
  );
};

export default ActorCard;
