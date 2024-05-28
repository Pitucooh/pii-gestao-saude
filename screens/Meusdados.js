import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const { brand, darkLight, backgroundGreen, customGreen, primary, greenForm, roxinho } = Colors;

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    WelcomeContainer,
} from './../components/styles';

const Meusdados = ({ navigation }) => {

    const handleIMCButtonPress = () => {
        navigation.navigate('AtualizarImc');
    };

    const handlePressaoButtonPress = () => {
        navigation.navigate('AtualizarPressao');
    };

    const handleGlicemiaButtonPress = () => {
        navigation.navigate('AtualizarGlicemia');
    };

    return (
        <InnerContainer style={{backgroundColor: backgroundGreen}}>
        <WelcomeContainer>
                    
                    <PageTitle welcome={true} style={{flexWrap: 'wrap', lineHeight: 30, color:customGreen, 
                         fontSize: 30, marginTop: 30}}>MEUS DADOS</PageTitle>
                    <Text style={{color: roxinho, alignItems: 'center', marginBottom: 20}}>{'Salve aqui os seus dados para maior facilidade'} </Text>
                    
                    <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileTitle}>Perfil</Text>
                        <Text style={styles.profileText}>Nome: Fulno da Silva</Text>
                        <Text style={styles.profileText}>Idade: 30 anos</Text>
                        <Text style={styles.profileText}>Email: fulano.silva@gmail.com</Text>
                    </View>

                    
                    <View style={styles.metricsGrid}>
                        <View style={styles.metricItem}>
                        <TouchableOpacity style={styles.metricButton} onPress={handleIMCButtonPress}>
                            <Text style={styles.buttonText}>IMC</Text> 
                            <Text style={styles.metricInfo}>22.5</Text>
                        </TouchableOpacity>
                        
                        </View>
                        
                        <View style={styles.metricItem}>
                        <TouchableOpacity style={styles.metricButton} onPress={handlePressaoButtonPress}>
                            <Text style={styles.buttonText}>Pressão Arterial</Text>
                            <Text style={styles.metricInfo}>120/80</Text>
                        </TouchableOpacity>
                       
                        </View>
                        
                        <View style={styles.metricItem}>
                        <TouchableOpacity style={styles.metricButton} onPress={handleGlicemiaButtonPress}>
                            <Text style={styles.buttonText}>Glicemia</Text>
                            <Text style={styles.metricInfo}>90 mg/dL</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                </WelcomeContainer>
     </InnerContainer>
        
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        backgroundColor: greenForm,
        borderRadius: 20,
        borderWidth: 5, 
        borderColor: customGreen
      },
      profileContainer: {
        marginBottom: 30,
        padding: 20,
        width: '100%',
        backgroundColor: greenForm,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        
      },
      profileTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: backgroundGreen
      },
      profileText: {
        fontSize: 18,
        color: backgroundGreen,
        marginBottom: 5,
      },
      metricsGrid: {
        width: '100%',
        justifyContent: 'space-between', 
        flex: 1,
      },
      metricItem: {
        alignItems: 'center',
        marginVertical: 10,
      },
      metricButton: {
        width: 200,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:roxinho,
        borderRadius: 10,
        
      },
     
      buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
      },
    });
export default Meusdados;
