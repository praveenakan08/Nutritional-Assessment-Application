import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import CommonNavBar from "../components/CommonNavBar";

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
  },
});

const Dashboard = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CommonNavBar />
      <Grid container paddingTop={20} paddingLeft={25} columnGap={4}>
        <Card>
          <CardActionArea component={Link} href="/uploadImage">
            <CardMedia
              component="img"
              image="/upload-image.png"
              alt="upload image"
            />
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                Upload Image
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              image="/view-assessment-history.png"
              alt="view assessment history"
            />
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                View Assessment History
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </ThemeProvider>
  );
};

export default Dashboard;
