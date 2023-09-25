import { TextField, Button } from "@mui/material";

export const ChangePasswordForm = ({
  formData,
  handleSubmit,
  handleInputChange,
  validationErrors,
  comparisonError,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
  >
    <TextField
      label="Código de recuperación"
      name="token"
      type="text"
      value={formData.token}
      onChange={handleInputChange}
      error={Boolean(validationErrors.token)}
      helperText={validationErrors.token}
      required
    />
    <TextField
      label="Nueva Contraseña"
      name="newPassword"
      type="password"
      autoComplete="new-password"
      value={formData.newPassword}
      onChange={handleInputChange}
      error={Boolean(validationErrors.newPassword)}
      helperText={validationErrors.newPassword}
      required
    />
    <TextField
      label="Repetir Contraseña"
      name="repeatPassword"
      type="password"
      autoComplete="new-password"
      value={formData.repeatPassword}
      onChange={handleInputChange}
      error={Boolean(validationErrors.repeatPassword)}
      helperText={validationErrors.repeatPassword}
      required
    />
    {comparisonError && (
      <p className="error text-center text-red-500">{comparisonError}</p>
    )}
    <Button type="submit" variant="contained" color="primary">
      Cambiar Contraseña
    </Button>
  </form>
);
