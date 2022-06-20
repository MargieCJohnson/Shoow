import React from "react";
import Helmet from "react-helmet";

const Seo = ({ title, pathSlug, crawl, coverImg, keywords, descriptions }) => {
		const updatedKeywords = keywords ? keywords : descriptions;
		const isIndex = crawl == "no" ? "noindex, nofollow" : "index, follow";
		const isCoverImg = coverImg ? coverImg : "/cover.png";
		const currentURL = window.location.href;
		
	return (
		<Helmet htmlAttributes={{ lang: 'en' }}>
		<title>{title} | Shoow!</title>
		<meta name="robots" content={isIndex} />
		<link rel="canonical" href={currentURL} />
		<meta name="description" content={descriptions} />
		<meta name="keywords" content={updatedKeywords} />

		<meta property="og:type" content="website" />
		<meta property="og:url" content={currentURL} />
		<meta property="og:title" content={`${title} | Shoow!`} />
		<meta property="og:description" content={descriptions} />
		<meta property="og:image" content={isCoverImg} />

		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content={currentURL} />
		<meta property="twitter:title" content={`${title} | Shoow!`} />
		<meta property="twitter:description" content={descriptions} />
		<meta property="twitter:image" content={isCoverImg} />
		</Helmet>
 );
}
export default Seo;
