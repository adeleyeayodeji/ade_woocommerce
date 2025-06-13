jQuery(document).ready(function ($) {
  $("#ade_install_woocommerce").click(function (e) {
    e.preventDefault();
    var nounce_url = ade_custom_params.nounce_url;
    $.ajax({
      type: "GET",
      url: nounce_url,
      beforeSend: () => {
        console.log("Installing...");
      },
      success: function (response) {
        console.log(response);
      },
      error: (e) => {
        console.error(e);
      }
    });
  });

  //Maybe Later
  $("#ade_custom_later").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: ade_custom_params.ajax_url,
      data: {
        action: "maybe_later"
      },
      beforeSend: () => {
        $(".ade_custom").fadeOut();
      },
      success: function (response) {
        // console.log(response);
      }
    });
  });

  /**
   * Update wc shipping element selections
   *
   */
  let update_wc_shipping_fields = () => {
    //check if element exist .form-table.wc-shipping-zone-settings
    if ($(".form-table.wc-shipping-zone-settings").length) {
      //wctable
      let wcformtable = $(".form-table.wc-shipping-zone-settings");
      //find the first tr and append new after it
      let wcformtabletr = wcformtable.find("tr").first();
      //append new tr after the first tr
      wcformtabletr.after(
        `
        <tr valign="top" class="">
				<th scope="row" class="titledesc">
					<label for="zone_name">
						Custom Selections
					</label>
          <p class="wc-shipping-zone-help-text">
            Select all cities within a state
          </p>
				</th>
				<td class="forminp">
					<div class="ade-custom-shipping-wc-selections" id="ade-custom-shipping-wc-selections" style="display: flex; flex-direction: column; gap: 10px;">
            Loading selections...
          </div>
				</td>
			</tr>
        `
      );
    }
  };

  /**
   * Init Ade Selections on Weight Based Shipment Selections
   *
   */
  let add_ade_selection_weight_based = () => {
    //check if element exist tr wcformrow="Destination"
    if ($('tr[wcformrow="Destination"]').length) {
      //find the first tr and append new after it
      let wcformtabletr = $('tr[wcformrow="Destination"]');
      //get the first select element of wcformtabletr
      let select = wcformtabletr.find("select").first();
      //get select option
      let options = select.find("option:selected");
      //check if value is all
      if (options.val() == "all") {
        //check if ade-custom-shipping-selections exists
        if ($(".ade-custom-shipping-selections").length) {
          //hide ade-custom-shipping-selections
          $(".ade-custom-shipping-selections").closest("tr").hide();
        }
        return;
      }
      //check if element exists before wcformtabletr
      if ($(".ade-custom-shipping-selections").length) {
        //show ade-custom-shipping-selections
        $(".ade-custom-shipping-selections").closest("tr").show();
        return;
      }
      //append new tr after the first tr
      wcformtabletr.before(
        `
        <tr valign="top" class="">
        <th scope="row" class="titledesc">
          <label for="zone_name">
            Ade Custom Shipping Selections
          </label>
        </th>
        <td class="forminp">
          <div class="ade-custom-shipping-selections" id="ade-custom-shipping-selections">Loading...</div>
        </td>
      </tr>
        `
      );
    }
  };

  //use setinterval
  setInterval(() => {
    add_ade_selection_weight_based();
  }, 500);

  update_wc_shipping_fields();
});
