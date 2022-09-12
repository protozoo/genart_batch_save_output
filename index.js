const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
var cors = require('cors');

const port = 3000;

const app = express()
app.use(cors());
app.use('/static', express.static('public'))

app.use( bodyParser({limit: '200mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/image/save', (req, res) => {
    const fileName = req.body.filename;
    const imageData = req.body.imagedata;   
    
    var base64Data = imageData.replace(/^data:image\/png;base64,/, "");    
    let imagePath = "data/images/"+fileName+".png";

    fs.writeFileSync(imagePath, base64Data, 'base64');
    console.log( "save image to: ", imagePath );
    res.send( { success:true, response:'Image saved to: ' + imagePath } )
})



app.listen(port, () => {
  console.log(`Image saving app listening on port ${port}`)
})