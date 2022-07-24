/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import {Button, Modal, Input} from "antd";
import {CloseCircleFilled} from "@ant-design/icons";

import Theme from "../styles/theme";
import queries from "../util/query";
import client from "../util/apollo-client";
import LocalStorageWorker from '../util/localStorageWorker';

import PictureCard from './pictureCard';

export default function NameModal({closeHandler, placeholder, title, onConfirm, onConfirmEdit, editOldName}){
    
    const storageWorker = new LocalStorageWorker();

    const [nameInput, setNameInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const ConfirmButton = () => {
        return (
            <Button style={{
                backgroundColor: Theme.colors.primary,
                borderColor: Theme.colors.primary,
                borderRadius: "10px",
                marginBottom: "20px",
            }} 
                type="primary"
                onClick={() => {
                    
                    try{
                        if(onConfirm){
                            onConfirm(nameInput);
                        } 
    
                        if(onConfirmEdit && editOldName){
                            onConfirmEdit(editOldName, nameInput);
                        }
                    } catch (error) {
                        setErrorMsg(error);
                    }
                    
                        
                }}
            > 
                Confirm
            </Button>
        );
    };
    
    return (
        <Modal bodyStyle={{
            backgroundColor: Theme.colors.background,
            color: Theme.colors.white
        }} title={title} visible={true} onCancel={closeHandler} footer={[<ConfirmButton key={1}/>]}>
            <Input style={{ width: '100%' }} placeholder={placeholder} onChange={e => setNameInput(e.target.value)} /> 
            {errorMsg.length > 0 ? <div css={{color: Theme.colors.danger, paddingTop: "10px"}}> <CloseCircleFilled/> {errorMsg}</div> : ""}
        </Modal>
    );
};