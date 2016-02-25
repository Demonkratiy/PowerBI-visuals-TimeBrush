(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("var EventEmitter_1 = __webpack_require__(1);\nvar $ = __webpack_require__(2);\n/**\n * Class which represents the force graph\n */\n/* @Mixin(EventEmitter) */\nvar ForceGraph = (function () {\n    /**\n     * Constructor for the force graph\n     */\n    function ForceGraph(element, width, height) {\n        var _this = this;\n        if (width === void 0) { width = 500; }\n        if (height === void 0) { height = 500; }\n        this._configuration = {\n            linkDistance: 10,\n            linkStrength: 2,\n            charge: -120,\n            gravity: .1,\n            labels: false,\n            minZoom: .1,\n            maxZoom: 100\n        };\n        /**\n         * The event emitter for this graph\n         */\n        this.events = new EventEmitter_1.default();\n        /**\n         * My template string\n         */\n        this.template = \"\\n        <div class=\\\"graph-container\\\">\\n            <div class=\\\"button-bar\\\">\\n                <ul>\\n                    <li class=\\\"clear-selection\\\" title=\\\"Clear Selection\\\">\\n                        <a>\\n                            <span class=\\\"fa-stack\\\">\\n                                <i class=\\\"fa fa-check fa-stack-1x\\\"></i>\\n                                <i class=\\\"fa fa-ban fa-stack-2x\\\"></i>\\n                            </span>\\n                        </a>\\n                    </li>\\n                </ul>\\n            </div>\\n            <div class=\\\"svg-container\\\">\\n            </div>\\n        </div>\\n    \".trim().replace(/\\n/g, \"\");\n        this.element = $(this.template);\n        element.append(this.element);\n        this.svgContainer = this.element.find(\".svg-container\");\n        this.element.find(\".clear-selection\").on(\"click\", function () {\n            _this.updateSelection(undefined);\n        });\n        this.dimensions = { width: width, height: height };\n        this.svg = d3.select(this.svgContainer[0]).append(\"svg\")\n            .attr(\"width\", width)\n            .attr(\"height\", height);\n        this.force = d3.layout.force()\n            .linkDistance(10)\n            .linkStrength(2)\n            .gravity(.1)\n            .charge(-120)\n            .size([width, height]);\n        this.vis = this.svg.append('svg:g');\n    }\n    Object.defineProperty(ForceGraph.prototype, \"dimensions\", {\n        /**\n         * Returns the dimensions of this graph\n         */\n        get: function () {\n            return this._dimensions;\n        },\n        /**\n         * Setter for the dimensions\n         */\n        set: function (newDimensions) {\n            this._dimensions = {\n                width: newDimensions.width || this.dimensions.width,\n                height: newDimensions.height || this.dimensions.height\n            };\n            if (this.force) {\n                this.force.size([this.dimensions.width, this.dimensions.height]);\n                this.force.resume();\n                this.element.css({ width: this.dimensions.width, height: this.dimensions.height });\n                this.svgContainer.css({ width: this.dimensions.width, height: this.dimensions.height });\n                this.svg.attr({ width: this.dimensions.width, height: this.dimensions.height });\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(ForceGraph.prototype, \"configuration\", {\n        /**\n         * Returns the configuration of this graph\n         */\n        get: function () {\n            return this._configuration;\n        },\n        /**\n         * Setter for the configuration\n         */\n        set: function (newConfig) {\n            var _this = this;\n            newConfig = $.extend(true, {}, this._configuration, newConfig);\n            if (this.force) {\n                var runStart;\n                /**\n                 * Updates the config value if necessary, and returns true if it was updated\n                 */\n                var updateForceConfig = function (name, defaultValue) {\n                    if (newConfig[name] !== _this._configuration[name]) {\n                        _this.force[name](newConfig[name] || defaultValue);\n                        return true;\n                    }\n                };\n                runStart = runStart || updateForceConfig(\"linkDistance\", 10);\n                runStart = runStart || updateForceConfig(\"linkStrength\", 2);\n                runStart = runStart || updateForceConfig(\"charge\", -120);\n                runStart = runStart || updateForceConfig(\"gravity\", .1);\n                if (newConfig.minZoom !== this._configuration.minZoom ||\n                    newConfig.maxZoom !== this._configuration.maxZoom) {\n                    this.zoom.scaleExtent([newConfig.minZoom, newConfig.maxZoom]);\n                }\n                if (runStart) {\n                    this.force.start();\n                }\n                if (newConfig.labels !== this._configuration.labels) {\n                    this.vis.selectAll(\".node text\")\n                        .style(\"opacity\", newConfig.labels ? 100 : 0);\n                }\n            }\n            this._configuration = newConfig;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(ForceGraph.prototype, \"data\", {\n        /**\n         * Alias for getData\n         */\n        get: function () {\n            return this.getData();\n        },\n        /**\n         * Alias for setData\n         */\n        set: function (graph) {\n            this.setData(graph);\n        },\n        enumerable: true,\n        configurable: true\n    });\n    /**\n     * Redraws the force graph\n     */\n    ForceGraph.prototype.redraw = function () {\n        if (this.vis && d3.event) {\n            var zoomEvt = d3.event;\n            this.vis.attr(\"transform\", \"translate(\" + zoomEvt.translate + \") scale(\" + zoomEvt.scale + \")\");\n        }\n    };\n    /**\n     * Gets the data associated with this graph\n     */\n    ForceGraph.prototype.getData = function () {\n        return this.graph;\n    };\n    /**\n     * Sets the data for this force graph\n     */\n    ForceGraph.prototype.setData = function (graph) {\n        var _this = this;\n        var me = this;\n        this.graph = graph;\n        this.zoom = d3.behavior.zoom()\n            .scaleExtent([this._configuration.minZoom, this._configuration.maxZoom])\n            .on(\"zoom\", function () { return _this.redraw(); });\n        var drag = d3.behavior.drag()\n            .origin(function (d) { return d; })\n            .on(\"dragstart\", function (d) {\n            d3.event.sourceEvent.stopPropagation();\n            d3.select(this).classed(\"dragging\", true);\n            me.force.start();\n        })\n            .on(\"drag\", function (d) {\n            var evt = d3.event;\n            d3.select(this).attr(\"cx\", d.x = evt.x).attr(\"cy\", d.y = evt.y);\n        })\n            .on(\"dragend\", function (d) {\n            d3.select(this).classed(\"dragging\", false);\n        });\n        this.svg.remove();\n        this.svg = d3.select(this.svgContainer[0]).append(\"svg\")\n            .attr(\"width\", this.dimensions.width)\n            .attr(\"height\", this.dimensions.height)\n            .attr(\"preserveAspectRatio\", \"xMidYMid meet\")\n            .attr(\"pointer-events\", \"all\")\n            .call(this.zoom);\n        this.vis = this.svg.append('svg:g');\n        var nodes = graph.nodes.slice();\n        var links = [];\n        var bilinks = [];\n        graph.links.forEach(function (link) {\n            var s = nodes[link.source];\n            var t = nodes[link.target];\n            var w = link.value;\n            var i = {}; // intermediate node\n            nodes.push(i);\n            links.push({ source: s, target: i }, { source: i, target: t });\n            bilinks.push([s, i, t, w]);\n        });\n        this.force.nodes(nodes).links(links).start();\n        this.vis.append(\"svg:defs\").selectAll(\"marker\")\n            .data([\"end\"])\n            .enter()\n            .append(\"svg:marker\")\n            .attr(\"id\", String)\n            .attr(\"viewBox\", \"0 -5 10 10\")\n            .attr(\"refX\", 15)\n            .attr(\"refY\", 0)\n            .attr(\"markerWidth\", 7)\n            .attr(\"markerHeight\", 7)\n            .attr(\"orient\", \"auto\")\n            .append(\"svg:path\")\n            .attr(\"d\", \"M0,-5L10,0L0,5\");\n        var link = this.vis.selectAll(\".link\")\n            .data(bilinks)\n            .enter().append(\"line\")\n            .attr(\"class\", \"link\")\n            .style(\"stroke\", \"gray\")\n            .style(\"stroke-width\", function (d) {\n            var w = 0.15 + (d[3] / 500);\n            return (w > 3) ? 3 : w;\n        })\n            .attr(\"id\", function (d) {\n            return d[0].name.replace(/\\./g, '_').replace(/@/g, '_') + '_' +\n                d[2].name.replace(/\\./g, '_').replace(/@/g, '_');\n        });\n        var node = this.vis.selectAll(\".node\")\n            .data(graph.nodes)\n            .enter().append(\"g\")\n            .call(drag)\n            .attr(\"class\", \"node\");\n        node.append(\"svg:circle\")\n            .attr(\"r\", function (d) { return Math.log(((d.num || 1) * 100)); })\n            .style(\"fill\", function (d) { return d.color; })\n            .style(\"stroke\", \"red\")\n            .style(\"stroke-width\", function (d) { return d.selected ? 1 : 0; })\n            .style(\"opacity\", 1);\n        node.on(\"click\", function (n) {\n            _this.events.raiseEvent(\"nodeClicked\", n);\n            _this.updateSelection(n);\n        });\n        node.on(\"mouseover\", function () {\n            console.log(\"mouseover\");\n            d3.select(_this.svgContainer.find(\"svg text\")[0]).style(\"opacity\", \"100\");\n        });\n        node.on(\"mouseout\", function () {\n            if (!_this._configuration.labels) {\n                d3.select(_this.svgContainer.find(\"svg text\")[0]).style(\"opacity\", \"0\");\n            }\n        });\n        link.append(\"svg:text\")\n            .text(function (d) { return 'yes'; })\n            .attr(\"fill\", \"black\")\n            .attr(\"stroke\", \"black\")\n            .attr(\"font-size\", \"5pt\")\n            .attr(\"stroke-width\", \"0.5px\")\n            .attr(\"class\", \"linklabel\")\n            .attr(\"text-anchor\", \"middle\")\n            .style(\"opacity\", function () {\n            return 100;\n        });\n        link.on(\"click\", function (n) { console.log(n); });\n        node.append(\"svg:text\")\n            .text(function (d) { return d.name; })\n            .attr(\"fill\", \"blue\")\n            .attr(\"stroke\", \"blue\")\n            .attr(\"font-size\", \"5pt\")\n            .attr(\"stroke-width\", \"0.5px\")\n            .style(\"opacity\", this._configuration.labels ? 100 : 0);\n        this.force.on(\"tick\", function () {\n            link.attr(\"x1\", function (d) { return d[0].x; })\n                .attr(\"y1\", function (d) { return d[0].y; })\n                .attr(\"x2\", function (d) { return d[2].x; })\n                .attr(\"y2\", function (d) { return d[2].y; });\n            node.attr(\"transform\", function (d) { return (\"translate(\" + d.x + \",\" + d.y + \")\"); });\n        });\n    };\n    /**\n     * Redraws the selections on the nodes\n     */\n    ForceGraph.prototype.redrawSelection = function () {\n        this.vis.selectAll(\".node circle\")\n            .style(\"stroke-width\", function (d) { return d.selected ? 1 : 0; });\n    };\n    /**\n     * Updates the selection based on the given node\n     */\n    ForceGraph.prototype.updateSelection = function (n) {\n        if (n !== this._selectedNode) {\n            if (this._selectedNode) {\n                this._selectedNode.selected = false;\n            }\n            if (n) {\n                n.selected = true;\n            }\n            this._selectedNode = n;\n        }\n        else {\n            if (this._selectedNode) {\n                this._selectedNode.selected = false;\n            }\n            this._selectedNode = undefined;\n        }\n        this.events.raiseEvent('selectionChanged', this._selectedNode);\n        this.redrawSelection();\n    };\n    return ForceGraph;\n})();\nexports.ForceGraph = ForceGraph;\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9yY2VHcmFwaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZvcmNlR3JhcGgudHMiXSwibmFtZXMiOlsiRm9yY2VHcmFwaCIsIkZvcmNlR3JhcGguY29uc3RydWN0b3IiLCJGb3JjZUdyYXBoLmRpbWVuc2lvbnMiLCJGb3JjZUdyYXBoLmNvbmZpZ3VyYXRpb24iLCJGb3JjZUdyYXBoLmRhdGEiLCJGb3JjZUdyYXBoLnJlZHJhdyIsIkZvcmNlR3JhcGguZ2V0RGF0YSIsIkZvcmNlR3JhcGguc2V0RGF0YSIsIkZvcmNlR3JhcGgucmVkcmF3U2VsZWN0aW9uIiwiRm9yY2VHcmFwaC51cGRhdGVTZWxlY3Rpb24iXSwibWFwcGluZ3MiOiJBQUFBLDZCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBQ25ELElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUc1Qjs7R0FFRztBQUNILDBCQUEwQjtBQUMxQjtJQW1ESUE7O09BRUdBO0lBQ0hBLG9CQUFZQSxPQUFlQSxFQUFFQSxLQUFXQSxFQUFFQSxNQUFZQTtRQXREMURDLGlCQTZWQ0E7UUF2U2dDQSxxQkFBV0EsR0FBWEEsV0FBV0E7UUFBRUEsc0JBQVlBLEdBQVpBLFlBQVlBO1FBN0M5Q0EsbUJBQWNBLEdBQThCQTtZQUNoREEsWUFBWUEsRUFBRUEsRUFBRUE7WUFDaEJBLFlBQVlBLEVBQUVBLENBQUNBO1lBQ2ZBLE1BQU1BLEVBQUVBLENBQUNBLEdBQUdBO1lBQ1pBLE9BQU9BLEVBQUVBLEVBQUVBO1lBQ1hBLE1BQU1BLEVBQUVBLEtBQUtBO1lBQ2JBLE9BQU9BLEVBQUVBLEVBQUVBO1lBQ1hBLE9BQU9BLEVBQUVBLEdBQUdBO1NBQ2ZBLENBQUNBO1FBRUZBOztXQUVHQTtRQUNJQSxXQUFNQSxHQUFHQSxJQUFJQSxzQkFBWUEsRUFBRUEsQ0FBQ0E7UUFFbkNBOztXQUVHQTtRQUNLQSxhQUFRQSxHQUFHQSw2bkJBaUJsQkEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsT0FBT0EsQ0FB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UUFFekJBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLE9BQU9BLEVBQUVBLFVBQUNBLENBQUNBO1lBQ2ZBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pDQSxLQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFSEEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsV0FBV0EsRUFBRUE7WUFDakJBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQ3pCQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUM3RUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDSEEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsRUFBRUE7WUFDaEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUM5QkEsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDM0VBLENBQUNBO1FBQ0xBLENBQUNBLENBQUNBLENBQUNBO1FBRUhBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO2FBQ2xCQSxJQUFJQSxDQUFDQSxVQUFTQSxDQUFDQSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNBO2FBQ25DQSxJ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\n\n/*****************\n ** WEBPACK FOOTER\n ** ./visuals/forcegraph/ForceGraph.ts\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./visuals/forcegraph/ForceGraph.ts?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("/**\n * A mixin that adds support for event emitting\n */\nvar EventEmitter = (function () {\n    function EventEmitter() {\n        this.listeners = {};\n    }\n    /**\n     * Adds an event listener for the given event\n     */\n    EventEmitter.prototype.on = function (name, handler) {\n        var _this = this;\n        var listeners = this.listeners[name] = this.listeners[name] || [];\n        listeners.push(handler);\n        return {\n            destroy: function () {\n                _this.off(name, handler);\n            }\n        };\n    };\n    /**\n     * Removes an event listener for the given event\n     */\n    EventEmitter.prototype.off = function (name, handler) {\n        var listeners = this.listeners[name];\n        if (listeners) {\n            var idx = listeners.indexOf(handler);\n            if (idx >= 0) {\n                listeners.splice(idx, 1);\n            }\n        }\n    };\n    /**\n     * Raises the given event\n     */\n    /*protected*/ EventEmitter.prototype.raiseEvent = function (name) {\n        var _this = this;\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        var listeners = this.listeners[name];\n        if (listeners) {\n            listeners.forEach(function (l) {\n                l.apply(_this, args);\n            });\n        }\n    };\n    return EventEmitter;\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = EventEmitter;\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRFbWl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnRFbWl0dGVyLnRzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIkV2ZW50RW1pdHRlci5jb25zdHJ1Y3RvciIsIkV2ZW50RW1pdHRlci5vbiIsIkV2ZW50RW1pdHRlci5vZmYiLCJFdmVudEVtaXR0ZXIucmFpc2VFdmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSDtJQUFBQTtRQUNZQyxjQUFTQSxHQUFrQ0EsRUFBRUEsQ0FBQ0E7SUF1QzFEQSxDQUFDQTtJQXJDR0Q7O09BRUdBO0lBQ0lBLHlCQUFFQSxHQUFUQSxVQUFVQSxJQUFZQSxFQUFFQSxPQUFpQkE7UUFBekNFLGlCQVFDQTtRQVBHQSxJQUFJQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUNsRUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLE1BQU1BLENBQUNBO1lBQ0hBLE9BQU9BLEVBQUVBO2dCQUNMQSxLQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFBQTtZQUMzQkEsQ0FBQ0E7U0FDSkEsQ0FBQ0E7SUFDTkEsQ0FBQ0E7SUFFREY7O09BRUdBO0lBQ0lBLDBCQUFHQSxHQUFWQSxVQUFXQSxJQUFZQSxFQUFFQSxPQUFpQkE7UUFDdENHLElBQUlBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNaQSxJQUFJQSxHQUFHQSxHQUFHQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUNyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQzdCQSxDQUFDQTtRQUNMQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUVESDs7T0FFR0E7SUFDSEEsYUFBYUEsQ0FBT0EsaUNBQVVBLEdBQWpCQSxVQUFrQkEsSUFBWUE7UUFBOUJJLGlCQU9aQTtRQVA0Q0EsY0FBY0E7YUFBZEEsV0FBY0EsQ0FBZEEsc0JBQWNBLENBQWRBLElBQWNBO1lBQWRBLDZCQUFjQTs7UUFDdkRBLElBQUlBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNaQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFDQSxDQUFDQTtnQkFDaEJBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLEtBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ3hCQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNQQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUNMSixtQkFBQ0E7QUFBREEsQ0FBQ0EsQUF4Q0QsSUF3Q0M7QUF4Q0Q7OEJBd0NDLENBQUEifQ==\n\n/*****************\n ** WEBPACK FOOTER\n ** ./base/EventEmitter.ts\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./base/EventEmitter.ts?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_2__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"jQuery\"\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ }
/******/ ])
});
;