using System;
using System.Windows.Forms;
using OpenTK;
using OpenTK.Graphics;
using OpenTK.Graphics.OpenGL;

namespace _015_ColoredCube
{
    public partial class Form1 : Form
    {
        private GLControl _glControl;
        private int _program;
        private Camera _camera;
        private int _amountOfVertices;

        public Form1()
        {
            InitializeComponent();

            _glControl = new GLControl(new GraphicsMode(32, 24, 0, 4));
            _glControl.Load += GLControl_Load;
            _glControl.Paint += GLControl_Paint;
            _glControl.Resize += GLControl_Resize;
            _glControl.Dock = DockStyle.Fill;
            Controls.Add(_glControl);
        }

        private void GLControl_Load(object sender, EventArgs e)
        {
            // Set Clear Color
            GL.ClearColor(Color4.Black);

            _program = ShaderProgram.InitializeAndGetID(
                "Shaders/VertexShader.glsl",
                "Shaders/FragmentShader.glsl");

            Vector3 eyePos = new Vector3(3f, 3f, 7f);
            Vector3 targetPos = new Vector3(0f, 0f, 0f);
            _camera = new Camera(_program, eyePos, targetPos);

            // Set the vertex information
            _amountOfVertices = VertexBuffers.InitVBOsAndGetAmountOfVertices(_program);
        }

        private void GLControl_Paint(object sender, PaintEventArgs e)
        {
            GL.Viewport(0, 0, _glControl.Width, _glControl.Height);

            // Clear the _glControl
            GL.Clear(ClearBufferMask.ColorBufferBit | ClearBufferMask.DepthBufferBit);

            // Draw the cube
            GL.DrawElements(PrimitiveType.Triangles, _amountOfVertices, DrawElementsType.UnsignedInt, 0);

            // Swap the front and back buffers
            _glControl.SwapBuffers();
        }

        private void GLControl_Resize(object sender, EventArgs e)
        {
            if (_camera != null)
            {
                _camera.SetViewProjection();
            }
        }
    }
}
