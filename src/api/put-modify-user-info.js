import { API_HOST } from "../utils/constants";
import { toast } from "sonner";

export const modifyUserInfo = async (
  email,
  username,
  bio,
  address,
  password,
  id
) => {
  const token = localStorage.getItem("userToken");

  const requestBody = { email, username, bio, address, password, id };
  try {
    const response = await fetch(API_HOST + `/users/update/info/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      toast.success("Usuario actualizado con éxito");
    } else {
      toast.error("Error al actualizar el usuario");
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};
