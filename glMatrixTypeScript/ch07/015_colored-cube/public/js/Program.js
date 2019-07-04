define(["require", "exports", "./Scene"], function (require, exports, Scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Playground: 
    var Program = /** @class */ (function () {
        function Program() {
        }
        Program.Main = function () {
            var scene = new Scene_1.Scene("renderCanvas");
        };
        return Program;
    }());
    // Debug Version
    Program.Main();
});
// Release Version
// window.onload = () => Program.Main();
//# sourceMappingURL=Program.js.map