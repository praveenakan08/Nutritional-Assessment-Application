import React, { useCallback, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  FormLabel,
  Input,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import Dropzone from "../components/Dropzone";

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImage(event.target.files[0] as any);
    console.log("Hello!!", event.target.files[0]);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles);
  }, []);

  const imageStyle = { width: "500px", height: "500px" };

  const AnalyzeImage = useCallback(() => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("filename", image[0].name);
    formData.append("path", (image[0] as any).path);
    console.log("Image", image[0]);
    axios
      .post("http://localhost:3001/api/analyze", {
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: AxiosResponse) => {
        console.log("Response", res);
      })
      .catch((err: AxiosError) => {
        console.log("Error", err);
      });
  }, [image]);

  return (
    <>
      <Box
        className="register-page"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
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
          <Grid container xs={12} columnGap={4}>
            <Box paddingLeft={20} paddingTop={4}>
              <Dropzone onDrop={onDrop} accept={"image/*"} />
            </Box>

            <Grid marginTop={28}>
              <Divider
                orientation="vertical"
                style={{ height: "100%", backgroundColor: "#26672D" }}
              />
            </Grid>

            <Box paddingTop={45}>
              <FormLabel htmlFor="upload-photo">
                <Input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handleChange}
                />
                <Button
                  sx={{ bgcolor: "#26672D" }}
                  variant="contained"
                  component="span"
                  startIcon={<Avatar src={"/upload-file-white.png"} />}
                  //onClick={handleChange}
                >
                  <Typography>Select from Computer</Typography>
                </Button>
              </FormLabel>
            </Box>
          </Grid>
        )}
      </Box>
      {image.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <Button
            variant="contained"
            color="success"
            style={{ borderRadius: "6px" }}
            size="large"
            onClick={() => AnalyzeImage()}
          >
            <Typography>Analyze</Typography>
          </Button>
        </Box>
      )}
    </>
  );
};
export default UploadImage;
