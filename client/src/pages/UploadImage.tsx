import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Dropzone from "../components/Dropzone";
import API_URL from "..";
import { Metrics } from "../common/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Bars } from "react-loader-spinner";

const UploadImage = (): JSX.Element => {
  const email = localStorage.getItem("email") || "";
  const [image, setImage] = useState<File>();
  const [loader, setLoader] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [metricsData, setMetricsData] = useState<Metrics[]>();
  const [currentMetrics, setCurrentmetrics] = useState<Metrics>({} as Metrics);
  const [standardMetrics, setStandardMetrics] = useState<Metrics>(
    {} as Metrics
  );
  const [prediction, setPrediction] = useState<Metrics>({} as Metrics);
  const [ingredients, setIngredients] = useState<String[]>([]);
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string>();
  const [portion, setPortion] = useState<string>("250");
  const imageStyle = { width: "500px", height: "500px" };

  useEffect(() => {
    axios
      .get(API_URL + `/userInfo?email=${email}`)
      .then((result) => {
        const data = result.data.payload;
        console.log("Data,", data);
        setAge(data.age);
        setGender(data.gender);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }, [email]);

  useEffect(() => {
    setMetricsData([
      { name: "Current Metrics", ...currentMetrics },
      { name: "Standard Metrics", ...standardMetrics },
    ]);
    console.log("Metrics", metricsData);
  }, [currentMetrics, standardMetrics]);

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImage(event.target.files[0] as File);
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => {
    setImage(acceptedFiles[0]);
  }, []);

  const getStdMetrics = () => {
    let standardMetrics = {} as Metrics;
    axios
      .get(
        API_URL + `/getStdMetrics?email=${email}&age=${age}&gender=${gender}`
      )
      .then((result) => {
        console.log("Get standard Metrics", result.data);
        const metrics = result.data.payload;
        standardMetrics.calories = metrics.calories;
        standardMetrics.fat = metrics.fat;
        standardMetrics.carbohydrates = metrics.carbohydrates;
        standardMetrics.protein = metrics.protein;
        setStandardMetrics(standardMetrics);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  const getMetrics = () => {
    let currentMetrics = {} as Metrics;
    axios
      .get(API_URL + `/getMetrics?email=${email}`)
      .then((result) => {
        console.log("Get daily Metrics", result.data);
        const metrics = result.data.payload;
        let cal = 0,
          fat = 0,
          protein = 0,
          carb = 0;
        metrics.map((metric: Metrics) => {
          cal += metric.calories;
          fat += metric.fat;
          carb += metric.carbohydrates;
          protein += metric.protein;
        });
        currentMetrics.calories = Math.round(cal * 100) / 100;
        currentMetrics.fat = Math.round(fat * 100) / 100;
        currentMetrics.carbohydrates = Math.round(carb * 100) / 100;
        currentMetrics.protein = Math.round(protein * 100) / 100;
        console.log("Current Metrics", currentMetrics);
        setCurrentmetrics(currentMetrics);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
    return currentMetrics;
  };

  const AnalyzeImage = useCallback(async () => {
    try {
      if (!image) {
        console.error("No image found");
        return;
      }
      const formData = new FormData();
      formData.append("files", image);
      formData.append("portion", portion);
      formData.append("email", email);

      setLoader(true);
      axios
        .post(API_URL + "/analyze", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(
            "Response after inserting metrics",
            response.data.payload?.metrics?.[0]
          );
          setPrediction(response.data.payload?.metrics?.[0]);
          setIngredients(response.data.payload?.ingredients);
          getMetrics();
          getStdMetrics();
          setLoader(false);
          setShowDialog(true);
        })
        .catch((err) => {
          console.log("Error", err);
          setLoader(false);
        });
    } catch (error) {
      console.error("Error sending image:", error);
    }
  }, [image]);

  const Loader = (): JSX.Element => {
    return (
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  };
  const FoodPrediction = (): JSX.Element => {
    return (
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="div">
            Ingredients
          </Typography>
          <Grid container spacing={2}>
            {ingredients.map((ingredient, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  style={{
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body1">{ingredient}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="div">
            Nutritional Metrics
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Metrics</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(prediction).map(
                  ([key, value]) =>
                    (key === "calories" ||
                      key === "carbohydrates" ||
                      key === "fat" ||
                      key === "protein") && (
                      <TableRow
                        key={key}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {key === "calories" ? "calories(kcal)" : key + "(g)"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {value}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  };

  const TodaysAssessment = (): JSX.Element => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {`Today's Assessment`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BarChart
            width={500}
            height={400}
            data={(metricsData as any) || []}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" stackId="a" fill="#8884d8" />
            <Bar dataKey="carbohydrates" stackId="a" fill="#82ca9d" />
            <Bar dataKey="protein" stackId="a" fill="#ffc658" />
            <Bar dataKey="fat" stackId="a" fill="#ff8042" />
          </BarChart>
        </Box>
      </>
    );
  };

  return (
    <Box
      className="register-page"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {loader && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <Loader />
        </Box>
      )}
      {showDialog && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={showDialog}
          sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 600 } }}
          maxWidth="sm"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Typography variant="h5" gutterBottom>
              {prediction?.dish?.toLocaleUpperCase()}
            </Typography>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <ResponsiveContainer width="100%" height="100%">
            <DialogContent dividers>
              <FoodPrediction />
              <Divider />
              <TodaysAssessment />
            </DialogContent>
          </ResponsiveContainer>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
      {!loader && (
        <Box>
          {image ? (
            <Box sx={{ width: "500px", height: "500px", marginTop: 10 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Portion of your Meal!
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={portion}
                  label="Portion of your Meal!"
                  onChange={(e) => setPortion(e.target.value)}
                >
                  <MenuItem value={250}>Small(250g)</MenuItem>
                  <MenuItem value={500}>Medium(500g)</MenuItem>
                  <MenuItem value={750}>Large(750g)</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ marginTop: "10px" }}>
                <img
                  style={imageStyle}
                  src={`${URL.createObjectURL(image)}`}
                  alt=""
                />
              </Box>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            {image && (
              <Box sx={{ position: "absolute" }}>
                <Button
                  variant="contained"
                  color="success"
                  style={{ borderRadius: "6px" }}
                  size="large"
                  onClick={() => AnalyzeImage()}
                >
                  <Typography>Analyze</Typography>
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  style={{ borderRadius: "6px", marginLeft: 10 }}
                  size="large"
                  onClick={() => setImage(undefined)}
                >
                  <Typography>Go Back</Typography>
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default UploadImage;
