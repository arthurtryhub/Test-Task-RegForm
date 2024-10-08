const el = {
  username: "#username",
  usernameNote: "#username-note",
  submitBtn: "[type='submit']",
  password: "#new_password",
  passwordNote: "#new_password-note",
  passwordConfirm: "#confirmed_password",
  passwordConfirmNote: "#confirmed_password-note",
  passwordExist: "#password",
};

const placeholder = {
  email: "Enter your email address",
  password: "Enter a password",
  confirmpassword: "Confirm your password",
};

const warnings = {
  emptyEmail: "Enter your email address",
  incorrectEmailFormat: "Make sure the email address you entered is correct.",
  emptyConfirmPassword: "Confirm your password",
  EmptyPassword: "Please enter your new password",
};

class RegistrationPage {
  open() {
    cy.visit("https://account.booking.com/sign-in?password=&username=");
  }

  //Could be moved to the separete page for header
  emailRecordExist() {
    cy.get(el.username).should("be.visible");
    this.validateHintRecordByID(el.username, placeholder.email);
  }

  facebookLinkExist() {
    cy.get('[data-provider-name="facebook"]')
      .should("have.attr", "href")
      .and("include", "/social/consent/facebook");
  }

  //Could find record with expected ID then Type page
  typeToRecordByID(recordID, text) {
    cy.get(recordID).clear().type(text);
  }

  //Could find record with expected ID then validate the value
  validateValueRecordByID(text) {
    cy.get(recordID).should("have.value", text);
  }

  //Could find record with expected ID amd validate hint
  validateHintRecordByID(recordID, hint) {
    cy.get(recordID).should("have.attr", "placeholder").and("include", hint);
  }

  //Could validate value for recor with ID
  validateValueRecordByID(text) {
    cy.get(recordID).should("have.value", text);
  }

  //Could find warning message for record with ID
  validateWarningMessageByID(recordID, message) {
    cy.get(recordID).should("contain.text", message);
  }

  validateIncorrectEmailFormat() {
    this.validateWarningMessageByID(el.usernameNote, warnings.incorrectEmailFormat);
  }

  typeEmail(text) {
    this.typeToRecordByID(el.username, text);
  }
  validateEmail(text) {
    this.validateValueRecordByID(el.username, text);
  }

  typePassword(text) {
    this.typeToRecordByID(el.password, text);
  }

  typeExistingPassword(text) {
    this.typeToRecordByID(el.passwordExist, text);
  }

  validateEmptyPassword() {
    this.validateWarningMessageByID(el.passwordNote, warnings.EmptyPassword);
  }

  validateEmptyPasswordConf() {
    this.validateWarningMessageByID(el.passwordConfirmNote, warnings.emptyConfirmPassword);
  }

  typeConfirmPassword(text) {
    this.typeToRecordByID(el.passwordConfirm, text);
  }

  validatePassword(text) {
    this.validateValueRecordByID(el.username, text);
  }

  validateicnorrectEmailFormat(message) {
    cy.get(el.usernameNote).should("have.text", message);
  }

  pressSubmitBtn() {
    cy.get(el.submitBtn).last().click();
  }

  submitForm() {
    cy.intercept("POST", "/api/identity/authenticate/v1.0/enter/email/*").as("submit");
    cy.get(el.submitBtn).click();
    cy.wait("@submit").its("response.statusCode").should("eq", 200);
  }

  passwordFormValidate() {
    cy.get(el.password).should("be.visible");
    this.validateHintRecordByID(el.password, placeholder.password);
    cy.get(el.passwordConfirm).should("be.visible");
    this.validateHintRecordByID(el.passwordConfirm, placeholder.confirmpassword);
  }
}

export default new RegistrationPage();
