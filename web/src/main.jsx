import ReactDOM from 'react-dom';
import App from './App';
import './scss/style.scss';
import { AppContextProvider } from './hooks';

ReactDOM.render(
	<AppContextProvider>
		<App />
	</AppContextProvider>,
	document.getElementById('root')
);
