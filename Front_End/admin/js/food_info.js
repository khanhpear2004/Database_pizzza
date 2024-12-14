try {
    const currentURL = window.location.href;
    let url = new URL(currentURL);
    let search_params = url.searchParams;
    let ID = search_params.get('id');

    fetch(
        `http://localhost:8000/pizza/${ID}`, {
            method: "GET"
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        response.json().then(res => {
            console.log(res);
            document.getElementById("ma-mon-an").value = res[0].IDLuaChon;
            document.getElementById("ten-mon-an").value = res[0].TenLuaChon;
            document.getElementById("tinh-trang").value = "Còn Hàng";
            document.getElementById("topping").value = "Dứa - Mực - Ớt chuông";
            document.getElementById("loai-mon").value = res[0].LoaiLuaChon;
            document.getElementById("gia-tien").value = new Intl.NumberFormat('vi-VN').format(res[0].GiaTien) + " VNĐ";
        });
    });
} catch (error) {
    console.error(error.message);
}