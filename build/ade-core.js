/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/AdeCustomShippingSelections.js":
/*!*******************************************************!*\
  !*** ./src/components/AdeCustomShippingSelections.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scss/styles.scss */ "./src/scss/styles.scss");




class AdeCustomShippingSelections extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
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
    this.setState({
      woocommerce_states
    });
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
    this.setState({
      formatted
    });
  };

  /**
   * loadpopup
   *
   * @returns void
   */
  loadpopup = event => {
    event.preventDefault();
    //load popup
    this.setState({
      popup: true
    });
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
    if (jQuery("#ade_custom_shipping_selections").hasClass("select2-hidden-accessible")) {
      return;
    }
    //init select2
    jQuery("#ade_custom_shipping_selections").select2();
  };

  /**
   * selectGroupRegions
   *
   */
  selectGroupRegions = event => {
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
      jQuery("select[data-placeholder='Select locations'] option").each(function () {
        if (jQuery(this).text().includes(region)) {
          //check again if nigeria is part of the current text
          if (jQuery(this).text().includes("Nigeria")) {
            jQuery(this).prop("selected", action_type === "add" ? true : false);
          }
        }
      });
      //trigger change
      jQuery("select[data-placeholder='Select locations']").trigger("change");
    }

    //check element exist #woocommerce-tree-select-control-0__control-input
    if (jQuery("#woocommerce-tree-select-control-0__control-input").length) {
      jQuery("#woocommerce-tree-select-control-0__control-input").trigger("focus");
      //add nigeria into field then trigger change
      jQuery("#woocommerce-tree-select-control-0__control-input").val("Nigeria");
      jQuery("#woocommerce-tree-select-control-0__control-input").trigger("change");
    }

    //check if element exists .components-base-control.woocommerce-tree-select-control__option
    if (jQuery(".components-base-control.woocommerce-tree-select-control__option").length) {
      //get all elements
      jQuery(".components-base-control.woocommerce-tree-select-control__option").each(function () {
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
      jQuery(".components-snackbar-list__notice-container").each(function (index, element) {
        //omit the last element
        if (index === 0) {
          return;
        }
        jquery(element).remove();
      });
      //show gutenberg toast
      wp.data.dispatch("core/notices").createNotice("success", "Group Regions Updated", {
        type: "snackbar",
        isDismissible: true,
        timeout: 100
      });
    } catch (error) {}
  };
  render() {
    const {
      popup,
      formatted
    } = this.state;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, popup && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
      title: "Select Group Regions",
      onRequestClose: () => this.setState({
        popup: false
      }),
      className: "ade-custom-shipping-selections"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "ade-custom-shipping-select-container"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      name: "ade_custom_shipping_selections",
      id: "ade_custom_shipping_selections"
    }, formatted.map((state, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: index,
      value: state
    }, state))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "ade-custom-shipping-action-type"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, "Action Type:"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      name: "ade_custom_shipping_action_type",
      id: "ade_custom_shipping_action_type"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "add"
    }, "Add"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "remove"
    }, "Remove"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: this.selectGroupRegions,
      className: "button button-primary"
    }, "Set Group Regions"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      style: {
        textAlign: "center"
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Note:"), " This will group the selected regions to Nigeria", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "https://www.adeleyeayodeji.com",
      target: "_blank"
    }, "Learn More"))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: this.loadpopup,
      className: "button button-primary"
    }, "Select Group Regions"));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdeCustomShippingSelections);

/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/ade-core.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_AdeCustomShippingSelections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AdeCustomShippingSelections */ "./src/components/AdeCustomShippingSelections.js");

/**
 * Init React App
 *
 */


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
      ReactDOM.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_AdeCustomShippingSelections__WEBPACK_IMPORTED_MODULE_1__["default"], null), element);
    }
  };

  //set interval
  setInterval(() => {
    ade_custom_shipping_selections();
  }, 1000);
});
})();

/******/ })()
;
//# sourceMappingURL=ade-core.js.map