//Podcast from component

const PodcastForm = () => {
  return (
    <>
      <label htmlFor="podcast"></label>
      <input
        id="podcast"
        type="text"
        placeholder="Search for type of podcast (i.e 'cooking' or 'raptors)'"
      />
    </>
  );
};

export default PodcastForm;
