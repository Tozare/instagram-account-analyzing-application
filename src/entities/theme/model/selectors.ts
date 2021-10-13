import { useStore } from "effector-react";
import { $colorMode } from "./stores";

export const useColorMode = () => useStore($colorMode);


// export const useColors = () => {
//     const backgroundColor = "#ffffff";
//     const
// }