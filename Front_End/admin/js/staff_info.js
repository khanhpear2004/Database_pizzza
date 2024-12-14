try {
    const currentURL = window.location.href;
    let url = new URL(currentURL);
    let search_params = url.searchParams;
    let ID = search_params.get('id');

    fetch(
        `http://localhost:8000/searchEmployee/${ID}`, {
            method: "GET"
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        response.json().then(res => {
            document.getElementById("ma-nv").value = res.employee_id;
            document.getElementById("ten-nv").value = res.name;
            document.getElementById("sdt-nv").value = res.phone;
            document.getElementById("chucvu-nv").value = res.chef_flag ? "Đầu Bếp" : "Nhân Viên";
            let dateObj = new Date(res.birth_date);
            let day = dateObj.getDate().toString().padStart(2, '0');
            let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            let year = dateObj.getFullYear();
            document.getElementById("birthdate-nv").value = `${year}-${month}-${day}`;
            document.getElementById("luong-co-ban-nv").value = new Intl.NumberFormat('vi-VN').format(res.salary) + " VNĐ";
        });
    });
} catch (error) {
    console.error(error.message);
}