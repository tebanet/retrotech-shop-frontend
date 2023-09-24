import { useState } from "react";
import { Main } from "../components/main";
import { useNavigate } from "react-router-dom";
import { newUserSchema, validateField } from "../utils/joi-validation";
import { registerUser } from "../api/post-register-user-request";
import { RegistrationForm } from "../forms/registration-form";

export function NewUserPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const validationError = validateField(name, value, newUserSchema);
    setValidationErrors({
      ...validationErrors,
      [name]: validationError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = newUserSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      console.error("Error de validación:", errors.details);
      return;
    }

    const registrationSuccessful = await registerUser(
      formData.email,
      formData.username,
      formData.password
    );
    if (registrationSuccessful) {
      navigate("/users/validate");
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">Crea tu cuenta</h1>
      <RegistrationForm
        formData={formData}
        handleInputChange={handleInputChange}
        validationErrors={validationErrors}
        handleSubmit={handleSubmit}
      />
    </Main>
  );
}
