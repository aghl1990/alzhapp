import React, { useContext, useEffect } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyle } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any,any>{}

export const LoginScreen = ({navigation} :Props) => {

  const {signIn,errorMessage, removeError} = useContext(AuthContext);

  const {email,password,onChange} = useForm({
    email:'',
    password:''
  });

  useEffect(() => {
    if(errorMessage.length ===0) return;
    Alert.alert('Login incorrecto',errorMessage,[{text:'Ok',onPress:removeError}]);
  }, [errorMessage])
  

  const onLogin = () => {
    console.log({email,password});
    signIn({correo:email,password});
    Keyboard.dismiss();
  }
  return (
    <>
      <Background/>
      <KeyboardAvoidingView
      style={{
        flex:1
      }}
      behavior={
        (Platform.OS==='ios') ? 'padding': 'height'
      }
      >
        <View style={loginStyle.formContainter}>

          <WhiteLogo/>
          <Text style={loginStyle.title}>Login</Text>
          <Text style={loginStyle.label}>Email:</Text>
          <TextInput 
          placeholder='Ingrese su email'
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType='email-address'
          underlineColorAndroid='white'
          style={[
            loginStyle.inputField,
            (Platform.OS === 'ios') && loginStyle.inputFieldIOS
          ]}
          selectionColor='white'

          //TODO: onchage, value
          onChangeText={(value) => onChange(value,'email')}
          onSubmitEditing={onLogin}
          value={email}

          autoCapitalize='none'
          autoCorrect={false}
          />
          <Text style={loginStyle.label}>Password:</Text>
          <TextInput 
          placeholder='******'
          placeholderTextColor="rgba(255,255,255,0.4)" 
          underlineColorAndroid='white'
          style={[
            loginStyle.inputField,
            (Platform.OS === 'ios') && loginStyle.inputFieldIOS
          ]}
          selectionColor='white'

          //TODO: onchage, value
          onChangeText={(value) => onChange(value,'password')}
          onSubmitEditing={onLogin}
          value={password}
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          />
          {/* Boton login */}
          <View
          style={loginStyle.buttonContainer}>
            <TouchableOpacity style={loginStyle.button}
            onPress={onLogin}
            activeOpacity={0.8}>
              <Text style={loginStyle.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={loginStyle.newUserContainer}>
            <TouchableOpacity  
            onPress={()=> navigation.replace('RegisterScreen')}
              activeOpacity={0.8}>
                <Text style={loginStyle.buttonText}>Nueva cuenta</Text>
              </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </>
  )
}
