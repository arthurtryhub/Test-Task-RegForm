const el = {
  dialog: '[role="dialog"]',
  registerheadBtn: '[data-testid="header-sign-up-button"]',
};

class LandingPage {
  open() {
    cy.visit("");
  }

  validateDialogWindow() {
    cy.get(el.dialog).should("be.visible");
  }

  closeDialogWindow() {
    cy.get(el.dialog).find('[type="button"]').click();
    cy.get(el.dialog).should("not.exist");
  }

  //Could be moved to the separete page for header
  pressRegisterHeadBtn() {
    cy.get(el.registerheadBtn).click();
    cy.url().should("include", "https://account.booking.com/sign-in");
  }
}
export default new LandingPage();
