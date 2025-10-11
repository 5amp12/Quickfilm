
import { useState } from "react";
import { addFriend } from "../../services/authService";
import { toast } from "react-toastify";
import "./AddFriends.css"

function AddFriends() {
  const [username, setUsername] = useState("");
  // const [message, setMessage] = useState("");

  const addUser = async(e) => {
    e.preventDefault();
    console.log(username);
    try{
      const result = await addFriend(username);
      if (result.error) {
        toast.error(result.error, {
          position: "top-center"
        }); 
      } else{
        toast.success(result.message, {
          position: "top-center"
        }); 
      }
    } catch(e){
      console.log(e);
      alert('Failed to rate film')
    }
    
  }

  return (
    <div className="add-friends-page">
      <h1>Add Friends</h1>

      <p>Connect with other users and grow your QuickFilm network.</p>

      <div className="friends-container">
        <p>No friends added yet.</p>
        {/* You can later map over friend requests or suggestions here */}
      </div>
      <form onSubmit={addUser}>
        <input placeholder="friend-username" className="add-friend-input" onChange={(e) => setUsername(e.target.value)}>
        </input>
        <button>Apply</button>
      </form>
    </div>
  );
}

export default AddFriends;
