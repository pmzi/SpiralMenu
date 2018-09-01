'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpiralMenu = function () {
    function SpiralMenu(container, closeImg) {
        var plugins = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        _classCallCheck(this, SpiralMenu);

        this.selected = {
            primary: 0,
            sub: -1
        };
        this.hoveredElement = "";
        this.plugins = [];


        if (container instanceof Element) {

            this.container = container;

            this.plugins = plugins;

            this.__create(closeImg);
        } else {
            throw new Error('Container doesn`t exist');
        }
    }

    _createClass(SpiralMenu, [{
        key: 'addPlugin',
        value: function addPlugin(name, image, onActiveCB, onDeActiveCB) {
            var subPlugins = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];


            this.plugins.push({
                name: name,
                image: image,
                onActiveCB: onActiveCB,
                onDeActiveCB: onDeActiveCB,
                subPlugins: subPlugins
            });
        }
    }, {
        key: 'addSubPlugin',
        value: function addSubPlugin(primaryName, name, image, onActiveCB, onDeActiveCB) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = this.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var plugin = _step.value;

                    if (plugin.name == primaryName) {
                        plugin.subPlugins.push({
                            name: name,
                            image: image,
                            onActiveCB: onActiveCB,
                            onDeActiveCB: onDeActiveCB
                        });
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'afterClosed',
        value: function afterClosed() {}
    }, {
        key: '__reloadMenu',
        value: function __reloadMenu() {

            this.spiralMenu.innerHTML = '';

            this.__appendPlugins();
        }

        // Private methods

    }, {
        key: '__create',
        value: function __create(closeImgAddress) {
            var _this = this;

            this.spiralMenu = document.createElement("div");
            this.spiralMenu.classList.add('spiralMenu');

            var spiralClose = document.createElement("div");
            spiralClose.classList.add('spiralMenu__close');
            var closeImg = document.createElement("img");
            closeImg.src = closeImgAddress;
            spiralClose.appendChild(closeImg);

            spiralClose.onmouseover = function () {
                _this.__changeHoveredElement("__close");
            };

            this.spiralMenu.appendChild(spiralClose);

            this.__appendPlugins();

            this.container.appendChild(this.spiralMenu);
        }
    }, {
        key: '__appendPlugins',
        value: function __appendPlugins() {

            var that = this;

            var degree = 360;

            if (this.plugins.length != 0) {
                degree = 360 / this.plugins.length;
            }

            var i = 0;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var plugin = _step2.value;


                    var pluginElement = document.createElement("div");
                    pluginElement.classList.add("spiralMenu__plugin");
                    pluginElement.setAttribute("data-name", plugin.name);

                    pluginElement.onmouseover = function () {
                        that.__changeHoveredElement(this.getAttribute("data-name"));
                    };

                    var pluginImage = document.createElement("img");
                    pluginImage.src = plugin.image;

                    pluginElement.style.position = "absolute";
                    // console.log(Math.cos(degree*i), degree*i)
                    pluginElement.style.top = 134 - 48 * Math.sin(this.__toRadians(degree * i)) + 'px';
                    pluginElement.style.right = 134 - 48 * Math.cos(this.__toRadians(degree * i)) + 'px';

                    pluginElement.appendChild(pluginImage);

                    this.spiralMenu.appendChild(pluginElement);

                    i++;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: '__appendSubPlugins',
        value: function __appendSubPlugins(name) {

            var targetedPlugin = void 0;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.plugins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var plugin = _step3.value;

                    if (plugin.name === name) {
                        targetedPlugin = plugin;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var degree = 360;

            if (targetedPlugin.subPlugins.length != 0) {
                degree = 360 / targetedPlugin.subPlugins.length;
            }

            var i = 0;

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = targetedPlugin.subPlugins[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _plugin = _step4.value;


                    var pluginElement = document.createElement("div");
                    pluginElement.classList.add("spiralMenu__plugin");
                    pluginElement.setAttribute("data-name", _plugin.name);

                    pluginElement.onmouseover = function () {
                        that.__changeHoveredElement(this.getAttribute("data-name"));
                    };

                    var pluginImage = document.createElement("img");
                    pluginImage.src = _plugin.image;

                    pluginElement.style.position = "absolute";
                    // console.log(Math.cos(degree*i), degree*i)
                    pluginElement.style.top = 134 - 96 * Math.sin(this.__toRadians(degree * i)) + 'px';
                    pluginElement.style.right = 134 - 96 * Math.cos(this.__toRadians(degree * i)) + 'px';

                    pluginElement.appendChild(pluginImage);

                    this.spiralMenu.appendChild(pluginElement);

                    i++;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: '__changeHoveredElement',
        value: function __changeHoveredElement(name) {

            this.hoveredElement = name;
        }
    }, {
        key: '__toRadians',
        value: function __toRadians(angle) {
            return angle * (Math.PI / 180);
        }
    }]);

    return SpiralMenu;
}();

module.exports = SpiralMenu;