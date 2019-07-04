using System;
using OpenTK;
using OpenTK.Graphics.OpenGL;

class Camera
{
    private Vector3 _eyePos;
    private Vector3 _targetPos;
    private Matrix4 _projMatrix;
    private Matrix4 _viewMatrix;
    private int _uProjMatrixLoc;
    private int _uViewMatrixLoc;
    private Vector3 _orientation = new Vector3(0f, 1f, 0f);
    private float _nearPlane = 0.1f;
    private float _farPlane = 1000f;

    public Camera(int program, Vector3 eyePos, Vector3 targetPos)
    {
        _eyePos = eyePos;
        _targetPos = targetPos;

        _uProjMatrixLoc = GL.GetUniformLocation(program, "uProjMatrix");
        _uViewMatrixLoc = GL.GetUniformLocation(program, "uViewMatrix");
        if (_uProjMatrixLoc < 0 || _uViewMatrixLoc < 0)
        {
            Console.WriteLine("Failed to get the storage location of uProjMatrix or uViewMatrix");
            return;
        }

        SetViewProjection();
    }

    public void SetViewProjection()
    {
        _projMatrix = Matrix4.CreatePerspectiveFieldOfView(MathHelper.DegreesToRadians(30f), 1f, _nearPlane, _farPlane);
        _viewMatrix = Matrix4.LookAt(_eyePos, _targetPos, _orientation);

        GL.UniformMatrix4(_uProjMatrixLoc, false, ref _projMatrix);
        GL.UniformMatrix4(_uViewMatrixLoc, false, ref _viewMatrix);
    }
}
