const connectTomongo = require('./db');
const express = require('express')
var cors = require('cors') //it is imported and use for using api internally in a project
const app = express()
connectTomongo()
app.use(cors());//Implementing cors


app.use(express.json());

app.use('/api/products',require('./Routes/product'));
app.use('/api/users',require('./Routes/user'));
app.use('/api/contact',require('./Routes/contact'));
app.use('/api/orders',require('./Routes/order'));
app.use('/api/files',require('./Routes/file'));
app.use('/admin',require('./Routes/admin'));
app.use(express.static('images'))
app.get('/images/:image', (req, res) => {
  res.sendFile(`uploads/${req.params.image}`,{root:__dirname})
})

app.get('/media/:image', (req, res) => {
  try {
    res.sendFile(`media/${req.params.image}`,{root:__dirname})

  } catch (error) {
    console.log(error)
  }
})   

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 5000}`);
});


