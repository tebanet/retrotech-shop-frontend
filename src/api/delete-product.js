import { toast } from "sonner";
import { API_HOST } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const deleteProduct = async (product_id) => {
	const token = localStorage.getItem("userToken");
	try {
		const response = await fetch(API_HOST + `/products/${product_id}`, {
			headers: {
				Authorization: `${token}`,
			},
			method: "DELETE",
		});

		if (response.ok) {
			toast.success("Producto eliminado con éxito!");
		} else {
			toast.error("El producto no se ha podido eliminar.");
		}

		return response.json();
	} catch (error) {
		console.error("Error:", error);
	}
};
