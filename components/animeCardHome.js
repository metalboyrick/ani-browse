/** @jsxImportSource @emotion/react */

import Theme from "../styles/theme";

export default function AnimeCardHome(props){
    return (
        <div css={{
            padding: 0,
            display:"flex",
            flexDirection:"column",
            margin: "20px 10px 10px 10px",
            width: "240px",
            "&:hover":{
                opacity: 0.5
            },
            "@media (max-width: 768px)": {
                width:"120px"
            }
        }}>

            <img css={{
                borderRadius:"10px",
                height: "360px",
                width: "240px",
                "@media (max-width: 768px)": {
                    height: "180px",
                    width: "120px",
                }
            }}
            src={props.anime.coverImage.large}
            alt="" />


            <div css={{
                fontSize: Theme.fontSize.reg,
                padding: "10px",
                "@media (max-width: 768px)": {
                    fontSize: "10pt"
                }
            }}>{props.anime.title.romaji}</div>
        </div>
    );
}