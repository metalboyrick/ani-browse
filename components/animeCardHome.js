/** @jsxImportSource @emotion/react */

import Link from 'next/link';
import Image from 'next/image';

import {useState} from 'react';
import { useMediaQuery } from 'react-responsive';

import { StarFilled } from '@ant-design/icons';

import Theme from "../styles/theme";



export default function AnimeCardHome(props) {

    const [isHover, setIsHover] = useState(false);
    const isMobile = useMediaQuery({query: "(max-width: 768px)"});

    return (
        <Link href={`/anime/${props.anime.id}`}>
            <div css={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                margin: "20px 10px 10px 10px",
                width: "240px",

                "@media (max-width: 768px)": {
                    width: "120px"
                }

            }}

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            >   
                {/* hover info */}
                <div css={{
                    zIndex : 1, 
                    height: "360px",
                    width: "240px",
                    position: "absolute",
                    visibility: isHover ? "visible" : "hidden",
                    padding: "20px",
                    "@media (max-width: 768px)": {
                        height: "180px",
                        width: "120px",
                        padding: "10px"
                    }
                }}>

                    {/* Rating card */}
                    <div css={{
                        display:"flex",
                        justifyContent: "center",
                        alignItems:"center"
                    }}>
                        <StarFilled style={{color: "#F2C94C"}}/>
                        <div css={{display:"flex", alignItems:"flex-end", paddingLeft: "10px"}}>
                            <div css={{
                                fontSize: "26px",
                                fontWeight: "bold",
                                lineHeight: "26px"
                            }}>{props.anime.averageScore / 10}</div>
                            <div css={{
                                fontWeight: 200,
                                paddingLeft: "5px"
                            }}>/10</div>
                        </div>
                        
                    </div>

                    {/* Description */}
                    <div>
                        { (isMobile?props.anime.description.substring(0,40):props.anime.description.substring(0,120)) + "..."}
                    </div>
                </div>
                
                {/* thumbnail */}
                <img css={{
                    borderRadius: "10px",
                    height: "360px",
                    width: "240px",
                    opacity : isHover ? 0.30 : 1.0,
                    "@media (max-width: 768px)": {
                        height: "180px",
                        width: "120px",
                    }
                }}
                    src={props.anime.coverImage.large ? props.anime.coverImage.large : "../placeholder_cover.png"}
                    alt="" 
                />

                {/* title */}
                <div css={{
                    fontSize: Theme.fontSize.reg,
                    padding: "10px",
                    opacity : isHover ? 0.30 : 1.0,
                    "@media (max-width: 768px)": {
                        fontSize: "10pt"
                    }
                }}>{props.anime.title.romaji}</div>
            </div>
        </Link>
    );
}