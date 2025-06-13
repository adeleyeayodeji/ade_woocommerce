/**
 * Init React App
 *
 */

import AdeCustomShippingSelections from "./components/AdeCustomShippingSelections";
import AdeWooCommerceShippingSelections from "./components/AdeWooCommerceShippingSelections";
jQuery(document).ready(function ($) {
  /**
   * Init Ade Custom Shipping Selections for weight based shipping zone settings
   *
   */
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

  /**
   * Init Ade Custom Shipping Selections for woocommerce shipping zone settings
   *
   */
  let ade_custom_shipping_fields_for_wc_core = () => {
    //check if element exist #ade-custom-shipping-wc-selections
    if ($("#ade-custom-shipping-wc-selections").length) {
      //get the element
      let element = document.getElementById(
        "ade-custom-shipping-wc-selections"
      );
      //check if element has inner element
      if (!element.hasChildNodes()) {
        //exist
        return;
      }
      //render the react app
      ReactDOM.render(<AdeWooCommerceShippingSelections />, element);
    }
  };

  //set interval
  setInterval(() => {
    ade_custom_shipping_selections();
    //init woocommerce shipping zone settings
    ade_custom_shipping_fields_for_wc_core();
  }, 1000);
});
