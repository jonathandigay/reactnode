import { Link } from "react-router-dom";
import picwrapper from "./assets/pwrapper.png";
const Home = () => {
  return (
    <div className="home">
      <div>
        <div className="brand">
          <img src={picwrapper} alt="picwrapper" />
        </div>
        <div className="credentials">
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>

          <div>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
