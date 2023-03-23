import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CalculatorApp from './src/CalculatorApp';

StatusBar.setBarStyle("light-content");

export default function App() {
  return (
    <SafeAreaProvider>
      <CalculatorApp/>
    </SafeAreaProvider>
  );
}