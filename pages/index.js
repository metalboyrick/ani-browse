/** @jsxImportSource @emotion/react */

import { useState, useEffect, useCallback } from 'react';
import Head from "next/head";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

import Theme from "../styles/theme";
import AnimeCardHome from "../components/animeCardHome";
import queries from "../util/query";
import client from "../util/apollo-client";

// placeholder for home screen banners, to be changed with real server data later
const banners = [
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20-HHxhPj5JD13a.jpg",
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/22-wVJjA9tGMt4k.jpg"
];



export default function Home({animeList}) {

    // the page states
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState(animeList);
    const [isSeeMoreLoading, setIsSeeMoreLoading] = useState(false);

    // function to add pages
    const addCurrentPage = async () => {
        let nextPage = currentPage + 1;

        setIsSeeMoreLoading(true);

        const { loading, error, data } = await client.query({
            query: queries.GET_PAGINATED_ANIME_LIST,
            variables: {
                page: nextPage,
                perPage: 12
            }
        });

        // TODO: handle errors

        // update component state
        setCurrentData([...currentData, ...data.Page.media]);
        setIsSeeMoreLoading(false);
        setCurrentPage(nextPage);
    };

    // search function 
    const searchPage = useCallback(async () => {

    });

    return (
        <div>
            <Head>
                <title>AniBrowse</title>
                <meta
                    name="description"
                    content="Simple application to browse your favourite anime with."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header Section */}
            <div css={{
                width: "100%",
                height: "40vh",
                position: "relative"
            }}>

                <div
                    css={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${banners[0]})`,
                        backgroundSize: "cover",
                        opacity: 0.35,
                        position: "absolute"
                    }}
                />

                <div css={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "center",
                    width: "100%",
                    height: "40vh",
                    paddingLeft: "20%",
                    paddingRight: "20%",
                    "@media (max-width: 768px)": {
                        paddingLeft: "5%",
                        paddingRight: "5%",
                        alignItems: "center",
                        textAlign: "center"
                    }
                }}>
                    <div css={{
                        fontSize: Theme.fontSize.pageHeader,
                        lineHeight: "28pt",
                        color: Theme.colors.white,
                        fontWeight: "bold",
                    }}>Hi, Welcome to AniBrowse!</div>

                    <div css={{
                        fontSize: Theme.fontSize.reg,
                        lineHeight: "20pt",
                        fontWeight: 200
                    }}>Explore your favourite anime.</div>

                    <div css={{
                        fontSize: Theme.fontSize.reg,
                        lineHeight: "20pt",
                        fontWeight: 200,
                    }}>and <a css={{
                        fontWeight: "bold",
                        "&:hover": {
                            color: Theme.colors.primary
                        }
                    }}>Add to Collections</a></div>
                </div>
            </div>

            {/* Anime cards and pagination */}
            <div css={{
                marginLeft: "20%",
                marginRight: "20%",
                textAlign: "center",
                paddingBottom: "40px",
                "@media (max-width: 1200px)": {
                    marginLeft: "5%",
                    marginRight: "5%",
                    alignItems: "center",
                    textAlign: "center"
                }
            }}>
                <div css={{

                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"

                }}>

                    {currentData.map(entry => <AnimeCardHome anime={entry}/>)}

                    

                </div>

                {/* pagination: load more entries */}
                {!isSeeMoreLoading ?  <a css={{
                    marginTop: "40px",
                    fontWeight: "bold",
                    fontSize: Theme.fontSize.reg,
                    color: Theme.colors.primary,
                    "&:hover": {
                        color: Theme.colors.success
                    }
                }}
                onClick={() => addCurrentPage()}>See More</a>: <Spin indicator={<LoadingOutlined style={{ fontSize: 24 , color: Theme.colors.primary}} spin />} />}
                
            </div>




        </div>
    );
}

export async function getServerSideProps() {

    const { loading, error, data } = await client.query({
        query: queries.GET_PAGINATED_ANIME_LIST,
        variables: {
            page: 1,
            perPage: 12
        }
    });

    // TODO: handle errors

    return {
        props: {
            animeList: data.Page.media
        },
    };
}
