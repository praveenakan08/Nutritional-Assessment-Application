import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

const Dashboard = (): JSX.Element => {
  return (
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
        <CardActionArea component={Link} href="/analyzeImage">
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
  );
};

export default Dashboard;
