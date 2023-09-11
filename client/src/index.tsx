/* @refresh reload */
import {render} from 'solid-js/web';

import './index.css';

import App from './App';
import {storage} from './storage';

render(() => <>{storage.date && <App />}</>, document.querySelector('#root')!);
