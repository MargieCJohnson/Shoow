// import React from "react";
import PropTypes from "prop-types";
import { withUser } from "../../Firebase/UserContext";

/**
 * Render something only if the user is not signed in.
 *
 * Usage:
 * <SignedOut>
 *   This is only rendered if the user is not signed in
 * </SignedOut>
 */
function SignedOut({ user, children }) {
  return user.status === "signedOut" && children;
}

SignedOut.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withUser(SignedOut);
