/**
 * Ade Custom Shipping | adesetWooInputValues
 * @package Ade Custom Shipping
 */
function adesetWooInputValues() {
  jQuery(document).ready(function ($) {
    //get the state
    var state_select = $('select[name="billing_state"]');
    //if not exist
    if (!state_select.length) {
      return;
    }
    //get selected option
    var selected_option = state_select.find("option:selected").val();
    //check if selected_option is not empty
    if (selected_option == "") {
      //do nothing
      return;
    }
    //set value to input if exists
    if (document.querySelector("#billing_city")) {
      document.querySelector("#billing_city").value = selected_option;
    }
    //check if billing_city exists
    if (
      document.querySelector('form[name="checkout"] input[name="billing_city"]')
    ) {
      document.querySelector(
        'form[name="checkout"] input[name="billing_city"]'
      ).value = selected_option;
    }
    //state
    if (
      document.querySelector(
        'form[name="checkout"] input[name="billing_state"]'
      )
    ) {
      document.querySelector(
        'form[name="checkout"] input[name="billing_state"]'
      ).value = selected_option;
      //custom
    }
  });
}

function adesetValue2(elem) {
  jQuery(document).ready(function ($) {
    var lga = $(elem).val();
    var state = $('select[name="ade_custom_shipping_state2"]').val();
    var finaltext = lga + ", " + state;
    //find select[name='billing_state'] option with value and set it to selected
    $('select[name="billing_state"]')
      .find("option")
      .each(function (index, element) {
        if ($(element).val() == finaltext) {
          let element2 = document.querySelector('select[name="billing_state"]');
          element2.value = finaltext;
          element2.dispatchEvent(new Event("change"));
        } else {
          $(element).removeAttr("selected");
        }
      });
    //update selected option
    adesetWooInputValues();
    $(document.body).trigger("update_checkout");
  });
}

/**
 * Ade Custom Shipping | adesetValueBlock
 * @param {element} elem
 * @param {string} state
 * @package Ade Custom Shipping
 */
window.adesetValueBlock = (elem) => {
  jQuery(document).ready(function ($) {
    //get state
    var ade_state_block = $(".ade-custom-shipping-state").val();
    var lga = $(elem).val();
    var finaltext = lga + ", " + ade_state_block;
    //set value to city input
    $("input#shipping-city").val(finaltext);
    //find select[name='billing_state'] option with value and set it to selected
    $("select#shipping-state")
      .find("option")
      .each(function (index, element) {
        if ($(element).val() == finaltext) {
          //set selected
          $(element).attr("selected", "selected");
          let element2 = document.querySelector("select#shipping-state");
          element2.value = finaltext;
          element2.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          $(element).removeAttr("selected");
        }
      });
    //recalculate
    $("select#shipping-state").trigger("change");
    //recalculate
    $(document.body).trigger("update_checkout");
  });
};

