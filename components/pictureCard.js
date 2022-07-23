/** @jsxImportSource @emotion/react */

export default function PictureCard(props) {
    return (
        <div css={{
            backgroundColor: "rgba(255,255,255,0.10)",
            borderRadius: "10px",
            margin: "10px",
            width: props.imgWidth ? props.imgWidth : "auto",
        }}>
            <img src={props.imgUrl} alt="picture card" css={{
                borderRadius: "10px 10px 0 0 ",
                width: props.imgWidth ? props.imgWidth : "auto",
                height: props.imgHeight ? props.imgHeight : "auto",
            }}/>
            <div css={{padding: "10px", textAlign: "center"}}>
                {props.children}
            </div>
        </div>
    );
};