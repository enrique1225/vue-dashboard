"use strict";

var KTLayoutAsideToggle = function() {
    // Private properties
    var _body;
    var _element;
    var _toggleObject;

    // Initialize
    var _init = function() {
        _toggleObject = new KTToggle(_element, {
            target: _body,
            targetState: 'aside-minimize',
            toggleState: 'active'
        });

        _toggleObject.on('toggle', function(toggle) {
            // Update sticky card
            if (typeof KTLayoutStickyCard !== 'undefined') {
                KTLayoutStickyCard.update();
            }

            // Pause header menu dropdowns
            if (typeof KTLayoutHeaderMenu !== 'undefined') {
                KTLayoutHeaderMenu.pauseDropdownHover(800);
            }

            // Pause aside menu dropdowns
            if (typeof KTLayoutAsideMenu !== 'undefined') {
                KTLayoutAsideMenu.pauseDropdownHover(800);
            }

            var element = document.getElementById("hide-menu");
            var load_logo = document.getElementById("loading-logo");
            if (element.classList.contains("hide") == false) {
                element.classList.add("hide");
                load_logo.classList.add("hide");
            } else {
                element.classList.remove("hide");
                load_logo.classList.remove("hide");
            }
        });

        _toggleObject.on('beforeToggle', function(toggle) {
            if (KTUtil.hasClass(_body, 'aside-minimize') === false && KTUtil.hasClass(_body, 'aside-minimize-hover')) {
                KTUtil.removeClass(_body, 'aside-minimize-hover');
            }
        });
    }

    // Public methods
    return {
        init: function(id) {
            _element = KTUtil.getById(id);
            _body = KTUtil.getBody();

            if (!_element) {
                return;
            }

            // Initialize
            _init();
        },

        getElement: function() {
            return _element;
        },

        getToggle: function() {
            return _toggleObject;
        },

        onToggle: function(handler) {
            if (typeof _toggleObject.element !== 'undefined') {
                _toggleObject.on('toggle', handler);
            }
        }
    };
}();



export default KTLayoutAsideToggle;