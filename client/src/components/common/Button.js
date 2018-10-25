import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    borderRadius: "18px"
  },
  label: {
    textTransform: "capitalize",
    fontWeight: 600
  }
});

export default withStyles(styles, { withTheme: true })(Button);
