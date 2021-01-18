var test_tensorflow = document.getElementById("test_tensorflow");

test_tensorflow.onclick = function () {
  
  // Load the model.
  use.load().then(model => {
    // Embed an array of sentences.
    const sentences = [
      'Hello.',
      'How are you?'
    ];
    model.embed(sentences).then(embeddings => {
      // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
      // So in this example `embeddings` has the shape [2, 512].
      embeddings.print(true /* verbose */);
    }).catch(err => {
        console.log(err);
    });
  }).catch(err => {
        console.log(err);
    });
  
}
