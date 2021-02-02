export default class AlarmMessage {
    constructor({ $root, getAlarmList, deleteAlarm }) {
        this.root = $root;
        this.getAlarmList = getAlarmList;
        this.deleteAlarm = deleteAlarm;
        this.init();
    }

    init() {
        const frag = document.createDocumentFragment();
        const title = document.createElement("h2");
        const titleText = document.createTextNode("메시지");
        title.appendChild(titleText);
        frag.appendChild(title);

        this.textArea = document.createElement("textarea");
        frag.appendChild(this.textArea);
        this.root.appendChild(frag);

        this.setCheck();
    }

    setCheck() {
        return (year, month, day, hour, minute) => {
            const ringAlarms = this.getAlarmList().filter(alarm => {
                const dateSplit = alarm.date.split('.');
                const timeSplit = alarm.time.split(':');

                const yy = dateSplit[0];
                const mm = dateSplit[1];
                const dd = dateSplit[2];
                const h = timeSplit[0];
                const m = timeSplit[1];

                if (year - yy === 0 && month - mm === 0 && day - dd === 0
                    && hour - h === 0 && minute - m === 0) {
                    return true;
                }
                return false;
            });

            this.addMessage(ringAlarms);
            this.deleteAlarm(`${year}.${month}.${day}`, `${hour}:${minute}`);
        }
    }

    addMessage(alarms) {
        this.textArea.value += alarms.reduce((acc, curr) => acc + `${curr.time} ${curr.content} (${curr.mode}알림)!\n`, '');
    }
}