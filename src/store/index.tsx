// zustand
import { create } from "zustand";

interface Wall {
  position: { x: number; y: number; z: number };
  width: number;
  // left: {
  //   x: number;
  //   z: number;
  // };
  // right: {
  //   x: number;
  //   z: number;
  // };
  height: number;
  depth: number;
  rotationY?: number;
  windows?: Array<{
    leftBottomPosition: {
      left: number;
      bottom: number;
    };
    width: number;
    height: number;
  }>;
  doors?: [
    {
      leftBottomPosition: {
        left: number;
        bottom: number;
      };
      width: number;
      height: number;
    },
  ];
}

interface State {
  data: {
    walls: Array<Wall>;
  };
}

const useHouseStore = create<State>((set, get) => {
  return {
    data: {
      walls: [
        {
          position: { x: 0, y: 0, z: 0 },
          left: { x: 0, z: 0 },
          right: { x: 800, z: 0 },
          width: 800,
          height: 500,
          depth: 30,
          windows: [
            {
              leftBottomPosition: {
                left: 100,
                bottom: 100,
              },
              width: 600,
              height: 300,
            },
          ],
        },
        {
          position: { x: 0, y: 0, z: 800 },
          left: { x: 0, z: 0 },
          right: { x: 800, z: 0 },
          width: 800,
          height: 500,
          depth: 30,
          windows: [
            {
              leftBottomPosition: {
                left: 100,
                bottom: 100,
              },
              width: 600,
              height: 300,
            },
          ],
        },
        {
          position: { x: 0, y: 0, z: 0 },
          // left: { x: 0, z: 0 },
          // right: { x: 800, z: 0 },
          width: 800,
          height: 500,
          depth: 30,
          rotationY: -Math.PI / 2,
          windows: [
            // {
            //   leftBottomPosition: {
            //     left: 100,
            //     bottom: 100,
            //   },
            //   width: 600,
            //   height: 300,
            // },
          ],
        },
        {
          position: { x: 800, y: 0, z: 0 },
          left: { x: 0, z: 0 },
          right: { x: 800, z: 0 },
          width: 800,
          height: 500,
          depth: 30,
          rotationY: -Math.PI / 2,
          windows: [
            // {
            //   leftBottomPosition: {
            //     x: 100,
            //     z: 100,
            //   },
            //   width: 600,
            //   height: 300,
            // },
          ],
          doors: [
            {
              leftBottomPosition: {
                left: 200,
                bottom: 20,
              },
              width: 300,
              height: 400,
            },
          ],
        },
      ],
    },
  };
});

export { useHouseStore };
