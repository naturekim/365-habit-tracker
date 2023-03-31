// Goal Modal
const goalModal = document.querySelector("dialog");
const goalInput = document.getElementById("goalInput");
const startInput = document.getElementById("startInput");
const goalSubmitBtn = document.getElementById("goalSubmitBtn");
const alertMessage = document.getElementById("alertMessage");
const modifyMessage = document.getElementById("modifyMessage");

// Goal Info Box
const goalBox = document.getElementById("goal-box");
const goal = document.getElementById("goal");
const start = document.getElementById("start");
const end = document.getElementById("end");
const period = document.getElementById("period");

// Tracker
const items = document.getElementById("tracker-box");

const BLIND = "blind";
const GOAL = "goal";
const START = "start";
const CKD_LIST = "ckdlist";

let startVal = new Date(); // Date
let endVal = new Date();
let ckdList = [];
let isSet = false; // 처음 or 수정인지에 따라 모달 다르게 처리

let savedGoal = localStorage.getItem(GOAL);
let savedStart = localStorage.getItem(START); // String "2022-01-03"

if (
  savedGoal === null ||
  savedGoal === "" ||
  savedStart === null ||
  savedStart === ""
) {
  paintGoalInfo("목표를 설정해보세요", startVal);
} else {
  isSet = true;
  startVal = new Date(savedStart);
  paintGoalInfo(savedGoal, startVal);
}

let savedCkdList = localStorage.getItem(CKD_LIST);
if (savedCkdList === null || saveCkdList.length === 0) {
  ckdList = new Array(365).fill(false);
  saveCkdList(ckdList)
  paintTracker();
} else {
  ckdList = JSON.parse(savedCkdList);
  paintTracker();
}

// ===== Paint Tracker =====
function paintTracker() {
  items.innerText = "";
  paintStartEnd("START");
  endVal = startVal; // paintItem에서 사용
  ckdList.forEach((checked, i) => paintItem(checked, i));
  paintStartEnd("CONGRATS🎉");
}


function paintStartEnd(text) {
  // css ::before로 할 수 있나
  const div = document.createElement("div");
  const span = document.createElement("span");
  span.innerText = text;
  div.appendChild(span);
  items.appendChild(div);
}

function paintItem(checked, i) {
  const div = document.createElement("div");
  div.setAttribute("class", "item");

  const p = document.createElement("p");
  const month = ("0" + (startVal.getMonth() + 1)).slice(-2);
  const day = ("0" + startVal.getDate()).slice(-2);
  const dateString = month + "/" + day;
  p.innerText = dateString;
  endVal.setDate(endVal.getDate() + 1); // 1일 추가

  const cbox = document.createElement("input");
  cbox.setAttribute("type", "checkbox");
  cbox.setAttribute("id", `cbox_${i}`);
  cbox.setAttribute("value", i);
  if (checked) {
    cbox.setAttribute("checked", checked);
  }

  // === Tracker Checkbox Event handling
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

// ===== Goal Modal =====
goalBox.addEventListener("click", () => {
  if (isSet) {
    goalInput.value = savedGoal;
    startInput.value = savedStart;
    modifyMessage.classList.remove(BLIND); // 수정시, 시작일 변경하면 트래커 초기화됨을 알림
  } else {
    modifyMessage.classList.add(BLIND);
  }
  alertMessage.innerText = "";
  goalModal.showModal();
});

// ===== Goal Submit =====
goalSubmitBtn.addEventListener("click", () => {
  if (isSet) {
    if (goalInput.value === "") {
      alertMessage.innerText = "목표를 입력해주세요";
      return;
    } else if (
      goalInput.value === savedGoal &&
      startInput.value === savedStart
    ) {
      alertMessage.innerText = "변경된 데이터가 없습니다.";
      return;
    } else {

      // validation 통과

      if(startInput.value !== savedStart) {
        // start 바뀐경우
        saveCkdList(ckdList)
        startVal = new Date( startInput.value);
        saveGoalAndStart(goalInput.value, startInput.value);
        isSet = true;
        paintGoalInfo(goalInput.value);
        ckdList = new Array(365).fill(false);
        paintTracker();
        goalModal.close();
        
      } else {
        //start 안바뀐경우
        saveGoalAndStart(goalInput.value, startInput.value);
          isSet = true;
          paintGoalInfo(goalInput.value);
          goalModal.close();
      }
    }
  } else {
    if (goalInput.value === "" || startInput.value === "") {
      alertMessage.innerText = "목표와 시작일을 입력해주세요";
      return;
    } else {
      ckdList = new Array(365).fill(false);
      saveCkdList(ckdList)
      paintTracker();
      startVal = new Date(startInput.value);
      saveGoalAndStart(goalInput.value, startInput.value);
        isSet = true;
        paintGoalInfo(goalInput.value);
        goalModal.close();
    }
  }
});

function saveGoalAndStart(paramGoal, paramStart) {
  savedGoal = paramGoal;
  savedStart = paramStart;
  console.log(paramGoal);
  console.log(paramStart);
  localStorage.setItem(GOAL, paramGoal);
  localStorage.setItem(START, paramStart);
  console.log("saveGoalAndStart");
}

// ===== Paint Goal Info =====
function paintGoalInfo(paramGoal) {
  goal.innerText = paramGoal;
  start.innerText = changeDateToString(startVal);
  // end
  let endVal = startVal.getTime() + 60 * 60 * 24 * 365 * 1000;
  endVal = new Date(endVal);
  end.innerText = changeDateToString(endVal);
  // period
  const today = new Date();
  let diffDate = today.getTime() - startVal.getTime();
  diffDate = Math.round(diffDate / (1000 * 60 * 60 * 24));
  if (diffDate < 0) {
    period.innerText = `${diffDate}일째`;
  } else {
    period.innerText = `${diffDate + 1}일째`;
  }
}

function changeDateToString(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "numeric",
  };
  return date.toLocaleDateString("ko-kr", options);
}
