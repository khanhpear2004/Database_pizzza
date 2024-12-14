document.getElementById("delete-staff-button").addEventListener('click', e => {
    try {
        const currentURL = window.location.href;
        let url = new URL(currentURL);
        let search_params = url.searchParams;
        let ID = search_params.get('id');

        fetch(
            `http://localhost:8000/deleteEmployee/${ID}`, {
                method: "DELETE"
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            } else {
                alert("Xóa Nhân Viên Thành Công!");
                location.replace("http://localhost:8000/admin/list_staff.html");
            }
        });
    } catch(error) {
        console.error(error.message);
    }
})