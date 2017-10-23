import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MenuPage from './components/MenuPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MenuPage />, document.getElementById('root'));
registerServiceWorker();
