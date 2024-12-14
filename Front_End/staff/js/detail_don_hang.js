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
    const currentURL = window.location.href;
    let url = new URL(currentURL);
    let search_params = url.searchParams;
    let ID = search_params.get('id');

    try {
        fetch(
            `http://localhost:8000/get-don-hang/`, {
                method: "GET"
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            response.json().then(res => {
                let i = 0;
                for(; res[i].ID_don_hang !== ID; i ++);

                fetch(
                    `http://localhost:8000/get-mon-an-trong-don-hang/${ID}`, {
                        method: "GET"
                    }
                ).then(response2 => {
                    response2.json().then(res2 => {
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

                        document.getElementById("ma-don-hang").innerHTML = ID;
                        document.getElementById("thoi-gian-nhan").innerHTML = `${formatDate(date)}`;
                        document.getElementById("nhan-vien-dat-mon").innerHTML = mapping[j].name;
                        document.getElementById("ma-nhan-vien").innerHTML = mapping[j].id;
                        document.getElementById("id-ban-an").innerHTML = getRandomInt(1, 10);                        
                        
                        let divListChiTietMonAn = ``;
                        let sumTongTien = 0;
                        for(let i = 0; i < res2.length; i ++) {
                            sumTongTien += res2[i].Gia;
                            divListChiTietMonAn += 
                            `<div class="row" style="height: auto; width: 100%; border: 1px solid black; border-radius: 10px; margin-bottom: 12px; padding-top: 10px; padding-bottom: 10px;">
                                <div class="col col-3">
                                    <img style="width: 111px; height: 85px; border-radius: 10px;" src="https://s3-alpha-sig.figma.com/img/1563/be4b/0ecd51c107707964cb0b4c400bac2b06?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c-Y3lEvSFRVrzelppLoscL4cQBt-6r90UDU8yNX7S1LDPdmGLW-FJ97rqZET0T6Vs2W70hvtBUTs0d3RXLCf-Sf6zrMFcCgo9MUFJS~TDWO6~zyvpU58-feGLgAeMK-RdY-TetoVdEOSkcMJDhtwzaZGtrxkq3WIDGp7PS7lz6GUktsOimm4UDKC2p0fBkNnENXjSHAGKIpPy8EODu6H3SLDy9g84ZufXwKwy~qufNHob477RhOpaWEvMol4Ng4AfOCorRxdzxaU~UEoQVyX3yfOcDI2l4QTau~8azOh8QfU6Tatz~t8huAGoUOk~5xYHwxk~uAbiUnWiRkezzcJ5Q__" alt="">
                                </div>
                                
                                <div class="col col-9">
                                    <div style="display: flex; flex-flow: wrap row; justify-content: space-between; border-bottom: 1px solid black;">
                                        <p id="ten-mon-an" style="font-size: 16px; font-weight: 600; line-height: 18.75px; color: black;">
                                            ${res2[i].TenMon}
                                        </p>

                                        <p id="gia-tien" style="color: #06B92A; font-size: 16px; font-weight: 800; line-height: 18.75px;">
                                            ${new Intl.NumberFormat('vi-VN').format(res2[i].Gia) + " VNĐ"}
                                        </p>
                                    </div>
                                    
                                    <p style="color: black; font-size: 16px; font-weight: 600; line-height: 18.75px; margin-top: 10px;">
                                        Số Lượng: ${res2[i].SoLuong}
                                    </p>
                                </div>
                            </div>`;
                        }

                        document.getElementById("list-chi-tiet-mon-an").innerHTML = divListChiTietMonAn;
                        document.getElementById("tong-tien").innerHTML = new Intl.NumberFormat('vi-VN').format(sumTongTien) + " VNĐ";
                    });
                });
            });
        });
    } catch (error) {
        console.error(error.message);
    }
});