import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const OrderStatus = ({ order }) => {
	switch (order.order_status) {
		case "pending":
			return (
				<p className="text-yellow-500 flex items-center">
					<TimerOutlinedIcon fontSize="inherit" />
					Pendiente
				</p>
			);
		case "accepted":
			return (
				<p className="text-green-500 flex items-center">
					<CheckOutlinedIcon fontSize="inherit" />
					Aceptado
				</p>
			);
		case "rejected":
			return (
				<p className="text-red-500 flex items-center">
					<CloseOutlinedIcon fontSize="inherit" />
					Rechazado
				</p>
			);
		default:
			return <p>¿Cómo?</p>;
	}
};
