import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Main } from "../components/main";
import Joi from "joi";
import { tlds } from "@hapi/tlds";
import { useNavigate } from "react-router";
import { API_HOST } from "../utils/constants";

const newUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .min(4)
    .max(100)
    .required()
    .messages({
      "string.email": "Ingrese una dirección de correo electrónico válida.",
      "string.min": "El correo electrónico debe tener más de 4 caracteres.",
      "string.max": "El correo electrónico debe tener menos de 100 caracteres.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
  username: Joi.string().min(4).max(100).required().messages({
    "string.min": "El nombre de usuario debe tener más de 4 caracteres.",
    "string.max": "El nombre de usuario debe tener menos de 100 caracteres.",
    "any.required": "El nombre de usuario es obligatorio.",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "La contraseña debe tener más de 8 y menos de 30 caracteres, y debe contener letras mayúsculas, minúsculas y números.",
      "any.required": "La contraseña es obligatoria.",
    }),
});

const NewUserPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (fieldName, value) => {
    const schema = Joi.object({
      [fieldName]: newUserSchema.extract(fieldName),
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

    const validationError = newUserSchema.validate(formData, {
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
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch(API_HOST + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Te has registrado con éxito");
        navigate("/users/validate");
      } else {
        console.error("El registro de usuario ha fallado");
      }
    } catch (error) {
      console.error("Ha ocurrido un error:", error);
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">Crea tu cuenta</h1>
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
          error={!!validationErrors.email}
          helperText={validationErrors.email}
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          error={!!validationErrors.username}
          helperText={validationErrors.username}
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
          Registrarse
        </Button>
      </form>
    </Main>
  );
};

export default NewUserPage;
