/** @jsxImportSource @emotion/react */

import Image from 'next/image';

import { CheckCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Theme from "../styles/theme";

export default function PictureCardHorizontal({imgWidth, imgHeight, imgUrl, style, children, onClick}) {


    return (
        <div css={{
            backgroundColor: "rgba(255,255,255,0.10)",
            borderRadius: "10px",
            margin: "10px",
            height: imgHeight ? imgHeight : "auto",
            ...style
        }} onClick={() =>{
            if(onClick)
                onClick();
        }}>
            <div css={{
                display: "flex",
                flexDirection:"row"
            }}>
                <Image src={imgUrl} alt="picture card" css={{
                    borderRadius: "10px 0 0 10px ",
                    width: imgWidth ? imgWidth : "auto",
                    height: imgHeight ? imgHeight : "auto",
                }}/>
                <div css={{
                    padding: "16px", 
                    textAlign: "left", 
                    width: "100%", height: "100%"}}>
                    {children}
                </div>
            </div>            
        </div>
    );
};