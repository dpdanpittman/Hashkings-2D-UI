import React, {useContext, useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import { HashkingsAPI } from "../../service/HashkingsAPI";
import {StateContext} from "../../App";
import PlantModal from "../PlantModal";
import WaterModal from "../WaterModal";
import HarvestModal from "../HarvestModal";
import Inventory from "./Inventory.js";
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { slideInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';
import { slideInRight } from 'react-animations';
import { WaterIcon, GerminateIcon, HarvestIcon } from '../Icons';

const styles = {
  slideInRight: {
    animation: 'x 3s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  },
  slideInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
  },
  slideInLeft1: {
    animation: 'x 2s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft1')
  },
  fadeIn: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  slideInLeft2: {
    animation: 'x 3s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft2')
  }
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  paperBrown: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#532C0C",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
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

export const GardenActions = () => {
    const {username} = useContext(StateContext);
    const classes = useStyles();
  
    const [dashboardStats, setDashboardStats] = useState({
      gardeners: 0,
      gardens: 0,
      availableSeeds: 0,
      activeGardens: 0,
      availableGardens: 0,
      activity: [],
      delegation: 0,
      leaderboard: []
    });
  
    const [plantSeedModal, setPlantSeedModal] = useState(false);
    const [waterModal, setWaterModal] = useState(false);
    const [harvestModal, setHarvestModal] = useState(false);
    const [user, setUser] = useState({
      availableSeeds: [],
      activeGardens: [],
      availableGardens: [],
      headBlockNum: undefined
    });
  
    const [gardens, setGardens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [setNoMoreHistory] = useState(false);
  
    const [headBlockNum, setHeadBlockNum] = useState(0);
  
    const hashkingsApi = new HashkingsAPI();
  
    useEffect(() => {
      if (username) {
        hashkingsApi.getUserGarden(username).then(garden => {
          const {headBlockNum, ...user} = garden;
          setUser(user);
          setHeadBlockNum(headBlockNum);
        });
      }
    }, [username]);
  
    useEffect(() => {
      hashkingsApi
        .getDashboardStats(username)
        .then(stats => {
          if (username) {
            setDashboardStats(stats);
          } else {
            setDashboardStats({
              ...dashboardStats,
              ...stats
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }, [username]);
  
    useEffect(() => {
      if (username) {
        setLoading(true);
        hashkingsApi.getDGPO().then(dgpo => {
          const spv =
            parseFloat(dgpo.total_vesting_fund_steem.split(" ")[0]) /
            parseFloat(dgpo.total_vesting_shares.split(" ")[0]);
          Promise.all([
            hashkingsApi
              .getAccountHistory(spv, username, false)
              .then(
                ({
                  stop,
                  date
                }) => {
  
                  if (stop) {
                    setNoMoreHistory(true);
                  }
  
                  if (date) {
                  }
                }
              ),
            hashkingsApi.getUserGarden(username).then(garden => {
              setGardens(garden.activeGardens);
            })
          ]).then(() => setLoading(false));
        });
      }
    }, [username]);

      return (
        <div className={classes.flex}>
          <StyleRoot>
          <div style={styles.slideInLeft2}>
          <Grid container spacing={12}>
          <Grid item xs={4}>
            <Grid item xs={11}>
              <Paper className={classes.paperBrown}>
            <ThemeProvider theme={theme}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}><u>Plant, Water and Harvest </u></Typography>
                  <em><a href="/market/seedbank">{"This is where you perform your main tasks."}</a></em> <b>{"Don't forget to check the progress!"}</b>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
              <Typography gutterBottom variant="h5" component="h1">
                <b><font color="DFB17B" className={classes.font}>Farm</font></b>
                </Typography>
                </HtmlTooltip>
                </ThemeProvider>
                </Paper>
              </Grid>
              <Grid item xs={11}>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
                <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Planting</u></Typography>
                    <em><a href="/market/seedbank">{"Did you get seeds?"}</a></em> <b>{"plant some Crops!"}</b>
                  </React.Fragment>
                }
                placement="left"
                TransitionComponent={Zoom}
                >
                <Fab
                  variant="contained" 
                  color="primary"
                  onClick={() => setPlantSeedModal(!plantSeedModal)}
                  className={classes.button}
                ><GerminateIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
              </Grid>
              <Grid item xs={11}>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Water</u></Typography>
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
                  <Grid item xs={11}>
                  <Paper className={classes.paperBrown}>            
                    <ThemeProvider theme={theme}>
                    <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="error" className={classes.font}><u>Harvest</u></Typography>
                            <em><a href="/market/seedbank">{"Are those buds nice and ripe?"}</a></em> <b>{"Harvest when they are ready."}</b>
                          </React.Fragment>
                        }
                        placement="top"
                        TransitionComponent={Zoom}
                        >
                        <Fab
                          variant="contained" 
                          color="primary"
                          onClick={() => setHarvestModal(!harvestModal)}
                          className={classes.button}
                        ><HarvestIcon />
                        </Fab>
                        </HtmlTooltip>
                        </ThemeProvider>
                        </Paper>
                        </Grid>
                        {/*
                        <Grid item xs={11}>
                        <ThemeProvider theme={theme}>
                        <img src="https://media.giphy.com/media/GXHR881M1wZ32/giphy.gif" class="rounded" />
                        </ThemeProvider>
                        </Grid>
                        */}
                      </Grid>
                        <Grid item xs={8}>
                          <Inventory user={user} />
                        </Grid>
                      </Grid>
                      <br/>
                      <PlantModal
                        isOpen={plantSeedModal}
                        toggleModal={() => setPlantSeedModal(!plantSeedModal)}
                        availableGardens={user.availableGardens}
                        availableSeeds={user.availableSeeds}
                        username={username}
                      />
                      <WaterModal
                        isOpen={waterModal}
                        toggleModal={() => setWaterModal(!waterModal)}
                        activeGardens={user.activeGardens}
                        username={username}
                        headBlockNum={headBlockNum}
                      />
                      <HarvestModal
                        isOpen={harvestModal}
                        toggleModal={() => setHarvestModal(!harvestModal)}
                        activeGardens={user.activeGardens}
                        username={username}
                        headBlockNum={headBlockNum}
                      />
                      </div>
                    </StyleRoot>
                    </div>
                    
                  );
};

export default withRouter(GardenActions);