
var express = require('express')
var router = express.Router()

const axios = require('axios');

var tx = require('../core/transaction.js');

const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)


router.get('/test', (req, res) => {
  return res.json({
    "status": 200,
    "data": "test"
  });
});

router.get('/block/local', asyncHandler(async (req, res, next) => {
  let result = await tx.getBlockLocal();

  return res.json({
    "status": 200,
    "data": result
  });
}));

router.get('/block/remote', asyncHandler(async (req, res, next) => {
  let result = await tx.getBlockRemote();

  return res.json({
    "status": 200,
    "data": result
  });
}));

router.get('/block/compare', asyncHandler(async (req, res, next) => {
  let resultRemote = await tx.getBlockRemote();
  let resultLocal = await tx.getBlockLocal();

  let result = false;

  // 10/9 - 9/10
  if(Math.abs(resultRemote["number"] - resultLocal["number"]) < 5){
    result = true;

    return res.json({
      "status": 200,
      "remote": resultRemote["number"],
      "local": resultLocal["number"],
      "sync": result
    });
  }else{
    return res.json({
      "status": 500,
      "remote": resultRemote["number"],
      "local": resultLocal["number"],
      "sync": result
    });
  }

  console.log("block height matched", result)
}));

module.exports = router
