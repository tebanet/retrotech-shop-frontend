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

const categoryEnum = ["videogame", "pc", "accessories", "photography"];
// const statusEnum = ["reserved", "available", "sold out"];
const placeOfSaleEnum = ["online", "delivery"];
const locationEnum = [
  "Andalucía",
  "Aragón",
  "Asturias",
  "Balears",
  "Canarias",
  "Cantabria",
  "Castilla y León",
  "Castilla - La Mancha",
  "Catalunya",
  "Comunitat Valenciana",
  "Extremadura",
  "Galicia",
  "Madrid",
  "Murcia",
  "Navarra",
  "País Vasco",
  "Rioja",
  "Ceuta",
  "Melilla",
];

export const newProductSchema = Joi.object({
  product_title: Joi.string().min(4).max(50).required().messages({
    "string.min": "El nombre del producto tiene que tener más de 4 caracteres.",
    "string.max":
      "El nombre del producto tiene que tener menos de 50 caracteres.",
    "string.empty": "Este campo no puede estar vacío.",
    "any.required": "Este campo no puede estar vacío.",
  }),
  category: Joi.string()
    .valid(...categoryEnum)
    .required()
    .messages({
      "any.required": "Este campo no puede estar vacío.",
      "any.empty": "Este campo no puede estar vacío.",
    }),
  price: Joi.number().precision(2).required().messages({
    "any.required": "Es necesario que coloques un precio.",
    "any.empty": "Este campo no puede estar vacío.",
    "number.base": "Tienes que expresar el precio en números.",
  }),
  description: Joi.string().required().min(15).max(1000).messages({
    "string.min": "Cuéntanos un poco más acerca de tu producto.",
    "string.max":
      "La descripción del producto tiene que ser un poco más corta.",
    "any.empty": "Este campo no puede estar vacío.",
    "any.required": "Este campo no puede estar vacío.",
  }),
  status: Joi.string().allow(""),
  location: Joi.string()
    .valid(...locationEnum)
    .required()
    .messages({ "any.required": "Por favor, indícanos dónde lo vendes." }),
  place_of_sale: Joi.string()
    .valid(...placeOfSaleEnum)
    .required()
    .messages({ "any.required": "Por favor, dinos cómo lo quieres vender." }),
});

export const updateProductSchema = Joi.object({
  product_title: Joi.string().min(4).max(50).optional().allow("").messages({
    "string.min": "El nombre del producto tiene que tener más de 4 caracteres.",
    "string.max":
      "El nombre del producto tiene que tener menos de 50 caracteres.",
  }),
  category: Joi.string()
    .valid(...categoryEnum)
    .optional()
    .allow(""),
  price: Joi.number().precision(2).allow("").messages({
    "number.base": "Tienes que expresar el precio en números.",
  }),
  description: Joi.string().allow("").min(15).max(1000).messages({
    "string.min": "Cuéntanos un poco más acerca de tu producto.",
    "string.max":
      "La descripción del producto tiene que ser un poco más corta.",
  }),
  place_of_sale: Joi.string()
    .valid(...placeOfSaleEnum)
    .allow(""),
  location: Joi.string()
    .valid(...locationEnum)
    .allow(""),
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
