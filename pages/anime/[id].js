/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from 'antd';

import Theme from "../../styles/theme";
import queries from "../../util/query";
import client from "../../util/apollo-client";

import InfoCard from '../../components/infoCard';

// placeholder for home screen banners, to be changed with real server data later
const banners = [
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20-HHxhPj5JD13a.jpg",
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/22-wVJjA9tGMt4k.jpg"
];

export default function AnimeDetail({ animeDetail }) {

    const router = useRouter();
    const { id } = router.query;        // process elem by id

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

            <div css={{
                width: "100%",
                height: "40vh",
                position: "relative"
            }}>
                <div
                    css={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${animeDetail.bannerImage})`,
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
                display: "flex"
            }}>

                {/* left column */}
                <div css={{
                    flex: "1",

                }}>
                    <img src={animeDetail.coverImage.large} 
                    alt={`${animeDetail.title.romaji} cover`} 
                    css={{
                        borderRadius: "10px"
                    }}/>

                    {/* collection button */}
                    <Button type="primary" shape="round" style={{
                        backgroundColor: Theme.colors.primary,
                        borderColor: Theme.colors.primary,
                        color: Theme.colors.white,
                        fontWeight: "bold",
                        width: "100%",
                        marginTop: "14px"
                    }}>
                        + Add to Collections
                    </Button>
                    <InfoCard title="Collections"> 
                        You haven’t added this show to any Collections!
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
                            {animeDetail.studios.edges[0].node.name}
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
                    flex: "6",
                }}>
                    
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

