//Component that show travel length and ask user to select his travel mode

const TravelResult = (props) => {
  return (
    <section className="travelResult">
      <div className="wrapper">
     
        {props.walk && props.bike && props.drive && props.walk !== "0" && props.bike !== "0" && props.drive !== "0"? (
          <>
            <h3>Travel result</h3>
            <p>Here's your walking time : {props.walk}</p>
            <p>Here's your biking time : {props.bike}</p>
            <p>Here's your driving time : {props.drive}</p>
            <p>
              Select an option to get a podcast that match your travel length
            </p>
            <button>Let's walk!</button>
            <button>Let's bike!</button>
            <button>Let's drive!</button>
          </>
        ) : null }
      </div>
    </section>
  );
};
export default TravelResult;
