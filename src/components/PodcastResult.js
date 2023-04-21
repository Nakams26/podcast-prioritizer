//Podcast result component

const PodcastResult = (props) => {
  function removeTags(str) {
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  return (
    <section className="podcastResult">
      <div className="wrapper">
        {/* Display the section only if we have a results. If no result but the search was not empty, then I display the error message */}
        {(props.podcastList.length === 0 && props.search.trim() !== "") ||
        props.podcastList.length !== 0 ? (
          <>
            <h3>Podcast result</h3>
            <p>{props.message}</p>
            <ul>
              {props.podcastList.map((list) => {
                // Using math to get the length in minutes
                const lengthInMin = Math.round(list.audio_length_sec / 60);
                const newDescription = removeTags(list.description_original);
                return (
                  <li key={list.id}>
                    <h3>
                      <a href={list.website} target="_blank">
                        {list.title_original}
                      </a>
                    </h3>
                    duration : {lengthInMin} min
                    <div className="podInfo">
                      <div className="imgContainer">
                        <img
                          src={list.image}
                          alt={`Podcast logo for: ${list.title_original}`}
                        />
                      </div>
                      <p className="podDesc">{newDescription}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}
      </div>
    </section>
  );
};
export default PodcastResult;
