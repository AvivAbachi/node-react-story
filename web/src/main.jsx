import ReactDOM from 'react-dom';
import App from './App';
import './scss/style.scss';
import { AppContextProvider } from './hooks';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
	<AppContextProvider>
		<App />
	</AppContextProvider>
);
