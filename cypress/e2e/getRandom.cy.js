import { faker } from "@faker-js/faker";

beforeEach(async () => {
    await cy.resetDatabase();
  });

describe('GET random', () => {
    it('get random without post',  () => {
      cy.visit('http://localhost:3000/top');
      cy.contains('Loading...')
    });
    it('get random with some posts', ()=> {
      cy.visit('http://localhost:3000');
      cy.request("POST", "http://localhost:5000/recommendations", getRandom());
      cy.request("POST", "http://localhost:5000/recommendations", getRandom());
      cy.request("POST", "http://localhost:5000/recommendations", getRandom());
      cy.request("POST", "http://localhost:5000/recommendations", getRandom());
      cy.get("[data-cy = 'random']").click();
      cy.url().should('eq','http://localhost:3000/random')
      cy.get("[data-cy = 'recommendation']").should('have.length.of.at.most', 1)
    })
  })

 function getRandom(){
    return {
        name: faker.random.words(5),
        youtubeLink: `https://www.youtube.com/watch?v=${faker.datatype.array(1)}`
      }
  }