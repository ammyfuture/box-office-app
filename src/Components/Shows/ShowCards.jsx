import { Link } from 'react-router-dom';
const ShowCards = ({ name, image, summary, id }) => {
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
        <Link to={`show/${id}`}>Read More</Link>
        <button type="button">Star me</button>
      </div>
    </div>
  );
};

export default ShowCards;
