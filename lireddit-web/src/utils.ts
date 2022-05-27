import Router from 'next/router';
import BackendAPIWrapper from './backendAPIWrapper'
import {BACKEND_URL} from './config'


const redirectLoggedInUser = async (redirectURL: string) => {
  const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL)
  const sessionData = await backendAPIWrapper.me();
  const isLoggedIn = ("id" in sessionData);
  if (isLoggedIn) {
    Router.push(redirectURL)
  }
}


const redirectLoggedOutUser = async (redirectURL: string) => {
  const backendAPIWrapper = new BackendAPIWrapper(BACKEND_URL)
  const sessionData = await backendAPIWrapper.me();
  const isLoggedIn = ("id" in sessionData);
  if (!isLoggedIn) {
    Router.push(redirectURL)
  }
}

export {redirectLoggedInUser, redirectLoggedOutUser}