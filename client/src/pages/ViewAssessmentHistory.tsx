import { Box, Button, Grid, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColDef,
} from "@mui/x-data-grid";
import { viewAssessmentHistory } from "../axiosCalls";
import { useEffect, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Metrics } from "../common/types";
import generateExcelAndEmail from "../components/GenerateExcel";
interface RowData {
  id?: string;
  [key: string]: any;
}

const ViewAssessmentHistory = (): JSX.Element => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      const result = await viewAssessmentHistory({ email });
      const metrics = result.metrics;
      setMetrics(metrics);
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

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };

  const prepareData = () => {
    const data = metrics.map((row, index) => ({
      id: index + 1,
      dish: row.dish,
      date: row.date,
      calories: row.calorie,
      carbohydrates: row.carbohydrates,
      fat: row.fat,
      protein: row.protein,
    }));
    const excelData = [
      {
        columns: [
          { title: "ID", dataIndex: "id" },
          { title: "Dish", dataIndex: "dish" },
          { title: "Date", dataIndex: "date" },
          { title: "Calories", dataIndex: "calories" },
          { title: "Carbohydrates", dataIndex: "carbohydrates" },
          { title: "Fat", dataIndex: "fat" },
          { title: "Protein", dataIndex: "protein" },
        ],
        data,
      },
    ];

    return excelData;
  };

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
          />
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => generateExcelAndEmail(prepareData())}
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
