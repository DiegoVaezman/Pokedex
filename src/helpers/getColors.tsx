import ImageColors from "react-native-image-colors"

export const getImageColors = async (uri: string) => {
    
    let color;
    try {
        const colors = await ImageColors.getColors(uri, {})
    
        if (colors.platform === "android") {
            color = colors.dominant;
        } else if (colors.platform === "ios") {
            color = colors.background
        }
    } catch (error) {
        
    }
    

    return color;
}