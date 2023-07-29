import { useStarredShow } from '../lib/useStarredShows';
const Starred = () => {
  const [starredShow] = useStarredShow();
  return <div>{starredShow.length}</div>;
};
export default Starred;
