import * as THREE from "three"

export class Sky {

    private _psky: any;
    private _sunSphere: THREE.Mesh;

    constructor() {

        var proxy: any = THREE;
        this._psky = new proxy.Sky();

        this._sunSphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry( 20000, 16, 8 ),
            new THREE.MeshBasicMaterial( { color: 0xffffff } )
        );
        this._sunSphere.position.y = - 700000;
        this._sunSphere.visible = false;

        this.changed();

    }

    changed() {

        var distance = 400000;

        var uniforms = this._psky.uniforms;
        /*
        uniforms.turbidity.value = effectController.turbidity;
        uniforms.rayleigh.value = effectController.rayleigh;
        uniforms.luminance.value = effectController.luminance;
        uniforms.mieCoefficient.value = effectController.mieCoefficient;
        uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

        */

        var inclination = 0.49;
        var azimuth = 0.2146;
        var theta = Math.PI * ( inclination - 0.5 );
        var phi = 2 * Math.PI * ( azimuth - 0.5 );

        this._sunSphere.position.x = distance * Math.cos( phi );
        this._sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
        this._sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

        // sunSphere.visible = effectController.sun;

        this._psky.uniforms.sunPosition.value.copy(this._sunSphere.position);

    }

    get uniforms() {
        return this._psky.uniforms;
    }

    getObjects() : THREE.Object3D[] {
        return [<THREE.Object3D>this._psky.mesh, this._sunSphere];
    }

}
