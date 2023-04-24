//Component that show travel length and ask user to select his travel mode

const TravelResult = (props) => {
  return (
    <section className="travelResult">

         <p>{props.message}</p>
        {props.walk && props.bike && props.drive && props.walk !== "0" && props.bike !== "0" && props.drive !== "0"? (
          <>
           <p> <span>Step 2: </span>Do you prefer to walk, bike or drive? We'll adjust the podcast list to match your travel length!</p>
            <p>Walking time : {props.walk}</p>
            <p>Biking time : {props.bike}</p>
            <p>Driving time : {props.drive}</p>
            <div className="button">
            <button onClick={(event)=>{
                props.userChoice(event, event.target.value)
            }} type="button" value="walk">Let's walk!</button>
            <button onClick={(event)=>{
                props.userChoice(event, event.target.value)
            }} type="button" value="bike">Let's bike!</button>
            <button onClick={(event)=>{
                props.userChoice(event, event.target.value)
            }} type="button" value="drive">Let's drive!</button>
            </div>
          </>
        ) : null }

    </section>
  );
};
export default TravelResult;
