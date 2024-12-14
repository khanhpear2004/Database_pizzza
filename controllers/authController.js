const Employees = require('../model/employee');
const employee = Employees.getInstance();

exports.register = async (req, res) => {
    try {
        const { name, phone, birth_date, chef_flag, username, password } = req.body;
        var isChef = (chef_flag === "FALSE") ? 0 : 1;
        const birthDate = new Date(birth_date);
        const today=new Date();
        today.setHours(0, 0, 0, 0);
        if (birthDate > today||birthDate === today) {
            return res.status(400).json({ message: 'Sai ngày sinh.' });
        }
        const employeeId = await employee.addEmployee(name, phone, birth_date, isChef, username, password);
        res.json({ message: `Đăng ký thành công! ${username}`, employee_id: employeeId });
    } catch (error) {
        if (error.message.includes('ER_DUP_ENTRY')) {
            res.status(400).json({ message: 'Tên đăng nhập hoặc số điện thoại đã tồn tại.' });
        } else {
            res.status(500).json({ message: `Đã xảy ra lỗi.`, error });
        }
    }
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const employeeData = await employee.checkEmployee(username, password);

        if (employeeData) {
            // Điều hướng dựa trên kết quả `redirect`
            res.json({
                message: employeeData.message,
                redirect: employeeData.redirect,
            });
        } else {
            res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi.', error: err });
    }
};
exports.listEmployee = async (req, res) => {
    try {
        const listemployees = await employee.getAllEmployees();
        console.log(listemployees)
        res.status(200).json(listemployees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.searchEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const findemployee = await employee.getemployeebyid(id);
        res.status(200).json(findemployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await employee.deleteemployeebyid(id);
        res.status(200).json({ message: 'Xóa thành công.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { phone,salary} = req.body;
        const result = await employee.updateEmployee(id, phone, salary);
        res.status(200).json({ message: 'Cập nhật thành công.' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}