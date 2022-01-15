import { View, 
Text,
StatusBar,
StyleSheet } from 'react-native'
import Login from './source/Screen/Login'
import SignUp from './source/Screen/SignUp'
import Home from './source/Screen/Home'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// naviagation

const Stack = createStackNavigator();

const Naviagation = ()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="signup" component={SignUp} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};


const App = () => {
  return (
    <>
    <PaperProvider theme={theme}>
    <StatusBar barStyle='light-content' backgroundColor="green"/>
    <View style={styles.container}>
    <Naviagation />
    </View>
    </PaperProvider>
    </>
  )
}

export default App


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "white",
  }
})