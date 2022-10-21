const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
let tensorModel;
// var window = self;

//this function takes our web worker message
//it runs the TF function and awaits it. Posts output when done
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
    tf.setBackend("cpu");
    // await use.load();
    const model = await use.load();
    // const model = await use.loadQnA();
    return model;
  }
  //this holds our created model
  // const modelObj = await setModel();
  //send the data to rf model

  if (!tensorModel) {
    console.log("load model");
    tensorModel = await setModel();
  }

  const embedData = async (tensorModel, target, tensorWords) => {
    tf.engine().startScope();
    console.log("tensorModel: ", tensorModel);

    const embeddingsFromWords = await tensorModel.embed(tensorWords);
    const embeddingsFromTarget = await tensorModel.embed(target);
    //TODO: THIS DOESN'T RETURN THE SAME INFORMATION THAT ON GOOGLE'S REF
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

        tf.engine().endScope();
        // set scores with result
        return wordScores;
      }
    }
  };
  //we send the model and embed the data
  //our scores are returned
  const outputWordScores = await embedData(tensorModel, target, tensorWords);

  //tidies up the memory
  // const cleanUp = () => {
  //   tf.tidy(embedData);
  // };
  // cleanUp();

  //returns the scores to the web worker on message
  //which then posts it back to our component
  // return 'testing the capability';
  console.log("outputWordScores: ", outputWordScores);
  return outputWordScores;
}
