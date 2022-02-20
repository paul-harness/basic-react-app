import logo from './logo.svg';
import './App.css';
import { initialize, Event } from '@harnessio/ff-javascript-client-sdk'
import { useState } from "react";



function App() {

  const [featureFlags, setFeatureFlags] = useState({});

  const cf = initialize('6977ca02-5693-429f-a1a6-5272593f0539', {
    identifier: 'paul-target',      // Target identifier
    name: 'paul-target-name',                  // Optional target name
    attributes: {                            // Optional target attributes
      email: 'sample@sample.com',
      host: 'paul-mbp',
      tenant: 'harness'
    }
  });
  
  cf.on(Event.READY, flags => {
      setFeatureFlags(flags);
      console.log(flags);
    // Event happens when connection to server is established
    // flags contains all evaluations against SDK key
  });
  
  cf.on(Event.CHANGED, flagInfo => {
    console.log(flagInfo);
    if (flagInfo.deleted) {
      setFeatureFlags(currentFeatureFlags => {
        delete currentFeatureFlags[flagInfo.flag];
        return { ...currentFeatureFlags };
      });
    } else {
      setFeatureFlags(currentFeatureFlags => ({ ...currentFeatureFlags, [flagInfo.flag]: flagInfo.value }));
    }
  });
  
  const value = cf.variation('canary_image', false) // second argument is default value when variation does not exist
  
  let imageName = featureFlags.canary_image ? '//bit.ly/capn_canary' : logo;
  console.log("value of imageName");
  console.log(imageName);
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageName} className="App-logo" alt="logo" />
        {/* <img src="//bit.ly/capn_canary" className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
