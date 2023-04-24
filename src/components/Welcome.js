//Import router link for rerouting
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="welcomePage">
      <div className="wrapper flexWelcome">
        <div><h1>Podcast Prioritizer</h1>
        <p className="textWelcome">
          Are you going somewhere? Let us know your travel, we'll find a podcast
          for you!</p></div>
          <Link to="/podcast">
            <p className="link"> Click here to start</p>
          </Link>
     
      </div>
    </section>
  );
};
export default Welcome;
