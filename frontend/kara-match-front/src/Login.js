//ログイン画面でログインが完了したら、メニューに遷移できるようにしたい
//https://qiita.com/kouji0705/items/dd22e8982efb5d2a5d85

import React from "react";
import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function Login() {
  const initialValues = { id: "", password: "" }; //初期値
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({}); //{}←オブジェクト　キーと値を入れる為irerutame
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

  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* onSubmitプロパティは*/}
        <h1>ログインフォーム</h1>
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

export default Login;



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
