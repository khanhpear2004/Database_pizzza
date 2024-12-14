document.getElementById("add-food-button").addEventListener("click", e => {
    try {
        const postData = {
            TenThucDon: document.getElementById("ten-mon-an").value,
            gia: (parseInt(document.getElementById("gia-tien").value.replace(/\./g, '').replace('VNĐ', '').trim(), 10)).toString(),
            loai: "MonAnDon",
            pizza_flag: "1",
            Thucuong_flag: "0",
            Kich_co: document.getElementById("kich-co").value === "" ? null : document.getElementById("kich-co").value,
            loai_mon: document.getElementById("loai-mon").value
        };

        fetch(
            `http://localhost:8000/pizza`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
    
            alert("Thêm Món Ăn Thành Công");
            location.replace("http://localhost:8000/admin/menu.html");
        });
    } catch (error) {
        console.error(error.message);
    }
});