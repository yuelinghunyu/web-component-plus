﻿import { h, Component, Prop, Emit, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import "@wu-component/wu-popover";
import "@wu-component/wu-button";
import type { WuPopover } from "../types/type";

@Component({
    name: 'wu-plus-popconfirm',
    css: css,
})
export class WuPopconfirm extends WuComponent {
    constructor() {
        super();
    }

    private popoverRef!: WuPopover;

    @Prop({ default: '', type: String })
    public content: string;

    @Prop({ default: '', type: String })
    public confirmButtonText: string;

    @Prop({ default: '', type: String })
    public cancelButtonText: string;

    @Prop({ default: 'primary', type: String })
    public confirmButtonType: string;

    @Prop({ default: 'text', type: String })
    public cancelButtonType: string;

    @Prop({ default: '' })
    public icon: any;

    @Prop({ default: '#f90', type: String })
    public iconColor: string;

    @Prop({ default: false, type: Boolean })
    public hideIcon: string;

    @Prop({ default: false, type: Boolean })
    public visible: boolean;

    get displayConfirmButtonText() {
        return this.confirmButtonText;
    }
    get displayCancelButtonText() {
        return this.cancelButtonText;
    }

    @Emit("confirm")
    public confirm() {
        this.visible = false;
        // this.popoverRef?.leave();
        this.popoverRef.isShow = false;
        this.popoverRef.update();
    }

    @Emit("cancel")
    public cancel() {
        this.visible = false;
        this.popoverRef.isShow = false;
        this.popoverRef.update();
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            // @ts-ignore
            <wu-plus-popover trigger="click" is-show={this.visible} ref={(e) => this.popoverRef = e}>
                <div class="wu-popconfirm" slot="popover">
                    <p class="wu-popconfirm_main">
                        {
                            !this.hideIcon ? <slot name="icon" slot="icon" /> : null
                        }
                        {this.content}
                    </p>
                    <div class="wu-popconfirm_action">
                        {/*// @ts-ignore*/}
                        <wu-plus-button
                            size="mini"
                            type={this.cancelButtonType}
                            onClick={() => this.cancel()}>
                            {this.displayCancelButtonText}
                            {/*// @ts-ignore*/}
                        </wu-plus-button>
                        {/*// @ts-ignore*/}
                        <wu-plus-button
                            style="margin-left: 10px;"
                            size="mini"
                            type={this.confirmButtonType}
                            onClick={() => this.confirm()}>
                            {this.displayConfirmButtonText}
                            {/*// @ts-ignore*/}
                        </wu-plus-button>
                    </div>
                </div>
                <div>
                    <slot name="reference" />
                </div>
                {/*// @ts-ignore*/}
            </wu-plus-popover>
        );
    }
}
