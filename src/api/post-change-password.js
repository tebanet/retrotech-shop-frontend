import { API_HOST } from "../utils/constants";

export const changePassword = async (formData) => {
	try {
		const response = await fetch(API_HOST + `/users/change-password/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			// const data = await response.json();
			// if (data.status === "ok") {
			return true;
			// } else {
			//   return false;
			// }
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error:", error);
		return false;
	}
};
