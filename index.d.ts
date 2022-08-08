/**
 * Promise, or maybe not
 */
declare type Awaitable<T> = T | PromiseLike<T>;
/**
 * Null or whatever
 */
declare type Nullable<T> = T | null | undefined;
/**
 * Array, or not yet
 */
declare type Arrayable<T> = T | Array<T>;
/**
 * Function
 */
declare type Fn<T = void> = () => T;
/**
 * Constructor
 */
declare type Constructor<T = void> = new (...args: any[]) => T;
/**
 * Infers the element type of an array
 */
declare type ElementOf<T> = T extends (infer E)[] ? E : never;
/**
 * Defines an intersection type of all union items.
 *
 * @param U Union of any types that will be intersected.
 * @returns U items intersected
 * @see https://stackoverflow.com/a/50375286/9259330
 */
declare type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
/**
 * Infers the arguments type of a function
 */
declare type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never;
declare type MergeInsertions<T> = T extends object ? {
    [K in keyof T]: MergeInsertions<T[K]>;
} : T;
declare type DeepMerge<F, S> = MergeInsertions<{
    [K in keyof F | keyof S]: K extends keyof S & keyof F ? DeepMerge<F[K], S[K]> : K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
}>;

/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
declare function toArray<T>(array?: Nullable<Arrayable<T>>): Array<T>;
/**
 * Convert `Arrayable<T>` to `Array<T>` and flatten it
 *
 * @category Array
 */
declare function flattenArrayable<T>(array?: Nullable<Arrayable<T | Array<T>>>): Array<T>;
/**
 * Use rest arguments to merge arrays
 *
 * @category Array
 */
declare function mergeArrayable<T>(...args: Nullable<Arrayable<T>>[]): Array<T>;
declare type PartitionFilter<T> = (i: T, idx: number, arr: readonly T[]) => any;
/**
 * Divide an array into two parts by a filter function
 *
 * @category Array
 * @example const [odd, even] = partition([1, 2, 3, 4], i => i % 2 != 0)
 */
declare function partition<T>(array: readonly T[], f1: PartitionFilter<T>): [T[], T[]];
declare function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>): [T[], T[], T[]];
declare function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>): [T[], T[], T[], T[]];
declare function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>): [T[], T[], T[], T[], T[]];
declare function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>, f5: PartitionFilter<T>): [T[], T[], T[], T[], T[], T[]];
declare function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>, f5: PartitionFilter<T>, f6: PartitionFilter<T>): [T[], T[], T[], T[], T[], T[], T[]];
/**
 * Unique an Array
 *
 * @category Array
 */
declare function uniq<T>(array: readonly T[]): T[];
/**
 * Get last item
 *
 * @category Array
 */
declare function last(array: readonly []): undefined;
declare function last<T>(array: readonly T[]): T;
/**
 * Remove an item from Array
 *
 * @category Array
 */
declare function remove<T>(array: T[], value: T): boolean;
/**
 * Get nth item of Array. Negative for backward
 *
 * @category Array
 */
declare function at(array: readonly [], index: number): undefined;
declare function at<T>(array: readonly T[], index: number): T;
/**
 * Genrate a range array of numbers. The `stop` is exclusive.
 *
 * @category Array
 */
declare function range(stop: number): number[];
declare function range(start: number, stop: number, step?: number): number[];
/**
 * Move element in an Array
 *
 * @category Array
 * @param arr
 * @param from
 * @param to
 */
declare function move<T>(arr: T[], from: number, to: number): T[];
/**
 * Clamp a number to the index ranage of an array
 *
 * @category Array
 */
declare function clampArrayRange(n: number, arr: readonly unknown[]): number;
/**
 * Get random items from an array
 *
 * @category Array
 */
declare function sample<T>(arr: T[], count: number): T[];
/**
 * Shuffle an array. This function mutates the array.
 *
 * @category Array
 */
declare function shuffle<T>(array: T[]): T[];

declare const assert: (condition: boolean, message: string) => asserts condition;
declare const toString: (v: any) => string;
declare const noop: () => void;

/**
 * Type guard to filter out null-ish values
 *
 * @category Guards
 * @example array.filter(notNullish)
 */
declare function notNullish<T>(v: T | null | undefined): v is NonNullable<T>;
/**
 * Type guard to filter out null values
 *
 * @category Guards
 * @example array.filter(noNull)
 */
