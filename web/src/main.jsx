import ReactDOM from 'react-dom';
import App from './App';
import './scss/style.scss';
import { AppContextProvider } from './hooks';

ReactDOM.render(
	// <UserProvider>
	// 	<ModalProvider>
	// 		<PostProvider>
	<AppContextProvider>
		<App />
	</AppContextProvider>,
	// 		</PostProvider>
	// 	</ModalProvider>
	// </UserProvider>
	document.getElementById('root')
);
