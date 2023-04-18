import { Link } from "react-router-dom";


const Welcome = () => {
  return (
    <div className="wrapper">
        <Link to='/podcast'>
        <h2>This is the welcome page</h2>
        </Link>
      
    </div>
  );
};
export default Welcome;
