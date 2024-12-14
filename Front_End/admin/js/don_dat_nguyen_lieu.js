function randomTime2024() {
    const start = new Date('2024-01-01T00:00:00');
    const end = new Date('2024-12-31T23:59:59');
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    const randomHour = Math.floor(Math.random() * 13) + 6;
    const randomMinute = Math.floor(Math.random() * 60);
    randomDate.setHours(randomHour, randomMinute);

    const formattedTime = `${String(randomDate.getHours()).padStart(2, '0')}:${String(randomDate.getMinutes()).padStart(2, '0')}`;
    const formattedDate = `${String(randomDate.getDate()).padStart(2, '0')}/${String(randomDate.getMonth() + 1).padStart(2, '0')}/${randomDate.getFullYear()}`;

    return `${formattedTime} - ${formattedDate}`;
}

let donDatNguyenLieuDiv = ``;

for(let i = 1; i < 10; i ++) {
    donDatNguyenLieuDiv += 
    `<div class="container" style="width: 100%; height: 129px; border: 1px solid black; border-radius: 10px; margin-bottom: 11px;">
        <div class="row">
            <div class="col col-6" style="display: flex; flex-flow: wrap column; justify-content: space-between;">
                <p style="color: black; font-size: 20px; font-weight: 600; line-height: 26px; margin: 10px 5px;">
                    <nobr style="color: #DC802A;">MÃ ĐƠN HÀNG: </nobr>
                    <nobr id="ma-don-hang">O-00000${i}</nobr>
                </p>

                <p style="color: black; font-size: 20px; font-weight: 600; line-height: 26px; margin: 10px 5px;">
                    <nobr style="color: #DC802A;">THỜI GIAN NHẬN: </nobr>
                    <nobr id="ma-don-hang">${randomTime2024()}</nobr>
                </p>

                <p style="color: black; font-size: 20px; font-weight: 600; line-height: 26px; margin: 10px 5px;">
                    <nobr style="color: #DC802A;">ID BÀN ĂN: </nobr>
                    <nobr id="ma-don-hang">${Math.floor(Math.random() * 20) + 1}</nobr>
                </p>
            </div>

            <div class="col col-6">
                <p style="font-size: 16px; font-style: italic; font-weight: 400; line-height: 20.8px; color: #FD080C;">
                    Tình trạng: Chưa Hoàn Thành
                </p>
            </div>
        </div>
    </div>`;
}

document.getElementById("don-dat-nguyen-lieu").innerHTML = donDatNguyenLieuDiv;