/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import Head from "next/head";
import {Button} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Theme from "../../styles/theme";
import queries from "../../util/query";
import client from "../../util/apollo-client";
import LocalStorageWorker from '../../util/localStorageWorker';

import PictureCard from '../../components/pictureCard';


export default function CollectionList(){

    const storageWorker = new LocalStorageWorker();
    const [collectionList, setCollectionList] = useState({});
    const [collectionPics, setCollectionPics] = useState({});

    const addCollection = () => {
        storageWorker.addCollection("favourite anime");
    };

    const getRelCreationDate = (creationDate) => {
        dayjs.extend(relativeTime);
        console.log(dayjs(creationDate).fromNow());
        return dayjs(creationDate).fromNow();
    };

    // helper function to fetcch cover images
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

    useEffect(() => {
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

        Promise.all(promiseArr)
        .then(() => {
            setCollectionPics(picDict);
        })
        
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

        <div css={{
            marginLeft: "20%",
            marginRight: "20%"
        }}>
            {/* padder space */}
            <div css={{height: "30px"}}></div>
            
            {/* header */}
            <div css={{
                display: "flex",
                justifyContent: "space-between"
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
                >
                    + Add a Collection
                </Button>
            </div>
            
            {/* the cards */}
            <div css={{
                display:"flex",
                flexWrap:"wrap"
            }}>   
                {
                    Object.keys(collectionList).map(function(key, index) {
                        return <>
                            <PictureCard 
                                css={{
                                    textAlign: "center"
                                }}
                                key={key}
                                imgWidth="130px" 
                                imgHeight="195px" 
                                imgUrl={collectionList[key].animes.length > 0 ? collectionPics[key] : "../placeholder_cover.png"}
                            >
                                <span
                                    css={{
                                        color: Theme.colors.gray,
                                        fontSize: "0.75rem"
                                    }}
                                >
                                    {getRelCreationDate(collectionList[key].dateCreated)}
                                </span><br/>
                                <strong>{key}</strong>
                            </PictureCard>
                        </>;
                    })
                }
            </div>
            

        </div>
    </>);
};
