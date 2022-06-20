import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Seo from "../Seo";
import "./Questions.scss";

class Questions extends Component {
  render() {
    return (
    <div className="container help-center">
    <Seo 
      title="Help Center"
      descriptions="The frequently asked Questions (FAQs) on this page are for a general public and find answers."
      />
    <h1>Help Center</h1>
  <div class="wrapper">

  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-11" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-11">
        <h2 class="faq-titulo">What is SHOOW!?</h2>
      </label>
      <p class="faq-conteudo">
      <span style={{'color': '#4784ff'}}><b>Shoow!</b></span> another streaming site that delivers Movies and TV programs for free but it's not entirely legal. 
      If you want better service in <b>legal way</b>. It's better to subcribe to <b>HBO, Netflix, Hulu, Amazon, Apple, Disney. </b>
       Go to theaters or rent a movies!</p>
    </div>
  </div>

  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-1" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-1">
        <h2 class="faq-titulo">Is it safe to stream & downloading in this website?</h2>
      </label>
      <p class="faq-conteudo">
      Using this website is safe for users to stream. 
      But downloading, uploading & distribute it is illegal. 
      Users will not get into any trouble while using our website. 
      It's highly not recommended to download the files and share them to public, 
      It might get you in trouble.</p>
    </div>
  </div>
  
  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-2" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-2"><h2 class="faq-titulo">How Shoow! works?</h2></label>
      <p class="faq-conteudo">
        The contents being serve are from non-affiliated third-parties. [Vidcloud, Hydrax] The creator of the site are <b>not making any profits</b>. 
        All the advertisements (Ex. Pop-ups, Banners) are from the hosting site.</p>
    </div>
  </div>
  
  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-3" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-3">
        <h2 class="faq-titulo">There's so many advertisements.</h2>
      </label>
      <p class="faq-conteudo">We are very sorry that we cant help you with that. 
      We have no control in the ads being serve. 
      (Might be a Malware, Porn Ads) Don't download anything in the popups. If you don't want to be annoyed. 
      I highly recommended to subscribe in legal streaming site that you can afford. <br /><br /><div style={{'color': '#4784ff'}}>(Yes, It's worth it!)</div></p>
    </div>
  </div>

  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-4" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-4">
        <h2 class="faq-titulo">Why Movies or TV-shows sometimes loads slow?</h2>
      </label>
      <p class="faq-conteudo">Movies or TV shows loads depend on your internet connection. It usually takes 3 - 10 seconds on some devices with an average connection, so please be patient.</p>
    </div>
  </div>


  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-5" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-5">
        <h2 class="faq-titulo">I can't access the site, please help!</h2>
      </label>
      <p class="faq-conteudo">Try to switch your browser (Chrome, Firefox and ETC).</p>
    </div>
  </div>



  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-6" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-6">
        <h2 class="faq-titulo">I experience bugs or errors. What should I do now?</h2>
      </label>
      <p class="faq-conteudo">
      If you experience fuzzy bugs you can try to clear your cache first then try to open it and if the bug still appears please report it to us so we can fix it immediately.
      </p>
    </div>
  </div>

  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-8" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-8">
        <h2 class="faq-titulo">Disclaimer</h2>
      </label>
      <p class="faq-conteudo">
      This site does not store any files on its server. All contents are provided by non-affiliated third parties and all files is already circulating online! </p>
    </div>
  </div>

  <div class="lista-item">
    <input class="trigger-input" id="faq-titulo-7" type="checkbox" />
    <div class="trigger-wrapper">
      <label for="faq-titulo-7">
        <h2 class="faq-titulo">Connect with Us!</h2>
      </label>
      <p class="faq-conteudo">Follow us in:<br />
      <div style={{'color': '#4784ff'}}>
         <a href="https://discord.gg/cjYvT7XWPE" target="_">Discord.</a>
       </div>
       </p>
    </div>
  </div>
</div>
      </div>
    );
  }
}

export default withRouter(Questions);
