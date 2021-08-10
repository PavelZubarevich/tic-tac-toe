const cells = {
   midle: {x: 1, y: 1},
   angles: [
      {x: 0, y: 0},
      {x: 2, y: 0},
      {x: 0, y: 2},
      {x: 2, y: 2},
   ],
   midCross: [
      {x: 1, y: 0},
      {x: 0, y: 1},
      {x: 2, y: 1},
      {x: 1, y: 2},
   ],
};

export function bot(matrix) {
   let coords = {x: null, y: null};

   const {winX, winO, oneToWinX, oneToWinO, startCombO, startCombX} = checkMatrix(matrix);

   if (!winX && !winO) {
      if (oneToWinX.length) {
         const winWay = oneToWinX[getRandomNumber(oneToWinX.length)];
         winWay.forEach(elem => {
            if (!matrix[elem.y][elem.x].isO && !matrix[elem.y][elem.x].isX) {
               coords.x = elem.x;
               coords.y = elem.y;
            }
         });
      }

      if (oneToWinO.length) {
         const defWay = oneToWinO[getRandomNumber(oneToWinO.length)];
         defWay.forEach(elem => {
            if (!matrix[elem.y][elem.x].isO && !matrix[elem.y][elem.x].isX) {
               (coords.x = elem.x), (coords.y = elem.y);
            }
         });
      }

      if (!oneToWinO.length && !oneToWinX.length) {
         if (startCombX.length && ((startCombO.length && Math.random() < 0.35) || !startCombO.length)) {
            let flag = true;

            if (startCombX.length === 3 && !startCombO.length && Math.random() < 0.65) {
               coords.x = 1;
               coords.y = 1;
               flag = false;
            }

            if (startCombX.length === 4 && !startCombO.length && Math.random() < 0.7) {
               coords = cells.angles[getRandomNumber(cells.angles.length)];
               flag = false;
            }

            if (flag) {
               const {x, y} = getRandomCell(matrix, startCombX);
               coords.x = x;
               coords.y = y;
            }
         } else if (startCombO.length) {
            const {x, y} = getRandomCell(matrix, startCombX);
            coords.x = x;
            coords.y = y;
         }
      }
   }

   return coords;
}

function getRandomCell(matrix, array) {
   let result = {};
   let flag = true;
   const winWay = array[getRandomNumber(array.length)];

   winWay.forEach(elem => {
      if (!matrix[elem.y][elem.x].isO && !matrix[elem.y][elem.x].isX) {
         for (let i = 0; i < 4; i++) {
            if (JSON.stringify(elem) === JSON.stringify(cells.angles[i]) && Math.random() < 0.5 && flag) {
               result.x = elem.x;
               result.y = elem.y;
               flag = false;
            }
         }

         if (flag && Math.random() < 0.5) {
            result.x = elem.x;
            result.y = elem.y;
            flag = false;
         }

         if (flag) {
            result.x = elem.x;
            result.y = elem.y;
         }
      }
   });

   return result;
}

function getRandomNumber(max) {
   const random = Math.random();
   random === 1 ? random - 0.01 : random;
   return Math.floor(random * max);
}

export function firstTurn() {
   let index = getRandomNumber(11);
   index <= 4 ? (index = 1) : index;
   index > 4 && index <= 9 ? (index = 2) : index;
   index > 9 && index <= 20 ? (index = 3) : index;

   if (index === 1) {
      return cells.midle;
   } else if (index === 2) {
      return cells.angles[getRandomNumber(4)];
   } else if (index === 3) {
      return cells.midCross[getRandomNumber(4)];
   }
}

export function winCheck(matrix) {
   let {winX, winO} = checkMatrix(matrix);
   return {winX, winO};
}

function checkMatrix(matrix) {
   const combinations = [
      [
         {x: 0, y: 0},
         {x: 1, y: 0},
         {x: 2, y: 0},
      ],
      [
         {x: 0, y: 1},
         {x: 1, y: 1},
         {x: 2, y: 1},
      ],
      [
         {x: 0, y: 2},
         {x: 1, y: 2},
         {x: 2, y: 2},
      ],
      [
         {x: 0, y: 0},
         {x: 0, y: 1},
         {x: 0, y: 2},
      ],
      [
         {x: 1, y: 0},
         {x: 1, y: 1},
         {x: 1, y: 2},
      ],
      [
         {x: 2, y: 0},
         {x: 2, y: 1},
         {x: 2, y: 2},
      ],
      [
         {x: 0, y: 0},
         {x: 1, y: 1},
         {x: 2, y: 2},
      ],
      [
         {x: 2, y: 0},
         {x: 1, y: 1},
         {x: 0, y: 2},
      ],
   ];
   const result = {oneToWinX: [], oneToWinO: [], winX: false, winO: false, startCombX: [], startCombO: []};

   combinations.forEach(elem => {
      let stepsToWinO = 3;
      let stepsToWinX = 3;

      elem.forEach(item => {
         if (matrix[item.y][item.x].isO) {
            stepsToWinO--;
            stepsToWinX = 9;
         }
         if (matrix[item.y][item.x].isX) {
            stepsToWinX--;
            stepsToWinO = 9;
         }
      });

      if (stepsToWinX === 0) result.winX = true;

      if (stepsToWinO === 0) result.winO = true;

      if (stepsToWinX === 2) result.startCombX.push(elem);

      if (stepsToWinO === 2) result.startCombO.push(elem);

      if (stepsToWinX === 1) result.oneToWinX.push(elem);

      if (stepsToWinO === 1) result.oneToWinO.push(elem);
   });

   return result;
}
