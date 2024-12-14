function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getEmployeeMapping() {
    try {        
        const response = await fetch('http://localhost:8000/listemployee', {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const employees = await response.json();
        const idNameMapping = employees.map(employee => ({
            id: employee.employee_id,
            name: employee.name
        }));

        return idNameMapping; 
    } catch (error) {
        console.error(`Error fetching employees: ${error.message}`);
        return []; 
    }
}

getEmployeeMapping().then(mapping => {    
    try {
        fetch(
            `http://localhost:8000/get-don-hang`, {
                method: "GET"
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            response.json().then(res => {
                let divLichSuDonHang = ``;

                for(let i = 0; i < res.length; i ++) {
                    const date = new Date(res[i].Ngay_dat);
                    const formatDate = (date) => {
                        const pad = (num) => String(num).padStart(2, '0');
                        const hours = pad(date.getUTCHours()); 
                        const minutes = pad(date.getUTCMinutes());
                        const day = pad(date.getUTCDate());
                        const month = pad(date.getUTCMonth() + 1); 
                        const year = date.getUTCFullYear();
                        return `${hours}:${minutes} - ${day}/${month}/${year}`;
                    };

                    let j = 0;
                    for(; mapping[j].id !== res[i].ID_nhan_vien; j ++);

                    divLichSuDonHang += 
                    `<a href="detail_order.html?id=${res[i].ID_don_hang}">
                        <div class="row" style="width: 100%; height: auto; border: 1px solid black; border-radius: 10px; margin-bottom: 10px;">
                            <div class="col col-5" style="display: flex; flex-flow: wrap column; justify-content: space-between; padding: 9px 11px 0px; align-items: flex-start;">
                                <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black;">
                                    <nobr style="color: #DC802A;">MÃ ĐƠN HÀNG: </nobr>
                                    <nobr id="ma-don-hang">${res[i].ID_don_hang}</nobr>
                                </p>

                                <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black;">
                                    <nobr style="color: #DC802A;">THỜI GIAN NHẬN: </nobr>
                                    <nobr id="thoi-gian-nhan">${formatDate(date)}</nobr>
                                </p>

                                <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black;">
                                    <nobr style="color: #DC802A;">NHÂN VIÊN ĐẶT MÓN: </nobr>
                                    <nobr id="nhan-vien-dat-mon">${mapping[j].name}</nobr>
                                </p>
                            </div>

                            <div class="col col-4" style="display: flex; flex-flow: wrap column-reverse; justify-content: flex-start; align-items: flex-start;">
                                <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black;">
                                    <nobr style="color: #DC802A;">ID BÀN ĂN: </nobr>
                                    <nobr id="id-ban-an">${getRandomInt(1, 10)}</nobr>
                                </p>

                                <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black;">
                                    <nobr style="color: #DC802A;">MÃ NHÂN VIÊN: </nobr>
                                    <nobr id="ma-nhan-vien">${res[i].ID_nhan_vien}</nobr>
                                </p>
                            </div>

                            <div class="col col-3">
                                <p style="color: #FD080C; font-size: 16px; font-style: italic; font-weight: 400; line-height: 20.8px;">
                                    Tình trạng: 
                                    <nobr id="tinh-trang">${res[i].Tinh_trang}</nobr>
                                </p>
                            </div>
                        </div>
                    </a>`;
                }

                document.getElementById("list-lich-su-don-hang").innerHTML = divLichSuDonHang;
            });
        });
    } catch (error) {
        console.error(error.message);
    }
});