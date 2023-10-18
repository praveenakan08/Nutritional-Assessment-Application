import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const DropZone = (props: any): JSX.Element => {
  const { onDrop } = props;
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      multiple: false,
      accept: { "image/*": [".png", ".jpeg"] },
      onDrop: onDrop,
    });

  return (
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
          <p>Drop file(s) here ...</p>
        ) : (
          <div style={{ alignItems: "center" }}>
            <p>Drag and drop file(s) here, or click to select files</p>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <CloudUpload fontSize="large" />
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};
export default DropZone;
