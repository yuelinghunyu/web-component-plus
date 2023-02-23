import { Component, Emit, h, Inject, Prop, WuComponent, OnConnected } from '@wu-component/web-core-plus';
import css from './index.scss';
type UISize = 'medium' | 'small' | 'mini';
import { extractClass } from '@wu-component/common';

@Component({
    name: 'wu-plus-select-option',
    css: css,
})
export class WuSelectOptions extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Inject('selectRef')
    public selectRef: any;

    @Prop({ default: '', type: String })
    public label: string;

    @Prop({ default: false, type: Boolean })
    public disabled: string;

    @Prop({ default: true, type: Boolean })
    public visible: boolean = true;

    @Prop({ default: '' })
    public value: string;

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public selected = false;

    public show = true;

    @Emit('close')
    public handleClose(event: Event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        return {
            event,
            label: this.label,
            value: this.value,
        };
    }

    @Emit('click')
    public handleClick(event) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        return {
            event,
            label: this.label,
            value: this.value,
        };
    }

    /**
     * 设置勾选
     * @param val
     */
    public setSelect(val: boolean) {
        this.selected = val;
    }

    /**
     * 更新是否显示
     * @param val
     */
    public setVisible(val: boolean) {
        this.visible = val;
        this.show = val;
        this.update();
    }

    get hover() {
        return true;
    }

    @Emit('itemClick')
    public selectOptionClick() {
        return this;
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.show = this.visible;
    }

    public clickItem(event: MouseEvent) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        this.selectOptionClick();
        this.selectRef?.itemClick?.(this);
    }

    public hoverItem() {
        if (this.disabled || !this.selectRef) return;
        this.selectRef.hoverIndex = this.selectRef?.selectedItems.indexOf(this);
    }

    /**
     * 更新是否选择
     */
    public updateSelect() {
        const selectOptions: WuSelectOptions[] = this.selectRef?.selectedItems;
        this.setSelect(selectOptions.includes(this));
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div
                {...extractClass({}, '', {
                    selected: this.selected,
                    'is-disabled': this.disabled,
                    'wu-select-dropdown_item': true,
                })}
                style={{ visibility: (!this.visible || !this.show) ? 'hidden' : 'visible', height: (!this.visible || !this.show) ? 0 : 'auto' }}
                // @ts-ignore
                onclick={this.clickItem.bind(this)}
                onMouseenter={this.hoverItem.bind(this)}
            >
                <span class={this.selected ? 'selected' : ''}>{this.label}</span>
                {this.selected ? (
                    // @ts-ignore
                    <svg class="a3 a2" focusable="false" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1" title="Check" curr>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                ) : null}
            </div>
        );
    }
}
