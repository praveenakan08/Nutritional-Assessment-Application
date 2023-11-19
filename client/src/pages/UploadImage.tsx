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
import API_URL from "..";

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState<File>();
  const [loader, setLoader] = useState<boolean>(false);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImage(event.target.files[0] as File);
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => {
    setLoader(true);
    setImage(acceptedFiles[0]);
    if (image) {
      setLoader(false);
    }
  }, []);

  const imageStyle = { width: "500px", height: "500px" };
  
  const AnalyzeImage = useCallback(async () => {
    try {
      if (!image) {
        console.error('No image found');
        return;
      }
      const formData = new FormData();
      formData.append('files', image);
      formData.append('email', localStorage.getItem('email')||'');

      axios.post(API_URL + "/analyze", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response)=>{
       

      }).catch((err)=>{
        console.log("Error",err);
      })
  
    } catch (error) {
      console.error('Error sending image:', error);
    }
  }, [image]);

  return (
      <div
        className="register-page"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {loader && <CircularProgress color="success" size={10} />}
        <div>
          {image ? (
              <Box sx={{ marginTop: 10 }}>
                <img
                  style={imageStyle}
                  src={`${URL.createObjectURL(image)}`}
                  alt=""
                />
              </Box>
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
            {image && (
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