jQuery(document).ready(function ($) {
  /**
   * Capture State Options
   * @param {element} elem
   * @param {string} selected_state
   *
   * @returns {mixed}
   */
  let captureStateOptions = (elem, selected_state = "") => {
    //initialize data_options
    var data_options = {
      state: ["Select State"],
      city: []
    };

    //check if selected_state is not empty
    if (selected_state != "") {
      //split selected_state
      var selected_state_split = selected_state.split(", ");
      var selected_state_name = selected_state_split[1];
    } else {
      var selected_state_name = "";
    }

    //get state options
    var wc_state_options = elem.find("option");
    wc_state_options.each(function (index, element) {
      var state_value = $(element).val();
      //split ", "
      var state_name = state_value.split(", ")[1];
      var state_lga = state_value.split(", ")[0];
      //if state_name is undefined skip
      if (state_name === undefined) {
        return;
      }
      //push to data_options
      data_options.state.push(state_name);
      data_options.city.push({
        state: state_name,
        lga: state_lga
      });
    });
    //array unique
    var unique_state = [...new Set(data_options.state)];
    var state_options = "";
    $.each(unique_state, function (indexInArray, valueOfElement) {
      state_options += `<option value="${valueOfElement}" ${
        selected_state_name == valueOfElement ? `selected` : ""
      }>${valueOfElement}</option>`;
    });
    //return state_options
    return {
      state: state_options,
      city: data_options.city
    };
  };

  //capture state options
  var default_state_options = captureStateOptions(
    $("select[name='billing_state']")
  );

  $("#billing_country_field").after(`
        <p class="form-row address-field validate-required validate-state form-row-wide woocommerce-validated" id="ade_custom_shipping_state2">
          <label for="ade_custom_shipping_state2">State <abbr class="required" title="required">*</abbr></label>
          <span class="woocommerce-input-wrapper">
            <select name="ade_custom_shipping_state2" class="state_select">
                ${default_state_options.state}
            </select>
          </span>
        </p>
      `);

  let do_ade_calculation = (state, lga) => {
    //set placeholder for lga
    lga = `<option value="0">Select Town / City</option>`;
    //loop through data_options.city
    $.each(default_state_options.city, function (indexInArray, valueOfElement) {
      if (valueOfElement.state === state) {
        lga += `<option value="${valueOfElement.lga}">${valueOfElement.lga}</option>`;
      }
    });
    //check if ade_custom_shipping_lga2 element exists
    if (!$("#ade_custom_shipping_lga2").length) {
      $("#ade_custom_shipping_state2").after(`
        <p class="form-row address-field validate-required validate-state form-row-wide woocommerce-validated" id="ade_custom_shipping_lga2" >
          <label for="ade_custom_shipping_lga2">Town / City <abbr class="required" title="required">*</abbr></label>
          <span class="woocommerce-input-wrapper">
            <select name="ade_custom_shipping_lga2" class="lga_select" style="    width: 100% !important;" onchange="adesetValue2(this)">
                ${lga}
            </select>
          </span>
        </p>
      `);
      //select2 init
      $('select[name="ade_custom_shipping_lga2"]').select2({
        placeholder: "Select Town / City"
      });
      //check if select[name="ade_custom_shipping_lga2"] has selected option
      if ($('select[name="ade_custom_shipping_lga2"] option:selected').val()) {
        setTimeout(() => {
          //trigger change
          $('select[name="ade_custom_shipping_lga2"]').trigger("change");
        }, 500);
      }
    } else {
      $('select[name="ade_custom_shipping_lga2"]').html(lga);
      //update select2
      $('select[name="ade_custom_shipping_lga2"]').select2({
        placeholder: "Select Town / City"
      });

      //check if select[name="ade_custom_shipping_lga2"] has selected option
      if ($('select[name="ade_custom_shipping_lga2"] option:selected').val()) {
        setTimeout(() => {
          //trigger change
          $('select[name="ade_custom_shipping_lga2"]').trigger("change");
        }, 500);
      }
    }

    //recalculate
    $(document.body).trigger("update_checkout");
  };

  $('select[name="ade_custom_shipping_state2"]').change(function (e) {
    e.preventDefault();
    var state = $(this).val();
    var lga = "";
    do_ade_calculation(state, lga);
  });

  //checking
  setInterval(() => {
    let c = $("select[name='billing_country']");
    let country;
    if (c.length > 0) {
      country = c.find("option:selected").val();
    } else {
      country = "NG";
    }

    if (country == "NG") {
      //hide c
      $("#billing_state_field").hide();
      $("#billing_city_field").hide();
      $("#ade_custom_shipping_lga2").show();
      $("#ade_custom_shipping_state2").show();
    } else {
      //show c
      $("#billing_state_field").show();
      $("#billing_city_field").show();
      $("#ade_custom_shipping_lga2").hide();
      $("#ade_custom_shipping_state2").hide();
    }
  }, 300);

  setTimeout(() => {
    if (ade_billing_state != "") {
      var state = ade_billing_state;
      var lga = "";
      do_ade_calculation(state, lga);
    }
    adesetWooInputValues();
  }, 1000);

  /**
   * WooCommerce City Select Block Element
   * @param {string} state
   * @param {string} lga
   * @returns {void}
   * @description Update the city select block element
   */
  window.updateCitySelectBlockElement = (state, lga) => {
    //check if element is not a string
    if (typeof state !== "string" || state == "" || state == null) {
      //return
      return;
    }

    var blockShippingCity = $(
      ".wc-block-components-text-input.wc-block-components-address-form__city"
    );
    //check if blockShippingCity exists
    if (blockShippingCity.length > 0) {
      //hide blockShippingCity
      blockShippingCity.hide();

      //set placeholder for lga
      lga_block = `<option value="0">Select Town / City</option>`;
      //loop through data_options.city
      $.each(
        window.default_state_options_2.city,
        function (indexInArray, valueOfElement) {
          if (valueOfElement.state === state) {
            lga_block += `<option value="${valueOfElement.lga}">${valueOfElement.lga}</option>`;
          }
        }
      );

      //check if .ade-custom-shipping-city
      if ($(".ade-custom-shipping-city").length > 0) {
        $(".ade-custom-shipping-city").html(lga_block);
        //return
        return;
      }

      //add new select after blockShippingCity
      blockShippingCity.after(`
              <div class="wc-block-components-address-form__country wc-block-components-country-input ade-custom-shipping-city-container"><div class="wc-blocks-components-select"><div class="wc-blocks-components-select__container"><label for="shipping-country" class="wc-blocks-components-select__label">Town / City</label>
              <select size="1" class="wc-blocks-components-select__select ade-custom-shipping-city" id="ade-custom-shipping-city" aria-invalid="false" autocomplete="address-level2" onchange="window.adesetValueBlock(this, '${state}')">
                ${lga_block}
              </select>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="wc-blocks-components-select__expand" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg></div></div></div>
            `);
    }
  };

  /**
   * WooCommerce Block Checkout Filter
   *
   */
  let moveAddressFormCity = () => {
    var addressFormCity = $(
      ".wc-block-components-text-input.wc-block-components-address-form__city"
    );
    //get address form state
    var addressFormState = $(
      ".wc-block-components-address-form__state.wc-block-components-state-input"
    );
    //get selected shipping-country
    var shippingCountry = $("select#shipping-country")
      .find("option:selected")
      .val();

    //check if addressFormCity and addressFormState exist
    if (
      addressFormCity.length > 0 &&
      addressFormState.length > 0 &&
      shippingCountry == "NG"
    ) {
      //also check if addressFormCity is after addressFormState
      if (addressFormCity.index() < addressFormState.index()) {
        //switch node position, move addressFormCity after addressFormState
        addressFormCity.insertAfter(addressFormState);
        // //get select id shipping-state
        var shippingState = $("select#shipping-state");
        //get selected shipping-state
        var shippingStateValue = shippingState.find("option:selected").val();

        //capture state options
        window.default_state_options_2 = captureStateOptions(shippingState, "");
        //hide shippingState
        shippingState.hide();

        //check if element exists with .ade-custom-shipping-state
        if ($(".ade-custom-shipping-state").length > 0) {
          //return false
          return false;
        }

        //add new select after shippingState
        shippingState.after(`
         <select size="1" class="wc-blocks-components-select__select ade-custom-shipping-state" id="ade-custom-shipping-state" onchange="updateCitySelectBlockElement(this.value, '')" aria-invalid="false" autocomplete="address-level1">
              ${default_state_options_2.state}
          </select>
        `);
      }
    } else {
      //revert all changes
      $(".ade-custom-shipping-city-container").remove();
      $(".ade-custom-shipping-state").remove();
      //show shippingState
      $("select#shipping-state").show();
      //show shippingCity
      $(
        ".wc-block-components-text-input.wc-block-components-address-form__city"
      ).show();
    }
  };

  //set timeout to move addressFormCity
  setInterval(() => {
    moveAddressFormCity();
  }, 500);
});
