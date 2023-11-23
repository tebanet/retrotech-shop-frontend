import { useEffect, useState } from "react";
import { Main } from "../components/main";
import { Link, useNavigate } from "react-router-dom";
import { ModifyUserForm } from "../forms/modify-user-form";
import { modifyUserSchema, validateField } from "../utils/joi-validation";
import { modifyUserInfo } from "../api/put-modify-user-info";
import { useCurrentUser } from "../hooks/use-current-user";
import { getUserData } from "../api/get-user-data";

export function ModifyUserPage() {
	const currentUser = useCurrentUser();

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: currentUser.email || "",
		username: currentUser.username || "",
		bio: currentUser.bio || "",
		address: currentUser.address || "",
		password: "",
		id: currentUser.id || "",
	});
	useEffect(() => {
		getUserData(currentUser.username).then((data) => {
			setFormData({
				email: data.data.email,
				username: data.data.username,
				bio: data.data.bio,
				address: data.data.address,
			});
		});
	}, []);

	const [validationErrors, setValidationErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		const validationError = validateField(name, value, modifyUserSchema);
		setValidationErrors({
			...validationErrors,
			[name]: validationError,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { error } = modifyUserSchema.validate(formData, {
			abortEarly: false,
		});

		if (error) {
			const errors = {};
			error.details.forEach((detail) => {
				errors[detail.path[0]] = detail.message;
			});
			setValidationErrors(errors);
			return;
		}

		try {
			const id = currentUser.id;
			const { email, username, bio, address, password } = formData;
			const hasDataToUpdate = email || username || bio || address || password;

			if (hasDataToUpdate) {
				if (email || username || bio || address || password) {
					await modifyUserInfo(email, username, bio, address, password, id);
				}
			}
			navigate(`/users/` + currentUser.username);
		} catch (error) {
			console.error("Error al actualizar el usuario:", error);
		}
	};

	return (
		<Main>
			<h1 className="text-4xl block self-center">Modifica tus datos</h1>
			<p className="flex justify-center gap-2">
				Modifica los datos que quieras. Por seguridad, es obligatorio que
				coloques tu contraseña actual.
			</p>
			<ModifyUserForm
				formData={formData}
				handleInputChange={handleInputChange}
				validationErrors={validationErrors}
				handleSubmit={handleSubmit}
			/>
			<p className="flex justify-center gap-2">
				Si quieres cambiar la contraseña
				<Link
					to="/users/recovery-password"
					style={{ color: "var(--quaternary-color)" }}
				>
					haz click aqui.
				</Link>
			</p>
		</Main>
	);
}
