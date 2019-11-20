import React, { useContext, useState, useEffect } from "react";
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
import PlantModal from "./PlantModal";
import { HashkingsAPI, seedNames } from "../service/HashkingsAPI";

function GerminateIcon(props) {
    return (
      <SvgIcon viewBox="0 0 64 64" htmlColor="#A3711A" {...props}>
        <path d="m30 51h33v2h-33z"/>
        <path d="m1 51h3v2h-3z"/>
        <path d="m17 63c-7.72 0-14-6.28-14-14h2c0 6.617 5.383 12 12 12s12-5.383 12-12h2c0 7.72-6.28 14-14 14z"/>
        <path d="m20 59c-2.243 0-4-1.317-4-3s1.757-3 4-3 4 1.317 4 3-1.757 3-4 3zm0-4c-1.221 0-2 .592-2 1s.779 1 2 1 2-.592 2-1-.779-1-2-1z"/>
        <path d="m11 57c-1.682 0-3-1.757-3-4s1.318-4 3-4 3 1.757 3 4-1.318 4-3 4zm0-6c-.408 0-1 .779-1 2s.592 2 1 2 1-.779 1-2-.592-2-1-2z"/>
        <path d="m21 51c-1.682 0-3-1.757-3-4s1.318-4 3-4 3 1.757 3 4-1.318 4-3 4zm0-6c-.408 0-1 .779-1 2s.592 2 1 2 1-.779 1-2-.592-2-1-2z"/>
        <path d="m31 46c-3.364 0-6-1.757-6-4s2.636-4 6-4 6 1.757 6 4-2.636 4-6 4zm0-6c-2.29 0-4 1.056-4 2s1.71 2 4 2 4-1.056 4-2-1.71-2-4-2z"/>
        <path d="m41 44c-3.364 0-6-1.757-6-4s2.636-4 6-4 6 1.757 6 4-2.636 4-6 4zm0-6c-2.29 0-4 1.056-4 2s1.71 2 4 2 4-1.056 4-2-1.71-2-4-2z"/>
        <path d="m35 40h2v12h-2z"/>
        <path d="m18 15h-13c-2.206 0-4-1.794-4-4s1.794-4 4-4c0-3.309 2.691-6 6-6 2.673 0 4.93 1.725 5.697 4.18.426-.119.865-.18 1.303-.18 2.757 0 5 2.243 5 5s-2.243 5-5 5zm-13-6c-1.103 0-2 .897-2 2s.897 2 2 2h13c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.532 0-1.046.146-1.528.436-.295.178-.662.19-.97.033-.307-.157-.512-.462-.541-.806-.177-2.089-1.88-3.663-3.961-3.663-2.206 0-4 1.794-4 4 0 .298.045.612.142.991.094.368-.028.759-.317 1.007s-.692.312-1.043.161c-.249-.105-.512-.159-.782-.159z"/>
        <path d="m42 15h-13c-2.206 0-4-1.794-4-4s1.794-4 4-4c0-3.309 2.691-6 6-6 2.673 0 4.93 1.725 5.697 4.18.426-.119.865-.18 1.303-.18 2.757 0 5 2.243 5 5s-2.243 5-5 5zm-13-6c-1.103 0-2 .897-2 2s.897 2 2 2h13c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.532 0-1.046.146-1.528.436-.296.178-.663.19-.97.033s-.512-.462-.541-.806c-.177-2.089-1.88-3.663-3.961-3.663-2.206 0-4 1.794-4 4 0 .298.045.612.142.991.094.368-.028.759-.317 1.007-.288.248-.692.312-1.043.161-.249-.105-.512-.159-.782-.159z"/>
        <path d="m54.256 27.686-1.256.314.314-1.256c.449-1.796 1.377-3.435 2.686-4.744 1.309-1.309 2.948-2.237 4.744-2.686l1.256-.314-.314 1.256c-.449 1.796-1.377 3.435-2.686 4.744-1.309 1.309-2.948 2.237-4.744 2.686z" fill="#669e4f"/>
        <path d="m49.744 27.686 1.256.314-.314-1.256c-.449-1.796-1.377-3.435-2.686-4.744-1.309-1.309-2.948-2.237-4.744-2.686l-1.256-.314.314 1.256c.449 1.796 1.377 3.435 2.686 4.744 1.309 1.309 2.948 2.237 4.744 2.686z" fill="#669e4f "/>
        <path d="m52.658 26.683-.658 1.317-.658-1.317c-.883-1.764-1.342-3.71-1.342-5.683 0-1.973.459-3.919 1.342-5.683l.658-1.317.658 1.317c.883 1.764 1.342 3.71 1.342 5.683 0 1.973-.459 3.919-1.342 5.683z" fill="#78b75b"/>
        <path d="m55.106 30.553-3.106-1.553 3.106-1.553c.588-.294 1.236-.447 1.894-.447.658 0 1.306.153 1.894.447l3.106 1.553-3.106 1.553c-.588.294-1.236.447-1.894.447-.658 0-1.306-.153-1.894-.447z" fill="#78b75b"/>
        <path d="m45.106 30.553-3.106-1.553 3.106-1.553c.588-.294 1.236-.447 1.894-.447.658 0 1.306.153 1.894.447l3.106 1.553-3.106 1.553c-.588.294-1.236.447-1.894.447-.658 0-1.306-.153-1.894-.447z" fill="#78b75b"/>
        <path d="m52 29c-.379 0-.725-.214-.895-.553l-.658-1.316c-.947-1.894-1.447-4.014-1.447-6.131s.5-4.237 1.447-6.131l.658-1.316c.339-.678 1.45-.678 1.789 0l.658 1.316c.948 1.894 1.448 4.014 1.448 6.131s-.5 4.237-1.447 6.131l-.658 1.316c-.17.339-.516.553-.895.553zm0-12.734c-.656 1.486-1 3.111-1 4.734s.344 3.248 1 4.734c.656-1.486 1-3.111 1-4.734s-.344-3.248-1-4.734z"/>
        <path d="m57 32c-.808 0-1.618-.191-2.341-.553l-3.105-1.553c-.34-.169-.554-.515-.554-.894s.214-.725.553-.895l3.105-1.553c1.448-.723 3.236-.723 4.683 0l3.106 1.553c.339.17.553.516.553.895s-.214.725-.553.895l-3.105 1.553c-.724.361-1.534.552-2.342.552zm-1.448-2.342c.896.447 2 .447 2.896 0l1.316-.658-1.317-.658c-.895-.447-2-.447-2.895 0l-1.316.658z"/>
        <path d="m47 32c-.808 0-1.618-.191-2.341-.553l-3.105-1.553c-.34-.169-.554-.515-.554-.894s.214-.725.553-.895l3.105-1.553c1.448-.723 3.236-.723 4.683 0l3.106 1.553c.339.17.553.516.553.895s-.214.725-.553.895l-3.105 1.553c-.724.361-1.534.552-2.342.552zm-1.448-2.342c.896.447 2 .447 2.896 0l1.316-.658-1.317-.658c-.895-.447-2-.447-2.895 0l-1.316.658z"/>
        <path d="m53 29c-.262 0-.517-.103-.707-.293-.249-.248-.348-.608-.263-.949l.314-1.256c.493-1.971 1.512-3.772 2.949-5.209 1.437-1.438 3.238-2.457 5.209-2.949l1.255-.313c.338-.086.701.014.95.263.249.248.348.608.263.949l-.314 1.256c-.493 1.971-1.512 3.772-2.949 5.209-1.437 1.438-3.238 2.457-5.208 2.948l-1.256.314c-.08.02-.162.03-.243.03zm7.614-8.614c-1.474.435-2.817 1.231-3.907 2.321-1.089 1.09-1.887 2.434-2.321 3.907 1.473-.435 2.817-1.231 3.907-2.321 1.089-1.09 1.887-2.434 2.321-3.907z"/>
        <path d="m51 29c-.081 0-.163-.01-.243-.03l-1.256-.314c-1.971-.491-3.771-1.511-5.208-2.948s-2.457-3.238-2.949-5.209l-.314-1.256c-.085-.341.015-.701.263-.949.249-.249.612-.349.95-.263l1.256.314c1.97.491 3.771 1.511 5.208 2.948s2.457 3.238 2.949 5.209l.314 1.256c.085.341-.015.701-.263.949-.19.19-.445.293-.707.293zm-7.614-8.614c.435 1.474 1.232 2.817 2.321 3.907 1.09 1.09 2.434 1.887 3.907 2.321-.435-1.474-1.232-2.817-2.321-3.907-1.09-1.09-2.434-1.887-3.907-2.321z"/>
        <path d="m51 29h2v23h-2z"/>
      </SvgIcon>
    );
    }

export const PlantingTutorial = () => {
  const hashkingsApi = new HashkingsAPI();
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
  const [plantSeedModal, setPlantSeedModal] = useState(false);
  const [user, setUser] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: [],
    headBlockNum: undefined
  });

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

  const [gardens, setGardens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setNoMoreHistory] = useState(false);

  const [headBlockNum, setHeadBlockNum] = useState(0);

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
                      <Typography color="error"><u>Planting</u></Typography>
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
    <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph>
        <font color="DFB17B">The next step is to plant your seed on your plot of land. 
        </font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B">When you click the button you will see a popup. Please follow the directions.</font>
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
    <PlantModal
          isOpen={plantSeedModal}
          toggleModal={() => setPlantSeedModal(!plantSeedModal)}
          availableGardens={user.availableGardens}
          availableSeeds={user.availableSeeds}
          username={username}
        />
  </Paper>
  )
};
