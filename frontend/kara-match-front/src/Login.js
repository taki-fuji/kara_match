//ログイン画面でログインが完了したら、メニューに遷移できるようにしたい
//https://qiita.com/kouji0705/items/dd22e8982efb5d2a5d85

import React ,{ useReducer }from "react";
import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


import { withCookies } from 'react-cookie';
import axios from 'axios';

import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';

import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  //INPUT_EDIT,
  INPUT_EDIT_LOG,
  INPUT_EDIT_REG,
  TOGGLE_MODE,
} from "./actionTypes";


const Exspan = styled('span')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "teal",

})); 


const SpanError = styled('span')(({theme}) => ({
  display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "fuchsia",
    marginTop: 10,
})); 



const initialState = {//stateの初期値
  isLoading: false,//ログインされているか
  isLoginView: true,//ログインかレジスターかを判断
  error: "",//エラーメッセージを格納
  credentialsLog: {//ログイン時にtokenを発行するためusernameとpassword
    username: "",
    password: "",
  },
  credentialsReg: {//新規作成
    email: "",
    password: "",
  },
};


const loginReducer = (state, action) => {
  switch (action.type) {
    case START_FETCH: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ERROR_CATCHED: {
      return {
        ...state,
        error: "Email or password is not correct!",
        isLoading: false,
      };
    }
    // case INPUT_EDIT: {
    //   return {
    //     ...state,
    //     [action.inputName]: action.payload,
    //     error: "",
    //   };
    // }
    case INPUT_EDIT_LOG: {
      return {
        ...state,
        //[action.inputName]: action.payload,
        credentialsLog: {
          ...state.credentialsLog,
          [action.inputName]: action.payload,
        },
        error: "",
      };
    }
    case INPUT_EDIT_REG: {
      return {
        ...state,
        //[action.inputName]: action.payload,
        credentialsReg: {
          ...state.credentialsReg,
          [action.inputName]: action.payload,
        },
        error: "",
      };
    }
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      };
    }
    default:
      return state;
  }
};



const Login = (props) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  //loginReducerはstateを更新するための関数,dispatchはそれを呼び出す関数
  //initialStateはstateの初期値
  const initialValues = { id: "", password: "" }; //初期値
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({}); //{}←オブジェクトキーと値を入れる為irerutame
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target; //分割代入
    setFormValues({ ...formValues, [name]: value });
  };

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    console.log(values);
    const errors = {}; //どの欄でエラーが吐かれているのかパターンを用意しておく

    if (!values.id) {
      errors.id = "ユーザーIDを入力してください";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };



  const inputChangedLog = () => (event) => {
    //const cred = state.credentialsLog;
    //cred[event.target.name] = event.target.value;
    dispatch({
      type: INPUT_EDIT_LOG,
      //inputName: "state.credentialLog",
      //payload: cred,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };


  const inputChangedReg = () => (event) => {
    //const cred = state.credentialsReg;
    //cred[event.target.name] = event.target.value;
    dispatch({
      type: INPUT_EDIT_REG,
      //inputName: "state.credentialReg",
      //payload: cred,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };


  const login = async (event) => {
    event.preventDefault();
    if (state.isLoginView) {
      try {
        dispatch({ type: START_FETCH });
        const res = await axios.post(
          "http://127.0.0.1:8000/authen/",
          state.credentialsLog,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        props.cookies.set("current-token", res.data.token);
        res.data.token
          ? (window.location.href = "/profiles")
          : (window.location.href = "/");
        dispatch({ type: FETCH_SUCCESS });
      } catch {
        dispatch({ type: ERROR_CATCHED });
      }
    } else {
      try {
        dispatch({ type: START_FETCH });
        await axios.post(
          "http://127.0.0.1:8000/api/user/create/",
          state.credentialsReg,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: TOGGLE_MODE });
      } catch {
        dispatch({ type: ERROR_CATCHED });
      }
    }
  };


  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
  };


  //書き換えたところをコメントアウトに書いていくエラーが起きた場合に備える
  //一時的なメモ:下の{login}はもしかすると右のような書き方で書かなければいけないかも今のところエラーはないが{(e) => handleSubmit(e)}
  //<h1>ログインフォーム</h1>を{state.isLoginView ? "Login" : "Register"}にした
  //onChange={inputChangedLog()}が変更点

  return (
    <div className="formContainer">

      <form onSubmit={(e) => handleSubmit(e)}>
        {/* onSubmitプロパティは*/}
        {state.isLoginView ? "Login" : "Register"}
        <hr />
        {/*横線 */}
        <div className="uiForm">
          <div className="formField">
            <label>ユーザーID</label>
            <input
              type="text"
              placeholder="ユーザーID"
              name="id"
              onChange={(e) => handleChange(e)} //で文字が打ち込まれてる時(onChange)にhandleChangeを呼び出す
            />
          </div>
          <p className="errorMsg">{formErrors.id}</p>

          <div className="formField">
            <label>パスワード</label>
            <input
              type="text"
              placeholder="パスワード"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.password}</p>

         
          <div className="new_account">
            <button className="newAccountButton">アカウント新規作成</button>
          </div>

          {Object.keys(formErrors).length === 0 && isSubmit && 
          (<Button
            variant="contained"
            color="primary"
            component={Link}
            to="/menu"
          >ログイン</Button>)
          }
        
        </div>
      </form>
    
   
    </div>
  );
}

export default  withCookies(Login)



// const Login =()=>{
//   return(
//     <>
//     <h1>Login page</h1>
//     <Button
//     variant="outlined"
//     color="primary"
//     component={Link}
//     to = "/menu"
//     >Success Login</Button>
//     </>
//   )
// }
// export default Login;
