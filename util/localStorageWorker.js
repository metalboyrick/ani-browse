export default class LocalStorageWorker {
    constructor(){
        if (typeof window !== 'undefined') {
            if(!localStorage.getItem("aniBrowserData"))
            localStorage.setItem("aniBrowserData", "{}");
        }
        
    }

    addCollection(name){
        if (typeof window !== 'undefined') {
            // get data from local storage
            let collectionList = JSON.parse(localStorage.getItem("aniBrowserData"));
            
            if(!collectionList[name])
                collectionList[name] = {
                    dateCreated: new Date(),
                    animes: []
                };
            else {
                throw "Collection already exists!";
            }
                
            let serialized = JSON.stringify(collectionList);
            localStorage.setItem("aniBrowserData", serialized);
        }
    }

    updateCollection(collectionObj){
        if (typeof window !== 'undefined') {
            let serialized = JSON.stringify(collectionObj);
            localStorage.setItem("aniBrowserData", serialized);
        }
    }

    deleteCollection(name){
        if (typeof window !== 'undefined') {
            // parse and delete
            let collectionList = JSON.parse(localStorage.getItem("aniBrowserData"));
            delete collectionList[name];

            // reinstall collection
            let serialized = JSON.stringify(collectionList);
            localStorage.setItem("aniBrowserData", serialized);
        }
    }

    editCollection(oldName, newName){

        if (typeof window !== 'undefined') {
            let collectionList = JSON.parse(localStorage.getItem("aniBrowserData"));
            let collectionObj = collectionList[oldName];
            collectionList[newName] = collectionObj;
            delete collectionList[oldName];

            // reinstall collection
            let serialized = JSON.stringify(collectionList);
            localStorage.setItem("aniBrowserData", serialized);
        }

        
    }

    getCollectionList(){

        if (typeof window !== 'undefined') {
            let collectionList = JSON.parse(localStorage.getItem("aniBrowserData"));
            return collectionList;
        }
        
    }
};