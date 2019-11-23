import React, {useContext, useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router';
import { HashkingsAPI, seedNames } from "../../service/HashkingsAPI";
import {StateContext} from "../../App";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { DataTable } from "primereact/datatable";
//import { ProgressBar } from "primereact/progressbar";
import { Column } from "primereact/column";
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  rootAgain: {
    width: '100%',
  },
  flex: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#095938",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
  root: {
    width: '100%',
    backgroundColor: '#DFB17B',
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#154A4A",
  },
  table: {
    backgroundColor: "#4A8686",
  },
  expansion: {
    backgroundColor: "#154A4A",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const marks = [
  {
    value: 15,
    label: 'Seedling',
  },
  {
    value: 35,
    label: 'Veg',
  },
  {
    value: 60,
    label: 'Flower',
  },
  {
    value: 80,
    label: '',
  },
  {
    value: 100,
    label: 'Harvest',
  },

];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

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

export const HashkingsTemplate = () => {
    const {username} = useContext(StateContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
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
  
  /*const handleClick = () => {
      setOpen(true);
    };*/
  
    {/*const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };*/}

if (username) {
   return (
    <div className={classes.flex}>
      <div className={classes.flex}>
      <Paper className={classes.paper}>
           <ThemeProvider theme={theme}>
                <Typography gutterBottom variant="h1" component="h1">
            <b><font color="DFB17B" className={classes.font}>Grow Journal</font></b>
          </Typography>
                  </ThemeProvider>
                  <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Plot Progress</u></Typography>
                      <em><a href="/market/seedbank">{"Find out how far along your plants are."}</a></em> <b>{"Is it time to Harvest?"}</b>
                    </React.Fragment>
                  }
                  placement="left-start"
                  TransitionComponent={Zoom}
                  >
           <ExpansionPanel className={classes.expansion}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header" 
        >
        <Typography className={classes.heading}><font color="DFB17B" className={classes.font}>Progress</font></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansion}>
        <DataTable
                value={gardens}
                loading={loading}
                responsive={true}
                emptyMessage="Please visit our Market to lease a plot"                
              >
                <Column field="id" header="Plot #" className={classes.font} sortable={false} style={{width:'20%', backgroundColor:"#DFB17B", color:'#000000'}} />
                <Column
                  field="strain"
                  header="Strain"
                  sortable={false}
                  body={({ strain }) => seedNames[strain]}
                  style={{width:'20%', backgroundColor:"#DFB17B", color:'#000000'}}
                  className={classes.font}
                />
                <Column
                  field="stage"
                  header="Growth Stage"
                  sortable={false}
                  style={{backgroundColor:"#DFB17B", color:'#000000'}}
                  className={classes.font}
                  body={({ stage }) => {
                    return (
                      <div className={classes.root}>
                        <Slider
                          defaultValue={Math.floor((stage / 6) * 100)}
                          valueLabelFormat={valueLabelFormat}
                          getAriaValueText={valuetext}
                          aria-labelledby="discrete-slider-restrict"
                          step={null}
                          valueLabelDisplay="auto"
                          marks={marks}
                          disabled={true}
                          color='primary'
                          max={110}
                          min={-5}
                          style={{color:'#000000'}}
                        />
                    </div>
                    );
                  }}
                />
                {/*<Column
                  field="substage"
                  header="Substage"
                  sortable={false}
                  body={({ substage }) => {
                    return (
                      <ProgressBar
                        value={Math.floor((substage / 100) * 100)}
                        showValue={true}
                      />
                    );
                  }}
                />*/}
              </DataTable>
        </ExpansionPanelDetails>
        <Typography className={classes.font}><font color="red">
        Please allow 24 hours for your harvested plots to reset</font></Typography>
        <br/>
      </ExpansionPanel>
      </HtmlTooltip>
      <br/>
      <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Recent Waterings and Plantings</u></Typography>
                      <em><a href="/market/seedbank">{"Keep track of when you last watered!"}</a></em> <b>{"You need to water every plot once every 24 hours.  Don't overwater!"}</b>
                    </React.Fragment>
                  }
                  placement="left"
                  TransitionComponent={Zoom}
                  >
          <ExpansionPanel className={classes.expansion}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><font color="DFB17B" className={classes.font}>Recent Activity</font></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansion}>
        <Paper className={classes.rootAgain}>
      <Table >
        <TableHead>
          <TableRow style={{backgroundColor:"#DFB17B"}}>
            <TableCell className={classes.font}>Action</TableCell>
            <TableCell align="right" className={classes.font}>Region</TableCell>
            <TableCell align="right" className={classes.font}>Time</TableCell>
            <TableCell align="right" className={classes.font}>Plot ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dashboardStats.activity.map(action => (
            <TableRow key={action.block} style={{backgroundColor:"#DFB17B"}}>
              <TableCell component="th" scope="row" className={classes.font}>
              {action.type.charAt(0).toUpperCase() +
                        action.type.slice(1)}
              </TableCell>
              <TableCell align="right" className={classes.font}>{seedNames[action.strain]}</TableCell>
              <TableCell align="right" className={classes.font}>{action.when}</TableCell>
              <TableCell align="right" className={classes.font}>{action.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </HtmlTooltip>
      </Paper>
      </div>
    </div>
      )

  } else {
    return (
    <Redirect to='/login'/>
    );
  }
};

export default withRouter(HashkingsTemplate);