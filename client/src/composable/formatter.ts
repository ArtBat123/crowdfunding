const CURRENCY_FORMAT = new Intl.NumberFormat('ru', { style: 'decimal' });
const DATE_FORMAT = new Intl.DateTimeFormat('ru');

export function useFormatter() {
    function currencyFormat(number?: number | string) {
        return CURRENCY_FORMAT.format(Number(number));
    }
    function dateFormat(date?: number | string | Date) {
        if (!date) return null;
        return DATE_FORMAT.format(new Date(date));
    }

    return { currencyFormat, dateFormat };
}
