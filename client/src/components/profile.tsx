import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Profile = () => {
  const [uerInfo, setUserInfo] = useState<any>([]);

  const gettoken: any = Cookies.get("user");
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
            console.log(info);
          });
      } catch (e: any) {
        console.log(e);
      }
    };
    getuser();
  }, [token]);
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
