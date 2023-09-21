import { API_HOST } from "../utils/constants";
import { toast } from "sonner";

export const registerUser = async (email, username, password) => {
  const requestBody = { email, username, password };

  try {
    const response = await fetch(API_HOST + "/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      toast.success("Te has registrado con éxito");
      return true;
    } else {
      toast.error("El registro de usuario ha fallado");
      return false;
    }
  } catch (error) {
    console.error("Ha ocurrido un error:", error);
    return false;
  }
};
