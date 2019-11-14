import React, { useContext } from "react";
import BuySeed from "../BuySeed";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import {StateContext} from "../../App";

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
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'wrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#294A0B",
    },
    paperBlue: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'wrap',
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
      backgroundColor: "#000000",
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

  return(
    <Paper className={classes.paperBlacky}>
    <Paper className={classes.paperBlue}>
    <Grid container spacing={3}>
      <Grid item xs>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vAUGcFV.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B">Genesis Seeds</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B">These seeds are the first round of seeds, are extremely rare and are used to make beta seeds.</font>
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
    <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph>
        <font color="DFB17B">Hashkings Seeds are the main driving force behind the game. 
        </font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B">With these seeds it is possible to grow plants, 
        create new seeds and earn STEEM. Unlike our in-game currency Kief(KFQ), 
        seeds are custom designed tokens by @disregardfiat and only available within our ecosystem, 
        NOT tradable on Steem-Engine.</font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B">Original first round of seeds, purchased in the Hashkings Seed Bank or bought from other players. 
        These limited edition seeds cannot be grown and are limited in number. We call 
        them the Genesis Seeds because they are the first ones and give life to the beta seeds after harvest.</font>
      </Typography>
      <Typography paragraph>
        <font color="red">Click next when you are finished!</font>
      </Typography>
      </Paper>    
  </Grid>
    </Grid>
    </Paper>
  </Paper>
  )
};
