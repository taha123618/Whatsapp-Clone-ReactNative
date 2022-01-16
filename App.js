import {useEffect , useState} from 'react'
import { View, 
Text,
StatusBar,
StyleSheet } from 'react-native'
import Login from './source/Screen/Login'
import SignUp from './source/Screen/SignUp'
import Home from './source/Screen/Home'
import Chat from './source/Screen/Chat'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'
import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons'

// naviagation

const Stack = createStackNavigator();

const Naviagation = ()=> {
  const [user,setUser ] = useState()
 /*/ compontent mounth hone ke bad sirf  1 he bar chale 
  take listner ko register krwao 1 bar /*/
  useEffect(() => {
  const unregister = auth().onAuthStateChanged(userExist=>{
      if(userExist) setUser('userExist')
      else setUser('')
    })
    // Run on app exit 
    return()=>{
      unregister()
    }

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerTintColor:'green'
      }}>

      {
        user?
        <>
        <Stack.Screen name="home" component={Home} 
          options={{
            headerRight:()=><MaterialIcons
            name='account-circle'
            color='green'
            style={{marginRight:10}}
            onPress={()=>auth().signOut()}
             />,
             title:"WhatsApp"
          }}
        >
          {/* use over coustom props  */}
          {props => <Home {...props} user={user} />}
        </Stack.Screen> 
        <Stack.Screen name="chat" 
        options={({ route }) => ({ title : route.params.name})} 
        >
        {props => <Chat {...props} user={user} />}
        </Stack.Screen>
        </>
        :
        <>
        <Stack.Screen name="login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="signup" component={SignUp} options={{headerShown:false}} />
        </>
      }
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