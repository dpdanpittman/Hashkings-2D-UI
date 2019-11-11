import React, { useContext, useState } from "react";
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import {StateContext} from "../App";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import SvgIcon from '@material-ui/core/SvgIcon';
import WaterModal from "./WaterModal";
import { HashkingsAPI, seedNames } from "../service/HashkingsAPI";

function WaterIcon(props) {
    return (
      <SvgIcon viewBox="0 0 64 64" htmlColor="#2C4770" {...props}>
        <path d="m33.586 32-2-2h-10.666c.047.328.08.66.08 1s-.033.672-.08 1z"/>
        <path d="m15 26.101v9.799c2.279-.465 4-2.484 4-4.899s-1.721-4.436-4-4.9z"/>
        <path d="m29.586 28-1.586-1.586-1.586 1.586z"/>
        <path d="m31.979 14.808h22.042v16.385h-22.042z" transform="matrix(.707 -.707 .707 .707 -3.669 37.142)"/>
        <path d="m40.479 29.671h22.042v3.657h-22.042z" transform="matrix(.707 -.707 .707 .707 -7.19 45.642)"/>
        <path d="m23.479 12.671h22.042v3.657h-22.042z" transform="matrix(.707 -.707 .707 .707 -.148 28.642)"/>
        <path d="m56.586 13c.267-.268.414-.622.414-1s-.147-.732-.415-1l-7.585-7.586c-.534-.535-1.466-.535-2 0l-2.586 2.586 9.586 9.586z"/>
        <path d="m14 55 .658-1.317c.883-1.764 1.342-3.71 1.342-5.683s-.459-3.919-1.342-5.683l-.658-1.317-.658 1.317c-.883 1.764-1.342 3.71-1.342 5.683s.459 3.919 1.342 5.683z"/>
        <path d="m23.686 47.256.314-1.256-1.256.314c-1.796.449-3.435 1.377-4.744 2.686s-2.237 2.948-2.686 4.744l-.314 1.256 1.256-.314c.405-.101.8-.235 1.187-.384-.114.045-.228.09-.338.145l-3.105 1.553-3.106-1.553c-.11-.055-.224-.1-.338-.145.387.149.782.282 1.187.384l1.257.314-.314-1.256c-.449-1.796-1.377-3.435-2.686-4.744s-2.948-2.237-4.744-2.686l-1.256-.314.314 1.256c.449 1.796 1.377 3.435 2.686 4.744.964.964 2.111 1.718 3.365 2.23-.439-.149-.899-.23-1.365-.23-.658 0-1.306.153-1.894.447l-3.106 1.553 3.106 1.553c.588.294 1.236.447 1.894.447s1.306-.153 1.894-.447l2.106-1.053v4.5h-4v2h10v-2h-4v-4.5l2.106 1.053c.588.294 1.236.447 1.894.447s1.306-.153 1.894-.447l3.106-1.553-3.106-1.553c-.588-.294-1.236-.447-1.894-.447-.466 0-.926.081-1.365.23 1.254-.512 2.4-1.266 3.365-2.23 1.309-1.309 2.237-2.948 2.686-4.744z"/>
        <path d="m10 22c0-1.281-.509-2.509-1.414-3.414-1.656-1.656-2.586-3.901-2.586-6.243 0 2.341-.93 4.587-2.586 6.243-.905.905-1.414 2.133-1.414 3.414 0 2.209 1.791 4 4 4s4-1.791 4-4z"/>
        <path d="m16 16c2.209 0 4-1.791 4-4 0-1.281-.509-2.509-1.414-3.414-1.656-1.656-2.586-3.901-2.586-6.243 0 2.341-.93 4.587-2.586 6.243-.905.905-1.414 2.133-1.414 3.414 0 2.209 1.791 4 4 4z"/>
        <path d="m34.586 43.586c-1.656-1.656-2.586-3.901-2.586-6.243 0 2.341-.93 4.587-2.586 6.243-.905.905-1.414 2.133-1.414 3.414 0 2.209 1.791 4 4 4s4-1.791 4-4c0-1.281-.509-2.509-1.414-3.414z"/>
      </SvgIcon>
    );
  }

export const WateringTutorial = () => {
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
    <Grid container spacing={3}>
      <Grid item xs>
      <Paper className={classes.paperBrown}>
                <ThemeProvider theme={theme}>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error"><u>Water</u></Typography>
                      <em><a href="/market/seedbank">{"Your Plants might be thirsty!"}</a></em> <b>{"Give them some water."}</b>
                    </React.Fragment>
                  }
                  placement="right"
                  TransitionComponent={Zoom}
                  >
                  <Fab
                    variant="contained" 
                    color="primary"
                    onClick={() => setWaterModal(!waterModal)}
                    className={classes.button}
                  ><WaterIcon />
                  </Fab>
                  </HtmlTooltip>
                  </ThemeProvider>
                  </Paper>
    </Grid>
    <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph>
        <font color="DFB17B">Go ahead and water your plant now.  Click the button and follow the directions in the popup and verify the transaction.
        </font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B">This step is very important.  Once you water your plant you will want to come back every 24 hours 
        for the next 8 weeks to receive your rewards.  Once the 8 weeks is up you can Harvest and start the process over!</font>
      </Typography>
      <Typography paragraph>
        <font color="red">Click next when you are finished!</font>
      </Typography>
      </Paper>    
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
