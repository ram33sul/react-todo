import { useEffect, useState } from 'react';


function Heading({title}){
    return (
       <div className='heading'>
            <h1>
                {title}
            </h1>
            <h3>
                TO-DO APP
            </h3>
       </div>
    )
}

function Button({text,onClick}){
    let color = 'gray';
    if(text === true){
        text = '\u2713';
        color = 'lightgreen';
    } else if(text === false){
        text = '\u2715';
        color = 'red';
    } else{
        text = '+';
    }
    return (
        <div className={"button "+color} onClick={onClick}>
            {text}
        </div>
    )
}

function Input({placeholder, addToDos, toDos}){
    let [toDo,setToDo] = useState('');
    let validate = ()=> {
        let flag = true;
        toDos.map((data) => {
            if(data.text === toDo){
                flag = false;
            }
            return null;
        })
        if(flag && toDo !== ''){
            addToDos(toDo);
            setToDo('');
        }
    }
    return (
        <div className='inputWrapper'>
            <input value = {toDo} onChange={(e) => setToDo(e.target.value)} placeholder={placeholder} className='input' />
            <Button text='+' onClick={validate}/>
        </div>
    )
}

function ListComponent({data,removeToDos, addCompletedOrUncompleted, changeStatus, serial}){
    return (
        <div className='listComponentWrapper'>
            <input onChange={()=> changeStatus(data.id)} checked={data.status} type="checkbox" className='inputCheckbox' />
            <label className='label'>{serial+". " + data.text}</label>
            <Button text={data.status} onClick={()=> {removeToDos(data.text); addCompletedOrUncompleted(data.status,data.text.toUpperCase()+' - '+new Date().toLocaleString())}}/>
        </div>
    )
}

function Time(){
    let [time,setTime] = useState(new Date());
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(new Date())
        },1000)
        return ()=>{
            clearInterval(timer);
        }
    },[])
    return (
        <h2 className='time'>
            {time.toLocaleString()}
        </h2>
    )
}

export {Heading, Input, ListComponent, Time};