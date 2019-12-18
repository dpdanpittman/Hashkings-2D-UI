import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  media: {
    height: 400,
    width: 500,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(3),
    backgroundColor: "#095938",
  },
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function PostDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
    <CardMedia
      className={classes.media}
      image="https://i.imgur.com/vZ7ShWv.png"
    />
    </Paper>
  </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}