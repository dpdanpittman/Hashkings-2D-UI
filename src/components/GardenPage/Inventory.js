import React from "react";
import { gardenNames, seedNames } from "../../service/HashkingsAPI";
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import _ from "lodash";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { FarmIcon, SeedIcon, SubdivisionIcon, SeedSvgIcon, DnaIcon, BongIcon } from '../Icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ExpansionPanelDetails } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  flex: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#073232",
  },
  margin: {
    margin: theme.spacing(2),
    whiteSpace: 'wrap',
    scrollable: true
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  card: {
    backgroundColor: "#001E1E",
    whiteSpace: 'wrap',
    scrollable: true
  },
  media: {
    height: 140,
  },
  paperFarming: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#073232",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
    color: '#DFB17B',
    whiteSpace: 'wrap',
    scrollable: true
  },
  extension: {
    backgroundColor: "transparent",
    whiteSpace: 'wrap',
  }
}));

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#000000',
    color: '#DFB17B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function Inventory({user}) {
  const classes = useStyles();

  return (
  <div className={classes.flex}>
      <Grid container spacing={2}>
      <Grid item xs>
      <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Active Plots</u></Typography>
                      <em><a href="/market/seedbank">{"Farm plots which are currently earning"}</a></em> <b>{"Do you need another Plot?  Visit the Market!"}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vAUGcFV.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <center><font color="DFB17B" className={classes.font}>Active Plots</font></center>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.activeGardens.length} color="primary">
                  <FarmIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Plots</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.activeGardens, garden => garden.id[0])
            .map(garden => ({
              id: garden.id[0],
              count: user.activeGardens.filter(
                agarden => agarden.id[0] === garden.id[0]
              ).length
            }))
            .map(garden => (
              <b><font color="B28D43" className={classes.font}><p key={garden.id}>
                <Badge className={classes.margin} badgeContent={garden.count} color="primary">
                  <FarmIcon  />
                </Badge>
                    {gardenNames[garden.id]}
                {garden.count !== 1 ? "" : ""}
              </p></font></b>
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Available Plots</u></Typography>
                      <em><a href="/market/seedbank">{"These plots are ready to go!"}</a></em> <b>{"Do you have extra Seeds?  These plots are available to be farmed."}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/x1eOPYj.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Plots</font>
          </Typography>
          

              <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableGardens.length} color="primary">
                  <FarmIcon  />
                </Badge>
                </Typography>
              </font></b>
         
          <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Plots</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableGardens, garden => garden[0])
            .map(garden => ({
              id: garden[0],
              count: user.availableGardens.filter(
                agarden => agarden[0] === garden[0]
              ).length
            }))
            .map(garden => (
              <b><p key={garden.id}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={garden.count} color="error">
                  <FarmIcon  />
                </Badge>
                 {gardenNames[garden.id]}
                {garden.count !== 1 ? " Plots" : ""}</font>
              </p></b> 
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>

<Grid container spacing={2}>
    <Grid item xs>
    <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Coming Soon</u></Typography>
                     <b>{"Once the subdivisions feature is available this will show your available subdivisions"}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/MCnWKee.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Subdivisions</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableGardens.length * 10} color="primary">
                  <SubdivisionIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Subdivisions</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableGardens, garden => garden[0])
            .map(garden => ({
              id: garden[0],
              count: user.availableGardens.filter(
                agarden => agarden[0] === garden[0]
              ).length
            }))
            .map(garden => (
              <b><p key={garden.id}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={garden.count} color="error">
                  <SubdivisionIcon  />
                </Badge>
                </font>
              </p></b> 
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    
    <Grid item xs>
    <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Coming Soon</u></Typography>
                      <b>{"Once the subdivisions feature is available this will show your Rented Subdivisions"}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/ZUyNK5H.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Rented Subdivisions</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent='0' color="primary">
                  <SubdivisionIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Subdivisions</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.gardens, garden => garden[0])
            .map(garden => ({
              id: garden[0],
              count: user.gardens.filter(
                agarden => agarden[0] === garden[0]
              ).length
            }))
            .map(garden => (
              <b><p key={garden.id}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent='0' color="error">
                  <SubdivisionIcon  />
                </Badge>
                 {gardenNames[garden.id]}
                {garden.count !== 1 ? "s" : ""}</font>
              </p></b> 
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>

<Grid container spacing={2}>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Seeds</u></Typography>
    <em><a href="/market/seedbank">{"Total number of available seeds you own"}</a></em> <b>{"Plant them on an extra plot or trade them above!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2016/04/29195549/cannabis-seeds-101-all-you-need-to-know-and-more.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Seeds</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableSeeds.length} color="primary">
                  <SeedSvgIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Seeds</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.font}>
          {_.uniqBy(user.availableSeeds, seed => seed.strain)
            .map(seed => ({
              strain: seed.strain,
              count: user.availableSeeds.filter(
                aseed => aseed.strain === seed.strain
              ).length
            }))
            .map(seed => (
              <p key={seed.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={seed.count} color="primary">
                  <SeedSvgIcon />
                </Badge>
                 {seedNames[seed.strain]}
                {seed.count !== 1 ? "s" : ""}</font>
              </p>
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Pollen</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of pollen you own"}</a></em> <b>{"Use Pollen to create hybrids!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://subcool.com/wp-content/uploads/2018/04/male-pollen-1024x585.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Pollen</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availablePollen.length} color="primary">
                  <DnaIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Pollen</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availablePollen, pollen => pollen.strain)
            .map(pollen => ({
              strain: pollen.strain,
              count: user.availablePollen.filter(
                apollen => apollen.strain === pollen.strain
              ).length
            }))
            .map(pollen => (
              <p key={pollen.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={pollen.count} color="primary">
                  <DnaIcon  />
                </Badge>
                 {seedNames[pollen.strain]}
                {pollen.count !== 1 ? "s" : ""}</font>
              </p>
            ))}

          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>
    <br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Buds</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/zUL2lCj.jpg?1"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Buds</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={'0'} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Buds</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableBuds, buds => buds.strain)
            .map(buds => ({
              strain: buds.strain,
              count: user.availableBuds.filter(
                abuds => abuds.strain === buds.strain
              ).length
            }))
            .map(buds => (
              <p key={buds.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={buds.count} color="primary">
                  <BongIcon />
                </Badge>
                 {seedNames[buds.strain]}
                {buds.count !== 1 ? " Buds" : " Bud"}</font>
              </p>
            ))}
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </div>
  );
}
