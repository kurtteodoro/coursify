import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/store/configureStore';
import AppBar from './src/Components/AppBar/AppBar';

import Home from "./src/Screens/Home/Home";
import Post from "./src/Screens/Post/Post";

const Stack = createNativeStackNavigator();
function App() {
    return (
        <Provider store={store}>

            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        header: (props) => <AppBar {...props} />,
                    }}
                >
            
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Post" component={Post} />

                </Stack.Navigator>
            </NavigationContainer>

        </Provider>
    );
}

export default App;