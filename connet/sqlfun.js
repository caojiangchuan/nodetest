//sql语句
var sqlMap = {
    user: {
        login: 'select * from admin where username = ?',
        add: 'insert into admin (username,userpsw) values (?,?)'
    }
}
module.exports = sqlMap;