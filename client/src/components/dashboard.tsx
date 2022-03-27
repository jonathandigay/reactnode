import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout, reset } from "../redux/auth/AuthSlice";
const Dashboard = (e: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const Navigate = useNavigate();
  const dispath = useDispatch();

  // logout
  const onLogout = () => {
    dispath(logout());
    dispath(reset());
  };

  useEffect(() => {
    if (!user) {
      Navigate("/login");
    }
  }, [user, e, Navigate]);

  return (
    <>
      <div className="dashboard">
        <div className="content">
          You are now Authenticate
          <div>
            <Link to="/profile">
              <button>Get your Profile</button>
            </Link>
          </div>
          <div>
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
