// const type = {
//   thin: 'S-CoreDream-1Thin',
//   light: 'S-CoreDream-3Light',
//   extraLight: 'S-CoreDream-2ExtraLight',
//   regular: 'S-CoreDream-4Regular',
//   medium: 'S-CoreDream-5Medium',
//   bold: 'S-CoreDream-6Bold',
//   extraBold: 'S-CoreDream-7ExtraBold',
//   heavy: 'S-CoreDream-8Heavy',
//   black: 'S-CoreDream-9Black',
// };

const size = {
    h1: 34,
    h2: 32,
    h3: 30,
    h4: 24,
    h5: 20,
    h6: 18,
    title: 18,
    normal: 16,
    regular: 14,
    medium: 12,
    small: 10,
    tiny: 8.5,
};

const fontWeight = {};

const style = {
    h1: {
        // fontFamily: type.medium,
        fontSize: size.h1,
    },
    h2: {
        // fontFamily: type.medium,
        fontSize: size.h2,
    },
    h3: {
        // fontFamily: type.medium,
        fontSize: size.h3,
    },
    h4: {
        // fontFamily: type.medium,
        fontSize: size.h4,
    },
    h5: {
        // fontFamily: type.medium,
        fontSize: size.h5,
    },
    h6: {
        // fontFamily: type.medium,
        fontSize: size.h6,
    },
    title: {
        // fontFamily: type.extraLight,
        fontSize: size.title,
    },
    normal: {
        // fontFamily: type.extraLight,
        fontSize: size.regular,
    },
    description: {
        // fontFamily: type.extraLight,
        fontSize: size.medium,
    },
};

export default {
    // type,
    size,
    style,
    fontWeight,
};
