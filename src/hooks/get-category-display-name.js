export function getCategoryDisplayName(category) {
  switch (category) {
    case "accessories":
      return "Accesorios";
    case "pc":
      return "Ordenadores";
    case "videogame":
      return "Videojuegos";
    case "photography":
      return "Fotografía";
    default:
      return category;
  }
}
