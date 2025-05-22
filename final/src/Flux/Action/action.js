import Appdispatcher from "../Dispatcher/Appdispatcher";


const action ={
    AddTask(text){
        Appdispatcher.dispatch({
            type: "ADD_TASK",
            text,
        });
    },

    deleteTask(id) {
    AppDispatcher.dispatch({
      type: "DELETE_TASK",
      id,
    });
  },
};

export default action;
