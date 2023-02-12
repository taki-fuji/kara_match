//ログイン画面でログインが完了したら、メニューに遷移できるようにしたい
//https://qiita.com/kouji0705/items/dd22e8982efb5d2a5d85


import React ,{ useReducer }from "react";

import * as React from 'react';

import { useState } from "react";
//import { Link as RouterLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



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


const theme = createTheme();

export default function SignIn() {
  const initialValues = { mailAddres: "", password: "" }; //初期値

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({}); //{}←オブジェクトキーと値を入れる為irerutame
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();//更新を妨げる
    //ログイン情報　バリデーションチェック
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target; //分割代入
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    console.log(values);
    const errors = {}; //どの欄でエラーが吐かれているのかパターンを用意しておく
    const regex =/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;//メアドの正規表現
    
    if(!values.mailAddres){
      errors.mailAddres ="メールアドレスを入力してください";
    }else if(!regex.test(values.mailAddres)){
      errors.mailAddres = "正しいメールアドレスを入力してください";
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

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e)}

            />
              <p className='errorMsg'>{formErrors.mailAddres}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
            <p className="errorMsg">{formErrors.password}</p>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="ログイン情報を記憶する"
            />
          
           {(Object.keys(formErrors).length === 0 && isSubmit) ?　(
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              ログイン</Button>
            ):(
              <div>
              <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              //component={RouterLink}
              //to="/menu"
              >ログイン
              </Button>
              <p>{validate}</p>
              </div>
              )}
              
           

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  パスワードを忘れた場合
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"アカウント新規作成"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
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

