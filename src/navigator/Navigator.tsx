import React, { useContext } from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { PatientScreen } from '../screens/PatientScreen';
import { PatientsListScreen } from '../screens/PatientsListScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { ExaminationHistoryScreen } from '../screens/MMSE/ExaminationHistoryScreen';
import { ExaminationResultScreen } from '../screens/MMSE/ExaminationResultScreen';
import { ExaminationTestScreen } from '../screens/MMSE/ExaminationTestScreen';
import { AuthContext } from '../context/AuthContext';
import { LoadinScreen } from '../screens/LoadinScreen';

const Stack = createStackNavigator();

 export const Navigator = () => {

  const {status} = useContext(AuthContext);

  if(status === 'checking') return <LoadinScreen/>;

   return (
        <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{
            headerShown: false,
            cardStyle:{
            backgroundColor: 'white'
          }
        }}
        >
          {
            (status === 'authenticated')?
            (
              <>
                <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="PatientScreen" component={PatientScreen} />
                <Stack.Screen name="PatientsListScreen" component={PatientsListScreen} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
                <Stack.Screen name="ExaminationHistoryScreen" component={ExaminationHistoryScreen} />
                <Stack.Screen name="ExaminationResultScreen" component={ExaminationResultScreen} />
                <Stack.Screen name="ExaminationTestScreen" component={ExaminationTestScreen} /> 
              </>
            ):
            (
              <>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              </>
            )
          }

        </Stack.Navigator>
   )
 }
 