import { useAuth0 } from "@auth0/auth0-react";
interface Iauth0 {
  user?: any;
  isAuthenticated?: any;
  isLoading?: any;
  logout?: any;
}
const Authenticate = () => {
  const { user, isAuthenticated, isLoading, logout }: Iauth0 = useAuth0();
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!isAuthenticated) {
    console.log(user);
    return;
  }

  return (
    isAuthenticated && (
      <div>
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: "300px", height: "300px" }}
        />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => logout()}>logout</button>
      </div>
    )
  );
};

export default Authenticate;
