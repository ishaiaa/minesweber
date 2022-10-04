import CellData from "./CellData";

class GameManager {
    static generateBoard(size) {
        var grid = [];
        var iterator = 0;
    
        for(let y = 0; y < size; y++) {
            var tempRow = [];
        
            for(let x = 0; x < size; x++) {
                let tempCell = new CellData(iterator, 0, false, false, false);
                console.log(tempCell)
                tempRow.push(tempCell)
                iterator++;
            }
        
            grid.push(tempRow);
        }
    
        return grid;
    }

    static cellReveal(id, listSetter) {
        listSetter(prevState => {
            let size = prevState.length;
            let row = Math.floor(id/size);
            let col = id%size;

            let list = prevState;
            list[row][col].setRevealed(true);

            return [...list]
        })
    }

    static flagCell(id, grid) {
        let size = grid.length;
        let row = Math.floor(id/size);
        let col = id%size;

        let tempGrid = grid;

        if(!tempGrid[row][col].isRevealed) tempGrid[row][col].toggleFlag()

        return tempGrid
    }

    static plantBombs(number, grid) {
        let tempGrid = grid

        let size = tempGrid.length;
        let pow = size * size;
        let ids = [...Array(pow).keys()]
        console.log(ids)
        console.log(ids.length)

        for(let i = 0; i < number; i++) {
            let index = Math.floor(Math.random() * ids.length);
            let id = ids[index]
            ids.splice(ids.indexOf(id), 1);


            let row = Math.floor(id/size);
            let col = id%size;

            console.log(index)
            console.log(row)
            console.log(col)


            tempGrid[row][col].isBomb = true;
            tempGrid = this.updateValues(id, tempGrid);
        }

        return tempGrid
    }

    static updateValues(id, grid) {
        let tempGrid = grid

        let size = tempGrid.length;
        let row = Math.floor(id/size);
        let col = id%size;

        try {if(!tempGrid[row-1][col-1].isBomb)     tempGrid[row-1][col-1].value++; } catch {}
        try {if(!tempGrid[row-1][col].isBomb)       tempGrid[row-1][col].value++; } catch {}
        try {if(!tempGrid[row-1][col+1].isBomb)     tempGrid[row-1][col+1].value++; } catch {}
        try {if(!tempGrid[row][col-1].isBomb)       tempGrid[row][col-1].value++; } catch {}
        try {if(!tempGrid[row][col].isBomb)         tempGrid[row][col].value++; } catch {}
        try {if(!tempGrid[row][col+1].isBomb)       tempGrid[row][col+1].value++; } catch {}
        try {if(!tempGrid[row+1][col-1].isBomb)     tempGrid[row+1][col-1].value++; } catch {}
        try {if(!tempGrid[row+1][col].isBomb)       tempGrid[row+1][col].value++; } catch {}
        try {if(!tempGrid[row+1][col+1].isBomb)     tempGrid[row+1][col+1].value++; } catch {}

        return tempGrid
    }

    static revealAll(id, grid) {
        let size = grid.length;
        let row = Math.floor(id/size);
        let col = id%size;
        return this.recurcsiveReveal(row, col, grid)

    }

    static recurcsiveReveal(row, col, grid) {
        var tempGrid = grid;

        try {let test = tempGrid[row][col].isRevealed} catch {return tempGrid}
        if(tempGrid[row][col].isRevealed) {
            return tempGrid
        }

        if(tempGrid[row][col].isFlagged) {
            return tempGrid
        }

        if(tempGrid[row][col].isBomb) {
            tempGrid[row][col].setRevealed(true);
            return tempGrid
        }

        if(tempGrid[row][col].value > 0) {
            tempGrid[row][col].setRevealed(true)
            return tempGrid
        }

        if(tempGrid[row][col].value === 0) {
            tempGrid[row][col].setRevealed(true)

            tempGrid = this.recurcsiveReveal(row-1, col-1, tempGrid)
            tempGrid = this.recurcsiveReveal(row-1, col, tempGrid)
            tempGrid = this.recurcsiveReveal(row-1, col+1, tempGrid)
            tempGrid = this.recurcsiveReveal(row, col-1, tempGrid)
            tempGrid = this.recurcsiveReveal(row, col, tempGrid)
            tempGrid = this.recurcsiveReveal(row, col+1, tempGrid)
            tempGrid = this.recurcsiveReveal(row+1, col-1, tempGrid)
            tempGrid = this.recurcsiveReveal(row+1, col, tempGrid)
            tempGrid = this.recurcsiveReveal(row+1, col+1, tempGrid) 
        }
        return tempGrid
    }
    

    static generateGameGrid(size, bombs){
        let grid = this.plantBombs(bombs, this.generateBoard(size))
        return grid
    }
}

export default GameManager;