import { useDropzone } from "react-dropzone";
import {
  Box,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const DropZone = (props: any): JSX.Element => {
  const { onDrop } = props;
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      multiple: false,
      accept: { "image/*": [".png", ".jpeg"] },
      onDrop: onDrop,
    });

  const theme = createTheme({
    palette: {
      background: {
        paper: "#fff",
      },
      text: {
        primary: "#173A5E",
        secondary: "#46505A",
      },
      action: {
        active: "#001E3C",
      },
    },
    typography: {
      fontFamily: ["tinos"].join(","),
      fontSize:15
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          border: "dashed",
          borderRadius: 2,
          borderColor: "gray",
          p: 2,
          marginTop: 23,
          justifyItems: "center",
          width: 500,
          height: 300,
        }}
      >
        <div
          {...getRootProps()}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "100px",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop food Image here ...</Typography>
          ) : (
            <div style={{ alignItems: "center" }}>
              <Typography fontSize="20">Drag and drop food image here</Typography>
              <div style={{ justifyContent: "center", display: "flex" }}>
                <CloudUpload fontSize="large" />
              </div>
            </div>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};
export default DropZone;
