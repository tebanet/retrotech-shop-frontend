import { SpaRounded } from "@mui/icons-material";
import { TextField, Button } from "@mui/material";

export const LoginForm = ({
  formData,
  validationErrors,
  handleInputChange,
  handleSubmit,
}) => (
  <section className="flex justify-center">
    <span className="w-full lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4">
        <TextField
          label="Correo electrónico"
          type="email"
          name="email"
          autoComplete="email"
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
          autoComplete="current-password"
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
    </span>
  </section>
);
