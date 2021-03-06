import React ,{useState} from 'react'
import { View, Text , Image , StyleSheet ,
KeyboardAvoidingView ,
TouchableOpacity , ActivityIndicator  } from 'react-native'
import { TextInput , Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth'

// import { LoginButton, AccessToken } from 'react-native-fbsdk';


const Login = (naviagation) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

// for loading spinner 
if(loading){
    return  
    <ActivityIndicator size="large" color="#00ff00" />
}
// Authentication 
const userLogin = async ()=>{
    setLoading(true) //for loading
    if(!email || !password){
           alert("please add all the field")
           return 
    }
    try{
      const result =  await auth().signInWithEmailAndPassword(email,password)
        setLoading(false) //for loading
    }catch(err){
        alert("something went wrong")
    }
}
//    Authentication End 

// const handleSubmit = (e) => {
//     e.preventDefault()
// }

    return (
        <KeyboardAvoidingView behavior='position'>
        {/* upper text  */}
        <View style={styles.box1}>
        <Text style={styles.text}>Welcome to whatsapp:5.0.0</Text>
        <Image style={styles.img} source={require('../assets/logo.png')} />
        </View>

        {/* TextInput */}
        <View style={styles.box2 }>
       
        {/* <form onSubmit={handleSubmit}> */}

        <TextInput 
        label='Email'
        value={email}
        onChangeText={(text)=>setEmail(text)}
        mode='outlined'
        require
         />
        <TextInput 
        label='Password'
        value={password}
        onChangeText={(text)=>setPassword(text)}
        mode='outlined'
        secureTextEntry
         />
        <TouchableOpacity onPress={()=>naviagation.naviagate("signup")}>
         <Text style={{textAlign : 'center'}}>Dont have Account?</Text>
        </TouchableOpacity>

          <Button mode='contained'
         onPress={()=>userLogin()}>
         Login</Button>
        {/* </form> */}
        
{/* for lofin fb          */}
{/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}

         </View>


        </KeyboardAvoidingView>
    )
}

export default Login


const styles = StyleSheet.create({
   text:{
       fontSize:22,
       color:'green',
       margin:10
   },
   img:{
       width:200,
       height:200
   },
   box1:{
       alignItems:'center'
   },
   box2:{
       paddingHorizontal: 40,
       justifyContent: 'space-evenly',
       height: "50%"
   }
})
