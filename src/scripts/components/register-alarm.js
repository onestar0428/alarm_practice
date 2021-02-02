import flatpickr from "flatpickr";
import { Korean } from "flatpickr/dist/l10n/ko.js";

export default class RegisterAlarm {
    constructor({ $root, onAdd }) {
        this.clockMode = ["일반", "진동", "야간"];
        this.alarmMode = ["일반", "긴급"];
        this.action = ["소리", "진동", "x"];
        this.alarmId = 1;
        this.onAdd = onAdd;
        this.root = $root;
        this.init();
    }

    init() {
        const frag = document.createDocumentFragment();
        const title = document.createElement("h2");
        const titleText = document.createTextNode("알람 등록");
        title.appendChild(titleText);
        frag.appendChild(title);

        const clockModeText = document.createTextNode("시계모드: ");
        this.clockModeSelect = document.createElement("select");
        this.clockModeSelect.appendChild(this.addOption(this.clockMode));
        frag.appendChild(clockModeText);
        frag.appendChild(this.clockModeSelect);
        frag.appendChild(document.createElement("br"));

        const datePickText = document.createTextNode("시간설정: ");
        this.datePick = document.createElement("input");
        this.datePick.className = "dateSelector";
        this.datePick.placeholder = "연도. 월. 일.";
        flatpickr.localize(Korean);
        flatpickr(this.datePick, {
            dateFormat: "Y.m.d.",
            minDate: "today"
        });
        frag.appendChild(datePickText);
        frag.appendChild(this.datePick);
        frag.appendChild(document.createElement("br"));

        const alarmModeText = document.createTextNode("알람모드: ");
        this.alarmModeSelect = document.createElement("select");
        this.alarmModeSelect.appendChild(this.addOption(this.alarmMode));
        this.timePick = document.createElement("input");
        this.timePick.className = "dateSelector";
        flatpickr(this.timePick, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true
        });
        frag.appendChild(alarmModeText);
        frag.appendChild(this.alarmModeSelect);
        frag.appendChild(this.timePick);
        frag.appendChild(document.createElement("br"));

        const contentText = document.createTextNode("내용: ");
        this.contentInput = document.createElement("input");
        this.contentInput.type = "text";
        const addBtn = document.createElement("button");
        frag.appendChild(contentText);
        frag.appendChild(this.contentInput);
        frag.appendChild(document.createElement("br"));

        const addBtnText = document.createTextNode("내용추가");
        addBtn.appendChild(addBtnText);
        addBtn.addEventListener("click", () => {
            this.addAlarm();
        });
        frag.appendChild(addBtn);
        this.root.appendChild(frag);
    }

    addOption(modeList) {
        const frag = document.createDocumentFragment();

        modeList.forEach(mode => {
            const optionBox = document.createElement("option");
            const textNode = document.createTextNode(mode);
            optionBox.appendChild(textNode);
            optionBox.value = mode;
            frag.appendChild(optionBox);
        });
        return frag;
    }

    addAlarm() {
        const id = this.alarmId;
        const alarm = {
            id: id,
            mode: this.getMode(this.clockModeSelect.value, this.alarmModeSelect.value),
            date: this.datePick.value,
            time: this.timePick.value,
            content: this.contentInput.value
        };
        this.alarmId++;
        this.onAdd(alarm);
    }

    getMode(time, alarm) {
        switch (time) {
            case this.clockMode[0]:
                return "소리";
            case this.clockMode[1]:
                return "진동";
            case this.clockMode[2]:
                if (alarm === this.alarmMode[0]) {
                    return this.action[2];
                } else {
                    return this.action[0];
                }
        }
    }
}