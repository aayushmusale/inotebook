const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
connectToMongo();

const app = express()
const port = 5000  
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, auth-token"
}));

app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello user!')
})

app.listen(port, () => {
  console.log(`iNoteBook app listening on http://localhost:${port}`)
})