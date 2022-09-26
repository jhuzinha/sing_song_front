import {faker} from '@faker-js/faker';

beforeEach(async () => {
    await cy.resetDatabase();
  });

describe('POST downvote', () => {
    it('create recommendation',  () => {
      const name = faker.random.words(5);
      cy.visit('http://localhost:3000');
      cy.get("input[data-cy='Name']").type(name);
      cy.get("input[data-cy='Url']").type(`https://www.youtube.com/watch?v=${faker.datatype.array(1)}`);
      cy.get("button[data-cy='Enviar']").click();
      cy.contains(name).should('be.visible');
      cy.get("[data-cy = 'down']").click();
      cy.get("div[data-cy = 'index']").first().should('have.text', -1)
    });
    it('deslike and delete',  () => {
      const name = faker.random.words(5);
      cy.visit('http://localhost:3000');
      cy.get("input[data-cy='Name']").type(name);
      cy.get("input[data-cy='Url']").type(`https://www.youtube.com/watch?v=${faker.datatype.array(1)}`);
      cy.get("button[data-cy='Enviar']").click();
      cy.contains(name).should('be.visible');
      
      for(let x = 0; x < 6; x++){
        cy.get("[data-cy = 'down']").click();
      }
      cy.contains(name).should('not.exist');
    });
  })