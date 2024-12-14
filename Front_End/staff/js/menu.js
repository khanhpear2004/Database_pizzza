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
            let tab1container = document.getElementById("list-menu-tab-1");
            let tab2container = document.getElementById("list-menu-tab-2");
            let tab3container = document.getElementById("list-menu-tab-3");

            let tab1containerTemp = ``;
            let tab2containerTemp = ``;
            let tab3containerTemp = ``;

            for(let i = 0; i < res.length; i ++) {
                if(res[i].LoaiLuaChon === "Combo") {
                    tab3containerTemp += 
                    `<div class="col col-6" style="height: auto; width: 48.2%; border-radius: 10px; border: 1px solid black; margin: 10px;" data-id="${res[i].IDLuaChon}">
                        <div class="row" style="padding: 10px;">
                            <div class="col col-3" style="background-color: transparent;">
                                <img style="width: 127px; height: 123px; border-radius: 10px;" src="https://img.freepik.com/free-photo/top-view-two-italian-pizzas-served-wooden-background-flour-sprinkles_141793-507.jpg" alt="">
                            </div>

                            <div class="col col-9" style="background-color: transparent;">
                                <p style="font-size: 16px; line-height: 18.75px; display: flex; flex-wrap: wrap; justify-content: space-between;">
                                    <nobr id="ten-lua-chon" style="font-weight: 600; color: black;">${res[i].TenLuaChon}</nobr>

                                    <nobr style="color: #06B92A; font-weight: 800;">${new Intl.NumberFormat('vi-VN').format(res[i].GiaTien) + " VNĐ"}</nobr>
                                </p>

                                <hr style="size: 2px; color: black;">
                                <div class="row">
                                    <div class="col col-8">
                                        <p style="color: black; text-align: left;">Pizza Combo – Hương vị đỉnh cao, combo hoàn hảo!</p>
                                    </div>

                                    <div class="col col-4" style="background-color: transparent; padding: 5px;">
                                        <div class="row">
                                            <div class="col col-3 btn-increase" style="background-color: #49F057; height: 32px; color: white; border-radius: 10px; text-align: center; cursor: pointer;">+</div>
                                            <div class="col col-3 quantity-display" style="text-align: center; line-height: 32px;">0</div>
                                            <div class="col col-3 btn-decrease" style="background-color: #F48787; height: 32px; color: white; border-radius: 10px; text-align: center; cursor: pointer;">-</div>
                                        </div>

                                        <div class="row" style="margin-top: 5px;">
                                            <div class="col col-11" style="background: #49F057; border-radius: 10px; height: auto;">
                                                <p style="font-weight: 600; font-size: 15px; color: white;">
                                                    Mã Món Ăn ${res[i].IDLuaChon}
                                                </p>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>`;
                } else if(res[i].KichCo === null) {
                    tab2containerTemp += 
                    `<div class="col col-6" style="height: auto; width: 48.2%; border-radius: 10px; border: 1px solid black; margin: 10px;" data-id="${res[i].IDLuaChon}">
                        <div class="row" style="padding: 10px;">
                            <div class="col col-3" style="background-color: transparent;">
                                <img style="width: 127px; height: 123px; border-radius: 10px;" src="https://c4.wallpaperflare.com/wallpaper/615/214/535/red-logo-logo-coca-cola-wallpaper-preview.jpg" alt="">
                            </div>

                            <div class="col col-9" style="background-color: transparent;">
                                <p style="font-size: 16px; line-height: 18.75px; display: flex; flex-wrap: wrap; justify-content: space-between;">
                                    <nobr id="ten-lua-chon" style="font-weight: 600; color: black;">${res[i].TenLuaChon}</nobr>

                                    <nobr style="color: #06B92A; font-weight: 800;">${new Intl.NumberFormat('vi-VN').format(res[i].GiaTien) + " VNĐ"}</nobr>
                                </p>

                                <hr style="size: 2px; color: black;">
                                <div class="row">
                                    <div class="col col-8">
                                        <p style="color: black;">CocaCola – Tươi mới, sảng khoái!</p>
                                    </div>

                                    <div class="col col-4" style="background-color: transparent; padding: 5px;">
                                        <div class="row">
                                            <div class="col col-3 btn-increase" style="background-color: #49F057; height: 32px; color: white; border-radius: 10px; text-align: center; cursor: pointer;">+</div>
                                            <div class="col col-3 quantity-display" style="text-align: center; line-height: 32px;">0</div>
                                            <div class="col col-3 btn-decrease" style="background-color: #F48787; height: 32px; color: white; border-radius: 10px; text-align: center; cursor: pointer;">-</div>
                                        </div>

                                        <div class="row" style="margin-top: 5px;">
                                            <div class="col col-11" style="background: #49F057; border-radius: 10px; height: auto;">
                                                <p style="font-weight: 600; font-size: 15px; color: white;">
                                                    Mã Món Ăn ${res[i].IDLuaChon}
                                                </p>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>`;
                } else {
                    tab1containerTemp += 
                    `<div class="col col-6" style="height: auto; width: 48.2%; border-radius: 10px; border: 1px solid black; margin: 10px;"data-id="${res[i].IDLuaChon}">
                        <div class="row" style="padding: 10px;">
                            <div class="col col-3" style="background-color: transparent;">
                                <img style="width: 127px; height: 123px; border-radius: 10px;" src="https://s3-alpha-sig.figma.com/img/1563/be4b/0ecd51c107707964cb0b4c400bac2b06?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c-Y3lEvSFRVrzelppLoscL4cQBt-6r90UDU8yNX7S1LDPdmGLW-FJ97rqZET0T6Vs2W70hvtBUTs0d3RXLCf-Sf6zrMFcCgo9MUFJS~TDWO6~zyvpU58-feGLgAeMK-RdY-TetoVdEOSkcMJDhtwzaZGtrxkq3WIDGp7PS7lz6GUktsOimm4UDKC2p0fBkNnENXjSHAGKIpPy8EODu6H3SLDy9g84ZufXwKwy~qufNHob477RhOpaWEvMol4Ng4AfOCorRxdzxaU~UEoQVyX3yfOcDI2l4QTau~8azOh8QfU6Tatz~t8huAGoUOk~5xYHwxk~uAbiUnWiRkezzcJ5Q__" alt="">
                            </div>

                            <div class="col col-9" style="background-color: transparent;">
                                <p style="font-size: 16px; line-height: 18.75px; display: flex; flex-wrap: wrap; justify-content: space-between;">
                                    <nobr id="ten-lua-chon" style="font-weight: 600; color: black;">${res[i].TenLuaChon}</nobr>

                                    <nobr style="color: #06B92A; font-weight: 800;">${new Intl.NumberFormat('vi-VN').format(res[i].GiaTien) + " VNĐ"}</nobr>
                                </p>

                                <hr style="size: 2px; color: black;">
                                <div class="row">
                                    <div class="col col-8">
                                        <ul style="color: black;" align="left">
                                            <li>Dứa</li>
                                            <li>Tôm sú và mực</li>
                                            <li>Ớt chuông xanh và đỏ</li>
                                        </ul>
                                    </div>

                                    <div class="col col-4" style="background-color: transparent; padding: 5px;">
                                        <div class="row">
                                            <div class="col col-3 btn-increase" style="background-color: #49F057; height: 32px; color: white; border-radius: 10px; text-align: center; cursor: pointer;">+</div>
                                            <div class="col col-3 quantity-display" style="text-align: center; line-height: 32px;">0</div>
                                            <div class="col col-3 btn-decrease" style="background-color: #F48787; height: 32px; color: white; border-radius: 10px; text-align: center; cursor: pointer;">-</div>
                                        </div>

                                        <div class="row" style="margin-top: 5px;">
                                            <div class="col col-11" style="background: #49F057; border-radius: 10px; height: auto;">
                                                <p style="font-weight: 600; font-size: 15px; color: white;">
                                                    Mã Món Ăn ${res[i].IDLuaChon}
                                                </p>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
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