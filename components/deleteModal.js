/** @jsxImportSource @emotion/react */

import { useState} from 'react';
import {Button, Modal} from "antd";
import {CloseCircleFilled} from "@ant-design/icons";

import Theme from "../styles/theme";
import LocalStorageWorker from '../util/localStorageWorker';


export default function DeleteModal({closeHandler, title, onConfirm, deleteName}){
    
    const storageWorker = new LocalStorageWorker();

    const [nameInput, setNameInput] = useState("");

    const ConfirmButton = () => {
        return (
            <>
                <Button style={{
                backgroundColor: Theme.colors.background,
                borderColor: Theme.colors.white,
                borderRadius: "10px",
                marginBottom: "20px",
            }} 
                type="danger"
                onClick={() => {
                    closeHandler();
                }}
            > 
                Cancel
            </Button>
            <Button style={{
                backgroundColor: Theme.colors.danger,
                borderColor: Theme.colors.danger,
                borderRadius: "10px",
                marginBottom: "20px",
            }} 
                type="danger"
                onClick={() => {
                    onConfirm(deleteName);
                }}
            > 
                Confirm
            </Button>
            </>

        );
    };
    
    return (
        <Modal bodyStyle={{
            backgroundColor: Theme.colors.background,
            color: Theme.colors.white
        }} title={title} visible={true} onCancel={closeHandler} footer={[<ConfirmButton/>]}>
           Are you sure you want to delete {deleteName} ? <br/>
           <span css={{fontWeight: "bold", color: Theme.colors.danger}}>WARNING: This action is not reversible !</span>
        </Modal>
    );
};