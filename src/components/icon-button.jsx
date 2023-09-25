import { IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

<IconButton
  style={{
    position: "absolute",
    bottom: 0,
    right: 0,
    background: "rgba(255, 255, 255, 0.7)",
  }}
  onClick={() => {
    this.fileInput.click();
  }}
>
  <PhotoCameraIcon />
</IconButton>;
