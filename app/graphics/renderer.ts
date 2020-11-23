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

const siegelSize = 1;
const siegelsSpan = 6;
const siegelMaxRotation = Math.PI / 2;

export default class Renderer {

    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly renderer: WebGLRenderer;

    private readonly siegels: Mesh[];
    private readonly directionalLight: DirectionalLight;

    constructor(container: HTMLElement, textures: string[]) {
        // Init Renderer and append to dom
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer({alpha: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        // Build lights
        const ambient = new AmbientLight(0x404040);
        this.directionalLight = new DirectionalLight(0xffffff);
        this.directionalLight.position.set(0, 1, 1).normalize();

        this.siegels = textures.map(tex => this._createSiegel(tex));
        this.siegels.forEach((s, i) => {
            const relPos = (i + 0.5) / textures.length * 2 - 1;
            s.rotation.y = Math.PI / 2 + -relPos * siegelMaxRotation;
            s.position.x = relPos * siegelsSpan;
            s.position.z = (1 - Math.abs(relPos)) * 2 - 1;
        });

        // Add objects to scene
        this.scene.add(ambient);
        this.scene.add(this.directionalLight);
        this.scene.add(...this.siegels);
        this.camera.position.z = 5;

        // One time render
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Rotate siegel and render
     */
    public update(mouseX: number) {
        this.siegels.forEach((s, i) => {
            const relPos = (i + 0.5) / this.siegels.length * 2 - 1;
            s.rotation.set((mouseX * Math.PI - Math.PI / 2 - relPos * siegelMaxRotation) * 0.6, Math.PI / 2, Math.PI / 2, "YZX");
        });
        this.renderer.render(this.scene, this.camera);
    }

    private _createSiegel(texture: string): Mesh {
        // Build simple material for back and sides and bump material for front
        const simpleMaterial = new MeshPhongMaterial({
            color: new Color(0xff0000),
            emissive: new Color(0x101010),
            specular: new Color(0xff8000),
            shininess: 20,
        });
        const bumpMaterial = simpleMaterial.clone();
        bumpMaterial.bumpMap = new TextureLoader().load(texture, () => {
            // Render again for texture
            this.renderer.render(this.scene, this.camera);
        });


        // Build geometry and attach materials
        const geometry = new CylinderGeometry(1, 1, 0.1, 24);
        const materials = geometry.faces.map((face, i) => {
            face.materialIndex = i;
            if (face.normal.y === 1) {
                return bumpMaterial.clone();
            } else {
                return simpleMaterial.clone();
            }
        });
        const siegel = new Mesh(geometry, materials);
        siegel.rotation.y = Math.PI / 2;
        siegel.rotation.z = Math.PI / 2;
        return siegel;
    }
}
