import { useState } from 'react'
import {
    View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity , ActivityIndicator
} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const SignUp = (naviagation) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [nextview, setNextview] = useState(false)
    const [image, setImage] = useState(null)
    const [loading,setLoading] = useState(false)

    // loading spiner (last ka kam)
    if(loading){
        return  <ActivityIndicator size="large" color="#00ff00" />
    }

// Authenticatiuon 
    const userSignup = async ()=>{
        setLoading(true) // for loading
        if(!email || !password || !image|| !name){
               alert("please add all the field")
               return 
        }
        try{
          const result =  await auth().createUserWithEmailAndPassword(email,password)
            firestore().collection('users').doc(result.user.uid).set({
                name:name,
                email:result.user.email,
                uid:result.user.uid,
                pic:image,
                status:"online"
            })  
            setLoading(false) // for loading
        }catch(err){
            alert("something went wrong")
        }
    
    }
    // Auntuentication End 

    // gallery se image pic krne ke lye 
    const pickImage = () => {
        launchImageLibrary({
            options: 0.5
        }, (fileobj) => {
            // console.log(fileobj);
            const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.uri)
            // copy in firebase 
            uploadTask.on('state_changed',
                (snapshot) => {
    
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100) alert('image uploaded')
    
                },
                (error) => {
                    alert("error uploading image")
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImage(downloadURL)
                    });
                }
            );
        })
    }
   // gallery End 

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <KeyboardAvoidingView behavior='position'>

            {/* upper text  */}
            <View style={styles.box1}>
                <Text style={styles.text}>Welcome to whatsapp:5.0.0</Text>
                <Image style={styles.img} source={require('../assets/logo1.jfif')} />
            </View>

            {/* TextInput */}
            <View style={styles.box2}>
                {
                    !nextview &&
                    <>
                        <form onSubmit={handleSubmit}>

                            <TextInput
                                label='Email'
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                mode='outlined'
                                require
                            />
                            <TextInput
                                label='Password'
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                mode='outlined'
                                secureTextEntry
                            />
                            {
                                nextview ?
                                    <>
                                        <TextInput
                                            label='Name'
                                            value={name}
                                            onChangeText={(text) => setName(text)}
                                            mode='outlined'
                                            require
                                        />
                                        <Button mode='contained'
                                            onPress={() => pickImage()}>
                                            Select Profile Picture</Button>
                                        <Button mode='contained'
                                            disabled={image ? false : true}
                                            onPress={() =>userSignup()}>
                                            SignUp</Button>
                                    </>

                                    :
                                    <Button mode='contained'
                                        onPress={() => setNextview(true)}>
                                        Next</Button>
                            }
                            <TouchableOpacity onPress={() => naviagation.goBack("login")}>
                                <Text style={{ textAlign: 'center' }}>Already have Account?</Text>
                            </TouchableOpacity>
                        </form>
                    </>
                }
            </View>


        </KeyboardAvoidingView>
    )
}

export default SignUp


const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        color: 'green',
        margin: 10
    },
    img: {
        width: 200,
        height: 200
    },
    box1: {
        alignItems: 'center'
    },
    box2: {
        paddingHorizontal: 40,
        justifyContent: 'space-evenly',
        height: "50%"
    }
})