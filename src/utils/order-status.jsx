import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const OrderStatus = ({ order }) => {
  switch (order.order_status) {
    case "pending":
      return (
        <p className=" bg-yellow-500 text-white px-4 rounded-full hover:bg-yellow-600">
          <TimerOutlinedIcon fontSize="inherit" />
          Pendiente
        </p>
      );
    case "accepted":
      return (
        <p className="bg-green-500 text-white px-4 rounded-full hover:bg-green-600">
          <CheckOutlinedIcon fontSize="inherit" />
          Aceptado
        </p>
      );
    case "rejected":
      return (
        <p className="bg-red-500 text-white px-4 rounded-full hover:bg-red-600">
          <CloseOutlinedIcon fontSize="inherit" />
          Rechazado
        </p>
      );
    default:
      return <p>¿Cómo?</p>;
  }
};
