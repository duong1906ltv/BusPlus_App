import { Colors } from "./colors"



export const spaceBetween = {
    flexDirection: 'row',
    justifyContent: 'space-between'
}




export const iconSize = (size) => {
    return {
        width: size,
        height: size,
    }
}

export const gap = (gap) => {
    return {
        flexDirection: 'row',
        gap: gap,
    }
}

export const textBold = (size) => {
    return {
        fontWeight: 600,
        fontSize: size,
        color: "#555"
    }
}

export const round = (color, paddingHorizontal) => {
    return {
        color: color,
        borderWidth: 1,
        borderColor: color,
        padding: 2,
        paddingHorizontal: paddingHorizontal,
        borderRadius: 5,
    }
}