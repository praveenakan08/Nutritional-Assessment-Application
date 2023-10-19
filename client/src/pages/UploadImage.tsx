import React, { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import Dropzone from "../components/Dropzone";
import axios from "axios";
import FormData from "form-data";
import { DropEvent } from "react-dropzone";

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState<File[]>([]);
  const [imageElement, setImageElement] = useState<HTMLImageElement>();
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any, event: DropEvent) => {
      console.log("Event", event);
      const imageElement = document.createElement("img");
      imageElement.src = "../../public/nutrifit-logo.jpg";
      setImage(acceptedFiles);
      setImageElement(imageElement);
    },
    []
  );

  const imageStyle = { width: "500px", height: "500px" };

  const AnalyzeImage = useCallback(() => {
    //const form_data = new FormData();
    // form_data.append("file", fs.createReadStream(image[0] as any).path);
    // console.log("Image***", (image[0] as any).path);
    // console.log("Form Data", image[0]);
    axios
      .post("http://localhost:3001/api/analyze", image[0])
      .then((res) => {
        console.log("Response", res);
      })
      .catch((err: any) => {
        console.log("Error", err);
      });
  }, [image]);

  return (
    <div>
      {image.length > 0 ? (
        image.map((image, index) => (
          <Box sx={{ marginTop: 10 }}>
            <img
              style={imageStyle}
              src={`${URL.createObjectURL(image)}`}
              key={index}
              alt=""
            />
          </Box>
        ))
      ) : (
        <Dropzone onDrop={onDrop} accept={"image/*"} />
      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        {image.length > 0 && (
          <Button
            variant="contained"
            color="success"
            style={{ borderRadius: "6px" }}
            size="large"
            onClick={() => AnalyzeImage()}
          >
            Analyze
          </Button>
        )}
      </div>
    </div>
  );
};
export default UploadImage;
