import React from 'react';

import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
const size = Dimensions.get('window').width * 0.29;
const elemSize = size * 0.7;

export default function Cell({setX, params}) {
   return (
      <TouchableOpacity
         onPress={() => {
            setX(params.item.x, params.item.y);
         }}>
         <View style={styles.cell}>
            {params.item.isO && <View style={styles.circle} />}
            {params.item.isX && (
               <View style={styles.cross}>
                  <View style={styles.leftLine} />
                  <View style={styles.rightLine} />
               </View>
            )}
         </View>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   cell: {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
   },
   circle: {
      width: elemSize,
      height: elemSize,
      borderRadius: elemSize / 2,
      borderColor: '#000',
      borderWidth: 4,
   },
   cross: {
      width: elemSize,
      height: elemSize,
      flexDirection: 'row',
   },
   leftLine: {
      height: '100%',
      width: 4,
      backgroundColor: '#000',
      transform: [{translateX: elemSize / 2 - 2}, {rotateZ: '45deg'}],
   },
   rightLine: {
      height: '100%',
      width: 4,
      backgroundColor: '#000',
      transform: [{translateX: elemSize / 2 - 6}, {rotateZ: '-45deg'}],
   },
});
