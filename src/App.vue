<template>
<div class="container">
  <Header @toggle-add-task="toggleAddTask" 
          title="Task Tracker"
          :showAddTask="showAddTask"
  />
  <div v-show="showAddTask">
    <AddTask @add-task="addTask" />

  </div>

  <Tasks @delete-task="deleteTask" 
    @toggle-reminder="toggleReminder" :tasks="tasks" />
</div>
</template>

<script>
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
  },
  data() {
    return {
      tasks: [],
      tasls2: [],
      showAddTask: false
    }


  },
  methods: {
    toggleAddTask() {
      this.showAddTask=!this.showAddTask
    },
    addTask0(task) {
      console.log('addTask '+ task.text)
      this.tasks = [...this.tasks,task]
    },
    async addTask(task) {
      const res=await fetch('api/tasks',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
         
        },
        body: JSON.stringify(task),

      })
      const data=await res.json()
      this.tasks = [...this.tasks,data]
    },

    async deleteTask(id) {
      if(confirm('Are you sure?')) {
        const res = await fetch(`api/tasks/${id}`, { 
          method: 'DELETE',
        })
       
        res.status === 200 ?
          (this.tasks= this.tasks.filter((task)=>task.id!==id) ) 
          : alert('Error deleting task')
        
       /*
        if(res.status===200) {
          console.log('status is 200 id=' + id)
        }
        this.tasks.filter((task)=>task.id!==id)
        console.log(this.tasks)
        */
        //console.log(id)
        //this.tasks = this.tasks.filter((task)=>task.id!==id )
      }
    },
    async toggleReminder(id) {
      const taskToToggle=await this.fetchTask(id)
      const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}
      
      const res=await fetch(`api/tasks/${id}`,{
        method: 'PUT',
        headers: { 'Content-type': 'application/json', },
        body: JSON.stringify(updTask),
      })
      
    
      const data=await res.json()
      this.tasks=this.tasks.map((task)=> 
        task.id===id ? {...task,reminder: data.reminder}:task
      )

      /*
      this.tasks=this.tasks.map((task)=> 
      task.id===id ? {...task,reminder: !task.reminder}:task
      )
      */



    },
    async fetchTasks() {
      //const res=await fetch('http://localhost:5000/tasks')
      const res=await fetch('api/tasks')
      const data=await res.json();
      return data
    },
    async fetchTask(id) {
      //const res=await fetch(`http://localhost:5000/tasks/${id}`)
      const res=await fetch(`api/tasks/${id}`)
      const data=await res.json();
      return data
    }


  },
  async created() {
    this.tasks = await this.fetchTasks()
    this.tasks0= [
      {
        id:1,
        text: 'aaa',
        day: 'March 1st at 2:30pm',
        reminder: true
      },
      {
        id:2,
        text: 'bbb',
        day: 'March 2st at 3:30pm',
        reminder: false

      },
            {
        id:3,
        text: 'ccc',
        day: 'March 3st at 4:30pm',
        reminder: false

      }

    ]

    
  }
}
</script>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,200;1,300&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins',sans-serif; 
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: ipx solid steelblue;
  padding: 30px;
  border-radius: 5px;

}
.btn {
    display: inline-block;
    background: #000;
    color: #fff;
    border-radius: 5px;
    font-size: 15px;
    text-decoration: none;
}
</style>
