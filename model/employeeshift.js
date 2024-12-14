const {sql, config} = require('../config/db');
let instance =null;
class Shift{
    static getInstance(){
        if(!instance) instance = new Shift();
        return instance;
    }
    async getAllShifts(){
        try{
            let pool = await sql.connect(config);
            const result = await pool.request().execute('spGetAllShifts');
            return result.recordset;
        } catch (err) {
            console.error(err);
        }
    }
    async addShift(starttime,endtime,shiftdate,maxparticipants){
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
            .input('starttime',sql.VarChar,(starttime))
            .input('endtime',sql.VarChar,(endtime))
            .input('shiftdate',sql.Date,(shiftdate))
            .input('maxparticipants',sql.Int,(maxparticipants))
            .execute('spAddShift');
            return result;
        } catch (err) {
            console.error(err);
        }
    }
    async registerShift(employee_id,shiftid){
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
            .input('employee_id',sql.VarChar,(employee_id))
            .input('shiftid',sql.Int,(shiftid))
            .execute('spRegisterShift');
            return result;
        } catch (err) {
            console.error(err);
        }
    }
}
module.exports = Shift;