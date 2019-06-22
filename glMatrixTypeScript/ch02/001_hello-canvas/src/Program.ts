import { mat4 } from "gl-matrix";

// Playground: https://next.plnkr.co/edit/SPaDtGlLZ1ZlgRhd?preview

class Program
{
    public static Main(): void
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
        
        // Set clear color
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}

// Debug Version
Program.Main();

// Release Version
// window.onload = () => Program.Main();