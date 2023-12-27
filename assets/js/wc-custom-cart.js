function adesetValue(elem) {
  jQuery(document).ready(function ($) {
    var lga = $(elem).val();
    var state = $('select[name="ade_custom_shipping_state"]').val();
    var finaltext = lga + ", " + state;
    //find select[name='calc_shipping_state'] option with value and set it to selected
    $('select[name="calc_shipping_state"]')
      .find("option")
      .each(function (index, element) {
        if ($(element).val() == finaltext) {
          let element2 = document.querySelector(
            'select[name="calc_shipping_state"]'
          );
          element2.value = finaltext;
          element2.dispatchEvent(new Event("change"));
        } else {
          $(element).removeAttr("selected");
        }
      });
    //get selected option
    var selected_option = $('select[name="calc_shipping_state"]')
      .find("option:selected")
      .val();
  });
}

function initCartArea() {
  jQuery(document).ready(function ($) {
    var data_options = {
      state: [],
      city: []
    };
    var wc_state_options = $("select[name='calc_shipping_state']").find(
      "option"
    );
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
      state_options += `<option value="${valueOfElement}">${valueOfElement}</option>`;
    });
    //check if element exists
    if (!$("select[name='ade_custom_shipping_state']").length) {
      $("#calc_shipping_state_field").after(`
        <p class="form-row validate-required address-field form-row-wide" id="ade_custom_shipping_state" >
          <label for="ade_custom_shipping_state">State</label>
          <select name="ade_custom_shipping_state" class="ade_state_select" style="width: 100% !important;">
              ${state_options}
          </select>
        </p>
      `);
      //select2
      $(".ade_state_select").select2({
        placeholder: "Select State",
        allowClear: true
      });

      //check if ade_state_select has selected option
      if ($(".ade_state_select option:selected").val()) {
        setTimeout(() => {
          //trigger change
          $(".ade_state_select").trigger("change");
        }, 500);
      }
    }
    $('select[name="ade_custom_shipping_state"]').change(function (e) {
      e.preventDefault();
      var state = $(this).val();
      var lga = "";
      $.each(data_options.city, function (indexInArray, valueOfElement) {
        if (valueOfElement.state === state) {
          lga += `<option value="${valueOfElement.lga}">${valueOfElement.lga}</option>`;
        }
      });
      //check if ade_custom_shipping_lga element exists
      if (!$("#ade_custom_shipping_lga").length) {
        $("#ade_custom_shipping_state").after(`
        <p class="form-row validate-required address-field form-row-wide" id="ade_custom_shipping_lga" >
          <label for="ade_custom_shipping_lga">City</label>
          <select name="ade_custom_shipping_lga" class="lga_select" style="    width: 100% !important;" onchange="adesetValue(this)">
              ${lga}
          </select>
        </p>
      `);
        //select2 init
        $('select[name="ade_custom_shipping_lga"]').select2({
          placeholder: "Select City"
        });

        //check if select[name="ade_custom_shipping_lga"] has selected option
        if ($('select[name="ade_custom_shipping_lga"] option:selected').val()) {
          setTimeout(() => {
            //trigger change
            $('select[name="ade_custom_shipping_lga"]').trigger("change");
          }, 500);
        }
      } else {
        $('select[name="ade_custom_shipping_lga"]').html(lga);
        //update select2
        $('select[name="ade_custom_shipping_lga"]').select2({
          placeholder: "Select City"
        });

        //check if select[name="ade_custom_shipping_lga"] has selected option
        if ($('select[name="ade_custom_shipping_lga"] option:selected').val()) {
          setTimeout(() => {
            //trigger change
            $('select[name="ade_custom_shipping_lga"]').trigger("change");
          }, 500);
        }
      }
    });
    //checking
    setInterval(() => {
      let c = $("select[name='calc_shipping_country']");
      let country = c.find("option:selected").val();
      if (country == "NG") {
        //hide c
        $("#calc_shipping_state_field").hide();
        $("#calc_shipping_city_field").hide();
        $("#ade_custom_shipping_lga").show();
        $("#ade_custom_shipping_state").show();
      } else {
        //show c
        $("#calc_shipping_state_field").show();
        $("#calc_shipping_city_field").show();
        $("#ade_custom_shipping_lga").hide();
        $("#ade_custom_shipping_state").hide();
      }
    }, 300);
  });
}
//init cart area
initCartArea();

setInterval(() => {
  //add attribute onclick
  jQuery(document).ready(function ($) {
    var button = $(".shipping-calculator-button");
    //check if attribute exists
    if (!button.attr("onclick")) {
      button.attr("onclick", "initCartArea()");
      // console.log("Clicked");
    }
  });
}, 300);
