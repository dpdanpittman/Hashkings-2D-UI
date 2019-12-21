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

export default function MarketCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://cdn.shopify.com/s/files/1/0065/4917/6438/products/a-man-lounges-while-smoking-weed-and-view-of-an-outdoor-rural-market-background_1200x1200.jpg?v=1536742441"
          title="Market"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Market
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Purchase Seeds or lease property to grow on.
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Seeds
        </Button>
        <Button size="small" color="primary">
          Leasing
        </Button>
      </CardActions>
    </Card>
  );
}