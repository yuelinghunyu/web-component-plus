import { h, Component, Prop, OnConnected, WuComponent, Inject } from '@canyuegongzi/web-core-plus';
import "@canyuegongzi/web-ui-plus/dist/wu-tooltip/lib/index.esm";
import css from './index.scss';
import { WuMenu } from "../wu-menu";
import { extractClass } from "@/common";
type ShadowEnums = 'always' | 'hover' | 'never';

@Component({
    name: 'wu-plus-menu-item',
    css: css,
})
export class WuMenuItem extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.wuMenuRef?.addItem(this);
        this.parentMenu.addItem(this);
    }

    @Prop({ default: '' })
    public header: string;

    @Prop({ default: { padding: '20px' } })
    public bodyStyle: Record<any, any>;

    @Prop({ default: 'always', type: String })
    public shadow: ShadowEnums;

    @Prop({ default: true, type: Boolean })
    public headerShow: boolean;

    @Prop({ default: '', type: String })
    public index: string;

    public disabled: boolean;

    @Inject('wuMenuRef')
    public wuMenuRef: WuMenu


    public handleClick() {
        if (!this.disabled) {
            this.wuMenuRef?.handleItemClick(this);
            console.log('this.active', this.active);
            this.update();
        }

    }

    public onMouseEnter() {
        if (this.mode === 'horizontal' && !this.wuMenuRef?.backgroundColor) return;
        this.shadowRoot.querySelector('li').style.backgroundColor = this.hoverBackground;
    }

    public onMouseLeave() {
        if (this.mode === 'horizontal' && !this.wuMenuRef?.backgroundColor) return;
        this.shadowRoot.querySelector('li').style.backgroundColor = this.backgroundColor;
    }
    get paddingStyle() {
        if (this.wuMenuRef?.mode !== 'vertical') return {};

        let padding = 20;
        let parent = this.parentNode;

        if (this.wuMenuRef?.collapse) {
            padding = 20;
        } else {
            while (parent && parent.tagName !== 'WU-PLUS-MENU') {
                if (parent.tagName === 'WU-PLUS-SUB-MENU') {
                    padding += 20;
                }
                parent = parent.parentNode;
            }
        }
        return { paddingLeft: padding + 'px' };
    }

    get active() {
        return this.index === this.wuMenuRef?.activeIndex;
    }

    get hoverBackground() {
        return this.wuMenuRef?.hoverBackground;
    }
    get backgroundColor() {
        return this.wuMenuRef?.backgroundColor || '';
    }
    get activeTextColor() {
        return this.wuMenuRef?.activeTextColor || '';
    }
    get textColor() {
        return this.wuMenuRef?.textColor || '';
    }

    get mode() {
        return this.wuMenuRef?.mode;
    }
    get itemStyle() {
        const style: Record<any, any> = {
            color: this.active ? this.activeTextColor : this.textColor
        };
        if (this.mode === 'horizontal' && !this.isNested) {
            style.borderBottomColor = this.active
                ? (this.wuMenuRef?.activeTextColor ? this.activeTextColor : '')
                : 'transparent';
        }
        return style;
    }

    public isNested() {
        return this.parentMenu !== this.wuMenuRef;
    }

    get parentMenu() {
        return this?.parentNode;
    }

    get isSlotTitle() {
        return true;
    }
    public override render(_renderProps = {}, _store = {}) {
        return (
            <li
                role="menuitem"
                tabindex="-1"
                {...extractClass({}, '', {
                    'is-active': this.active,
                    'is-disabled': this.disabled,
                    'wu-menu-item': true
                })}
                style={{ ...this.paddingStyle, ...this.itemStyle, backgroundColor: this.backgroundColor }}
                onClick={() => this.handleClick()}
                onMouseenter={() => this.onMouseEnter()}
                onFocus={() => this.onMouseEnter()}
                onBlur={() => this.onMouseLeave()}
                onMouseleave={() => this.onMouseLeave()}
            >
                {
                    this.parentNode.tagName === 'ElMenu' && this.wuMenuRef.collapse && this.isSlotTitle ? (
                        <wu-plus-tooltip effect="dark" position="right">
                            <div slot="content">
                                <slot name="title"></slot>
                            </div>
                            <div style="position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 20px;">
                                <slot></slot>
                            </div>
                        </wu-plus-tooltip>
                    ) : (
                        <div>
                            <slot></slot>
                            <slot name="title"></slot>
                        </div>
                    )
                }
            </li>
        );
    }
}
