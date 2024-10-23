import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'; // Asegúrate de instalar esta biblioteca

import Servicios from './src/screens/Servicios';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Recuperar from './src/screens/Recuperar';
import Perfil from './src/screens/Perfil';
import Historial from './src/screens/Historial';
import Agendar from './src/screens/Agendar';
import EditarPerfil from './src/screens/Editar Perfil';
import QuienesSomos from './src/screens/Quienes Somos';
import AvisoPrivacidad from './src/screens/Aviso de Privacidad';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Servicios') {
            iconName = 'home';
          } else if (route.name === 'Historial') {
            iconName = 'history';
          } else if (route.name === 'Perfil') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Historial" component={Historial} />
      <Tab.Screen name="Home" component={Servicios} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
};

// Componente de menú desplegable
const HeaderMenu = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      anchor={
        <TouchableOpacity onPress={showMenu}>
          <Icon name="bars" size={25} color="#000" />
        </TouchableOpacity>
      }
      onRequestClose={hideMenu}
    >
      <MenuItem onPress={() => { hideMenu(); navigation.navigate('Quienes Somos'); }}>Quienes Somos</MenuItem>
      <MenuItem onPress={() => { hideMenu(); navigation.navigate('Aviso de Privacidad'); }}>Privacidad</MenuItem>
      <MenuDivider />
    </Menu>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Servicios">
        <Stack.Screen name="Servicios" component={Servicios} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Recuperar" component={Recuperar} />

        {/* Pantalla principal con barra de navegación personalizada */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={25} color="#000" />
              </TouchableOpacity>
            ),
            headerRight: () => <HeaderMenu navigation={navigation} />,
            headerTitle: 'Dental Crown',
          })}
        />

        <Stack.Screen name="Agendar" component={Agendar} />
        <Stack.Screen name="Editar Perfil" component={EditarPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
