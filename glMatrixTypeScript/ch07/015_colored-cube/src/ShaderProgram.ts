
export class ShaderProgram
{
    public static InitializeAndGetID(
        gl: WebGLRenderingContext,
        vertexShaderElementName: string,
        fragmentShaderElementName: string): WebGLProgram
    {
        let program = gl.createProgram();

        let vShader = this.GetShaderID(gl, vertexShaderElementName, gl.VERTEX_SHADER);
        let fShader = this.GetShaderID(gl, fragmentShaderElementName, gl.FRAGMENT_SHADER);
        
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        return program;
    }

    private static GetShaderID(
        gl: WebGLRenderingContext,
        shaderElementName: string,
        shaderType: number): WebGLShader
    {
        let shaderElement = document.getElementById(shaderElementName);
        let shaderSource = shaderElement.firstChild.textContent;
        let shader = gl.createShader(shaderType);

        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        let ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!ok)
        {
            let shaderInfo = gl.getShaderInfoLog(shader);
            console.log("Failed to compile the shader. Message: " + shaderInfo);
            return null;
        }

        return shader;
    }
}