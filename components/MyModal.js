import React from 'react';

import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function MyModal({winer, restart}) {
   const {background, modal, textStyle, btn} = styles;

   return (
      <Modal transparent>
         <View style={background}>
            <View style={modal}>
               <Text style={textStyle}>Winer's {winer}</Text>
               <TouchableOpacity onPress={restart}>
                  <Text style={btn}>restart</Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
}

const styles = StyleSheet.create({
   background: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   modal: {
      backgroundColor: '#fff',
      paddingHorizontal: 40,
      paddingVertical: 20,
      borderRadius: 5,
      alignItems: 'center',
   },
   textStyle: {
      fontSize: 26,
      marginBottom: 10,
   },
   btn: {
      color: 'blue',
      fontSize: 20,
   },
});
