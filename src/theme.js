import red from "@material-ui/core/colors/red";
import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4c8c4a"
    },
    secondary: {
      main: "#4f83cc"
    },
    error: {
      main: red.A700
    },
    background: {
      default: "#fff"
    }
  }
});

export default theme;
