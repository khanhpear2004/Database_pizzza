try {
    fetch(
        `http://localhost:8000/listemployee`, {
            method: "GET"
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        response.json().then(res => {
            let danhSachTrucDiv = ``;

            for(let i = 0; i < 3; i ++) {
                danhSachTrucDiv += 
                `<div class="row" style="border: 1px solid black; border-radius: 10px; height: auto; padding: 18px 18px 0; margin-bottom: 15px;">
                    <div class="col col-4">
                        <img style="width: 107px; height: 93px; border-radius: 1000px" src="https://s3-alpha-sig.figma.com/img/9a6b/f24f/3ab2b1f66c877c09a8254f7601865724?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SrEooKhUpDYbseQcZ-nEmd4ht-f2eEW6IJKm6j6xbTURD-NJ~AeBu6E7NPTG9U55Q7nt~2QGiSfe0dz1qt77lI8sdHflARXs1yR4whvOk4t7AtEWYMtEsSiD8tXYEqwjruPwn7DZ-rsGOCKmW6ShRB6eMQQ7glRbNi1sVmbiDKMoKzyTnsS66-t-ufnILO3d8IaLCsDwDo8i~Wa0XLQ1UkRysed88dMcUotuEC1VzYj08ruAW5BmBE0WHjwZ0xTtpJ-I91gqaDicTvzGsmdJooFh411wv-vhJIohl-iUgSSgM~RnwWrgB7bl6QIXmXZGX-h3W~cl5Nl5-nui9Pj3TQ__" alt="">
                    </div>

                    <div class="col col-8">
                        <p style="font-size: 16px; line-height: 20.8px; color: black;">
                            <nobr style="font-weight: 700;">Mã Nhân Viên: </nobr>
                            <nobr style="font-weight: 500;" id="ma-nhan-vien">${res[i].employee_id}</nobr>
                        </p>

                        <p style="font-size: 16px; line-height: 20.8px; color: black;">
                            <nobr style="font-weight: 700;">Tên Nhân Viên: </nobr>
                            <nobr style="font-weight: 500;" id="ten-nhan-vien">${res[i].name}</nobr>
                        </p>

                        <p style="font-size: 16px; line-height: 20.8px; color: black;">
                            <nobr style="font-weight: 700;">Số Điện Thoại: </nobr>
                            <nobr style="font-weight: 500;" id="so-dien-thoai">${res[i].phone}</nobr>
                        </p>
                    </div>
                </div>`;
            }

            document.getElementById("danh-sach-truc").innerHTML = danhSachTrucDiv;
        });
    });
} catch (error) {
    console.error(error.message);
}

try {
    fetch(
        `http://localhost:8000/pizza`, {
            method: "GET"
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        response.json().then(res => {
            let thucDonDiv = ``;

            for(let i = 0; i < 4; i ++) {
                thucDonDiv += 
                `<div class="row" style="border: 1px solid black; border-radius: 10px; height: auto; padding: 10px; margin-bottom: 15px;">
                    <div class="col col-3">
                        <img style="width: 90px; height: 80px; border-radius: 1000px" src="https://s3-alpha-sig.figma.com/img/1563/be4b/0ecd51c107707964cb0b4c400bac2b06?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CnMWhEGqY8VDBxBZ-9IK2W3ek9w3vm0Y2u4mZ6LrmIrx78czOXfGzsSL6d~U5hKjn7PpL1mykymA80yOQEPMrDFJtiNbZOpudgESRbntnaBGIkbHX4pK7UwaEkc5K0qUyFICcEYMGfKeTLMlDL8KinWGW~5SOAzIItKLhFyK~FxABsYYtMqpv9xbmgpwCvVn9~Z7ysR8WiYtzV0MPXY~x8IeAEp5wxnN8KcyVW44AK0Vnux6wQ855gEhtu3rFEPviB6KJKnUlLLjqZXPFqAoQvst3-Na1OIW6PSjqtE5pKSRkoNDeF-OlrvbCN-qtggPlqGPHLwHfuXqGKYtzij9ow__" alt="">
                    </div>

                    <div class="col col-9">
                        <div style="display: flex; flex-flow: wrap row; justify-content: space-between; border-bottom: 1px solid black;">
                            <nobr style="font-size: 16px; line-height: 20.8px; font-weight: 600; color: black;">
                                ${res[i].TenLuaChon}
                            </nobr>

                            <nobr style="font-size: 16px; font-weight: 800; line-height: 18.75px; color: #06B92A;" id="ma-nhan-vien">
                                ${new Intl.NumberFormat('vi-VN').format(res[i].GiaTien) + " VNĐ"}
                            </nobr>
                        </div>

                        <div style="display: flex; flex-flow: wrap row-reverse; justify-content: flex-start; align-items: flex-end; height: 60%;">
                            <a href="./food_info.html" type="button" style="color: white; background-color: #49F057; width: 50%; border-radius: 20px; height: 34px; float: right;" class="btn text-capitalize">
                                Còn Hàng
                            </a>
                        </div>                                                                        
                    </div>
                </div>`;
            }

            document.getElementById("thuc-don").innerHTML = thucDonDiv;
        });
    });
} catch (error) {
    console.error(error.message);
}