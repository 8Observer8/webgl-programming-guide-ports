import { ShaderProgram } from "./ShaderProgram";

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

        // Set clear color
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}