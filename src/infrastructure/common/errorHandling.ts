export const handleError = (error: Error) => {
    throw new Error((error as Error).message);
}