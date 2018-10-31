import React from "react";
import PropTypes from "prop-types";

import StepperMaterial from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

const Stepper = props => {
  const { activeStep, steps, skipped } = props;

  return (
    <div>
      <StepperMaterial activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (step.optional) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (skipped.has(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </StepperMaterial>
    </div>
  );
};

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  skipped: PropTypes.object.isRequired
};

export default Stepper;
