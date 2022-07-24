/** @jsxImportSource @emotion/react */

import { useState, useEffect} from 'react';
import {Button, Modal, Input} from "antd";

import Theme from "../styles/theme";
import queries from "../util/query";
import client from "../util/apollo-client";
import LocalStorageWorker from '../util/localStorageWorker';

import PictureCard from './pictureCard';

export default function NameModal({closeHandler, placeholder, title, onConfirm, onConfirmEdit, editOldName}){
    
    const storageWorker = new LocalStorageWorker();

    const [nameInput, setNameInput] = useState("");

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
                    
                    if(onConfirm){
                        console.log("add handler called");
                        onConfirm(nameInput);
                    } 

                    if(onConfirmEdit && editOldName){
                        console.log("edit handler called");
                        onConfirmEdit(editOldName, nameInput);
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
        }} title={title} visible={true} onCancel={closeHandler} footer={[<ConfirmButton/>]}>
            <Input.Group compact>
                <Input style={{ width: '100%' }} placeholder={placeholder} onChange={e => setNameInput(e.target.value)} />
            </Input.Group>

        </Modal>
    );
};