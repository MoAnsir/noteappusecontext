/// <reference types="cypress" />
import { clear } from "idb-keyval";

beforeEach(() => {
  clear();
  cy.visit("http://localhost:3000/");
});

// Need to clear the indexDB of any previous data.
// need to do clean up after each test. remove all notes
// in the edit window there are 2 modals, need to pick the correct one.

describe("Note App rendering ", () => {
  it("should display the title, add note and no data components", () => {
    cy.contains("Note App");
    cy.get('[data-testid="add-note"]').should("exist");
    cy.get('[data-testid="no-notes"]').should("exist");
    cy.contains("No Note's");
  });
});

describe("Note CRUD functionality", () => {
  beforeEach(() => {
    cy.get("#notedesc").type("Note desc test 1");
    cy.get("#notenote").type("Note note test 1");
    cy.get("#notetags").type("Note tags test 1");
    cy.get("button").contains("Add note").click();
  });

  it("should add a note and display it in the main notes component", () => {
    cy.get('[data-testid="main-notes"]').contains("Note desc test 1");
    cy.get('[data-testid="main-notes"]').contains("Note note test 1");
    cy.get('[data-testid="main-notes"]').contains("Note tags test 1");
  });

  it("should edit notes", () => {
    cy.get("button").contains("Edit").click();
    cy.get('[data-testid="edit-modal"]')
      .find("#notedesc")
      .type("Note desc test Edit 1");
    cy.get('[data-testid="edit-modal"]')
      .find("#notenote")
      .type("Note note test Edit 1");
    cy.get('[data-testid="edit-modal"]')
      .find("#notetags")
      .type("Note tags test Edit 1");
    cy.get("button").contains("Save").click();
    cy.get('[data-testid="main-notes"]').contains("Note desc test Edit 1");
    cy.get('[data-testid="main-notes"]').contains("Note note test Edit 1");
    cy.get('[data-testid="main-notes"]').contains("Note tags test Edit 1");
  });

  it("should delete a note", () => {
    cy.get('[data-testid="main-notes"]').should("be.visible");
    cy.get('[data-testid="main-notes"]')
      .find("button")
      .contains("Delete")
      .click();
    cy.get('[data-testid="main-notes"]')
      .contains("Note desc test 1")
      .should("not.be.exist");
    cy.get('[data-testid="main-notes"]')
      .contains("Note note test 1")
      .should("not.be.exist");
    cy.get('[data-testid="main-notes"]')
      .contains("Note tags test 1")
      .should("not.be.exist");
  });
});
