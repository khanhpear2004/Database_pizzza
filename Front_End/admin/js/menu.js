try {
    fetch(
        "http://localhost:8000/pizza", {
            method: "GET"
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        response.json().then(res => {
            let tab1container = document.getElementById("tab-1-row");
            let tab2container = document.getElementById("tab-2-row");
            let tab3container = document.getElementById("tab-3-row");

            let tab1containerTemp = ``;
            let tab2containerTemp = ``;
            let tab3containerTemp = ``;

            for(let i = 0; i < res.length; i ++) {
                if(res[i].LoaiLuaChon === "Combo") {
                    tab3containerTemp += `<div class="col-lg-6">
                    <div class="d-flex align-items-center">
                        <img class="flex-shrink-0 img-fluid rounded" src="https://img.freepik.com/free-photo/top-view-two-italian-pizzas-served-wooden-background-flour-sprinkles_141793-507.jpg" alt="" style="width: 80px;">                        
                        <div class="w-100 d-flex flex-column text-start ps-4">
                            <h5 class="d-flex justify-content-between border-bottom pb-2 border-2 border-black">
                                <span>${res[i].TenLuaChon}</span>
                                <span style="color: #06B92A;">${new Intl.NumberFormat('vi-VN').format(res[i].GiaTien) + " VNĐ"}</span>
                            </h5>
                            <ul style="list-style-type: disc !important;; color: #000000;">
                                <li>Pizza Combo – Hương vị đỉnh cao, combo hoàn hảo!</li>
                                <a href="./food_info.html?id=${res[i].IDLuaChon}" type="button" style="color: white; background-color: #49F057; width: 141px; border-radius: 10px; height: 34px; float: right;" class="btn text-capitalize">
                                    Còn Hàng
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>`;
                } else if(res[i].KichCo === null) {
                    tab2containerTemp += `<div class="col-lg-6">
                    <div class="d-flex align-items-center">
                        <img class="flex-shrink-0 img-fluid rounded" src="https://c4.wallpaperflare.com/wallpaper/615/214/535/red-logo-logo-coca-cola-wallpaper-preview.jpg" alt="" style="width: 80px;">                        
                        <div class="w-100 d-flex flex-column text-start ps-4">
                            <h5 class="d-flex justify-content-between border-bottom pb-2 border-2 border-black">
                                <span>${res[i].TenLuaChon}</span>
                                <span style="color: #06B92A;">${new Intl.NumberFormat('vi-VN').format(res[i].GiaTien) + " VNĐ"}</span>
                            </h5>
                            <ul style="list-style-type: disc !important;; color: #000000;">
                                <li>Loại Thức Uống: ${res[i].LoaiMonAnDon}</li>
                                <a href="./food_info.html?id=${res[i].IDLuaChon}" type="button" style="color: white; background-color: #49F057; width: 141px; border-radius: 10px; height: 34px; float: right;" class="btn text-capitalize">
                                    Còn Hàng
                                </a>
                            </ul>
                        </div>                                        
                    </div>
                </div>`;
                } else {
                    tab1containerTemp += `<div class="col-lg-6">
                    <div class="d-flex align-items-center">
                        <img class="flex-shrink-0 img-fluid rounded" src="https://preview.redd.it/5vltlvdi2dqy.jpg?auto=webp&s=11b3f7edb856611608a3c710f8b6faf01e0e12c9" alt="" style="width: 80px;">
                        <div class="w-100 d-flex flex-column text-start ps-4">
                            <h5 class="d-flex justify-content-between border-bottom pb-2 border-2 border-black">
                                <span>${res[i].TenLuaChon}</span>
                                <span style="color: #06B92A;">${new Intl.NumberFormat('vi-VN').format(res[i].GiaTien) + " VNĐ"}</span>
                            </h5>
                            <ul style="list-style-type: disc !important;; color: #000000;">
                                <li>Loại Món Ăn Đơn: ${res[i].LoaiMonAnDon}</li>
                                <a href="./food_info.html?id=${res[i].IDLuaChon}" type="button" style="color: white; background-color: #49F057; width: 141px; border-radius: 10px; height: 34px; float: right;" class="btn text-capitalize">
                                    Còn Hàng
                                </a>
                            </ul>
                        </div>                                        
                    </div>
                </div>`;
                }
            }

            tab1container.innerHTML = tab1containerTemp;
            tab2container.innerHTML = tab2containerTemp;
            tab3container.innerHTML = tab3containerTemp;
        });
    });
} catch (error) {
    console.error(error.message);
}