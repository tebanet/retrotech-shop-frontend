import { TextField, Button } from "@mui/material";

export const LoginForm = ({
  formData,
  validationErrors,
  handleInputChange,
  handleSubmit,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
  >
    <TextField
      label="Correo Electrónico"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      required
      error={Boolean(validationErrors.email)}
      helperText={validationErrors.email}
    />
    <TextField
      label="Contraseña"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      required
      error={Boolean(validationErrors.password)}
      helperText={validationErrors.password}
    />
    <Button type="submit" variant="contained" color="primary">
      Iniciar sesión
    </Button>
  </form>
);
