const {sql, config} = require('../config/db');
let instance = null;
class Employee{
    static getInstance(){
        if(!instance) instance = new Employee();
        return instance;
    }
    async getAllEmployees(){
        try{
            let pool = await sql.connect(config);
            const result = await pool.request().execute('spGetAllEmployees');
            return result.recordset;
        } catch (err) {
            console.error(err);
        }
    }
    async addEmployee(name,phone,birth_date,chef_flag,username,password){
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
            .input('name',sql.VarChar,(name))
            .input('phone',sql.VarChar,(phone))
            .input('birth_date',sql.Date,(birth_date))
            .input('chef_flag',sql.Bit,(chef_flag))
            .input('username',sql.VarChar,(username))
            .input('password',sql.VarChar,(password))
            .execute('spCreateUser');
            
            return result;
        } catch (err) {
            console.error(err);
        }
    }
    async checkEmployee(username, password) {
        try {
            let pool = await sql.connect(config);
            const result = await pool.request()
                .input('username', sql.VarChar, username)
                .input('password', sql.VarChar, password)
                .output('user_type', sql.VarChar) // Lấy kiểu tài khoản
                .execute('spLoginUser');
    
            const userType = result.output.user_type;
    
            // Xác định loại tài khoản và URL điều hướng
            if (userType === 'Manager') {
                return {
                    redirect: 'http://localhost:8000/admin/menu.html',
                    message: 'Welcome, Manager!',
                };
            } else if (userType === 'Employee') {
                return {
                    redirect: 'http://localhost:8000/staff/index.html',
                    message: 'Welcome, Employee!',
                };
            } else {
                return null; // Không tìm thấy tài khoản
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    async getemployeebyid(employee_id){
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
           .input('employee_id',sql.VarChar,employee_id)
           .execute('spGetEmployeeById');
            return result.recordset[0];
        } catch (err) {
            console.error(err);
        }
    }
    async deleteemployeebyid(employee_id){
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
           .input('employee_id',sql.VarChar,employee_id)
           .execute('spDeleteEmployeeById');
           return result;
        } 
        catch (err) {
            console.error(err);
        }
    }
    async updateEmployee(employee_id,phone,salary){
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
           .input('employee_id',sql.VarChar,employee_id)
           .input('phone',sql.VarChar,phone)
           .input('salary',sql.Int,salary)
           .execute('spUpdateEmployee');
            return result;
        } catch (err) {
            console.error(err);
        }
    }
}
module.exports = Employee; 