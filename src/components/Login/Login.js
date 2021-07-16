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
  if (action.type === "USER_PW_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      val: latestState.value,
      isValid: latestState.value.trim().length > 6
    }
  }

  return {
    value: "",
    isValid: null
  }
}

const Login = ({ onLogin }) => {
  const [formIsValid, setFormIsValid] = useState(false);

  let initialState = {
    value: "",
    isValid: null
  };

  // useReducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);

  // useReducer
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialState);
  
  const emailChangeHandler = e => {
    dispatchEmail({
      type: "USER_EMAIL_INPUT",
      val: e.target.value
    });

    setFormIsValid(e.target.value.includes("@") && passwordState.isValid)
  };

  const passwordChangeHandler = e => {
    dispatchPassword({
      type: "USER_PW_INPUT",
      val: e.target.value
    })

    setFormIsValid(emailState.isValid && e.target.value.trim().length > 6)
  };
  
  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR"
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "INPUT_BLUR"
    });
  };

  const submitHandler = e => {
    e.preventDefault();

    onLogin(emailState.value, passwordState.value);
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
            passwordState.isValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
