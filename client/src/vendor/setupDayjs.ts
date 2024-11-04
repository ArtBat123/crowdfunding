import 'dayjs/locale/ru';

import dayjs, { type PluginFunc } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const defaultFormat: PluginFunc = (option, dayjsClass) => {
    const oldFormat = dayjsClass.prototype.format;

    dayjsClass.prototype.format = function (template?: string) {
        if (!template) template = 'DD.MM.YYYY HH:mm:ss';
        return oldFormat.call(this, template);
    };
};

export default function () {
    dayjs.locale('ru');
    dayjs.extend(relativeTime);
    dayjs.extend(localizedFormat);
    dayjs.extend(defaultFormat);
}
