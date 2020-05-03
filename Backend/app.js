const express = require('express')
var request = require('request')
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/getRandomQuote', (req, res) => {
    request('https://quote-garden.herokuapp.com/api/v2/quotes/random', function (error, response, body) {
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    if (!error && response.statusCode == 200) {
        // console.log(body)
        var parsedBody = JSON.parse(body)
        var quote = parsedBody["quote"]["quoteText"]
        res.send({quote})
    }
});
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))