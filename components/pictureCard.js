/** @jsxImportSource @emotion/react */

import Image from 'next/image';

import { CheckCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Theme from "../styles/theme";

export default function PictureCard({imgWidth, imgHeight, imgUrl, initSelected, style, children, onClick, selectable}) {

    const [isSelected, setIsSelected] = useState(initSelected);

    return (
        <div css={{
            backgroundColor: "rgba(255,255,255,0.10)",
            borderRadius: "10px",
            margin: "10px",
            width: imgWidth ? imgWidth : "auto",
            ...style
        }} onClick={() =>{
            if(selectable)
                setIsSelected(!isSelected);
            if(onClick)
                onClick();
        }}>

            {/* selection check mark */}
            <div>
                <CheckCircleOutlined  css={{
                    color : Theme.colors.success,
                    fontSize: "20pt",
                    position: "absolute",
                    padding: "10px",
                    visibility: isSelected ? "visible" : "hidden"
                }}/>
            </div>

            <div css={{
                opacity: isSelected ? 0.35 : 1.0
            }}>
                <img src={imgUrl} alt="picture card" css={{
                    borderRadius: "10px 10px 0 0 ",
                    width: imgWidth ? imgWidth : "auto",
                    height: imgHeight ? imgHeight : "auto",
                }} 
                />
                <div css={{padding: "10px", textAlign: "center"}}>
                    {children}
                </div>
            </div>            
        </div>
    );
};