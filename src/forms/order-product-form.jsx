import { Button, TextField, TextareaAutosize } from "@mui/material";

export const OrderProductForm = ({
	formData,
	handleInputChange,
	handleSubmit,
}) => (
	<form
		onSubmit={handleSubmit}
		className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
	>
		<TextareaAutosize
			minRows={2}
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
			¡Manda tu pedido!
		</Button>
	</form>
);
