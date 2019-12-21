import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FarmIcon } from './Icons';
import { GerminateIconBlack } from './Icons';


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    background: "#DFB17B",
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/RgYo3qZ.png"
          title="South America Plot"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <u>Farming</u>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Vist your Farm or and check your inventory or the your stats
          </Typography>
        </CardContent>
      <CardActions>
      <IconButton color="primary" aria-label="Visit Farm">
        <GerminateIconBlack /> 
      </IconButton>Farm
      <IconButton color="primary" aria-label="Visit Office">
        <FarmIcon /> 
      </IconButton>Office
      </CardActions>
    </Card>
  );
}