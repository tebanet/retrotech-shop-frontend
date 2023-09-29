export function getPlaceOfSale(place_of_sale) {
  switch (place_of_sale) {
    case "online":
      return "Se entrega en mano";
    case "delivery":
      return "Disponible para envío";
    default:
      return place_of_sale;
  }
}
