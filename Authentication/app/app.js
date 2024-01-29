//jshint esversion:6
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const port = 3000;
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});