declare function noNull<T>(v: T | null): v is Exclude<T, null>;
/**
 * Type guard to filter out null-ish values
 *
 * @category Guards
 * @example array.filter(notUndefined)
 */
declare function notUndefined<T>(v: T): v is Exclude<T, undefined>;
/**
 * Type guard to filter out falsy values
 *
 * @category Guards
 * @example array.filter(isTruthy)
 */
declare function isTruthy<T>(v: T): v is NonNullable<T>;

declare const isDef: <T = any>(val?: T | undefined) => val is T;
declare const isBoolean: (val: any) => val is boolean;
declare const isFunction: <T extends Function>(val: any) => val is T;
declare const isNumber: (val: any) => val is number;
declare const isString: (val: unknown) => val is string;
declare const isObject: (val: any) => val is object;
declare const isWindow: (val: any) => boolean;
declare const isBrowser: boolean;

declare function clamp(n: number, min: number, max: number): number;
declare function sum(...args: number[] | number[][]): number;

/**
 * Replace backslash to slash
 *
 * @category String
 */
declare function slash(str: string): string;
/**
 * Ensure prefix of a string
 *
 * @category String
 */
declare function ensurePrefix(prefix: string, str: string): string;
/**
 * Ensure suffix of a string
 *
 * @category String
 */
declare function ensureSuffix(suffix: string, str: string): string;
/**
 * Dead simple template engine, just like Python's `.format()`
 *
 * @category String
 * @example
 * ```
 * const result = template(
 *   'Hello {0}! My name is {1}.',
 *   'Inès',
 *   'Anthony'
 * ) // Hello Inès! My name is Anthony.
 * ```
 */
declare function template(str: string, ...args: any[]): string;
/**
 * Generate a random string
 * @category String
 */
declare function randomStr(size?: number, dict?: string): string;

declare const timestamp: () => number;
/**
 * des:        日期操作
 * @proStr:    格式化参数
 * @return:    Date
 * e.g.         proDate(time,'{%y+1}-{%M+2}-{%d+1}-{%H+1}-{%m+1}-{%s+1}') //年月日时分秒全部加1
 */
declare const proDate: (time: Date, proStr: string) => Date | undefined;
declare const formatDate: (dateObj: Date, mask: string) => string;
/**
 * 获取某月份第一天和最后一天的时间
 *
 * @param {number} date 时间戳
 * @returns {Array<Date>} 第一天和最后一天
 */
declare const getMonthEnds: (date: Date) => Array<Date>;
/**
 * 获取周的大写num
 *
 * @param  {number} day 星期n
 * @returns {string}
 */
declare const getWeekNum: (day: number) => string;
/**
 * 处理时间范围的结束时间，补全”23：59：59“
 *
 * @param {number} time 需要处理的时间戳
 * @returns {number} 需要好的时间戳
 */
declare const handleEndTime: (time: Date) => Date | number;
/**
 * 处理时间范围的开始时间，时间设置为”00：00：00“
 *
 * @param {number} time 需要处理的时间戳
 * @returns {number} 需要好的时间戳
 */
declare const handleStartTime: (time: Date) => Date | number;
/**
 * @file params = int(1212121212121)
 * @return  "2017-12"
 *
 **/
declare const timeInit: (time: Date) => string;

/**
 * Call every function in an array
 */
declare function batchInvoke(functions: Nullable<Fn>[]): void;
/**
 * Call the function
 */
declare function invoke(fn: Fn): void;
/**
 * Pass the value through the callback, and return the value
 *
 * @example
 * ```
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 * ```
 */
declare function tap<T>(value: T, callback: (value: T) => void): T;

/**
 * Map key/value pairs for an object, and construct a new one
 *
 *
 * @category Object
 *
 * Transform:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => [k.toString().toUpperCase(), v.toString()])
 * // { A: '1', B: '2' }
 * ```
 *
 * Swap key/value:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => [v, k])
 * // { 1: 'a', 2: 'b' }
 * ```
 *
 * Filter keys:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => k === 'a' ? undefined : [k, v])
 * // { b: 2 }
 * ```
 */
declare function objectMap<K extends string, V, NK = K, NV = V>(obj: Record<K, V>, fn: (key: K, value: V) => [NK, NV] | undefined): Record<K, V>;
/**
 * Type guard for any key, `k`.
 * Marks `k` as a key of `T` if `k` is in `obj`.
 *
 * @category Object
 * @param obj object to query for key `k`
 * @param k key to check existence in `obj`
 */
