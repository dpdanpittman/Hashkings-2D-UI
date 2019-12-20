import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MarketPlots } from './MarketTutorial.js';
import { MarketPlotsTwo } from './MarketTutorialTwo.js';
import { MarketSeeds } from './MarketSeedsTutorial.js';
import { PlantingTutorial } from './PlantingTutorial.js';
import { WateringTutorial } from './WateringTutorial.js';
import { TutorialWelcome } from './TutorialWelcome.js';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),   
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000"
  },
  backgroundExtend: {
    backgroundColor:"#154A4A"
  }
}));

function getSteps() {
  return ['Welcome', 'Delegate', 'Pay Lease', 'Buy Seed', 'Plant Seed', 'Water'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (<TutorialWelcome />);
    case 1:
      return (<MarketPlots />);
    case 2:
      return (<MarketPlotsTwo />);
    case 3:
      return (<MarketSeeds />);
    case 4:
      return (<PlantingTutorial />);
    case 5:
      return (<WateringTutorial />);
    default:
      return 'Not sure where you are going.';
  }
}

export default function Tutorial() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
        <Paper className={classes.paperBlack}><font color="#DFB17B">
      <Stepper activeStep={activeStep} alternativeLabel className={classes.backgroundExtend}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper></font>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}><font color="DFB17B">Great Job! now its time to <a href="/farm">Visit your Farm!</a></font></Typography>
            <Button onClick={handleReset}><font color="#ffffff">Reset</font></Button>
          </div>
        ) : (
          <div>
              <font color="#DFB17B">
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            </font>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                <font color="#ffffff">Back</font>
              </Button>
              <Button variant="contained" color="secondary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
      </Paper>
    </div>
  );
}