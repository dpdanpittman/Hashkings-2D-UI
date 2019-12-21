import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
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
            Farming
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Vist your Farm or and check your inventory or the your stats
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Farming
        </Button>
        <Button size="small" color="primary">
          Accounting
        </Button>
      </CardActions>
    </Card>
  );
}