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
const CHKLIST = "chklist";

const savedGoal = localStorage.getItem(GOAL);
if (savedGoal === null || savedGoal === "") {
  const startVal = new Date();
  const year = startVal.getFullYear();
  const month = ("0" + (startVal.getMonth() + 1)).slice(-2);
  const day = ("0" + startVal.getDate()).slice(-2);
  const dateString = `${year}-${month}-${day}`;
  localStorage.setItem(START, dateString);
  const savedChklist = localStorage.getItem(CHKLIST);
  if (savedChklist === null || savedChklist.length === 0) {
    const chklist = new Array(365).fill(false);
    localStorage.setItem(CHKLIST, JSON.stringify(chklist));
    const endVal = paintTracker(startVal, chklist);
    paintGoalInfo(startVal, endVal, "이곳을 클릭해 목표를 설정해보세요");
  } else {
    const endVal = paintTracker(startVal, JSON.parse(savedChklist));
    paintGoalInfo(startVal, endVal, "이곳을 클릭해 목표를 설정해보세요");
  }
} else {
  const savedStart = new Date(localStorage.getItem(START));
  const savedChklist = JSON.parse(localStorage.getItem(CHKLIST));
  const endVal = paintTracker(savedStart, savedChklist);
  paintGoalInfo(savedStart, endVal, savedGoal);
}

// ===== Tracker =====
function paintTracker(startVal, chklist) {
  items.innerText = "";
  const date = new Date(startVal);

  chklist.forEach((checked, i) => {
    const div = document.createElement("div");
    div.setAttribute("class", "item");

    const p = document.createElement("p");
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateString = month + "/" + day;
    if (i % 7 === 0) {
      p.innerText = dateString;
    } else {
      p.innerHTML = "&nbsp;";
    }
    date.setDate(date.getDate() + 1);

    const cbox = document.createElement("input");
    cbox.setAttribute("type", "checkbox");
    cbox.setAttribute("id", `cbox_${i}`);
    cbox.setAttribute("value", i);
    if (checked) {
      cbox.setAttribute("checked", checked);
    }
    // === Tracker Checkbox Event handling
    cbox.addEventListener("change", (e) => {
      const savedChklist = JSON.parse(localStorage.getItem(CHKLIST));
      savedChklist[e.target.value] = e.target.checked;
      localStorage.setItem(CHKLIST, JSON.stringify(savedChklist));

      if (e.target.checked) {
        const suceed = savedChklist.filter((suceed) => suceed === true);
        const total = period.innerText.slice(0, -1);
        alert(`좋아요👍 오늘까지 ${total} 중 ${suceed.length}일 성공했어요✨`);
      }
    });

    const label = document.createElement("label");
    label.setAttribute("for", `cbox_${i}`);
    label.innerText = i + 1;

    div.appendChild(p);
    div.appendChild(cbox);
    div.appendChild(label);
    items.appendChild(div);
  });

  return date;
}

// ===== Goal Info =====
function paintGoalInfo(startVal, endVal, goalVal) {
  goal.innerText = goalVal;
  start.innerText = toLocaleDateString(new Date(startVal));
  end.innerText = toLocaleDateString(new Date(endVal));
  const today = new Date();
  let diff = today.getTime() - startVal.getTime();
  diff = Math.round(diff / (1000 * 60 * 60 * 24));
  if (diff < 0) {
    period.innerText = `${diff}일째`;
  } else {
    period.innerText = `${diff + 1}일째`; // 첫째날을 1일로 카운트
  }
}

function toLocaleDateString(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "numeric",
  };
  return date.toLocaleDateString("ko-kr", options);
}

// ===== Goal Modal =====
goalBox.addEventListener("click", () => {
  alertMessage.innerText = "";
  startInput.value = localStorage.getItem(START);
  const goalVal = localStorage.getItem(GOAL);
  if (goalVal === null || goalVal === "") {
    modifyMessage.classList.add(BLIND);
  } else {
    modifyMessage.classList.remove(BLIND); // 수정시, 시작일 변경하면 트래커 초기화됨을 알림
    goalInput.value = goalVal;
  }
  goalModal.showModal();
});

// ===== Goal Submit =====
goalSubmitBtn.addEventListener("click", () => {
  const goalVal = goalInput.value;
  const startVal = startInput.value;

  if (goalVal === "") {
    alertMessage.innerText = "목표를 입력해주세요";
    return;
  }
  if (startVal === "") {
    alertMessage.innerText = "시작일을 입력해주세요";
    return;
  }

  const savedStart = localStorage.getItem(START);
  if (startVal !== savedStart) {
    // start 바뀐경우에는 start저장, chklist 초기화, tracker 재출력, goalInfo 재출력
    localStorage.setItem(START, startVal);
    const chklist = new Array(365).fill(false);
    localStorage.setItem(CHKLIST, JSON.stringify(chklist));
    const endVal = paintTracker(new Date(startVal), chklist);
    paintGoalInfo(new Date(startVal), endVal, goal);
  }

  localStorage.setItem(GOAL, goalVal);
  goal.innerText = goalVal;
  goalModal.close();
});
