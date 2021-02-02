export default class AlarmList {
    constructor({ $root, onOffClick, onDeleteClick }) {
        this.root = $root;
        this.onOffClick = onOffClick;
        this.onDeleteClick = onDeleteClick;
        this.alarmList = [];
        this.init();
    }

    init() {
        const frag = document.createDocumentFragment();
        const title = document.createElement("h2");
        const titleText = document.createTextNode("알람목록");
        title.appendChild(titleText);
        frag.appendChild(title);

        this.list = document.createElement("ul");
        frag.appendChild(this.list);
        this.root.appendChild(frag);
    }

    addAlarm(alarm) {
        this.alarmList.push(alarm);

        const frag = document.createDocumentFragment();
        const li = document.createElement("li");
        const textNode = document.createTextNode(`${alarm.time} ${alarm.content}`);
        li.appendChild(textNode);

        const btnSpan = document.createElement("span");
        const offBtn = document.createElement("button");
        const offBtnText = document.createTextNode("끄기");
        offBtn.id = `off`;
        offBtn.appendChild(offBtnText);

        const deleteBtn = document.createElement("button");
        const deleteBtnText = document.createTextNode("삭제");
        deleteBtn.id = `delete`;
        deleteBtn.appendChild(deleteBtnText);

        btnSpan.appendChild(offBtn);
        btnSpan.appendChild(deleteBtn);
        btnSpan.addEventListener("click", (e) => {
            switch (e.target.id) {
                case 'off':
                    alarm.mode = "x";
                    break;
                case 'delete':
                    this.list.removeChild(li);
                    this.deleteAlarm(alarm);
                    break;
            }
        });

        li.appendChild(btnSpan);
        frag.appendChild(li);
        this.list.appendChild(frag);
    }

    updateList(time) {
        this.list.childNodes.forEach(child => {
            console.log(child.textContent.includes(time))
            console.log(child.textContent)
            console.log(time)
            if (child.textContent.includes(time)) {
                this.list.remove(child);
            }
        });
    }

    getAlarmList() {
        return this.alarmList;
    }

    deleteAlarm(date, time) {
        const newArr = [];

        this.alarmList.forEach(alarm => {
            if (alarm.time.split(':')[0] - time.split(':')[0] !== 0
                || alarm.time.split(':')[1] - time.split(':')[1] !== 0
                || alarm.date.split('.')[0] - date.split('.')[0] !== 0
                || alarm.date.split('.')[1] - date.split('.')[1] !== 0
                || alarm.date.split('.')[2] - date.split('.')[2] !== 0) {
                newArr.push(alarm);
            }
        });

        this.alarmList = newArr;
        this.updateList(time);
    }
}