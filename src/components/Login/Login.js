import React, { useState, useReducer } from 'react';
import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';

// Reducer function
const emailReducer = (latestState, action) => {
  if (action.type === "USER_EMAIL_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@")
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      val: latestState.value,
      isValid: latestState.value.includes("@")
    }
  }

  // default return
  return {
    value: "",
    isValid: null
  };
};

const passwordReducer = (latestState, action) => {


  return {
    value: "",
    isValid: null
  }
}

const Login = ({ onLogin }) => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useReducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null
  });

  // useReducer
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null
  })
  
  const emailChangeHandler = e => {
    dispatchEmail({
      type: "USER_EMAIL_INPUT",
      val: e.target.value
    });

    setFormIsValid(e.target.value && enteredPassword.trim().length > 6)
  };

  const passwordChangeHandler = e => {
    dispatchPassword({
      type: "USER_PW_INPUT",
      val: e.target.value
    })

    setEnteredPassword(e.target.value);

    setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6)
  };
  
  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR"
    });
  };

  const validatePasswordHandler = () => setPasswordIsValid(enteredPassword.trim().length > 6);

  const submitHandler = e => {
    e.preventDefault();

    onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            autoComplete="off"
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
