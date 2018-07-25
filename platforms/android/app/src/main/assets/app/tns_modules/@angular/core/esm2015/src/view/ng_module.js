/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { resolveForwardRef } from '../di/forward_ref';
import { INJECTOR, Injector, setCurrentInjector } from '../di/injector';
import { APP_ROOT } from '../di/scope';
import { NgModuleRef } from '../linker/ng_module_factory';
import { stringify } from '../util';
import { splitDepsDsl, tokenKey } from './util';
const /** @type {?} */ UNDEFINED_VALUE = new Object();
const /** @type {?} */ InjectorRefTokenKey = tokenKey(Injector);
const /** @type {?} */ INJECTORRefTokenKey = tokenKey(INJECTOR);
const /** @type {?} */ NgModuleRefTokenKey = tokenKey(NgModuleRef);
/**
 * @param {?} flags
 * @param {?} token
 * @param {?} value
 * @param {?} deps
 * @return {?}
 */
export function moduleProvideDef(flags, token, value, deps) {
    // Need to resolve forwardRefs as e.g. for `useValue` we
    // lowered the expression and then stopped evaluating it,
    // i.e. also didn't unwrap it.
    value = resolveForwardRef(value);
    const /** @type {?} */ depDefs = splitDepsDsl(deps, stringify(token));
    return {
        // will bet set by the module definition
        index: -1,
        deps: depDefs, flags, token, value
    };
}
/**
 * @param {?} providers
 * @return {?}
 */
export function moduleDef(providers) {
    const /** @type {?} */ providersByKey = {};
    const /** @type {?} */ modules = [];
    let /** @type {?} */ isRoot = false;
    for (let /** @type {?} */ i = 0; i < providers.length; i++) {
        const /** @type {?} */ provider = providers[i];
        if (provider.token === APP_ROOT) {
            isRoot = true;
        }
        if (provider.flags & 1073741824 /* TypeNgModule */) {
            modules.push(provider.token);
        }
        provider.index = i;
        providersByKey[tokenKey(provider.token)] = provider;
    }
    return {
        // Will be filled later...
        factory: null,
        providersByKey,
        providers,
        modules,
        isRoot,
    };
}
/**
 * @param {?} data
 * @return {?}
 */
export function initNgModule(data) {
    const /** @type {?} */ def = data._def;
    const /** @type {?} */ providers = data._providers = new Array(def.providers.length);
    for (let /** @type {?} */ i = 0; i < def.providers.length; i++) {
        const /** @type {?} */ provDef = def.providers[i];
        if (!(provDef.flags & 4096 /* LazyProvider */)) {
            // Make sure the provider has not been already initialized outside this loop.
            if (providers[i] === undefined) {
                providers[i] = _createProviderInstance(data, provDef);
            }
        }
    }
}
/**
 * @param {?} data
 * @param {?} depDef
 * @param {?=} notFoundValue
 * @return {?}
 */
export function resolveNgModuleDep(data, depDef, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
    const /** @type {?} */ former = setCurrentInjector(data);
    try {
        if (depDef.flags & 8 /* Value */) {
            return depDef.token;
        }
        if (depDef.flags & 2 /* Optional */) {
            notFoundValue = null;
        }
        if (depDef.flags & 1 /* SkipSelf */) {
            return data._parent.get(depDef.token, notFoundValue);
        }
        const /** @type {?} */ tokenKey = depDef.tokenKey;
        switch (tokenKey) {
            case InjectorRefTokenKey:
            case INJECTORRefTokenKey:
            case NgModuleRefTokenKey:
                return data;
        }
        const /** @type {?} */ providerDef = data._def.providersByKey[tokenKey];
        if (providerDef) {
            let /** @type {?} */ providerInstance = data._providers[providerDef.index];
            if (providerInstance === undefined) {
                providerInstance = data._providers[providerDef.index] =
                    _createProviderInstance(data, providerDef);
            }
            return providerInstance === UNDEFINED_VALUE ? undefined : providerInstance;
        }
        else if (depDef.token.ngInjectableDef && targetsModule(data, depDef.token.ngInjectableDef)) {
            const /** @type {?} */ injectableDef = /** @type {?} */ (depDef.token.ngInjectableDef);
            const /** @type {?} */ key = tokenKey;
            const /** @type {?} */ index = data._providers.length;
            data._def.providersByKey[depDef.tokenKey] = {
                flags: 1024 /* TypeFactoryProvider */ | 4096 /* LazyProvider */,
                value: injectableDef.factory,
                deps: [], index,
                token: depDef.token,
            };
            data._providers[index] = UNDEFINED_VALUE;
            return (data._providers[index] =
                _createProviderInstance(data, data._def.providersByKey[depDef.tokenKey]));
        }
        else if (depDef.flags & 4 /* Self */) {
            return notFoundValue;
        }
        return data._parent.get(depDef.token, notFoundValue);
    }
    finally {
        setCurrentInjector(former);
    }
}
/**
 * @param {?} ngModule
 * @param {?} scope
 * @return {?}
 */
