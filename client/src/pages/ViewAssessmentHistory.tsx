import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColDef,
} from "@mui/x-data-grid";
import { viewAssessmentHistory } from "../axiosCalls";
import { useEffect, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";
import {
  changeDateTimeFormat,
  formatOnlyDate,
  formatOnlyTime,
} from "../timeConversions";

import { Metrics } from "../common/types";
import generateExcelAndEmail from "../components/GenerateExcel";
import API_URL from "..";
import axios from "axios";
interface RowData {
  id?: string;
  [key: string]: any;
}

const ViewAssessmentHistory = (): JSX.Element => {
  const history = useNavigate();
  const [rows, setRows] = useState<RowData[]>([]);
  const [graphData, setGraphData] = useState<RowData[]>([]);
  const [filter, setFilter] = useState<any>("today");
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const email = localStorage.getItem("email");

  // initial render, fetching data for export table and setting initial filter to 'today'
  useEffect(() => {
    if (rows.length === 0) {
      fetchData();
    }
    updateGraphData(filter);
  }, [rows]);

  function deepClone(obj: any): any {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(deepClone);
    }

    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }

    return clonedObj;
  }

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
          onClick={() => sendEmail()}
        >
          <MailOutlineIcon sx={{ paddingRight: 1, fontSize: 12 }} />
          <Typography sx={{ fontSize: 17 }}>Email</Typography>
        </Button>
      </GridToolbarContainer>
    );
  }

  const fetchData = async () => {
    const result = await viewAssessmentHistory({ email });
    const metrics = result.metrics;
    setMetrics(metrics);
    if (metrics) {
      if (Array.isArray(metrics) && metrics.length === 0) {
        alert(
          "There is no assessment history to fetch. Please upload an image and try again."
        );
        history("/uploadImage");
      }

      // Mapping rows to display in export table
      const mappedRows: RowData[] = metrics.map((row: any) => {
        const mappedRow: RowData = {};
        mappedRow["id"] = row._id;

        columns.forEach((column) => {
          if (column.field === "date") {
            mappedRow[column.field] = changeDateTimeFormat(
              new Date(row[column.field])
            );
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

  const updateGraphData = (selectedFilter: string) => {
    const graphRows = deepClone(rows);

    if (selectedFilter === "today") {
      const todayDate = formatOnlyDate(changeDateTimeFormat(new Date()));
      // 1. filter metrics on today's date
      const filteredMetricsToday = graphRows.filter((metric: any) => {
        const metricDate = formatOnlyDate(metric.date);
        return metricDate === todayDate;
      });

      // 2. x-axis - today's time
      filteredMetricsToday.forEach((record: any) => {
        record["date"] = formatOnlyTime(record["date"]);
      });
      setGraphData(filteredMetricsToday);
    } else if (selectedFilter === "weekly") {
      const todayDate = new Date();
      const currentDayOfWeek = todayDate.getDay();
      const startOfWeek = new Date(todayDate);
      startOfWeek.setDate(todayDate.getDate() - currentDayOfWeek);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      // 1. filter only this week's data
      const filteredMetricsThisWeek = graphRows.filter((record: any) => {
        const metricDate = new Date(record.date);
        return metricDate >= startOfWeek && metricDate <= endOfWeek;
      });

      // 2. if same day's metrics are found then sum them up and return only one record from that day.
      const groupedMetrics = filteredMetricsThisWeek.reduce(
        (result: any[], record: any) => {
          const existingIndex = result.findIndex(
            (group) =>
              formatOnlyDate(group.date) === formatOnlyDate(record.date)
          );

          if (existingIndex === -1) {
            result.push({ ...record });
          } else {
            result[existingIndex].fat += record.fat;
            result[existingIndex].carbohydrates += record.carbohydrates;
            result[existingIndex].calories += record.calories;
            result[existingIndex].protein += record.protein;
          }

          return result;
        },
        []
      );

      // 3. x-axis - time, this week's days. Ex: Wed
      const formattedMetrics = groupedMetrics.map((record: any) => {
        const dateObject = new Date(record.date);
        record.date = dateObject.toLocaleString("en-US", { weekday: "short" });
        return record;
      });

      setGraphData(formattedMetrics);
    } else if (selectedFilter === "monthly") {
      const todayDate = new Date();
      const firstDayOfCurrentMonth = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      );

      // 1. filter records belonging to the current month
      const filteredMetricsThisMonth = graphRows.filter((record: any) => {
        const metricDate = new Date(record.date);
        return metricDate >= firstDayOfCurrentMonth && metricDate <= todayDate;
      });
      // 2. if same date's metrics are found then sum them up and return only one record from that date.
      const groupedMetricsThisMonth = filteredMetricsThisMonth.reduce(
        (result: any[], record: any) => {
          const existingIndex = result.findIndex(
            (group) =>
              formatOnlyDate(group.date) === formatOnlyDate(record.date)
          );

          if (existingIndex === -1) {
            result.push({ ...record });
          } else {
            result[existingIndex].fat += record.fat;
            result[existingIndex].carbohydrates += record.carbohydrates;
            result[existingIndex].calories += record.calories;
            result[existingIndex].protein += record.protein;
          }

          return result;
        },
        []
      );

      // 3. x-axis - months, Ex: MM/DD
      const formattedMetrics = groupedMetricsThisMonth.map((record: any) => {
        record.date = formatOnlyDate(record.date).replace(/\/\d{4},\s*$/, "");
        return record;
      });
      setGraphData(formattedMetrics);
    } else if (selectedFilter === "yearly") {
      const todayDate = new Date();
      const currentYear = todayDate.getFullYear();

      // 1. filter records belonging to the current year
      const filteredMetricsThisYear = graphRows.filter((record: any) => {
        const metricDate = new Date(record.date);
        return metricDate.getFullYear() === currentYear;
      });

      // 2. if same month's metrics are found then sum them up and return only one record from that month.
      const groupedMetricsThisYear = filteredMetricsThisYear.reduce(
        (result: any[], record: any) => {
          const existingIndex = result.findIndex((group) => {
            const formattedGroupDate = formatOnlyDate(group.date);
            const fomrattedRecordDate = formatOnlyDate(record.date);

            return (
              formattedGroupDate.slice(0, 2) ===
                fomrattedRecordDate.slice(0, 2) &&
              formattedGroupDate.slice(6, 10) ===
                fomrattedRecordDate.slice(6, 10)
            );
          });

          if (existingIndex === -1) {
            result.push({ ...record });
          } else {
            result[existingIndex].fat += record.fat;
            result[existingIndex].carbohydrates += record.carbohydrates;
            result[existingIndex].calories += record.calories;
            result[existingIndex].protein += record.protein;
          }

          return result;
        },
        []
      );

      // 3. x-axis - months, Ex: Jan
      const formattedMetrics = groupedMetricsThisYear.map((record: any) => {
        const dateObject = new Date(record.date);
        record.date = dateObject.toLocaleString("en-US", { month: "short" });
        return record;
      });
      setGraphData(formattedMetrics);
    }
  };

  const handleFilter = (event: SelectChangeEvent) => {
    const selectedFilter = event.target.value as string;
    setFilter(selectedFilter);
    updateGraphData(selectedFilter);
  };

  const columns: GridColDef[] = [
    { field: "dish", headerName: "Dish", width: 200 },
    { field: "calories", headerName: "calories(kcal)" },
    { field: "fat", headerName: "Fat(g)" },
    { field: "carbohydrates", headerName: "Carbs(g)" },
    { field: "protein", headerName: "Protein(g)" },
    { field: "date", headerName: "Date", width: 200 },
  ];

  const sendEmail = () => {
    const formData = generateExcelAndEmail(prepareData());
    axios
      .post(API_URL + "/sendEmail", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        console.log("Result", result);
        alert("Email Sent Successfully");
      })
      .catch((err) => {
        console.log("Error", err);
        alert("There was some problem while sending an email");
      });
  };

  const prepareData = () => {
    const data = metrics.map((row, index) => ({
      id: index + 1,
      dish: row.dish,
      date: row.date,
      calories: row.calories,
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
          { title: "calories", dataIndex: "calories" },
          { title: "Carbohydrates", dataIndex: "carbohydrates" },
          { title: "Fat", dataIndex: "fat" },
          { title: "Protein", dataIndex: "protein" },
        ],
        data,
      },
    ];

    return excelData;
  };

  return (
    <Grid sx={{ flexDirection: "horizontal", rowGap: 10 }} xs={12}>
      <Box
        className="table"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: 60,
          marginTop: 80,
        }}
      >
        {rows && (
          <DataGrid
            columns={columns}
            rows={rows}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        )}
      </Box>
      {graphData && (
        <Box
          className="chart"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingLeft: 60,
            marginTop: 80,
          }}
        >
          <Grid sx={{ flexDirection: "vertical" }}>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Time Line</InputLabel>
                <Select
                  value={filter}
                  label="Time Line"
                  onChange={handleFilter}
                >
                  <MenuItem value={"today"}>Today</MenuItem>
                  <MenuItem value={"weekly"}>This Week</MenuItem>
                  <MenuItem value={"monthly"}>This Month</MenuItem>
                  <MenuItem value={"yearly"}>This Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <ResponsiveContainer width={600} height={450}>
                <LineChart
                  width={500}
                  height={300}
                  data={graphData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="fat"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="protein"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#e0d726"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="carbohydrates"
                    stroke="#de104a"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default ViewAssessmentHistory;
