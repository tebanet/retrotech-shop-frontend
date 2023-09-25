import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Main } from "../components/main";
import { useLocation, useNavigate } from "react-router-dom";
import { API_HOST } from "../utils/constants";
import { toast } from "sonner";

export function ValidateUserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [registrationCode, setCode] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const codeFromQuery = searchParams.get("registrationCode");

    if (codeFromQuery) {
      setCode(codeFromQuery);
    }
  }, [location.search]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registrationCode) {
      setValidationError("El código de validación es obligatorio");
      return;
    }

    try {
      const response = await fetch(
        API_HOST + "/users/validate/" + registrationCode,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // header: JSON.stringify({ registrationCode }),
        }
      );

      if (response.ok) {
        navigate("/login");
        toast.success("Usuario validado correctamente.");
      } else {
        toast.error("El código que has introducido no es válido.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setValidationError("Error de red. Por favor vuelve a intentarlo.");
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">Valida tu usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
      >
        <TextField
          label="Código de Verificación"
          type="text"
          name="verification-code"
          value={registrationCode}
          onChange={handleCodeChange}
          required
          error={Boolean(validationError)}
          helperText={validationError}
        />
        <Button id="button" type="submit" variant="contained" color="primary">
          Verificar el código
        </Button>
      </form>
    </Main>
  );
}