declare function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T;
/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
declare function objectKeys<T extends object>(obj: T): (keyof T)[];
/**
 * Strict typed `Object.entries`
 *
 * @category Object
 */
declare function objectEntries<T extends object>(obj: T): [keyof T, T[keyof T]][];
/**
 * Deep merge :P
 *
 * @category Object
 */
declare function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S>;
/**
 * Create a new subset object by giving keys
 *
 * @category Object
 */
declare function objectPick<O, T extends keyof O>(obj: O, keys: T[], omitUndefined?: boolean): Pick<O, T>;
/**
 * Clear undefined fields from an object. It mutates the object
 *
 * @category Object
 */
declare function clearUndefined<T extends object>(obj: T): T;
/**
 * Determines whether an object has a property with the specified name
 *
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 * @category Object
 */
declare function hasOwnProperty<T>(obj: T, v: PropertyKey): boolean;

interface SingletonPromiseReturn<T> {
    (): Promise<T>;
    /**
     * Reset current staled promise.
     * Await it to have proper shutdown.
     */
    reset: () => Promise<void>;
}
/**
 * Create singleton promise function
 *
 * @category Promise
 */
declare function createSingletonPromise<T>(fn: () => Promise<T>): SingletonPromiseReturn<T>;
/**
 * Promised `setTimeout`
 *
 * @category Promise
 */
declare function sleep(ms: number, callback?: Fn<any>): Promise<void>;
/**
 * Create a promise lock
 *
 * @category Promise
 * @example
 * ```
 * const lock = createPromiseLock()
 *
 * lock.run(async () => {
 *   await doSomething()
 * })
 *
 * // in anther context:
 * await lock.wait() // it will wait all tasking finished
 * ```
 */
declare function createPromiseLock(): {
    run<T = void>(fn: () => Promise<T>): Promise<T>;
    wait(): Promise<void>;
    isWaiting(): boolean;
    clear(): void;
};
/**
 * Promise with `resolve` and `reject` methods of itself
 */
interface ControlledPromise<T = void> extends Promise<T> {
    resolve(value: T | PromiseLike<T>): void;
    reject(reason?: any): void;
}
/**
 * Return a Promise with `resolve` and `reject` methods
 *
 * @category Promise
 * @example
 * ```
 * const promise = createControlledPromise()
 *
 * await promise
 *
 * // in anther context:
 * promise.resolve(data)
 * ```
 */
declare function createControlledPromise<T>(): ControlledPromise<T>;

// Type definitions for throttle-debounce 2.1


interface Cancel {
    cancel: () => void;
}

type throttle<T> = T & Cancel;

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param delay
 * A zero-or-greater delay in milliseconds. For event callbacks, values around
 * 100 or 250 (or even higher) are most useful.
 *
 * @param noTrailing
 * If noTrailing is true, callback will only execute every `delay` milliseconds
 * while the throttled-function is being called. If noTrailing is false or
 * unspecified, callback will be executed one final time fter the last
 * throttled-function call. (After the throttled-function has not been called
 * for `delay` milliseconds, the internal counter is reset)
 *
 * @param callback
 * A function to be executed after delay milliseconds. The `this` context and
 * all arguments are passed through, as-is, to `callback` when the
 * throttled-function is executed.
 *
 * @param debounceMode If `debounceMode` is true (at begin), schedule
 * `callback` to execute after `delay` ms. If `debounceMode` is false (at end),
 * schedule `callback` to execute after `delay` ms.
 *
 * @return
 * A new, throttled, function.
 */
declare function throttle<T extends (...args: any[]) => any>(
    delay: number,
    noTrailing: boolean,
    callback: T,
    debounceMode?: boolean
): throttle<T>;

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param delay
 * A zero-or-greater delay in milliseconds. For event callbacks, values around
 * 100 or 250 (or even higher) are most useful.
 *
 * @param callback
 * A function to be executed after delay milliseconds. The `this` context and
 * all arguments are passed through, as-is, to `callback` when the
 * throttled-function is executed.
 *
 * @param debounceMode If `debounceMode` is true (at begin), schedule
 * `callback` to execute after `delay` ms. If `debounceMode` is false (at end),
 * schedule `callback` to execute after `delay` ms.
 *
 * @return
 * A new, throttled, function.
 */
