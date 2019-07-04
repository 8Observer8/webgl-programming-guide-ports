
import { Scene } from "./Scene";

// Playground: https://next.plnkr.co/edit/88OzrQSw4z64CF0C?preview

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