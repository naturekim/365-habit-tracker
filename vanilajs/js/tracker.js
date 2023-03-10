// let startDate = new Date();
let startDate = new Date("2023-02-28");

const items = document.getElementById("tracker-box");
paintStartEnd("START", "tracker-start-end mr-10");
for(let i=0; i<365; i++) {
    items.appendChild(paintItem(i));
}
paintStartEnd("CONGRATS🎉", "tracker-start-end ml-10");

function paintStartEnd(text, className) {
    const div = document.createElement("div");
    div.setAttribute("class", className);
    const span = document.createElement("span");
    span.innerText = text;
    div.appendChild(span);
    items.appendChild(div);
}

function paintItem(i) {
    const div = document.createElement("div");
    div.setAttribute("class", "item");
    
    const p = document.createElement("p");
    const month = ('0' + (startDate.getMonth() + 1)).slice(-2);
    const day = ('0' + startDate.getDate()).slice(-2);
    const dateString = month  + '/' + day;
    p.innerText = dateString;
    startDate.setDate(startDate.getDate() + 1); // 1일 추가

    const cbox = document.createElement("input");
    cbox.setAttribute("type", "checkbox");
    cbox.setAttribute("id", `cbox_${i}`);
    
    const label = document.createElement("label");
    label.setAttribute("for", `cbox_${i}`);
    label.innerText = i+1;

    div.appendChild(p);
    div.appendChild(cbox);
    div.appendChild(label);
    return div;
}