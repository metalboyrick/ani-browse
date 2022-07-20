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
            src={props.imgUrl}
            alt="" />


            <div css={{
                paddingTop:"6px",
                fontSize: Theme.fontSize.reg
            }}>{props.caption}</div>
        </div>
    );
}