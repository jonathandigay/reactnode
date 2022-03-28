import axios from "axios";
import { useEffect, useState } from "react";
const Profile = () => {
  const [uerInfo, setUserInfo] = useState<any>([]);

  const gettoken: any = localStorage.getItem("user");
  const parsetoken = JSON.parse(gettoken);
  const token = String(parsetoken.token);
  useEffect(() => {
    const getuser = async () => {
      try {
        await axios
          .get("/getuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const info = [];
            info.push(res.data.user);
            setUserInfo(info);
          });
      } catch (e: any) {
        console.log(e);
      }
    };
    getuser();
  }, []);
  return (
    <div>
      {uerInfo &&
        uerInfo.map((user: any, i: number) => {
          return <div key={i}>{user.email}</div>;
        })}
    </div>
  );
};

export default Profile;
