import { AppBar, Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";

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
    fontFamily: [
      'tinos',
    ].join(','),
  },
});


const Dashboard = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: "#26672D"}}
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
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#26672D",
                color: "#ffffff",
              }
            }}
            variant="permanent"
            anchor="left"
          >
          <Toolbar />
          <Grid container justifyContent="center">
            <Avatar
              alt="Profile Image"
              src="/profile-image.png"
              sx={{ width: 75, height: 75 }}
            />
          </Grid>
          <List>
            {['Dashboard', 'Upload Image', 'Edit Profile', 'View Assessment History'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} 
                                primaryTypographyProps={{fontSize: '21px'}}
                                sx={{textAlign: 'center'}}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Logout'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} 
                                primaryTypographyProps={{fontSize: '21px'}}
                                sx={{textAlign: 'center'}}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box>
        <Grid container alignItems={'horizontal'} paddingTop={20} columnGap={4}>
        <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/upload-image.png"
                alt="upload image"
                sx={{ width: 350, height: 350 }}
              />
              <CardContent>
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
                height="140"
                image="/view-assessment-history.png"
                alt="view assessment history"
                sx={{ width: 350, height: 350 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  View Assessment History
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Grid>
      </Box>
      </Grid>
    </ThemeProvider>
  );
}

export default Dashboard;
