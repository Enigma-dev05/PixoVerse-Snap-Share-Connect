import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import emptyImage from "../assets/Empty-Image.png";
import { serverUrl } from "../App";
import axios from "axios";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

function EditProfile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const imageInput = useRef();
  const dispatch = useDispatch();

  const [frontendImage, setFrontendImage] = useState(
    userData.profileImage || emptyImage
  );
  const [backendImage, setBackendImage] = useState(null);
  const [name, setName] = useState(userData.name || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profession, setProfession] = useState(userData.profession || "");
  const [gender, setGender] = useState(userData.gender || "");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userName", userName);
      formData.append("bio", bio);
      formData.append("profession", profession);
      formData.append("gender", gender);

      if (backendImage) {
        formData.append("profileImage", backendImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/editprofile`,
        formData,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate(`/profile/${userData.userName}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center flex-col gap-[20px] px-[10px]">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer"
          onClick={() => {
            navigate(`/profile/${userData.userName}`);
          }}
        />
        <h1 className="text-gray-50 text-[20px] font-semibold ml-[8px]">
          Edit Profile
        </h1>
      </div>
      <div
        className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] border-2 border-gray-800 rounded-full overflow-hidden"
        onClick={() => imageInput.current.click()}>
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          hidden
          onChange={handleImage}
        />
        <img
          src={frontendImage}
          alt="Default Profile Image"
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>
      <div
        className="text-gray-100 text-center text-[18px] font-semibold hover:text-blue-500 transition-colors cursor-pointer"
        onClick={() => imageInput.current.click()}>
        Change Your Profile Picture
      </div>
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-gray-300 border-2 border-black rounded-2xl text-black font-semibold px-[20px] outline-none"
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-gray-300 border-2 border-black rounded-2xl text-black font-semibold px-[20px] outline-none"
        placeholder="Enter Your UserName"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-gray-300 border-2 border-black rounded-2xl text-black font-semibold px-[20px] outline-none"
        placeholder="Enter Your Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-gray-300 border-2 border-black rounded-2xl text-black font-semibold px-[20px] outline-none"
        placeholder="Enter Your Profession"
        onChange={(e) => setProfession(e.target.value)}
        value={profession}
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-gray-300 border-2 border-black rounded-2xl text-black font-semibold px-[20px] outline-none"
        placeholder="Enter Your Gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      />

      <button
        className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-gray-300 border-black cursor-pointer rounded-2xl text-zinc-900 hover:text-blue-700 transition-colors
      "
        onClick={handleEditProfile}>
        {loading ? (
          <ClipLoader
            size={30}
            color="black"
          />
        ) : (
          "Save Profile"
        )}
      </button>
    </div>
  );
}

export default EditProfile;
