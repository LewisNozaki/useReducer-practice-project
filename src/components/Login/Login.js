import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = ({ onLogin }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  
  // useEffect is a hook that helps you deal with code that should be executed in response to something else.
  // Something like the component being loaded, http requests, or in this example, the email and password state changing.
  // Those are called "side effects".
  useEffect(() => {
    const validityTimer = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
    }, 600);
    
    // Cleanup function
    // the cleanup functions runs before the other logic every time useEffect is called EXCEPT for the very first time when the component is rendered.
    // In this example, because we do not want the setFormIsValid to run on every key stroke, we create a setTimeOut function to wait 5 seconds before 
    // validation. Then, with each key stroke, we run the clearTimeOut function to restart the timer. This should result in the setFormIsValid to run
    // at least when the user has finished typing. 
    return () => {
      console.log("clean up");
      clearTimeout(validityTimer);
    };
  }, [enteredEmail, enteredPassword]);
  
  const emailChangeHandler = e => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = e => {
    setEnteredPassword(e.target.value);
  };
  
  const validateEmailHandler = () => setEmailIsValid(enteredEmail.includes('@'));

  const validatePasswordHandler = () => setPasswordIsValid(enteredPassword.trim().length > 6);

  const submitHandler = e => {
    e.preventDefault();

    onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailIsValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
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
