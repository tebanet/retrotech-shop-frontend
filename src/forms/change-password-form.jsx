import { TextField, Button } from "@mui/material";

export const ChangePasswordForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  validationErrors,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
  >
    <TextField
      label="Código de recuperación"
      name="token"
      type="text"
      value={formData}
      onChange={handleInputChange}
      error={Boolean(validationErrors)}
      helperText={validationErrors}
      required
    />
    <TextField
      label="Nueva Contraseña"
      name="newPassword"
      type="password"
      autoComplete="new-password"
      value={formData}
      onChange={handleInputChange}
      error={Boolean(validationErrors)}
      helperText={validationErrors}
      required
    />
    <TextField
      label="Repetir Contraseña"
      name="repeatPassword"
      type="password"
      autoComplete="new-password"
      value={formData}
      onChange={handleInputChange}
      error={Boolean(validationErrors)}
      helperText={validationErrors}
      required
    />
    <Button type="submit" variant="contained" color="primary">
      Cambiar Contraseña
    </Button>
  </form>
);
