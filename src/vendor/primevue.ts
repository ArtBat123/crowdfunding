import type { App } from 'vue';
import {
    PrimeVue,
    Avatar,
    BadgeDirective,
    Button,
    ConfirmationService,
    DialogService,
    Divider,
    Image,
    PanelMenu,
    ProgressBar,
    Ripple,
    Sidebar,
    StyleClass,
    ToastService,
    Toolbar,
    Tooltip,
    Menu,
    Card,
    ContextMenu,
    OverlayPanel,
    Calendar,
    SelectButton,
    Dropdown,
    ProgressSpinner,
    SplitterPanel,
    Splitter,
    DataTable,
    Column,
    TreeTable,
    Checkbox,
    InputText,
    Listbox,
    VirtualScroller,
    Dialog,
    MultiSelect,
    Toast,
    InputNumber,
    FileUpload,
    Accordion,
    AccordionTab,
    Tree,
    TabView,
    TabPanel,
    SplitButton,
} from './components';

export default function regPrimeVue(app: App) {
    app.use(PrimeVue, {
        ripple: true,
        // locale: app.config.globalProperties.$tm('primeVue'),
    });
    app.use(ConfirmationService);
    app.use(DialogService);
    app.use(ToastService);
    app.directive('tooltip', Tooltip);
    app.directive('badge', BadgeDirective);
    app.directive('ripple', Ripple);
    app.directive('styleclass', StyleClass);
    app.component('PAvatar', Avatar);
    app.component('PButton', Button);
    app.component('PDivider', Divider);
    app.component('PImage', Image);
    app.component('PPanelMenu', PanelMenu);
    app.component('PProgressBar', ProgressBar);
    app.component('PSidebar', Sidebar);
    app.component('PToolbar', Toolbar);
    app.component('PMenu', Menu);
    app.component('PCard', Card);
    app.component('PContextMenu', ContextMenu);
    app.component('POverlayPanel', OverlayPanel);
    app.component('PCalendar', Calendar);
    app.component('PSelectButton', SelectButton);
    app.component('PDropdown', Dropdown);
    app.component('PProgressSpinner', ProgressSpinner);
    app.component('PSplitterPanel', SplitterPanel);
    app.component('PSplitter', Splitter);
    app.component('PDataTable', DataTable);
    app.component('PColumn', Column);
    app.component('PTreeTable', TreeTable);
    app.component('PCheckbox', Checkbox);
    app.component('PInputText', InputText);
    app.component('PListbox', Listbox);
    app.component('PVirtualScroller', VirtualScroller);
    app.component('PDialog', Dialog);
    app.component('PMultiSelect', MultiSelect);
    app.component('PToast', Toast);
    app.component('PInputNumber', InputNumber);
    app.component('PFileUpload', FileUpload);
    app.component('PAccordion', Accordion);
    app.component('PAccordionTab', AccordionTab);
    app.component('PTree', Tree);
    app.component('PTabView', TabView);
    app.component('PTabPanel', TabPanel);
    app.component('PSplitButton', SplitButton);
}
