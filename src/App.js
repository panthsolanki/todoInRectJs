import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import uuid from 'uuid';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
    // todos: [
    //   {
    //     id: uuid.v4(),
    //     title: 'Take out the trash',
    //     completed: false
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Meeting',
    //     completed: true
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Lunch',
    //     completed: false
    //   }
    // ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) })
  }

  // Delete Todo
  delTodo = (id) => {
    // axios.delete(`https://jsonplaceholder.typicode.com/${id}`)
    //   .then(res => this.setState({ todos: [...this.state.todos.filter (todo => todo.id !== id)] }) );
    this.setState({ todos: [...this.state.todos.filter (todo => todo.id !== id)] })
  }

  // Add Todo
  addTodo = (title) => {
    // axios.post('https://jsonplaceholder.typicode.com/todos', {
    //   title,
    //   completed: false
    // })
    // .then(res => this.setState({
    //   todos: [...this.state.todos, res.data]
    // }))
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={prop => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
