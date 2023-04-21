//Import router link for rerouting
import { Link } from "react-router-dom";
import vinyl from "../assets/vecteezy_vinyl-record-vector-illustration-isolated-on-white-background_9313617_181.png"

const Welcome = () => {
  return (
    <section className="welcomePage">
    <div className="wrapper flexWelcome">
    <h1>Podcast Prioritizer</h1>
  
    <div className="imgWelcome">
 
      <img src={vinyl} alt="An image of a vinyl disc" />

    </div>
   
    
    <p className="textWelcome">Got somewhere to go? Let us know your travel, we'll find a podcast for you to listen to!  <Link to='/podcast'><span> Click here to start</span></Link></p>
      
      
    
      
    </div>
    </section>
  );
};
export default Welcome;
