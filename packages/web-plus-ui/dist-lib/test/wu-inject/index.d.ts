import { OnConnected, WuComponent } from '@canyuegongzi/web-core-plus';
export declare class WuInject extends WuComponent implements OnConnected {
    injectionName: any;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
}
