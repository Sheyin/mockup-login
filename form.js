// This triggers when user begins typing input into one of the username-type boxes
// and should disable the inputs of the unused boxes
function usernameSelection(type) {
  const element = document.getElementById(type);
  const elementsOfUsernameGroup = document.getElementsByClassName(
    "username-group"
  );

  // if you are emptying a field, re-enable all the input boxes
  if (element.value.length === 0) {
    resetBoxes();
  } else {
    const unusedInputs = Array.prototype.filter.call(
      elementsOfUsernameGroup,
      x => x != element
    );

    for (let i = 0; i < unusedInputs.length; i++) {
      unusedInputs[i].setAttribute("aria-disabled", "true");
      unusedInputs[i].disabled = true;
    }
  }
}

// Helper function to clear input from boxes and re-enable types.
// Separated with the intention of adding an (x) to quickly clear input.
// However, I'm not sure how to implement that cleanly, so it has not been added.
function resetBoxes() {
  const elementsOfUsernameGroup = document.getElementsByClassName(
    "username-group"
  );
  for (let i = 0; i < elementsOfUsernameGroup.length; i++) {
    elementsOfUsernameGroup[i].disabled = false;
    elementsOfUsernameGroup[i].setAttribute("aria-disabled", "false");
  }
}
