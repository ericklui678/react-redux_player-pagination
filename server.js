const app = require('express')();
const port = 3001;

app.get('/', (req, res) => {
  res.send('test server');
});

app.listen(port, () => console.log(`running on port ${port}`));
