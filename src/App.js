import React, { Component } from 'react';
import './App.css';

const sortByPower = (a, b) => {
  return b.power - a.power;
}

class App extends Component {
  constructor() {
    super();
    console.log("Constructor");
    this.state = {
      human: [
        {
          name: 'Kuririn',
          thumbnail: 'https://upload.wikimedia.org/wikipedia/pt/6/63/Kuririn_42311.png',
          power: 10
        },
        {
          name: 'Bulma',
          thumbnail: 'https://upload.wikimedia.org/hu/1/1c/Bulma.png',
          power: 3
        },
        {
          name: 'Chi-chi',
          thumbnail: 'https://upload.wikimedia.org',
          power: 30
        }
      ],
      users: [],
      searchField: ''
    }
  }

  async componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(json => this.setState({ users: json }))

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await response.json();
    this.setState({ users: json })
  }

  handlerChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  render() {
    // console.log(this.state.searchField);
    const { searchField, users } = this.state
    const filterUser = users.filter(user => user.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <>
        <h1>React People</h1>
        <List data={filterUser} handlerChange={this.handlerChange} />
      </>
    )
  }
}

const List = ({ data, handlerChange }) => {
  return (

    <>
      <input type='search' placeholder='Cari data user' onChange={handlerChange} />
      <ul className='list'>
        {
          data.sort(sortByPower).map(({ id, name, email }) => {
            return <li key={name} className='list-item'>
              <div className="list-item-image-container">
                <img src={`https://robohash.org/${id}?set=set1`} />
              </div>
              <span className="list-item-name">
                {name} ( Power:{' '}
                <span className="list-item-power">{email}</span> )
            </span>
            </li>
          })
        }
      </ul>
    </>
  );
}

export default App;
