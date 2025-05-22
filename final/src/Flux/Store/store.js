import Appdispatcher from "../Dispatcher/Appdispatcher";
import EventEmitter from "events";


let _tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 5);
}

class TaskStore extends EventEmitter {
  getTasks() {
    return _tasks;
  }

  emitChange() {
    this.emit("change");
  }

  addChangeListener(callback) {
    this.on("change", callback);
  }

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  }
}

const taskStore = new TaskStore();

AppDispatcher.register((action) => {
  switch (action.type) {
    case "ADD_TASK":
      _tasks.push({ id: generateId(), text: action.text });
      localStorage.setItem("tasks", JSON.stringify(_tasks));
      taskStore.emitChange();
      break;
    case "DELETE_TASK":
      _tasks = _tasks.filter((task) => task.id !== action.id);
      localStorage.setItem("tasks", JSON.stringify(_tasks));
      taskStore.emitChange();
      break;
    default:
      break;
  }
});


export default Store;
