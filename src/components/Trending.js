import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { HashkingsAPI } from "../service/HashkingsAPI";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import PostDialog from './PostDialog.js';

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
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [trending, setTrending] = useState();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const hashkingsAPI = new HashkingsAPI();
    hashkingsAPI.getTrending().then(setTrending);
  }, []);

  if (!trending) return <p className={classes.text}><h1>Loading...</h1></p>;

  return (
    <div className={classes.root}>
      <PostDialog/>
    <GridList cellHeight={400} spacing={1} className={classes.gridList}>
      {trending.map(post => (
        <a href={"https://www.steempeak.com/@" + post.author + "/" + post.permlink}>
        
        <GridListTile key={post.post_id} cols={post.title ? 2 : 1} rows={post.title ? 2 : 1}>
          <img src="https://i.imgur.com/plwe4uc.png" alt="Hashkings Logo" />
          <GridListTileBar
            title={post.title}
            titlePosition="top"
            subtitle={post.category}
            actionIcon={
              <IconButton aria-label={`star ${post.net_votes}`} className={classes.icon}>
                <Typography paragraph>{post.author}</Typography>
              </IconButton>
            }
            actionPosition="left"
          />
        </GridListTile>
        
        </a>
      ))}
    </GridList>
  </div>
  );
}