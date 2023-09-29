import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const ProductStatus = ({ productData }) => {
  switch (productData.status) {
    case "reserved":
      return (
        <button className="w-full bg-yellow-500 text-grey py-2 px-4 rounded-full font-bold hover:bg-gray-800">
          <TimerOutlinedIcon fontSize="inherit" />
          Reservado
        </button>
      );
    case "available":
      return (
        <button className="w-full bg-green-500 text-grey py-2 px-4 rounded-full font-bold hover:bg-gray-800">
          <CheckOutlinedIcon fontSize="inherit" />
          Disponible
        </button>
      );
    case "sold out":
      return (
        <button className="w-full bg-red-500 text-grey py-2 px-4 rounded-full font-bold hover:bg-gray-800">
          <CloseOutlinedIcon fontSize="inherit" />
          Vendido
        </button>
      );
  }
};
