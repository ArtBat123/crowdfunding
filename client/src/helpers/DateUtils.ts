interface DateDiffInDaysOptions {
    roundingType?: 'floor' | 'ceil' | 'round';
    resultType?: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';
    isAbsolute?: boolean;
}

export default class DateUtils {
    public static MS_PER_DAY = 1000 * 60 * 60 * 24;
    public static MS_PER_HOUR = 1000 * 60 * 60;
    public static MS_PER_MINUTE = 1000 * 60;
    public static MS_PER_SECOND = 1000;

    public static dateDiffInDays(date1: Date, date2: Date, options: DateDiffInDaysOptions = {}) {
        const { roundingType = 'floor', resultType = 'days', isAbsolute = true } = options;

        let diff = Number(date1) - Number(date2);
        diff = isAbsolute ? Math.abs(diff) : diff;

        const msPerMeasure = {
            days: this.MS_PER_DAY,
            hours: this.MS_PER_HOUR,
            minutes: this.MS_PER_MINUTE,
            seconds: this.MS_PER_SECOND,
            milliseconds: 1,
        };
        return Math[roundingType](diff / msPerMeasure[resultType]);
    }
}
