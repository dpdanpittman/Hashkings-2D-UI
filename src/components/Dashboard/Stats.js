import React from "react";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../common/Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  },
  mouseHover: {
    cursor: "pointer"
  }
});

export default function Stats() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Stat</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        updated 9 June, 2019
      </Typography>
      <div>
        <Link className={classes.mouseHover} color="primary">
          View More
        </Link>
      </div>
    </React.Fragment>
  );
}
