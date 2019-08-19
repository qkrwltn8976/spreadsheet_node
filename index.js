// https://docs.google.com/spreadsheets/d/1amaqoQpOL5EWiYiPf6jJ4EQ-y7MZz-SKeUidGwWfNZc/edit?usp=sharing
const googleSpreadsheet = require('google-spreadsheet');

const creds = require('./spreadsheetwillson-212291344f35.json');
const doc = new googleSpreadsheet('1amaqoQpOL5EWiYiPf6jJ4EQ-y7MZz-SKeUidGwWfNZc');

const http = require('http');
const url = require('url');
const fs = require('fs')
const path = require('path')
const stringify = require('stringify');
const querystring = require('querystring');

// const router = express.Router();

const server = http.createServer((req, res)=>{
    if(req.url=='/favicon.ico')
        return;
    
    let query = querystring.parse(url.parse(req.url).query);
    let parsedUrl = req.url.split('?')[0];
    console.log(parsedUrl);
    if(parsedUrl == '/') {
        doc.useServiceAccountAuth(creds, function(err) {
            var json = [];
        
            doc.getRows(
                1
                ,{
                    'offset': 1
                }
                , function(err, rows) {
                    for(var i=0; rows.length > i; i++){
                        var obj = new Object();
                        obj.phone = rows[i].phone;
                        obj.nickname = rows[i].nickname;
                        obj.age = rows[i].age;
                        obj.askcategory = rows[i].askcategory;
                        obj.askcontent = rows[i].askcontent;
                        obj.willsongender = rows[i].willsongender;
                        obj.willsoncareer = rows[i].willsoncareer;
                        obj.willsonstyle = rows[i].willsonstyle;
        
                        json.push(obj);
                    } 
                        
                    fs.writeFileSync(path.resolve(__dirname, './data.json'), res.end(JSON.stringify(json, null, '\t')));
                    console.log('json parsing success')
                }
            )
        });
    }
}).listen(3000, ()=>{
    console.log('server open');
});



