"use strict";

var KTLayoutHeaderMenu = function() {
    // Private properties
    var _menuElement;
    var _menuObject;
    var _offcanvasElement;

    // Private functions
    var _init = function() {

        _menuObject = new KTMenu(_menuElement, {
            submenu: {
                desktop: 'dropdown',
                tablet: 'accordion',
                mobile: 'accordion'
            },
            accordion: {
                slideSpeed: 200, // accordion toggle slide speed in milliseconds
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });

        // Close aside offcanvas panel before page reload On tablet and mobile
        _menuObject.on('linkClick', function(menu) {
            if (KTUtil.isBreakpointDown('lg')) { // Tablet and mobile mode
                _offcanvasObject.hide(); // Hide offcanvas after general link click
            }
        });
    }

    // Public methods
    return {
        init: function(menuId, offcanvasId) {
            _menuElement = KTUtil.getById(menuId);
            _offcanvasElement = KTUtil.getById(offcanvasId);

            if (!_menuElement) {
                return;
            }

            // Initialize menu
            _init();
        },

        getMenuElement: function() {
            return _menuElement;
        },

        getOffcanvasElement: function() {
            return _offcanvasElement;
        },

        getMenu: function() {
            return _menuObject;
        },

        pauseDropdownHover: function(time) {
            if (_menuObject) {
                _menuObject.pauseDropdownHover(time);
            }
        },

        getOffcanvas: function() {
            return _offcanvasObject;
        },

        closeMobileOffcanvas: function() {
            if (_menuObject && KTUtil.isMobileDevice()) {
                _offcanvasObject.hide();
            }
        }
    };
}();



export default KTLayoutHeaderMenu;