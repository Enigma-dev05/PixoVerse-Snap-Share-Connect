import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setPrevChatUsers } from "../redux/messageSlice";

function GetPrevChatUsers() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return;

    const fetchPrevChatUsers = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/message/prevChats`, {
          withCredentials: true,
        });
        dispatch(setPrevChatUsers(response.data));
      } catch (error) {
        console.error("Error fetching previous chat users:", error);
      }
    };

    fetchPrevChatUsers();
  }, [userData, dispatch]);

  return null;
}

export default GetPrevChatUsers;
