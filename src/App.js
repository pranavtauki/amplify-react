import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
import ChatApp from './components/chatapp';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import './App.css'

Amplify.configure(awsconfig);

const App = () => {
  return (
    <>
    <div className="container">
      <h1 className="heading">TAMU Virtual TA</h1>
      <ChatApp />
    </div>
    </>
  );
};

export default withAuthenticator(App, { hideSignUp: true });