declare function throttle<T extends (...args: any[]) => any>(
    delay: number,
    callback: T,
    debounceMode?: boolean
): throttle<T>;
type debounce<T> = throttle<T>;

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param delay
 * A zero-or-greater delay in milliseconds. For event callbacks, values around
 * 100 or 250 (or even higher) are most useful.
 *
 * @param atBegin
 * If atBegin is false or unspecified, callback will only be executed `delay`
 * milliseconds after the last debounced-function call. If atBegin is true,
 * callback will be executed only at the first debounced-function call. (After
 * the throttled-function has not been called for `delay` milliseconds, the
 * internal counter is reset).
 *
 * @param callback
 * A function to be executed after delay milliseconds. The `this` context and
 * all arguments are passed through, as-is, to `callback` when the
 * debounced-function is executed.
 *
 * @return
 * A new, debounced function.
 */
declare function debounce<T extends (...args: any[]) => any>(
    delay: number,
    atBegin: boolean,
    callback: T
): debounce<T>;

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param delay
 * A zero-or-greater delay in milliseconds. For event callbacks, values around
 * 100 or 250 (or even higher) are most useful.
 *
 * @param callback
 * A function to be executed after delay milliseconds. The `this` context and
 * all arguments are passed through, as-is, to `callback` when the
 * debounced-function is executed.
 *
 * @return
 * A new, debounced function.
 */
declare function debounce<T extends (...args: any[]) => any>(
    delay: number,
    callback: T
): debounce<T>;

interface POptions {
    /**
     * How many promises are resolved at the same time.
     */
    concurrency?: number | undefined;
}
declare class PInstance<T = any> extends Promise<Awaited<T>[]> {
    items: Iterable<T>;
    options?: POptions | undefined;
    private promises;
    get promise(): Promise<Awaited<T>[]>;
    constructor(items?: Iterable<T>, options?: POptions | undefined);
    add(...args: (T | Promise<T>)[]): void;
    map<U>(fn: (value: Awaited<T>, index: number) => U): PInstance<Promise<U>>;
    filter(fn: (value: Awaited<T>, index: number) => boolean | Promise<boolean>): PInstance<Promise<T>>;
    forEach(fn: (value: Awaited<T>, index: number) => void): Promise<void>;
    reduce<U>(fn: (previousValue: U, currentValue: Awaited<T>, currentIndex: number, array: Awaited<T>[]) => U, initialValue: U): Promise<U>;
    clear(): void;
    then(fn?: () => PromiseLike<any>): Promise<any>;
    catch(fn?: (err: unknown) => PromiseLike<any>): Promise<any>;
    finally(fn?: () => void): Promise<Awaited<T>[]>;
}
/**
 * Utility for managing multiple promises.
 *
 * @see https://github.com/antfu/utils/tree/main/docs/p.md
 * @category Promise
 * @example
 * ```
 * import { p } from '@antfu/utils'
 *
 * const items = [1, 2, 3, 4, 5]
 *
 * await p(items)
 *   .map(async i => await multiply(i, 3))
 *   .filter(async i => await isEven(i))
 * // [6, 12]
 * ```
 */
declare function p<T = any>(items?: Iterable<T>, options?: POptions): PInstance<T>;

/**
 * 把小数转成整数，避免小数计算的精度问题
 *
 * @param {string|number} float 浮点数
 * @param {number=} length 可选，右移的位数
 * @return {number}
 */
declare const float2Int: (float: number, length?: number) => number;
/**
 * 获得小数的位数
 *
 * @param {string} str
 * @return {number}
 */
declare const decimalLength: (str: string) => number;
declare const intNumber: (a: number, b: number) => Array<number>;
/**
 * 加法
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
declare const add: (a: number, b: number) => number;
/**
 * @file 减法
 * @author XiaoBin Li
 */
/**
  * 减法
  *
  * @param {number} a
  * @param {number} b
  * @return {number}
  */
declare const minus: (a: number, b: number) => number;
/**
 * 乘法
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
declare const multiply: (a: number, b: number) => number;
/**
 * 除法
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
declare const divide: (a: number, b: number) => number;
declare const numberToChinese: (section: number) => string;
/**
 * @file 将金额元改化成毫
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */
/**
  * 将金额元改化成毫
  *
  * @param {number} value 元
  * @param {number} unit 单元
  *
  * return {number} 元
  */
declare const reverseUnitMoney: (value?: number, unit?: number) => number;

