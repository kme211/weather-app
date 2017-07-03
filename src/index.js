import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import getLocation from "./components/services/getLocation";
import './index.css';

ReactDOM.render(<App getLocation={getLocation} />, document.getElementById('root'));
registerServiceWorker();
