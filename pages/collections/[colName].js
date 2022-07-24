/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button} from 'antd';
import { StarFilled, EditFilled, DeleteFilled} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

import Theme from "../../styles/theme";
import queries from "../../util/query";
import client from "../../util/apollo-client";
import LocalStorageWorker from '../../util/localStorageWorker';

import PictureCard from '../../components/pictureCard';
import DeleteModal from '../../components/deleteModal';

export default function CollectionDetails() {

    const router = useRouter();
    const { colName } = router.query;        // process elem by id

    return(
        <div>
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
                marginRight: "20%",
                "@media (max-width: 768px)": {
                    marginLeft: "5%",
                    marginRight: "5%",
                }
            }}>
                {/* padder space */}
                <div css={{height: "30px"}}></div>

                {/* header */}
                <div css={{
                    display: "flex",
                    justifyContent: "space-between",
                    "@media (max-width: 768px)": {
                        flexDirection:"column",
                        alignItems: "center"
                    }

                }}>
                    <h1 css={{
                    fontWeight: "bold",
                    color: Theme.colors.white
                    
                    }}>{colName}</h1>
                    <Button style={{
                        backgroundColor: Theme.colors.gray,
                        borderColor: Theme.colors.gray,
                        borderRadius: "10px"
                    }} type="primary"
                    onClick={() => setIsShowAddModal(true)}
                    >
                        <EditFilled/> Edit Collection
                    </Button>
                    </div>
                <div css={{height: "30px"}}></div>
            
            </div>
        </div>  
        
    );
};


