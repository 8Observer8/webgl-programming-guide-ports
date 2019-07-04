define(["require", "exports", "./ShaderProgram", "./VertexBuffers", "gl-matrix", "./Camera"], function (require, exports, ShaderProgram_1, VertexBuffers_1, gl_matrix_1, Camera_1) {
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
            var eyePos = gl_matrix_1.vec3.fromValues(3, 3, 7);
            var targetPos = gl_matrix_1.vec3.fromValues(0, 0, 0);
            var camera = new Camera_1.Camera(gl, program, eyePos, targetPos);
            camera.SetViewProjection();
            // Set the vertex information
            var amountOfVertices = VertexBuffers_1.VertexBuffers.InitVBOsAndGetAmountOfVertices(gl, program);
            // Set the clear color and enable the depth test
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);
            // Clear <canvas>
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // Draw the cube
            gl.drawElements(gl.TRIANGLES, amountOfVertices, gl.UNSIGNED_BYTE, 0);
        }
        return Scene;
    }());
    exports.Scene = Scene;
});
//# sourceMappingURL=Scene.js.map