//Podcast result component

const PodcastResult = (props) => {
  function removeTags(str) {
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  function removeLinks(str) {
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/Support this podcast: https:/gi, "");
  }
  return (
    <section className="podcastResult">
      <div className="wrapper">
        {/* Display the section only if we have a results. If no result but the search was not empty, then I display the error message */}
        {(props.podcastList.length === 0 && props.search.trim() !== "") ||
        props.podcastList.length !== 0 ? (
          <>
            <p className="sectionTitle"> <span>Step 3: </span>Select your podcast! Click on the title to get more infos!</p>
            <p>{props.message}</p>
            <ul>
              {props.podcastList.map((list) => {
                // Using math to get the length in minutes
                const lengthInMin = Math.round(list.audio_length_sec / 60);
                const newDescription = removeTags(list.description_original);
                return (
                  <li key={list.id}>
                    <div className="title">
                    <h3>
                      <a href={list.website} target="_blank">
                        {list.title_original}
                      </a>
                    </h3>
                  
                    <p className="length">{lengthInMin} min</p>
                    </div>
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
