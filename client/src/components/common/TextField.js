import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    fontWeight: 500
  }
});

export default withStyles(styles, { withTheme: true })(TextField);
