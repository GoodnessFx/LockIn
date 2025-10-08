import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import { ThemeProvider } from './src/hooks/ThemeProvider';
import { registerTasks } from './src/services/background/tasks';

export default function App() {
React.useEffect(() => {
registerTasks().catch(() => {});
}, []);

return (
<ThemeProvider>
<NavigationContainer>
<RootStack />
</NavigationContainer>
</ThemeProvider>
);
}
