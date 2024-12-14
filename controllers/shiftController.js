const Shift = require('../model/employeeshift');
const shift = Shift.getInstance();

exports.createShift = async (req, res) => {
    try {
        const {starttime, endtime,shiftdate,maxparticipants } = req.body;
        console.log(req.body);
        const shiftId = await shift.addShift(starttime, endtime, shiftdate, maxparticipants);
        res.json({ message: 'Đã tạo ca làm việc!', shift_id: shiftId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getShifts = async (req, res) => {
    try {
        const shifts = await shift.getAllShifts();
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.registershifts = async (req, res) => {
    try {
        const { employee_id,shift_id } = req.body;
        await shift.registerShift(employee_id,shift_id);
        res.json({ message: 'Đã đăng ký ca làm việc!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}