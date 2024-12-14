function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWorkShift() {    
    const startMorning = 6 * 60; 
    const endMorning = 12 * 60;  
    const startAfternoon = 12 * 60; 
    const endAfternoon = 18 * 60;
    const startShiftMorning = getRandomInt(startMorning, endMorning - 60); 
    const endShiftMorning = startShiftMorning + 180;
    const startShiftAfternoon = getRandomInt(startAfternoon, endAfternoon - 60); 
    const endShiftAfternoon = startShiftAfternoon + 180; 
    
    function convertToTime(minute) {
        const hours = Math.floor(minute / 60);
        const minutes = minute % 60;
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    return {
        morningShift: {
            start: convertToTime(startShiftMorning),
            end: convertToTime(endShiftMorning)
        },
        afternoonShift: {
            start: convertToTime(startShiftAfternoon),
            end: convertToTime(endShiftAfternoon)
        }
    };
}

function getRandomDateAfterNextWeek() {
    const today = new Date();
    const nextWeekStart = new Date(today);
    nextWeekStart.setDate(today.getDate() + (7 - today.getDay())); 
    const afterNextWeekStart = new Date(nextWeekStart);
    afterNextWeekStart.setDate(afterNextWeekStart.getDate() + 7); 
    const afterNextWeekEnd = new Date(afterNextWeekStart);
    afterNextWeekEnd.setDate(afterNextWeekStart.getDate() + 30); 
    const randomDate = new Date(afterNextWeekStart.getTime() + Math.random() * (afterNextWeekEnd.getTime() - afterNextWeekStart.getTime()));
    const day = randomDate.getDate().toString().padStart(2, '0');
    const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
    const year = randomDate.getFullYear();
    return `${day}/${month}/${year}`;
}

try {
    fetch(
        `http://localhost:8000/shift/getShifts`, {
            method: "GET",
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        response.json().then(res => {
            let listCaTrucTuanNayDiv = ``;

            for(let i = 0; i < res.length; i ++) {
                let startTime = new Date(res[i].starttime);
                let hourStart = startTime.getUTCHours();
                let minuteStart = startTime.getUTCMinutes();

                let endTime = new Date(res[i].endtime);
                let hourEnd = endTime.getUTCHours();
                let minuteEnd = endTime.getUTCMinutes();

                let date = new Date(res[i].shiftdate);
                let day = date.getUTCDate();
                let month = date.getUTCMonth() + 1;
                let year = date.getUTCFullYear();

                listCaTrucTuanNayDiv += 
                `<div style="width: 100%; height: auto; border: 1px solid black; border-radius: 10px; margin-bottom: 9px;">
                    <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black; margin: 11px;">
                        <nobr style="color: #DC802A;">GIỜ BẮT ĐẦU: </nobr>

                    <nobr id="gio-bat-dau">${hourStart < 10 ? `0${hourStart}` : hourStart}:${minuteStart < 10 ? `0${minuteStart}` : minuteStart}</nobr>

                        <nobr style="font-size: 16px; font-style: italic; font-weight: 400; line-height: 20.8px; color: black; float: right;">
                            Số người thực hiện: ${res[i].currentparticipants}/${res[i].maxparticipants}
                        </nobr>
                    </p>
                    
                    <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black; margin: 11px;">
                        <nobr style="color: #DC802A;">GIỜ KẾT THÚC: </nobr>

                        <nobr id="gio-bat-dau">${hourEnd < 10 ? `0${hourEnd}` : hourEnd}:${minuteEnd < 10 ? `0${minuteEnd}` : minuteEnd}</nobr>
                    </p>

                    <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black; margin: 11px;">
                        <nobr style="color: #DC802A;">NGÀY THỰC HIỆN: </nobr>

                        <nobr id="gio-bat-dau">${day}/${month}/${year}</nobr>

                        <button id="dang-ky-ca-truc" data-shift-id="${res[i].shiftid}" class="btn text-white" style="float: right; background-color: #49F057; font-size: 15px; font-weight: 700; line-height: 19.5px; width: 176px; height: 30px; border: 1px solid black; border-radius: 10px;">
                            ĐĂNG KÝ
                        </button>
                    </p>
                </div>`;
            }

            document.getElementById("list-lua-chon-ca-truc").innerHTML = listCaTrucTuanNayDiv;

            let listCaTrucDaChonDiv = ``;

            for(let i = 0; i < 4; i ++) {
                const shifts = Math.random() < 0.5 ? generateWorkShift().morningShift : generateWorkShift().afternoonShift;
                let MAX = getRandomInt(4, 8);

                listCaTrucDaChonDiv += 
                `<div style="width: 100%; height: auto; border: 1px solid black; border-radius: 10px; margin-bottom: 9px;">
                    <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black; margin: 11px;">
                        <nobr style="color: #DC802A;">GIỜ BẮT ĐẦU: </nobr>

                        <nobr id="gio-bat-dau">${shifts.start}</nobr>

                        <nobr style="font-size: 16px; font-style: italic; font-weight: 400; line-height: 20.8px; color: black; float: right;">
                            Số người thực hiện: ${getRandomInt(1, MAX)}/${MAX}
                        </nobr>
                    </p>
                    
                    <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black; margin: 11px;">
                        <nobr style="color: #DC802A;">GIỜ KẾT THÚC: </nobr>

                        <nobr id="gio-bat-dau">${shifts.end}</nobr>
                    </p>

                    <p style="font-size: 20px; font-weight: 600; line-height: 26px; color: black; margin: 11px;">
                        <nobr style="color: #DC802A;">NGÀY THỰC HIỆN: </nobr>

                        <nobr id="gio-bat-dau">${getRandomDateAfterNextWeek()}</nobr>

                        <button class="btn text-white" style="float: right; background-color: #F48787; font-size: 15px; font-weight: 700; line-height: 19.5px; width: 176px; height: 30px; border: 1px solid black; border-radius: 10px;">
                            HỦY ĐĂNG KÝ
                        </button>
                    </p>
                </div>`;
            }

            document.getElementById("list-ca-truc-da-chon").innerHTML = listCaTrucDaChonDiv;
        });
    });
} catch (error) {
    console.error(error.message);
}

document.getElementById("list-lua-chon-ca-truc").addEventListener("click", (event) => {    
    if (event.target && event.target.id === "dang-ky-ca-truc") {        
        const shiftId = event.target.getAttribute("data-shift-id");
        
        const postDangKyCaTruc = {
            employee_id: "EMP00001", 
            shift_id: shiftId
        };

        fetch(`http://localhost:8000/shift/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postDangKyCaTruc)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            alert("Đăng ký ca trực thành công!");
            location.replace("http://localhost:8000/staff/ca_truc.html");
        })
        .catch(error => console.error(error));
    }
});
