import UserProvider from './useUser';
import PostProvider from './usePost';
import ModalProvider from './useModal';
import {} from 'react';

const AppContext = (...components) => {
	return components.reduce(
		(AccumulatedComponents, CurrentComponent) => {
			return ({ children }) => {
				return (
					<AccumulatedComponents>
						<CurrentComponent>{children}</CurrentComponent>
					</AccumulatedComponents>
				);
			};
		},
		({ children }) => <>{children}</>
	);
};

const providers = [UserProvider, ModalProvider, PostProvider];
const AppContextProvider = AppContext(...providers);

export default AppContextProvider;
