import React from "react";
import MediaQuery from "react-responsive";

export const Desktop = props => <MediaQuery {...props} minWidth={992} />;
export const MediumRes = props => <MediaQuery {...props} minWidth={992} />;
export const Mobile = props => <MediaQuery {...props} maxWidth={991} />;

