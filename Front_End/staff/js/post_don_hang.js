function generateJsonFromHTML() {    
    const items = document.querySelectorAll("#don-hang-list-moi > div");
    const resultItems = [];

    items.forEach(item => {
        const idMonElement = item.querySelector("nobr:nth-child(1)"); 
        const giaTienElement = item.querySelector("nobr:nth-child(2)"); 
        const soLuongElement = item.querySelector("#so-luong"); 

        const idMon = idMonElement ? idMonElement.textContent.split(": ")[1] : null;
        const giaTien = giaTienElement ? parseInt(giaTienElement.textContent.replace(/\D/g, "")) : null; 
        const soLuong = soLuongElement ? parseInt(soLuongElement.textContent) : null;

        if (idMon && giaTien && soLuong) {
            resultItems.push({
                ID_mon: idMon.trim(),
                So_Luong: soLuong
            });
        }
    });

    // alert(resultItems[0].ID_mon);

    return {
        items: resultItems,
        ID_khach_hang: 2,  
        Tinh_trang: "Đang xử lý"
    };
}

document.getElementById("confirm-lan-cuoi").addEventListener("click", e => {
    try {
        // alert(generateJsonFromHTML()[0].idMon);
        let jsonData = generateJsonFromHTML();

        console.log(JSON.stringify(jsonData));

        fetch(
            `http://localhost:8000/tao-don-hang/EMP00005`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonData)
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
    
            alert("Thêm Đơn Hàng Thành Công");
            location.replace("http://localhost:8000/staff/order_queue_staff.html");
        });
    } catch (error) {
        console.error(error.message);
    }
});