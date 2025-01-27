import { OnConnected, OnBeforeUpdate, WuComponent } from '@wu-component/web-core-plus';
type UISize = 'medium' | 'small' | 'mini';
export declare class WuCheckbox extends WuComponent implements OnConnected, OnBeforeUpdate {
    isGroup: boolean;
    constructor();
    groupRef: any;
    beforeUpdate(): void;
    get newDisabled(): any;
    get newSize(): any;
    get newValue(): any;
    initProps(): void;
    connected(shadowRoot: ShadowRoot): void;
    focus: boolean;
    size: UISize;
    disabled: boolean;
    value: string;
    label: string;
    indeterminate: boolean;
    checked: boolean;
    border: boolean;
    name: string;
    controls: string;
    handleChange(ev: any): void;
    private change;
    private checkChange;
    onFocus(): void;
    onBlur(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
