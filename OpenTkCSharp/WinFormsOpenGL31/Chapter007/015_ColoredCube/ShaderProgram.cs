using System;
using OpenTK.Graphics.OpenGL;
using System.Windows.Forms;
using System.IO;

/// <summary>
/// Allows to get a shader program ID
/// </summary>
class ShaderProgram
{
    public static int InitializeAndGetID(
        string vertexShaderPath,
        string fragmentShaderPath)
    {
        int vShader = GetShaderID(vertexShaderPath, ShaderType.VertexShader);
        int fShader = GetShaderID(fragmentShaderPath, ShaderType.FragmentShader);

        int program = GL.CreateProgram();
        GL.AttachShader(program, vShader);
        GL.AttachShader(program, fShader);
        GL.LinkProgram(program);
        GL.UseProgram(program);

        return program;
    }
    
    private static int GetShaderID(string shaderPath, ShaderType shaderType)
    {
        string shaderSource;
        try
        {
            shaderSource = File.ReadAllText(shaderPath);
        }
        catch (Exception)
        {
            return -1;
        }

        int shader = GL.CreateShader(shaderType);

        GL.ShaderSource(shader, shaderSource);
        GL.CompileShader(shader);

        // Check the compilation status
        int ok;
        GL.GetShader(shader, ShaderParameter.CompileStatus, out ok);
        if (ok == 0)
        {
            string shaderInfo = GL.GetShaderInfoLog(shader);
            MessageBox.Show(string.Format("Failed to compile the shader '{0}'. Message: {1}",
                shaderType.ToString(), shaderInfo));
            return -1;
        }

        return shader;
    }
}