require('dotenv').config();

const app = require('./app');


const PORT = process.env.PORT || 3000;


const DBconnect = require('./config/db')


DBconnect()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
