function fill2DArrayWithRandomNumbers(array: number[][], rows: number, cols: number, min: number = 0, max: number = 100): void {
  for (let i = 0; i < rows; i++) {
    array[i] = [];
    for (let j = 0; j < cols; j++) {
      array[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}

function displayGrid(array: number[][], chosenPositions: { row: number, col: number }[]): void {
  for (let i = 0; i < array.length; i++) {
    let row = '';
    for (let j = 0; j < array[i].length; j++) {
      if (chosenPositions.some(pos => pos.row === i && pos.col === j)) {
        row += '❌';
      } else {
        row += '. ';
      }
    }
    console.log(row.trim());
  }
}

function getRandomBlob(rows: number, cols: number, size: number): { row: number, col: number }[] {
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 }
  ];
  
  const startRow = Math.floor(Math.random() * rows);
  const startCol = Math.floor(Math.random() * cols);
  const blob: { row: number, col: number }[] = [{ row: startRow, col: startCol }];
  const visited = new Set([`${startRow},${startCol}`]);

  while (blob.length < size) {
    const { row, col } = blob[Math.floor(Math.random() * blob.length)];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited.has(`${newRow},${newCol}`)) {
      blob.push({ row: newRow, col: newCol });
      visited.add(`${newRow},${newCol}`);
    }
  }

  return blob;
}

// Example usage:
const rows = 15;
const cols = 70;
const array: number[][] = [];
fill2DArrayWithRandomNumbers(array, rows, cols);

const blobSize = Math.round(Math.random() * 40);
const chosenPositions = getRandomBlob(rows, cols, blobSize);
console.log('Grid representation:');
displayGrid(array, chosenPositions); // Display grid with random blob of Xs