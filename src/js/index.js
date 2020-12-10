import ReactDOM from 'react-dom';
import App from './App';
import storageChangeListener from './storageChangeListener';
import '../style.css';
// import 'fontsource-roboto/300.css';
// import 'fontsource-roboto/400.css';
// import 'fontsource-roboto/500.css';
// import 'fontsource-roboto/700.css';

storageChangeListener();

ReactDOM.render(<App />, document.getElementById('root'));
