/** @jsxImportSource @emotion/react */

import Theme from "../styles/theme";

export default function AnimeCardHome(props){
    return (
        <div css={{
            textAlign:"center",
            margin: "20px",
            "&:hover":{
                opacity: 0.5
            }
        }}>
            <img css={{
                borderRadius:"10px"
            }}
            src={props.imgUrl}
            alt="" />
            <div css={{
                paddingTop:"10px",
                fontSize: Theme.fontSize.reg
            }}>{props.caption}</div>
        </div>
    );
}