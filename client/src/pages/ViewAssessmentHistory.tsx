import { Box, Button, Grid, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColDef,
} from "@mui/x-data-grid";
import { viewAssessmentHistory } from "../axiosCalls";
import { useCallback, useEffect, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import axios from "axios";
import API_URL from "..";

interface RowData {
  id?: string;
  [key: string]: any;
}

const ViewAssessmentHistory = (): JSX.Element => {
  const [rows, setRows] = useState<RowData[]>([]);
  const email = localStorage.getItem("email");
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await viewAssessmentHistory({ email });
      const metrics = result.metrics;

      if (metrics) {
        if (Array.isArray(metrics) && metrics.length === 0) {
          alert(
            "There is no assessment history to fetch. Please upload an image and try again."
          );
        }
        const mappedRows: RowData[] = metrics.map((row: any) => {
          const mappedRow: RowData = {};
          mappedRow["id"] = row._id;
          columns.forEach((column) => {
            if (column.field === "date") {
              const inputDate = new Date(row[column.field]);
              const dateTime = new Intl.DateTimeFormat(
                "en-US",
                timeOptions
              ).format(inputDate);
              mappedRow[column.field] = dateTime;
            } else {
              mappedRow[column.field] = row[column.field];
            }
          });
          return mappedRow;
        });

        setRows(mappedRows);
      } else {
        console.error("Could not fetch assessment metrics");
      }
    };
    if (rows.length === 0) {
      fetchData();
    }
  }, [rows]);

  const sendEmail = useCallback(async () => {
    axios
      .post(API_URL + "/sendEmail", {})
      .then((result) => {
        console.log("Result", result);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "dish", headerName: "Dish", width: 200 },
    { field: "calorie", headerName: "Calories(kcal)" },
    { field: "fat", headerName: "Fat(g)" },
    { field: "carbohydrates", headerName: "Carbs(g)" },
    { field: "protein", headerName: "Protein(g)" },
    { field: "date", headerName: "Date", width: 200 },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        style={{ display: "flex", justifyContent: "right" }}
      >
        <Button color="success" variant="contained">
          <GridToolbarExport
            style={{ color: "white" }}
            csvOptions={{
              fileName: "Nutritional Metrics (CSV)",
              hideFooter: true,
              hideToolbar: true,
            }}
            printOptions={{
              fileName: "Nutritional Metrics (PDF)",
              hideFooter: true,
              hideToolbar: true,
            }}
            onClick={() => sendEmail()}
          />
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          // onClick={() => AnalyzeImage()}
        >
          <MailOutlineIcon sx={{ paddingRight: 1, fontSize: 12 }} />
          <Typography sx={{ fontSize: 17 }}>Email</Typography>
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingLeft: 60,
        marginTop: 80,
      }}
    >
      {rows && (
        <>
          <DataGrid
            columns={columns}
            rows={rows}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </>
      )}
      <Grid>{/* Graphs */}</Grid>
    </Box>
  );
};

export default ViewAssessmentHistory;
