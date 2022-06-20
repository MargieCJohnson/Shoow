import PropTypes from "prop-types";
import { withUser } from "../../Firebase/UserContext";
//import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';



/**
 * Only render if the user is signed i
 * The children prop must be a function.
 *
 * Usage:
 * <SignedIn>
 *  {user => (
 *    <div>The user ID is {user.uid}</div>
 *  )}
 * </SignedIn>
 *
 * Or if you don't care about _who_ the user is, just that they are
 * signed in:
 *
 * <SignedIn>
 *  {() => (
 *    <div>Hello</div>
 *  )}
 * </SignedIn>
 */
function SignedIn({ user, children }) {
  return user.status === "signedIn" && children(user);
}

SignedIn.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default withUser(SignedIn);
