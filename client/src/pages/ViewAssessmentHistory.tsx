import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColDef,
} from "@mui/x-data-grid";
import { viewAssessmentHistory } from "../axiosCalls";
import { useEffect, useState } from "react";

interface RowData {
  id?: string;
  [key: string]: any;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{ hideFooter: true, hideToolbar: true, fileName: 'Nutrition Assessment History' }}
      />
    </GridToolbarContainer>
  );
}

const ViewAssessmentHistory = (): JSX.Element => {
  const [rows, setRows] = useState<RowData[]>([]);
  const email = localStorage.getItem("email");

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
            mappedRow[column.field] = row[column.field];
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

  const columns: GridColDef[] = [
    { field: "dish", headerName: "Dish" },
    { field: "calorie", headerName: "Calories(kcal)" },
    { field: "fat", headerName: "Fat(g)" },
    { field: "carbohydrates", headerName: "Carbs(g)" },
    { field: "protein", headerName: "Protein(g)" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
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
      </Box>
    </Box>
  );
};

export default ViewAssessmentHistory;
