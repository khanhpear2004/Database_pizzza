document.getElementById("delete-food-button").addEventListener('click', e => {
    try {
        const currentURL = window.location.href;
        let url = new URL(currentURL);
        let search_params = url.searchParams;
        let ID = search_params.get('id');

        fetch(
            `http://localhost:8000/pizza/${ID}`, {
                method: "DELETE"
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            alert("Xóa thành công!");
            location.replace("http://localhost:8000/admin/menu.html");
        });
    } catch(error) {
        console.error(error.message);
    }
})