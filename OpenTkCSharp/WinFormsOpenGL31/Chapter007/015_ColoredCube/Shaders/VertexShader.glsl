﻿#version 140

in vec3 aPosition;
in vec4 aColor;
uniform mat4 uProjMatrix;
uniform mat4 uViewMatrix;
out vec4 vColor;

void main()
{
    gl_Position = uProjMatrix * uViewMatrix * vec4(aPosition, 1.0);
    vColor = aColor;
}
