import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import Joi from "joi";
import { API_HOST } from "../utils/constants";
import { Main } from "../components/main";

const schema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "La contraseña debe tener más de 8 y menos de 30 caracteres, y debe contener letras mayúsculas, minúsculas y números.",
      "any.required": "La contraseña es obligatoria.",
    }),
  repeatPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "La contraseña debe tener más de 8 y menos de 30 caracteres, y debe contener letras mayúsculas, minúsculas y números.",
      "any.required": "La contraseña es obligatoria.",
    }),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error: validationError } = schema.validate(formData, {
      abortEarly: false,
    });

    if (validationError) {
      setError(
        validationError.details.map((detail) => detail.message).join(", ")
      );
      return;
    }

    if (formData.newPassword !== formData.repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(API_HOST + "/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("La contraseña se ha cambiado con éxito");
        navigate("/login");
      } else {
        console.error("Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">
        Establece una nueva contraseña
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
      >
        <TextField
          label="Código de recuperación"
          name="token"
          type="text"
          value={formData.token}
          onChange={handleChange}
          required
        />
        <TextField
          label="Nueva Contraseña"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <TextField
          label="Repetir Contraseña"
          name="repeatPassword"
          type="password"
          value={formData.repeatPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Cambiar Contraseña
        </Button>
      </form>
      {error && <p className="error">{error}</p>}
    </Main>
  );
};

export default ChangePassword;
