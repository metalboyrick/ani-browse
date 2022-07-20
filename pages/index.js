/** @jsxImportSource @emotion/react */

import Head from "next/head";
import { Input } from "antd";

import Theme from "../styles/theme";
import AnimeCardHome from "../components/animeCardHome";

// placeholder for home screen banners, to be changed with real server data later
const banners = [
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20-HHxhPj5JD13a.jpg",
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/22-wVJjA9tGMt4k.jpg"
];

export default function Home() {
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
                        alignItems:"center",
                        textAlign:"center"
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

                    {/* search bar */}
                    <Input css={{
                        width: "60%",
                        "&:focus": {
                            borderColor: Theme.colors.primary
                        }
                    }} placeholder="What are you looking for?"></Input>

                    <div css={{
                        fontSize: Theme.fontSize.reg,
                        lineHeight: "20pt",
                        fontWeight: 200,
                    }}>or <a css={{
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
                    alignItems:"center",
                    textAlign:"center"
                }
            }}>
                <div css={{
                
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"

                }}>

                    <AnimeCardHome 
                    imgUrl={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-YJvLbgJQPCoI.jpg"} 
                    caption="Naruto"/>
                    <AnimeCardHome 
                    imgUrl={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-YJvLbgJQPCoI.jpg"} 
                    caption="One Piece"/>
                    <AnimeCardHome 
                    imgUrl={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-YJvLbgJQPCoI.jpg"} 
                    caption="Bleach"/>
                    <AnimeCardHome 
                    imgUrl={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-YJvLbgJQPCoI.jpg"} 
                    caption="Naruto"/>
                    <AnimeCardHome 
                    imgUrl={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-YJvLbgJQPCoI.jpg"} 
                    caption="Naruto"/>
                    <AnimeCardHome 
                    imgUrl={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-YJvLbgJQPCoI.jpg"} 
                    caption="Naruto"/>
                    <AnimeCardHome 
                    imgUrl={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-YJvLbgJQPCoI.jpg"} 
                    caption="Naruto"/>

                    
                </div>

                <a css={{
                        marginTop: "40px",
                        fontWeight: "bold",
                        fontSize: Theme.fontSize.reg,
                        color: Theme.colors.primary,
                        "&:hover": {
                            color: Theme.colors.success
                        }
                }}>See More</a>
            </div>
           

            

        </div>
    );
}
