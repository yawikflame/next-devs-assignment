import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import avatar from 'assets/img/faces/marc.jpg';
import { useDispatch } from 'react-redux';
import { signIn } from 'actions';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function UserLogin() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const usernameError = document.querySelector('.username.error');
    const passwordError = document.querySelector('.password.error');

    // reset errors
    usernameError.textContent = '';
    passwordError.textContent = '';

    const form = document.querySelector('#userLoginForm');
    const username = form.username.value;
    const password = form.password.value;

    try {
      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.errors) {
        // console.log(data.errors);
        usernameError.textContent = data.errors.username;
        passwordError.textContent = data.errors.password;
      } else {
        dispatch(signIn());
        document.location.assign('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <form id='userLoginForm' onSubmit={(e) => onSubmitHandler(e)}>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Login Form</h4>
                <p className={classes.cardCategoryWhite}>Enter your details</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText='Username'
                      id='username'
                      name='username'
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <div
                      className='username error'
                      style={{ color: '#FF0000' }}
                    ></div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText='Password'
                      id='password'
                      name='password'
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <div
                      className='password error'
                      style={{ color: '#FF0000' }}
                    ></div>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type='submit' color='primary'>
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href='#pablo' onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt='...' />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens??? bed design but the back is...
              </p>
              <Button color='primary' round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
