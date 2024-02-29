import React from "react";
import {
  Modal,
  SearchControl,
  __experimentalScrollable as Scrollable,
  Spinner,
  Snackbar,
  __experimentalItemGroup as ItemGroup,
  __experimentalItem as Item
} from "@wordpress/components";
import "../scss/styles.scss";

class AdeCustomShippingSelections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      woocommerce_states: {},
      formatted: []
    };
  }

  //component will mount
  componentWillMount() {
    //get woocommerce states
    const woocommerce_states = ade_custom_params.woocommerce_states;
    //set the state
    this.setState({ woocommerce_states });
  }

  // componentDidMount
  componentDidMount() {
    //update the wc states
    this.update_wc_states();
  }

  //component mounted
  componentDidUpdate() {
    //listen to pop up changes
    if (this.state.popup) {
      //init select2
      this.initSelect2();
    }
  }

  /**
   * Update wc states to formatted
   *
   */
  update_wc_states = () => {
    //get woocommerce states
    const woocommerce_states = this.state.woocommerce_states;
    //loop through the woocommerce states
    let formatted = [];
    for (let key in woocommerce_states) {
      //explode key by ,
      let explode = key.split(",");
      //get the last element
      let last = explode[explode.length - 1];
      //remove the first space in last
      var split_space = last.split(" ");
      //remove the first index of split_space and join the rest
      last = split_space.slice(1).join(" ");
      //push to formatted
      formatted.push(last);
    }
    //unique formatted
    formatted = [...new Set(formatted)];
    //update the state
    this.setState({ formatted });
  };

  /**
   * loadpopup
   *
   * @returns void
   */
  loadpopup = (event) => {
    event.preventDefault();
    //load popup
    this.setState({ popup: true });
  };

  /**
   * initSelect2
   *
   * @returns void
   */
  initSelect2 = () => {
    //check if select2 is loaded
    if (typeof jQuery.fn.select2 === "undefined") {
      return;
    }
    //check if select2 is already initialized
    if (
      jQuery("#ade_custom_shipping_selections").hasClass(
        "select2-hidden-accessible"
      )
    ) {
      return;
    }
    //init select2
    jQuery("#ade_custom_shipping_selections").select2();
  };

  /**
   * selectGroupRegions
   *
   */
  selectGroupRegions = (event) => {
    event.preventDefault();
    //value
    let region = jQuery("#ade_custom_shipping_selections").val();
    //action type
    let action_type = jQuery("#ade_custom_shipping_action_type").val();
    //check if jQuery("select[name='zone_locations']") exists
    if (jQuery("select[name='zone_locations']").length) {
      //check select name 'zone_locations' with contain region and select it
      jQuery("select[name='zone_locations'] option").each(function () {
        if (jQuery(this).text().includes(region)) {
          //check again if nigeria is part of the current text
          if (jQuery(this).text().includes("Nigeria")) {
            jQuery(this).prop("selected", action_type === "add" ? true : false);
          }
        }
      });
      //trigger change
      jQuery("select[name='zone_locations']").trigger("change");
    }
    //cehck if exist select[data-placeholder='Select locations'] option
    if (jQuery("select[data-placeholder='Select locations']").length) {
      //check select name 'zone_locations' with contain region and select it
      jQuery("select[data-placeholder='Select locations'] option").each(
        function () {
          if (jQuery(this).text().includes(region)) {
            //check again if nigeria is part of the current text
            if (jQuery(this).text().includes("Nigeria")) {
              jQuery(this).prop(
                "selected",
                action_type === "add" ? true : false
              );
            }
          }
        }
      );
      //trigger change
      jQuery("select[data-placeholder='Select locations']").trigger("change");
    }

    //check element exist #woocommerce-tree-select-control-0__control-input
    if (jQuery("#woocommerce-tree-select-control-0__control-input").length) {
      jQuery("#woocommerce-tree-select-control-0__control-input").trigger(
        "focus"
      );
      //add nigeria into field then trigger change
      jQuery("#woocommerce-tree-select-control-0__control-input").val(
        "Nigeria"
      );
      jQuery("#woocommerce-tree-select-control-0__control-input").trigger(
        "change"
      );
    }

    //check if element exists .components-base-control.woocommerce-tree-select-control__option
    if (
      jQuery(".components-base-control.woocommerce-tree-select-control__option")
        .length
    ) {
      //get all elements
      jQuery(
        ".components-base-control.woocommerce-tree-select-control__option"
      ).each(function () {
        console.log("get all elements");
        //get the text
        let elementLabel = $(this).find("label").text();
        console.log(elementLabel);
      });
    } else {
      console.log("no elements found");
    }

    //show success message
    try {
      //remove previous notices
      //get all components-snackbar-list__notice-container
      jQuery(".components-snackbar-list__notice-container").each(
        function (index, element) {
          //omit the last element
          if (index === 0) {
            return;
          }
          jquery(element).remove();
        }
      );
      //show gutenberg toast
      wp.data
        .dispatch("core/notices")
        .createNotice("success", "Group Regions Updated", {
          type: "snackbar",
          isDismissible: true,
          timeout: 100
        });
    } catch (error) {}
  };

  render() {
    const { popup, formatted } = this.state;
    return (
      <>
        {popup && (
          <Modal
            title="Select Group Regions"
            onRequestClose={() => this.setState({ popup: false })}
            className="ade-custom-shipping-selections">
            <div className="ade-custom-shipping-select-container">
              <select
                name="ade_custom_shipping_selections"
                id="ade_custom_shipping_selections">
                {formatted.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <div className="ade-custom-shipping-action-type">
                <label>Action Type:</label>
                <select
                  name="ade_custom_shipping_action_type"
                  id="ade_custom_shipping_action_type">
                  <option value="add">Add</option>
                  <option value="remove">Remove</option>
                </select>
              </div>

              <button
                onClick={this.selectGroupRegions}
                className="button button-primary">
                Set Group Regions
              </button>
              <p style={{ textAlign: "center" }}>
                <small>
                  <strong>Note:</strong> This will group the selected regions to
                  Nigeria
                  <br />
                  <a href="https://www.adeleyeayodeji.com" target="_blank">
                    Learn More
                  </a>
                </small>
              </p>
            </div>
          </Modal>
        )}
        <button onClick={this.loadpopup} className="button button-primary">
          Select Group Regions
        </button>
      </>
    );
  }
}

export default AdeCustomShippingSelections;
