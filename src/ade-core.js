/**
 * Init React App
 *
 */

import AdeCustomShippingSelections from "./components/AdeCustomShippingSelections";

jQuery(document).ready(function ($) {
  let ade_custom_shipping_selections = () => {
    //check if element exist #ade-custom-shipping-selections
    if ($("#ade-custom-shipping-selections").length) {
      //get the element
      let element = document.getElementById("ade-custom-shipping-selections");
      //check if element has inner element
      if (!element.hasChildNodes()) {
        //exist
        return;
      }
      //render the react app
      ReactDOM.render(<AdeCustomShippingSelections />, element);
    }
  };

  //set interval
  setInterval(() => {
    ade_custom_shipping_selections();
  }, 1000);
});
