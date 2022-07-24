/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import {Button, Modal} from "antd";

import Theme from "../styles/theme";
import queries from "../util/query";
import client from "../util/apollo-client";
import LocalStorageWorker from '../util/localStorageWorker';

import PictureCard from './pictureCard';
import NameModal from './nameModal';

export default function AddToCollectionModal({closeHandler, animeId, initSelect}){
    
    const storageWorker = new LocalStorageWorker();

    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [selectedCol, setSelectedCol] = useState(initSelect);
    const [collectionList, setCollectionList] = useState(storageWorker.getCollectionList());
    const [collectionPics, setCollectionPics] = useState({});

    // select item
    const selectItem = (name) => {
        let temp = selectedCol;
        
        if(selectedCol.has(name)){
            temp.delete(name);
        } else {
            temp.add(name);
        }

        console.log(temp);

        setSelectedCol(temp);
    }

    const ConfirmButton = () => {
        return (
            <Button style={{
                backgroundColor: Theme.colors.primary,
                borderColor: Theme.colors.primary,
                borderRadius: "10px",
                marginBottom: "20px",
            }} 
                type="primary"
                onClick={() => {
                    let temp = collectionList;
                    
                    // add checked keys
                    selectedCol.forEach(item => {
                        if(!temp[item].animes.includes(animeId))
                            temp[item].animes = [...temp[item].animes, animeId];
                    });

                    // serialize into local storage
                    storageWorker.updateCollection(temp);

                    // close the modal
                    closeHandler();
                }}
            >
                Confirm
            </Button>
        );
    };

    // helper function to fetch cover images
    const fetchImage = async (animeId) => {
        const { loading, error, data } = await client.query({
            query: queries.GET_ANIME_DETAILS,
            variables: {
                id: animeId
            }
        });
    
        // TODO: handle errors
        console.log(data.Media.coverImage.large);

        return data.Media.coverImage.large;

    }

    // helper function to update the list
    const updateCollections = () => {
        let tempColList = storageWorker.getCollectionList();
        setCollectionList(tempColList);

        // fetch data (cannot server side since LocalStorage is located at client side)
        let picDict = {};
        let promiseArr = [];
        let collectionNames = Object.keys(tempColList);
        for(let i = 0; i < collectionNames.length; i++){
            if(tempColList[collectionNames[i]].animes.length === 0) continue;

            // fetch the data
            promiseArr.push(
                fetchImage(tempColList[collectionNames[i]].animes[0])
                .then(coverImage => {
                    picDict[collectionNames[i]] = coverImage;    
                })
            );
            
        }

        // this section allows us to render everything simultaneously
        Promise.all(promiseArr)
        .then(() => {
            setCollectionPics(picDict);
        })
        
    };

    // add collection
    const addCollectionHandler = (collectionName) => {
        try{
            if(collectionName){
                storageWorker.addCollection(collectionName);
                updateCollections();
            }
        }
        catch (error){
            throw error;
        }
        

        setIsShowAddModal(false);
    };

    useEffect(() => {
        updateCollections();
    }, []);
    
    
    return (
        <Modal bodyStyle={{
            backgroundColor: Theme.colors.background,
            color: Theme.colors.white
        }} title="Select Collection(s)" visible={true} onCancel={closeHandler} footer={[<ConfirmButton key={1}/>]}>

            {isShowAddModal ? 
                <NameModal 
                    title="Add a Collection" 
                    placeholder="Enter a name for your new collection..." 
                    closeHandler={() => setIsShowAddModal(false)}
                    onConfirm={addCollectionHandler}
                /> 
                : 
            ""}

            <Button style={{
                    backgroundColor: Theme.colors.success,
                    borderColor: Theme.colors.success,
                    borderRadius: "10px",
                    marginBottom: "20px"
                }} type="primary" 
                onClick={() => setIsShowAddModal(true)}>+ Add a Collection</Button>
            
            {/* The collection */}
            {/* the cards */}
            <div css={{
                display:"flex",
                flexWrap:"wrap"
            }}>   
                {
                    Object.entries(collectionList).map(([name, value]) => {
                        return (
                            <PictureCard 
                                style={{
                                    display: initSelect.has(name) ? "none" : "",
                                    '&:hover': {
                                        cursor: "pointer"
                                    }
                                }}
                                key={name}
                                imgWidth="120px" 
                                imgHeight="180px" 
                                imgUrl={value.animes.length > 0 ? collectionPics[name] : "../placeholder_cover.png"}
                                initSelected={ selectedCol.has(name) } 
                                onClick={() => {
                                   selectItem(name);
                                }}
                                selectable
                            >
                                {name}
                            </PictureCard>
                        );
                    })
                }
            </div>


        </Modal>
    );
};