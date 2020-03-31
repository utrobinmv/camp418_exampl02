const router = require('express').Router();
const logger = require('./lib/logger');
const controller = require('./game');

const arr = [[0,0,0], [0,0,0], [0,0,0]];
  
router.get('/getField', (req, res) => {
    res.send(200, controller.getField());
  });
  
router.post('/move', (req, res) => { 
    logger.log(req.body);

    otvet = controller.checkMove(req.body.x, req.body.y);

    if(otvet == 'ok') {
      controller.makeMove(req.body.x, req.body.y);
    }
    //req.body.x;
    //req.body.y;
    res.send(200, otvet);
  });

module.exports = router; 