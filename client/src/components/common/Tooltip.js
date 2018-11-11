import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  tooltip: {
    fontWeight: 500,
    fontSize: theme.typography.caption.fontSize
  },
  popper: {}
});

export default withStyles(styles, { withTheme: true })(Tooltip);
