/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import Head from "next/head";
import {Button} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Theme from "../../styles/theme";
import PictureCard from '../../components/pictureCard';
import LocalStorageWorker from '../../util/localStorageWorker';

export default function CollectionList(){

    const storageWorker = new LocalStorageWorker();
    const [collectionList, setCollectionList] = useState([]);

    const addCollection = () => {
        storageWorker.addCollection("favourite anime");
    };

    const getRelCreationDate = (creationDate) => {
        dayjs.extend(relativeTime);
        return dayjs(creationDate).fromNow();
    };

    useEffect(() => {
        setCollectionList(storageWorker.getCollectionList());

        // fetch data (cannot server side since LocalStorage is located at client side)

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
                onClick={() => {
                    // add collection logic
                }}
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
                                imgWidth="120px" 
                                imgHeight="180px" 
                                imgUrl={collectionList[key].animes.length > 0 ? "" : "../placeholder_cover.png"}
                            >
                                {getRelCreationDate(collectionList[key].dateCreated)}<br/>
                                <strong>{key}</strong>
                            </PictureCard>
                        </>;
                    })
                }
            </div>
            

        </div>
    </>);
};
