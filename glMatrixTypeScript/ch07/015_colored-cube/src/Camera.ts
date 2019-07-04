import { mat4, vec3 } from "gl-matrix";

export class Camera
{
    private _gl: WebGLRenderingContext;
    private _eyePos: vec3;
    private _targetPos: vec3;
    private _projMatrix: mat4;
    private _viewMatrix: mat4;
    private _uProjMatrixLoc: WebGLUniformLocation;
    private _uViewMatrixLoc: WebGLUniformLocation;
    private _orientation = vec3.fromValues(0, 1, 0);
    private _nearPlane = 0.1;
    private _farPlane = 100;

    public constructor(gl: WebGLRenderingContext, program: WebGLProgram, eyePos: vec3, targetPos: vec3)
    {
        this._gl = gl;
        this._eyePos = eyePos;
        this._targetPos = targetPos;

        this._projMatrix = mat4.create();
        this._viewMatrix = mat4.create();

        this._uProjMatrixLoc = this._gl.getUniformLocation(program, "uProjMatrix");
        this._uViewMatrixLoc = this._gl.getUniformLocation(program, "uViewMatrix");
        if (!this._uProjMatrixLoc || !this._uViewMatrixLoc)
        {
            console.log("Failed to get the storage location of uProjMatrix or uViewMatrix");
            return;
        }

        this.SetViewProjection();
    }

    public SetViewProjection(): void
    {
        mat4.perspective(this._projMatrix, 30.0 * (Math.PI / 180.0), 1, this._nearPlane, this._farPlane);
        mat4.lookAt(this._viewMatrix, this._eyePos, this._targetPos, this._orientation);

        this._gl.uniformMatrix4fv(this._uProjMatrixLoc, false, this._projMatrix);
        this._gl.uniformMatrix4fv(this._uViewMatrixLoc, false, this._viewMatrix);
    }
}