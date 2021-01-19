/*
 * ShapeFromShading - Creating heightmaps out of 2D seal images.
 * Copyright (C) 2021
 * Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
    AmbientLight,
    Color,
    CylinderGeometry,
    DirectionalLight,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    Scene, Texture,
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

    private readonly siegel: Mesh;
    private readonly directionalLight: DirectionalLight;

    constructor(container: HTMLElement, texture: Texture) {
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

        this.siegel = this._createSiegel(texture);
        this.siegel.rotation.y = Math.PI * 2;
        // this.siegels.forEach((s, i) => {
        //     const relPos = (i + 0.5) / textures.length * 2 - 1;
        //     s.rotation.y = Math.PI / 2 + -relPos * siegelMaxRotation;
        //     s.position.x = relPos * siegelsSpan;
        //     s.position.z = (1 - Math.abs(relPos)) * 2 - 1;
        // });

        // Add objects to scene
        this.scene.add(ambient);
        this.scene.add(this.directionalLight);
        this.scene.add(this.siegel);
        this.camera.position.z = 2;

        // One time render
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Rotate siegel and render
     */
    public update(mouseX: number) {
        this.resizeCanvasToDisplaySize();
        this.siegel.rotation.set((mouseX * Math.PI - Math.PI / 2) * 0.6, Math.PI / 2, Math.PI / 2, "YZX");
        this.renderer.render(this.scene, this.camera);
    }

    private resizeCanvasToDisplaySize() {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (canvas.width !== width || canvas.height !== height) {
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }

    private _createSiegel(texture: Texture): Mesh {
        // Build simple material for back and sides and bump material for front
        const simpleMaterial = new MeshPhongMaterial({
            color: new Color(0xff0000),
            emissive: new Color(0x101010),
            specular: new Color(0xff5020),
            shininess: 20,
        });
        const bumpMaterial = simpleMaterial.clone();
        bumpMaterial.bumpMap = texture;


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
