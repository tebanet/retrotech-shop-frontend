import { Button, TextField } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export const OrderProductForm = ({
  formData,
  handleInputChange,
  handleSubmit,
}) => (
  <span className="w-full lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
    <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4">
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
      <Button type="submit" variant="contained" color="primary">
        <ShoppingBagIcon />
        {"  "}
        ¡Manda tu pedido!
      </Button>
    </form>
  </span>
);
