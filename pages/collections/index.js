/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import Head from "next/head";
import Link from 'next/link';
import {Button, Modal} from "antd";
import {EditFilled, DeleteFilled, FrownOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Theme from "../../styles/theme";
import queries from "../../util/query";
import client from "../../util/apollo-client";
import LocalStorageWorker from '../../util/localStorageWorker';

import PictureCard from '../../components/pictureCard';
import NameModal from '../../components/nameModal';
import DeleteModal from '../../components/deleteModal';

export default function CollectionList(){

    const storageWorker = new LocalStorageWorker();

    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [collectionList, setCollectionList] = useState({});
    const [collectionPics, setCollectionPics] = useState({});

    // get relative time with DayJS
    const getRelCreationDate = (creationDate) => {
        dayjs.extend(relativeTime);
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
    
    // edit collection
    const editCollection = (oldName, newName) => {

        try{
            if(oldName && newName){
                storageWorker.editCollection(oldName, newName);
                updateCollections();
            }
        } catch (error) {
            throw error;
        }

        setIsShowEditModal(false);
    };

    // delete collection
    const deleteCollection = (collectionName) => {
        try{
            if(collectionName){
                storageWorker.deleteCollection(collectionName);
                updateCollections();
            }
        }
        catch (error){
            throw error;
        }

        setIsShowDeleteModal(false);
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

        {isShowEditModal ? 
        <NameModal 
            title={`Edit Collection "${editName}"`} 
            placeholder= {`Enter a new name for collection "${editName}"`} 
            closeHandler= {() => {
                setEditName("");
                setIsShowEditModal(false);
            }}
            editOldName={editName}
            onConfirmEdit={editCollection}
        /> 
        : 
        ""}

        {isShowDeleteModal ? 
        <DeleteModal
            title={editName} 
            deleteName={editName}
            closeHandler= {() => {
                setEditName("");
                setIsShowDeleteModal(false);
            }}
            onConfirm={deleteCollection}
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

                { Object.keys(collectionList).length > 0 ?
                    Object.keys(collectionList).map((key, index) => {
                        return <>
                        
                            <PictureCard 
                                css={{
                                    textAlign: "center"
                                }}
                                key={key}
                                imgWidth="140px" 
                                imgHeight="210px" 
                                imgUrl={collectionPics[key] ? collectionPics[key] : "../placeholder_cover.png"}
                            >
                                <Link href={`/collections/${key}`}>
                                    <div css={{"&:hover":{cursor: "pointer"}}}>
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
                                    </div>
                                    
                                </Link>
                                <div css={{
                                    display:"flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: "10px"
                                }}>
                                    <Button type="primary" style={{
                                        backgroundColor: Theme.colors.primary,
                                        borderColor: Theme.colors.primary,
                                        borderRadius: "10px",
                                        fontSize: "10pt"
                                    }}
                                        onClick={() => {
                                            setEditName(key);
                                            setIsShowEditModal(true);
                                        }}
                                    ><EditFilled color={Theme.colors.white}/></Button>
                                    <Button type="danger" style={{
                                        backgroundColor: Theme.colors.danger,
                                        borderColor: Theme.colors.danger,
                                        borderRadius: "10px",
                                        fontSize: "10pt"
                                    }}
                                        onClick={() => {
                                            setEditName(key);
                                            setIsShowDeleteModal(true);
                                        }}
                                    ><DeleteFilled color={Theme.colors.white}/></Button>
                                </div>
                            </PictureCard>
                        </>;
                    }) : 
                    <div
                        css={{
                            textAlign: "center",
                            fontSize: "20pt",
                            color: Theme.colors.gray
                        }}
                    >
                        <FrownOutlined /><br/>
                        You haven&apos;t added any collections yet!
                    </div>
                 }
                
            </div>
            

        </div>
    </>);
};
