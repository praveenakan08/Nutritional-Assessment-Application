import React, { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import Dropzone from "../components/Dropzone";
import axios from "axios";

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState([]);

  const onDrop = useCallback((acceptedFiles: any[], rejectedFiles: any) => {
    acceptedFiles.forEach((file: File) => {
      setImage((prevState) => [...prevState, file] as any);
      console.log("Image", file);
    });
  }, []);
  const imageStyle = { width: "500px", height: "500px" };

  const AnalyzeImage = useCallback(() => {
    console.log("Image***", image);
    axios
      .post("http://localhost:3001/api/analyze", { ...image })
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
