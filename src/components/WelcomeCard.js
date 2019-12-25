import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { ParallaxBanner } from 'react-scroll-parallax';

const useStyles = makeStyles({
  card: {
    maxWidth: 1200,
  },
  media: {
    height: 100,
  },
});

export default function WelcomeCard() {
  const classes = useStyles();

  return (
    <div>
    <ParallaxBanner
    className={classes.media}
    layers={[
        {
            image: 'https://i.imgur.com/lLmUeqa.png',
            amount: -.1,
            expanded: true,
        },
    ]}
    style={{
        height: '100px',
    }}
>
</ParallaxBanner>
    </div>
  );
}