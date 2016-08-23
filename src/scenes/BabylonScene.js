/** @module BabylonScene */
//
// This module implements the BabylonSceneDriverFactory.
// A BabylonSceneDriver is a Babylon game engine driver
// composed from stamps-based building blocks to
// define cameras, lights, shapes, etc. used by
// the underlying game engine driver.
//

import stampit from 'stampit';
import {Cloneable, SelfAware} from 'common-stamps';
import BABYLON from 'babylonjs/babylon';

const BJS = BABYLON;  // external dependency

const BabylonCameras = stampit
  .methods({
    addFreeCamera(name, x = 0, y = 5, z = -10) {
      if (!this.checkDriver) {
        console.log("BablyonCameras: missing driver component.");
        return null;
      }
      this.checkDriver();
      // create a FreeCamera, and set its position to (x, y, z)
      const camera = new BJS.FreeCamera(name,
        new BJS.Vector3(x, y, z), this.getScene());
      // target the camera to scene origin
      camera.setTarget(BJS.Vector3.Zero());
      // attach the camera to the canvas
      camera.attachControl(this.getCanvas(), false);
      // add camera to list
      this.setCamera(name, camera);
      return camera;
    },
    setupCameras() {
      this.addFreeCamera('camera1');
    }
  })
  .init( function() {
    const _cameras = new Map();
    this.getCamera = (name) => {
      if (_cameras.has(name) ) {
        return _cameras.get(name);
      }
      return null;
    };
    this.removeCamera = (name) => {
      _cameras.delete(name);
    };
    this.setCamera = (name, camera) => {
      _cameras.set(name, camera);
    };
  });

const BabylonLights = stampit
  .methods({
    addHemisphericLight(name, x = 0, y = 1, z = 0) {
      if (!this.checkDriver) {
        console.log("BablyonLights: missing driver component.");
        return null;
      }
      this.checkDriver();
      // create a basic light, aiming towards (x,y,z)
      // - where (0,1,0) means to the sky
      const light = new BJS.HemisphericLight(name,
        new BJS.Vector3(x, y, z), this.getScene());
      this.setLight(name, light);
      return light;
    },
    setupLights() {
      this.addHemisphericLight('light1');
    }
  })
  .init( function() {
    const _lights = new Map();
    this.getLight = (name) => {
      if (_lights.has(name) ) {
        return _lights.get(name);
      }
      return null;
    };
    this.removeLight = (name) => {
      _lights.delete(name);
    };
    this.setLight = (name, light) => {
      _lights.set(name, light);
    };
  });

const BabylonShapes = stampit
  .methods({
    addSphere(name, segments = 16, diameter = 2) {
      if (!this.checkDriver) {
        console.log("BablyonShapes: missing driver component.");
        return null;
      }
      this.checkDriver();
      // create a built-in "sphere" shape; its constructor takes 6 params:
      //  name, segments, diameter, scene, updateable, sideOrientation
      const sphere = BJS.Mesh.CreateSphere(name,
        segments, diameter, this.getScene(), true);
      // move the sphere upward 1/2 of its height
      sphere.position.y = 1;
      this.setShape(name, sphere);
      return sphere;
    },
    setupShapes() {
      this.addSphere('sphere1');
    }
  })
  .init( function() {
    const _shapes = new Map();
    this.getShape = (name) => {
      if (_shapes.has(name) ) {
        return _shapes.get(name);
      }
      return null;
    };
    this.removeShape = (name) => {
      _shapes.delete(name);
    };
    this.setShape = (name, shape) => {
      _shapes.set(name, shape);
    };
  });

const BabylonGrounds = stampit
  .methods({
    addGround(name, width = 6, height = 2, subdivisions = 2) {
      if (!this.checkDriver) {
        console.log("BablyonShapes: missing driver component.");
        return null;
      }
      this.checkDriver();
      // create a built-in "ground" shape
      const ground = BJS.Mesh.CreateGround(name,
        width, height, subdivisions, this.getScene());
      this.setGround(name, ground);
      return ground;
    },
    setupGrounds() {
      this.addGround('ground1');
    }
  })
  .init( function() {
    const _grounds = new Map();
    this.getGround = (name) => {
      if (_grounds.has(name) ) {
        return _grounds.get(name);
      }
      return null;
    };
    this.removeGround = (name) => {
      _grounds.delete(name);
    };
    this.setGround = (name, ground) => {
      _grounds.set(name, ground);
    };
  });


// Factory to compose stamps-based Babylon Scene Driver
export const babylonSceneDriverFactory = (canvasElement) => {

  const BabylonDriver = stampit
    .methods({
      runRenderLoop() {
        const engine = this.getEngine();
        const scene = this.getScene();
        engine.runRenderLoop(() => {
          scene.render();
        });
      },
      setup() {
        // setup scene in proper order of composition
        if ( this.setupCameras ) {
          this.setupCameras();
        }
        if ( this.setupLights ) {
          this.setupLights();
        }
        if ( this.setupShapes ) {
          this.setupShapes();
        }
        if ( this.setupGrounds ) {
          this.setupGrounds();
        }
        // return scene handle
        return this.getScene();
      }
    })
    .init( function() {
      const _canvas = this.canvas;
      const _engine = _canvas ? new BJS.Engine(_canvas, true) : null;
      const _scene = _engine ? new BJS.Scene(_engine) : null;
      this.checkDriver = () => {
        const canvas = this.getCanvas();
        if ( !canvas ) {
          console.log("BablyonSceneDriver: canvas not initialized.");
          return null;
        }
        const scene = this.getScene();
        if ( !scene ) {
          console.log("BablyonSceneDriver: scene not initialized.");
          return null;
        }
      };
      this.getCanvas = () => {
        return _canvas;
      };
      this.getEngine = () => {
        return _engine;
      };
      this.getScene = () => {
        return _scene;
      };
    });

  const BabylonSceneDriver = stampit
    .refs({
      canvas: canvasElement
    })
    .compose(
      Cloneable,
      SelfAware,
      BabylonDriver,
      BabylonCameras,
      BabylonLights,
      BabylonShapes,
      BabylonGrounds
    );
  const babylonSceneDriver = BabylonSceneDriver();

  return babylonSceneDriver;
};
