document.getElementById("modify-staff-button").addEventListener('click', e => {
    try {
        const currentURL = window.location.href;
        let url = new URL(currentURL);
        let search_params = url.searchParams;
        let ID = search_params.get('id');

        const updateData = {
            phone: document.getElementById("sdt-nv").value,
            salary: (parseInt(document.getElementById("luong-co-ban-nv").value.replace(/\./g, '').replace('VNĐ', '').trim(), 10)).toString()
        };

        fetch(
            `http://localhost:8000/updateEmployee/${ID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            alert("Chỉnh sửa thành công!");
            location.reload();
        });
    } catch(error) {
        console.error(error.message);
    }
})