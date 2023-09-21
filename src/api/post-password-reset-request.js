// api.js
import { API_HOST } from "../utils/constants";

export const checkEmail = async (email) => {
  try {
    const response = await fetch(API_HOST + "/users/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await fetch(API_HOST + "/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
