// 这段代码是对一个gltf文件进行转换，将其转换为glb文件，并保存到本地，带有逻辑的方式
import gltfPipeline from "gltf-pipeline";
import fs from 'fs';

const { gltfToGlb } = gltfPipeline;

const content = fs.readFileSync("./model/Michelle2.gltf", 'utf8');
const gltfJson = JSON.parse(content);

gltfToGlb(gltfJson, { 
    resourceDirectory: "./model/" 
}).then(function (results) {
  fs.writeFileSync("model.glb", results.glb);
});