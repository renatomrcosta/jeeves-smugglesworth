const port = process.env.PORT || 4521;

const {app} = require('./jeeves');

app.listen(port, () => console.log(`Jeeves app Live on port ${port}!`));
