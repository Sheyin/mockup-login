function topCheck() {
  if (self === top) {
    const fb = document.getElementById("ptfb");
    fb.parentNode.removeChild(fb);
  } else {
    try {
      top.location = self.location;
    } catch (ex) {}
  }
}

function doOnLoad() {
  const essHome = "/vqgwi40tsmfus1u_ess";
  let fpBasePath = "";

  if (essHome.substr(essHome.length - 4, 4).toUpperCase() == "_ESS") {
    fpBasePath = "/psc" + essHome.substr(0, essHome.length - 4) + "_pwd";
  }

  function init() {
    // ewb 1/18/2017 No point now, cookie finally restricted to HTTP only.
    // document.cookie = "PS_TOKEN=;expires=Thu, 01-Jan-1970 00:00:01 GMT";

    document.login.timezoneOffset.value = new Date().getTimezoneOffset();

    if (fpBasePath.length > 0) {
      document.getElementById("firstTimeUserLink").href =
        fpBasePath + "/EMPLOYEE/HRMS/c/MHR_SELF_REGISTER.MHR_SELF_REGISTER.GBL";
      document.getElementById("forgotPasswordLink").href =
        fpBasePath + "/EMPLOYEE/HRMS/c/MHR_FORGOT_PSWD.MHR_FORGOT_PSWD.GBL";
    } else {
      document.getElementById("firstTimeUserLink").style.display = "none";
      document.getElementById("forgotPasswordLink").style.display = "none";
    }

    if (document.login.alter_emplid) document.login.alter_emplid.focus();
    if (document.login.emplid) document.login.emplid.focus();
    if (document.login.vuserid) document.login.vuserid.focus();
  }

  function setInput(input) {
    const f = input.value.length > 0 ? disableInput : enableInput;
    switch (input.name) {
      case "vuserid":
        f(document.login.emplid);
        f(document.login.alter_emplid);
        break;
      case "emplid":
        f(document.login.vuserid);
        f(document.login.alter_emplid);
        break;
      case "alter_emplid":
        f(document.login.vuserid);
        f(document.login.emplid);
        break;
    }
  }

  function disableInput(input) {
    if (input) {
      input.value = "";
      input.disabled = true;
      addClassName(input, "disabled");
    }
  }

  function enableInput(input) {
    if (input) {
      input.disabled = false;
      removeClassName(input, "disabled");
    }
  }

  function addClassName(c, className) {
    if (hasClassName(c, className)) return;
    c.className += (c.className.length > 0 ? " " : "") + className;
  }

  function removeClassName(c, className) {
    if (!hasClassName(c, className)) return;
    let cClassName = c.className.split(/\s+/);
    c.className = "";
    for (let i = 0; i < cClassName.length; i++) {
      if (cClassName[i] == className) continue;
      addClassName(c, cClassName[i]);
    }
  }

  function hasClassName(c, className) {
    if (c.className.length == 0) return false;
    if (
      c.className == className ||
      c.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))
    )
      return true;
    return false;
  }

  function prepForm() {
    document.login.userid.value =
      document.login.vuserid && document.login.vuserid.value.length > 0
        ? document.login.vuserid.value
        : "MHR_SIGNON";
    document.login.pwd.value = document.login.vpwd.value;
    return true;
  }
}
