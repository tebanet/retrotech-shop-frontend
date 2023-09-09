import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Main } from "../components/main";
import Joi from "joi";
import { tlds } from "@hapi/tlds";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";

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

const LoginUserPage = () => {
  const { login } = useAuth();
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
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        login(responseData.token);
        console.log("Has iniciado sesión con éxito");
        navigate("/");
      } else {
        console.error("El inicio de sesión ha ha fallado");
      }
    } catch (error) {
      console.error("Ha ocurrido un error:", error);
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block">Inicia tu sesión</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          error={!!validationErrors.email}
          helperText={validationErrors.email}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          error={!!validationErrors.password}
          helperText={validationErrors.password}
        />
        <Button type="submit" variant="contained" color="primary">
          Iniciar sesión
        </Button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/create-account">Regístrate!</a>
      </p>
    </Main>
  );
};

export default LoginUserPage;
