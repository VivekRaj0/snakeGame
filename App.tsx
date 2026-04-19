import { GestureHandlerRootView } from "react-native-gesture-handler";
import Game from "./src/component/Game";

const App = () => (
  // for gesture capture
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Game />
  </GestureHandlerRootView>
)

export default App;