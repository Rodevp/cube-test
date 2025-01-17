import { useRef, useEffect } from "react";
import { Face } from "../types";

type Props = {
    width: number; 
    height: number; 
    faces: Face[] 
}

const Canvas: React.FC<Props> = ({ width, height, faces }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("2D context not supported");
            return;
        }

        let rotationX = 0;
        let rotationY = 0;
        const cubeSize = 100;
        const perspective = 300;

        const project = ([x, y, z]: number[]): [number, number] => {
            const scale = perspective / (perspective + z);
            return [
                canvas.width / 2 + x * cubeSize * scale,
                canvas.height / 2 - y * cubeSize * scale
            ];
        };

        const rotate = ([x, y, z]: number[]): number[] => {
            const sinX = Math.sin(rotationX);
            const cosX = Math.cos(rotationX);
            const sinY = Math.sin(rotationY);
            const cosY = Math.cos(rotationY);

            const xy = cosX * y - sinX * z;
            const xz = sinX * y + cosX * z;
            const yz = cosY * xz - sinY * x;
            const yx = sinY * xz + cosY * x;

            return [yx, xy, yz];
        };

       
        const drawFace = (face: Face) => {
            const [startX, startY] = project(face.vertices[0]);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            face.vertices.forEach(vertex => {
                const [x, y] = project(vertex);
                ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.fillStyle = face.color;
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();
        };

    
        const drawCube = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const transformedFaces = faces.map(face => ({
                color: face.color,
                vertices: face.vertices.map(rotate)
            }));

            transformedFaces.sort((a, b) => {
                const zA = a.vertices.reduce((sum, v) => sum + v[2], 0) / a.vertices.length;
                const zB = b.vertices.reduce((sum, v) => sum + v[2], 0) / b.vertices.length;
                return zB - zA;
            });

            transformedFaces.forEach(drawFace);
        };

  
        const handleMouseMove = (e: MouseEvent) => {
            rotationY += e.movementX * 0.01;
            rotationX += e.movementY * 0.01;
            drawCube();
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        drawCube();

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, [faces]);

    return <canvas ref={canvasRef} width={width} height={height} style={{ border: "1px solid #000" }} />;
};

export default Canvas;
