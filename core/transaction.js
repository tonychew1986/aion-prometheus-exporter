
const axios = require('axios');
// var SoChain = require('sochain');

require('dotenv').config()

const config = require('config');

const Web3 = require('aion-web3');

let getBlockLocal = async function() {
  console.log("----local----")
  // var promise = new Promise(function(resolve, reject){
  //   var dataString = `{"jsonrpc":"2.0","method":"eth_blockNumber","params":[]}`;
  //
  //
  //   //let url = `http://${USER}:${PASS}@${IP}:${PORT}/`;
  //   let url = `http://52.221.192.228:8545`;
  //   console.log("dataString", dataString)
  //   console.log("url", url)
  //
  //   axios.post(url, dataString)
  //   .then(function (response) {
  //     console.log(response["data"])
  //
  //     resolve(response["data"]["result"])
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // });
  // return promise;

  let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  var promise = new Promise(function(resolve, reject){
    web3.eth.getBlock('latest', false).then((block) => {
      console.log(`The latest block number was ${block.number}. It contained ${block.transactions.length} transactions.`);
      resolve(block);
    });
  });
  return promise;
}

let getBlockRemote = async function() {
  console.log("----remote----")
  const apiKey = 'a56a5dd247bf44da9dc8421db3b169be';
  let web3 = new Web3(new Web3.providers.HttpProvider(
    `https://aion.api.nodesmith.io/v1/mainnet/jsonrpc?apiKey=${apiKey}`));

  var promise = new Promise(function(resolve, reject){
    web3.eth.getBlock('latest', false).then((block) => {
      console.log(`The latest block number was ${block.number}. It contained ${block.transactions.length} transactions.`);
      resolve(block);
    });
  });
  return promise;
}

exports.getBlockLocal = getBlockLocal;
exports.getBlockRemote = getBlockRemote;
