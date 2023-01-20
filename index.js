const connectTomongo = require('./db');
const express = require('express')
var cors = require('cors') //it is imported and use for using api internally in a project
const app = express()
connectTomongo();
app.use(cors());//Implementing cors

const port = 5000

app.use(express.json());

app.use('/api/products',require('./Routes/product'));
app.use('/api/users',require('./Routes/user'));
app.use('/api/contact',require('./Routes/contact'));
app.use('/api/orders',require('./Routes/order'));
app.use('/api/files',require('./Routes/file'));
app.use(express.static('images'))
app.get('/images/:image', (req, res) => {
  res.sendFile(`${__dirname}/uploads/${req.params.image}`)
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});