// https://docs.google.com/spreadsheets/d/1amaqoQpOL5EWiYiPf6jJ4EQ-y7MZz-SKeUidGwWfNZc/edit?usp=sharing
const googleSpreadsheet = require('google-spreadsheet');

const creds = require('./spreadsheetwillson-212291344f35.json');
const doc = new googleSpreadsheet('1amaqoQpOL5EWiYiPf6jJ4EQ-y7MZz-SKeUidGwWfNZc');

doc.useServiceAccountAuth(creds, function(err) {
    doc.getInfo(function(err, info) {
        //console.log(info);
        console.log("구글 시트의 제목  : " + info.title);

		console.log("구글 시트의 URL  : " + info.id);

        console.log("마지막으로 업데이트된 날짜 및 시간  : " + info.updated);

		console.log("스프레드시트의 생성자 아이디  : " + info.author.name);

		console.log("스프레드시트의 생성자 메일주소  : " + info.author.email);
    })
});