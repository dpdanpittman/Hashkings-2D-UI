import React, {useContext, useState, useEffect} from "react";
import BuySeed from "./BuySeed";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import {StateContext} from "../App";

export const MarketSeeds = () => {
  const {username} = useContext(StateContext);
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    root: {
      '& > svg': {
        margin: theme.spacing(2),
      },
    },
    rootAgain: {
      width: '100%',
    },
    iconHover: {
      '&:hover': {
        color: "red[800]",
      },
    },
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    flex: {
      flexGrow: 1,
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#294A0B",
    },
    paperBlue: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#154A4A",
    },
    paperExtended: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#532C0C",
    },
    paperBlack: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#154A4A"
    },
    paperBlacky: {
      padding: theme.spacing(1),
      backgroundColor: "#000000",
    },
    paperBrown: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#532C0C",
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    card: {
      maxWidth: 345,
      backgroundColor: "#154A4A",
    },
    media: {
      height: 140,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  
  const theme = createMuiTheme({
    palette: {
      primary: { 500: '#00211B' }, // custom color in hex 
    },
  });
  
  const classes = useStyles();
  
  if (username) {
  return(
    <Paper className={classes.paperBlacky}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paperBlack}>   
          <ThemeProvider theme={theme}>
            <Typography gutterBottom variant="h5" component="h1">
              <b><font color="#DFB17B"><u>Purchase Seeds</u></font></b>
            </Typography>
          </ThemeProvider>
        </Paper>
      </Grid>
      <Grid item xs>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vAUGcFV.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B">Rare Seeds</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B">These are our rare seeds with special traits.</font>
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B"><b>Price: 3 STEEM</b></font>
          </Typography>
              <label htmlFor="multiselect" />
            <BuySeed type="t" />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2016/04/29195549/cannabis-seeds-101-all-you-need-to-know-and-more.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B">Common Seeds</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B">Common seeds are the most common type but come with special traits.</font>
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B"><b>Price: 1.5 STEEM</b></font>
          </Typography>
          <BuySeed type="m" />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/x1eOPYj.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B">General Seeds</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B">These are the most common kind of seed with no extra traits associated.</font>
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B"><b>Price: 0.75 STEEM</b></font>
          </Typography>
          <BuySeed type="r" />
        </CardContent>
      </Card>
    </Grid>
    </Grid>
  </Paper>
  )
} else {
  return (
  <Redirect to='/login'/>
  );
}
};
