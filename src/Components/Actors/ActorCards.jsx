const ActorCard = ({ name, image, country, gender, birthday, deathday }) => {
  return (
    <div>
      <div>
        <img src={image} alt={name}></img>
      </div>
      <h3>
        {name} {!!gender && `(${gender})`}
      </h3>

      <p>{country ? `Comes from ${country}` : `No country found`}</p>
      {!!birthday && <p>{`Born ${birthday}`}</p>}
      <p>{deathday ? `Died ${deathday}` : `Alive`}</p>
    </div>
  );
};

export default ActorCard;
