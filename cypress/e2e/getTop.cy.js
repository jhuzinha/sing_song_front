import {faker} from '@faker-js/faker'

beforeEach(async () => {
    await cy.resetDatabase();
  });

describe('GET top', () => {
    it('get top without post',  () => {
      cy.visit('http://localhost:3000/top');
      cy.contains('No recommendations yet! Create your own :)')
    });
    it('get top with some posts',  () => {
      cy.visit('http://localhost:3000');
      for(let x = 0; x < 15; x++){
        cy.request("POST", "http://localhost:5000/recommendations", getRandom());
      }
      cy.get("[data-cy = 'top']").click();
      cy.url().should('eq','http://localhost:3000/top')
      cy.get("[data-cy = 'recommendation']").should('have.length.of.at.most', 10)
    });
  })


function getRandom(){
  return {
      name: faker.random.words(5),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.datatype.array(1)}`
    }
}