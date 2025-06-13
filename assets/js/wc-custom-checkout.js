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

jQuery(document).ready(function ($) {
  /**
   * Capture State Options
   * @param {element} elem
   * @param {boolean} isBlock
   *
   * @returns {mixed}
   */
  let captureStateOptions = (elem, isBlock = false) => {
    //initialize data_options
    var data_options = {
      state: ["Select State"],
      city: []
    };
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
        isBlock ? `data-alternate-values='[${valueOfElement}]'` : ""
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
    //check if addressFormCity and addressFormState exist
    if (addressFormCity.length > 0 && addressFormState.length > 0) {
      //also check if addressFormCity is after addressFormState
      if (addressFormCity.index() < addressFormState.index()) {
        //switch node position, move addressFormCity after addressFormState
        addressFormCity.insertAfter(addressFormState);
        // //get select id shipping-state
        var shippingState = $("select#shipping-state");
        //capture state options
        var default_state_options_2 = captureStateOptions(shippingState);
        //hide shippingState
        shippingState.hide(() => {
          //add new select after shippingState
          shippingState.after(`
         <select size="1" class="wc-blocks-components-select__select" id="ade-custom-shipping-state" aria-invalid="false" autocomplete="address-level1">
              ${default_state_options_2.state}
          </select>
        `);
        });
      }
    }
  };

  //set timeout to move addressFormCity
  setTimeout(() => {
    moveAddressFormCity();
  }, 3000);
});
