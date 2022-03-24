import { createContext, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';
import React from 'react';
import alzAPI from '../api/alzAPI';
import {useEffect} from 'react';
import alzAPIH from '../api/alzAPIH';

type AuthContextProps ={
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (obj: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState={
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}:any)=>
{

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, [])
    
    const checkToken = async()=>{
        const token = AsyncStorage.getItem('token');
        if (!token) return dispatch({type:'notAuthenticated'});

        try {
            const resp = await alzAPIH.get('/auth'); //para validar y renovar tokens
            console.log(resp.data);
            if(resp.status !== 200){
                return dispatch({type:'notAuthenticated'});
            }
            await AsyncStorage.setItem('token', resp.data.token);//para renovar el token del auth
    
            dispatch({
                type: 'signUp',
                payload:{
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            });
        } catch (error) {
            return dispatch({type:'notAuthenticated'});
            console.log({error});
        }


        // AsyncStorage.getItem('token').then(
        //     token => {
        //         console.log({token})
        //     }
        // ).catch(
        //     err=>{
        //         console.log({err})
        //     }
        // );
    }

    const signIn = async({correo, password}: LoginData) => {

        try {
            const {data} = await alzAPI.post<LoginResponse>('/auth/login',{correo, password});
            dispatch({
                type: 'signUp',
                payload:{
                    token: data.token,
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('token',data.token);

        } catch (error:any) {
            console.log(error.response.data.msg);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            });
        }

    };

    const signUp = async({correo, password, nombre}: RegisterData) => {

        try {
            const {data} = await alzAPI.post<LoginResponse>('/usuarios',{correo, password, nombre});
            dispatch({
                type: 'signUp',
                payload:{
                    token: data.token,
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('token',data.token);

        } 
        //catch (error:any) {
        //     console.log(error);
        //     dispatch({
        //         type: 'addError',
        //         // payload: error.response.data[0].errors.msg || 'Información incorrecta'
        //         payload: error || 'Información incorrecta'
        //     });
        // }
        catch (error:any) {
            console.log(error.response.data.msg);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            });
        }
    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'logout'
        });
    };
    const removeError = () => {
        dispatch({
            type: 'removeError'
        });
    };


    return (
        <AuthContext.Provider value = {{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}>
               {children}
        </AuthContext.Provider>
    )
}