/**
 * 对字符串进行 HTML 编码
 *
 * @param {string} source 字符串
 * @return {string}
 */
declare const encodeHTML: (source: any) => string;
/**
 * @file 去除html标签，获取标签内容
 */
declare const decodeHTML: (html: string) => string;
/**
 * 去掉HTML，仅保留文本内容
 *
 * @param {string} source 字符串
 * @return {string}
 */
declare const skinHTML: (source: string) => any;

/**
 * 检查密码强度
 *
 * @param {string} password
 * @returns {Number}
 */
declare const checkPasswordStrength: (pwd: string) => number;
/**
* 压缩图片
*
* @param {Object} options
* @property {string} options.url 原始图片地址
* @property {number} options.width 显示宽度
* @property {number} options.height 显示高度
* @property {number=} options.rawWidth 原图宽度
* @property {number=} options.rawHeight 原图高度
* @property {boolean} options.noCrop 是否不裁剪
* @return {string} 压缩后的图片地址
*/
declare const compressImage: (url: string, options: any) => string;
/**
 * 深度拷贝
 *
 * @param {Object} obj 需要拷贝的对象
 * @returns {Object} 拷贝副本
 */
declare const deepClone: (obj: any) => any;
/**
 * 获取分页的pageDto默认值
 */
declare const getPageDto: () => object;
declare const indexBy: (array: Array<any>, key: string) => object;
/**
 * @file isRepeat
 */
declare const isRepeat: (arr: any) => boolean;

/**
 * 在iframe中构建form表单提交
 *
 * @param {string} path     请求地址
 * @param {Object} params   请求参数
 */
declare const formRequest: (path: string, params?: any) => void;

/**
 * 处理阶段和科目，用于合并单元格
 *
 * @param {Array<Object>} data
 * @param {Array<number>} 需要合并的单元格
 *
 * @returns {Array<Object>}
 */
declare const adaptStageSubject: (data: Array<any>, columnIndexs?: number[]) => any[];
/**
 * 表格合并规则
 *
 * @param {Object} Object
 *
 * @returns {Object>}
 */
declare const calcTableSpan: ({ row, column }: any) => any;

/**
 * 把查询字符串解析成对象，反向操作可用 $.param
 *
 * @param {string} queryStr 查询字符串，可直接把 location.search 或 location.hash 扔进来解析
 * @return {Object}
 */
declare const parseQuery: (queryStr: string) => any;
/**
* 解析 url，返回格式遵循 location 属性的命名
*
* @param {string} url
* @return {Object}
*/
declare const parseUrl: (url: string) => any;
/**
* 获取当前网页的 origin（可在现代浏览器控制台输入 location.origin）
*
* @param {?string} url
* @return {string}
*/
declare const getOrigin: (url: string) => any;
/**
 *  获取当前url的search
 */
declare const getUrlSearch: () => any;
/**
 * 将对象转化成url参数
 *
 * @param {Object} obj 需要处理的对象
 *
 * @returns {string} 处理好的字符串
 */
declare const params: (obj: any) => string;

export { ArgumentsType, Arrayable, Awaitable, Constructor, ControlledPromise, DeepMerge, ElementOf, Fn, MergeInsertions, Nullable, PartitionFilter, SingletonPromiseReturn, UnionToIntersection, adaptStageSubject, add, assert, at, batchInvoke, calcTableSpan, checkPasswordStrength, clamp, clampArrayRange, clearUndefined, compressImage, createControlledPromise, createPromiseLock, createSingletonPromise, debounce, decimalLength, decodeHTML, deepClone, deepMerge, divide, encodeHTML, ensurePrefix, ensureSuffix, flattenArrayable, float2Int, formRequest, formatDate, getMonthEnds, getOrigin, getPageDto, getUrlSearch, getWeekNum, handleEndTime, handleStartTime, hasOwnProperty, indexBy, intNumber, invoke, isBoolean, isBrowser, isDef, isFunction, isKeyOf, isNumber, isObject, isRepeat, isString, isTruthy, isWindow, last, mergeArrayable, minus, move, multiply, noNull, noop, notNullish, notUndefined, numberToChinese, objectEntries, objectKeys, objectMap, objectPick, p, params, parseQuery, parseUrl, partition, proDate, randomStr, range, remove, reverseUnitMoney, sample, shuffle, skinHTML, slash, sleep, sum, tap, template, throttle, timeInit, timestamp, toArray, toString, uniq };
