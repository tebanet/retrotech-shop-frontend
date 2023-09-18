import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Main } from "../components/main";
import Joi from "joi";
import { tlds } from "@hapi/tlds";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/use-login";
import { Link } from "react-router-dom";
import { API_HOST } from "../utils/constants";

const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required()
    .messages({
      "string.email": "Ingrese una dirección de correo electrónico válida.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
  password: Joi.string().required().messages({
    "any.required": "La contraseña es obligatoria.",
  }),
});

export function LoginUserPage() {
  const setCurrentUserToken = useLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (fieldName, value) => {
    const schema = Joi.object({
      [fieldName]: loginUserSchema.extract(fieldName),
    });

    const { error } = schema.validate(
      { [fieldName]: value },
      { abortEarly: false }
    );

    if (error) {
      return error.details[0].message;
    } else {
      return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const validationError = validateField(name, value);
    setValidationErrors({
      ...validationErrors,
      [name]: validationError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = loginUserSchema.validate(formData, {
      abortEarly: false,
    });

    if (validationError.error) {
      const errors = {};
      validationError.error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      console.error("Error de validación:", validationError.error.details);
      return;
    }

    const requestBody = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(API_HOST + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        setCurrentUserToken(responseData.token);
        navigate("/");
      } else {
        console.log("Error:", response.statusText);
        setFormData({
          email: "",
          password: "",
        });
        document.getElementById("button").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("button").style.backgroundColor = "#1976D2";
        }, 750);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">Inicia sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
      >
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          error={Boolean(validationErrors.email)}
          helperText={validationErrors.email}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          error={Boolean(validationErrors.password)}
          helperText={validationErrors.password}
        />
        <Button id="button" type="submit" variant="contained" color="primary">
          Iniciar sesión
        </Button>
      </form>
      <p className="flex justify-center gap-2">
        ¿No tienes cuenta?
        <Link to="/register" style={{ color: "var(--quaternary-color)" }}>
          ¡Regístrate!
        </Link>
      </p>
      <p className="flex justify-center gap-2">
        <Link
          to="/users/recovery-password"
          style={{ color: "var(--quaternary-color)" }}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
    </Main>
  );
}
