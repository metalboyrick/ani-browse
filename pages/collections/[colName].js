/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Spin } from 'antd';
import { StarFilled, EditFilled, DeleteFilled, FrownOutlined, LoadingOutlined} from '@ant-design/icons';

import Theme from "../../styles/theme";
import queries from "../../util/query";
import client from "../../util/apollo-client";
import LocalStorageWorker from '../../util/localStorageWorker';

import PictureCardHorizontal from '../../components/pictureCardHorizontal';
import DeleteModal from '../../components/deleteModal';
import NameModal from '../../components/nameModal';

export default function CollectionDetails() {

    const storageWorker = new LocalStorageWorker();
    const router = useRouter();

    // NOTE : if collection name is changed, for the current session the link name will remain, will change next session
    const { colName } = router.query;        // process elem by collection name, feasible since unique

    // modal box states
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [displayColName, setDisplayColName] = useState("");
    const [colData, setColData] = useState({});
    const [selectedAnimeId, setSelectedAnimeId] = useState(-1);
    const [selectedAnimeTitle, setSelectedAnimeTitle] = useState("");
    const [animeData, setAnimeData] = useState([]);

    // loading widget
    const LoadingWidget = () => {
        return (<div css={{
            width: "100%",
            height: "100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
             <Spin indicator={<LoadingOutlined style={{ fontSize: 40 , color: Theme.colors.primary}} spin />} />
        </div>);
    }

    const fetchAnime = async (animeId) => {
        const { loading, error, data } = await client.query({
            query: queries.GET_ANIME_DETAILS,
            variables: {
                id: parseInt(animeId)
            }
        });
    
        // TODO: handle errors

        return data.Media;
    };

    const updateAnimes = () => {
        setLoading(true);

        // update collection contents
        let tempColName = router.query.colName;
        if(!tempColName) tempColName = storageWorker.getPersistedLink();
        else storageWorker.setPersistedLink(tempColName);

        setDisplayColName(tempColName);
        let tempCollection = storageWorker.getCollectionList();
        setColData(tempCollection[tempColName]);
        
        let animeIDs = tempCollection[tempColName].animes;
        let promiseArr = [];
        let tempAnimeData = [];

        for(let i = 0; i < animeIDs.length; i++){

            // fetch the data
            promiseArr.push(
                fetchAnime(animeIDs[i])
                .then(data => {
                    tempAnimeData.push(data);  
                    
                })
            );
            
        }

        // this section allows us to render everything simultaneously
        Promise.all(promiseArr)
        .then(() => {
            setAnimeData(tempAnimeData);
            setLoading(false);
        });
    };

    const deleteAnime = (animeId) => {
        try{
            if(animeId){
                let tempColDataAnimes = colData.animes;
                console.log(animeId, tempColDataAnimes)
                let colList = storageWorker.getCollectionList();

                tempColDataAnimes = tempColDataAnimes.filter(item => parseInt(item) !== animeId);
                colList[displayColName].animes = tempColDataAnimes;
                storageWorker.updateCollection(colList);
                updateAnimes();
            }
        }
        catch (error){
            throw error;
        }

        setSelectedAnimeTitle("");
        setSelectedAnimeId(-1);
        setIsShowDeleteModal(false);
    };

    const editCollection = (oldName, newName) => {
        try{
            if(oldName && newName){
                storageWorker.editCollection(oldName, newName);
                storageWorker.setPersistedLink(newName);
                // reload page with new collection name
                router.push(`/collections/${newName}`);
            }
        } catch (error) {
            throw error;
        }

        setIsShowEditModal(false);
    };

    useEffect(() => {
        updateAnimes();
    }, []);

    return(
        <div>
            <Head>
                <title>Collections - AniBrowse</title>
                <meta
                    name="description"
                    content="Simple application to browse your favourite anime with."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isShowDeleteModal ? 
            <DeleteModal
                title={selectedAnimeTitle}
                deleteName={selectedAnimeId}
                closeHandler= {() => {
                    setSelectedAnimeTitle("");
                    setSelectedAnimeId(-1);
                    setIsShowDeleteModal(false);
                }}
                onConfirm={deleteAnime}
            /> 
            : 
            ""}

            {isShowEditModal ? 
            <NameModal 
                title={`Edit Collection "${displayColName}"`} 
                placeholder= {`Enter a new name for collection "${displayColName}"`} 
                closeHandler= {() => {
                    setIsShowEditModal(false);
                }}
                editOldName={displayColName}
                onConfirmEdit={editCollection}
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
                    
                    }}>{colName}</h1>
                    <Button style={{
                        backgroundColor: Theme.colors.primary,
                        borderColor: Theme.colors.primary,
                        borderRadius: "10px"
                    }} type="primary"
                    onClick={() => setIsShowEditModal(true)}
                    >
                        <EditFilled/> Edit Collection
                    </Button>
                    </div>
                <div css={{height: "30px"}}></div>

                {/* the cards */}
                <div css={{
                    display:"flex",
                    flexWrap:"wrap",
                    justifyContent: "space-between"
                }}>
                    { loading ? <LoadingWidget/> :
                        animeData.length > 0 ? 
                            animeData.map(item => <> 
                                <PictureCardHorizontal 
                                    style={{
                                        width: "49%",
                                        margin: "0",
                                        marginBottom: "10px",
                                        "@media (max-width: 1400px)": {
                                            width: "100%",
                                        }
                                    }}
                                    // css={{
                                    //     textAlign: "center"
                                    // }}
                                    key={item.id}
                                    imgWidth="95px" 
                                    imgHeight="143px" 
                                    imgUrl={item.coverImage.medium ? item.coverImage.medium : "../placeholder_cover.png"}
                                >
                                    <Link 
                                        href={`/anime/${item.id}`}
                                    >
                                        <div css={{
                                            "&:hover":{
                                                cursor: "pointer"
                                            }
                                        }}>
                                            <strong css={{fontSize: "14px", lineHeight: "14px"}}>{item.title.romaji}</strong>
                                            <br/>
                                            <span
                                                css={{
                                                    color: Theme.colors.gray,
                                                    fontSize: "0.75rem"
                                                }}
                                            >
                                                <StarFilled style={{color: "#F2C94C"}}/> {' '}
                                                <span css={{fontWeight: "bold"}}>{item.averageScore / 10} </span> <span> / 10</span> {' '}
                                            </span>
                                        </div>
                                        
                                    </Link>
                                    <div css={{
                                        display:"flex",
                                        justifyContent: "end",
                                        width: "100%",
                                        textAlign: "left",
                                        marginTop: "10px"
                                    }}>
                                        <Button type="danger" style={{
                                            backgroundColor: Theme.colors.danger,
                                            borderColor: Theme.colors.danger,
                                            borderRadius: "10px",
                                            fontSize: "10pt"
                                        }}
                                            onClick={() => {
                                                setSelectedAnimeId(item.id);
                                                setSelectedAnimeTitle(item.title.romaji);
                                                setIsShowDeleteModal(true);
                                            }}
                                        ><DeleteFilled color={Theme.colors.white}/></Button>
                                    </div>
                                </PictureCardHorizontal>
                            </>)
                        :
                        <div css={{
                            width: "100%",
                            height: "100%",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}>
                            <div
                                css={{
                                    textAlign: "center",
                                    fontSize: "20pt",
                                    color: Theme.colors.gray
                                }}
                            >
                                <FrownOutlined /><br/>
                                You haven&apos;t added any anime to this collection yet!
                            </div>
                        </div>
                        
                    }
                </div>
            </div>
        </div>  
        
    );
};


