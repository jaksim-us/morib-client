import { Provider } from 'jotai';

import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/shared/apis/queryClient';

import router from './router/Router';
import GlobalErrorBoundary from './shared/components/ErrorBoundary/GlobalErrorBoundary';

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div style={{ fontSize: '16px' }}>
				<ReactQueryDevtools initialIsOpen={false} />
			</div>
			<Provider>
				<GlobalErrorBoundary>
					<RouterProvider router={router} />
				</GlobalErrorBoundary>
			</Provider>
		</QueryClientProvider>
	);
};

export default App;
