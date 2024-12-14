try {
    fetch(
        "http://localhost:8000/listemployee", {
            method: "GET"
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        response.json().then(res => {
            let listStaffContainer = document.getElementById("list-staff-container");
            let htmls = ``;

            for(let i = 0; i < res.length; i++) {
                htmls += 
                `<div class="container" style="width: 100%; height: 129px; border: 1px solid black; border-radius: 10px; margin-bottom: 11px;">
                    <div class="row" style="height: 100%; background-color: transparent; padding: 18px 16px;">
                        <div class="col col-2" style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; height: 100%;">
                            <img class="rounded-circle dropdown dropdown-toggle" style="width: 90px;" alt="Avatar" data-bs-toggle="dropdown" aria-expanded="false" src="https://s3-alpha-sig.figma.com/img/9a6b/f24f/3ab2b1f66c877c09a8254f7601865724?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hCt-~97g9BrTKv57cFJeTu2RAGILy9HoPH9gqZq1gC-W6Pom5sRxpIndD~Z7NJM8SFV43Fp0MHjDNafgGD0EzDmn6VikUvhjys3ZS6B0d0CJZUV1PNJQfYnFURmm7W6seiy-f2ro-R5~Tl6yQ~7HdInQ8brn1zMETIw2jHWXprG72y2r9vzy5xOQ7TUAtsmAzq-~6GooSsigJQRJlEDN9lsuaI0J~f~c4cOVZnK8QKDEds4GxfQYEkRPWh14wU0HHm~1ffUqI~kMvcCVXkuHX9PcE04EFVppYf2wF7sElDC1RPLPutylw7K9Gi7vv0z2BdBYR5BpMF8Sl0MP4xugyA__"/>
                        </div>

                        <div class="col col-6" style="background-color: transparent;">
                            <div class="container">
                                <div class="row" style="background-color: transparent;">
                                    <div class="col col-12" style="display: flex; flex-flow: wrap column; justify-content: flex-start; align-items: flex-start;">
                                        <p style="font-size: 16px; line-height: 20.8px; text-underline-position: from-font; color: #000000;">
                                            <nobr style="font-weight: bold;">
                                                Mã Nhân Viên: 
                                            </nobr>
                                            
                                            <nobr id="mnv">${res[i].employee_id}</nobr>
                                        </p>
                                        
                                        <p style="font-size: 16px; line-height: 20.8px; text-underline-position: from-font; color: #000000;">
                                            <nobr style="font-weight: bold;">
                                                Tên Nhân Viên: 
                                            </nobr>
                                            
                                            <nobr id="namenv">${res[i].name}</nobr>
                                        </p>

                                        <p style="font-size: 16px; line-height: 20.8px; text-underline-position: from-font; color: #000000;">
                                            <nobr style="font-weight: bold;">
                                                Số Điện Thoại: 
                                            </nobr>
                                            
                                            <nobr id="sdtnv">${res[i].phone}</nobr>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col col-4" style="background-color: transparent; display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: flex-end;">
                            <a href="staff_info.html?id=${res[i].employee_id}" class="btn" type="button" style="color: white; background-color: #F48787; border-radius: 10px; border: 1px solid black; width: 231px; height: 43px; margin-bottom: 18px;">
                                LỊCH SỬ LÀM VIỆC
                            </a>
                        </div>  
                    </div>
                </div>`;
            }

            listStaffContainer.innerHTML = htmls;
        });
    });
} catch (error) {
    console.error(error.message);
}