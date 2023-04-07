<?php
// add basic plugin security.
defined('ABSPATH') || exit;
?>
<h1>Ade Custom Shipping Pro</h1>
<div>
    <form action="" method="Post">
        <p>
            <input type="text" name="ade_activate" placeholder="Activation Code" style="width:40%;color:gainsboro;" id="">
            <br>
            <small class="small_ade_1" style="color:green;display:none;">Activated</small>
            <small class="small_ade_2" style="color:red;display:block;font-size: 20px;">Not
                activated, <a href="https://www.biggidroid.com/product/new-release-ade-custom-shipping-pro/" target="_blank" style="font-weight: bold;">Purchase
                    the pro plugin here with lifetime access</a></small>
        </p>
        <p>
            <input type="button" onclick="window.alert('Purchase the pro plugin here with lifetime access')" name="ade_activate_btn" class="button button-primary ade_activate_plugin" value="Activate">
        </p>
    </form>
</div>
<style>
    .ade-display-flex {
        display: flex;
    }

    .ade-custom-function {
        margin-left: 70px;
    }

    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
        .ade-display-flex {
            display: block;
        }

        .ade-custom-function {
            margin-left: 0px;
        }
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        .ade-display-flex {
            display: block;
        }

        .ade-custom-function {
            margin-left: 0px;
        }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        .ade-display-flex {
            display: block;
        }

        .ade-custom-function {
            margin-left: 0px;
        }
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        .ade-display-flex {
            display: flex;
        }

        .ade-custom-function {
            margin-left: 70px;
        }
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        .ade-display-flex {
            display: flex;
        }

        .ade-custom-function {
            margin-left: 70px;
        }
    }
</style>
<hr>
<div class="ade-display-flex">
    <div style="pointer-events: none !important;
  opacity: 0.5;
  background: #CCC;padding: 10px;" id="enclose">
        <p>Add, Remove and Edit LGA's only in Nigeria</p>
        <div style="margin-bottom: 10px;">
            <select name="ade_lgas" id="">
                <option value="">Select LGA to edit</option>
            </select>
            <div id="message" class="info notice" style="width: fit-content;margin-left:0px;">
                <p>Note:* Use comma "<b>,</b>" to seperate LGA's</p>
            </div>
            <div class="ade_loading" style="display:none;">
                <p>Loading...</p>
            </div>
        </div>
        <div>
            <textarea name="edit_lgas" id="" cols="30" rows="20" placeholder="Select to edit LGA"></textarea>
            <div id="message" class="updated ade_update_notice notice is-dismissible" style="width: fit-content;margin-left:0px;display:none;">
                <p>Data updated</p><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss
                        this
                        notice.</span></button>
            </div>
            <div id="message" class="error ade_update_notice_error notice is-dismissible" style="width: fit-content;margin-left:0px;display:none;">
                <p>Error updating data, contact <a href="https://adeleyeayodeji.com" target="_blank">Adeleye
                        Ayodeji</a>
                    Developer</p><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss
                        this
                        notice.</span></button>
            </div>
        </div>
        <br>
        <a href="javascript:;" class="button button-primary ade_submit">
            Update LGA
        </a>

    </div>
    <div class="ade-custom-function" style="opacity: 0.3;pointer-events: none !important;background: #CCC;padding: 10px;" id="enclose2">
        <h3>Ade Custom Functions</h3>
        <form action="" method="Post">
            <input type="hidden" name="adestate" value="1">
            <p>
                <label for="">Select LGA reference to hide</label> <br>

                <small style="color:chocolate">Use control + click to select multiple</small>
            </p>
            <select name="ade_lgas_state_reference[]" id="" multiple style="width: 240px;height: 270px;">
                <?php
                //get all wc state
                if (function_exists('WC')) {
                    $states = WC()->countries->get_states('NG');
                    foreach ($states as $key => $items) {
                ?>
                        <option value="<?php echo $key; ?>"><?php echo $items; ?>
                        </option>
                <?php
                    }
                }
                ?>
            </select>
            <p>
                <label for="">
                    <input type="checkbox" value="1">
                    <span>Disable State Reference</span>
                </label>
            </p>
            <p>
                <button type="button" class="button button-primary">Update Settings</button>
            </p>
        </form>
    </div>
    <div style="width: 100%;
    padding: 73px;
    padding-top: 0px;">
        <iframe style="width:100%;" height="315" src="https://www.youtube.com/embed/NvVKE6S1QUI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>