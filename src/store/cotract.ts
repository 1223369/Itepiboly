import { defineStore } from "pinia";

export const contractStore = defineStore({
  id: "contract",
  state: () => {
    return {
      contractScoll: 0,
    };
  },

  actions: {
    setContractScoll(value: number) {
      this.contractScoll = value;
    },
  },
});
