define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Playground: https://next.plnkr.co/edit/SPaDtGlLZ1ZlgRhd?preview
    var Program = /** @class */ (function () {
        function Program() {
        }
        Program.Main = function () {
            // Retrieve <canvas> element
            var canvas = document.getElementById("renderCanvas");
            // Get the rendering context for WebGL
            var gl = canvas.getContext("webgl");
            if (!gl) {
                console.log("Failed to get the rendering context of WebGL");
                return;
            }
            // Set clear color
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            // Clear <canvas>
            gl.clear(gl.COLOR_BUFFER_BIT);
        };
        return Program;
    }());
    // Debug Version
    Program.Main();
});
// Release Version
// window.onload = () => Program.Main();
//# sourceMappingURL=Program.js.map