import React, { useContext, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import {StateContext} from "../App";
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import SvgIcon from '@material-ui/core/SvgIcon';
import WaterModal from "./WaterModal";

export const TutorialWelcome = () => {
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
  
  const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: "#000000",
      color: '#DFB17B',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const classes = useStyles();
  const [waterModal, setWaterModal] = useState(false);
  const [user, setUser] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: [],
    headBlockNum: undefined
  });
  const [headBlockNum, setHeadBlockNum] = useState(0);

  return(
    <Paper className={classes.paperBlacky}>
    <Paper className={classes.paperBlue}>
    <Grid container spacing={1}>
    <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph>
        <font color="DFB17B">Welcome to Hashkings!
        </font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B">HashKings® is a Crypto Cannabis Farming and Trading Game, 
        Curation Trail and Community on the STEEM Blockchain . Users delegate Steem Power, 
        purchase seeds and propagate plants for daily rewards. Hashkings Farmers grow unique 
        strains, each with their own traits, sell them or use them to continue playing for free! 
        We have designed this game using customized STEEM tokens as our seeds and Steem-Engine tokens as 
        our in game currency (KFQ). A custom API powers Hashkings along with react.js and steem.js. 
        Start your journey to cannabis connoisseur today!</font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B"><b>In this tutorial you will be guided through the basics of Hashkings ie. Delegating, Planting and Watering</b></font>
      </Typography>
      <Typography paragraph>
        <font color="red">Click next when you are ready to begin!</font>
      </Typography>
      </Paper>    
  
    </Grid>
    <Grid item xs={4}>
  <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image="https://i.imgur.com/TLlmPMi.png"
      title="Hashkings"
    />
  </Card>
  </Grid>
  </Grid>
    </Paper>
    <WaterModal
          isOpen={waterModal}
          toggleModal={() => setWaterModal(!waterModal)}
          activeGardens={user.activeGardens}
          username={username}
          headBlockNum={headBlockNum}
        />
  </Paper>
  )
};
