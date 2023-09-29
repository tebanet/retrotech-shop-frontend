import { TextField } from "@mui/material";
import { TailoredButton } from "../utils/tailored-button";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export const OrderProductForm = ({
  formData,
  handleInputChange,
  handleSubmit,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col mx-auto gap-4 w-full lg:w-8/12 xl:w-7/12"
  >
    <TextField
      id="outlined-multiline-static"
      multiline
      rows={3}
      placeholder="¿Quieres decirle algo al vendedor?"
      name="message"
      value={formData.message}
      onChange={handleInputChange}
      required
    />
    <TextField
      label="¡Índicale tu dirección al vendedor!"
      name="delivery_place"
      value={formData.delivery_place}
      onChange={handleInputChange}
      required
    />
    <TailoredButton type="submit" variant="contained" color="primary">
      <ShoppingBagIcon />
      {"  "}
      ¡Manda tu pedido!
    </TailoredButton>
  </form>
);
