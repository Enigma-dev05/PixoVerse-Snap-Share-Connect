import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { serverUrl } from "../App";
import emptyImage from "../assets/Empty-Image.png";
import FollowButton from "../components/FollowButton";

function Search() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { userData } = useSelector((state) => state.user);

  const handleSearch = async () => {
    if (!input.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search?keyword=${input}`,
        { withCredentials: true }
      );
      setSearchResults(result.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [input]);

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] border-b border-gray-800">
        <MdOutlineKeyboardBackspace
          className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-gray-50 text-[20px] font-semibold">Search</h1>
      </div>

      <div className="w-full flex items-center justify-center py-[20px] px-[20px]">
        <div className="w-full max-w-[800px] h-[60px] rounded-full bg-gray-700 flex items-center px-[25px] gap-[15px] border-2 border-gray-600 transition-colors">
          <FiSearch className="text-gray-400 w-[24px] h-[24px] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for users..."
            className="w-full h-full outline-0 bg-transparent text-gray-50 text-[18px] placeholder-gray-400"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            autoFocus
          />
          {input && (
            <button
              onClick={() => {
                setInput("");
                setSearchResults([]);
                setHasSearched(false);
              }}
              className="text-gray-400 hover:text-gray-200 text-[14px] font-medium">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="w-full flex-1 overflow-auto px-[20px] pb-[20px]">
        <div className="w-full max-w-[800px] mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-[60px]">
              <div className="w-[40px] h-[40px] border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : hasSearched ? (
            searchResults.length > 0 ? (
              <div className="flex flex-col gap-[15px]">
                <h2 className="text-gray-400 text-[14px] font-semibold mb-[10px]">
                  {searchResults.length}{" "}
                  {searchResults.length === 1 ? "result" : "results"} found
                </h2>
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="w-full flex items-center gap-[15px] p-[15px] bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
                    onClick={() => handleUserClick(user.userName)}>
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
                      <img
                        src={user.profileImage || emptyImage}
                        alt={user.userName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-100 font-semibold text-[16px] truncate">
                        {user.userName}
                      </h3>
                      <p className="text-gray-400 text-[14px] truncate">
                        {user.name}
                      </p>
                      <p className="text-gray-500 text-[12px]">
                        {user.followers?.length || 0} followers
                      </p>
                    </div>

                    {userData._id !== user._id && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <FollowButton
                          targetUserId={user._id}
                          tailwind="px-[16px] py-[8px] bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-[100px] gap-[15px]">
                <FiSearch className="w-[60px] h-[60px] text-gray-600" />
                <p className="text-gray-400 text-[18px] font-medium">
                  No users found
                </p>
                <p className="text-gray-500 text-[14px]">
                  Try searching with a different keyword
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-[100px] gap-[15px]">
              <FiSearch className="w-[60px] h-[60px] text-gray-600" />
              <p className="text-gray-400 text-[18px] font-medium">
                Search for users
              </p>
              <p className="text-gray-500 text-[14px]">
                Enter a username or name to find people
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
