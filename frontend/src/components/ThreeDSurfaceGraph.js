import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { connect } from 'react-redux';
import { fetchGraphData } from '../store/actions/graphDataActions'; // Adjust the path as needed

const ThreeDSurfaceGraph = ({ width, height, graphData, fetchGraphData }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  useEffect(() => {
    if (!graphData.data) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const { x, y, z } = graphData.data;
    const vertices = [];
    for (let i = 0; i < x.length - 1; i++) {
      for (let j = 0; j < y[i].length - 1; j++) {
        vertices.push(x[i][j], z[i][j], y[i][j]);
        vertices.push(x[i + 1][j], z[i + 1][j], y[i + 1][j]);
        vertices.push(x[i][j + 1], z[i][j + 1], y[i][j + 1]);

        vertices.push(x[i + 1][j], z[i + 1][j], y[i + 1][j]);
        vertices.push(x[i + 1][j + 1], z[i + 1][j + 1], y[i + 1][j + 1]);
        vertices.push(x[i][j + 1], z[i][j + 1], y[i][j + 1]);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const surface = new THREE.Mesh(geometry, material);
    scene.add(surface);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [graphData, width, height]);

  return <div ref={mountRef} style={{ width, height }} />;
};

const mapStateToProps = state => ({
  graphData: state.graphData
});

export default connect(mapStateToProps, { fetchGraphData })(ThreeDSurfaceGraph);
