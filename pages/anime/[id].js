/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

import Theme from "../../styles/theme";
import queries from "../../util/query";
import client from "../../util/apollo-client";
import LocalStorageWorker from '../../util/localStorageWorker';

import InfoCard from '../../components/infoCard';
import PictureCard from '../../components/pictureCard';
import AddToCollectionModal from '../../components/addToCollectionModal';

export default function AnimeDetail({ animeDetail }) {

    const router = useRouter();
    const { id } = router.query;        // process elem by id
    const isMobile = useMediaQuery({query: "(max-width: 768px)"});
    const storageWorker = new LocalStorageWorker();

    // state hooks
    const [currentCollections, setCurrentCollections] = useState(new Set());
    const [isAddColVisible, setIsAddColVisible] = useState(false);

    // get collection and check if the id is there
    const updateCollections = () => {
        let tempCol = new Set();
        let collections = storageWorker.getCollectionList();

        console.log(collections);
        
        let collectionNames = Object.keys(collections);
        for(let i = 0; i < collectionNames.length; i++){
            if(collections[collectionNames[i]].includes(id)){
                tempCol.add(collectionNames[i]);
            }
        }

        console.log(tempCol);

        setCurrentCollections(tempCol);
    }

    
    useEffect(() => {
        updateCollections();
    }, []);

    return (
        <div>
            <Head>
                <title>{animeDetail.title.romaji} - AniBrowse</title>
                <meta
                    name="description"
                    content="Simple application to browse your favourite anime with."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            {isAddColVisible ? 
                <AddToCollectionModal 
                    initSelect={currentCollections} 
                    closeHandler={() => {
                        updateCollections();
                        setIsAddColVisible(false);
                    }} 
                    animeId={id}
                /> 
                : ""
            }
            

            <div css={{
                width: "100%",
                height: "40vh",
                position: "relative",
                "@media (max-width: 768px)" : {
                    height: "20vh"
                }
            }}>
                <div
                    css={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${animeDetail.bannerImage ? animeDetail.bannerImage : '../placeholder_banner.png'})`,
                        backgroundSize: "cover",
                        opacity: 0.35,
                        position: "absolute"
                    }}
                />
            </div>

            <div css={{
                marginLeft: "20%",
                marginRight: "20%",
                position: "relative",
                top: "-100px",
                display: "flex",
                flexWrap: "wrap",
                "@media (max-width: 768px)" : {
                    marginLeft: "5%",
                    marginRight: "5%",
                    flexDirection: "column"
                }
            }}>

                {/* left column */}
                <div css={{
                    flex: "1",
                    textAlign: "center"
                }}>
                    <img src={isMobile? animeDetail.coverImage.medium : animeDetail.coverImage.large} 
                    alt={`${animeDetail.title.romaji} cover`} 
                    css={{
                        borderRadius: "10px"
                    }}/>

                    {/* MOBILE title card */}
                    {isMobile ? <div>
                        <div css={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            paddingBottom: "5px",
                            color: Theme.colors.white
                        }}>
                            {animeDetail.title.romaji}
                        </div>
                        <div css={{
                            fontSize: "16px",
                            fontWeight: "200"
                        }}>
                            <StarFilled style={{color: "#F2C94C"}}/> {' '}
                            <span css={{fontSize: "24px", fontWeight: "bold"}}>{animeDetail.averageScore / 10} </span> <span css={{fontSize:"18px"}}> / 10</span> {' '}
                            | {animeDetail.startDate.year} | {animeDetail.studios.edges.length ? animeDetail.studios.edges[0].node.name : "-"}
                        </div>
                    </div>
                    : ""}

                    {/* collection button */}
                    <Button type="primary" shape="round" style={{
                        backgroundColor: Theme.colors.primary,
                        borderColor: Theme.colors.primary,
                        color: Theme.colors.white,
                        fontWeight: "bold",
                        width: "100%",
                        marginTop: "14px"
                    }}
                    onClick={() => setIsAddColVisible(true)}
                    >
                        + Add to Collections
                    </Button>
                    <InfoCard title="Collection"> 
                    {currentCollections.size > 0 ? 
                        (Array.from(currentCollections)).map(item => <><a href="">{item}</a> <br/> </>)
                    :
                     "You haven't added this show to any Collections!"}
                        
                    </InfoCard>
                    <InfoCard title="More Details" css={{
                        textAlign: "center"
                    }}>
                        <div>
                            <strong>Status</strong><br />
                            {animeDetail.endDate.year ? "Completed" : "Ongoing"}
                        </div>
                        <br />
                        <div>
                            <strong>First Air</strong><br />
                            {animeDetail.startDate.year}
                        </div>
                        <br />
                        <div>
                            <strong>Source</strong><br />
                            {animeDetail.source}
                        </div>
                        <br />
                        <div>
                            <strong>Studio</strong><br />
                            {animeDetail.studios.edges.length ? animeDetail.studios.edges[0].node.name : "-"}
                        </div>
                        <br />
                        <div>
                            <strong>Genre(s)</strong><br />
                            {animeDetail.genres.map(item => <>{item} <br/></>)}
                        </div>
                        <br />
                        <div>
                            <strong>Number of Episodes</strong><br />
                            {animeDetail.episodes ? animeDetail.episodes : "Anime Ongoing"}
                        </div>
                    </InfoCard>
                </div>
                

                {/* right column */}
                <div css={{
                    marginLeft: "20px",
                    flex: "6",
                    "@media (max-width: 768px)" : {
                        marginLeft: "0"
                    }
                }}>
                    {/* DESKTOP title card */}
                    {!isMobile ? <div>
                        <div css={{
                            fontSize: "60px",
                            fontWeight: "bold",
                            paddingBottom: "5px",
                            color: Theme.colors.white
                        }}>
                            {animeDetail.title.romaji}
                        </div>
                        <div css={{
                            fontSize: "26px",
                            fontWeight: "200"
                        }}>
                            <StarFilled style={{color: "#F2C94C"}}/> {' '}
                            <span css={{fontSize: "32px", fontWeight: "bold"}}>{animeDetail.averageScore / 10} </span> <span css={{fontSize:"18px"}}> / 10</span> {' '}
                            | {animeDetail.startDate.year} | {animeDetail.studios.edges.length ? animeDetail.studios.edges[0].node.name : "-"}
                        </div>
                        <div css={{height: "30px"}}/>
                    </div>
                    : ""}
                    
                    {/* body */}
                    <div>
                        <div css={{height: "30px"}}/>
                        <h1 css={{fontWeight: "bold", color: Theme.colors.white}}>Synopsis</h1>
                        <div dangerouslySetInnerHTML={ { __html: animeDetail.description} }></div>
                        <div css={{height: "30px"}}/>

                        <h1 css={{fontWeight: "bold", color: Theme.colors.white}}>Characters</h1>
                        <div css={{
                            display: "flex",
                            flexWrap: "wrap"
                        }}>
                            {animeDetail.characters.edges.map(item => 
                            <PictureCard 
                                imgUrl={item.node.image.large}
                                imgWidth = {isMobile ? "130px" : "140px"}
                                imgHeight = {isMobile ? "195px" : "210px"}
                            >
                                <strong>{item.node.name.last} {item.node.name.middle} {item.node.name.first}</strong><br/>
                                {item.voiceActors[0].name.full}
                            </PictureCard>)}
                        </div>
                        <div css={{height: "30px"}}/>
                        
                        <h1 css={{fontWeight: "bold", color: Theme.colors.white}}>Tags</h1>
                        <div css={{
                            display: "flex",
                            flexWrap: "wrap"
                        }}>
                            {animeDetail.tags.map(item => <div css={{
                                backgroundColor: "rgba(255,255,255,0.10)",
                                borderRadius: "10px",
                                padding: "10px",
                                margin: "10px",
                                width: "auto"
                            }}>
                                {item.name}
                            </div>)}
                        </div>
                        

                    </div>
                   
                </div>
            </div>

        </div>
    );
};

export async function getServerSideProps({ params }) {
    const { loading, error, data } = await client.query({
        query: queries.GET_ANIME_DETAILS,
        variables: {
            id: params.id
        }
    });

    // TODO: handle errors
    console.log(data.Media);

    return {
        props: {
            animeDetail: data.Media
        },
    };
}

