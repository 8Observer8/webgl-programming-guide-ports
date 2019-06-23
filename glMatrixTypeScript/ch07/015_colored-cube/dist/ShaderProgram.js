define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShaderProgram = /** @class */ (function () {
        function ShaderProgram() {
        }
        ShaderProgram.InitializeAndGetID = function (gl, vertexShaderElementName, fragmentShaderElementName) {
            var program = gl.createProgram();
            var vShader = this.GetShaderID(gl, vertexShaderElementName, gl.VERTEX_SHADER);
            var fShader = this.GetShaderID(gl, fragmentShaderElementName, gl.FRAGMENT_SHADER);
            gl.attachShader(program, vShader);
            gl.attachShader(program, fShader);
            gl.linkProgram(program);
            gl.useProgram(program);
            return program;
        };
        ShaderProgram.GetShaderID = function (gl, shaderElementName, shaderType) {
            var shaderElement = document.getElementById(shaderElementName);
            var shaderSource = shaderElement.firstChild.textContent;
            var shader = gl.createShader(shaderType);
            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);
            var ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!ok) {
                var shaderInfo = gl.getShaderInfoLog(shader);
                console.log("Failed to compile the shader. Message: " + shaderInfo);
                return null;
            }
            return shader;
        };
        return ShaderProgram;
    }());
    exports.ShaderProgram = ShaderProgram;
});
//# sourceMappingURL=ShaderProgram.js.map