import React, { useContext } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyle } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import {useEffect} from 'react';

interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({navigation} :Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);

  const {name,email,password,onChange} = useForm({
    name: '',
    email:'',
    password:''
  });

  useEffect(() => {
    if(errorMessage.length===0) return;
  
    Alert.alert('Registro incorrecto', errorMessage,[
      {text:'Ok', onPress: removeError}
    ]);
  }, [errorMessage]);
  

  const onRegister = () => {
    console.log({email,password,name});
    Keyboard.dismiss();
    signUp({
      nombre:name,
      password,
      correo: email
    })
  }

  return (
    <> 
      <KeyboardAvoidingView
      style={{
        flex:1,
        backgroundColor: '#5856D6'
      }}
      behavior={
        (Platform.OS==='ios') ? 'padding': 'height'
      }
      >
        <View style={loginStyle.formContainter}>

          <WhiteLogo/>
          <Text style={loginStyle.title}>Registrar Usuario</Text>
          <Text style={loginStyle.label}>Nombre:</Text>
          <TextInput 
          placeholder='Ingrese su nombre'
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid='white'
          style={[
            loginStyle.inputField,
            (Platform.OS === 'ios') && loginStyle.inputFieldIOS
          ]}
          selectionColor='white'

          //TODO: onchage, value
          onChangeText={(value) => onChange(value,'name')}
          onSubmitEditing={onRegister}
          value={name}

          autoCapitalize='words'
          autoCorrect={false}
          />
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
          onSubmitEditing={onRegister}
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
          onSubmitEditing={onRegister}
          value={password}
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          />
          {/* Boton login */}
          <View
          style={loginStyle.buttonContainer}>
            <TouchableOpacity style={loginStyle.button}
            onPress={onRegister}
            activeOpacity={0.8}>
              <Text style={loginStyle.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View> 
            <TouchableOpacity  
              onPress={()=> navigation.replace('LoginScreen')}
              activeOpacity={0.8}
              style={loginStyle.buttonLogin}
              >
                <Text style={loginStyle.buttonText}>Login</Text>
              </TouchableOpacity> 

        </View>
      </KeyboardAvoidingView>
    </>
  )
}
