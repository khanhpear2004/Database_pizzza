let orderQuantities = [];

function updateQuantity(itemId, change) {
    let item = orderQuantities.find(item => item.IDLuaChon === itemId);

    if (item) {
        item.SoLuong = Math.max(0, item.SoLuong + change);
        if (item.SoLuong === 0) {
            orderQuantities = orderQuantities.filter(item => item.IDLuaChon !== itemId);
        }
    } else if (change > 0) {
        orderQuantities.push({ IDLuaChon: itemId, SoLuong: 1 });
    }

    updateQuantityDisplay(itemId);
}

function updateQuantityDisplay(itemId) {
    const itemElement = document.querySelector(`[data-id="${itemId}"] .quantity-display`);
    const item = orderQuantities.find(item => item.IDLuaChon === itemId);
    itemElement.textContent = item ? item.SoLuong : 0;
}

document.addEventListener('click', function (event) {
    if (event.target.matches('.btn-increase')) {
        const itemId = event.target.closest('.col.col-6').dataset.id; // Tìm chính xác phần tử chứa data-id
        // alert(`${itemId}`);
        updateQuantity(itemId, 1);
    }

    if (event.target.matches('.btn-decrease')) {
        const itemId = event.target.closest('.col.col-6').dataset.id; // Tương tự
        // alert(`${itemId}`);
        updateQuantity(itemId, -1);
    }
});

function getItemsWithQuantity() {
    const items = document.querySelectorAll('.col.col-6'); 
    const result = [];

    items.forEach(item => {
        const itemId = item.dataset.id; 
        const quantityDisplay = item.querySelector('.quantity-display'); 
        const quantity = parseInt(quantityDisplay.textContent.trim()); 

        if (quantity > 0) {
            result.push({ id: itemId, quantity: quantity }); 
        }
    });

    return result; 
}

document.getElementById("confirm-button").addEventListener("click", async e => {
    let getDonHang = getItemsWithQuantity();

    let sumTien = 0;
    // Khởi tạo mảng promises
    let promises = getDonHang.map(async item => {
        try {            
            const response = await fetch(`http://localhost:8000/pizza/${item.id}`, { method: "GET" });
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const res = await response.json();
            
            sumTien += res[0].GiaTien * item.quantity;
            // Trả về HTML của từng mục
            return `
                <div style="margin: 10px; border: 1px solid black; border-radius: 10px; height: auto;">
                    <div class="row" style="padding: 10px 10px;">
                        <div class="col col-3" style="background-color: transparent;">
                            <img style="width: 111px; height: 95px; border-radius: 10px;" src="https://s3-alpha-sig.figma.com/img/1563/be4b/0ecd51c107707964cb0b4c400bac2b06?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c-Y3lEvSFRVrzelppLoscL4cQBt-6r90UDU8yNX7S1LDPdmGLW-FJ97rqZET0T6Vs2W70hvtBUTs0d3RXLCf-Sf6zrMFcCgo9MUFJS~TDWO6~zyvpU58-feGLgAeMK-RdY-TetoVdEOSkcMJDhtwzaZGtrxkq3WIDGp7PS7lz6GUktsOimm4UDKC2p0fBkNnENXjSHAGKIpPy8EODu6H3SLDy9g84ZufXwKwy~qufNHob477RhOpaWEvMol4Ng4AfOCorRxdzxaU~UEoQVyX3yfOcDI2l4QTau~8azOh8QfU6Tatz~t8huAGoUOk~5xYHwxk~uAbiUnWiRkezzcJ5Q__" alt="">
                        </div>

                        <div class="col col-9" style="background-color: transparent;">
                            <p style="font-size: 16px; line-height: 18.75px; display: flex; flex-wrap: wrap; justify-content: space-between;">
                                <nobr style="font-weight: 600; color: black;">
                                    ${res[0].TenLuaChon}, ID Món: ${res[0].IDLuaChon}
                                </nobr>

                                <nobr style="color: #06B92A; font-weight: 800;">
                                    ${new Intl.NumberFormat('vi-VN').format(res[0].GiaTien) + " VNĐ"}
                                </nobr>
                            </p>

                            <hr style="size: 2px; color: black;">
                            <div class="row">
                                <div class="col col-8" style="color: black;">
                                    <p style="font-size: 16px; font-weight: 600; line-height: 18.75px;">
                                        Số Lượng: 

                                        <nobr id="so-luong">${item.quantity}</nobr>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        } catch (error) {
            console.error(`Error fetching item ${item.id}:`, error.message);
            return ''; // Trả về chuỗi rỗng nếu lỗi
        }
    });

    // Đợi tất cả các promise hoàn thành
    let divGetDonHangMoiArray = await Promise.all(promises);

    // Ghép nội dung và cập nhật vào HTML
    document.getElementById("don-hang-list-moi").innerHTML = divGetDonHangMoiArray.join('');
    document.getElementById("tong-tien-xac-nhan").innerHTML = `${new Intl.NumberFormat('vi-VN').format(sumTien) + " VNĐ"}`;
    document.getElementById("tong-tien").innerHTML = `${new Intl.NumberFormat('vi-VN').format(sumTien) + " VNĐ"}`;
});
