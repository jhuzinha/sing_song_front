import {faker} from '@faker-js/faker';

beforeEach(async () => {
    await cy.resetDatabase();
  });

describe('POST upvote', () => {
    it('like',  () => {
      const name = faker.random.words(5);
      cy.visit('http://localhost:3000');
      cy.get("input[data-cy='Name']").type(name);
      cy.get("input[data-cy='Url']").type(`https://www.youtube.com/watch?v=${faker.datatype.array(1)}`);
      cy.get("button[data-cy='Enviar']").click();
      cy.contains(name).should('be.visible');
      cy.get("[data-cy = 'up']").click();
      cy.get("div[data-cy = 'index']").first().should('have.text', 1)
    });
  })