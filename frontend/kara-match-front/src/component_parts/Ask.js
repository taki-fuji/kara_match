import React, {useState, useContext} from 'react'
import { ApiContext } from '../context/ApiContext'
import { Button } from '@mui/material';
import Modal from 'react-modal'
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RiMailAddLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import {FaUserFriends} from "react-icons/fa"

import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';

import './pm.css';

const ExButton = styled(Button)(({theme}) => ({
    margin: theme.spacing(1),
}));

const ExTextField = styled(TextField)(({theme}) => ({
    margin: theme.spacing(1),
}));





const Ask = ({ ask, prof }) => {
    Modal.setAppElement("#root");
    const { changeApprovalRequest } = useContext(ApiContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const customStyles = {
      content: {
        top: "50%",
        left: "42%",
        right: "auto",
        bottom: "auto",
      },
    };
  
    const changeApproval = () => {
      const uploadDataAsk = new FormData();
      uploadDataAsk.append("askTo", ask.askTo);
      uploadDataAsk.append("approved", true);
      changeApprovalRequest(uploadDataAsk, ask);
    };
  
    return (
      <li >
        <h4 className='float_test'> {prof[0].nickName}</h4>
        <div className='float_test '>
        {!ask.approved ? (
          <ExButton
            size="small"
            variant="contained"
            color="primary"
            onClick={() => changeApproval()}
          >
            Approve
          </ExButton>
        ) : (
            <h1><FaUserFriends /></h1>
        )}
       </div>
      </li>
    );
  };
  
  export default Ask;


