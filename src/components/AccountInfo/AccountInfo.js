
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getFriends } from "../../services/authService";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "./AccountInfo.css"

function AccountInfo() {
  const [username, setUsername] = useState("");
  const [joinTime, setJoinTime] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);
    setUsername(decoded.username);
    setJoinTime(new Date(decoded.accountCreation).toLocaleDateString());

    getFollowers(decoded)
  }, [])

  const getFollowers = async(decoded) => {
    const result = await getFriends();
    var userfollowing = 0
    var userfollowers = 0
    for (var i = 0; i < result.friends.length; i++){
      if (result.friends[i].requester_id == decoded.userId){
       userfollowing++;
      }
      if (result.friends[i].addressee_id == decoded.userId){
        userfollowers++;
      }
    }
    setFollowers(userfollowers);
    setFollowing(userfollowing);
    console.log(userfollowing, userfollowers);
  }

  const signOut = () => {
    console.log("sign Out hitting")
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="acc-info-container">
      <div className="acc-info">
          <h1>{username}</h1>
          <div className="conn-container">
              <h4 className="connections">Following: {following}</h4>
              <h4 className="connections">Followers: {followers}</h4>
          </div>
          <div>
            <h5>Account created at: {joinTime}</h5>
          </div>
          <button className="Logout-button" onClick={signOut}>Logout</button>
      </div>
    </div>
  );
}

export default AccountInfo;
