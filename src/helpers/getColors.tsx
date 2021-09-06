import ImageColors from "react-native-image-colors"

export const getImageColors = async (uri: string) => {

    const colors = await ImageColors.getColors(uri, {})
    
    let color;

    if (colors.platform === "android") {
        color = colors.dominant;
    } else if (colors.platform === "ios") {
        color = colors.background
    }

    return color;
}