import ImageValidatorPropType from "./imageValidator.props.types";

const imageValidator = ({
    file,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    isSquare }: ImageValidatorPropType): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = () => {
            const { width, height } = image;

            minWidth && width < minWidth && resolve(false);
            minHeight && height < minHeight && resolve(false);
            maxWidth && width > maxWidth && resolve(false);
            maxHeight && height > maxHeight && resolve(false);
            isSquare && width !== height && resolve(false);

            resolve(true);
        };

        image.onerror = () => resolve(false);
    })
};

export default imageValidator;