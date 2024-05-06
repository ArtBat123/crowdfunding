export function debounce<T extends (...args: Parameters<T>) => void>(
    this: ThisParameterType<T>,
    func: T,
    ms: number
) {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), ms);
    };
}
