import React from 'react';
import {render} from 'react-dom';

import {Header} from './include/header';
import {Footer} from './include/footer';
import {TodoForm} from './gorevEkle';
import {TodoList} from './gorevListele';
import {Login} from './login';

class TodoApp extends React.Component {

    constructor() {
        super();
        let myTasks = [

        ];
        let localTasks = localStorage.getItem('tasks');
        if (localTasks!==null){
            localTasks = JSON.parse(localTasks);
            myTasks = localTasks;
        }
        this.state = {
            userSession: TodoApp.getUserSessionData(),
            tasks: myTasks
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    /**
     * Kullanıcı login olduysa login bilgisini local storage'den getirir
     */
    static getUserSessionData(){
        let loginData = localStorage.getItem('login');
        loginData = JSON.parse(loginData);
        if (loginData!==null && loginData.login===true){
            return {userName:loginData.userName};
        } else {
            return false;
        }
    }

    /**
     * Kullanıcı login olmuş mu kontrol eder
     */
    static isLogged() {
        let loginData = localStorage.getItem('login');
        loginData = JSON.parse(loginData);
        if (loginData!==null && loginData.login===true){
            return true;
        }
        return false;
    }

    /**
     * Kullanıcı login yaparak local storage'e gerekli veriyi yazar
     */
    doLogin(userName){
        let loginData = {
            login:true,
            userName:userName};
        this.setState({
            userSession:{
                userName:loginData.userName,
            }});
        loginData = JSON.stringify(loginData);
        localStorage.setItem('login',loginData);
    }

    /**
     * Listeye yeni görev ekler
     */
    addTask(task) {
        let updatedList = this.state.tasks;
        updatedList.push({text: task, status: 'passive'});
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }


    /**
     * Eşleşen görevi listeden siler
     */
    removeTask(task_id) {
        let updatedList = this.state.tasks;
        updatedList.splice(task_id.replace('task_', ''), 1);
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }


    /**
     * Eşleşen görevin statüsünü (tamamlandı / yapılacak) günceller
     */
    doneTask(task_id) {
        let updatedList = this.state.tasks;
        let currentStatus = updatedList[task_id.replace('task_', '')].status;
        let newStatus = 'active';
        if (currentStatus === 'active') {
            newStatus = 'passive';
        }
        updatedList[task_id.replace('task_', '')].status = newStatus;
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }
    updateLocalStorage(updatedList){
        var updatedList = JSON.stringify(updatedList);
        localStorage.setItem('tasks',updatedList);
        return true;
    }
    render() {
        /**
         * Kullanıcı login oldu ise kendisine ait listeyi olmadı ise login ekranını göster
         */
        let layout = (<Login doLogin={this.doLogin} />);
        if (TodoApp.isLogged()===true) {
             layout = (
                <div>
                    <Header loginData={TodoApp.getUserSessionData}/>
                    <TodoForm addTask={this.addTask}/>

                </div>
            );
        }

        let layout2;
        let lTasks = localStorage.getItem('tasks');
        if(TodoApp.isLogged()===true && lTasks!==null)
        {
            layout2=(
                <div>
                    <TodoList myList={this.state.tasks} addTask={this.addTask} removeTask={this.removeTask}
                              doneTask={this.doneTask}/>
                              <Footer/>
                </div>
            )
        }

        return (
            <div>
                <div className="content">
                    {layout}{layout2}
                </div>
            </div>
        )
    }
}

render(<TodoApp/>, document.getElementById('appRoot'));
