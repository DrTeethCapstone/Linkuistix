const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
let tensorModel;

onmessage = async (e) => {
  const { userInput, tensorWords } = e.data;
  const TFOutput = await TFWorker(userInput, tensorWords);
  postMessage({
    TFOutput,
  });
};

//our TF function
async function TFWorker(target, tensorWords) {
  //load the USE model
  async function setModel() {
    await tf.ready();
    console.log('ready', tf.memory().numTensors);
    tf.setBackend('cpu');
    const model = await use.load();
    return model;
  }

  if (!tensorModel) {
    tensorModel = await setModel();
  }

  const embedData = async (tensorModel, target, tensorWords) => {
    tf.engine().startScope();
    console.log('start', tf.memory().numTensors);
    const embeddingsFromWords = await tensorModel.embed(tensorWords);
    const embeddingsFromTarget = await tensorModel.embed(target);
    for (let i = 0; i < target.length; i++) {
      for (let j = i; j < tensorWords.length; j++) {
        const wordITranspose = false;
        const wordJTranspose = true;
        const wordScores = tf
          .matMul(
            embeddingsFromTarget,
            embeddingsFromWords,
            wordITranspose,
            wordJTranspose
          )
          .dataSync();
        console.log('end', tf.memory().numTensors);
        tf.engine().endScope();
        return wordScores;
      }
    }
  };
  const outputWordScores = await embedData(tensorModel, target, tensorWords);
  return outputWordScores;
}
