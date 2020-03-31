const { Given } = require('cucumber');
const { Then } = require('cucumber');
const controller = require('../src/game')
const request = require('supertest');
const logger = require('../src/lib/logger');
const assert = require('assert');
//const expect = require('expect');

const app = require('../src/server');

let lastResult = {};

Given('пустое поле', () => {
    controller.reset();
  });

Given('ходит игрок {int}', (i) => {
    // Given('ходит игрок {float}', function (float) {
      // Write code here that turns the phrase above into concrete actions

      controller.setCurrentPlayer(i);

      logger.log("Ходит игрок номер: " + controller.getCurrentPlayer());
  });


 Given('игрок ходит в клетку {int}, {int}', (y, x) => {

  return request(app)
      .post('/move')
      .send({y,x})
      .then((res) => {
        lastResult = res;
        //res.status;
        logger.log("Ходит в клетку {y}, {x}, {Результат}: ", y,x, res.text);

        logger.log("Победитель " + controller.getWinner());
      });

   });


   Then('поле становится {string}', (string) => {

    return request(app)
    .get('/getField')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {

      let responseBody = response.body.toString();
      responseBody = responseBody.replace(/,/g,"");

        assert(responseBody, string)
        logger.log("Вернул поле: " + responseBody);
      });

   });

   Given('поле {string}', (string) => {

    string = string.replace(/\|/g,"");
    let newField = [[],[],[]];
    for( let i in string ){
        newField[Math.floor(i/3)][i%3] = string[i];
    }

    controller.presetField(newField);

    // Write code here that turns the phrase above into concrete actions
  });
 
  Then('возвращается ошибка', () => {
    assert.equal(lastResult.text, 'not ok');
    // Write code here that turns the phrase above into concrete actions
  });

  Then('победил игрок {int}', function (int) {
    assert.equal(int, controller.getWinner());
    });