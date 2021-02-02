import AlarmList from "./alarm-list.js";
import AlarmMessage from "./alarm-message.js";
import CurrClock from "./curr-clock.js";
import RegisterAlarm from "./register-alarm.js";

export default class App {
    constructor($root) {
        this.init($root);
    }

    init($root) {
        const currClock = new CurrClock({
            $root
        });

        const registerAlarm = new RegisterAlarm({
            $root,
            onAdd: function(alarm) {
                alarmList.addAlarm(alarm);
            }
        })

        const alarmList = new AlarmList({
            $root
        });

        const alarmMessage = new AlarmMessage({
            $root,
            getAlarmList: function() {
                return alarmList.getAlarmList();
            },
            deleteAlarm: function(date, time) {
                return alarmList.deleteAlarm(date, time);
            }
        });

        currClock.updateClock(alarmMessage.setCheck());
    }
}