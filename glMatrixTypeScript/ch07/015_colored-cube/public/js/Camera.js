define(["require", "exports", "gl-matrix"], function (require, exports, gl_matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Camera = /** @class */ (function () {
        function Camera(gl, program, eyePos, targetPos) {
            this._orientation = gl_matrix_1.vec3.fromValues(0, 1, 0);
            this._nearPlane = 0.1;
            this._farPlane = 100;
            this._gl = gl;
            this._eyePos = eyePos;
            this._targetPos = targetPos;
            this._projMatrix = gl_matrix_1.mat4.create();
            this._viewMatrix = gl_matrix_1.mat4.create();
            this._uProjMatrixLoc = this._gl.getUniformLocation(program, "uProjMatrix");
            this._uViewMatrixLoc = this._gl.getUniformLocation(program, "uViewMatrix");
            if (!this._uProjMatrixLoc || !this._uViewMatrixLoc) {
                console.log("Failed to get the storage location of uProjMatrix or uViewMatrix");
                return;
            }
            this.SetViewProjection();
        }
        Camera.prototype.SetViewProjection = function () {
            gl_matrix_1.mat4.perspective(this._projMatrix, 30.0 * (Math.PI / 180.0), 1, this._nearPlane, this._farPlane);
            gl_matrix_1.mat4.lookAt(this._viewMatrix, this._eyePos, this._targetPos, this._orientation);
            this._gl.uniformMatrix4fv(this._uProjMatrixLoc, false, this._projMatrix);
            this._gl.uniformMatrix4fv(this._uViewMatrixLoc, false, this._viewMatrix);
        };
        return Camera;
    }());
    exports.Camera = Camera;
});
//# sourceMappingURL=Camera.js.map