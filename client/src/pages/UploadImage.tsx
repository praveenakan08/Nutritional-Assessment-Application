import React, { useCallback, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Dropzone from "../components/Dropzone";

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState<File[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  //const [imageElement, setImageElement] = useState<HTMLImageElement>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImage(event.target.files[0] as any);
    console.log("Hello!!", event.target.files[0]);
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => {
    // const imageElement = document.createElement("img");
    // imageElement.src = "../../public/nutrifit-logo.jpg";
    setLoader(true);
    setImage(acceptedFiles);
    if (image) {
      setLoader(false);
    }
    //setImageElement(imageElement);
  }, []);

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
    <div
      className="register-page"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      {loader && <CircularProgress color="success" size={10} />}
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
              <label htmlFor="upload-photo">
                <input
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
              </label>
            </Box>
          </Grid>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {image.length > 0 && (
            <Button
              variant="contained"
              color="success"
              style={{ borderRadius: "6px" }}
              size="large"
              onClick={() => AnalyzeImage()}
            >
              <Typography>Analyze</Typography>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default UploadImage;
