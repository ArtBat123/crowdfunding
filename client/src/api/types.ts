export interface PaginatedResponse<T> {
    data: T; // Общее количество элементов
    endKey: number; // Идентификатор записи последнего элемента
    isLastPage: boolean; // Признак последней страницы
}
export interface PaginationParams {
    limit: number;
    startKey?: number;
}
