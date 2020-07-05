/// <reference types="cypress" />

describe("Smoke Test", () => {
  it("should work", () => {
    cy.visit("/");
    cy.get("p").contains("Vinicius De Antoni");
  });
});
