import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { tlds } from "@hapi/tlds";
import { API_HOST } from "../utils/constants";
import Joi from "joi";
import { Main } from "../components/main";
import { useNavigate } from "react-router";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required()
    .messages({
      "string.email": "Ingrese una dirección de correo electrónico válida.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
});

const PasswordResetRequest = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error: validationError } = schema.validate(
      { email },
      { abortEarly: false }
    );

    if (validationError) {
      setError(
        validationError.details.map((detail) => detail.message).join(", ")
      );
      return;
    }

    try {
      const checkResponse = await fetch(API_HOST + "/users/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (checkResponse.ok) {
        const response = await fetch(API_HOST + "/users/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          console.log("El código de recuperación se ha enviado correctamente");
          navigate("/users/change-password");
        } else {
          console.error("Error al enviar el código de recuperación");
        }
      } else {
        setError(
          "El correo electrónico no está registrado en nuestra base de datos."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">Recupera tu contraseña</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
      >
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={handleChange}
          required
          error={Boolean(error)}
          helperText={error}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar código de recuperación
        </Button>
      </form>
    </Main>
  );
};

export default PasswordResetRequest;
