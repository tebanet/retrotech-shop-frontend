import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Main } from "../components/main";
import Joi from "joi";
import { validate } from "../utils/validations";
import { tlds } from "@hapi/tlds";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/use-login";

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
	const [requestObject, setRequestObject] = useState({
		email: "",
		password: "",
	});

	const setCurrentUserToken = useLogin();
	const navigate = useNavigate();
	const [, errors] = validate(loginUserSchema, requestObject);

	async function onSubmit() {
		const [isValid] = validate(loginUserSchema, requestObject);
		if (Result.success) {
			setCurrentUserToken(result.data.token);
			navigate("/");
		} else {
			console.log(result.error);
		}
	}

	function updateRequest(value) {
		onChange((oldRequestObject) => {
			return {
				...oldRequestObject,
				[name]: value,
			};
		});
	}
	/* const setCurrentUserToken = useLogin();
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

		const response = await fetch("http://localhost:3000/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});
		if (response.success) {
			setCurrentUserToken(response.data.token);
			navigate("/");
		} else {
			console.log(response.error);
		} */

	return (
		<Main>
			<h1 className="text-4xl block">Inicia tu sesión</h1>
			<form onSubmit={onSubmit}>
				<TextField
					label="Email"
					type="email"
					name="email"
					onChange={(evt) => updateRequest(evt.target.value)}
					required
					errors={errors}
				/>
				<TextField
					label="Password"
					type="password"
					name="password"
					onChange={(evt) => updateRequest(evt.target.value)}
					required
					errors={errors}
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
}
