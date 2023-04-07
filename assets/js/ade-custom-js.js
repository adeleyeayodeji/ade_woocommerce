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
});
