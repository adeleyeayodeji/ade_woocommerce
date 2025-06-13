import React, { useEffect, useState } from "react";
import { decodeEntities } from "@wordpress/html-entities";
import { Modal, Button, Spinner } from "@wordpress/components";

/**
 * ADE Custom Shipping Selections
 *
 * WooCommerce Shipping Selections
 *
 * @returns {JSX.Element}
 */
export default function AdeWooCommerceShippingSelections() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState("replace");

  /**
   * Formatted states
   *
   * @type {Object}
   */
  var formatted_states = Object.keys(
    ade_custom_params.woocommerce_formatted_states
  ).map((state) => {
    return {
      label: state,
      value: state
    };
  });

  /**
   * Recursively transform labels
   *
   * @param {Object} node
   * @param {Function} transform
   * @returns {Object}
   */
  const recursivelyTransformLabels = (node, transform) => {
    if (Array.isArray(node)) {
      return node.map((element) => {
        return recursivelyTransformLabels(element, transform);
      });
    }
    if (node.label) {
      node.label = transform(node.label);
    }
    if (node.children) {
      node.children = recursivelyTransformLabels(node.children, transform);
    }
    return node;
  };

  /**
   * Init select2
   *
   */
  const initSelect2 = () => {
    //init select2
    jQuery("#ade-custom-shipping-woocommerce-selections").select2({
      width: "resolve",
      placeholder: "Select a state or action",
      allowClear: true
    });

    //on change
    jQuery("#ade-custom-shipping-woocommerce-selections").on("change", (e) => {
      handleChange(e);
    });
  };

  /**
   * Handle change
   *
   * @param {Object} e
   */
  const handleChange = (e) => {
    const selectedValue = e.target.value;

    const allOptions =
      recursivelyTransformLabels(
        window.shippingZoneMethodsLocalizeScript?.region_options,
        decodeEntities
      ) ?? [];

    //if selectedValue is remove-all, set selectedValues to empty array
    if (selectedValue === "remove-all") {
      setSelectedValues([]);
      setIsModalOpen(true);
      return;
    }

    //get value where object has label Africa
    const africa = allOptions.find((option) => option.label === "Africa");

    //get value with label Nigeria
    const nigeria = africa.children.find(
      (option) => option.label === "Nigeria"
    );

    //get value with string position of Abia
    const selectedOptions = nigeria.children.filter((option) =>
      option.value.includes(selectedValue)
    );

    //extract value from selectedOptions
    const selectedValues = selectedOptions.map((option) => option.value);

    //set selectedValues
    setSelectedValues(selectedValues);

    //open modal
    setIsModalOpen(true);
  };

  /**
   * Close modal
   *
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Reload page
   *
   */
  const reloadPage = () => {
    //set isLoading to true
    setIsLoading(true);

    let initialValues =
      window.shippingZoneMethodsLocalizeScript?.locations ?? [];

    //update initialValues with selectedValues
    if (selectedAction === "append") {
      initialValues.push(...selectedValues);
    } else {
      initialValues = selectedValues;
    }

    //set selectedValues
    document.body.dispatchEvent(
      new CustomEvent("wc_region_picker_update", {
        detail: initialValues
      })
    );

    //click on the save button .wc-shipping-zone-method-save
    const saveButton = document.querySelector(
      "button.wc-shipping-zone-method-save"
    );

    if (saveButton) {
      saveButton.click();
    }

    //wait for 2 seconds
    setTimeout(() => {
      //reload page
      window.location.reload();
    }, 2000);
  };

  /**
   * On mounted
   *
   */
  useEffect(() => {
    //init select2
    initSelect2();
  }, []);

  /**
   * Render
   *
   */
  return (
    <div className="ade-custom-shipping-woocommerce-selections-wrapper">
      {/* Modal */}
      {isModalOpen && (
        <Modal title="Page Reload Required" onRequestClose={closeModal}>
          <p style={{ marginTop: 0 }}>
            A page reload is required to apply the changes.
            <br />
            Please select an action to proceed.
          </p>
          {selectedValues.length > 0 && (
            <select
              value={selectedAction}
              style={{ width: "100%", marginBottom: "20px" }}
              onChange={(e) => {
                setSelectedAction(e.target.value);
              }}>
              <option value="append">Append to existing cities</option>
              <option value="replace">Replace existing cities</option>
            </select>
          )}
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={reloadPage} isPrimary>
              Reload Page
            </Button>
          )}
        </Modal>
      )}
      {/* Select */}
      <select
        id="ade-custom-shipping-woocommerce-selections"
        style={{ width: "100%", maxWidth: "600px" }}>
        <option value="">Select a state or action</option>
        <option value="remove-all">Remove all cities - action</option>
        {formatted_states.map((state) => {
          return <option value={state.value}>{state.label}</option>;
        })}
      </select>
      <small className="wc-shipping-zone-help-text">
        Select all cities within the state.
        <br />
        <strong>Note:</strong> You can always leave this field empty
      </small>
    </div>
  );
}
