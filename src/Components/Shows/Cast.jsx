const Cast = ({ cast }) => {
  return (
    <div>
      {cast.map(({ person, character, voice }) => (
        <div key={character.id}>
          <div>
            <img
              src={person.image ? person.image.medium : '/not-found-img.png'}
            />
          </div>
          <div>
            {' '}
            {person.name} - {character.name} {voice ? -'Voice over' : ''}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cast;
