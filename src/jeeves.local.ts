const port = process.env.PORT || 4521;
const {app} = require('./jeeves');

app.route('/')
    .get((req, res) => {res.status(200).send("Hello there!")});

//Separated file to listen locally to jeeves while running locally.
app.listen(port, () => console.log(`Jeeves app Live on port ${port}!`));
