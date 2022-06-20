import React, {useState, useEffect} from "react";
import { Helmet } from "react-helmet";
import "./Ads.scss";

function Ads() {
	const [showAd, setShowAds] = useState(false);
    const [showAdButton, setShowAdButton] = useState(false);

    const closeAd = () => {
        setShowAds(false);
    }; // closing ad the ads

    useEffect(() => {
        setTimeout(() => {
            setShowAdButton(true)
        }, 43000);
    }, [setShowAdButton]); // delay skip button

    useEffect(() => {
        setTimeout(() => {
            setShowAds(true)
        }, 40000);        
    }, [setShowAds]); // delay ads

    if(!showAd) return null;

    // link: https://vlry5l4j5gbn.com/y7rjcc81kc?key=0b7ea5b739f283f3f7f991db1819c304

	return (
		<>
		<div className="homepage_cad" style={{ display: showAd ? "block" : "none" }} >
			<div className="carbon-cad">
				<div className="carbon-cad_close-btn" onClick={closeAd}>
					 <div className="skipad" style={{ display: showAdButton ? 'block' : 'none' }}>Skip Advertisement</div>
				</div>
                <iframe src="" width="100%" height="100%" frameBorder="0" sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-popups" />
				<div>
			</div>
			</div>
			</div>
		</>
    );
  }

export default Ads;