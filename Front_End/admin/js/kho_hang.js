try {
    fetch(
        "http://localhost:8000/show-nguyen-lieu", {
            method: "GET"
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        response.json().then(res => {
            let nguyenLieuCanUuTienNhapDiv = ``;

            for(let i = 0; i < 5; i ++) {
                nguyenLieuCanUuTienNhapDiv += 
                `<div class="col col-12" style="border-bottom: 1px solid black; height: auto;">
                    <div class="container row" style="align-items: center;">
                        <div class="col col-4">
                            <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                ${res[i].Ten_nguyen_lieu}
                            </p>
                        </div>

                        <div class="col col-3">
                            <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                ${res[i].So_luong_ban_dau}
                            </p>
                        </div>

                        <div class="col col-5">
                            <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                ${res[i].Nguon_mua}
                            </p>
                        </div>
                    </div>
                </div>`;
            }

            document.getElementById("nguyen-lieu-can-uu-tien-nhap").innerHTML = nguyenLieuCanUuTienNhapDiv;

            res.sort((a, b) => new Date(b.Ngay_mua) - new Date(a.Ngay_mua));
            
            let nguyenLieuNhapGanDayDiv = ``;

            for(let i = 0; i < 5; i ++) {
                nguyenLieuNhapGanDayDiv += 
                `<div class="col col-12" style="border-bottom: 1px solid black; height: auto;">
                    <div class="container row" style="align-items: center;">
                        <div class="col col-4">
                            <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                ${res[i].Ten_nguyen_lieu}
                            </p>
                        </div>

                        <div class="col col-3">
                            <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                ${res[i].So_luong_ban_dau}
                            </p>
                        </div>

                        <div class="col col-5">
                            <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                ${res[i].Nguon_mua}
                            </p>
                        </div>
                    </div>
                </div>`;
            }

            document.getElementById("nguyen-lieu-nhap-gan-day").innerHTML = nguyenLieuNhapGanDayDiv;            

            const categories = {
                "Rau củ": ["Cà chua", "Ớt chuông", "Húng quế"],
                "Hải sản": ["Tôm", "Cá", "Mực"],
                "Thịt": ["Thịt bò", "Thịt gà", "Thịt heo"],
                "Gia vị": ["Muối", "Đường", "Hạt tiêu", "Dầu olive"],
                "Trái cây": ["Táo", "Cam", "Chuối"],
                "Nước ngọt": ["Nước ngọt", "Coca Cola", "Pepsi"]
            };
            
            const categorizedData = {
                "Rau củ": ``,
                "Hải sản": ``,
                "Thịt": ``,
                "Gia vị": ``,
                "Trái cây": ``,
                "Nước ngọt": ``
            };
            
            let khoNguyenLieuDiv = ``;

            res.forEach(item => {
                for (const [category, items] of Object.entries(categories)) {
                    if (items.includes(item.Ten_nguyen_lieu)) {
                        categorizedData[category] += 
                        `<div class="col col-12" style="border-bottom: 1px solid black; height: auto;">
                            <div class="container row" style="align-items: center;">
                                <div class="col col-6">
                                    <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                        ${item.Ten_nguyen_lieu}
                                    </p>
                                </div>

                                <div class="col col-3">
                                    <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                        ${item.So_luong_ton_kho}
                                    </p>
                                </div>

                                <div class="col col-3">
                                    <p style="font-weight: 600; font-size: 15px; line-height: 26px; color: black; margin-bottom: 0;">
                                        ${item.Nguon_mua}
                                    </p>
                                </div>
                            </div>
                        </div>`;
                        
                        break;
                    }
                }
            });
            
            document.getElementById("tab-1-list").innerHTML = categorizedData["Rau củ"];
            document.getElementById("tab-2-list").innerHTML = categorizedData["Hải sản"];
            document.getElementById("tab-3-list").innerHTML = categorizedData["Thịt"];
            document.getElementById("tab-4-list").innerHTML = categorizedData["Gia vị"];
            document.getElementById("tab-5-list").innerHTML = categorizedData["Trái cây"];
            document.getElementById("tab-6-list").innerHTML = categorizedData["Nước ngọt"];
        });
    });
} catch (error) {
    console.error(error.message);
}