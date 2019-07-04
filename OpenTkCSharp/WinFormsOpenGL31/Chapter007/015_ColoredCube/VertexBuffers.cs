using OpenTK.Graphics.OpenGL;

class VertexBuffers
{
    public static int InitVBOsAndGetAmountOfVertices(int program)
    {
        // Create a cube
        //   v6------v5
        //  /|      /|
        // v1------v0|
        // | |     | |
        // | v7----|-|v4
        // |/      |/
        // v2------v3

        float[] vertices = new float[] // Vertex coordinates
        {
            // v0-v1-v2-v3 front (0, 1, 2, 3)
            1f, 1f, 1f, -1f, 1f, 1f, -1f, -1f, 1f, 1f, -1f, 1f,
            // v0-v3-v4-v5 right (4, 5, 6, 7)
            1f, 1f, 1f, 1f, -1f, 1f, 1f, -1f, -1f, 1f, 1f, -1f,
            // v0-v5-v6-v1 up (8, 9, 10, 11)
            1f, 1f, 1f, 1f, 1f, -1f, -1f, 1f, -1f, -1f, 1f, 1f,
            // v1-v6-v7-v2 left (12, 13, 14, 15)
            -1f, 1f, 1f, -1f, 1f, -1f, -1f, -1f, -1f, -1f, -1f, 1f,
            // v7-v4-v3-v2 down (16, 17, 18, 19)
            -1f, -1f, -1f, 1f, -1f, -1f, 1f, -1f, 1f, -1f, -1f, 1f,
            // v4-v7-v6-v5 back (20, 21, 22, 23)
            1f, -1f, -1f, -1f, -1f, -1f, -1f, 1f, -1f, 1f, 1f, -1f
        };

        float[] colors = new float[] // Colors
        {
            // v0-v1-v2-v3 front (blue)
            0.4f, 0.4f, 1f, 0.4f, 0.4f, 1f, 0.4f, 0.4f, 1f, 0.4f, 0.4f, 1f,
            // v0-v3-v4-v5 right (green)
            0.4f, 1f, 0.4f, 0.4f, 1f, 0.4f, 0.4f, 1f, 0.4f, 0.4f, 1f, 0.4f,
            // v0-v5-v6-v1 top (red)
            1f, 0.4f, 0.4f, 1f, 0.4f, 0.4f, 1f, 0.4f, 0.4f, 1f, 0.4f, 0.4f,
            // v1-v6-v7-v2 left
            1f, 1f, 0.4f, 1f, 1f, 0.4f, 1f, 1f, 0.4f, 1f, 1f, 0.4f,
            // v6-v4-v3-v2 down
            1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f,
            // v4-v7-v6-v5 back
            0.4f, 1f, 1f, 0.4f, 1f, 1f, 0.4f, 1f, 1f, 0.4f, 1f, 1f
        };

        int[] indices = new int[]
        {
            0, 1, 2, 0, 2, 3,       // front
            4, 5, 6, 4, 6, 7,       // right
            8, 9, 10, 8, 10, 11,    // up
            12, 13, 14, 12, 14, 15, // left
            16, 17, 18, 16, 18, 19, // down
            20, 21, 22, 20, 22, 23  // back
        };

        // Write the vertex coordinates and colors to the buffer object
        if (!InitArrayBuffer(program, vertices, "aPosition"))
        {
            return -1;
        }

        if (!InitArrayBuffer(program, colors, "aColor"))
        {
            return -1;
        }

        // Create a buffer object
        int indexBuffer;
        GL.GenBuffers(1, out indexBuffer);

        // Write the indices to the buffer object
        GL.BindBuffer(BufferTarget.ElementArrayBuffer, indexBuffer);
        GL.BufferData(BufferTarget.ElementArrayBuffer, sizeof(int) * indices.Length, indices, BufferUsageHint.StaticDraw);

        return indices.Length;
    }

    private static bool InitArrayBuffer(int program, float[] data, string attributeName)
    {
        // Create a buffer object
        int buffer;
        GL.GenBuffers(1, out buffer);

        // Write data into the buffer object
        GL.BindBuffer(BufferTarget.ArrayBuffer, buffer);
        GL.BufferData(BufferTarget.ArrayBuffer, sizeof(float) * data.Length, data, BufferUsageHint.StaticDraw);

        // Assign the buffer object to the attribute variable
        int attributeLocation = GL.GetAttribLocation(program, attributeName);
        if (attributeLocation < 0)
        {
            System.Console.WriteLine("Failed to get the storage location of " + attributeName);
            return false;
        }
        GL.VertexAttribPointer(attributeLocation, 3, VertexAttribPointerType.Float, false, 0, 0);
        // Enable the assignment of the buffer object to the attribute variable
        GL.EnableVertexAttribArray(attributeLocation);

        return true;
    }
}

