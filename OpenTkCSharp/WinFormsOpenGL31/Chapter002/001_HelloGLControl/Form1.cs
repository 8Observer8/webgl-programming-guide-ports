using System;
using System.Windows.Forms;
using OpenTK;
using OpenTK.Graphics.OpenGL;

namespace _001_HelloGLControl
{
    public partial class Form1 : Form
    {
        private GLControl _glControl;

        public Form1()
        {
            InitializeComponent();

            _glControl = new GLControl();
            Controls.Add(_glControl);
            _glControl.Dock = DockStyle.Fill;
            _glControl.Load += GLControl_Load;
            _glControl.Paint += GLControl_Paint;
        }

        private void GLControl_Load(object sender, EventArgs e)
        {
            // Set clear color
            GL.ClearColor(0f, 0f, 0f, 1f);
        }

        private void GLControl_Paint(object sender, PaintEventArgs e)
        {
            GL.Viewport(0, 0, _glControl.Width, _glControl.Height);

            // Clear _glControl
            GL.Clear(ClearBufferMask.ColorBufferBit);

            // Swap the front and back buffers
            _glControl.SwapBuffers();
        }
    }
}
