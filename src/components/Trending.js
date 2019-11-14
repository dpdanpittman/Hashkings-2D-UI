import React, { useContext, useState, useEffect } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { HashkingsAPI } from "../service/HashkingsAPI";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import SkeletonPage from './SkeletonPage.js';
import Avatar from '@material-ui/core/Avatar';
import {StateContext} from "../App";
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(3),
    backgroundColor: "#095938",
  },
  post: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#095938",
  },
  media: {
    height: 'auto',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  flex: {
    flexGrow: 1,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 'auto',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  text: {
    color: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ffffff'
  }
}));

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#000000",
    color: '#DFB17B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function RecipeReviewCard() {
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const [trending, setTrending] = useState();
  const {steemConnectAPI} = useContext(StateContext);

  useEffect(() => {
    const hashkingsAPI = new HashkingsAPI();
    hashkingsAPI.getTrending().then(setTrending);
  }, []);

  if (!trending) return <SkeletonPage />;

  return (
    <div className={classes.root}>
    <GridList cellHeight={250} spacing={1} className={classes.gridList}>
      {trending.map(post => {
        const images = JSON.parse(post.json_metadata).image;
        const voting = () => {
          const weight = 420;
          console.dir(username);
          steemConnectAPI.vote([username], post.author, post.permlink, weight);
        };
        return (
          <GridListTile key={post.post_id} cols={post.title ? 2 : 1} rows={post.title ? 2 : 1}>
            <img src={images && images.length > 0 ? images[0] : "https://i.imgur.com/plwe4uc.png"} alt="Hashkings Logo" />
            <a href={"https://www.steempeak.com/@" + post.author + "/" + post.permlink} target="_blank" rel="noopener noreferrer">
            <GridListTileBar
              title={post.title}
              titlePosition="top"
              subtitle={post.author}
              actionIcon={
                <IconButton aria-label={`star ${post.net_votes}`} className={classes.icon}>
                <Avatar className={classes.avatar}>
               <img
               alt="STEEM Avatar"
               src={`https://steemitimages.com/u/${post.author}/avatar/small`}
               />
               </Avatar>
                </IconButton>
              }
              actionPosition="left"
            />
            </a>
            <GridListTileBar
              title={"Pending Payout: " + post.pending_payout_value}
              titlePosition="bottom"
              
              actionIcon={
                <HtmlTooltip
                title={
                <React.Fragment>
                  <Typography color="error">Custom Upvote Weight Coming Soon! (Currently set at 4.2%)</Typography>
                </React.Fragment>
                }
                placement="top"
                TransitionComponent={Zoom}
                >
                <IconButton aria-label={`star ${post.net_votes}`} className={classes.icon} onClick={voting}>
                  {post.active_votes.length}<FavoriteIcon />
                </IconButton>
                </HtmlTooltip>
              }
              actionPosition="left"
              
            />
          </GridListTile>)
      } )}
    </GridList>
  </div>
  );
}