import { View,Text,StyleSheet } from "react-native";


export default function Timer({time}) {
    /*Con PadStart se le dice que si hay la cantidad de valores que quieras, que ponga un string al principcio */
    const formatedTime = `${Math.floor(time / 60).toString().padStart(2,"0")}:${(time % 60).toString().padStart(2,"0")}`
    return (
        <View style={style.container}>
            <Text style={style.time}>{formatedTime}</Text>
        </View>
        )
}

const style = StyleSheet.create({
    container:{
        flex:0.3,
        backgroundColor:"#F2F2F2",
        padding:15,
        justifyContent:"center",
        borderRadius:15,
    },
    time: {
        fontSize:80,
        fontWeight:"bold",
        textAlign:"center"
    }
})