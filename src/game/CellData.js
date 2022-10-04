class CellData {
    id; 
    value; 
    isRevealed; 
    isBomb;
    isFlagged;

    

    constructor(id, value, isRevealed, isBomb, isFlagged) {
        this.id = id;
        this.value = value;
        this.isRevealed = isRevealed;
        this.isBomb = isBomb;
        this.isFlagged = isFlagged;
    }

    setValue(value) {
        this.value = value;
    }

    toggleFlag() {
        this.isFlagged = !this.isFlagged
    }

    setRevealed(isRevealed) {
        if (isRevealed === undefined) {
            this.isRevealed = !this.isRevealed;
        } 
        else {
            this.isRevealed = isRevealed;
        }
    }
}

export default CellData