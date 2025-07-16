import { Dimensions } from "react-native"; 

const { width, height } = Dimensions.get("window");

const guideLineBaseWidth = 320;
const guideLineBaseHeight = 568;

const scale = (size) => (width / guideLineBaseWidth) * size;
const verticalScale = (size) => (height / guideLineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
