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

        public Form1()
        {
            InitializeComponent();

            _glControl = new GLControl();
            _glControl.Load += GLControl_Load;
            _glControl.Paint += GLControl_Paint;
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
        }

        private void GLControl_Paint(object sender, PaintEventArgs e)
        {
            GL.Viewport(0, 0, _glControl.Width, _glControl.Height);

            // Clear the _glControl
            GL.Clear(ClearBufferMask.ColorBufferBit);

            // Swap the front and back buffers
            _glControl.SwapBuffers();
        }
    }
}
