const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
let tensorModel;

//onmessage receives the web worker payload
onmessage = async (e) => {
  //The payload consists of the target word (userInput) and the list of words to match (tensorWords)
  const { userInput, tensorWords } = e.data;

  //Send our payload to the TFWorker function
  const TFOutput = await TFWorker(userInput, tensorWords);

  //Once TFWorker is done, post the output back to the calling document
  postMessage({
    TFOutput,
  });
};

//Our TF function
//The arguments consist of the target word (target) and the list of words to match (tensorWords)
async function TFWorker(target, tensorWords) {
  //load the Universal Sentence Encoder (USE) model
  async function setModel() {
    await tf.ready();

    //When tensorFlow is ready, set the backend to CPU
    // Normally, tf would use the GPU as well, but we don't have access to that in this web worker
    //Best to leave the GPU to render PIXI
    tf.setBackend('cpu');

    //Here, we load the USE model and return it to our caller
    const model = await use.load();
    return model;
  }

  //Caller of the setModel function
  console.log('does the tensorModel ever not exist?');
  if (!tensorModel) {
    console.log('nope!');
    tensorModel = await setModel();
  }

  //embedData takes our tensor model (tensorModel), our target word (target), and our words to match (tensorWords)
  const embedData = async (tensorModel, target, tensorWords) => {
    tf.engine().startScope();

    //Use our model to embed our word(s)
    //Words become vectors
    const embeddingsFromWords = await tensorModel.embed(tensorWords);
    const embeddingsFromTarget = await tensorModel.embed(target);

    //For each word to match, compare it to our target word
    //We are using the dot product (.matMul) to compare the target vector to the words to match vectors
    //The closer to the target array the word to match is, the higher the value
    for (let i = 0; i < target.length; i++) {
      for (let j = i; j < tensorWords.length; j++) {
        //We need to transpose one array in order to calculate the dot product
        //i.e., a 3x5 array needs a 5x3 array as its dot product argument
        const wordITranspose = false;
        const wordJTranspose = true;

        //Get the mathmatical difference (dot product) between the target and the words to match
        const wordScores = tf
          .matMul(
            embeddingsFromTarget,
            embeddingsFromWords,
            wordITranspose,
            wordJTranspose
          )
          .dataSync();

        //Clean up our memory by disposing of the embeddings
        embeddingsFromWords.dispose();
        embeddingsFromTarget.dispose();
        tf.engine().endScope();

        //Return our array of word scores that compare the target to the words to match
        return wordScores;
      }
    }
  };

  //Caller of the emdedData function
  const outputWordScores = await embedData(tensorModel, target, tensorWords);

  //Send the tf output array to the web worker dispatcher up top
  //The scores will be matched to each word's PIXI object
  return outputWordScores;
}
