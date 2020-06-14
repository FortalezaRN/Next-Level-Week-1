import React, { useEffect, useState } from 'react';
import { Feather as Icon  } from '@expo/vector-icons'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGRUFResponse{
  sigla: string
}

interface IBGRCityResponse{
  nome: string
}

const Home = () => {
  const navigation = useNavigation();
  const [selectedUf, setSelectedUf] = useState<string>("0");
  const [selectedCity, setSelectedCity] = useState<string>("0");
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  function handleNavigationToPoints() {
    navigation.navigate('Points', {
      city: selectedCity,
      uf: selectedUf
    });
  }

  useEffect(() =>{
    axios.get<IBGRUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then( response =>{
      const ufInitials = response.data.map(uf => uf.sigla)
      setUfs(ufInitials) 
    })
  }, [])

  useEffect(() => {
    axios.get<IBGRCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`).then( response =>{
      const cityNames = response.data.map(city => city.nome)
      setCities(cityNames)
    })
    
  }, [selectedUf])

  function handleSelectedUf(uf: string) {
    setSelectedUf(uf);
  }

  function handleSelectedCity(city: string) {
    setSelectedCity(city);
  }

  return (
    <ImageBackground 
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{
        width: 274,
        height: 368
      }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View style={styles.containerSelect}>
        <RNPickerSelect
          onValueChange={handleSelectedUf}
          style={pickerStyle}
          value={selectedUf}
          placeholder={{
            label: 'Selecione o estado',
            value: "0",
            color: "#A0A0B2"
          }}
          items={ufs.map(uf => {
            return { label: uf, value: uf }
          })}
          Icon={() => {
            return (
              <Icon 
                name="chevron-down"
                size={24}
                color="#A0A0B2"
                style={{position: "absolute", top: 16, right: 15}}
              />
            );
          }}
        />
      </View>

      <View style={styles.containerSelect}>
        <RNPickerSelect
          onValueChange={handleSelectedCity}
          style={pickerStyle}
          value={selectedCity}
          placeholder={{
            label: 'Selecione a cidade',
            value: "0",
            color: "#A0A0B2"
          }}
          items={cities.map(city => {
            return { label: city, value: city }
          })}
          Icon={() => {
            return (
              <Icon 
                name="chevron-down"
                size={24}
                color="#A0A0B2"
                style={{position: "absolute", top: 16, right: 15}}
              />
            );
          }}
        />
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigationToPoints}>
          <View style={styles.buttonIcon}>
             <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

const pickerStyle = {
  inputIOS: {},
  inputAndroid: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    color: '#A0A0B2'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  containerSelect: {
    height: 56,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 8
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;