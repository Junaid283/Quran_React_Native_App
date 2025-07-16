import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/login";
import Signup from "./src/signup";
import Flatlist from "./src/Home";
import Ayahs from "./src/Ayahs_Details";
import ScreenList from "./src/screenList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false
        })}
      >
        <Stack.Screen
          name="Login_Screen"
          component={Login}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
        />
        <Stack.Screen
          name="FlatList"
          component={Flatlist}
        />
         <Stack.Screen
          name="Ayahs_Details"
          component={Ayahs}
        />
        <Stack.Screen
          name="Screen_Lists"
          component={ScreenList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

