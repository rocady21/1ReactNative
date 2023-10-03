import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button,ScrollView,SafeAreaView,Platform, TouchableOpacity } from 'react-native';
import Header from './src/components/Header';
import Timer from "./src/components/Timer"
const colors = ["#F7DC6F","#A2D9CE","#D7BDE2"]
import {Audio} from "expo-av"

export default function App() {

  /*Este state manejara el estado del reloj */
  const [isWorking,setisWorking] = useState(false)
  /*Este state manejara el tiempo en el que esta el reloj */
  const [time,setTime] = useState(25 * 60)
  /*Este state manejara en donde estamos en la aplicacion */
  const [currentTime,setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")
  const [isActive,setIsActive] = useState(false)


  useEffect(()=> {
    let interval = null

    if(isActive) {
      // Correr Timer
      interval = setInterval(()=> {
        setTime(time - 1)
      },1000)
    } else {
      // Clear Interval
      clearInterval(interval)
    }

    // cuando llegue a 0 lo paramos
    if(time === 0 ) {
      setIsActive(false)
    } 

    return ()=> clearInterval(interval)
  },[isActive,time])

  
  const HanldeStartStop = ()=> {
    playSound();
    setIsActive(!isActive)
  }
  
  const playSound = async()=> {
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/ui-click-97915.mp3")
    )
    await sound.playAsync()
  }
  
  return (
      <SafeAreaView style={[styles.container,{backgroundColor:colors[currentTime]}]} >
        <View style={[{marginTop: Platform.OS === "android" && 30,paddingHorizontal:20,flex:1}]}>
          <Text style={styles.title}>Pomodoro</Text>
          <Header currentTime={currentTime} setTime={setTime} setCurrentTime={setCurrentTime}/>
          <Timer time={time}/>
          <TouchableOpacity style={styles.button} onPress={HanldeStartStop}>
            <Text style={{color:"white",fontWeight:"bold",textAlign:'center',fontSize:20}}>
              {isActive === true ? "STOP" : "START"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,

  },
  title:{
    fontWeight:"bold",
    textAlign:"center",
    fontSize:30,

  },
  button: {
    backgroundColor:"#333333",
    marginTop:15,
    padding:15,
    borderRadius:20,
  }
});
