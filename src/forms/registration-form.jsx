import { TextField, Button } from "@mui/material";

export const RegistrationForm = ({
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
      label="Correo electrónico"
      type="email"
      name="email"
      autoComplete="email"
      value={formData.email}
      onChange={handleInputChange}
      required
      error={!!validationErrors.email}
      helperText={validationErrors.email}
    />
    <TextField
      label="Nombre de usuario"
      name="username"
      autoComplete="username"
      value={formData.username}
      onChange={handleInputChange}
      required
      error={!!validationErrors.username}
      helperText={validationErrors.username}
    />
    <TextField
      label="Contraseña"
      type="password"
      name="password"
      autoComplete="new-password"
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
);
