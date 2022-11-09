import ReactDOM from 'react-dom';
import App from './App';
import './scss/style.scss';

const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);
// root.render(<React.StrictMode children={<App />} />);

ReactDOM.render(<React.StrictMode children={<App />} />, container);
