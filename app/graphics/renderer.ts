import {
    AmbientLight,
    Color,
    CylinderGeometry,
    DirectionalLight,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    Scene,
    TextureLoader,
    WebGLRenderer
} from 'three';

import bumpMapUrl from "../assets/bumpMap.png";

export default class Renderer {

    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly renderer: WebGLRenderer;

    private readonly siegel: Mesh;

    constructor(container: HTMLElement) {
        // Init Renderer and append to dom
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer({alpha: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        // Build simple material for back and sides and bump material for front
        const simpleMaterial = new MeshPhongMaterial({
            color: new Color(0xff0000),
            emissive: new Color(0x101010),
            specular: new Color(0xff8000),
            shininess: 20,
        });
        const bumpMaterial = simpleMaterial.clone();
        bumpMaterial.bumpMap = new TextureLoader().load(bumpMapUrl, () => {
            // Render again for texture
            this.renderer.render(this.scene, this.camera);
        });

        // Build lights
        const ambient = new AmbientLight(0x404040);
        const directional = new DirectionalLight(0xffffff);
        directional.position.set(1, 1, 1).normalize();

        // Build geometry and attach materials
        const geometry = new CylinderGeometry(1, 1, 0.2, 24);
        const materials = geometry.faces.map((face, i) => {
            face.materialIndex = i;
            if (face.normal.y === 1) {
                return bumpMaterial.clone();
            } else {
                return simpleMaterial.clone();
            }
        });
        this.siegel = new Mesh(geometry, materials);
        this.siegel.rotation.y = Math.PI / 2;
        this.siegel.rotation.z = Math.PI / 2;

        // Add objects to scene
        this.scene.add(ambient);
        this.scene.add(directional);
        this.scene.add(this.siegel);
        this.camera.position.z = 5;

        // One time render
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Rotate siegel and render
     */
    public update(mouse: number) {
        this.siegel.rotation.set((mouse * Math.PI - Math.PI / 2) * 0.6, Math.PI / 2, Math.PI / 2, "YZX");
        this.renderer.render(this.scene, this.camera);
    }
}
