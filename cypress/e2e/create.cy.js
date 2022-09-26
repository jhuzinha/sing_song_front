import {faker} from '@faker-js/faker';

beforeEach(async () => {
  await cy.resetDatabase();
});

describe('POST recommendation', () => {
  it('create recommendation',  () => {
    const name = faker.random.words(5);
    cy.visit('http://localhost:3000');
    cy.get("input[data-cy='Name']").type(name);
    cy.get("input[data-cy='Url']").type(`https://www.youtube.com/watch?v=${faker.datatype.array(1)}`);
    cy.intercept('POST', '/recommendations').as('publish');
    cy.get("button[data-cy='Enviar']").click();
    cy.wait('@publish');
    cy.contains(name).should('be.visible');
  });

  it('create recommendation error',  () => {
    const name = faker.random.words(5);
    cy.visit('http://localhost:3000');
    cy.intercept('POST', '/recommendations').as('publish');
    cy.get("input[data-cy='Name']").type(name);
    cy.get("input[data-cy='Url']").type(`https://www.youtube.com/watch?v=${faker.datatype.array(1)}`);
    cy.get("button[data-cy='Enviar']").click();
    cy.wait('@publish');
    cy.get("input[data-cy='Name']").type(name);
    cy.get("input[data-cy='Url']").type(`https://www.youtube.com/watch?v=${faker.datatype.array(1)}`);
    cy.get("button[data-cy='Enviar']").click();
    cy.on('window:alert', (t) => {
        expect(t).to.contains('Error creating recommendation!');
    });
  });
})
