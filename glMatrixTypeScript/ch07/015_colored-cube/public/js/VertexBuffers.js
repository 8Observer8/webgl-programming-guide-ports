define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VertexBuffers = /** @class */ (function () {
        function VertexBuffers() {
        }
        /**
         * Initialize VBO and returns a number of vertices
         * @param gl WebGL rendering context
         * @param program WebGL program
         */
        VertexBuffers.InitVBOsAndGetAmountOfVertices = function (gl, program) {
            // Create a cube
            //   v6------v5
            //  /|      /|
            // v1------v0|
            // | |     | |
            // | v7----|-|v4
            // |/      |/
            // v2------v3
            var vertices = new Float32Array([
                // v0-v1-v2-v3 front (0, 1, 2, 3)
                1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
                // v0-v3-v4-v5 right (4, 5, 6, 7)
                1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
                // v0-v5-v6-v1 up (8, 9, 10, 11)
                1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
                // v1-v6-v7-v2 left (12, 13, 14, 15)
                -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,
                // v7-v4-v3-v2 down (16, 17, 18, 19)
                -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
                // v4-v7-v6-v5 back (20, 21, 22, 23)
                1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0
            ]);
            var colors = new Float32Array([
                // v0-v1-v2-v3 front (blue)
                0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0,
                // v0-v2-v4-v5 right (green)
                0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4,
                // v0-v5-v6-v1 up (red)
                1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4,
                // v1-v6-v7-v2 left
                1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4,
                // v7-v4-v3-v2 down
                1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
                // v4-v7-v6-v5 back
                0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0
            ]);
            var indices = new Uint8Array([
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23 // back
            ]);
            // Write the vertex coordinates and colors to the buffer object
            if (!this.InitArrayBuffer(gl, program, vertices, "aPosition")) {
                return -1;
            }
            if (!this.InitArrayBuffer(gl, program, colors, "aColor")) {
                return -1;
            }
            // Create a buffer object
            var indexBuffer = gl.createBuffer();
            // Write the indices to the buffer object
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
            return indices.length;
        };
        VertexBuffers.InitArrayBuffer = function (gl, program, data, attributeName) {
            // Create a buffer object
            var buffer = gl.createBuffer();
            // Write data into the buffer object
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            // Assign the buffer object to the attribute variable
            var attributeLocation = gl.getAttribLocation(program, attributeName);
            if (attributeLocation < 0) {
                console.log("Failed to get the storage location of " + attributeLocation);
                return false;
            }
            gl.vertexAttribPointer(attributeLocation, 3, gl.FLOAT, false, 0, 0);
            // Enable the assignment of the buffer object to the attribute variable
            gl.enableVertexAttribArray(attributeLocation);
            return true;
        };
        return VertexBuffers;
    }());
    exports.VertexBuffers = VertexBuffers;
});
//# sourceMappingURL=VertexBuffers.js.map