function moduleTransitivelyPresent(ngModule, scope) {
    return ngModule._def.modules.indexOf(scope) > -1;
}
/**
 * @param {?} ngModule
 * @param {?} def
 * @return {?}
 */
function targetsModule(ngModule, def) {
    return def.providedIn != null && (moduleTransitivelyPresent(ngModule, def.providedIn) ||
        def.providedIn === 'root' && ngModule._def.isRoot);
}
/**
 * @param {?} ngModule
 * @param {?} providerDef
 * @return {?}
 */
function _createProviderInstance(ngModule, providerDef) {
    let /** @type {?} */ injectable;
    switch (providerDef.flags & 201347067 /* Types */) {
        case 512 /* TypeClassProvider */:
            injectable = _createClass(ngModule, providerDef.value, providerDef.deps);
            break;
        case 1024 /* TypeFactoryProvider */:
            injectable = _callFactory(ngModule, providerDef.value, providerDef.deps);
            break;
        case 2048 /* TypeUseExistingProvider */:
            injectable = resolveNgModuleDep(ngModule, providerDef.deps[0]);
            break;
        case 256 /* TypeValueProvider */:
            injectable = providerDef.value;
            break;
    }
    // The read of `ngOnDestroy` here is slightly expensive as it's megamorphic, so it should be
    // avoided if possible. The sequence of checks here determines whether ngOnDestroy needs to be
    // checked. It might not if the `injectable` isn't an object or if NodeFlags.OnDestroy is already
    // set (ngOnDestroy was detected statically).
    if (injectable !== UNDEFINED_VALUE && injectable != null && typeof injectable === 'object' &&
        !(providerDef.flags & 131072 /* OnDestroy */) && typeof injectable.ngOnDestroy === 'function') {
        providerDef.flags |= 131072 /* OnDestroy */;
    }
    return injectable === undefined ? UNDEFINED_VALUE : injectable;
}
/**
 * @param {?} ngModule
 * @param {?} ctor
 * @param {?} deps
 * @return {?}
 */
function _createClass(ngModule, ctor, deps) {
    const /** @type {?} */ len = deps.length;
    switch (len) {
        case 0:
            return new ctor();
        case 1:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]));
        case 2:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));
        case 3:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));
        default:
            const /** @type {?} */ depValues = new Array(len);
            for (let /** @type {?} */ i = 0; i < len; i++) {
                depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
            }
            return new ctor(...depValues);
    }
}
/**
 * @param {?} ngModule
 * @param {?} factory
 * @param {?} deps
 * @return {?}
 */
function _callFactory(ngModule, factory, deps) {
    const /** @type {?} */ len = deps.length;
    switch (len) {
        case 0:
            return factory();
        case 1:
            return factory(resolveNgModuleDep(ngModule, deps[0]));
        case 2:
            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));
        case 3:
            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));
        default:
            const /** @type {?} */ depValues = Array(len);
            for (let /** @type {?} */ i = 0; i < len; i++) {
                depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
            }
            return factory(...depValues);
    }
}
/**
 * @param {?} ngModule
 * @param {?} lifecycles
 * @return {?}
 */
