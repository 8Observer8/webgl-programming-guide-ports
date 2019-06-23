import { mat4 } from "gl-matrix";
import { Scene } from "./Scene";

// Playground: 

class Program
{
    public static Main(): void
    {
        let scene = new Scene("renderCanvas");
    }
}

// Debug Version
Program.Main();

// Release Version
// window.onload = () => Program.Main();