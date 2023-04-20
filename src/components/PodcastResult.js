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
        {(props.podcastList.length ===0 && props.search !=="") || (props.podcastList.length !==0) ? (
          <>
            <h3>Podcast result</h3>
            <ul>
              <p>{props.message}</p>
              {props.podcastList.map((list) => {
                const lengthInMin = Math.round(list.audio_length_sec / 60);
                const newDescription = removeTags(list.description_original);
                return (
                  <li key={list.id}>
                    <h3>
                      <a href={list.website} target="_blank">
                        {" "}
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
            </ul>{" "}
          </>
        ) : null}
      </div>
    </section>
  );
};
export default PodcastResult;
