import ReactDOM from 'react-dom';
import App from './App';
import './scss/style.scss';

import { UserProvider, PostProvider, ModalProvider } from './hooks';

ReactDOM.render(
	<UserProvider>
		<ModalProvider>
			<PostProvider>
				<App />
			</PostProvider>
		</ModalProvider>
	</UserProvider>,
	document.getElementById('root')
);
