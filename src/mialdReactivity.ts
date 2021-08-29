import { effect, track, trigger } from "./base";

export function reactive(target: any) {
    const handler = {
        get(target: any, key: any, receiver: any) {
            let res = Reflect.get(target, key, receiver);
            track(target, key);
            return res;
        },
        set(target: any, key: any, value: any, receiver: any) {
            let oldValue = target[key];
            let res = Reflect.set(target, key, value, receiver)
            if (res && oldValue != value) {
                trigger(target, key);
            }
            return res;
        }
    }
    return new Proxy(target, handler);
}

export function ref(raw: any = null) {
    const r = {
        get value() {
            track(r, 'value');
            return raw;
        },
        set value(newVal) {
            raw = newVal;
            trigger(r, 'value');
        }
    }
    return r;
}

export function computed(getters: any) {
    let res = ref();

    effect(() => (res.value = getters()))

    return res;
}
