import * as React from 'react';
import { useState , useReducer, useContext} from "react";
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

import { ApiContext } from './context/ApiContext';


import { useCookies } from "react-cookie";

import { withCookies } from 'react-cookie';
import axios from 'axios';

import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT,
  INPUT_EDIT_LOG,
  INPUT_EDIT_REG,
  TOGGLE_MODE,
} from "./actionTypes";


const SpanError = styled('span')(({theme}) => ({
  display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "fuchsia",
    marginTop: 10,
})); 

// 状態を管理する変数的なものを宣言

// ログイン状態やエラーメッセージの変数みたいなものを宣言
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

// dispachのtypeで宣言する。initialStateで宣言した変数の状態を変更したりする。
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
    case INPUT_EDIT: {
      return {
        ...state,
        [action.inputName]: action.payload,
        error: "",
      };
    }
    case INPUT_EDIT_LOG: {
      return {
        ...state,
        [action.inputName]: action.payload,
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
        [action.inputName]: action.payload,
        credentialsReg: {
          ...state.credentialsReg,
          [action.inputName]: action.payload,
        },
        error: "",
      };
    }
    // isLoginViewの値を切り替える
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



// テーマを作ってる
// 開発側がインターフェースのデザイン色を変えたりするときにテーマを使う。createThemeの関数に色々定義する
const theme = createTheme();

//export default function SignIn(props)
const Login = (props) => {

  const { inputToken, setCookie , setInputToken} = useContext(ApiContext);

  const [state, dispatch] = useReducer(loginReducer, initialState);

  const initialValues = { mailAddres: "", password: "" }; //初期値
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({}); //{}←オブジェクトキーと値を入れる為irerutame
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();//更新を妨げる
    //ログイン情報バリデーションチェック
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





  // この関数はloginのテキストフォームを変更する時のonChangeに使われる。
  const inputChangedLog = () => (event) => {
    // credにテキストフォームに入力されたemailとpasswordを格納している
    const cred = state.credentialsLog;
    cred[event.target.name] = event.target.value;
    dispatch({
      type: INPUT_EDIT_LOG,
      inputName: "state.credentialLog",
      payload: cred,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };

  // 上のinputChangeLogと同じ
  const inputChangedReg = () => (event) => {
    const cred = state.credentialsReg;
    cred[event.target.name] = event.target.value;
    dispatch({
      type: INPUT_EDIT_REG,
      inputName: "state.credentialReg",
      payload: cred,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };


  const login = async (event) => {
    event.preventDefault();

    // isLoginViewはbooleanでログイン状態ならTrue、登録状態ならFalseを返す。
    if (state.isLoginView) {
      // credentialsLogのEmailとPassword
      try {
        // isloadingの状態をSTART_FETCHを使って、dispatchで変更する
        dispatch({ type: START_FETCH });
        // "http://127.0.0.1:8000/authen/" にcredentialsLogの値をpostして、トークンをresに格納する
        const res = await axios.post(
          "http://127.0.0.1:8000/authen/",
          state.credentialsLog,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        // current-tokenにresに格納したトークンをcurrent-tokenにセットする。
        // props.cookies.set("current-token", res.data.token);
        setCookie("token", res.data.token);
        // トークンの値がTrueだったら/menuへ、Falseだったら遷移しない。
        res.data.token
          ? (window.location.href = "/menu")
          : (window.location.href = "/");
        //  ???ここでログイン状態をFalseにしておく。次のLoginの時にFalseからスタートできるようにかな？
        dispatch({ type: FETCH_SUCCESS });
      } catch { 
        dispatch({ type: ERROR_CATCHED });
      }
      // if文と構成は大体同じ
    } else {
      try {
        dispatch({ type: START_FETCH });
        // "http://127.0.0.1:8000/api/user/create/"にcredentialsRegの内容を送る。新規アカウントの内容を送る。
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
  
  // isloginViewの値を切り替える
  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
  };




  return (
    // 開発側がインターフェースのデザイン色を変えたりするときにテーマを使う。
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
            {state.isLoginView ? "Login" : "Register"}
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            {/* emailのテキストフィールド。isLoginViewが、Trueでログインテキストフィールド、Falseで登録テキストフィールドを表示する */}
            {state.isLoginView ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="username"
                  autoComplete="email"
                  autoFocus
                  onChange={inputChangedLog()}
                />

              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={inputChangedReg()}
                />
            )}
              <p className='errorMsg'>{formErrors.mailAddres}</p>
            {/* passwordのテキストフィールド。isLoginViewが、Trueでログインテキストフィールド、Falseで登録テキストフィールドを表示する */}
            {state.isLoginView ? (  
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputChangedLog()}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputChangedReg()}
              />
            )}

            <p className="errorMsg">{formErrors.password}</p>
            <SpanError >{state.error}</SpanError>


            {state.isLoginView ? (
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="ログイン情報を記憶する"
            />
              ) : (
                <div></div>
            )}


            {/* Loginボタンを押せるか押せないかを制御している三項演算子 
            Buttonのdisabledでボタンを押せない状態にできる。*/}
            {state.isLoginView ? (
            !state.credentialsLog.password || !state.credentialsLog.username ? (
              <Button
                type="submit"
                fullWidth
                disabled
                variant="contained"
                color="primary"
              >
                ログイン
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                ログイン
              </Button>
            )
            // ボタンのレジスターバージョン
          ) : !state.credentialsReg.password || !state.credentialsReg.email ? (
            <Button
              type="submit"
              fullWidth
              disabled
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          )}

            
          
           {/* {(Object.keys(formErrors).length === 0 && isSubmit) ?(
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
              )} */}
              
           

            <Grid container>
              <Grid item xs>
                {/* Link先のボタンなし */}
                <Link href="#" variant="body2">
                  パスワードを忘れた場合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Link>
              </Grid>
              <Grid item>
                <span onClick={() => toggleView()} >
                  <Link href="#" variant="body2">
                  {state.isLoginView ? "アカウント新規作成" : "ログイン画面へ"}
                  </Link>
                </span>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default  withCookies(Login)