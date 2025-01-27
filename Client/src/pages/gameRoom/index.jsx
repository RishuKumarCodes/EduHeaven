import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const App = () => {
  const containerRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, clock;
    let floor, lion, fan;
    let isBlowing = false;

    const mousePos = { x: 0, y: 0 };

    const init = () => {
      scene = new THREE.Scene();

      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;

      const aspectRatio = WIDTH / HEIGHT;
      const fieldOfView = 60;
      const nearPlane = 1;
      const farPlane = 2000;

      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
      );
      camera.position.z = 800;
      camera.position.y = 0;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(WIDTH, HEIGHT);
      renderer.shadowMap.enabled = true;

      containerRef.current.appendChild(renderer.domElement);

      window.addEventListener("resize", onWindowResize);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousedown", () => (isBlowing = true));
      document.addEventListener("mouseup", () => (isBlowing = false));

      clock = new THREE.Clock();
    };

    const onWindowResize = () => {
      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;

      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    };

    const handleMouseMove = (event) => {
      mousePos.x = event.clientX;
      mousePos.y = event.clientY;
    };

    const createLights = () => {
      const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

      const shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
      shadowLight.position.set(200, 200, 200);
      shadowLight.castShadow = true;

      const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
      backLight.position.set(-100, 200, 50);
      backLight.castShadow = true;

      scene.add(backLight);
      scene.add(light);
      scene.add(shadowLight);
    };

    const createFloor = () => {
      floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1000, 500),
        new THREE.MeshBasicMaterial({ color: 0xebe5e7 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -100;
      floor.receiveShadow = true;
      scene.add(floor);
    };

    const createLion = () => {
      lion = new Lion();
      scene.add(lion.threegroup);
    };

    const createFan = () => {
      fan = new Fan();
      fan.threegroup.position.z = 350;
      scene.add(fan.threegroup);
    };

    const loop = () => {
      const deltaTime = clock.getDelta();

      const xTarget = mousePos.x - window.innerWidth / 2;
      const yTarget = mousePos.y - window.innerHeight / 2;

      fan.isBlowing = isBlowing;
      fan.update(xTarget, yTarget, deltaTime);

      if (isBlowing) {
        lion.cool(xTarget, yTarget, deltaTime);
      } else {
        lion.look(xTarget, yTarget);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };

    init();
    createLights();
    createFloor();
    createLion();
    createFan();
    loop();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", () => (isBlowing = true));
      document.removeEventListener("mouseup", () => (isBlowing = false));

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

class Fan {
  constructor() {
    this.isBlowing = false;
    this.speed = 0;
    this.acc = 0;
    this.redMat = new THREE.MeshLambertMaterial({ color: 0xad3525, flatShading: true });
    this.greyMat = new THREE.MeshLambertMaterial({ color: 0x653f4c, flatShading: true });
    this.yellowMat = new THREE.MeshLambertMaterial({ color: 0xfdd276, flatShading: true });

    const coreGeom = new THREE.BoxGeometry(10, 10, 20);
    const sphereGeom = new THREE.BoxGeometry(10, 10, 3);
    const propGeom = new THREE.BoxGeometry(10, 30, 2);
    propGeom.translate(0, 25, 0);

    this.core = new THREE.Mesh(coreGeom, this.greyMat);

    const prop1 = new THREE.Mesh(propGeom, this.redMat);
    prop1.position.z = 15;
    const prop2 = prop1.clone();
    prop2.rotation.z = Math.PI / 2;
    const prop3 = prop1.clone();
    prop3.rotation.z = Math.PI;
    const prop4 = prop1.clone();
    prop4.rotation.z = -Math.PI / 2;

    this.sphere = new THREE.Mesh(sphereGeom, this.yellowMat);
    this.sphere.position.z = 15;

    this.propeller = new THREE.Group();
    this.propeller.add(prop1, prop2, prop3, prop4);

    this.threegroup = new THREE.Group();
    this.threegroup.add(this.core, this.propeller, this.sphere);
  }

  update(xTarget, yTarget, deltaTime) {
    this.threegroup.lookAt(new THREE.Vector3(0, 80, 60));
    const tPosX = rule3(xTarget, -200, 200, -250, 250);
    const tPosY = rule3(yTarget, -200, 200, 250, -250);

    this.threegroup.position.x += (tPosX - this.threegroup.position.x) * deltaTime * 4;
    this.threegroup.position.y += (tPosY - this.threegroup.position.y) * deltaTime * 4;

    this.targetSpeed = this.isBlowing ? 15 * deltaTime : 5 * deltaTime;
    if (this.isBlowing && this.speed < this.targetSpeed) {
      this.acc += 0.01 * deltaTime;
      this.speed += this.acc;
    } else if (!this.isBlowing) {
      this.acc = 0;
      this.speed *= Math.pow(0.4, deltaTime);
    }
    this.propeller.rotation.z += this.speed;
  }
}

class Lion {
  constructor() {
    this.threegroup = new THREE.Group();
    this.yellowMat = new THREE.MeshLambertMaterial({ color: 0xfdd276, flatShading: true });
    // Add lion creation logic here
  }

  look(xTarget, yTarget) {
    // Add lion look logic
  }

  cool(xTarget, yTarget, deltaTime) {
    // Add lion cooling logic
  }
}

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

function rule3(v, vmin, vmax, tmin, tmax) {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  return tmin + pc * dt;
}

export default App;
