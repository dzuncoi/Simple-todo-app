/*
* @author: dzuncoi
* @date: April 1 2017
*/

global.__parseJSON = (response) => {
  return response.json();
}

import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('main'))
