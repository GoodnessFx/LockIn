import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import { ThemeProvider } from './src/hooks/ThemeProvider';
import { registerTasks } from './src/services/background/tasks';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useAppStore, hydrateAppStore } from './src/store/appStore';
import Onboarding from './src/screens/Onboarding';

export default function App() {
React.useEffect(() => {
registerTasks().catch(() => {});
}, []);

const [ready, setReady] = React.useState(false);
const hasOnboarded = useAppStore((s) => s.hasOnboarded);

React.useEffect(() => {
SplashScreen.preventAutoHideAsync().catch(() => {});
(async () => {
  await Font.loadAsync({ Inter: require('./assets/fonts/Inter-Regular.ttf') });
  await hydrateAppStore();
  setReady(true);
  SplashScreen.hideAsync().catch(() => {});
})();
}, []);

return (
<ThemeProvider>
<NavigationContainer theme={DefaultTheme}>
{ready && !hasOnboarded ? <Onboarding onDone={() => {}} /> : <RootStack />}
</NavigationContainer>
</ThemeProvider>
);
}
