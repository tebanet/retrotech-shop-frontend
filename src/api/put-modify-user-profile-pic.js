import { API_HOST } from "../utils/constants";
import { toast } from "sonner";

export const modifyUserPic = async (userId, file) => {
  const token = localStorage.getItem("userToken");

  if (file) {
    try {
      const formData = new FormData();
      formData.append("profile_pic", file);

      const response = await fetch(API_HOST + `/users/update/pic/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return { status: "ok", data };
      } else {
        console.error("Error:", response.statusText);
        return { status: "error" };
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      return { status: "error" };
    }
  }
};
