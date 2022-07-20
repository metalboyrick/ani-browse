/** @jsxImportSource @emotion/react */

import Theme from "../styles/theme";

export default function AnimeCardHome(props){
    return (
        <div css={{
            padding: 0,
            display:"flex",
            flexDirection:"column",
            margin: "20px 10px 10px 10px",
            minWidth: "120px",
            maxWidth: "240px",
            maxHeight: "360px",
            "&:hover":{
                opacity: 0.5
            },
            "@media (max-width: 768px)": {
                width: "120px"
            }
        }}>

            <img css={{
                borderRadius:"10px",
                height: "auto",
                width: "100%",
            }}
            src={props.anime.coverImage.large}
            alt="" />


            <div css={{
                padding:"20px",
                fontSize: Theme.fontSize.reg
            }}>{props.anime.title.romaji}</div>
        </div>
    );
}