import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaSignOutAlt, FaEdit, FaSave } from "react-icons/fa";
import "../App.css";
import av from "../assets/img/profileicon/p1.jpeg";
import av1 from "../assets/img/profileicon/p2.jpeg";
import av2 from "../assets/img/profileicon/p3.jpeg";
import av3 from "../assets/img/profileicon/p4.jpeg";
import av4 from "../assets/img/profileicon/p5.jpeg";

// Available profile images
const availableImages = [
  { id: "p1", src: av },
  { id: "p2", src: av1 },
  { id: "p3", src: av2 },
  { id: "p4", src: av3 },
  { id: "p5", src: av4 },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(av); // Default profile image
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
      setProfileImg(storedUser.profile_img || av);
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    const response = await fetch("http://localhost/cake_shop/update_profile.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, name, password, profile_img: profileImg }),
    });

    const data = await response.json();
    alert(data.message);

    if (data.status === "success") {
      const updatedUser = { ...user, name, profile_img: profileImg };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);
      setPassword(""); // Clear password after update
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  if (!user) {
    return <p className="error">Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Image */}
        <div className="profile-img-container">
          <img src={profileImg} alt="Profile" className="profile-img" height={300}  width={300}/>
          {editMode && (
            <div className="profile-img-options">
              {availableImages.map((img) => (
                <img
                  key={img.id}
                  src={img.src}
                  alt={img.id}
                  className={`profile-img-choice ${profileImg === img.src ? "selected" : ""}`}
                  onClick={() => setProfileImg(img.src)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Editable Username */}
        <div className="profile-field">
          <h3><FaUser /> 
            {editMode ? (
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="edit-input"
              />
            ) : (
              <span>{user.name}</span>
            )}
            <button onClick={() => setEditMode(!editMode)} className="edit-btn">
              {editMode ? <FaSave /> : <FaEdit />}
            </button>
          </h3>
        </div>

        {/* Email - Non-Editable */}
        <p><FaEnvelope /> {user.email}</p>

        {/* Save Button */}
        {editMode && (
          <button onClick={handleUpdateProfile} className="update-btn">
            <FaSave /> Save Changes
          </button>
        )}

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
