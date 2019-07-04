import { ShaderProgram } from "./ShaderProgram";
import { VertexBuffers } from "./VertexBuffers";
import { vec3 } from "gl-matrix";
import { Camera } from "./Camera";

export class Scene
{
    private _gl: WebGLRenderingContext;

    public constructor(renderCanvasName: string)
    {
        // Retrieve <canvas> element
        let canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

        // Get the rendering context for WebGL
        let gl = canvas.getContext("webgl");
        if (!gl)
        {
            console.log("Failed to get the rendering context of WebGL");
            return;
        }
        this._gl = gl;

        let program = ShaderProgram.InitializeAndGetID(
            gl, "VertexShaderElement", "FragmentShaderElement");

        let eyePos = vec3.fromValues(3, 3, 7);
        let targetPos = vec3.fromValues(0, 0, 0);
        let camera = new Camera(gl, program, eyePos, targetPos);
        camera.SetViewProjection();

        // Set the vertex information
        let amountOfVertices = VertexBuffers.InitVBOsAndGetAmountOfVertices(gl, program);

        // Set the clear color and enable the depth test
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Draw the cube
        gl.drawElements(gl.TRIANGLES, amountOfVertices, gl.UNSIGNED_BYTE, 0);
    }
}