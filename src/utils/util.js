const hasDuplicate = (collection, collectionField, dataValue, exceptId = null) => {
    if(exceptId === null) {
        return collection.some(obj => obj[collectionField] === dataValue);
    }else{
        return collection.some(obj => obj[collectionField] === dataValue && obj.id !== exceptId);
    } 
} 

const validInput = (data, type="string") => typeof data === type

export {
    hasDuplicate,
    validInput
}