// import { Link } from 'react-router-dom';
const ShowCards = ({ name, image, summary, id, onStarMeClick, isStarred }) => {
  const summaryStripped = summary
    ? summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')
    : 'No description';
  return (
    <div>
      <div>
        <img src={image} alt={name}></img>
      </div>
      <h3>{name}</h3>
      <p>{summaryStripped}</p>
      <div>
        <a href={`show/${id}`} target="_blank" rel="noreferrer">
          Read More
        </a>
        <button type="button" onClick={() => onStarMeClick(id)}>
          {isStarred ? 'Unstar' : 'Star'}
        </button>
      </div>
    </div>
  );
};

export default ShowCards;
