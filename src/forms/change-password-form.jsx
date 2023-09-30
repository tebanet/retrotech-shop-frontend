import { TextField, Button } from "@mui/material";

export const ChangePasswordForm = ({
  formData,
  handleSubmit,
  handleInputChange,
  validationErrors,
  comparisonError,
}) => (
  <section className="flex justify-center">
    <span className="w-full lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4">
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
    </span>
  </section>
);
