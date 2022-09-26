import {faker} from '@faker-js/faker'

beforeEach(async () => {
    await cy.resetDatabase();
  });

describe('GET all', () => {
    it('get all',  () => {
      cy.visit('http://localhost:3000');
      cy.contains('No recommendations yet! Create your own :)')
    });
    it('get top with some posts',  () => {
      cy.visit('http://localhost:3000');
      for(let x = 0; x < 15; x++){
        cy.request("POST", "http://localhost:5000/recommendations", getRandom());
      }
      cy.url().should('eq','http://localhost:3000/')
      cy.get("[data-cy = 'recommendation']").should('have.length.of.at.most', 15)
    });
  })


function getRandom(){
  return {
      name: faker.random.words(5),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.datatype.array(1)}`
    }
}