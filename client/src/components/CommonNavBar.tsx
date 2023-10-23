import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

const drawerWidth = 240;

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
    button: {
      textTransform: "none",
    },
  },
});

const CommonNavBar = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "#26672D",
        }}
      >
        <Toolbar>
          <Typography variant="h3" noWrap component="div">
            NutriFit
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container xs={12}>
        <Box>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#26672D",
                color: "#ffffff",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Grid container justifyContent="center" columnGap={10}>
              <Avatar
                alt="Profile Image"
                src="/profile-image.png"
                sx={{ width: 75, height: 75 }}
              />
              <Button
                variant="text"
                sx={{ color: "#ffffff" }}
                component={Link}
                href="/viewProfile"
              >
                <Typography>Your Profile</Typography>
              </Button>
            </Grid>

            <List>
              {[
                { text: "Dashboard", url: "/dashboard" },
                { text: "Upload Food Image", url: "/uploadImage" },
                // { text: "Edit Profile", url: "/viewProfile" },
                { text: "View Assessment History", url: "/" },
              ].map((item, index) => (
                <Link href={item.url} style={{ color: "#FFF" }}>
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{ fontSize: "21px" }}
                        sx={{ textAlign: "center" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {["Logout"].map((text, index) => (
                <Link href="/login" style={{ color: "#FFF" }}>
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => localStorage.clear()}>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{ fontSize: "21px" }}
                        sx={{ textAlign: "center" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
export default CommonNavBar;
