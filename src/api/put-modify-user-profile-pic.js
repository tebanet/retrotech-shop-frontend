import { API_HOST } from "../utils/constants";
import { toast } from "sonner";

export const modifyUserPic = async (id, profile_pic) => {
  const token = localStorage.getItem("userToken");
  const requestBody = { id, profile_pic };
  try {
    const response = await fetch(API_HOST + `/users/update/pic/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      toast.success("Imagen actualizada con éxito");
    } else {
      toast.error("Error al actualizar la imagen");
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};
