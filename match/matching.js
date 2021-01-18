/*
var test_tensorflow = document.getElementById("test_tensorflow");

test_tensorflow.onclick = function () {
    dfd.read_csv("http://35.247.119.29/launch/data.csv").then(df1 => {
        df1.print();
        // Load the model.
        use.load().then(model => {
            // Embed an array of sentences.
            sentence1 = df1.loc({ rows: [0], columns: ["desc_entry"] }).values[0][0];
            sentence2 = df1.loc({ rows: [1], columns: ["desc_entry"] }).values[0][0];
            console.log(sentence1);
            console.log(sentence2);
            const sentences = [
                sentence1,
                sentence2
            ];
            model.embed(sentences).then(embeddings => {
                // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
                // So in this example `embeddings` has the shape [2, 512].
                embeddings.print(true /* verbose *//*);
            });
        });

    }).catch(err => {
        console.log(err);
    })
}
*/


document.addEventListener('DOMContentLoaded', function() {
    runonload();
}, false);



//var test_tensorflow = document.getElementById("test_tensorflow");

function runonload () {
    dfd.read_csv("http://35.247.119.29/launch/data.csv").then(df => {
        df.print();

        // Load the model.
use.loadQnA().then(model => {
  // Embed a dictionary of a query and responses. The input to the embed method
  // needs to be in following format:
  // {
  //   queries: string[];
  //   responses: Response[];
  // }
  // queries is an array of question strings
  // responses is an array of following structure:
  // {
  //   response: string;
  //   context?: string;
  // }
  // context is optional, it provides the context string of the answer.


  var arr = [];
  for (var i = 0; i < df.size - 1; i++) {
        sentence = df.loc({ rows: [i], columns: ["desc_entry"] }).values[0][0];
        arr.push(sentence);
  }

  const input = {
    queries: arr,
    responses: arr
  };
  var scores = []; // 2d array [[index, other index, score], [index, other index, score]]
  const embeddings = model.embed(input);
  /*
    * The output of the embed method is an object with two keys:
    * {
    *   queryEmbedding: tf.Tensor;
    *   responseEmbedding: tf.Tensor;
    * }
    * queryEmbedding is a tensor containing embeddings for all queries.
    * responseEmbedding is a tensor containing embeddings for all answers.
    * You can call `arraySync()` to retrieve the values of the tensor.
    * In this example, embed_query[0] is the embedding for the query
    * 'How are you feeling today?'
    * And embed_responses[0] is the embedding for the answer
    * 'I\'m not feeling very well.'
    */
  const embed_query = embeddings['queryEmbedding'].arraySync();
  const embed_responses = embeddings['responseEmbedding'].arraySync();
  // compute the dotProduct of each query and response pair.
  for (let i = 0; i < input['queries'].length; i++) {
    for (let j = 0; j < input['responses'].length; j++) {
      var temp = [i, j, dotProduct(embed_query[i], embed_responses[j])];
      scores.push(temp);
      //scores.push(dotProduct(embed_query[i], embed_responses[j]));
    }
  }



var match_counter = 1;

for (let i = 0; i < scores.length; i++) {
        if (scores[i][2] > 10) {
                first_index = scores[i][0];
                second_index = scores[i][1];
        }

        document.getElementById("match_section").innerHTML = 'MATCH ' + match_counter;
        document.getElementById("match_content").innerHTML += '' + df.loc({ rows: [first_index], columns: ["form_type_entry"] }).values[0][0] + '<br>';
        document.getElementById("match_content").innerHTML += '' + df.loc({ rows: [first_index], columns: ["name_entry"] }).values[0][0] + '<br>';
        document.getElementById("match_content").innerHTML += '' + df.loc({ rows: [first_index], columns: ["org_entry"] }).values[0][0] + '<br>';
        /* email, desc, website TBD */
        /*
        print "MATCH " match_counter
        // person 1, print all their information
        //print df.loc({ rows: [first_index], columns: ["form_type_entry"] }).values[0][0];
        //print df.loc({ rows: [first_index], columns: ["name_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["org_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["email_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["desc_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["website_entry"] }).values[0][0];

        // person 2, print all their information
        print df.loc({ rows: [first_index], columns: ["form_type_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["name_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["org_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["email_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["desc_entry"] }).values[0][0];
        print df.loc({ rows: [first_index], columns: ["website_entry"] }).values[0][0];
        */
        match_counter++;
} // end for loop

}).catch(err => {
                console.log(err);
            }) // end second read

    }).catch(err => {
                console.log(err);
            }) // end first read

    } // end onload function


// Calculate the dot product of two vector arrays.
const dotProduct = (xs, ys) => {
  const sum = xs => xs ? xs.reduce((a, b) => a + b, 0) : undefined;

  return xs.length === ys.length ?
    sum(zipWith((a, b) => a * b, xs, ys))
    : undefined;
}

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith =
    (f, xs, ys) => {
      const ny = ys.length;
      return (xs.length <= ny ? xs : xs.slice(0, ny))
          .map((x, i) => f(x, ys[i]));
    }