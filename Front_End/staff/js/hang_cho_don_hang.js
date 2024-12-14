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

                    divLichSuDonHang += 
                    `<div class="row" style="border: 1px solid black; border-radius: 10px; margin: 0px 12px 10px;">
                        <div class="col col-6" style="padding: 9px 9px 0px;">
                            <p style="color: black; font-size: 20px; font-weight: 600; line-height: 26px;">
                                <nobr style="color: #DC802A;">MÃ ĐƠN HÀNG: </nobr>
                                <nobr id="ma-don-hang">${res[i].ID_don_hang}</nobr>
                            </p>

                            <p style="color: black; font-size: 20px; font-weight: 600; line-height: 26px;">
                                <nobr style="color: #DC802A;">THỜI GIAN NHẬN: </nobr>
                                <nobr id="thoi-gian-nhan">${formatDate(date)}</nobr>
                            </p>

                            <p style="color: black; font-size: 20px; font-weight: 600; line-height: 26px;">
                                <nobr style="color: #DC802A;">ID BÀN ĂN: </nobr>
                                <nobr id="id-ban-an">${getRandomInt(1, 10)}</nobr>
                            </p>
                        </div>

                        <div class="col col-6" style="padding: 9px 9px 0px;">
                            <p style="font-size: 16px; font-style: italic; font-weight: 400; line-height: 20.8px; color: #FD080C; float: right; margin-right: 20px;">
                                Tình trạng: ${res[i].Tinh_trang}
                            </p>
                        </div>
                    </div>`;
                }

                document.getElementById("list-hang-cho-don-hang").innerHTML = divLichSuDonHang;

                const rows = document.querySelectorAll("#list-hang-cho-don-hang .row");
                rows.forEach(row => {
                    row.addEventListener("click", () => {                        
                        const maDonHang = row.querySelector("#ma-don-hang").innerText;                        
                        // alert(`Mã Đơn Hàng: ${maDonHang}`);
                        fetch(
                            `http://localhost:8000/get-mon-an-trong-don-hang/${maDonHang}`, {
                                method: "GET"
                            }
                        ).then(response => {
                            response.json().then(res2 => {
                                let divChiTietDonHang = ``;
                                for(let j = 0; j < res2.length; j ++) {
                                    divChiTietDonHang += 
                                    `<div class="row" style="width: 100%; height: auto; border: 1px solid black; border-radius: 10px; padding-top: 5px; padding-bottom: 5px; margin-bottom: 10px;">
                                        <div class="col col-3">
                                            <img style="width: 111px; height: 85px; border-radius: 10px;" src="https://s3-alpha-sig.figma.com/img/1563/be4b/0ecd51c107707964cb0b4c400bac2b06?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c-Y3lEvSFRVrzelppLoscL4cQBt-6r90UDU8yNX7S1LDPdmGLW-FJ97rqZET0T6Vs2W70hvtBUTs0d3RXLCf-Sf6zrMFcCgo9MUFJS~TDWO6~zyvpU58-feGLgAeMK-RdY-TetoVdEOSkcMJDhtwzaZGtrxkq3WIDGp7PS7lz6GUktsOimm4UDKC2p0fBkNnENXjSHAGKIpPy8EODu6H3SLDy9g84ZufXwKwy~qufNHob477RhOpaWEvMol4Ng4AfOCorRxdzxaU~UEoQVyX3yfOcDI2l4QTau~8azOh8QfU6Tatz~t8huAGoUOk~5xYHwxk~uAbiUnWiRkezzcJ5Q__" alt="">
                                        </div>
                                        <div class="col col-1"></div>
                                        <div class="col col-8">
                                            <p style="font-size: 16px; line-height: 18.75px; display: flex; flex-wrap: wrap;">
                                                <nobr style="font-weight: 600; color: black;" id="name-pizza">
                                                    ${res2[j].TenMon}
                                                </nobr>
                                            </p>
        
                                            <hr style="size: 2px; color: black;">
        
                                            <p style="font-size: 16px; line-height: 18.75px; display: flex; flex-wrap: wrap; font-weight: 600; color: black;">
                                                Số Lượng: 
                                                <nobr id="so-luong">${res2[j].SoLuong}</nobr>
                                            </p>
                                        </div>
                                    </div>`;
                                }
        
                                document.getElementById("chi-tiet-don-hang-x").innerHTML = divChiTietDonHang;
                            });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.error(error.message);
    }
});