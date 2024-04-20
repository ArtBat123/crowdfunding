/* eslint-disable vue/no-reserved-component-names */
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
    Password,
    TabMenu,
    RadioButton,
    InputGroup,
    InputGroupAddon,
    IconField,
    InputIcon,
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
    app.component('Avatar', Avatar);
    app.component('Button', Button);
    app.component('Divider', Divider);
    app.component('Image', Image);
    app.component('PanelMenu', PanelMenu);
    app.component('ProgressBar', ProgressBar);
    app.component('Sidebar', Sidebar);
    app.component('Toolbar', Toolbar);
    app.component('Menu', Menu);
    app.component('Card', Card);
    app.component('ContextMenu', ContextMenu);
    app.component('OverlayPanel', OverlayPanel);
    app.component('Calendar', Calendar);
    app.component('SelectButton', SelectButton);
    app.component('Dropdown', Dropdown);
    app.component('ProgressSpinner', ProgressSpinner);
    app.component('SplitterPanel', SplitterPanel);
    app.component('Splitter', Splitter);
    app.component('DataTable', DataTable);
    app.component('Column', Column);
    app.component('TreeTable', TreeTable);
    app.component('Checkbox', Checkbox);
    app.component('InputText', InputText);
    app.component('Listbox', Listbox);
    app.component('VirtualScroller', VirtualScroller);
    app.component('Dialog', Dialog);
    app.component('MultiSelect', MultiSelect);
    app.component('Toast', Toast);
    app.component('InputNumber', InputNumber);
    app.component('FileUpload', FileUpload);
    app.component('Accordion', Accordion);
    app.component('AccordionTab', AccordionTab);
    app.component('Tree', Tree);
    app.component('TabView', TabView);
    app.component('TabPanel', TabPanel);
    app.component('SplitButton', SplitButton);
    app.component('Password', Password);
    app.component('TabMenu', TabMenu);
    app.component('RadioButton', RadioButton);
    app.component('InputGroup', InputGroup);
    app.component('InputGroupAddon', InputGroupAddon);
    app.component('IconField', IconField);
    app.component('InputIcon', InputIcon);
}
