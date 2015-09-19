require('babel-core/polyfill');

function log(txt){
    console.log(txt);
}

//function sleepRandom(time){
//  return new Promise(function(resolve, reject){
//    setTimeout(resolve, time * 1e3, 0 | Math.random() * 1e3);
//  });
//}
//
//log('Run');                    // => Run
//sleepRandom(5).then(function(result){
//  log(result);                 // => 869, after 5 sec.
//  return sleepRandom(10);
//}).then(function(result){
//  log(result);                 // => 202, after 10 sec.
//}).then(function(){
//  log('immediately after');    // => immediately after
//  throw Error('Irror!');
//}).then(function(){
//  log('will not be displayed');
//}).catch(log);                 // => => Error: Irror!

var delay = time => new Promise(resolve => setTimeout(resolve, time))

async function sleepRandom(time){
  await delay(time * 1e3);
  return 0 | Math.random() * 1e3;
};
async function sleepError(time, msg){
  await delay(time * 1e3);
  throw Error(msg);
};

(async () => {
  try {
    log('Run');                // => Run
    log(await sleepRandom(5)); // => 936, after 5 sec.
    var [a, b, c] = await Promise.all([
      sleepRandom(5),
      sleepRandom(15),
      sleepRandom(10)
    ]);
    log(a, b, c);              // => 210 445 71, after 15 sec.
    await sleepError(5, 'Irror!');
    log('Will not be displayed');
  } catch(e){
    log(e);                    // => Error: 'Irror!', after 5 sec.
  }
})();