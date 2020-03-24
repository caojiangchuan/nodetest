const mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

/* post请求插件 */
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
app.set('views', './view'); // 指定视图所在的位置
app.set('view engine', 'ejs'); // 注册模板引擎
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodemysql'
});

var sql = 'SELECT * FROM posts';
// 查
connection.connect();

app.get('/', (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Content-type', 'charset=utf-8');
    // res.send('欢迎来到');
    // console.log(res);
    res.render('index', {title: '标题', message: '信息'});
});

/* 查数据 */
app.get('/find', (req, res) => {

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        res.send(result);

    });
});

/* 新增数据 */
app.post('/add', urlencodedParser, (req, res) => {
    // connection.connect();
    let id = req.body.id;
    let title = req.body.title;
    var addSql = 'INSERT INTO posts(id,title) VALUES(?,?)';
    var addSqlParams = [id, title];
    connection.query(addSql, addSqlParams, function (err, result) {
        for (let i = 0; i < addSqlParams.length; i++) {
            if (addSqlParams[i] === '') {
                res.sendStatus(400);
                return;
            }

        }

        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        res.send(result);

        // console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:', result);
    });
});

/* 更改数据 */
app.post('/change', urlencodedParser, (req, res) => {
    // connection.connect();
    let id = req.body.id;
    let title = req.body.title;

    var modSql = 'UPDATE posts SET title = ? WHERE id = ?';
    var modSqlParams = [title, id];
    // 改
    connection.query(modSql, modSqlParams, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }

        console.log('UPDATE affectedRows', result.affectedRows);
        res.send(result);

    });
});

/* 删除 */

app.get('/del', (req, res) => {
    // connection.connect();
    let id = req.query.id;

    var delSql = `DELETE FROM posts where id=${id}`;
    // 删
    connection.query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('DELETE affectedRows', result.affectedRows);
        res.send(result);

    });
});
app.listen(5000, () => {
    console.log('1');
});
// connection.end();
