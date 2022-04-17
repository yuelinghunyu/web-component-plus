import {PropTyp} from "../declarations";

/**
 * 格式化数据类型
 */

export function formatValue(val: any, type?: PropTyp, defaultValue?: any) {
    let newValue: any = undefined;
    if (val !== null) {
        switch (type) {
            case String:
                newValue = val;
                break;
            case Number:
                newValue = Number(val);
                break;
            case Boolean:
                newValue = !(val === 'false' || val === '0' || val === false);
                break;
            case Array:
            case Object:
                newValue = JSON.parse(
                    val.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g, '"$2":$4')
                        .replace(/'([\s\S]*?)'/g, '"$1"')
                        .replace(/,(\s*})/g, '$1')
                );
                break;
            default:
                newValue = val;
                break;
        }
    } else {
        newValue = defaultValue || null;
    }
    return newValue;
}