export function callNgModuleLifecycle(ngModule, lifecycles) {
    const /** @type {?} */ def = ngModule._def;
    const /** @type {?} */ destroyed = new Set();
    for (let /** @type {?} */ i = 0; i < def.providers.length; i++) {
        const /** @type {?} */ provDef = def.providers[i];
        if (provDef.flags & 131072 /* OnDestroy */) {
            const /** @type {?} */ instance = ngModule._providers[i];
            if (instance && instance !== UNDEFINED_VALUE) {
                const /** @type {?} */ onDestroy = instance.ngOnDestroy;
                if (typeof onDestroy === 'function' && !destroyed.has(instance)) {
                    onDestroy.apply(instance);
                    destroyed.add(instance);
                }
            }
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvdmlldy9uZ19tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsUUFBUSxFQUFlLFFBQVEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25GLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHbEMsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFFOUMsdUJBQU0sZUFBZSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFckMsdUJBQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLHVCQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQyx1QkFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7O0FBRWxELE1BQU0sMkJBQ0YsS0FBZ0IsRUFBRSxLQUFVLEVBQUUsS0FBVSxFQUN4QyxJQUErQjs7OztJQUlqQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsdUJBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckQsTUFBTSxDQUFDOztRQUVMLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDVCxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FB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QkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzlDLHVCQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLHlCQUFzQixDQUFDLENBQUMsQ0FBQztZQUN4Qyx1QkFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLHVCQUFNLFNBQVMsR0FBdUIsUUFBUSxDQUFDLFdBQVcsQ0FBQztnQkFDM0QsRUFBRSxDQUFDLENBQUMsT0FBTyxTQUFTLEtBQUssVUFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzFCLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3pCO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZURlZn0gZnJvbSAnLi4vZGkvZGVmcyc7XG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuLi9kaS9mb3J3YXJkX3JlZic7XG5pbXBvcnQge0lOSkVDVE9SLCBJbmplY3RGbGFncywgSW5qZWN0b3IsIHNldEN1cnJlbnRJbmplY3Rvcn0gZnJvbSAnLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtBUFBfUk9PVH0gZnJvbSAnLi4vZGkvc2NvcGUnO1xuaW1wb3J0IHtOZ01vZHVsZVJlZn0gZnJvbSAnLi4vbGlua2VyL25nX21vZHVsZV9mYWN0b3J5JztcbmltcG9ydCB7c3RyaW5naWZ5fSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtEZXBEZWYsIERlcEZsYWdzLCBOZ01vZHVsZURhdGEsIE5nTW9kdWxlRGVmaW5pdGlvbiwgTmdNb2R1bGVQcm92aWRlckRlZiwgTm9kZUZsYWdzfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7c3BsaXREZXBzRHNsLCB0b2tlbktleX0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgVU5ERUZJTkVEX1ZBTFVFID0gbmV3IE9iamVjdCgpO1xuXG5jb25zdCBJbmplY3RvclJlZlRva2VuS2V5ID0gdG9rZW5LZXkoSW5qZWN0b3IpO1xuY29uc3QgSU5KRUNUT1JSZWZUb2tlbktleSA9IHRva2VuS2V5KElOSkVDVE9SKTtcbmNvbnN0IE5nTW9kdWxlUmVmVG9rZW5LZXkgPSB0b2tlbktleShOZ01vZHVsZVJlZik7XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2R1bGVQcm92aWRlRGVmKFxuICAgIGZsYWdzOiBOb2RlRmxhZ3MsIHRva2VuOiBhbnksIHZhbHVlOiBhbnksXG4gICAgZGVwczogKFtEZXBGbGFncywgYW55XSB8IGFueSlbXSk6IE5nTW9kdWxlUHJvdmlkZXJEZWYge1xuICAvLyBOZWVkIHRvIHJlc29sdmUgZm9yd2FyZFJlZnMgYXMgZS5nLiBmb3IgYHVzZVZhbHVlYCB3ZVxuICAvLyBsb3dlcmVkIHRoZSBleHByZXNzaW9uIGFuZCB0aGVuIHN0b3BwZWQgZXZhbHVhdGluZyBpdCxcbiAgLy8gaS5lLiBhbHNvIGRpZG4ndCB1bndyYXAgaXQuXG4gIHZhbHVlID0gcmVzb2x2ZUZvcndhcmRSZWYodmFsdWUpO1xuICBjb25zdCBkZXBEZWZzID0gc3BsaXREZXBzRHNsKGRlcHMsIHN0cmluZ2lmeSh0b2tlbikpO1xuICByZXR1cm4ge1xuICAgIC8vIHdpbGwgYmV0IHNldCBieSB0aGUgbW9kdWxlIGRlZmluaXRpb25cbiAgICBpbmRleDogLTEsXG4gICAgZGVwczogZGVwRGVmcywgZmxhZ3MsIHRva2VuLCB2YWx1ZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kdWxlRGVmKHByb3ZpZGVyczogTmdNb2R1bGVQcm92aWRlckRlZltdKTogTmdNb2R1bGVEZWZpbml0aW9uIHtcbiAgY29uc3QgcHJvdmlkZXJzQnlLZXk6IHtba2V5OiBzdHJpbmddOiBOZ01vZHVsZVByb3ZpZGVyRGVmfSA9IHt9O1xuICBjb25zdCBtb2R1bGVzID0gW107XG4gIGxldCBpc1Jvb3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHByb3ZpZGVyc1tpXTtcbiAgICBpZiAocHJvdmlkZXIudG9rZW4gPT09IEFQUF9ST09UKSB7XG4gICAgICBpc1Jvb3QgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAocHJvdmlkZXIuZmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZU5nTW9kdWxlKSB7XG4gICAgICBtb2R1bGVzLnB1c2gocHJvdmlkZXIudG9rZW4pO1xuICAgIH1cbiAgICBwcm92aWRlci5pbmRleCA9IGk7XG4gICAgcHJvdmlkZXJzQnlLZXlbdG9rZW5LZXkocHJvdmlkZXIudG9rZW4pXSA9IHByb3ZpZGVyO1xuICB9XG4gIHJldHVybiB7XG4gICAgLy8gV2lsbCBiZSBmaWxsZWQgbGF0ZXIuLi5cbiAgICBmYWN0b3J5OiBudWxsLFxuICAgIHByb3ZpZGVyc0J5S2V5LFxuICAgIHByb3ZpZGVycyxcbiAgICBtb2R1bGVzLFxuICAgIGlzUm9vdCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXROZ01vZHVsZShkYXRhOiBOZ01vZHVsZURhdGEpIHtcbiAgY29uc3QgZGVmID0gZGF0YS5fZGVmO1xuICBjb25zdCBwcm92aWRlcnMgPSBkYXRhLl9wcm92aWRlcnMgPSBuZXcgQXJyYXkoZGVmLnByb3ZpZGVycy5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZi5wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcm92RGVmID0gZGVmLnByb3ZpZGVyc1tpXTtcbiAgICBpZiAoIShwcm92RGVmLmZsYWdzICYgTm9kZUZsYWdzLkxhenlQcm92aWRlcikpIHtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgcHJvdmlkZXIgaGFzIG5vdCBiZWVuIGFscmVhZHkgaW5pdGlhbGl6ZWQgb3V0c2lkZSB0aGlzIGxvb3AuXG4gICAgICBpZiAocHJvdmlkZXJzW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvdmlkZXJzW2ldID0gX2NyZWF0ZVByb3ZpZGVySW5zdGFuY2UoZGF0YSwgcHJvdkRlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlTmdNb2R1bGVEZXAoXG4gICAgZGF0YTogTmdNb2R1bGVEYXRhLCBkZXBEZWY6IERlcERlZiwgbm90Rm91bmRWYWx1ZTogYW55ID0gSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5EKTogYW55IHtcbiAgY29uc3QgZm9ybWVyID0gc2V0Q3VycmVudEluamVjdG9yKGRhdGEpO1xuICB0cnkge1xuICAgIGlmIChkZXBEZWYuZmxhZ3MgJiBEZXBGbGFncy5WYWx1ZSkge1xuICAgICAgcmV0dXJuIGRlcERlZi50b2tlbjtcbiAgICB9XG4gICAgaWYgKGRlcERlZi5mbGFncyAmIERlcEZsYWdzLk9wdGlvbmFsKSB7XG4gICAgICBub3RGb3VuZFZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKGRlcERlZi5mbGFncyAmIERlcEZsYWdzLlNraXBTZWxmKSB7XG4gICAgICByZXR1cm4gZGF0YS5fcGFyZW50LmdldChkZXBEZWYudG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICAgIH1cbiAgICBjb25zdCB0b2tlbktleSA9IGRlcERlZi50b2tlbktleTtcbiAgICBzd2l0Y2ggKHRva2VuS2V5KSB7XG4gICAgICBjYXNlIEluamVjdG9yUmVmVG9rZW5LZXk6XG4gICAgICBjYXNlIElOSkVDVE9SUmVmVG9rZW5LZXk6XG4gICAgICBjYXNlIE5nTW9kdWxlUmVmVG9rZW5LZXk6XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBjb25zdCBwcm92aWRlckRlZiA9IGRhdGEuX2RlZi5wcm92aWRlcnNCeUtleVt0b2tlbktleV07XG4gICAgaWYgKHByb3ZpZGVyRGVmKSB7XG4gICAgICBsZXQgcHJvdmlkZXJJbnN0YW5jZSA9IGRhdGEuX3Byb3ZpZGVyc1twcm92aWRlckRlZi5pbmRleF07XG4gICAgICBpZiAocHJvdmlkZXJJbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3ZpZGVySW5zdGFuY2UgPSBkYXRhLl9wcm92aWRlcnNbcHJvdmlkZXJEZWYuaW5kZXhdID1cbiAgICAgICAgICAgIF9jcmVhdGVQcm92aWRlckluc3RhbmNlKGRhdGEsIHByb3ZpZGVyRGVmKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm92aWRlckluc3RhbmNlID09PSBVTkRFRklORURfVkFMVUUgPyB1bmRlZmluZWQgOiBwcm92aWRlckluc3RhbmNlO1xuICAgIH0gZWxzZSBpZiAoZGVwRGVmLnRva2VuLm5nSW5qZWN0YWJsZURlZiAmJiB0YXJnZXRzTW9kdWxlKGRhdGEsIGRlcERlZi50b2tlbi5uZ0luamVjdGFibGVEZWYpKSB7XG4gICAgICBjb25zdCBpbmplY3RhYmxlRGVmID0gZGVwRGVmLnRva2VuLm5nSW5qZWN0YWJsZURlZiBhcyBJbmplY3RhYmxlRGVmPGFueT47XG4gICAgICBjb25zdCBrZXkgPSB0b2tlbktleTtcbiAgICAgIGNvbnN0IGluZGV4ID0gZGF0YS5fcHJvdmlkZXJzLmxlbmd0aDtcbiAgICAgIGRhdGEuX2RlZi5wcm92aWRlcnNCeUtleVtkZXBEZWYudG9rZW5LZXldID0ge1xuICAgICAgICBmbGFnczogTm9kZUZsYWdzLlR5cGVGYWN0b3J5UHJvdmlkZXIgfCBOb2RlRmxhZ3MuTGF6eVByb3ZpZGVyLFxuICAgICAgICB2YWx1ZTogaW5qZWN0YWJsZURlZi5mYWN0b3J5LFxuICAgICAgICBkZXBzOiBbXSwgaW5kZXgsXG4gICAgICAgIHRva2VuOiBkZXBEZWYudG9rZW4sXG4gICAgICB9O1xuICAgICAgZGF0YS5fcHJvdmlkZXJzW2luZGV4XSA9IFVOREVGSU5FRF9WQUxVRTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgZGF0YS5fcHJvdmlkZXJzW2luZGV4XSA9XG4gICAgICAgICAgICAgIF9jcmVhdGVQcm92aWRlckluc3RhbmNlKGRhdGEsIGRhdGEuX2RlZi5wcm92aWRlcnNCeUtleVtkZXBEZWYudG9rZW5LZXldKSk7XG4gICAgfSBlbHNlIGlmIChkZXBEZWYuZmxhZ3MgJiBEZXBGbGFncy5TZWxmKSB7XG4gICAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEuX3BhcmVudC5nZXQoZGVwRGVmLnRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBzZXRDdXJyZW50SW5qZWN0b3IoZm9ybWVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb2R1bGVUcmFuc2l0aXZlbHlQcmVzZW50KG5nTW9kdWxlOiBOZ01vZHVsZURhdGEsIHNjb3BlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5nTW9kdWxlLl9kZWYubW9kdWxlcy5pbmRleE9mKHNjb3BlKSA+IC0xO1xufVxuXG5mdW5jdGlvbiB0YXJnZXRzTW9kdWxlKG5nTW9kdWxlOiBOZ01vZHVsZURhdGEsIGRlZjogSW5qZWN0YWJsZURlZjxhbnk+KTogYm9vbGVhbiB7XG4gIHJldHVybiBkZWYucHJvdmlkZWRJbiAhPSBudWxsICYmIChtb2R1bGVUcmFuc2l0aXZlbHlQcmVzZW50KG5nTW9kdWxlLCBkZWYucHJvdmlkZWRJbikgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5wcm92aWRlZEluID09PSAncm9vdCcgJiYgbmdNb2R1bGUuX2RlZi5pc1Jvb3QpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlUHJvdmlkZXJJbnN0YW5jZShuZ01vZHVsZTogTmdNb2R1bGVEYXRhLCBwcm92aWRlckRlZjogTmdNb2R1bGVQcm92aWRlckRlZik6IGFueSB7XG4gIGxldCBpbmplY3RhYmxlOiBhbnk7XG4gIHN3aXRjaCAocHJvdmlkZXJEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZXMpIHtcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlQ2xhc3NQcm92aWRlcjpcbiAgICAgIGluamVjdGFibGUgPSBfY3JlYXRlQ2xhc3MobmdNb2R1bGUsIHByb3ZpZGVyRGVmLnZhbHVlLCBwcm92aWRlckRlZi5kZXBzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVGYWN0b3J5UHJvdmlkZXI6XG4gICAgICBpbmplY3RhYmxlID0gX2NhbGxGYWN0b3J5KG5nTW9kdWxlLCBwcm92aWRlckRlZi52YWx1ZSwgcHJvdmlkZXJEZWYuZGVwcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlVXNlRXhpc3RpbmdQcm92aWRlcjpcbiAgICAgIGluamVjdGFibGUgPSByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIHByb3ZpZGVyRGVmLmRlcHNbMF0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVZhbHVlUHJvdmlkZXI6XG4gICAgICBpbmplY3RhYmxlID0gcHJvdmlkZXJEZWYudmFsdWU7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8vIFRoZSByZWFkIG9mIGBuZ09uRGVzdHJveWAgaGVyZSBpcyBzbGlnaHRseSBleHBlbnNpdmUgYXMgaXQncyBtZWdhbW9ycGhpYywgc28gaXQgc2hvdWxkIGJlXG4gIC8vIGF2b2lkZWQgaWYgcG9zc2libGUuIFRoZSBzZXF1ZW5jZSBvZiBjaGVja3MgaGVyZSBkZXRlcm1pbmVzIHdoZXRoZXIgbmdPbkRlc3Ryb3kgbmVlZHMgdG8gYmVcbiAgLy8gY2hlY2tlZC4gSXQgbWlnaHQgbm90IGlmIHRoZSBgaW5qZWN0YWJsZWAgaXNuJ3QgYW4gb2JqZWN0IG9yIGlmIE5vZGVGbGFncy5PbkRlc3Ryb3kgaXMgYWxyZWFkeVxuICAvLyBzZXQgKG5nT25EZXN0cm95IHdhcyBkZXRlY3RlZCBzdGF0aWNhbGx5KS5cbiAgaWYgKGluamVjdGFibGUgIT09IFVOREVGSU5FRF9WQUxVRSAmJiBpbmplY3RhYmxlICE9IG51bGwgJiYgdHlwZW9mIGluamVjdGFibGUgPT09ICdvYmplY3QnICYmXG4gICAgICAhKHByb3ZpZGVyRGVmLmZsYWdzICYgTm9kZUZsYWdzLk9uRGVzdHJveSkgJiYgdHlwZW9mIGluamVjdGFibGUubmdPbkRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwcm92aWRlckRlZi5mbGFncyB8PSBOb2RlRmxhZ3MuT25EZXN0cm95O1xuICB9XG4gIHJldHVybiBpbmplY3RhYmxlID09PSB1bmRlZmluZWQgPyBVTkRFRklORURfVkFMVUUgOiBpbmplY3RhYmxlO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MobmdNb2R1bGU6IE5nTW9kdWxlRGF0YSwgY3RvcjogYW55LCBkZXBzOiBEZXBEZWZbXSk6IGFueSB7XG4gIGNvbnN0IGxlbiA9IGRlcHMubGVuZ3RoO1xuICBzd2l0Y2ggKGxlbikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBuZXcgY3RvcigpO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBuZXcgY3RvcihyZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gbmV3IGN0b3IocmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBkZXBzWzBdKSwgcmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBkZXBzWzFdKSk7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIG5ldyBjdG9yKFxuICAgICAgICAgIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1swXSksIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1sxXSksXG4gICAgICAgICAgcmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBkZXBzWzJdKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnN0IGRlcFZhbHVlcyA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBkZXBWYWx1ZXNbaV0gPSByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBjdG9yKC4uLmRlcFZhbHVlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NhbGxGYWN0b3J5KG5nTW9kdWxlOiBOZ01vZHVsZURhdGEsIGZhY3Rvcnk6IGFueSwgZGVwczogRGVwRGVmW10pOiBhbnkge1xuICBjb25zdCBsZW4gPSBkZXBzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW4pIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gZmFjdG9yeSgpO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBmYWN0b3J5KHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1swXSkpO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmYWN0b3J5KHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1swXSksIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1sxXSkpO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBmYWN0b3J5KFxuICAgICAgICAgIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1swXSksIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1sxXSksXG4gICAgICAgICAgcmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBkZXBzWzJdKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnN0IGRlcFZhbHVlcyA9IEFycmF5KGxlbik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGRlcFZhbHVlc1tpXSA9IHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFjdG9yeSguLi5kZXBWYWx1ZXMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxsTmdNb2R1bGVMaWZlY3ljbGUobmdNb2R1bGU6IE5nTW9kdWxlRGF0YSwgbGlmZWN5Y2xlczogTm9kZUZsYWdzKSB7XG4gIGNvbnN0IGRlZiA9IG5nTW9kdWxlLl9kZWY7XG4gIGNvbnN0IGRlc3Ryb3llZCA9IG5ldyBTZXQ8YW55PigpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZi5wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcm92RGVmID0gZGVmLnByb3ZpZGVyc1tpXTtcbiAgICBpZiAocHJvdkRlZi5mbGFncyAmIE5vZGVGbGFncy5PbkRlc3Ryb3kpIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gbmdNb2R1bGUuX3Byb3ZpZGVyc1tpXTtcbiAgICAgIGlmIChpbnN0YW5jZSAmJiBpbnN0YW5jZSAhPT0gVU5ERUZJTkVEX1ZBTFVFKSB7XG4gICAgICAgIGNvbnN0IG9uRGVzdHJveTogRnVuY3Rpb258dW5kZWZpbmVkID0gaW5zdGFuY2UubmdPbkRlc3Ryb3k7XG4gICAgICAgIGlmICh0eXBlb2Ygb25EZXN0cm95ID09PSAnZnVuY3Rpb24nICYmICFkZXN0cm95ZWQuaGFzKGluc3RhbmNlKSkge1xuICAgICAgICAgIG9uRGVzdHJveS5hcHBseShpbnN0YW5jZSk7XG4gICAgICAgICAgZGVzdHJveWVkLmFkZChpbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==