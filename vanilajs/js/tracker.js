let startDate = new Date("2023-02-28");
let ckdList = [];
const items = document.getElementById("tracker-box");
const CKD_LIST = "ckdlist";

paintStartEnd("START", "tracker-start-end mr-10");
const savedCkdList = localStorage.getItem(CKD_LIST);
if (savedCkdList === null || savedCkdList.length === 0) {
  for (let i = 0; i < 365; i++) {
    ckdList[i] = false;
    paintItem(false, i);
  }
  saveCkdList(ckdList);
} else {
  const parsedCkdList = JSON.parse(savedCkdList);
  ckdList = parsedCkdList;
  ckdList.forEach((checked, i) => paintItem(checked, i));
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

function paintItem(checked, i) {
  const div = document.createElement("div");
  div.setAttribute("class", "item");

  const p = document.createElement("p");
  const month = ("0" + (startDate.getMonth() + 1)).slice(-2);
  const day = ("0" + startDate.getDate()).slice(-2);
  const dateString = month + "/" + day;
  p.innerText = dateString;
  startDate.setDate(startDate.getDate() + 1); // 1일 추가

  const cbox = document.createElement("input");
  cbox.setAttribute("type", "checkbox");
  cbox.setAttribute("id", `cbox_${i}`);
  cbox.setAttribute("value", i);
  if (checked) {
    cbox.setAttribute("checked", checked);
  }
  // 체크박스 변경 시 이벤트 핸들러 추가(값 저장)
  cbox.addEventListener("change", (e) => {
    ckdList[e.target.value] = e.target.checked;
    saveCkdList(ckdList);
  });

  const label = document.createElement("label");
  label.setAttribute("for", `cbox_${i}`);
  label.innerText = i + 1;

  div.appendChild(p);
  div.appendChild(cbox);
  div.appendChild(label);
  items.appendChild(div);
}

function saveCkdList(ckdList) {
  localStorage.setItem(CKD_LIST, JSON.stringify(ckdList));
}