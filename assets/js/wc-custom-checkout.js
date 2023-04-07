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
    //get selected option
    var selected_option = $('select[name="billing_state"]')
      .find("option:selected")
      .val();
    document.querySelector("#billing_city").value = selected_option;
    //form name="checkout" input name billing_city
    //custom
    document.querySelector(
      'form[name="checkout"] input[name="billing_city"]'
    ).value = selected_option;
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
    $(document.body).trigger("update_checkout");
  });
}

jQuery(document).ready(function ($) {
  var data_options = {
    state: ["Select State"],
    city: []
  };
  var wc_state_options = $("select[name='billing_state']").find("option");
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
      valueOfElement == ade_billing_state ? "selected" : ""
    }>${valueOfElement}</option>`;
  });
  $("#billing_country_field").after(`
        <p class="form-row address-field validate-required validate-state form-row-wide woocommerce-validated" id="ade_custom_shipping_state2">
          <label for="ade_custom_shipping_state2">State <abbr class="required" title="required">*</abbr></label>
          <span class="woocommerce-input-wrapper">
            <select name="ade_custom_shipping_state2" class="state_select">
                ${state_options}
            </select>
          </span>
        </p>
      `);

  let do_ade_calculation = (state, lga) => {
    $.each(data_options.city, function (indexInArray, valueOfElement) {
      if (valueOfElement.state === state) {
        lga += `<option value="${valueOfElement.lga}" ${
          valueOfElement.lga == ade_billing_city ? "selected" : ""
        }>${valueOfElement.lga}</option>`;
      }
    });
    //check if ade_custom_shipping_lga2 element exists
    if (!$("#ade_custom_shipping_lga2").length) {
      $("#ade_custom_shipping_state2").after(`
        <p class="form-row address-field validate-required validate-state form-row-wide woocommerce-validated" id="ade_custom_shipping_lga2" >
          <label for="ade_custom_shipping_lga2">City <abbr class="required" title="required">*</abbr></label>
          <span class="woocommerce-input-wrapper">
            <select name="ade_custom_shipping_lga2" class="lga_select" style="    width: 100% !important;" onchange="adesetValue2(this)">
                ${lga}
            </select>
          </span>
        </p>
      `);
      //select2 init
      $('select[name="ade_custom_shipping_lga2"]').select2({
        placeholder: "Select City"
      });
    } else {
      $('select[name="ade_custom_shipping_lga2"]').html(lga);
      //update select2
      $('select[name="ade_custom_shipping_lga2"]').select2({
        placeholder: "Select City"
      });
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
  }, 1000);
});
