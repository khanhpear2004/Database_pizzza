exports.getHomePage = async (req, res) => {
    try {
        
        res.status(200).json({ message: 'Sucessfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// import DbService from '../model/employee.js';

// const dbService = DbService.getInstance();

// export const register = async (req, res) => {
//     try {
//         const { name, phone, birth_date, chef_flag, username, password } = req.body;
//         const employeeId = await dbService.addEmployee(name, phone, birth_date, chef_flag, username, password);
//         res.json({ message: 'Đăng ký thành công!', employee_id: employeeId });
//     } catch (error) {
//         if (error.message.includes('ER_DUP_ENTRY')) {
//             res.status(400).json({ message: 'Tên đăng nhập hoặc số điện thoại đã tồn tại.' });
//         } else {
//             res.status(500).json({ message: 'Đã xảy ra lỗi.', error });
//         }
//     }
// };
