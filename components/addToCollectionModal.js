/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import {Button, Modal} from "antd";

import Theme from "../styles/theme";
import queries from "../util/query";
import client from "../util/apollo-client";
import LocalStorageWorker from '../util/localStorageWorker';

import PictureCard from './pictureCard';

export default function AddToCollectionModal({closeHandler, animeId, initSelect}){
    
    const storageWorker = new LocalStorageWorker();

    const [selectedCol, setSelectedCol] = useState(initSelect);
    const [collectionList, setCollectionList] = useState(storageWorker.getCollectionList());


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
    
    return (
        <Modal bodyStyle={{
            backgroundColor: Theme.colors.background,
            color: Theme.colors.white
        }} title="Select Collection(s)" visible={true} onCancel={closeHandler} footer={[<ConfirmButton/>]}>
            <Button style={{
                    backgroundColor: Theme.colors.success,
                    borderColor: Theme.colors.success,
                    borderRadius: "10px",
                    marginBottom: "20px"
                }} type="primary" >+ Add a Collection</Button>
            
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
                                imgUrl={value.length > 0 ? "" : "../placeholder_cover.png"}
                                initSelected={ selectedCol.has(name) } 
                                onClick={() => {
                                   selectItem(name);
                                }}
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