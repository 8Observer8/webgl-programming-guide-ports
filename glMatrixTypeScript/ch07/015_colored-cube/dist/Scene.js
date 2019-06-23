define(["require", "exports", "./ShaderProgram"], function (require, exports, ShaderProgram_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scene = /** @class */ (function () {
        function Scene(renderCanvasName) {
            // Retrieve <canvas> element
            var canvas = document.getElementById("renderCanvas");
            // Get the rendering context for WebGL
            var gl = canvas.getContext("webgl");
            if (!gl) {
                console.log("Failed to get the rendering context of WebGL");
                return;
            }
            this._gl = gl;
            var program = ShaderProgram_1.ShaderProgram.InitializeAndGetID(gl, "VertexShaderElement", "FragmentShaderElement");
            // Set clear color
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            // Clear <canvas>
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        return Scene;
    }());
    exports.Scene = Scene;
});
//# sourceMappingURL=Scene.js.map