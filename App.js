import React, {useEffect, useState} from 'react';

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Cell from './components/Cell';
import MyModal from './components/MyModal';
import {bot, firstTurn, winCheck} from './core/core';

const validSells = [0, 1, 2];
export default function App() {
   const [matrix, setMatrix] = useState([
      [
         {x: 0, y: 0, isO: false, isX: false},
         {x: 1, y: 0, isO: false, isX: false},
         {x: 2, y: 0, isO: false, isX: false},
      ],
      [
         {x: 0, y: 1, isO: false, isX: false},
         {x: 1, y: 1, isO: false, isX: false},
         {x: 2, y: 1, isO: false, isX: false},
      ],
      [
         {x: 0, y: 2, isO: false, isX: false},
         {x: 1, y: 2, isO: false, isX: false},
         {x: 2, y: 2, isO: false, isX: false},
      ],
   ]);
   const [yourTurn, setTurn] = useState(false);
   const [gameOver, setGameOver] = useState({gameOver: false, winer: null});
   const [restartFlag, setRestartFlag] = useState(false);

   useEffect(() => {
      selectFirst();
   }, []);

   useEffect(() => {
      const {winX, winO} = winCheck(matrix);

      winX && setGameOver({gameOver: true, winer: 'x'});
      winO && setGameOver({gameOver: true, winer: 'o'});
   }, [matrix]);

   useEffect(() => {
      selectFirst();
   }, [restartFlag]);

   const selectFirst = () => {
      if (Math.random() <= 0.5) {
         const {x, y} = firstTurn();
         setO(x, y);
      }
      setTurn(true);
   };

   const setX = (x, y) => {
      const newMatrix = matrix;
      if (!newMatrix[y][x].isO && !newMatrix[y][x].isX && yourTurn) {
         newMatrix[y][x].isX = true;
         setTurn(false);
         setTimeout(() => {
            const {x, y} = bot(newMatrix);
            if (validSells.includes(x) && validSells.includes(y)) setO(x, y);
            setTurn(true);
         }, 800);
      }
      setMatrix(() => {
         return [...newMatrix];
      });
   };

   const setO = (x, y) => {
      const newMatrix = matrix;
      if (!newMatrix[y][x].isO && !newMatrix[y][x].isX) {
         newMatrix[y][x].isO = true;
      }

      setMatrix(() => {
         return [...newMatrix];
      });
   };

   const restart = () => {
      setMatrix([
         [
            {x: 0, y: 0, isO: false, isX: false},
            {x: 1, y: 0, isO: false, isX: false},
            {x: 2, y: 0, isO: false, isX: false},
         ],
         [
            {x: 0, y: 1, isO: false, isX: false},
            {x: 1, y: 1, isO: false, isX: false},
            {x: 2, y: 1, isO: false, isX: false},
         ],
         [
            {x: 0, y: 2, isO: false, isX: false},
            {x: 1, y: 2, isO: false, isX: false},
            {x: 2, y: 2, isO: false, isX: false},
         ],
      ]);
      setGameOver({gameOver: false});
      setRestartFlag(!restartFlag);
   };

   const {main, field, title, titleText, btn} = styles;

   const renderRow = ({item}) => {
      return (
         <View>
            <FlatList
               data={item}
               keyExtractor={item => item.x}
               renderItem={item => <Cell setX={setX} params={item} />}
               horizontal
               ItemSeparatorComponent={() => <View style={{borderRightColor: '#000', borderRightWidth: 1}} />}
            />
         </View>
      );
   };

   return (
      <View style={main}>
         <View style={title}>
            <Text style={titleText}>{yourTurn ? 'your' : 'bots (delay 800ms)'} turn</Text>
         </View>

         <View style={field}>
            <FlatList
               data={matrix}
               keyExtractor={item => String(item[0].y)}
               renderItem={renderRow}
               ItemSeparatorComponent={() => <View style={{borderBottomColor: '#000', borderBottomWidth: 1}} />}
            />
         </View>

         <TouchableOpacity onPress={restart}>
            <Text style={btn}>RESTART</Text>
         </TouchableOpacity>
         {gameOver.gameOver && <MyModal winer={gameOver.winer} restart={restart} />}
      </View>
   );
}

const styles = StyleSheet.create({
   main: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
   },
   field: {
      width: '90%',
      marginBottom: 100,
   },
   title: {
      position: 'absolute',
      transform: [{translateY: -300}],
   },
   titleText: {
      fontSize: 20,
   },
   btn: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'blue',
   },
});
