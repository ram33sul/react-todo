import { Heading, Input, ListComponent, Time } from "./components/comp";
import { useEffect, useState } from "react";
import './components/comp.css';
function App() {
  let [toDos,setToDos] = useState([]);
  let [completed,setCompleted] = useState([]);
  let [unCompleted,setUncompleted] = useState([]);

  useEffect(()=>{
    const toDos = JSON.parse(localStorage.getItem('toDos'));
    const completed = JSON.parse(localStorage.getItem('toDosCompleted'));
    const unCompleted = JSON.parse(localStorage.getItem('toDosUnCompleted'));
    if(toDos){
      setToDos(toDos);
    }
    if(completed){
      setCompleted(completed);
    }
    if(unCompleted){
      setUncompleted(unCompleted);
    }
  },[])

  useEffect(()=>{

    localStorage.setItem('toDos',JSON.stringify(toDos));
    localStorage.setItem('toDosCompleted',JSON.stringify(completed));
    localStorage.setItem('toDosUnCompleted',JSON.stringify(unCompleted));

  },[toDos,completed,unCompleted]);

  const addToDos = (toDo)=>{
    setToDos([...toDos,{id: Date.now(), text: toDo, status: false}]);
  }
  const removeToDos = (toDo) => {
    const modifiedToDos = toDos.filter(data => {
      return data.text !== toDo;
    })
    setToDos(modifiedToDos);
  }
  const addCompletedOrUncompleted = (status,toDo) => {
    if(status){
      setCompleted([...completed,toDo]);
    } else {
      setUncompleted([...unCompleted,toDo]);
    }
  }
  const changeStatus = (id) => {
    setToDos(toDos.map((data) => {
      if(data.id === id){
        data.status = !data.status;
      }
      return data;
    }));
  }

  const clearData = ()=>{
    setToDos([]);
    setCompleted([]);
    setUncompleted([]);
    localStorage.removeItem('toDos');
    localStorage.removeItem('toDosCompleted');
    localStorage.removeItem('toDosUnCompleted');
  }
  return (
    <div className="body">
      <div className="completed" id="completed-container">
        <h2>
          Completed
        </h2>
        {
          completed.map((data,index) => {
            return (
              <h3 className="list">
                {data}
              </h3>
            )
          })
        }
      </div>
      <div id="toDo-container">
        <Heading title='JUST DO IT !'/>
        <Time />
        <button onClick={clearData}>Clear</button>
        <Input placeholder='your task' addToDos={addToDos} toDos={toDos}/>
        {
          toDos.map((data,index)=>{
            return (
              <ListComponent key={index} serial={index+1} data={data} removeToDos = {removeToDos} changeStatus = {changeStatus} addCompletedOrUncompleted = {addCompletedOrUncompleted}/>
            )
          })
        }
      </div>
      <div className="unCompleted" id="unCompleted-container">
        <h2>
          Uncompleted
        </h2>
        {
          unCompleted.map((data,index) => {
            return (
              <h3 className="list">
                {data}
              </h3>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
