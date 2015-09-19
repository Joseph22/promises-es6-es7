require('babel-core/polyfill');

function log(txt){
    console.log(txt);
}

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