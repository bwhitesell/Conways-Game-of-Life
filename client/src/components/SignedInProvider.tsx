import { Heading } from '@chakra-ui/react';
import Router from 'next/router';
import React from 'react'
import BackendAPIClient from '../backendAPIClient'
import { BACKEND_URL } from '../config'
import Loading from './Loading';


export interface SignedInUserStatus {
  id: number;
  username: string;
  isLoading: boolean;
  isSignedIn: boolean;
}

export interface SignedInUserContext {
  get: SignedInUserStatus,
  update: () => void;
}


const signedInUserInitStatus: SignedInUserStatus = {
  id: -1,
  username: "anonymous",
  isLoading: true,
  isSignedIn: false,
}

const SignedInContext = React.createContext<SignedInUserContext>({
  get: signedInUserInitStatus,
  update: () => {}
});



const SignedInProvider: React.FC<{children: JSX.Element}> = (props) => {
  const [userData, setUserData] = React.useState(signedInUserInitStatus);
  const backendAPIClient = new BackendAPIClient(BACKEND_URL);

  const updateUserData = () => {
    backendAPIClient.me().then((userData) => {
      if (!("message" in userData)) {
        setUserData({
          id: userData.id,
          username: userData.username,
          isLoading: false,
          isSignedIn: true,
        });
      } else {
        setUserData({
          id: signedInUserInitStatus.id,
          username: signedInUserInitStatus.username,
          isLoading: false,
          isSignedIn: false,
        });
      }
    })
  }

  React.useEffect(() => {
    updateUserData();
  }, [])

  return (
    userData.isLoading ? (
      <Loading />
    ) : (
      <SignedInContext.Provider value={{get: userData, update: updateUserData}}>
        {props.children}
      </SignedInContext.Provider>
    )
  )
}


const SignedInComponent: React.FC<{children: JSX.Element}> = (props) => {
  return (
    <SignedInContext.Consumer>
      { value => {
          if (value.get.isSignedIn) {
            return props.children
          } else {
            Router.push('/');
            return Loading();
          }
      }
    }
    </SignedInContext.Consumer>
  )
}


const SignedOutComponent: React.FC<{children: JSX.Element}> = (props) => {
  return (
    <SignedInContext.Consumer>
      { value => {
          if (!value.get.isSignedIn) {
            return props.children
          } else {
            Router.push('/home');
            return Loading();
          }
      }
    }
    </SignedInContext.Consumer>
  )
}


export { SignedInComponent, SignedOutComponent, SignedInProvider, SignedInContext }