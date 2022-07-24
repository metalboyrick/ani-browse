/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button} from 'antd';
import { StarFilled, EditFilled, DeleteFilled, FrownOutlined} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

import Theme from "../../styles/theme";
import queries from "../../util/query";
import client from "../../util/apollo-client";
import LocalStorageWorker from '../../util/localStorageWorker';

import PictureCard from '../../components/pictureCard';
import DeleteModal from '../../components/deleteModal';
import { VariablesInAllowedPositionRule } from 'graphql';

export default function CollectionDetails() {

    const storageWorker = new LocalStorageWorker();
    const router = useRouter();

    // NOTE : if collection name is changed, for the current session the link name will remain, will change next session
    const { colName } = router.query;        // process elem by collection name, feasible since unique

    const [displayColName, setDisplayColName] = useState(colName);
    const [colData, setColData] = useState({});
    const [selectedAnimeId, setSelectedAnimeId] = useState(-1);
    const [animeData, setAnimeData] = useState([]);

    const fetchAnime = async (animeId) => {
        const { loading, error, data } = await client.query({
            query: queries.GET_ANIME_DETAILS,
            variables: {
                id: parseInt(animeId)
            }
        });
    
        // TODO: handle errors
        console.log(data.Media);

        return data.Media;
    };

    const updateAnimes = () => {

        // update collection contents
        let tempColName = router.query.colName;
        let tempCollection = storageWorker.getCollectionList()[tempColName];
        console.log("collectionName", router.query);
        setColData(tempCollection);
        
        let animeIDs = tempCollection.animes;
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
        });
    };

    const deleteAnime = (animeId) => {};

    const editCollection = (oldName, newName) => {};

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
                    onClick={() => setIsShowAddModal(true)}
                    >
                        <EditFilled/> Edit Collection
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
                        animeData.length > 0 ? 
                            animeData.map(item => <> 
                                <PictureCard 
                                    css={{
                                        textAlign: "center"
                                    }}
                                    key={item.id}
                                    imgWidth="140px" 
                                    imgHeight="210px" 
                                    imgUrl={item.coverImage.large}
                                >
                                    <Link href={`/anime/${item.id}`}>
                                        <div>
                                            <strong>{item.title.romaji}</strong>
                                            <br/>
                                            <span
                                                css={{
                                                    color: Theme.colors.gray,
                                                    fontSize: "0.75rem"
                                                }}
                                            >
                                                <StarFilled style={{color: "#F2C94C"}}/> {' '}
                                                <span css={{fontWeight: "bold"}}>{item.averageScore / 10} </span> <span> / 10</span> {' '}
                                                 <br/> {item.studios.edges.length ? item.studios.edges[0].node.name : "-"}
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
                            </>)
                        :
                        <>
                            <div
                                css={{
                                    textAlign: "center",
                                    fontSize: "20pt",
                                    color: Theme.colors.gray
                                }}
                            >
                                <FrownOutlined /><br/>
                                You haven't added any collections yet!
                            </div>
                        </>
                        
                    }
                </div>
            </div>
        </div>  
        
    );
};


