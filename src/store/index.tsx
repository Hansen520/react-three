import { create } from "zustand";

interface Wall {
    left: {
        x: number,
        z: number
    },
    right: {
        x: number,
        z: number
    },
    height: number,
    depth: number,
    windows: [
        {
            leftBottomPosition: {
                x: number,
                z: number
            },
            width: number,
            height: number
        }
    ]
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
          left: { x: 0, z: 0 },
          right: { x: 800, z: 0 },
          height: 500,
          depth: 30,
          windows: [
            {
              leftBottomPosition: {
                x: 100,
                z: 100,
              },
              width: 600,
              height: 300,
            },
          ],
        },
      ],
    },
  };
});

export { useHouseStore };
