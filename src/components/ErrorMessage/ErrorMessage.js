import React from "react";
import PropTypes from "prop-types";
import "./ErrorMessage.scss";

/**
 * Generic reusable component for showing error messages
 */
function ErrorMessage({ children }) {
  return <div className="error-text"><main>
   <p id="errorText">{children}</p>
   <a id="errorLink" href="/help">Go to Help Center</a>
 </main>
 </div>;
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
