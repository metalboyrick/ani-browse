export default class LocalStorageWorker {
    constructor(){
        if (typeof window !== 'undefined') {
            if(!localStorage.getItem("aniBrowserData"))
                localStorage.setItem("aniBrowserData", "{}");
            if(!localStorage.getItem("aniBrowserPersist"))
                localStorage.setItem("aniBrowserPersist", "");
        }
        
    }

    cleanStr(str){
        
        str = str.trim();

        // regex credit : https://stackoverflow.com/questions/13283470/regex-for-allowing-alphanumeric-and-space
        if(!/^[\w\-\s]+$/.test(str))
            throw "Invalid input!";

        return str;
        
    }

    addCollection(name){

        if (typeof window !== 'undefined') {

            try{
                name = this.cleanStr(name);
            } catch (error) {
                throw error;
            }
                

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

            try{
                name = this.cleanStr(name);
            } catch (error) {
                throw error;
            }

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

            try{
                oldName = this.cleanStr(oldName);
                newName = this.cleanStr(newName);
            } catch (error) {
                throw error;
            }

            if(oldName === newName) return;

            let collectionList = JSON.parse(localStorage.getItem("aniBrowserData"));

            if(collectionList[newName]) throw "Collection names must be unique!";

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

    getPersistedLink(){
        if (typeof window !== 'undefined') {
            return localStorage.getItem("aniBrowserPersist");
        }
    }

    setPersistedLink(persistQuery){
        if (typeof window !== 'undefined') {
            localStorage.setItem("aniBrowserPersist", persistQuery);
        }
    }
};