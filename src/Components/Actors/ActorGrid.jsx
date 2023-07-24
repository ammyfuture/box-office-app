import ActorCard from './ActorCards';

const ActorsGrid = ({ actors }) => {
  return (
    <div>
      {actors.map(data => (
        <ActorCard
          key={data.person.id}
          name={data.person.name}
          country={data.person.country ? data.person.country.name : null}
          birthday={data.person.birthday}
          deathday={data.person.deathday}
          gender={data.person.gender}
          image={
            data.person.image ? data.person.image.medium : '/not-found-img.png'
          }
          summary={data.person.summary}
          id={data.person.id}
        />
      ))}
    </div>
  );
};

export default ActorsGrid;
