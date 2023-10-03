import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View,TouchableOpacity,StyleSheet } from 'react-native';


const options = ["Pomodoro","Short Break","Long Break"]

export default function Header({currentTime,setTime,setCurrentTime}) {

    const handlePress = (index)=> {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
        setTime(newTime * 60)
        setCurrentTime(index)
    }
    
  return (
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
            {
                options.map((item,index)=> {
                    return <TouchableOpacity onPress={()=> handlePress(index)} style={[style.itemHeader,currentTime !== index && {borderColor:"transparent"}]} key={index}>
                        <Text style={{textAlign:"center"}}>{item}</Text>
                    </TouchableOpacity>
                })
            }
        </View>
  );
}

const style = StyleSheet.create({
    itemHeader:{
        borderWidth:3,
        padding:5,
        width:"33%",
        borderRadius:10,
        marginVertical:20,
        borderColor:"white"
    }
})

