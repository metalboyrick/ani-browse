/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import Head from "next/head";
import {Button} from "antd";

import Theme from "../../styles/theme";
import PictureCard from '../../components/pictureCard';

export default function CollectionList(){
    return (<>
        
        <Head>
            <title>Collections - AniBrowse</title>
            <meta
                name="description"
                content="Simple application to browse your favourite anime with."
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div css={{
            marginLeft: "20%",
            marginRight: "20%"
        }}>
            {/* padder space */}
            <div css={{height: "30px"}}></div>
            
            {/* header */}
            <div css={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h1 css={{
                fontWeight: "bold",
                color: Theme.colors.white
                
                }}>Your Collections</h1>
                <Button style={{
                    backgroundColor: Theme.colors.success,
                    borderColor: Theme.colors.success,
                    borderRadius: "10px"
                }} type="primary">+ Add a Collection</Button>
            </div>
            
            {/* the cards */}


        </div>
    </>);
};
