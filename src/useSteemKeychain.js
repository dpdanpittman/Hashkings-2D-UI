import { useState } from "react";

// When component using hook is mounted,
// this hook checks if steem keychain is active
// If loaded server side, checkForKeychain can be
// used to force recheck

function useSteemKeychain() {
  let initialState = {
    loaded: false,
    steemKeychain: undefined,
  };

  // Steem keychain won't be available server side

  if (process.browser && window && window.steem_keychain) {
    initialState = {
      loaded: true,
      steemKeychain: window.steem_keychain,
    };
  }

  const [state, setState] = useState(initialState);

  function checkForKeychain() {
    if (window && window.steem_keychain) {
      setState({ loaded: true, steemKeychain: window.steem_keychain });
    } else {
      setState({ steemKeychain: undefined, loaded: true });
    }
  }

  return { ...state, checkForKeychain };
}

export default useSteemKeychain;