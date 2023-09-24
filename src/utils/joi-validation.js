import Joi from "joi";
import { tlds } from "@hapi/tlds";

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required()
    .messages({
      "string.empty": "Este campo no puede estar vacio.",
      "string.email": "Ingrese una dirección de correo electrónico válida.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
  password: Joi.string().required().messages({
    "any.required": "La contraseña es obligatoria.",
  }),
});

export const newUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .min(4)
    .max(100)
    .required()
    .messages({
      "string.empty": "Este campo no puede estar vacio.",
      "string.email": "Ingrese una dirección de correo electrónico válida.",
      "string.min": "El correo electrónico debe tener más de 4 caracteres.",
      "string.max": "El correo electrónico debe tener menos de 100 caracteres.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
  username: Joi.string().min(4).max(100).required().messages({
    "string.empty": "Este campo no puede estar vacio.",
    "string.min": "El nombre de usuario debe tener más de 4 caracteres.",
    "string.max": "El nombre de usuario debe tener menos de 100 caracteres.",
    "any.required": "El nombre de usuario es obligatorio.",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.empty": "Este campo no puede estar vacio.",
      "string.pattern.base":
        "La contraseña debe tener más de 8 y menos de 30 caracteres, y debe contener letras mayúsculas, minúsculas y números.",
      "any.required": "La contraseña es obligatoria.",
    }),
});

export const passwordResetSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required()
    .messages({
      "string.empty": "Este campo no puede estar vacio.",
      "string.email": "Ingrese una dirección de correo electrónico válida.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
});

export const changePasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Este campo no puede estar vacio.",
    "any.required": "El token es obligatorio.",
  }),
  newPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.empty": "Este campo no puede estar vacio.",
      "string.pattern.base":
        "La contraseña debe tener más de 8 y menos de 30 caracteres, y debe contener letras mayúsculas, minúsculas y números.",
      "any.required": "La contraseña es obligatoria.",
    }),
  repeatPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.empty": "Este campo no puede estar vacio.",
      "string.pattern.base":
        "La contraseña debe tener más de 8 y menos de 30 caracteres, y debe contener letras mayúsculas, minúsculas y números.",
      "any.required": "La contraseña es obligatoria.",
    }),
});

export const modifyUserSchema = Joi.object({
  id: Joi.string().allow(""),
  address: Joi.string().min(4).max(100).optional().allow("").messages({
    "string.min": "La dirección debe tener más de 4 caracteres.",
    "string.max": "La dirección debe tener menos de 100 caracteres.",
  }),
  bio: Joi.string().min(4).max(255).optional().allow("").messages({
    "string.min": "La biografía debe tener más de 4 caracteres.",
    "string.max": "La biografía debe tener menos de 255 caracteres.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .optional()
    .allow("")
    .messages({
      "string.min": "El correo electrónico debe tener más de 4 caracteres.",
      "string.max": "El correo electrónico debe tener menos de 100 caracteres.",
    }),
  password: Joi.string().required().messages({
    "string.empty":
      "Por motivos de seguridad, es obligatorio que coloques tu contraseña.",
    "any.required":
      "Por motivos de seguridad, es obligatorio que coloques tu contraseña.",
  }),
  username: Joi.string().min(4).max(100).optional().allow("").messages({
    "string.min": "El nombre de usuario debe tener más de 4 caracteres.",
    "string.max": "El nombre de usuario debe tener menos de 100 caracteres.",
  }),
});

export const validateField = (fieldName, value, schema) => {
  const joiSchema = Joi.object({
    [fieldName]: schema.extract(fieldName),
  });

  const { error } = joiSchema.validate(
    { [fieldName]: value },
    { abortEarly: false }
  );

  if (error) {
    return error.details[0].message;
  } else {
    return null;
  }
};
