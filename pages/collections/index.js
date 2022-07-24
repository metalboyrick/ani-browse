/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import Head from "next/head";
import {Button, Modal} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Theme from "../../styles/theme";
import queries from "../../util/query";
import client from "../../util/apollo-client";
import LocalStorageWorker from '../../util/localStorageWorker';

import PictureCard from '../../components/pictureCard';
import NameModal from '../../components/nameModal';


export default function CollectionList(){

    const storageWorker = new LocalStorageWorker();

    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [collectionList, setCollectionList] = useState({});
    const [collectionPics, setCollectionPics] = useState({});

    // get relative time with DayJS
    const getRelCreationDate = (creationDate) => {
        dayjs.extend(relativeTime);
        console.log(dayjs(creationDate).fromNow());
        return dayjs(creationDate).fromNow();
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
        // TODO: add collection logic
        if(collectionName){
            storageWorker.addCollection(collectionName);
            updateCollections();
        }

        setIsShowAddModal(false);
    };



    useEffect(() => {
        updateCollections();
    }, []);


    return (<>
        
        <Head>
            <title>Collections - AniBrowse</title>
            <meta
                name="description"
                content="Simple application to browse your favourite anime with."
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        {isShowAddModal ? 
        <NameModal 
            title="Add a Collection" 
            placeholder="Enter a name for your new collection..." 
            closeHandler={() => setIsShowAddModal(false)}
            onConfirm={addCollectionHandler}
        /> 
        : 
        ""}

        <div css={{
            marginLeft: "20%",
            marginRight: "20%",
            "@media (max-width: 768px)": {
                marginLeft: "5%",
                marginRight: "5%",
            }
        }}>
            {/* padder space */}
            <div css={{height: "30px"}}></div>
            
            {/* header */}
            <div css={{
                display: "flex",
                justifyContent: "space-between",
                "@media (max-width: 768px)": {
                    flexDirection:"column",
                    alignItems: "center"
                }

            }}>
                <h1 css={{
                fontWeight: "bold",
                color: Theme.colors.white
                
                }}>Your Collections</h1>
                <Button style={{
                    backgroundColor: Theme.colors.success,
                    borderColor: Theme.colors.success,
                    borderRadius: "10px"
                }} type="primary"
                onClick={() => setIsShowAddModal(true)}
                >
                    + Add a Collection
                </Button>
            </div>
            <div css={{height: "30px"}}></div>
            
            {/* the cards */}
            <div css={{
                display:"flex",
                flexWrap:"wrap",
                justifyContent: "center"
            }}>   
                {
                    Object.keys(collectionList).map(function(key, index) {
                        return <>
                            <PictureCard 
                                css={{
                                    textAlign: "center"
                                }}
                                key={key}
                                imgWidth="120px" 
                                imgHeight="180px" 
                                imgUrl={collectionList[key].animes.length > 0 ? collectionPics[key] : "../placeholder_cover.png"}
                            >
                                <strong>{key}</strong>
                                <br/>
                                <span
                                    css={{
                                        color: Theme.colors.gray,
                                        fontSize: "0.75rem"
                                    }}
                                >
                                    {getRelCreationDate(collectionList[key].dateCreated)}
                                </span>
                                <div>
                                </div>
                            </PictureCard>
                        </>;
                    })
                }
            </div>
            

        </div>
    </>);
};
