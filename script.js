const morningTimes = [
    "07:00",
    "07:50",
    "08:40",
    "09:40",
    "10:30"
];

const afternoonTimes = [
    "13:30",
    "14:20",
    "15:10",
    "16:00"
];

const days = [
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7"
];

function createTable(id, times, startPeriod) {

    const tbody = document.getElementById(id);

    times.forEach((time, index) => {

        const tr = document.createElement("tr");

        const period = startPeriod + index;

        tr.innerHTML = `
            <td>${period}</td>
            <td>${time}</td>

            ${days.map(day => `
                <td
                    contenteditable="true"
                    class="subject"
                    data-key="${day}-${period}"
                    spellcheck="false">
                </td>
            `).join("")}
        `;

        tbody.appendChild(tr);
    });
}

createTable("morning", morningTimes, 1);
createTable("afternoon", afternoonTimes, 6);


const cells = document.querySelectorAll(".subject");


// ================= LƯU =================

function saveTKB(show = true) {

    const data = {};

    cells.forEach(cell => {
        data[cell.dataset.key] = cell.innerText.trim();
    });

    localStorage.setItem(
        "TKB_QUAN",
        JSON.stringify(data)
    );

    if (show) {
        showMessage("✓ ĐÃ LƯU THỜI KHÓA BIỂU");
    }
}


// ================= TẢI =================

function loadTKB() {

    const saved = localStorage.getItem("TKB_QUAN");

    if (!saved) return;

    const data = JSON.parse(saved);

    cells.forEach(cell => {

        const key = cell.dataset.key;

        if (data[key] !== undefined) {
            cell.innerText = data[key];
        }
    });
}


// ================= TỰ LƯU =================

cells.forEach(cell => {

    cell.addEventListener("input", () => {
        saveTKB(false);
    });

});


// ================= XÓA =================

function clearTKB() {

    if (!confirm("Xóa toàn bộ thời khóa biểu?")) return;

    cells.forEach(cell => {
        cell.innerText = "";
    });

    localStorage.removeItem("TKB_QUAN");

    showMessage("✓ ĐÃ XÓA");
}


// ================= THÔNG BÁO =================

function showMessage(text) {

    const message = document.getElementById("message");

    message.textContent = text;

    setTimeout(() => {
        message.textContent = "";
    }, 2000);
}


// ================= ĐỒNG HỒ =================

function updateClock() {

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString("vi-VN");

    document.getElementById("date").textContent =
        now.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
}

setInterval(updateClock, 1000);
updateClock();


// ================= LOAD =================

loadTKB();