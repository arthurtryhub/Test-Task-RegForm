import LandingPage from "../page-object/landingPage";
import RegistrationPage from "../page-object/registrationPage";

describe("Check Registration Form", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });
  //Better add check for link and etc,
  it("Valdiate Dialog Window", () => {
    LandingPage.open();
    LandingPage.validateDialogWindow();
    LandingPage.closeDialogWindow();
  });

  //Check Registration Form Cover not all links and records
  it("Valdiate Registration Form", () => {
    RegistrationPage.open();
    RegistrationPage.emailRecordExist();
    RegistrationPage.facebookLinkExist();
  });

  it("Send empty / Incorrect Email Format", () => {
    RegistrationPage.open();
    RegistrationPage.typeEmail("sometext");
    RegistrationPage.pressSubmitBtn();
    RegistrationPage.validateIncorrectEmailFormat();
  });

  it("Send empty Password new account", () => {
    let account = {
      email: "gretchen.nikolaus90@ethereal.email",
      password: "ASDqwe1231",
    };

    RegistrationPage.open();
    RegistrationPage.typeEmail(account.email);
    RegistrationPage.submitForm();
    RegistrationPage.passwordFormValidate();
    RegistrationPage.pressSubmitBtn();
    RegistrationPage.validateEmptyPassword();
    RegistrationPage.validateEmptyPasswordConf();
  });

  it("Registrate new account", () => {
    let account = {
      email: "gretchen.nikolaus90@ethereal.email",
      password: "ASDqwe1231",
    };

    RegistrationPage.open();
    RegistrationPage.typeEmail(account.email);
    RegistrationPage.submitForm();
    RegistrationPage.typePassword(account.password);
    RegistrationPage.typeConfirmPassword(account.password);
    //Could be better to check intercept with wait
    RegistrationPage.pressSubmitBtn();
  });

  it("Registrate exicting account", () => {
    let account = {
      email: "braeden.bartoletti87@ethereal.email",
      password: "ASDqwe1231",
    };

    RegistrationPage.open();
    RegistrationPage.typeEmail(account.email);
    RegistrationPage.pressSubmitBtn();
    RegistrationPage.typeExistingPassword(account.password);
    //Could be better to check intercept with wait
    RegistrationPage.pressSubmitBtn();
  });
});
