

let targetMap = new WeakMap<Object, Map<String, Set<Function>>>();

let activeEffect: any = null;

export function effect(eff: any) {
    activeEffect = eff;
    activeEffect();
    activeEffect = null;
}

export function track(target: Object, key: string) {

    if (activeEffect) {

        let depsMap = targetMap.get(target);

        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map<string, Set<Function>>()));
        }

        let dep = depsMap.get(key);

        if (!dep) {
            depsMap.set(key, (dep = new Set<Function>()))
        }

        dep.add(activeEffect)
    }
}
export function trigger(target: Object, key: string) {

    let depsMap = targetMap.get(target);
    if (!depsMap) return;

    let dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => effect());
    }

};