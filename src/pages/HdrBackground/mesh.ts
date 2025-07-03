import { RGBELoader } from "three/examples/jsm/Addons.js";

const rgbeloader = new RGBELoader();

rgbeloader.load('./pic.hdr', function ( texture ) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
});
