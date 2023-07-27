// import "@aws-amplify/ui-react/styles.css";
// import {
//   withAuthenticator,
// } from "@aws-amplify/ui-react";
// import ChatApp from './components/chatapp';
// import { Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports';
// import './App.css'

// Amplify.configure(awsconfig);

// const App = () => {
//   return (
//     <>
//     <div className="container">
//       <h1 className="heading">TAMU Virtual TA</h1>
//       <ChatApp />
//     </div>
//     </>
//   );
// };

// export default withAuthenticator(App, { hideSignUp: true });

//--------------------working as of 25/7------------------------------------- 
import { Amplify, Auth } from "aws-amplify"; // Import Auth from aws-amplify
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import "./App.css";
import ChatApp from "./components/chatapp";

Amplify.configure(awsExports);

function App({ user }) {
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("Error while signing out!", error);
    }
  };

  return (
    <>
      <div className="navbar">
        <h1 className="heading">TAMU Virtual TA</h1>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
      <div className="container">
        <h1>Hello {user.attributes.email}</h1>
        <ChatApp userProfile={user.attributes.profile}/>
      </div>
    </>
  );
}

export default withAuthenticator(App, { hideSignUp: true });



// import { Amplify, Auth } from "aws-amplify"; // Import Auth from aws-amplify
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import awsExports from "./aws-exports";
// import "./App.css";
// import ChatApp from "./components/chatapp";

// Amplify.configure(awsExports);

// function App({ user }) {
//   const handleSignOut = async () => {
//     try {
//       await Auth.signOut();
//     } catch (error) {
//       console.log("Error while signing out!", error);
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh" }}> {/* Wrap content in a div with min-height */}
//       <div className="navbar">
//         <h1 className="heading">TAMU Virtual TA</h1>
//         <button onClick={handleSignOut}>Sign out</button>
//       </div>
//       <div className="container">
//         <h1>Hello {user.attributes.profile}</h1>
//         <ChatApp userProfile={user.attributes.profile} />
//       </div>
//     </div>
//   );
// }


// export default withAuthenticator(App, { hideSignUp: true });
