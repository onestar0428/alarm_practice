export default class CurrClock {
    constructor({ $root }) {
        this.root = $root;
        this.init();
    }

    init() {
        const frag = document.createDocumentFragment();
        const title = document.createElement("h2");
        const titleText = document.createTextNode("현재 시간");
        title.appendChild(titleText);
        frag.appendChild(title);

        this.currTimeDiv = document.createElement("div");
        frag.appendChild(this.currTimeDiv);

        this.root.appendChild(frag);
    }

    updateClock(checkAlarmList) {
        const getTime = () => {
            const curr = new Date();
            this.currTimeDiv.innerHTML = curr;
            
            if (curr.getSeconds() === 0) {
                const year = curr.getFullYear();
                const month = curr.getMonth() + 1;
                const day = curr.getDay();
                const hour = curr.getHours();
                const minute = curr.getMinutes();
                checkAlarmList(year, month, day, hour, minute);
            }
        }
        getTime();
        setInterval(getTime, 1000);
    }
}