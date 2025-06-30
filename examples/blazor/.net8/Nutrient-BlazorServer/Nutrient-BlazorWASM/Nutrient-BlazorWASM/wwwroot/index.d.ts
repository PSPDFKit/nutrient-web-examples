/**
 * Selects the save mode for ink signatures.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.SignatureSaveMode} ALWAYS Always store new ink signatures.
 * @property {PSPDFKit.SignatureSaveMode} NEVER Never store new ink signatures.
 * @property {PSPDFKit.SignatureSaveMode} USING_UI Store new ink signatures if the option is selected in the UI.
 */
declare const SignatureSaveMode: {
    readonly ALWAYS: "ALWAYS";
    readonly NEVER: "NEVER";
    readonly USING_UI: "USING_UI";
};
type ISignatureSaveMode = (typeof SignatureSaveMode)[keyof typeof SignatureSaveMode];

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Immutable data encourages pure functions (data-in, data-out) and lends itself
 * to much simpler application development and enabling techniques from
 * functional programming such as lazy evaluation.
 *
 * While designed to bring these powerful functional concepts to JavaScript, it
 * presents an Object-Oriented API familiar to Javascript engineers and closely
 * mirroring that of Array, Map, and Set. It is easy and efficient to convert to
 * and from plain Javascript types.
 *
 * ## How to read these docs
 *
 * In order to better explain what kinds of values the Immutable.js API expects
 * and produces, this documentation is presented in a statically typed dialect of
 * JavaScript (like [Flow][] or [TypeScript][]). You *don't need* to use these
 * type checking tools in order to use Immutable.js, however becoming familiar
 * with their syntax will help you get a deeper understanding of this API.
 *
 * **A few examples and how to read them.**
 *
 * All methods describe the kinds of data they accept and the kinds of data
 * they return. For example a function which accepts two numbers and returns
 * a number would look like this:
 *
 * ```js
 * sum(first: number, second: number): number
 * ```
 *
 * Sometimes, methods can accept different kinds of data or return different
 * kinds of data, and this is described with a *type variable*, which is
 * typically in all-caps. For example, a function which always returns the same
 * kind of data it was provided would look like this:
 *
 * ```js
 * identity<T>(value: T): T
 * ```
 *
 * Type variables are defined with classes and referred to in methods. For
 * example, a class that holds onto a value for you might look like this:
 *
 * ```js
 * class Box<T> {
 *   constructor(value: T)
 *   getValue(): T
 * }
 * ```
 *
 * In order to manipulate Immutable data, methods that we're used to affecting
 * a Collection instead return a new Collection of the same type. The type
 * `this` refers to the same kind of class. For example, a List which returns
 * new Lists when you `push` a value onto it might look like:
 *
 * ```js
 * class List<T> {
 *   push(value: T): this
 * }
 * ```
 *
 * Many methods in Immutable.js accept values which implement the JavaScript
 * [Iterable][] protocol, and might appear like `Iterable<string>` for something
 * which represents sequence of strings. Typically in JavaScript we use plain
 * Arrays (`[]`) when an Iterable is expected, but also all of the Immutable.js
 * collections are iterable themselves!
 *
 * For example, to get a value deep within a structure of data, we might use
 * `getIn` which expects an `Iterable` path:
 *
 * ```
 * getIn(path: Iterable<string | number>): any
 * ```
 *
 * To use this method, we could pass an array: `data.getIn([ "key", 2 ])`.
 *
 *
 * Note: All examples are presented in the modern [ES2015][] version of
 * JavaScript. Use tools like Babel to support older browsers.
 *
 * For example:
 *
 * ```js
 * // ES2015
 * const mappedFoo = foo.map(x => x * x);
 * // ES5
 * var mappedFoo = foo.map(function (x) { return x * x; });
 * ```
 *
 * [ES2015]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla
 * [TypeScript]: http://www.typescriptlang.org/
 * [Flow]: https://flowtype.org/
 * [Iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */



  /**
   * Lists are ordered indexed dense collections, much like a JavaScript
   * Array.
   *
   * Lists are immutable and fully persistent with O(log32 N) gets and sets,
   * and O(1) push and pop.
   *
   * Lists implement Deque, with efficient addition and removal from both the
   * end (`push`, `pop`) and beginning (`unshift`, `shift`).
   *
   * Unlike a JavaScript Array, there is no distinction between an
   * "unset" index and an index set to `undefined`. `List#forEach` visits all
   * indices from 0 to size, regardless of whether they were explicitly defined.
   */
  declare module List {

    /**
     * True if the provided value is a List
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable');
     * List.isList([]); // false
     * List.isList(List()); // true
     * ```
     */
    function isList(maybeList: any): maybeList is List<any>;

    /**
     * Creates a new List containing `values`.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable');
     * List.of(1, 2, 3, 4)
     * // List [ 1, 2, 3, 4 ]
     * ```
     *
     * Note: Values are not altered or converted in any way.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable');
     * List.of({x:1}, 2, [3], 4)
     * // List [ { x: 1 }, 2, [ 3 ], 4 ]
     * ```
     */
    function of<T>(...values: Array<T>): List<T>;
  }

  /**
   * Create a new immutable List containing the values of the provided
   * collection-like.
   *
   * Note: `List` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List, Set } = require('immutable')
   *
   * const emptyList = List()
   * // List []
   *
   * const plainArray = [ 1, 2, 3, 4 ]
   * const listFromPlainArray = List(plainArray)
   * // List [ 1, 2, 3, 4 ]
   *
   * const plainSet = Set([ 1, 2, 3, 4 ])
   * const listFromPlainSet = List(plainSet)
   * // List [ 1, 2, 3, 4 ]
   *
   * const arrayIterator = plainArray[Symbol.iterator]()
   * const listFromCollectionArray = List(arrayIterator)
   * // List [ 1, 2, 3, 4 ]
   *
   * listFromPlainArray.equals(listFromCollectionArray) // true
   * listFromPlainSet.equals(listFromCollectionArray) // true
   * listFromPlainSet.equals(listFromPlainArray) // true
   * ```
   */
  declare function List(): List<any>;
  declare function List<T>(): List<T>;
  declare function List<T>(collection: Iterable<T>): List<T>;

  interface List<T> extends Collection.Indexed<T> {

    /**
     * The number of items in this List.
     */
    readonly size: number;

    // Persistent changes

    /**
     * Returns a new List which includes `value` at `index`. If `index` already
     * exists in this List, it will be replaced.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * List. `v.set(-1, "value")` sets the last item in the List.
     *
     * If `index` larger than `size`, the returned List's `size` will be large
     * enough to include the `index`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const originalList = List([ 0 ]);
     * // List [ 0 ]
     * originalList.set(1, 1);
     * // List [ 0, 1 ]
     * originalList.set(0, 'overwritten');
     * // List [ "overwritten" ]
     * originalList.set(2, 2);
     * // List [ 0, undefined, 2 ]
     *
     * List().set(50000, 'value').size;
     * // 50001
     * ```
     *
     * Note: `set` can be used in `withMutations`.
     */
    set(index: number, value: T): List<T>;

    /**
     * Returns a new List which excludes this `index` and with a size 1 less
     * than this List. Values at indices above `index` are shifted down by 1 to
     * fill the position.
     *
     * This is synonymous with `list.splice(index, 1)`.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * List. `v.delete(-1)` deletes the last item in the List.
     *
     * Note: `delete` cannot be safely used in IE8
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 0, 1, 2, 3, 4 ]).delete(0);
     * // List [ 1, 2, 3, 4 ]
     * ```
     *
     * Since `delete()` re-indexes values, it produces a complete copy, which
     * has `O(N)` complexity.
     *
     * Note: `delete` *cannot* be used in `withMutations`.
     *
     * @alias remove
     */
    delete(index: number): List<T>;
    remove(index: number): List<T>;

    /**
     * Returns a new List with `value` at `index` with a size 1 more than this
     * List. Values at indices above `index` are shifted over by 1.
     *
     * This is synonymous with `list.splice(index, 0, value)`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 0, 1, 2, 3, 4 ]).insert(6, 5)
     * // List [ 0, 1, 2, 3, 4, 5 ]
     * ```
     *
     * Since `insert()` re-indexes values, it produces a complete copy, which
     * has `O(N)` complexity.
     *
     * Note: `insert` *cannot* be used in `withMutations`.
     */
    insert(index: number, value: T): List<T>;

    /**
     * Returns a new List with 0 size and no values in constant time.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 1, 2, 3, 4 ]).clear()
     * // List []
     * ```
     *
     * Note: `clear` can be used in `withMutations`.
     */
    clear(): List<T>;

    /**
     * Returns a new List with the provided `values` appended, starting at this
     * List's `size`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 1, 2, 3, 4 ]).push(5)
     * // List [ 1, 2, 3, 4, 5 ]
     * ```
     *
     * Note: `push` can be used in `withMutations`.
     */
    push(...values: Array<T>): List<T>;

    /**
     * Returns a new List with a size ones less than this List, excluding
     * the last index in this List.
     *
     * Note: this differs from `Array#pop` because it returns a new
     * List rather than the removed value. Use `last()` to get the last value
     * in this List.
     *
     * ```js
     * List([ 1, 2, 3, 4 ]).pop()
     * // List[ 1, 2, 3 ]
     * ```
     *
     * Note: `pop` can be used in `withMutations`.
     */
    pop(): List<T>;

    /**
     * Returns a new List with the provided `values` prepended, shifting other
     * values ahead to higher indices.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 2, 3, 4]).unshift(1);
     * // List [ 1, 2, 3, 4 ]
     * ```
     *
     * Note: `unshift` can be used in `withMutations`.
     */
    unshift(...values: Array<T>): List<T>;

    /**
     * Returns a new List with a size ones less than this List, excluding
     * the first index in this List, shifting all other values to a lower index.
     *
     * Note: this differs from `Array#shift` because it returns a new
     * List rather than the removed value. Use `first()` to get the first
     * value in this List.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 0, 1, 2, 3, 4 ]).shift();
     * // List [ 1, 2, 3, 4 ]
     * ```
     *
     * Note: `shift` can be used in `withMutations`.
     */
    shift(): List<T>;

    /**
     * Returns a new List with an updated value at `index` with the return
     * value of calling `updater` with the existing value, or `notSetValue` if
     * `index` was not set. If called with a single argument, `updater` is
     * called with the List itself.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * List. `v.update(-1)` updates the last item in the List.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const list = List([ 'a', 'b', 'c' ])
     * const result = list.update(2, val => val.toUpperCase())
     * // List [ "a", "b", "C" ]
     * ```
     *
     * This can be very useful as a way to "chain" a normal function into a
     * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
     *
     * For example, to sum a List after mapping and filtering:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * function sum(collection) {
     *   return collection.reduce((sum, x) => sum + x, 0)
     * }
     *
     * List([ 1, 2, 3 ])
     *   .map(x => x + 1)
     *   .filter(x => x % 2 === 0)
     *   .update(sum)
     * // 6
     * ```
     *
     * Note: `update(index)` can be used in `withMutations`.
     *
     * @see `Map#update`
     */
    update(index: number, notSetValue: T, updater: (value: T) => T): this;
    update(index: number, updater: (value: T) => T): this;
    update<R>(updater: (value: this) => R): R;

    /**
     * Returns a new List with size `size`. If `size` is less than this
     * List's size, the new List will exclude values at the higher indices.
     * If `size` is greater than this List's size, the new List will have
     * undefined values for the newly available indices.
     *
     * When building a new List and the final size is known up front, `setSize`
     * used in conjunction with `withMutations` may result in the more
     * performant construction.
     */
    setSize(size: number): List<T>;


    // Deep persistent changes

    /**
     * Returns a new List having set `value` at this `keyPath`. If any keys in
     * `keyPath` do not exist, a new immutable Map will be created at that key.
     *
     * Index numbers are used as keys to determine the path to follow in
     * the List.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * const list = List([ 0, 1, 2, List([ 3, 4 ])])
     * list.setIn([3, 0], 999);
     * // List [ 0, 1, 2, List [ 999, 4 ] ]
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and setIn() can update those values as well, treating them
     * immutably by creating new copies of those values with the changes applied.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * const list = List([ 0, 1, 2, { plain: 'object' }])
     * list.setIn([3, 'plain'], 'value');
     * // List([ 0, 1, 2, { plain: 'value' }])
     * ```
     *
     * Note: `setIn` can be used in `withMutations`.
     */
    setIn(keyPath: Iterable<any>, value: any): this;

    /**
     * Returns a new List having removed the value at this `keyPath`. If any
     * keys in `keyPath` do not exist, no change will occur.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * const list = List([ 0, 1, 2, List([ 3, 4 ])])
     * list.deleteIn([3, 0]);
     * // List [ 0, 1, 2, List [ 4 ] ]
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and removeIn() can update those values as well, treating them
     * immutably by creating new copies of those values with the changes applied.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * const list = List([ 0, 1, 2, { plain: 'object' }])
     * list.removeIn([3, 'plain']);
     * // List([ 0, 1, 2, {}])
     * ```
     *
     * Note: `deleteIn` *cannot* be safely used in `withMutations`.
     *
     * @alias removeIn
     */
    deleteIn(keyPath: Iterable<any>): this;
    removeIn(keyPath: Iterable<any>): this;

    /**
     * Note: `updateIn` can be used in `withMutations`.
     *
     * @see `Map#updateIn`
     */
    updateIn(keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): this;
    updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;

    /**
     * Note: `mergeIn` can be used in `withMutations`.
     *
     * @see `Map#mergeIn`
     */
    mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    /**
     * Note: `mergeDeepIn` can be used in `withMutations`.
     *
     * @see `Map#mergeDeepIn`
     */
    mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    // Transient changes

    /**
     * Note: Not all methods can be safely used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * allows being used in `withMutations`.
     *
     * @see `Map#withMutations`
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * An alternative API for withMutations()
     *
     * Note: Not all methods can be safely used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * allows being used in `withMutations`.
     *
     * @see `Map#asMutable`
     */
    asMutable(): this;

    /**
     * @see `Map#wasAltered`
     */
    wasAltered(): boolean;

    /**
     * @see `Map#asImmutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    /**
     * Returns a new List with other values or collections concatenated to this one.
     *
     * Note: `concat` can be used in `withMutations`.
     *
     * @alias merge
     */
    concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): List<T | C>;
    merge<C>(...collections: Array<Iterable<C>>): List<T | C>;

    /**
     * Returns a new List with values passed through a
     * `mapper` function.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * List([ 1, 2 ]).map(x => 10 * x)
     * // List [ 10, 20 ]
     * ```
     */
    map<M>(
      mapper: (value: T, key: number, iter: this) => M,
      context?: any
    ): List<M>;

    /**
     * Flat-maps the List, returning a new List.
     *
     * Similar to `list.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: T, key: number, iter: this) => Iterable<M>,
      context?: any
    ): List<M>;

    /**
     * Returns a new List with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
      predicate: (value: T, index: number, iter: this) => value is F,
      context?: any
    ): List<F>;
    filter(
      predicate: (value: T, index: number, iter: this) => any,
      context?: any
    ): this;

    /**
     * Returns a List "zipped" with the provided collection.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 4, 5, 6 ]);
     * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): List<[T,U]>;
    zip<U,V>(other: Collection<any, U>, other2: Collection<any,V>): List<[T,U,V]>;
    zip(...collections: Array<Collection<any, any>>): List<any>;

    /**
     * Returns a List "zipped" with the provided collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const a = List([ 1, 2 ]);
     * const b = List([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     *
     * Note: Since zipAll will return a collection as large as the largest
     * input, some results may contain undefined values. TypeScript cannot
     * account for these without cases (as of v2.5).
     */
    zipAll<U>(other: Collection<any, U>): List<[T,U]>;
    zipAll<U,V>(other: Collection<any, U>, other2: Collection<any,V>): List<[T,U,V]>;
    zipAll(...collections: Array<Collection<any, any>>): List<any>;

    /**
     * Returns a List "zipped" with the provided collections by using a
     * custom `zipper` function.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable');" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 4, 5, 6 ]);
     * const c = a.zipWith((a, b) => a + b, b);
     * // List [ 5, 7, 9 ]
     * ```
     */
    zipWith<U, Z>(
      zipper: (value: T, otherValue: U) => Z,
      otherCollection: Collection<any, U>
    ): List<Z>;
    zipWith<U, V, Z>(
      zipper: (value: T, otherValue: U, thirdValue: V) => Z,
      otherCollection: Collection<any, U>,
      thirdCollection: Collection<any, V>
    ): List<Z>;
    zipWith<Z>(
      zipper: (...any: Array<any>) => Z,
      ...collections: Array<Collection<any, any>>
    ): List<Z>;
  }


  /**
   * Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
   * `O(log32 N)` gets and `O(log32 N)` persistent sets.
   *
   * Iteration order of a Map is undefined, however is stable. Multiple
   * iterations of the same Map will iterate in the same order.
   *
   * Map's keys can be of any type, and use `Immutable.is` to determine key
   * equality. This allows the use of any value (including NaN) as a key.
   *
   * Because `Immutable.is` returns equality based on value semantics, and
   * Immutable collections are treated as values, any Immutable collection may
   * be used as a key.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable');
   * Map().set(List([ 1 ]), 'listofone').get(List([ 1 ]));
   * // 'listofone'
   * ```
   *
   * Any JavaScript object may be used as a key, however strict identity is used
   * to evaluate key equality. Two similar looking objects will represent two
   * different keys.
   *
   * Implemented by a hash-array mapped trie.
   */
  declare module Map {

    /**
     * True if the provided value is a Map
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map.isMap({}) // false
     * Map.isMap(Map()) // true
     * ```
     */
    function isMap(maybeMap: any): maybeMap is Map<any, any>;

    /**
     * Creates a new Map from alternating keys and values
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map.of(
     *   'key', 'value',
     *   'numerical value', 3,
     *    0, 'numerical key'
     * )
     * // Map { 0: "numerical key", "key": "value", "numerical value": 3 }
     * ```
     *
     * @deprecated Use Map([ [ 'k', 'v' ] ]) or Map({ k: 'v' })
     */
    function of(...keyValues: Array<any>): Map<any, any>;
  }

  /**
   * Creates a new Immutable Map.
   *
   * Created with the same key value pairs as the provided Collection.Keyed or
   * JavaScript Object or expects a Collection of [K, V] tuple entries.
   *
   * Note: `Map` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ key: "value" })
   * Map([ [ "key", "value" ] ])
   * ```
   *
   * Keep in mind, when using JS objects to construct Immutable Maps, that
   * JavaScript Object properties are always strings, even if written in a
   * quote-less shorthand, while Immutable Maps accept keys of any type.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * let obj = { 1: "one" }
   * Object.keys(obj) // [ "1" ]
   * assert.equal(obj["1"], obj[1]) // "one" === "one"
   *
   * let map = Map(obj)
   * assert.notEqual(map.get("1"), map.get(1)) // "one" !== undefined
   * ```
   *
   * Property access for JavaScript Objects first converts the key to a string,
   * but since Immutable Map keys can be of any type the argument to `get()` is
   * not altered.
   */
  declare function Map<K, V>(collection: Iterable<[K, V]>): Map<K, V>;
  declare function Map<T>(collection: Iterable<Iterable<T>>): Map<T, T>;
  declare function Map<V>(obj: {[key: string]: V}): Map<string, V>;
  declare function Map<K, V>(): Map<K, V>;
  declare function Map(): Map<any, any>;

  interface Map<K, V> extends Collection.Keyed<K, V> {

    /**
     * The number of entries in this Map.
     */
    readonly size: number;

    // Persistent changes

    /**
     * Returns a new Map also containing the new key, value pair. If an equivalent
     * key already exists in this Map, it will be replaced.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const originalMap = Map()
     * const newerMap = originalMap.set('key', 'value')
     * const newestMap = newerMap.set('key', 'newer value')
     *
     * originalMap
     * // Map {}
     * newerMap
     * // Map { "key": "value" }
     * newestMap
     * // Map { "key": "newer value" }
     * ```
     *
     * Note: `set` can be used in `withMutations`.
     */
    set(key: K, value: V): this;

    /**
     * Returns a new Map which excludes this `key`.
     *
     * Note: `delete` cannot be safely used in IE8, but is provided to mirror
     * the ES6 collection API.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const originalMap = Map({
     *   key: 'value',
     *   otherKey: 'other value'
     * })
     * // Map { "key": "value", "otherKey": "other value" }
     * originalMap.delete('otherKey')
     * // Map { "key": "value" }
     * ```
     *
     * Note: `delete` can be used in `withMutations`.
     *
     * @alias remove
     */
    delete(key: K): this;
    remove(key: K): this;

    /**
     * Returns a new Map which excludes the provided `keys`.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const names = Map({ a: "Aaron", b: "Barry", c: "Connor" })
     * names.deleteAll([ 'a', 'c' ])
     * // Map { "b": "Barry" }
     * ```
     *
     * Note: `deleteAll` can be used in `withMutations`.
     *
     * @alias removeAll
     */
    deleteAll(keys: Iterable<K>): this;
    removeAll(keys: Iterable<K>): this;

    /**
     * Returns a new Map containing no keys or values.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ key: 'value' }).clear()
     * // Map {}
     * ```
     *
     * Note: `clear` can be used in `withMutations`.
     */
    clear(): this;

    /**
     * Returns a new Map having updated the value at this `key` with the return
     * value of calling `updater` with the existing value.
     *
     * Similar to: `map.set(key, updater(map.get(key)))`.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const aMap = Map({ key: 'value' })
     * const newMap = aMap.update('key', value => value + value)
     * // Map { "key": "valuevalue" }
     * ```
     *
     * This is most commonly used to call methods on collections within a
     * structure of data. For example, in order to `.push()` onto a nested `List`,
     * `update` and `push` can be used together:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map, List } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ nestedList: List([ 1, 2, 3 ]) })
     * const newMap = aMap.update('nestedList', list => list.push(4))
     * // Map { "nestedList": List [ 1, 2, 3, 4 ] }
     * ```
     *
     * When a `notSetValue` is provided, it is provided to the `updater`
     * function when the value at the key does not exist in the Map.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ key: 'value' })
     * const newMap = aMap.update('noKey', 'no value', value => value + value)
     * // Map { "key": "value", "noKey": "no valueno value" }
     * ```
     *
     * However, if the `updater` function returns the same value it was called
     * with, then no change will occur. This is still true if `notSetValue`
     * is provided.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ apples: 10 })
     * const newMap = aMap.update('oranges', 0, val => val)
     * // Map { "apples": 10 }
     * assert.strictEqual(newMap, map);
     * ```
     *
     * For code using ES2015 or later, using `notSetValue` is discourged in
     * favor of function parameter default values. This helps to avoid any
     * potential confusion with identify functions as described above.
     *
     * The previous example behaves differently when written with default values:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ apples: 10 })
     * const newMap = aMap.update('oranges', (val = 0) => val)
     * // Map { "apples": 10, "oranges": 0 }
     * ```
     *
     * If no key is provided, then the `updater` function return value is
     * returned as well.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * const aMap = Map({ key: 'value' })
     * const result = aMap.update(aMap => aMap.get('key'))
     * // "value"
     * ```
     *
     * This can be very useful as a way to "chain" a normal function into a
     * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
     *
     * For example, to sum the values in a Map
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable');" }
     * -->
     * ```js
     * function sum(collection) {
     *   return collection.reduce((sum, x) => sum + x, 0)
     * }
     *
     * Map({ x: 1, y: 2, z: 3 })
     *   .map(x => x + 1)
     *   .filter(x => x % 2 === 0)
     *   .update(sum)
     * // 6
     * ```
     *
     * Note: `update(key)` can be used in `withMutations`.
     */
    update(key: K, notSetValue: V, updater: (value: V) => V): this;
    update(key: K, updater: (value: V) => V): this;
    update<R>(updater: (value: this) => R): R;

    /**
     * Returns a new Map resulting from merging the provided Collections
     * (or JS objects) into this Map. In other words, this takes each entry of
     * each collection and sets it on this Map.
     *
     * Note: Values provided to `merge` are shallowly converted before being
     * merged. No nested values are altered.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const one = Map({ a: 10, b: 20, c: 30 })
     * const two = Map({ b: 40, a: 50, d: 60 })
     * one.merge(two) // Map { "a": 50, "b": 40, "c": 30, "d": 60 }
     * two.merge(one) // Map { "b": 20, "a": 10, "d": 60, "c": 30 }
     * ```
     *
     * Note: `merge` can be used in `withMutations`.
     *
     * @alias concat
     */
    merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map<K | KC, V | VC>;
    merge<C>(...collections: Array<{[key: string]: C}>): Map<K | string, V | C>;
    concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map<K | KC, V | VC>;
    concat<C>(...collections: Array<{[key: string]: C}>): Map<K | string, V | C>;

    /**
     * Like `merge()`, `mergeWith()` returns a new Map resulting from merging
     * the provided Collections (or JS objects) into this Map, but uses the
     * `merger` function for dealing with conflicts.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const one = Map({ a: 10, b: 20, c: 30 })
     * const two = Map({ b: 40, a: 50, d: 60 })
     * one.mergeWith((oldVal, newVal) => oldVal / newVal, two)
     * // { "a": 0.2, "b": 0.5, "c": 30, "d": 60 }
     * two.mergeWith((oldVal, newVal) => oldVal / newVal, one)
     * // { "b": 2, "a": 5, "d": 60, "c": 30 }
     * ```
     *
     * Note: `mergeWith` can be used in `withMutations`.
     */
    mergeWith(
      merger: (oldVal: V, newVal: V, key: K) => V,
      ...collections: Array<Iterable<[K, V]> | {[key: string]: V}>
    ): this;

    /**
     * Like `merge()`, but when two Collections conflict, it merges them as well,
     * recursing deeply through the nested data.
     *
     * Note: Values provided to `merge` are shallowly converted before being
     * merged. No nested values are altered unless they will also be merged at
     * a deeper level.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
     * const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
     * one.mergeDeep(two)
     * // Map {
     * //   "a": Map { "x": 2, "y": 10 },
     * //   "b": Map { "x": 20, "y": 5 },
     * //   "c": Map { "z": 3 }
     * // }
     * ```
     *
     * Note: `mergeDeep` can be used in `withMutations`.
     */
    mergeDeep(...collections: Array<Iterable<[K, V]> | {[key: string]: V}>): this;

    /**
     * Like `mergeDeep()`, but when two non-Collections conflict, it uses the
     * `merger` function to determine the resulting value.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
     * const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
     * one.mergeDeepWith((oldVal, newVal) => oldVal / newVal, two)
     * // Map {
     * //   "a": Map { "x": 5, "y": 10 },
     * //   "b": Map { "x": 20, "y": 10 },
     * //   "c": Map { "z": 3 }
     * // }
     * ```

     * Note: `mergeDeepWith` can be used in `withMutations`.
     */
    mergeDeepWith(
      merger: (oldVal: any, newVal: any, key: any) => any,
      ...collections: Array<Iterable<[K, V]> | {[key: string]: V}>
    ): this;


    // Deep persistent changes

    /**
     * Returns a new Map having set `value` at this `keyPath`. If any keys in
     * `keyPath` do not exist, a new immutable Map will be created at that key.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const originalMap = Map({
     *   subObject: Map({
     *     subKey: 'subvalue',
     *     subSubObject: Map({
     *       subSubKey: 'subSubValue'
     *     })
     *   })
     * })
     *
     * const newMap = originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
     * // Map {
     * //   "subObject": Map {
     * //     "subKey": "ha ha!",
     * //     "subSubObject": Map { "subSubKey": "subSubValue" }
     * //   }
     * // }
     *
     * const newerMap = originalMap.setIn(
     *   ['subObject', 'subSubObject', 'subSubKey'],
     *   'ha ha ha!'
     * )
     * // Map {
     * //   "subObject": Map {
     * //     "subKey": "subvalue",
     * //     "subSubObject": Map { "subSubKey": "ha ha ha!" }
     * //   }
     * // }
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and setIn() can update those values as well, treating them
     * immutably by creating new copies of those values with the changes applied.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const originalMap = Map({
     *   subObject: {
     *     subKey: 'subvalue',
     *     subSubObject: {
     *       subSubKey: 'subSubValue'
     *     }
     *   }
     * })
     *
     * originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
     * // Map {
     * //   "subObject": {
     * //     subKey: "ha ha!",
     * //     subSubObject: { subSubKey: "subSubValue" }
     * //   }
     * // }
     * ```
     *
     * If any key in the path exists but cannot be updated (such as a primitive
     * like number or a custom Object like Date), an error will be thrown.
     *
     * Note: `setIn` can be used in `withMutations`.
     */
    setIn(keyPath: Iterable<any>, value: any): this;

    /**
     * Returns a new Map having removed the value at this `keyPath`. If any keys
     * in `keyPath` do not exist, no change will occur.
     *
     * Note: `deleteIn` can be used in `withMutations`.
     *
     * @alias removeIn
     */
    deleteIn(keyPath: Iterable<any>): this;
    removeIn(keyPath: Iterable<any>): this;

    /**
     * Returns a new Map having applied the `updater` to the entry found at the
     * keyPath.
     *
     * This is most commonly used to call methods on collections nested within a
     * structure of data. For example, in order to `.push()` onto a nested `List`,
     * `updateIn` and `push` can be used together:
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map, List } = require('immutable')
     * const map = Map({ inMap: Map({ inList: List([ 1, 2, 3 ]) }) })
     * const newMap = map.updateIn(['inMap', 'inList'], list => list.push(4))
     * // Map { "inMap": Map { "inList": List [ 1, 2, 3, 4 ] } }
     * ```
     *
     * If any keys in `keyPath` do not exist, new Immutable `Map`s will
     * be created at those keys. If the `keyPath` does not already contain a
     * value, the `updater` function will be called with `notSetValue`, if
     * provided, otherwise `undefined`.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable')" }
     * -->
     * ```js
     * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
     * const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
     * // Map { "a": Map { "b": Map { "c": 20 } } }
     * ```
     *
     * If the `updater` function returns the same value it was called with, then
     * no change will occur. This is still true if `notSetValue` is provided.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable')" }
     * -->
     * ```js
     * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
     * const newMap = map.updateIn(['a', 'b', 'x'], 100, val => val)
     * // Map { "a": Map { "b": Map { "c": 10 } } }
     * assert.strictEqual(newMap, aMap)
     * ```
     *
     * For code using ES2015 or later, using `notSetValue` is discourged in
     * favor of function parameter default values. This helps to avoid any
     * potential confusion with identify functions as described above.
     *
     * The previous example behaves differently when written with default values:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable')" }
     * -->
     * ```js
     * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
     * const newMap = map.updateIn(['a', 'b', 'x'], (val = 100) => val)
     * // Map { "a": Map { "b": Map { "c": 10, "x": 100 } } }
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and updateIn() can update those values as well, treating them
     * immutably by creating new copies of those values with the changes applied.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Map } = require('immutable')" }
     * -->
     * ```js
     * const map = Map({ a: { b: { c: 10 } } })
     * const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
     * // Map { "a": { b: { c: 20 } } }
     * ```
     *
     * If any key in the path exists but cannot be updated (such as a primitive
     * like number or a custom Object like Date), an error will be thrown.
     *
     * Note: `updateIn` can be used in `withMutations`.
     */
    updateIn(keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): this;
    updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;

    /**
     * A combination of `updateIn` and `merge`, returning a new Map, but
     * performing the merge at a point arrived at by following the keyPath.
     * In other words, these two lines are equivalent:
     *
     * ```js
     * map.updateIn(['a', 'b', 'c'], abc => abc.merge(y))
     * map.mergeIn(['a', 'b', 'c'], y)
     * ```
     *
     * Note: `mergeIn` can be used in `withMutations`.
     */
    mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    /**
     * A combination of `updateIn` and `mergeDeep`, returning a new Map, but
     * performing the deep merge at a point arrived at by following the keyPath.
     * In other words, these two lines are equivalent:
     *
     * ```js
     * map.updateIn(['a', 'b', 'c'], abc => abc.mergeDeep(y))
     * map.mergeDeepIn(['a', 'b', 'c'], y)
     * ```
     *
     * Note: `mergeDeepIn` can be used in `withMutations`.
     */
    mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    // Transient changes

    /**
     * Every time you call one of the above functions, a new immutable Map is
     * created. If a pure function calls a number of these to produce a final
     * return value, then a penalty on performance and memory has been paid by
     * creating all of the intermediate immutable Maps.
     *
     * If you need to apply a series of mutations to produce a new immutable
     * Map, `withMutations()` creates a temporary mutable copy of the Map which
     * can apply mutations in a highly performant manner. In fact, this is
     * exactly how complex mutations like `merge` are done.
     *
     * As an example, this results in the creation of 2, not 4, new Maps:
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * const map1 = Map()
     * const map2 = map1.withMutations(map => {
     *   map.set('a', 1).set('b', 2).set('c', 3)
     * })
     * assert.equal(map1.size, 0)
     * assert.equal(map2.size, 3)
     * ```
     *
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Read the documentation for each method to see if it
     * is safe to use in `withMutations`.
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * Another way to avoid creation of intermediate Immutable maps is to create
     * a mutable copy of this collection. Mutable copies *always* return `this`,
     * and thus shouldn't be used for equality. Your function should never return
     * a mutable copy of a collection, only use it internally to create a new
     * collection.
     *
     * If possible, use `withMutations` to work with temporary mutable copies as
     * it provides an easier to use API and considers many common optimizations.
     *
     * Note: if the collection is already mutable, `asMutable` returns itself.
     *
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Read the documentation for each method to see if it
     * is safe to use in `withMutations`.
     *
     * @see `Map#asImmutable`
     */
    asMutable(): this;

    /**
     * Returns true if this is a mutable copy (see `asMutable()`) and mutative
     * alterations have been applied.
     *
     * @see `Map#asMutable`
     */
    wasAltered(): boolean;

    /**
     * The yin to `asMutable`'s yang. Because it applies to mutable collections,
     * this operation is *mutable* and may return itself (though may not
     * return itself, i.e. if the result is an empty collection). Once
     * performed, the original mutable copy must no longer be mutated since it
     * may be the immutable result.
     *
     * If possible, use `withMutations` to work with temporary mutable copies as
     * it provides an easier to use API and considers many common optimizations.
     *
     * @see `Map#asMutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    /**
     * Returns a new Map with values passed through a
     * `mapper` function.
     *
     *     Map({ a: 1, b: 2 }).map(x => 10 * x)
     *     // Map { a: 10, b: 20 }
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): Map<K, M>;

    /**
     * @see Collection.Keyed.mapKeys
     */
    mapKeys<M>(
      mapper: (key: K, value: V, iter: this) => M,
      context?: any
    ): Map<M, V>;

    /**
     * @see Collection.Keyed.mapEntries
     */
    mapEntries<KM, VM>(
      mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
      context?: any
    ): Map<KM, VM>;

    /**
     * Flat-maps the Map, returning a new Map.
     *
     * Similar to `data.map(...).flatten(true)`.
     */
    flatMap<KM, VM>(
      mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
      context?: any
    ): Map<KM, VM>;

    /**
     * Returns a new Map with only the entries for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
      predicate: (value: V, key: K, iter: this) => value is F,
      context?: any
    ): Map<K, F>;
    filter(
      predicate: (value: V, key: K, iter: this) => any,
      context?: any
    ): this;

    /**
     * @see Collection.Keyed.flip
     */
    flip(): Map<V, K>;
  }


  /**
   * A type of Map that has the additional guarantee that the iteration order of
   * entries will be the order in which they were set().
   *
   * The iteration behavior of OrderedMap is the same as native ES6 Map and
   * JavaScript Object.
   *
   * Note that `OrderedMap` are more expensive than non-ordered `Map` and may
   * consume more memory. `OrderedMap#set` is amortized O(log32 N), but not
   * stable.
   */

  declare module OrderedMap {

    /**
     * True if the provided value is an OrderedMap.
     */
    function isOrderedMap(maybeOrderedMap: any): maybeOrderedMap is OrderedMap<any, any>;
  }

  /**
   * Creates a new Immutable OrderedMap.
   *
   * Created with the same key value pairs as the provided Collection.Keyed or
   * JavaScript Object or expects a Collection of [K, V] tuple entries.
   *
   * The iteration order of key-value pairs provided to this constructor will
   * be preserved in the OrderedMap.
   *
   *     let newOrderedMap = OrderedMap({key: "value"})
   *     let newOrderedMap = OrderedMap([["key", "value"]])
   *
   * Note: `OrderedMap` is a factory function and not a class, and does not use
   * the `new` keyword during construction.
   */
  declare function OrderedMap<K, V>(collection: Iterable<[K, V]>): OrderedMap<K, V>;
  declare function OrderedMap<T>(collection: Iterable<Iterable<T>>): OrderedMap<T, T>;
  declare function OrderedMap<V>(obj: {[key: string]: V}): OrderedMap<string, V>;
  declare function OrderedMap<K, V>(): OrderedMap<K, V>;
  declare function OrderedMap(): OrderedMap<any, any>;

  interface OrderedMap<K, V> extends Map<K, V> {

    /**
     * The number of entries in this OrderedMap.
     */
    readonly size: number;

    /**
     * Returns a new OrderedMap also containing the new key, value pair. If an
     * equivalent key already exists in this OrderedMap, it will be replaced
     * while maintaining the existing order.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { OrderedMap } = require('immutable')
     * const originalMap = OrderedMap({a:1, b:1, c:1})
     * const updatedMap = originalMap.set('b', 2)
     *
     * originalMap
     * // OrderedMap {a: 1, b: 1, c: 1}
     * updatedMap
     * // OrderedMap {a: 1, b: 2, c: 1}
     * ```
     *
     * Note: `set` can be used in `withMutations`.
     */
    set(key: K, value: V): this;

    /**
     * Returns a new OrderedMap resulting from merging the provided Collections
     * (or JS objects) into this OrderedMap. In other words, this takes each
     * entry of each collection and sets it on this OrderedMap.
     *
     * Note: Values provided to `merge` are shallowly converted before being
     * merged. No nested values are altered.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { OrderedMap } = require('immutable')
     * const one = OrderedMap({ a: 10, b: 20, c: 30 })
     * const two = OrderedMap({ b: 40, a: 50, d: 60 })
     * one.merge(two) // OrderedMap { "a": 50, "b": 40, "c": 30, "d": 60 }
     * two.merge(one) // OrderedMap { "b": 20, "a": 10, "d": 60, "c": 30 }
     * ```
     *
     * Note: `merge` can be used in `withMutations`.
     *
     * @alias concat
     */
    merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): OrderedMap<K | KC, V | VC>;
    merge<C>(...collections: Array<{[key: string]: C}>): OrderedMap<K | string, V | C>;
    concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): OrderedMap<K | KC, V | VC>;
    concat<C>(...collections: Array<{[key: string]: C}>): OrderedMap<K | string, V | C>;

    // Sequence algorithms

    /**
     * Returns a new OrderedMap with values passed through a
     * `mapper` function.
     *
     *     OrderedMap({ a: 1, b: 2 }).map(x => 10 * x)
     *     // OrderedMap { "a": 10, "b": 20 }
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): OrderedMap<K, M>;

    /**
     * @see Collection.Keyed.mapKeys
     */
    mapKeys<M>(
      mapper: (key: K, value: V, iter: this) => M,
      context?: any
    ): OrderedMap<M, V>;

    /**
     * @see Collection.Keyed.mapEntries
     */
    mapEntries<KM, VM>(
      mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
      context?: any
    ): OrderedMap<KM, VM>;

    /**
     * Flat-maps the OrderedMap, returning a new OrderedMap.
     *
     * Similar to `data.map(...).flatten(true)`.
     */
    flatMap<KM, VM>(
      mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
      context?: any
    ): OrderedMap<KM, VM>;

    /**
     * Returns a new OrderedMap with only the entries for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
      predicate: (value: V, key: K, iter: this) => value is F,
      context?: any
    ): OrderedMap<K, F>;
    filter(
      predicate: (value: V, key: K, iter: this) => any,
      context?: any
    ): this;

    /**
     * @see Collection.Keyed.flip
     */
    flip(): OrderedMap<V, K>;
  }


  /**
   * A Collection of unique values with `O(log32 N)` adds and has.
   *
   * When iterating a Set, the entries will be (value, value) pairs. Iteration
   * order of a Set is undefined, however is stable. Multiple iterations of the
   * same Set will iterate in the same order.
   *
   * Set values, like Map keys, may be of any type. Equality is determined using
   * `Immutable.is`, enabling Sets to uniquely include other Immutable
   * collections, custom value types, and NaN.
   */
  declare module Set$1 {

    /**
     * True if the provided value is a Set
     */
    function isSet(maybeSet: any): maybeSet is Set$1<any>;

    /**
     * Creates a new Set containing `values`.
     */
    function of<T>(...values: Array<T>): Set$1<T>;

    /**
     * `Set.fromKeys()` creates a new immutable Set containing the keys from
     * this Collection or JavaScript Object.
     */
    function fromKeys<T>(iter: Collection<T, any>): Set$1<T>;
    function fromKeys(obj: {[key: string]: any}): Set$1<string>;

    /**
     * `Set.intersect()` creates a new immutable Set that is the intersection of
     * a collection of other sets.
     *
     * ```js
     * const { Set } = require('immutable')
     * const intersected = Set.intersect([
     *   Set([ 'a', 'b', 'c' ])
     *   Set([ 'c', 'a', 't' ])
     * ])
     * // Set [ "a", "c"" ]
     * ```
     */
    function intersect<T>(sets: Iterable<Iterable<T>>): Set$1<T>;

    /**
     * `Set.union()` creates a new immutable Set that is the union of a
     * collection of other sets.
     *
     * ```js
     * const { Set } = require('immutable')
     * const unioned = Set.union([
     *   Set([ 'a', 'b', 'c' ])
     *   Set([ 'c', 'a', 't' ])
     * ])
     * // Set [ "a", "b", "c", "t"" ]
     * ```
     */
    function union<T>(sets: Iterable<Iterable<T>>): Set$1<T>;
  }

  /**
   * Create a new immutable Set containing the values of the provided
   * collection-like.
   *
   * Note: `Set` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   */
  declare function Set$1(): Set$1<any>;
  declare function Set$1<T>(): Set$1<T>;
  declare function Set$1<T>(collection: Iterable<T>): Set$1<T>;

  interface Set$1<T> extends Collection.Set<T> {

    /**
     * The number of items in this Set.
     */
    readonly size: number;

    // Persistent changes

    /**
     * Returns a new Set which also includes this value.
     *
     * Note: `add` can be used in `withMutations`.
     */
    add(value: T): this;

    /**
     * Returns a new Set which excludes this value.
     *
     * Note: `delete` can be used in `withMutations`.
     *
     * Note: `delete` **cannot** be safely used in IE8, use `remove` if
     * supporting old browsers.
     *
     * @alias remove
     */
    delete(value: T): this;
    remove(value: T): this;

    /**
     * Returns a new Set containing no values.
     *
     * Note: `clear` can be used in `withMutations`.
     */
    clear(): this;

    /**
     * Returns a Set including any value from `collections` that does not already
     * exist in this Set.
     *
     * Note: `union` can be used in `withMutations`.
     * @alias merge
     * @alias concat
     */
    union<C>(...collections: Array<Iterable<C>>): Set$1<T | C>;
    merge<C>(...collections: Array<Iterable<C>>): Set$1<T | C>;
    concat<C>(...collections: Array<Iterable<C>>): Set$1<T | C>;

    /**
     * Returns a Set which has removed any values not also contained
     * within `collections`.
     *
     * Note: `intersect` can be used in `withMutations`.
     */
    intersect(...collections: Array<Iterable<T>>): this;

    /**
     * Returns a Set excluding any values contained within `collections`.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { OrderedSet } = require('immutable')
     * OrderedSet([ 1, 2, 3 ]).subtract([1, 3])
     * // OrderedSet [2]
     * ```
     *
     * Note: `subtract` can be used in `withMutations`.
     */
    subtract(...collections: Array<Iterable<T>>): this;


    // Transient changes

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * mentions being safe to use in `withMutations`.
     *
     * @see `Map#withMutations`
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * mentions being safe to use in `withMutations`.
     *
     * @see `Map#asMutable`
     */
    asMutable(): this;

    /**
     * @see `Map#wasAltered`
     */
    wasAltered(): boolean;

    /**
     * @see `Map#asImmutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    /**
     * Returns a new Set with values passed through a
     * `mapper` function.
     *
     *     Set([1,2]).map(x => 10 * x)
     *     // Set [10,20]
     */
    map<M>(
      mapper: (value: T, key: T, iter: this) => M,
      context?: any
    ): Set$1<M>;

    /**
     * Flat-maps the Set, returning a new Set.
     *
     * Similar to `set.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: T, key: T, iter: this) => Iterable<M>,
      context?: any
    ): Set$1<M>;

    /**
     * Returns a new Set with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
      predicate: (value: T, key: T, iter: this) => value is F,
      context?: any
    ): Set$1<F>;
    filter(
      predicate: (value: T, key: T, iter: this) => any,
      context?: any
    ): this;
  }


  /**
   * A type of Set that has the additional guarantee that the iteration order of
   * values will be the order in which they were `add`ed.
   *
   * The iteration behavior of OrderedSet is the same as native ES6 Set.
   *
   * Note that `OrderedSet` are more expensive than non-ordered `Set` and may
   * consume more memory. `OrderedSet#add` is amortized O(log32 N), but not
   * stable.
   */
  declare module OrderedSet {

    /**
     * True if the provided value is an OrderedSet.
     */
    function isOrderedSet(maybeOrderedSet: any): boolean;

    /**
     * Creates a new OrderedSet containing `values`.
     */
    function of<T>(...values: Array<T>): OrderedSet<T>;

    /**
     * `OrderedSet.fromKeys()` creates a new immutable OrderedSet containing
     * the keys from this Collection or JavaScript Object.
     */
    function fromKeys<T>(iter: Collection<T, any>): OrderedSet<T>;
    function fromKeys(obj: {[key: string]: any}): OrderedSet<string>;
  }

  /**
   * Create a new immutable OrderedSet containing the values of the provided
   * collection-like.
   *
   * Note: `OrderedSet` is a factory function and not a class, and does not use
   * the `new` keyword during construction.
   */
  declare function OrderedSet(): OrderedSet<any>;
  declare function OrderedSet<T>(): OrderedSet<T>;
  declare function OrderedSet<T>(collection: Iterable<T>): OrderedSet<T>;

  interface OrderedSet<T> extends Set$1<T> {

    /**
     * The number of items in this OrderedSet.
     */
    readonly size: number;

    /**
     * Returns an OrderedSet including any value from `collections` that does
     * not already exist in this OrderedSet.
     *
     * Note: `union` can be used in `withMutations`.
     * @alias merge
     * @alias concat
     */
    union<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;
    merge<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;
    concat<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;

    // Sequence algorithms

    /**
     * Returns a new Set with values passed through a
     * `mapper` function.
     *
     *     OrderedSet([ 1, 2 ]).map(x => 10 * x)
     *     // OrderedSet [10, 20]
     */
    map<M>(
      mapper: (value: T, key: T, iter: this) => M,
      context?: any
    ): OrderedSet<M>;

    /**
     * Flat-maps the OrderedSet, returning a new OrderedSet.
     *
     * Similar to `set.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: T, key: T, iter: this) => Iterable<M>,
      context?: any
    ): OrderedSet<M>;

    /**
     * Returns a new OrderedSet with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
      predicate: (value: T, key: T, iter: this) => value is F,
      context?: any
    ): OrderedSet<F>;
    filter(
      predicate: (value: T, key: T, iter: this) => any,
      context?: any
    ): this;

    /**
     * Returns an OrderedSet of the same type "zipped" with the provided
     * collections.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     * ```js
     * const a = OrderedSet([ 1, 2, 3 ])
     * const b = OrderedSet([ 4, 5, 6 ])
     * const c = a.zip(b)
     * // OrderedSet [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): OrderedSet<[T,U]>;
    zip<U,V>(other1: Collection<any, U>, other2: Collection<any, V>): OrderedSet<[T,U,V]>;
    zip(...collections: Array<Collection<any, any>>): OrderedSet<any>;

    /**
     * Returns a OrderedSet of the same type "zipped" with the provided
     * collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * ```js
     * const a = OrderedSet([ 1, 2 ]);
     * const b = OrderedSet([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // OrderedSet [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     *
     * Note: Since zipAll will return a collection as large as the largest
     * input, some results may contain undefined values. TypeScript cannot
     * account for these without cases (as of v2.5).
     */
    zipAll<U>(other: Collection<any, U>): OrderedSet<[T,U]>;
    zipAll<U,V>(other1: Collection<any, U>, other2: Collection<any, V>): OrderedSet<[T,U,V]>;
    zipAll(...collections: Array<Collection<any, any>>): OrderedSet<any>;

    /**
     * Returns an OrderedSet of the same type "zipped" with the provided
     * collections by using a custom `zipper` function.
     *
     * @see Seq.Indexed.zipWith
     */
    zipWith<U, Z>(
      zipper: (value: T, otherValue: U) => Z,
      otherCollection: Collection<any, U>
    ): OrderedSet<Z>;
    zipWith<U, V, Z>(
      zipper: (value: T, otherValue: U, thirdValue: V) => Z,
      otherCollection: Collection<any, U>,
      thirdCollection: Collection<any, V>
    ): OrderedSet<Z>;
    zipWith<Z>(
      zipper: (...any: Array<any>) => Z,
      ...collections: Array<Collection<any, any>>
    ): OrderedSet<Z>;

  }


  /**
   * Stacks are indexed collections which support very efficient O(1) addition
   * and removal from the front using `unshift(v)` and `shift()`.
   *
   * For familiarity, Stack also provides `push(v)`, `pop()`, and `peek()`, but
   * be aware that they also operate on the front of the list, unlike List or
   * a JavaScript Array.
   *
   * Note: `reverse()` or any inherent reverse traversal (`reduceRight`,
   * `lastIndexOf`, etc.) is not efficient with a Stack.
   *
   * Stack is implemented with a Single-Linked List.
   */
  declare module Stack {

    /**
     * True if the provided value is a Stack
     */
    function isStack(maybeStack: any): maybeStack is Stack<any>;

    /**
     * Creates a new Stack containing `values`.
     */
    function of<T>(...values: Array<T>): Stack<T>;
  }

  /**
   * Create a new immutable Stack containing the values of the provided
   * collection-like.
   *
   * The iteration order of the provided collection is preserved in the
   * resulting `Stack`.
   *
   * Note: `Stack` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   */
  declare function Stack(): Stack<any>;
  declare function Stack<T>(): Stack<T>;
  declare function Stack<T>(collection: Iterable<T>): Stack<T>;

  interface Stack<T> extends Collection.Indexed<T> {

    /**
     * The number of items in this Stack.
     */
    readonly size: number;

    // Reading values

    /**
     * Alias for `Stack.first()`.
     */
    peek(): T | undefined;


    // Persistent changes

    /**
     * Returns a new Stack with 0 size and no values.
     *
     * Note: `clear` can be used in `withMutations`.
     */
    clear(): Stack<T>;

    /**
     * Returns a new Stack with the provided `values` prepended, shifting other
     * values ahead to higher indices.
     *
     * This is very efficient for Stack.
     *
     * Note: `unshift` can be used in `withMutations`.
     */
    unshift(...values: Array<T>): Stack<T>;

    /**
     * Like `Stack#unshift`, but accepts a collection rather than varargs.
     *
     * Note: `unshiftAll` can be used in `withMutations`.
     */
    unshiftAll(iter: Iterable<T>): Stack<T>;

    /**
     * Returns a new Stack with a size ones less than this Stack, excluding
     * the first item in this Stack, shifting all other values to a lower index.
     *
     * Note: this differs from `Array#shift` because it returns a new
     * Stack rather than the removed value. Use `first()` or `peek()` to get the
     * first value in this Stack.
     *
     * Note: `shift` can be used in `withMutations`.
     */
    shift(): Stack<T>;

    /**
     * Alias for `Stack#unshift` and is not equivalent to `List#push`.
     */
    push(...values: Array<T>): Stack<T>;

    /**
     * Alias for `Stack#unshiftAll`.
     */
    pushAll(iter: Iterable<T>): Stack<T>;

    /**
     * Alias for `Stack#shift` and is not equivalent to `List#pop`.
     */
    pop(): Stack<T>;


    // Transient changes

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * mentions being safe to use in `withMutations`.
     *
     * @see `Map#withMutations`
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Check the documentation for each method to see if it
     * mentions being safe to use in `withMutations`.
     *
     * @see `Map#asMutable`
     */
    asMutable(): this;

    /**
     * @see `Map#wasAltered`
     */
    wasAltered(): boolean;

    /**
     * @see `Map#asImmutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    /**
     * Returns a new Stack with other collections concatenated to this one.
     */
    concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Stack<T | C>;

    /**
     * Returns a new Stack with values passed through a
     * `mapper` function.
     *
     *     Stack([ 1, 2 ]).map(x => 10 * x)
     *     // Stack [ 10, 20 ]
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     */
    map<M>(
      mapper: (value: T, key: number, iter: this) => M,
      context?: any
    ): Stack<M>;

    /**
     * Flat-maps the Stack, returning a new Stack.
     *
     * Similar to `stack.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: T, key: number, iter: this) => Iterable<M>,
      context?: any
    ): Stack<M>;

    /**
     * Returns a new Set with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
      predicate: (value: T, index: number, iter: this) => value is F,
      context?: any
    ): Set$1<F>;
    filter(
      predicate: (value: T, index: number, iter: this) => any,
      context?: any
    ): this;

    /**
     * Returns a Stack "zipped" with the provided collections.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     * ```js
     * const a = Stack([ 1, 2, 3 ]);
     * const b = Stack([ 4, 5, 6 ]);
     * const c = a.zip(b); // Stack [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): Stack<[T,U]>;
    zip<U,V>(other: Collection<any, U>, other2: Collection<any,V>): Stack<[T,U,V]>;
    zip(...collections: Array<Collection<any, any>>): Stack<any>;

    /**
     * Returns a Stack "zipped" with the provided collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * ```js
     * const a = Stack([ 1, 2 ]);
     * const b = Stack([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // Stack [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     *
     * Note: Since zipAll will return a collection as large as the largest
     * input, some results may contain undefined values. TypeScript cannot
     * account for these without cases (as of v2.5).
     */
    zipAll<U>(other: Collection<any, U>): Stack<[T,U]>;
    zipAll<U,V>(other: Collection<any, U>, other2: Collection<any,V>): Stack<[T,U,V]>;
    zipAll(...collections: Array<Collection<any, any>>): Stack<any>;

    /**
     * Returns a Stack "zipped" with the provided collections by using a
     * custom `zipper` function.
     *
     * ```js
     * const a = Stack([ 1, 2, 3 ]);
     * const b = Stack([ 4, 5, 6 ]);
     * const c = a.zipWith((a, b) => a + b, b);
     * // Stack [ 5, 7, 9 ]
     * ```
     */
    zipWith<U, Z>(
      zipper: (value: T, otherValue: U) => Z,
      otherCollection: Collection<any, U>
    ): Stack<Z>;
    zipWith<U, V, Z>(
      zipper: (value: T, otherValue: U, thirdValue: V) => Z,
      otherCollection: Collection<any, U>,
      thirdCollection: Collection<any, V>
    ): Stack<Z>;
    zipWith<Z>(
      zipper: (...any: Array<any>) => Z,
      ...collections: Array<Collection<any, any>>
    ): Stack<Z>;
  }


  /**
   * A record is similar to a JS object, but enforces a specific set of allowed
   * string keys, and has default values.
   *
   * The `Record()` function produces new Record Factories, which when called
   * create Record instances.
   *
   * ```js
   * const { Record } = require('immutable')
   * const ABRecord = Record({ a: 1, b: 2 })
   * const myRecord = ABRecord({ b: 3 })
   * ```
   *
   * Records always have a value for the keys they define. `remove`ing a key
   * from a record simply resets it to the default value for that key.
   *
   * ```js
   * myRecord.size // 2
   * myRecord.get('a') // 1
   * myRecord.get('b') // 3
   * const myRecordWithoutB = myRecord.remove('b')
   * myRecordWithoutB.get('b') // 2
   * myRecordWithoutB.size // 2
   * ```
   *
   * Values provided to the constructor not found in the Record type will
   * be ignored. For example, in this case, ABRecord is provided a key "x" even
   * though only "a" and "b" have been defined. The value for "x" will be
   * ignored for this record.
   *
   * ```js
   * const myRecord = ABRecord({ b: 3, x: 10 })
   * myRecord.get('x') // undefined
   * ```
   *
   * Because Records have a known set of string keys, property get access works
   * as expected, however property sets will throw an Error.
   *
   * Note: IE8 does not support property access. Only use `get()` when
   * supporting IE8.
   *
   * ```js
   * myRecord.b // 3
   * myRecord.b = 5 // throws Error
   * ```
   *
   * Record Types can be extended as well, allowing for custom methods on your
   * Record. This is not a common pattern in functional environments, but is in
   * many JS programs.
   *
   * However Record Types are more restricted than typical JavaScript classes.
   * They do not use a class constructor, which also means they cannot use
   * class properties (since those are technically part of a constructor).
   *
   * While Record Types can be syntactically created with the JavaScript `class`
   * form, the resulting Record function is actually a factory function, not a
   * class constructor. Even though Record Types are not classes, JavaScript
   * currently requires the use of `new` when creating new Record instances if
   * they are defined as a `class`.
   *
   * ```
   * class ABRecord extends Record({ a: 1, b: 2 }) {
   *   getAB() {
   *     return this.a + this.b;
   *   }
   * }
   *
   * var myRecord = new ABRecord({b: 3})
   * myRecord.getAB() // 4
   * ```
   *
   *
   * **Flow Typing Records:**
   *
   * Immutable.js exports two Flow types designed to make it easier to use
   * Records with flow typed code, `RecordOf<TProps>` and `RecordFactory<TProps>`.
   *
   * When defining a new kind of Record factory function, use a flow type that
   * describes the values the record contains along with `RecordFactory<TProps>`.
   * To type instances of the Record (which the factory function returns),
   * use `RecordOf<TProps>`.
   *
   * Typically, new Record definitions will export both the Record factory
   * function as well as the Record instance type for use in other code.
   *
   * ```js
   * import type { RecordFactory, RecordOf } from 'immutable';
   *
   * // Use RecordFactory<TProps> for defining new Record factory functions.
   * type Point3DProps = { x: number, y: number, z: number };
   * const defaultValues: Point3DProps = { x: 0, y: 0, z: 0 };
   * const makePoint3D: RecordFactory<Point3DProps> = Record(defaultValues);
   * export makePoint3D;
   *
   * // Use RecordOf<T> for defining new instances of that Record.
   * export type Point3D = RecordOf<Point3DProps>;
   * const some3DPoint: Point3D = makePoint3D({ x: 10, y: 20, z: 30 });
   * ```
   *
   * **Flow Typing Record Subclasses:**
   *
   * Records can be subclassed as a means to add additional methods to Record
   * instances. This is generally discouraged in favor of a more functional API,
   * since Subclasses have some minor overhead. However the ability to create
   * a rich API on Record types can be quite valuable.
   *
   * When using Flow to type Subclasses, do not use `RecordFactory<TProps>`,
   * instead apply the props type when subclassing:
   *
   * ```js
   * type PersonProps = {name: string, age: number};
   * const defaultValues: PersonProps = {name: 'Aristotle', age: 2400};
   * const PersonRecord = Record(defaultValues);
   * class Person extends PersonRecord<PersonProps> {
   *   getName(): string {
   *     return this.get('name')
   *   }
   *
   *   setName(name: string): this {
   *     return this.set('name', name);
   *   }
   * }
   * ```
   *
   * **Choosing Records vs plain JavaScript objects**
   *
   * Records offer a persistently immutable alternative to plain JavaScript
   * objects, however they're not required to be used within Immutable.js
   * collections. In fact, the deep-access and deep-updating functions
   * like `getIn()` and `setIn()` work with plain JavaScript Objects as well.
   *
   * Deciding to use Records or Objects in your application should be informed
   * by the tradeoffs and relative benefits of each:
   *
   * - *Runtime immutability*: plain JS objects may be carefully treated as
   *   immutable, however Record instances will *throw* if attempted to be
   *   mutated directly. Records provide this additional guarantee, however at
   *   some marginal runtime cost. While JS objects are mutable by nature, the
   *   use of type-checking tools like [Flow](https://medium.com/@gcanti/immutability-with-flow-faa050a1aef4)
   *   can help gain confidence in code written to favor immutability.
   *
   * - *Value equality*: Records use value equality when compared with `is()`
   *   or `record.equals()`. That is, two Records with the same keys and values
   *   are equal. Plain objects use *reference equality*. Two objects with the
   *   same keys and values are not equal since they are different objects.
   *   This is important to consider when using objects as keys in a `Map` or
   *   values in a `Set`, which use equality when retrieving values.
   *
   * - *API methods*: Records have a full featured API, with methods like
   *   `.getIn()`, and `.equals()`. These can make working with these values
   *   easier, but comes at the cost of not allowing keys with those names.
   *
   * - *Default values*: Records provide default values for every key, which
   *   can be useful when constructing Records with often unchanging values.
   *   However default values can make using Flow and TypeScript more laborious.
   *
   * - *Serialization*: Records use a custom internal representation to
   *   efficiently store and update their values. Converting to and from this
   *   form isn't free. If converting Records to plain objects is common,
   *   consider sticking with plain objects to begin with.
   */
  declare module Record$1 {

    /**
     * True if `maybeRecord` is an instance of a Record.
     */
    export function isRecord(maybeRecord: any): maybeRecord is Record$1<any>;

    /**
     * Records allow passing a second parameter to supply a descriptive name
     * that appears when converting a Record to a string or in any error
     * messages. A descriptive name for any record can be accessed by using this
     * method. If one was not provided, the string "Record" is returned.
     *
     * ```js
     * const { Record } = require('immutable')
     * const Person = Record({
     *   name: null
     * }, 'Person')
     *
     * var me = Person({ name: 'My Name' })
     * me.toString() // "Person { "name": "My Name" }"
     * Record.getDescriptiveName(me) // "Person"
     * ```
     */
    export function getDescriptiveName(record: Record$1<any>): string;

    /**
     * A Record.Factory is created by the `Record()` function. Record instances
     * are created by passing it some of the accepted values for that Record
     * type:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Record } = require('immutable')" }
     * -->
     * ```js
     * // makePerson is a Record Factory function
     * const makePerson = Record({ name: null, favoriteColor: 'unknown' });
     *
     * // alan is a Record instance
     * const alan = makePerson({ name: 'Alan' });
     * ```
     *
     * Note that Record Factories return `Record<TProps> & Readonly<TProps>`,
     * this allows use of both the Record instance API, and direct property
     * access on the resulting instances:
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Record } = require('immutable');const makePerson = Record({ name: null, favoriteColor: 'unknown' });const alan = makePerson({ name: 'Alan' });" }
     * -->
     * ```js
     * // Use the Record API
     * console.log('Record API: ' + alan.get('name'))
     *
     * // Or direct property access (Readonly)
     * console.log('property access: ' + alan.name)
     * ```
     *
     * **Flow Typing Records:**
     *
     * Use the `RecordFactory<TProps>` Flow type to get high quality type checking of
     * Records:
     *
     * ```js
     * import type { RecordFactory, RecordOf } from 'immutable';
     *
     * // Use RecordFactory<TProps> for defining new Record factory functions.
     * type PersonProps = { name: ?string, favoriteColor: string };
     * const makePerson: RecordFactory<PersonProps> = Record({ name: null, favoriteColor: 'unknown' });
     *
     * // Use RecordOf<T> for defining new instances of that Record.
     * type Person = RecordOf<PersonProps>;
     * const alan: Person = makePerson({ name: 'Alan' });
     * ```
     */
    export module Factory {}

    export interface Factory<TProps extends Object> {
      (values?: Partial<TProps> | Iterable<[string, any]>): Record$1<TProps> & Readonly<TProps>;
      new (values?: Partial<TProps> | Iterable<[string, any]>): Record$1<TProps> & Readonly<TProps>;
    }

    export function Factory<TProps extends Object>(values?: Partial<TProps> | Iterable<[string, any]>): Record$1<TProps> & Readonly<TProps>;
  }

  /**
   * Unlike other types in Immutable.js, the `Record()` function creates a new
   * Record Factory, which is a function that creates Record instances.
   *
   * See above for examples of using `Record()`.
   *
   * Note: `Record` is a factory function and not a class, and does not use the
   * `new` keyword during construction.
   */
  declare function Record$1<TProps extends object>(defaultValues: TProps, name?: string): Record$1.Factory<TProps>;

  interface Record$1<TProps extends Object> {

    // Reading values

    has(key: string): key is keyof TProps & string;

    /**
     * Returns the value associated with the provided key, which may be the
     * default value defined when creating the Record factory function.
     *
     * If the requested key is not defined by this Record type, then
     * notSetValue will be returned if provided. Note that this scenario would
     * produce an error when using Flow or TypeScript.
     */
    get<K extends keyof TProps>(key: K, notSetValue?: any): TProps[K];
    get<T>(key: string, notSetValue: T): T;

    // Reading deep values

    hasIn(keyPath: Iterable<any>): boolean;
    getIn(keyPath: Iterable<any>): any;

    // Value equality

    equals(other: any): boolean;
    hashCode(): number;

    // Persistent changes

    set<K extends keyof TProps>(key: K, value: TProps[K]): this;
    update<K extends keyof TProps>(key: K, updater: (value: TProps[K]) => TProps[K]): this;
    merge(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this;
    mergeDeep(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this;

    mergeWith(
      merger: (oldVal: any, newVal: any, key: keyof TProps) => any,
      ...collections: Array<Partial<TProps> | Iterable<[string, any]>>
    ): this;
    mergeDeepWith(
      merger: (oldVal: any, newVal: any, key: any) => any,
      ...collections: Array<Partial<TProps> | Iterable<[string, any]>>
    ): this;

    /**
     * Returns a new instance of this Record type with the value for the
     * specific key set to its default value.
     *
     * @alias remove
     */
    delete<K extends keyof TProps>(key: K): this;
    remove<K extends keyof TProps>(key: K): this;

    /**
     * Returns a new instance of this Record type with all values set
     * to their default values.
     */
    clear(): this;

    // Deep persistent changes

    setIn(keyPath: Iterable<any>, value: any): this;
    updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;
    mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;
    mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

    /**
     * @alias removeIn
     */
    deleteIn(keyPath: Iterable<any>): this;
    removeIn(keyPath: Iterable<any>): this;

    // Conversion to JavaScript types

    /**
     * Deeply converts this Record to equivalent native JavaScript Object.
     *
     * Note: This method may not be overridden. Objects with custom
     * serialization to plain JS may override toJSON() instead.
     */
    toJS(): { [K in keyof TProps]: any };

    /**
     * Shallowly converts this Record to equivalent native JavaScript Object.
     */
    toJSON(): TProps;

    /**
     * Shallowly converts this Record to equivalent JavaScript Object.
     */
    toObject(): TProps;

    // Transient changes

    /**
     * Note: Not all methods can be used on a mutable collection or within
     * `withMutations`! Only `set` may be used mutatively.
     *
     * @see `Map#withMutations`
     */
    withMutations(mutator: (mutable: this) => any): this;

    /**
     * @see `Map#asMutable`
     */
    asMutable(): this;

    /**
     * @see `Map#wasAltered`
     */
    wasAltered(): boolean;

    /**
     * @see `Map#asImmutable`
     */
    asImmutable(): this;

    // Sequence algorithms

    toSeq(): Seq.Keyed<keyof TProps, TProps[keyof TProps]>;

    [Symbol.iterator](): IterableIterator<[keyof TProps, TProps[keyof TProps]]>;
  }

  /**
   * `Seq` describes a lazy operation, allowing them to efficiently chain
   * use of all the higher-order collection methods (such as `map` and `filter`)
   * by not creating intermediate collections.
   *
   * **Seq is immutable** — Once a Seq is created, it cannot be
   * changed, appended to, rearranged or otherwise modified. Instead, any
   * mutative method called on a `Seq` will return a new `Seq`.
   *
   * **Seq is lazy** — `Seq` does as little work as necessary to respond to any
   * method call. Values are often created during iteration, including implicit
   * iteration when reducing or converting to a concrete data structure such as
   * a `List` or JavaScript `Array`.
   *
   * For example, the following performs no work, because the resulting
   * `Seq`'s values are never iterated:
   *
   * ```js
   * const { Seq } = require('immutable')
   * const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
   *   .filter(x => x % 2 !== 0)
   *   .map(x => x * x)
   * ```
   *
   * Once the `Seq` is used, it performs only the work necessary. In this
   * example, no intermediate arrays are ever created, filter is called three
   * times, and map is only called once:
   *
   * ```js
   * oddSquares.get(1); // 9
   * ```
   *
   * Any collection can be converted to a lazy Seq with `Seq()`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const map = Map({ a: 1, b: 2, c: 3 }
   * const lazySeq = Seq(map)
   * ```
   *
   * `Seq` allows for the efficient chaining of operations, allowing for the
   * expression of logic that can otherwise be very tedious:
   *
   * ```js
   * lazySeq
   *   .flip()
   *   .map(key => key.toUpperCase())
   *   .flip()
   * // Seq { A: 1, B: 1, C: 1 }
   * ```
   *
   * As well as expressing logic that would otherwise seem memory or time
   * limited, for example `Range` is a special kind of Lazy sequence.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Range } = require('immutable')
   * Range(1, Infinity)
   *   .skip(1000)
   *   .map(n => -n)
   *   .filter(n => n % 2 === 0)
   *   .take(2)
   *   .reduce((r, n) => r * n, 1)
   * // 1006008
   * ```
   *
   * Seq is often used to provide a rich collection API to JavaScript Object.
   *
   * ```js
   * Seq({ x: 0, y: 1, z: 2 }).map(v => v * 2).toObject();
   * // { x: 0, y: 2, z: 4 }
   * ```
   */

  declare module Seq {
    /**
     * True if `maybeSeq` is a Seq, it is not backed by a concrete
     * structure such as Map, List, or Set.
     */
    function isSeq(maybeSeq: any): maybeSeq is Seq.Indexed<any> | Seq.Keyed<any, any> | Seq.Set<any>;


    /**
     * `Seq` which represents key-value pairs.
     */
    export module Keyed {}

    /**
     * Always returns a Seq.Keyed, if input is not keyed, expects an
     * collection of [K, V] tuples.
     *
     * Note: `Seq.Keyed` is a conversion function and not a class, and does not
     * use the `new` keyword during construction.
     */
    export function Keyed<K, V>(collection: Iterable<[K, V]>): Seq.Keyed<K, V>;
    export function Keyed<V>(obj: {[key: string]: V}): Seq.Keyed<string, V>;
    export function Keyed<K, V>(): Seq.Keyed<K, V>;
    export function Keyed(): Seq.Keyed<any, any>;

    export interface Keyed<K, V> extends Seq<K, V>, Collection.Keyed<K, V> {
      /**
       * Deeply converts this Keyed Seq to equivalent native JavaScript Object.
       *
       * Converts keys to Strings.
       */
      toJS(): Object;

      /**
       * Shallowly converts this Keyed Seq to equivalent native JavaScript Object.
       *
       * Converts keys to Strings.
       */
      toJSON(): { [key: string]: V };

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<[K, V]>;

      /**
       * Returns itself
       */
      toSeq(): this;

      /**
       * Returns a new Seq with other collections concatenated to this one.
       *
       * All entries will be present in the resulting Seq, even if they
       * have the same key.
       */
      concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Seq.Keyed<K | KC, V | VC>;
      concat<C>(...collections: Array<{[key: string]: C}>): Seq.Keyed<K | string, V | C>;

      /**
       * Returns a new Seq.Keyed with values passed through a
       * `mapper` function.
       *
       * ```js
       * const { Seq } = require('immutable')
       * Seq.Keyed({ a: 1, b: 2 }).map(x => 10 * x)
       * // Seq { "a": 10, "b": 20 }
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: V, key: K, iter: this) => M,
        context?: any
      ): Seq.Keyed<K, M>;

      /**
       * @see Collection.Keyed.mapKeys
       */
      mapKeys<M>(
        mapper: (key: K, value: V, iter: this) => M,
        context?: any
      ): Seq.Keyed<M, V>;

      /**
       * @see Collection.Keyed.mapEntries
       */
      mapEntries<KM, VM>(
        mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
        context?: any
      ): Seq.Keyed<KM, VM>;

      /**
       * Flat-maps the Seq, returning a Seq of the same type.
       *
       * Similar to `seq.map(...).flatten(true)`.
       */
      flatMap<KM, VM>(
        mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
        context?: any
      ): Seq.Keyed<KM, VM>;

      /**
       * Returns a new Seq with only the entries for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends V>(
        predicate: (value: V, key: K, iter: this) => value is F,
        context?: any
      ): Seq.Keyed<K, F>;
      filter(
        predicate: (value: V, key: K, iter: this) => any,
        context?: any
      ): this;

      /**
       * @see Collection.Keyed.flip
       */
      flip(): Seq.Keyed<V, K>;
    }


    /**
     * `Seq` which represents an ordered indexed list of values.
     */
    module Indexed {

      /**
       * Provides an Seq.Indexed of the values provided.
       */
      function of<T>(...values: Array<T>): Seq.Indexed<T>;
    }

    /**
     * Always returns Seq.Indexed, discarding associated keys and
     * supplying incrementing indices.
     *
     * Note: `Seq.Indexed` is a conversion function and not a class, and does
     * not use the `new` keyword during construction.
     */
    export function Indexed(): Seq.Indexed<any>;
    export function Indexed<T>(): Seq.Indexed<T>;
    export function Indexed<T>(collection: Iterable<T>): Seq.Indexed<T>;

    export interface Indexed<T> extends Seq<number, T>, Collection.Indexed<T> {
      /**
       * Deeply converts this Indexed Seq to equivalent native JavaScript Array.
       */
      toJS(): Array<any>;

      /**
       * Shallowly converts this Indexed Seq to equivalent native JavaScript Array.
       */
      toJSON(): Array<T>;

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<T>;

      /**
       * Returns itself
       */
      toSeq(): this

      /**
       * Returns a new Seq with other collections concatenated to this one.
       */
      concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Seq.Indexed<T | C>;

      /**
       * Returns a new Seq.Indexed with values passed through a
       * `mapper` function.
       *
       * ```js
       * const { Seq } = require('immutable')
       * Seq.Indexed([ 1, 2 ]).map(x => 10 * x)
       * // Seq [ 10, 20 ]
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: T, key: number, iter: this) => M,
        context?: any
      ): Seq.Indexed<M>;

      /**
       * Flat-maps the Seq, returning a a Seq of the same type.
       *
       * Similar to `seq.map(...).flatten(true)`.
       */
      flatMap<M>(
        mapper: (value: T, key: number, iter: this) => Iterable<M>,
        context?: any
      ): Seq.Indexed<M>;

      /**
       * Returns a new Seq with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends T>(
        predicate: (value: T, index: number, iter: this) => value is F,
        context?: any
      ): Seq.Indexed<F>;
      filter(
        predicate: (value: T, index: number, iter: this) => any,
        context?: any
      ): this;

      /**
       * Returns a Seq "zipped" with the provided collections.
       *
       * Like `zipWith`, but using the default `zipper`: creating an `Array`.
       *
       * ```js
       * const a = Seq([ 1, 2, 3 ]);
       * const b = Seq([ 4, 5, 6 ]);
       * const c = a.zip(b); // Seq [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
       * ```
       */
      zip<U>(other: Collection<any, U>): Seq.Indexed<[T,U]>;
      zip<U,V>(other: Collection<any, U>, other2: Collection<any, V>): Seq.Indexed<[T,U,V]>;
      zip(...collections: Array<Collection<any, any>>): Seq.Indexed<any>;

      /**
       * Returns a Seq "zipped" with the provided collections.
       *
       * Unlike `zip`, `zipAll` continues zipping until the longest collection is
       * exhausted. Missing values from shorter collections are filled with `undefined`.
       *
       * ```js
       * const a = Seq([ 1, 2 ]);
       * const b = Seq([ 3, 4, 5 ]);
       * const c = a.zipAll(b); // Seq [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
       * ```
       */
      zipAll<U>(other: Collection<any, U>): Seq.Indexed<[T,U]>;
      zipAll<U,V>(other: Collection<any, U>, other2: Collection<any, V>): Seq.Indexed<[T,U,V]>;
      zipAll(...collections: Array<Collection<any, any>>): Seq.Indexed<any>;

      /**
       * Returns a Seq "zipped" with the provided collections by using a
       * custom `zipper` function.
       *
       * ```js
       * const a = Seq([ 1, 2, 3 ]);
       * const b = Seq([ 4, 5, 6 ]);
       * const c = a.zipWith((a, b) => a + b, b);
       * // Seq [ 5, 7, 9 ]
       * ```
       */
      zipWith<U, Z>(
        zipper: (value: T, otherValue: U) => Z,
        otherCollection: Collection<any, U>
      ): Seq.Indexed<Z>;
      zipWith<U, V, Z>(
        zipper: (value: T, otherValue: U, thirdValue: V) => Z,
        otherCollection: Collection<any, U>,
        thirdCollection: Collection<any, V>
      ): Seq.Indexed<Z>;
      zipWith<Z>(
        zipper: (...any: Array<any>) => Z,
        ...collections: Array<Collection<any, any>>
      ): Seq.Indexed<Z>;
    }


    /**
     * `Seq` which represents a set of values.
     *
     * Because `Seq` are often lazy, `Seq.Set` does not provide the same guarantee
     * of value uniqueness as the concrete `Set`.
     */
    export module Set {

      /**
       * Returns a Seq.Set of the provided values
       */
      function of<T>(...values: Array<T>): Seq.Set<T>;
    }

    /**
     * Always returns a Seq.Set, discarding associated indices or keys.
     *
     * Note: `Seq.Set` is a conversion function and not a class, and does not
     * use the `new` keyword during construction.
     */
    export function Set(): Seq.Set<any>;
    export function Set<T>(): Seq.Set<T>;
    export function Set<T>(collection: Iterable<T>): Seq.Set<T>;

    export interface Set<T> extends Seq<T, T>, Collection.Set<T> {
      /**
       * Deeply converts this Set Seq to equivalent native JavaScript Array.
       */
      toJS(): Array<any>;

      /**
       * Shallowly converts this Set Seq to equivalent native JavaScript Array.
       */
      toJSON(): Array<T>;

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<T>;

      /**
       * Returns itself
       */
      toSeq(): this

      /**
       * Returns a new Seq with other collections concatenated to this one.
       *
       * All entries will be present in the resulting Seq, even if they
       * are duplicates.
       */
      concat<U>(...collections: Array<Iterable<U>>): Seq.Set<T | U>;

      /**
       * Returns a new Seq.Set with values passed through a
       * `mapper` function.
       *
       * ```js
       * Seq.Set([ 1, 2 ]).map(x => 10 * x)
       * // Seq { 10, 20 }
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: T, key: T, iter: this) => M,
        context?: any
      ): Seq.Set<M>;

      /**
       * Flat-maps the Seq, returning a Seq of the same type.
       *
       * Similar to `seq.map(...).flatten(true)`.
       */
      flatMap<M>(
        mapper: (value: T, key: T, iter: this) => Iterable<M>,
        context?: any
      ): Seq.Set<M>;

      /**
       * Returns a new Seq with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends T>(
        predicate: (value: T, key: T, iter: this) => value is F,
        context?: any
      ): Seq.Set<F>;
      filter(
        predicate: (value: T, key: T, iter: this) => any,
        context?: any
      ): this;
    }

  }

  /**
   * Creates a Seq.
   *
   * Returns a particular kind of `Seq` based on the input.
   *
   *   * If a `Seq`, that same `Seq`.
   *   * If an `Collection`, a `Seq` of the same kind (Keyed, Indexed, or Set).
   *   * If an Array-like, an `Seq.Indexed`.
   *   * If an Iterable Object, an `Seq.Indexed`.
   *   * If an Object, a `Seq.Keyed`.
   *
   * Note: An Iterator itself will be treated as an object, becoming a `Seq.Keyed`,
   * which is usually not what you want. You should turn your Iterator Object into
   * an iterable object by defining a Symbol.iterator (or @@iterator) method which
   * returns `this`.
   *
   * Note: `Seq` is a conversion function and not a class, and does not use the
   * `new` keyword during construction.
   */
  declare function Seq<S extends Seq<any, any>>(seq: S): S;
  declare function Seq<K, V>(collection: Collection.Keyed<K, V>): Seq.Keyed<K, V>;
  declare function Seq<T>(collection: Collection.Indexed<T>): Seq.Indexed<T>;
  declare function Seq<T>(collection: Collection.Set<T>): Seq.Set<T>;
  declare function Seq<T>(collection: Iterable<T>): Seq.Indexed<T>;
  declare function Seq<V>(obj: {[key: string]: V}): Seq.Keyed<string, V>;
  declare function Seq(): Seq<any, any>;

  interface Seq<K, V> extends Collection<K, V> {

    /**
     * Some Seqs can describe their size lazily. When this is the case,
     * size will be an integer. Otherwise it will be undefined.
     *
     * For example, Seqs returned from `map()` or `reverse()`
     * preserve the size of the original `Seq` while `filter()` does not.
     *
     * Note: `Range`, `Repeat` and `Seq`s made from `Array`s and `Object`s will
     * always have a size.
     */
    readonly size: number | undefined;


    // Force evaluation

    /**
     * Because Sequences are lazy and designed to be chained together, they do
     * not cache their results. For example, this map function is called a total
     * of 6 times, as each `join` iterates the Seq of three values.
     *
     *     var squares = Seq([ 1, 2, 3 ]).map(x => x * x)
     *     squares.join() + squares.join()
     *
     * If you know a `Seq` will be used multiple times, it may be more
     * efficient to first cache it in memory. Here, the map function is called
     * only 3 times.
     *
     *     var squares = Seq([ 1, 2, 3 ]).map(x => x * x).cacheResult()
     *     squares.join() + squares.join()
     *
     * Use this method judiciously, as it must fully evaluate a Seq which can be
     * a burden on memory and possibly performance.
     *
     * Note: after calling `cacheResult`, a Seq will always have a `size`.
     */
    cacheResult(): this;

    // Sequence algorithms

    /**
     * Returns a new Seq with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Seq } = require('immutable')
     * Seq([ 1, 2 ]).map(x => 10 * x)
     * // Seq [ 10, 20 ]
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): Seq<K, M>;

    /**
     * Returns a new Seq with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Seq } = require('immutable')
     * Seq([ 1, 2 ]).map(x => 10 * x)
     * // Seq [ 10, 20 ]
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     * Note: used only for sets.
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): Seq<M, M>;

    /**
     * Flat-maps the Seq, returning a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: V, key: K, iter: this) => Iterable<M>,
      context?: any
    ): Seq<K, M>;

    /**
     * Flat-maps the Seq, returning a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     * Note: Used only for sets.
     */
    flatMap<M>(
      mapper: (value: V, key: K, iter: this) => Iterable<M>,
      context?: any
    ): Seq<M, M>;

    /**
     * Returns a new Seq with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
      predicate: (value: V, key: K, iter: this) => value is F,
      context?: any
    ): Seq<K, F>;
    filter(
      predicate: (value: V, key: K, iter: this) => any,
      context?: any
    ): this;
  }

  /**
   * The `Collection` is a set of (key, value) entries which can be iterated, and
   * is the base class for all collections in `immutable`, allowing them to
   * make use of all the Collection methods (such as `map` and `filter`).
   *
   * Note: A collection is always iterated in the same order, however that order
   * may not always be well defined, as is the case for the `Map` and `Set`.
   *
   * Collection is the abstract base class for concrete data structures. It
   * cannot be constructed directly.
   *
   * Implementations should extend one of the subclasses, `Collection.Keyed`,
   * `Collection.Indexed`, or `Collection.Set`.
   */
  declare module Collection {

    /**
     * @deprecated use `const { isKeyed } = require('immutable')`
     */
    function isKeyed(maybeKeyed: any): maybeKeyed is Collection.Keyed<any, any>;

    /**
     * @deprecated use `const { isIndexed } = require('immutable')`
     */
    function isIndexed(maybeIndexed: any): maybeIndexed is Collection.Indexed<any>;

    /**
     * @deprecated use `const { isAssociative } = require('immutable')`
     */
    function isAssociative(maybeAssociative: any): maybeAssociative is Collection.Keyed<any, any> | Collection.Indexed<any>;

    /**
     * @deprecated use `const { isOrdered } = require('immutable')`
     */
    function isOrdered(maybeOrdered: any): boolean;


    /**
     * Keyed Collections have discrete keys tied to each value.
     *
     * When iterating `Collection.Keyed`, each iteration will yield a `[K, V]`
     * tuple, in other words, `Collection#entries` is the default iterator for
     * Keyed Collections.
     */
    export module Keyed {}

    /**
     * Creates a Collection.Keyed
     *
     * Similar to `Collection()`, however it expects collection-likes of [K, V]
     * tuples if not constructed from a Collection.Keyed or JS Object.
     *
     * Note: `Collection.Keyed` is a conversion function and not a class, and
     * does not use the `new` keyword during construction.
     */
    export function Keyed<K, V>(collection: Iterable<[K, V]>): Collection.Keyed<K, V>;
    export function Keyed<V>(obj: {[key: string]: V}): Collection.Keyed<string, V>;

    export interface Keyed<K, V> extends Collection<K, V> {
      /**
       * Deeply converts this Keyed collection to equivalent native JavaScript Object.
       *
       * Converts keys to Strings.
       */
      toJS(): Object;

      /**
       * Shallowly converts this Keyed collection to equivalent native JavaScript Object.
       *
       * Converts keys to Strings.
       */
      toJSON(): { [key: string]: V };

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<[K, V]>;

      /**
       * Returns Seq.Keyed.
       * @override
       */
      toSeq(): Seq.Keyed<K, V>;


      // Sequence functions

      /**
       * Returns a new Collection.Keyed of the same type where the keys and values
       * have been flipped.
       *
       * <!-- runkit:activate -->
       * ```js
       * const { Map } = require('immutable')
       * Map({ a: 'z', b: 'y' }).flip()
       * // Map { "z": "a", "y": "b" }
       * ```
       */
      flip(): Collection.Keyed<V, K>;

      /**
       * Returns a new Collection with other collections concatenated to this one.
       */
      concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Collection.Keyed<K | KC, V | VC>;
      concat<C>(...collections: Array<{[key: string]: C}>): Collection.Keyed<K | string, V | C>;

      /**
       * Returns a new Collection.Keyed with values passed through a
       * `mapper` function.
       *
       * ```js
       * const { Collection } = require('immutable')
       * Collection.Keyed({ a: 1, b: 2 }).map(x => 10 * x)
       * // Seq { "a": 10, "b": 20 }
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: V, key: K, iter: this) => M,
        context?: any
      ): Collection.Keyed<K, M>;

      /**
       * Returns a new Collection.Keyed of the same type with keys passed through
       * a `mapper` function.
       *
       * <!-- runkit:activate -->
       * ```js
       * const { Map } = require('immutable')
       * Map({ a: 1, b: 2 }).mapKeys(x => x.toUpperCase())
       * // Map { "A": 1, "B": 2 }
       * ```
       *
       * Note: `mapKeys()` always returns a new instance, even if it produced
       * the same key at every step.
       */
      mapKeys<M>(
        mapper: (key: K, value: V, iter: this) => M,
        context?: any
      ): Collection.Keyed<M, V>;

      /**
       * Returns a new Collection.Keyed of the same type with entries
       * ([key, value] tuples) passed through a `mapper` function.
       *
       * <!-- runkit:activate -->
       * ```js
       * const { Map } = require('immutable')
       * Map({ a: 1, b: 2 })
       *   .mapEntries(([ k, v ]) => [ k.toUpperCase(), v * 2 ])
       * // Map { "A": 2, "B": 4 }
       * ```
       *
       * Note: `mapEntries()` always returns a new instance, even if it produced
       * the same entry at every step.
       */
      mapEntries<KM, VM>(
        mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
        context?: any
      ): Collection.Keyed<KM, VM>;

      /**
       * Flat-maps the Collection, returning a Collection of the same type.
       *
       * Similar to `collection.map(...).flatten(true)`.
       */
      flatMap<KM, VM>(
        mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
        context?: any
      ): Collection.Keyed<KM, VM>;

      /**
       * Returns a new Collection with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends V>(
        predicate: (value: V, key: K, iter: this) => value is F,
        context?: any
      ): Collection.Keyed<K, F>;
      filter(
        predicate: (value: V, key: K, iter: this) => any,
        context?: any
      ): this;

      [Symbol.iterator](): IterableIterator<[K, V]>;
    }


    /**
     * Indexed Collections have incrementing numeric keys. They exhibit
     * slightly different behavior than `Collection.Keyed` for some methods in order
     * to better mirror the behavior of JavaScript's `Array`, and add methods
     * which do not make sense on non-indexed Collections such as `indexOf`.
     *
     * Unlike JavaScript arrays, `Collection.Indexed`s are always dense. "Unset"
     * indices and `undefined` indices are indistinguishable, and all indices from
     * 0 to `size` are visited when iterated.
     *
     * All Collection.Indexed methods return re-indexed Collections. In other words,
     * indices always start at 0 and increment until size. If you wish to
     * preserve indices, using them as keys, convert to a Collection.Keyed by
     * calling `toKeyedSeq`.
     */
    export module Indexed {}

    /**
     * Creates a new Collection.Indexed.
     *
     * Note: `Collection.Indexed` is a conversion function and not a class, and
     * does not use the `new` keyword during construction.
     */
    export function Indexed<T>(collection: Iterable<T>): Collection.Indexed<T>;

    export interface Indexed<T> extends Collection<number, T> {
      /**
       * Deeply converts this Indexed collection to equivalent native JavaScript Array.
       */
      toJS(): Array<any>;

      /**
       * Shallowly converts this Indexed collection to equivalent native JavaScript Array.
       */
      toJSON(): Array<T>;

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<T>;

      // Reading values

      /**
       * Returns the value associated with the provided index, or notSetValue if
       * the index is beyond the bounds of the Collection.
       *
       * `index` may be a negative number, which indexes back from the end of the
       * Collection. `s.get(-1)` gets the last item in the Collection.
       */
      get<NSV>(index: number, notSetValue: NSV): T | NSV;
      get(index: number): T | undefined;


      // Conversion to Seq

      /**
       * Returns Seq.Indexed.
       * @override
       */
      toSeq(): Seq.Indexed<T>;

      /**
       * If this is a collection of [key, value] entry tuples, it will return a
       * Seq.Keyed of those entries.
       */
      fromEntrySeq(): Seq.Keyed<any, any>;


      // Combination

      /**
       * Returns a Collection of the same type with `separator` between each item
       * in this Collection.
       */
      interpose(separator: T): this;

      /**
       * Returns a Collection of the same type with the provided `collections`
       * interleaved into this collection.
       *
       * The resulting Collection includes the first item from each, then the
       * second from each, etc.
       *
       * <!-- runkit:activate
       *      { "preamble": "require('immutable')"}
       * -->
       * ```js
       * const { List } = require('immutable')
       * List([ 1, 2, 3 ]).interleave(List([ 'A', 'B', 'C' ]))
       * // List [ 1, "A", 2, "B", 3, "C"" ]
       * ```
       *
       * The shortest Collection stops interleave.
       *
       * <!-- runkit:activate
       *      { "preamble": "const { List } = require('immutable')" }
       * -->
       * ```js
       * List([ 1, 2, 3 ]).interleave(
       *   List([ 'A', 'B' ]),
       *   List([ 'X', 'Y', 'Z' ])
       * )
       * // List [ 1, "A", "X", 2, "B", "Y"" ]
       * ```
       *
       * Since `interleave()` re-indexes values, it produces a complete copy,
       * which has `O(N)` complexity.
       *
       * Note: `interleave` *cannot* be used in `withMutations`.
       */
      interleave(...collections: Array<Collection<any, T>>): this;

      /**
       * Splice returns a new indexed Collection by replacing a region of this
       * Collection with new values. If values are not provided, it only skips the
       * region to be removed.
       *
       * `index` may be a negative number, which indexes back from the end of the
       * Collection. `s.splice(-2)` splices after the second to last item.
       *
       * <!-- runkit:activate -->
       * ```js
       * const { List } = require('immutable')
       * List([ 'a', 'b', 'c', 'd' ]).splice(1, 2, 'q', 'r', 's')
       * // List [ "a", "q", "r", "s", "d" ]
       * ```
       *
       * Since `splice()` re-indexes values, it produces a complete copy, which
       * has `O(N)` complexity.
       *
       * Note: `splice` *cannot* be used in `withMutations`.
       */
      splice(
        index: number,
        removeNum: number,
        ...values: Array<T>
      ): this;

      /**
       * Returns a Collection of the same type "zipped" with the provided
       * collections.
       *
       * Like `zipWith`, but using the default `zipper`: creating an `Array`.
       *
       *
       * <!-- runkit:activate
       *      { "preamble": "const { List } = require('immutable')" }
       * -->
       * ```js
       * const a = List([ 1, 2, 3 ]);
       * const b = List([ 4, 5, 6 ]);
       * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
       * ```
       */
      zip<U>(other: Collection<any, U>): Collection.Indexed<[T,U]>;
      zip<U,V>(other: Collection<any, U>, other2: Collection<any, V>): Collection.Indexed<[T,U,V]>;
      zip(...collections: Array<Collection<any, any>>): Collection.Indexed<any>;

      /**
       * Returns a Collection "zipped" with the provided collections.
       *
       * Unlike `zip`, `zipAll` continues zipping until the longest collection is
       * exhausted. Missing values from shorter collections are filled with `undefined`.
       *
       * ```js
       * const a = List([ 1, 2 ]);
       * const b = List([ 3, 4, 5 ]);
       * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
       * ```
       */
      zipAll<U>(other: Collection<any, U>): Collection.Indexed<[T,U]>;
      zipAll<U,V>(other: Collection<any, U>, other2: Collection<any, V>): Collection.Indexed<[T,U,V]>;
      zipAll(...collections: Array<Collection<any, any>>): Collection.Indexed<any>;

      /**
       * Returns a Collection of the same type "zipped" with the provided
       * collections by using a custom `zipper` function.
       *
       * <!-- runkit:activate
       *      { "preamble": "const { List } = require('immutable')" }
       * -->
       * ```js
       * const a = List([ 1, 2, 3 ]);
       * const b = List([ 4, 5, 6 ]);
       * const c = a.zipWith((a, b) => a + b, b);
       * // List [ 5, 7, 9 ]
       * ```
       */
      zipWith<U, Z>(
        zipper: (value: T, otherValue: U) => Z,
        otherCollection: Collection<any, U>
      ): Collection.Indexed<Z>;
      zipWith<U, V, Z>(
        zipper: (value: T, otherValue: U, thirdValue: V) => Z,
        otherCollection: Collection<any, U>,
        thirdCollection: Collection<any, V>
      ): Collection.Indexed<Z>;
      zipWith<Z>(
        zipper: (...any: Array<any>) => Z,
        ...collections: Array<Collection<any, any>>
      ): Collection.Indexed<Z>;


      // Search for value

      /**
       * Returns the first index at which a given value can be found in the
       * Collection, or -1 if it is not present.
       */
      indexOf(searchValue: T): number;

      /**
       * Returns the last index at which a given value can be found in the
       * Collection, or -1 if it is not present.
       */
      lastIndexOf(searchValue: T): number;

      /**
       * Returns the first index in the Collection where a value satisfies the
       * provided predicate function. Otherwise -1 is returned.
       */
      findIndex(
        predicate: (value: T, index: number, iter: this) => boolean,
        context?: any
      ): number;

      /**
       * Returns the last index in the Collection where a value satisfies the
       * provided predicate function. Otherwise -1 is returned.
       */
      findLastIndex(
        predicate: (value: T, index: number, iter: this) => boolean,
        context?: any
      ): number;

      // Sequence algorithms

      /**
       * Returns a new Collection with other collections concatenated to this one.
       */
      concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Collection.Indexed<T | C>;

      /**
       * Returns a new Collection.Indexed with values passed through a
       * `mapper` function.
       *
       * ```js
       * const { Collection } = require('immutable')
       * Collection.Indexed([1,2]).map(x => 10 * x)
       * // Seq [ 1, 2 ]
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: T, key: number, iter: this) => M,
        context?: any
      ): Collection.Indexed<M>;

      /**
       * Flat-maps the Collection, returning a Collection of the same type.
       *
       * Similar to `collection.map(...).flatten(true)`.
       */
      flatMap<M>(
        mapper: (value: T, key: number, iter: this) => Iterable<M>,
        context?: any
      ): Collection.Indexed<M>;

      /**
       * Returns a new Collection with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends T>(
        predicate: (value: T, index: number, iter: this) => value is F,
        context?: any
      ): Collection.Indexed<F>;
      filter(
        predicate: (value: T, index: number, iter: this) => any,
        context?: any
      ): this;

      [Symbol.iterator](): IterableIterator<T>;
    }


    /**
     * Set Collections only represent values. They have no associated keys or
     * indices. Duplicate values are possible in the lazy `Seq.Set`s, however
     * the concrete `Set` Collection does not allow duplicate values.
     *
     * Collection methods on Collection.Set such as `map` and `forEach` will provide
     * the value as both the first and second arguments to the provided function.
     *
     * ```js
     * const { Collection } = require('immutable')
     * const seq = Collection.Set([ 'A', 'B', 'C' ])
     * // Seq { "A", "B", "C" }
     * seq.forEach((v, k) =>
     *  assert.equal(v, k)
     * )
     * ```
     */
    export module Set {}

    /**
     * Similar to `Collection()`, but always returns a Collection.Set.
     *
     * Note: `Collection.Set` is a factory function and not a class, and does
     * not use the `new` keyword during construction.
     */
    export function Set<T>(collection: Iterable<T>): Collection.Set<T>;

    export interface Set<T> extends Collection<T, T> {
      /**
       * Deeply converts this Set collection to equivalent native JavaScript Array.
       */
      toJS(): Array<any>;

      /**
       * Shallowly converts this Set collection to equivalent native JavaScript Array.
       */
      toJSON(): Array<T>;

      /**
       * Shallowly converts this collection to an Array.
       */
      toArray(): Array<T>;

      /**
       * Returns Seq.Set.
       * @override
       */
      toSeq(): Seq.Set<T>;

      // Sequence algorithms

      /**
       * Returns a new Collection with other collections concatenated to this one.
       */
      concat<U>(...collections: Array<Iterable<U>>): Collection.Set<T | U>;

      /**
       * Returns a new Collection.Set with values passed through a
       * `mapper` function.
       *
       * ```
       * Collection.Set([ 1, 2 ]).map(x => 10 * x)
       * // Seq { 1, 2 }
       * ```
       *
       * Note: `map()` always returns a new instance, even if it produced the
       * same value at every step.
       */
      map<M>(
        mapper: (value: T, key: T, iter: this) => M,
        context?: any
      ): Collection.Set<M>;

      /**
       * Flat-maps the Collection, returning a Collection of the same type.
       *
       * Similar to `collection.map(...).flatten(true)`.
       */
      flatMap<M>(
        mapper: (value: T, key: T, iter: this) => Iterable<M>,
        context?: any
      ): Collection.Set<M>;

      /**
       * Returns a new Collection with only the values for which the `predicate`
       * function returns true.
       *
       * Note: `filter()` always returns a new instance, even if it results in
       * not filtering out any values.
       */
      filter<F extends T>(
        predicate: (value: T, key: T, iter: this) => value is F,
        context?: any
      ): Collection.Set<F>;
      filter(
        predicate: (value: T, key: T, iter: this) => any,
        context?: any
      ): this;

      [Symbol.iterator](): IterableIterator<T>;
    }

  }

  /**
   * Creates a Collection.
   *
   * The type of Collection created is based on the input.
   *
   *   * If an `Collection`, that same `Collection`.
   *   * If an Array-like, an `Collection.Indexed`.
   *   * If an Object with an Iterator defined, an `Collection.Indexed`.
   *   * If an Object, an `Collection.Keyed`.
   *
   * This methods forces the conversion of Objects and Strings to Collections.
   * If you want to ensure that a Collection of one item is returned, use
   * `Seq.of`.
   *
   * Note: An Iterator itself will be treated as an object, becoming a `Seq.Keyed`,
   * which is usually not what you want. You should turn your Iterator Object into
   * an iterable object by defining a Symbol.iterator (or @@iterator) method which
   * returns `this`.
   *
   * Note: `Collection` is a conversion function and not a class, and does not
   * use the `new` keyword during construction.
   */
  declare function Collection<I extends Collection<any, any>>(collection: I): I;
  declare function Collection<T>(collection: Iterable<T>): Collection.Indexed<T>;
  declare function Collection<V>(obj: {[key: string]: V}): Collection.Keyed<string, V>;

  interface Collection<K, V> extends ValueObject {

    // Value equality

    /**
     * True if this and the other Collection have value equality, as defined
     * by `Immutable.is()`.
     *
     * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
     * allow for chained expressions.
     */
    equals(other: any): boolean;

    /**
     * Computes and returns the hashed identity for this Collection.
     *
     * The `hashCode` of a Collection is used to determine potential equality,
     * and is used when adding this to a `Set` or as a key in a `Map`, enabling
     * lookup via a different instance.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { Set,  List } = require('immutable')" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 1, 2, 3 ]);
     * assert.notStrictEqual(a, b); // different instances
     * const set = Set([ a ]);
     * assert.equal(set.has(b), true);
     * ```
     *
     * If two values have the same `hashCode`, they are [not guaranteed
     * to be equal][Hash Collision]. If two values have different `hashCode`s,
     * they must not be equal.
     *
     * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
     */
    hashCode(): number;


    // Reading values

    /**
     * Returns the value associated with the provided key, or notSetValue if
     * the Collection does not contain this key.
     *
     * Note: it is possible a key may be associated with an `undefined` value,
     * so if `notSetValue` is not provided and this method returns `undefined`,
     * that does not guarantee the key was not found.
     */
    get<NSV>(key: K, notSetValue: NSV): V | NSV;
    get(key: K): V | undefined;

    /**
     * True if a key exists within this `Collection`, using `Immutable.is`
     * to determine equality
     */
    has(key: K): boolean;

    /**
     * True if a value exists within this `Collection`, using `Immutable.is`
     * to determine equality
     * @alias contains
     */
    includes(value: V): boolean;
    contains(value: V): boolean;

    /**
     * In case the `Collection` is not empty returns the first element of the
     * `Collection`.
     * In case the `Collection` is empty returns the optional default
     * value if provided, if no default value is provided returns undefined.
     */
    first<NSV>(notSetValue?: NSV): V | NSV;

    /**
     * In case the `Collection` is not empty returns the last element of the
     * `Collection`.
     * In case the `Collection` is empty returns the optional default
     * value if provided, if no default value is provided returns undefined.
     */
    last<NSV>(notSetValue?: NSV): V | NSV;

    // Reading deep values

    /**
     * Returns the value found by following a path of keys or indices through
     * nested Collections.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map, List } = require('immutable')
     * const deepData = Map({ x: List([ Map({ y: 123 }) ]) });
     * deepData.getIn(['x', 0, 'y']) // 123
     * ```
     *
     * Plain JavaScript Object or Arrays may be nested within an Immutable.js
     * Collection, and getIn() can access those values as well:
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map, List } = require('immutable')
     * const deepData = Map({ x: [ { y: 123 } ] });
     * deepData.getIn(['x', 0, 'y']) // 123
     * ```
     */
    getIn(searchKeyPath: Iterable<any>, notSetValue?: any): any;

    /**
     * True if the result of following a path of keys or indices through nested
     * Collections results in a set value.
     */
    hasIn(searchKeyPath: Iterable<any>): boolean;

    // Persistent changes

    /**
     * This can be very useful as a way to "chain" a normal function into a
     * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
     *
     * For example, to sum a Seq after mapping and filtering:
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Seq } = require('immutable')
     *
     * function sum(collection) {
     *   return collection.reduce((sum, x) => sum + x, 0)
     * }
     *
     * Seq([ 1, 2, 3 ])
     *   .map(x => x + 1)
     *   .filter(x => x % 2 === 0)
     *   .update(sum)
     * // 6
     * ```
     */
    update<R>(updater: (value: this) => R): R;


    // Conversion to JavaScript types

    /**
     * Deeply converts this Collection to equivalent native JavaScript Array or Object.
     *
     * `Collection.Indexed`, and `Collection.Set` become `Array`, while
     * `Collection.Keyed` become `Object`, converting keys to Strings.
     */
    toJS(): Array<any> | { [key: string]: any };

    /**
     * Shallowly converts this Collection to equivalent native JavaScript Array or Object.
     *
     * `Collection.Indexed`, and `Collection.Set` become `Array`, while
     * `Collection.Keyed` become `Object`, converting keys to Strings.
     */
    toJSON(): Array<V> | { [key: string]: V };

    /**
     * Shallowly converts this collection to an Array.
     *
     * `Collection.Indexed`, and `Collection.Set` produce an Array of values.
     * `Collection.Keyed` produce an Array of [key, value] tuples.
     */
    toArray(): Array<V> | Array<[K, V]>;

    /**
     * Shallowly converts this Collection to an Object.
     *
     * Converts keys to Strings.
     */
    toObject(): { [key: string]: V };


    // Conversion to Collections

    /**
     * Converts this Collection to a Map, Throws if keys are not hashable.
     *
     * Note: This is equivalent to `Map(this.toKeyedSeq())`, but provided
     * for convenience and to allow for chained expressions.
     */
    toMap(): Map<K, V>;

    /**
     * Converts this Collection to a Map, maintaining the order of iteration.
     *
     * Note: This is equivalent to `OrderedMap(this.toKeyedSeq())`, but
     * provided for convenience and to allow for chained expressions.
     */
    toOrderedMap(): OrderedMap<K, V>;

    /**
     * Converts this Collection to a Set, discarding keys. Throws if values
     * are not hashable.
     *
     * Note: This is equivalent to `Set(this)`, but provided to allow for
     * chained expressions.
     */
    toSet(): Set$1<V>;

    /**
     * Converts this Collection to a Set, maintaining the order of iteration and
     * discarding keys.
     *
     * Note: This is equivalent to `OrderedSet(this.valueSeq())`, but provided
     * for convenience and to allow for chained expressions.
     */
    toOrderedSet(): OrderedSet<V>;

    /**
     * Converts this Collection to a List, discarding keys.
     *
     * This is similar to `List(collection)`, but provided to allow for chained
     * expressions. However, when called on `Map` or other keyed collections,
     * `collection.toList()` discards the keys and creates a list of only the
     * values, whereas `List(collection)` creates a list of entry tuples.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map, List } = require('immutable')
     * var myMap = Map({ a: 'Apple', b: 'Banana' })
     * List(myMap) // List [ [ "a", "Apple" ], [ "b", "Banana" ] ]
     * myMap.toList() // List [ "Apple", "Banana" ]
     * ```
     */
    toList(): List<V>;

    /**
     * Converts this Collection to a Stack, discarding keys. Throws if values
     * are not hashable.
     *
     * Note: This is equivalent to `Stack(this)`, but provided to allow for
     * chained expressions.
     */
    toStack(): Stack<V>;


    // Conversion to Seq

    /**
     * Converts this Collection to a Seq of the same kind (indexed,
     * keyed, or set).
     */
    toSeq(): Seq<K, V>;

    /**
     * Returns a Seq.Keyed from this Collection where indices are treated as keys.
     *
     * This is useful if you want to operate on an
     * Collection.Indexed and preserve the [index, value] pairs.
     *
     * The returned Seq will have identical iteration order as
     * this Collection.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Seq } = require('immutable')
     * const indexedSeq = Seq([ 'A', 'B', 'C' ])
     * // Seq [ "A", "B", "C" ]
     * indexedSeq.filter(v => v === 'B')
     * // Seq [ "B" ]
     * const keyedSeq = indexedSeq.toKeyedSeq()
     * // Seq { 0: "A", 1: "B", 2: "C" }
     * keyedSeq.filter(v => v === 'B')
     * // Seq { 1: "B" }
     * ```
     */
    toKeyedSeq(): Seq.Keyed<K, V>;

    /**
     * Returns an Seq.Indexed of the values of this Collection, discarding keys.
     */
    toIndexedSeq(): Seq.Indexed<V>;

    /**
     * Returns a Seq.Set of the values of this Collection, discarding keys.
     */
    toSetSeq(): Seq.Set<V>;


    // Iterators

    /**
     * An iterator of this `Collection`'s keys.
     *
     * Note: this will return an ES6 iterator which does not support
     * Immutable.js sequence algorithms. Use `keySeq` instead, if this is
     * what you want.
     */
    keys(): IterableIterator<K>;

    /**
     * An iterator of this `Collection`'s values.
     *
     * Note: this will return an ES6 iterator which does not support
     * Immutable.js sequence algorithms. Use `valueSeq` instead, if this is
     * what you want.
     */
    values(): IterableIterator<V>;

    /**
     * An iterator of this `Collection`'s entries as `[ key, value ]` tuples.
     *
     * Note: this will return an ES6 iterator which does not support
     * Immutable.js sequence algorithms. Use `entrySeq` instead, if this is
     * what you want.
     */
    entries(): IterableIterator<[K, V]>;


    // Collections (Seq)

    /**
     * Returns a new Seq.Indexed of the keys of this Collection,
     * discarding values.
     */
    keySeq(): Seq.Indexed<K>;

    /**
     * Returns an Seq.Indexed of the values of this Collection, discarding keys.
     */
    valueSeq(): Seq.Indexed<V>;

    /**
     * Returns a new Seq.Indexed of [key, value] tuples.
     */
    entrySeq(): Seq.Indexed<[K, V]>;


    // Sequence algorithms

    /**
     * Returns a new Collection of the same type with values passed through a
     * `mapper` function.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Collection } = require('immutable')
     * Collection({ a: 1, b: 2 }).map(x => 10 * x)
     * // Seq { "a": 10, "b": 20 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the same
     * value at every step.
     */
    map<M>(
      mapper: (value: V, key: K, iter: this) => M,
      context?: any
    ): Collection<K, M>;

    /**
     * Note: used only for sets, which return Collection<M, M> but are otherwise
     * identical to normal `map()`.
     *
     * @ignore
     */
    map<M>(...args: never[]): any;

    /**
     * Returns a new Collection of the same type with only the entries for which
     * the `predicate` function returns true.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 1, b: 2, c: 3, d: 4}).filter(x => x % 2 === 0)
     * // Map { "b": 2, "d": 4 }
     * ```
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
      predicate: (value: V, key: K, iter: this) => value is F,
      context?: any
    ): Collection<K, F>;
    filter(
      predicate: (value: V, key: K, iter: this) => any,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type with only the entries for which
     * the `predicate` function returns false.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 1, b: 2, c: 3, d: 4}).filterNot(x => x % 2 === 0)
     * // Map { "a": 1, "c": 3 }
     * ```
     *
     * Note: `filterNot()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filterNot(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type in reverse order.
     */
    reverse(): this;

    /**
     * Returns a new Collection of the same type which includes the same entries,
     * stably sorted by using a `comparator`.
     *
     * If a `comparator` is not provided, a default comparator uses `<` and `>`.
     *
     * `comparator(valueA, valueB)`:
     *
     *   * Returns `0` if the elements should not be swapped.
     *   * Returns `-1` (or any negative number) if `valueA` comes before `valueB`
     *   * Returns `1` (or any positive number) if `valueA` comes after `valueB`
     *   * Is pure, i.e. it must always return the same value for the same pair
     *     of values.
     *
     * When sorting collections which have no defined order, their ordered
     * equivalents will be returned. e.g. `map.sort()` returns OrderedMap.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ "c": 3, "a": 1, "b": 2 }).sort((a, b) => {
     *   if (a < b) { return -1; }
     *   if (a > b) { return 1; }
     *   if (a === b) { return 0; }
     * });
     * // OrderedMap { "a": 1, "b": 2, "c": 3 }
     * ```
     *
     * Note: `sort()` Always returns a new instance, even if the original was
     * already sorted.
     *
     * Note: This is always an eager operation.
     */
    sort(comparator?: (valueA: V, valueB: V) => number): this;

    /**
     * Like `sort`, but also accepts a `comparatorValueMapper` which allows for
     * sorting by more sophisticated means:
     *
     *     hitters.sortBy(hitter => hitter.avgHits)
     *
     * Note: `sortBy()` Always returns a new instance, even if the original was
     * already sorted.
     *
     * Note: This is always an eager operation.
     */
    sortBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): this;

    /**
     * Returns a `Collection.Keyed` of `Collection.Keyeds`, grouped by the return
     * value of the `grouper` function.
     *
     * Note: This is always an eager operation.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List, Map } = require('immutable')
     * const listOfMaps = List([
     *   Map({ v: 0 }),
     *   Map({ v: 1 }),
     *   Map({ v: 1 }),
     *   Map({ v: 0 }),
     *   Map({ v: 2 })
     * ])
     * const groupsOfMaps = listOfMaps.groupBy(x => x.get('v'))
     * // Map {
     * //   0: List [ Map{ "v": 0 }, Map { "v": 0 } ],
     * //   1: List [ Map{ "v": 1 }, Map { "v": 1 } ],
     * //   2: List [ Map{ "v": 2 } ],
     * // }
     * ```
     */
    groupBy<G>(
      grouper: (value: V, key: K, iter: this) => G,
      context?: any
    ): /*Map*/Seq.Keyed<G, /*this*/Collection<K, V>>;


    // Side effects

    /**
     * The `sideEffect` is executed for every entry in the Collection.
     *
     * Unlike `Array#forEach`, if any call of `sideEffect` returns
     * `false`, the iteration will stop. Returns the number of entries iterated
     * (including the last iteration which returned false).
     */
    forEach(
      sideEffect: (value: V, key: K, iter: this) => any,
      context?: any
    ): number;


    // Creating subsets

    /**
     * Returns a new Collection of the same type representing a portion of this
     * Collection from start up to but not including end.
     *
     * If begin is negative, it is offset from the end of the Collection. e.g.
     * `slice(-2)` returns a Collection of the last two entries. If it is not
     * provided the new Collection will begin at the beginning of this Collection.
     *
     * If end is negative, it is offset from the end of the Collection. e.g.
     * `slice(0, -1)` returns a Collection of everything but the last entry. If
     * it is not provided, the new Collection will continue through the end of
     * this Collection.
     *
     * If the requested slice is equivalent to the current Collection, then it
     * will return itself.
     */
    slice(begin?: number, end?: number): this;

    /**
     * Returns a new Collection of the same type containing all entries except
     * the first.
     */
    rest(): this;

    /**
     * Returns a new Collection of the same type containing all entries except
     * the last.
     */
    butLast(): this;

    /**
     * Returns a new Collection of the same type which excludes the first `amount`
     * entries from this Collection.
     */
    skip(amount: number): this;

    /**
     * Returns a new Collection of the same type which excludes the last `amount`
     * entries from this Collection.
     */
    skipLast(amount: number): this;

    /**
     * Returns a new Collection of the same type which includes entries starting
     * from when `predicate` first returns false.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
     *   .skipWhile(x => x.match(/g/))
     * // List [ "cat", "hat", "god"" ]
     * ```
     */
    skipWhile(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type which includes entries starting
     * from when `predicate` first returns true.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
     *   .skipUntil(x => x.match(/hat/))
     * // List [ "hat", "god"" ]
     * ```
     */
    skipUntil(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type which includes the first `amount`
     * entries from this Collection.
     */
    take(amount: number): this;

    /**
     * Returns a new Collection of the same type which includes the last `amount`
     * entries from this Collection.
     */
    takeLast(amount: number): this;

    /**
     * Returns a new Collection of the same type which includes entries from this
     * Collection as long as the `predicate` returns true.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
     *   .takeWhile(x => x.match(/o/))
     * // List [ "dog", "frog" ]
     * ```
     */
    takeWhile(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;

    /**
     * Returns a new Collection of the same type which includes entries from this
     * Collection as long as the `predicate` returns false.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
     *   .takeUntil(x => x.match(/at/))
     * // List [ "dog", "frog" ]
     * ```
     */
    takeUntil(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): this;


    // Combination

    /**
     * Returns a new Collection of the same type with other values and
     * collection-like concatenated to this one.
     *
     * For Seqs, all entries will be present in the resulting Seq, even if they
     * have the same key.
     */
    concat(...valuesOrCollections: Array<any>): Collection<any, any>;

    /**
     * Flattens nested Collections.
     *
     * Will deeply flatten the Collection by default, returning a Collection of the
     * same type, but a `depth` can be provided in the form of a number or
     * boolean (where true means to shallowly flatten one level). A depth of 0
     * (or shallow: false) will deeply flatten.
     *
     * Flattens only others Collection, not Arrays or Objects.
     *
     * Note: `flatten(true)` operates on Collection<any, Collection<K, V>> and
     * returns Collection<K, V>
     */
    flatten(depth?: number): Collection<any, any>;
    flatten(shallow?: boolean): Collection<any, any>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     */
    flatMap<M>(
      mapper: (value: V, key: K, iter: this) => Iterable<M>,
      context?: any
    ): Collection<K, M>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     * Used for Dictionaries only.
     */
    flatMap<KM, VM>(
      mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
      context?: any
    ): Collection<KM, VM>;

    // Reducing a value

    /**
     * Reduces the Collection to a value by calling the `reducer` for every entry
     * in the Collection and passing along the reduced value.
     *
     * If `initialReduction` is not provided, the first item in the
     * Collection will be used.
     *
     * @see `Array#reduce`.
     */
    reduce<R>(
      reducer: (reduction: R, value: V, key: K, iter: this) => R,
      initialReduction: R,
      context?: any
    ): R;
    reduce<R>(
      reducer: (reduction: V | R, value: V, key: K, iter: this) => R
    ): R;

    /**
     * Reduces the Collection in reverse (from the right side).
     *
     * Note: Similar to this.reverse().reduce(), and provided for parity
     * with `Array#reduceRight`.
     */
    reduceRight<R>(
      reducer: (reduction: R, value: V, key: K, iter: this) => R,
      initialReduction: R,
      context?: any
    ): R;
    reduceRight<R>(
      reducer: (reduction: V | R, value: V, key: K, iter: this) => R
    ): R;

    /**
     * True if `predicate` returns true for all entries in the Collection.
     */
    every(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): boolean;

    /**
     * True if `predicate` returns true for any entry in the Collection.
     */
    some(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): boolean;

    /**
     * Joins values together as a string, inserting a separator between each.
     * The default separator is `","`.
     */
    join(separator?: string): string;

    /**
     * Returns true if this Collection includes no values.
     *
     * For some lazy `Seq`, `isEmpty` might need to iterate to determine
     * emptiness. At most one iteration will occur.
     */
    isEmpty(): boolean;

    /**
     * Returns the size of this Collection.
     *
     * Regardless of if this Collection can describe its size lazily (some Seqs
     * cannot), this method will always return the correct size. E.g. it
     * evaluates a lazy `Seq` if necessary.
     *
     * If `predicate` is provided, then this returns the count of entries in the
     * Collection for which the `predicate` returns true.
     */
    count(): number;
    count(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): number;

    /**
     * Returns a `Seq.Keyed` of counts, grouped by the return value of
     * the `grouper` function.
     *
     * Note: This is not a lazy operation.
     */
    countBy<G>(
      grouper: (value: V, key: K, iter: this) => G,
      context?: any
    ): Map<G, number>;


    // Search for value

    /**
     * Returns the first value for which the `predicate` returns true.
     */
    find(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any,
      notSetValue?: V
    ): V | undefined;

    /**
     * Returns the last value for which the `predicate` returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLast(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any,
      notSetValue?: V
    ): V | undefined;

    /**
     * Returns the first [key, value] entry for which the `predicate` returns true.
     */
    findEntry(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any,
      notSetValue?: V
    ): [K, V] | undefined;

    /**
     * Returns the last [key, value] entry for which the `predicate`
     * returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLastEntry(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any,
      notSetValue?: V
    ): [K, V] | undefined;

    /**
     * Returns the key for which the `predicate` returns true.
     */
    findKey(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): K | undefined;

    /**
     * Returns the last key for which the `predicate` returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLastKey(
      predicate: (value: V, key: K, iter: this) => boolean,
      context?: any
    ): K | undefined;

    /**
     * Returns the key associated with the search value, or undefined.
     */
    keyOf(searchValue: V): K | undefined;

    /**
     * Returns the last key associated with the search value, or undefined.
     */
    lastKeyOf(searchValue: V): K | undefined;

    /**
     * Returns the maximum value in this collection. If any values are
     * comparatively equivalent, the first one found will be returned.
     *
     * The `comparator` is used in the same way as `Collection#sort`. If it is not
     * provided, the default comparator is `>`.
     *
     * When two values are considered equivalent, the first encountered will be
     * returned. Otherwise, `max` will operate independent of the order of input
     * as long as the comparator is commutative. The default comparator `>` is
     * commutative *only* when types do not differ.
     *
     * If `comparator` returns 0 and either value is NaN, undefined, or null,
     * that value will be returned.
     */
    max(comparator?: (valueA: V, valueB: V) => number): V | undefined;

    /**
     * Like `max`, but also accepts a `comparatorValueMapper` which allows for
     * comparing by more sophisticated means:
     *
     *     hitters.maxBy(hitter => hitter.avgHits);
     *
     */
    maxBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): V | undefined;

    /**
     * Returns the minimum value in this collection. If any values are
     * comparatively equivalent, the first one found will be returned.
     *
     * The `comparator` is used in the same way as `Collection#sort`. If it is not
     * provided, the default comparator is `<`.
     *
     * When two values are considered equivalent, the first encountered will be
     * returned. Otherwise, `min` will operate independent of the order of input
     * as long as the comparator is commutative. The default comparator `<` is
     * commutative *only* when types do not differ.
     *
     * If `comparator` returns 0 and either value is NaN, undefined, or null,
     * that value will be returned.
     */
    min(comparator?: (valueA: V, valueB: V) => number): V | undefined;

    /**
     * Like `min`, but also accepts a `comparatorValueMapper` which allows for
     * comparing by more sophisticated means:
     *
     *     hitters.minBy(hitter => hitter.avgHits);
     *
     */
    minBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): V | undefined;


    // Comparison

    /**
     * True if `iter` includes every value in this Collection.
     */
    isSubset(iter: Iterable<V>): boolean;

    /**
     * True if this Collection includes every value in `iter`.
     */
    isSuperset(iter: Iterable<V>): boolean;
  }

  /**
   * The interface to fulfill to qualify as a Value Object.
   */
  interface ValueObject {
    /**
     * True if this and the other Collection have value equality, as defined
     * by `Immutable.is()`.
     *
     * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
     * allow for chained expressions.
     */
    equals(other: any): boolean;

    /**
     * Computes and returns the hashed identity for this Collection.
     *
     * The `hashCode` of a Collection is used to determine potential equality,
     * and is used when adding this to a `Set` or as a key in a `Map`, enabling
     * lookup via a different instance.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List, Set } = require('immutable');
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 1, 2, 3 ]);
     * assert.notStrictEqual(a, b); // different instances
     * const set = Set([ a ]);
     * assert.equal(set.has(b), true);
     * ```
     *
     * Note: hashCode() MUST return a Uint32 number. The easiest way to
     * guarantee this is to return `myHash | 0` from a custom implementation.
     *
     * If two values have the same `hashCode`, they are [not guaranteed
     * to be equal][Hash Collision]. If two values have different `hashCode`s,
     * they must not be equal.
     *
     * Note: `hashCode()` is not guaranteed to always be called before
     * `equals()`. Most but not all Immutable.js collections use hash codes to
     * organize their internal data structures, while all Immutable.js
     * collections use equality during lookups.
     *
     * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
     */
    hashCode(): number;
  }

type IFunction<T = void> = (...args: Array<any>) => T;
type IObject = Record<string, any>;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
type Class<T> = new (...args: Array<any>) => T;

declare const TransformationMatrix_base: Record$1.Factory<{
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}>;
declare class TransformationMatrix extends TransformationMatrix_base {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    static defaultValues: IObject;
    static IDENTITY: TransformationMatrix;
    translate({ x: tx, y: ty }: {
        x: number;
        y: number;
    }): TransformationMatrix;
    translateX(tx: number): TransformationMatrix;
    translateY(ty: number): TransformationMatrix;
    scale(sx: number, sy?: number): TransformationMatrix;
    transform(a2: number, b2: number, c2: number, d2: number, e2: number, f2: number): TransformationMatrix;
    rotate(degCW: number): TransformationMatrix;
    rotateRad(a: number): TransformationMatrix;
    inverse(): TransformationMatrix;
    toCssValue(): string;
    applyToPoint([x, y]: [number, number]): [number, number];
    applyToVector([x, y]: [number, number]): [number, number];
}

interface PointCtorProps {
    x?: number;
    y?: number;
    [k: string]: unknown;
}
declare const Point_base: Record$1.Factory<PointCtorProps>;
/**
 * @classdesc
 * A point describes a 2D vector in space consisting of an `x` and `y` coordinate.
 * Provided values are defined in same units used by the page, point units. Point units are only
 * equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `point.set("x", 20)`.
 * @example <caption>Create and update a point</caption>
 * const point = new PSPDFKit.Geometry.Point({ x: 20, y: 30 });
 * point = point.set("y", 20);
 * point.y; // => 20
 * @public
 * @memberof PSPDFKit.Geometry
 * @summary A 2D vector that describes a point in space.
 * @class Point
 * @param {object} args An object used to initialize the Point. If `x` or `y` is omitted, `0` will
 *        be used instead.
 * @default { x: 0, y: 0 }
 * @extends Immutable.Record
 */
declare class Point extends Point_base {
    x: number;
    y: number;
    static defaultValues: IObject;
    constructor(options?: PointCtorProps);
    scale(sx: number, sy?: number): this;
    translate({ x: tx, y: ty }: {
        x: number;
        y: number;
    }): this;
    translateX(tx: number): this;
    translateY(ty: number): this;
    distance(other: this): number;
    rotate(deg: number): this;
    apply(matrix: TransformationMatrix): this;
}

interface IDrawingPoint extends PointCtorProps {
    intensity?: number;
}
/**
 * @classdesc
 * An extension of the {@link PSPDFKit.Geometry.Point} that can also store an `intensity` value.
 * This is used for example inside an ink annotation, where the intensity is the pressure that was
 * exerted by the touch device.
 * @example <caption>Create and update a point</caption>
 * const point = new PSPDFKit.Geometry.DrawingPoint({
 *   x: 20,
 *   y: 30,
 *   intensity: 0.3
 * });
 * point.intensity; // => 0.3
 * @public
 * @memberof PSPDFKit.Geometry
 * @summary A 3D vector that describes a point in space and an intensity value.
 * @class DrawingPoint
 * @param {object} args An object used to initialize the Point. If `x` or `y` is omitted, `0` will
 *        be used instead. If `intensity` is omitted, `0.5` will be used (the neutral intensity
 *        value).
 * @default { x: 0, y: 0, intensity: 0.5 }
 * @extends PSPDFKit.Geometry.Point
 */
declare class DrawingPoint extends Point {
    intensity: number;
    static defaultValues: IObject;
    constructor(options?: IDrawingPoint);
}

interface ISize {
    width: number;
    height: number;
}
declare const Size_base: Record$1.Factory<ISize>;
/**
 * @classdesc
 * A size is a 2D vector that describes the size of an element. It has the values `width` and
 * `height`. Provided values are defined in same units used by the page, point units. Point units are
 * only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `size.set("width", 20)`.
 * @example <caption>Create and update a size</caption>
 * const size = new PSPDFKit.Geometry.Size({ width: 200, height: 100 });
 * size = size.set("height", 200);
 * size.height; // => 200
 * @public
 * @memberof PSPDFKit.Geometry
 * @summary A 2D vector that describes the size of an element.
 * @class Size
 * @param {object} args An object used to initialize the size. If `width` or `height` is omitted,
 *        `0` will be used instead.
 * @default { width: 0, height: 0 }
 * @extends Immutable.Record
 */
declare class Size extends Size_base {
    scale(factor: number): Size;
    ceil(): Size;
    floor(): Size;
    swapDimensions(): Size;
    apply(matrix: TransformationMatrix): Size;
}

interface IRect {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
}
declare const Rect_base: Record$1.Factory<IRect>;
/**
 * @classdesc
 * A rect describes a rectangle in 2D space. It consists of a location (`left` and `top`) and
 * dimensions (`width` and `height`). Provided values are defined in same units used by the page,
 * point units. Point units are only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `rect.set("left", 20)`.
 * @example <caption>Create and update a rect</caption>
 * const rect = new PSPDFKit.Geometry.Rect({
 *   left: 10,
 *   top: 20,
 *   width: 30,
 *   height: 40
 * });
 * rect = rect.set("left", 20);
 * rect.left; // => 20
 * @public
 * @memberof PSPDFKit.Geometry
 * @summary A rectangle in 2D space.
 * @class Rect
 * @param {object} args An object used to initialize the Point. If `left`, `top`, `width` or `height`
 *        is omitted, `0` will be used instead.
 * @default { left: 0, top: 0, width: 0, height: 0 }
 * @extends Immutable.Record
 */
declare class Rect extends Rect_base {
    left: number;
    top: number;
    width: number;
    height: number;
    static defaultValues: IObject;
    constructor(options?: IRect);
    get right(): number;
    get bottom(): number;
    static fromClientRect({ top, left, width, height }: ClientRect): Rect;
    static union(rects: List<Rect>): Rect;
    static getCenteredRect(inner: Size, outer: Size): Rect;
    static fromInset(inset: Inset): Rect;
    static fromPoints(...points: Point[]): Rect;
    expandToIncludePoints(...points: Point[]): Rect;
    static areRectsCloserThan(a: Rect, b: Rect, distance: number): boolean;
    static areVerticallyAligned(a: Rect, b: Rect, thresholdDistance: number): boolean;
    translate({ x: tx, y: ty }: Point): Rect;
    translateX(tx: number): Rect;
    translateY(ty: number): Rect;
    scale(sx: number, sy?: number): Rect;
    grow(growth: number): Rect;
    getLocation(): Point;
    getSize(): Size;
    getCenter(): Point;
    setLocation(location: Point): Rect;
    roundOverlap(): Rect;
    round(): Rect;
    isPointInside(point: Point): boolean;
    isRectInside(other: Rect): boolean;
    isRectOverlapping(other: Rect): boolean;
    normalize(): Rect;
    apply(matrix: TransformationMatrix): Rect;
}

interface IInset {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
declare const Inset_base: Record$1.Factory<IInset>;
/**
 * @classdesc
 * An inset describes a rectangle by enumerating the distance from each side to the corresponding
 * side of a reference rectangle. Therefore it does not hold coordinates, nor dimensions, only
 * relative values for `left`, `top`, `right` and `bottom`. Provided values are defined in same units
 * used by the page, point units. Point units are only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `inset.set("right", 15)`.
 * @example <caption>Create and update an inset</caption>
 * const inset = new PSPDFKit.Geometry.Inset({
 *   left: 5,
 *   top: 15,
 *   right: 10,
 *   bottom: 5
 * });
 * inset = inset.set("bottom", 7);
 * rect.bottom; // => 7
 * @public
 * @memberof PSPDFKit.Geometry
 * @summary A relative rectangle inset in 2D space.
 * @class Inset
 * @param {object} args An object used to initialize the Point. If `left`, `top`, `right` or `bottom`
 *        is omitted, `0` will be used instead.
 * @default { left: 0, top: 0, right: 0, bottom: 0 }
 * @extends Immutable.Record
 */
declare class Inset extends Inset_base {
    static applyToRect(inset: Inset, rect: Rect): Rect;
    static fromRect(rect: Rect): Inset;
    static fromValue(insetValue: number): Inset;
    apply(matrix: TransformationMatrix): Inset;
    setScale(scale: number): Inset;
}
type InsetJSON = [left: number, top: number, right: number, bottom: number];

/**
 * @classdesc
 * Base action type from which all Actions inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record}.
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Base action type from which all Actions inherit.
 * @class Action
 * @noconstructor
 * @extends Immutable.Record
 */
/**
 *
 * Actions can be chained by adding them to this immutable List.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Immutable.List.<Action>} subActions
 * @memberof PSPDFKit.Actions.Action
 */
type ActionCtorProps = {
    subActions?: List<Action> | null;
};
declare abstract class Action extends InheritableImmutableRecord<ActionCtorProps> {
    subActions?: List<Action> | null | undefined;
    protected constructor(args?: ActionCtorProps);
}

type ActionTriggerEventType = 'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onPointerUp' | 'onPageOpen' | 'onPageClose' | 'onPageVisible' | 'onPageHidden';

/**
 * @classdesc
 * PDF action to go to a destination (page) in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("pageIndex", 2);`.
 *
 * A GoToAction can define a different `pageIndex` in the same document. When clicking on it, we
 * will update the scroll position to make the page visible. We will not update the zoom level in
 * that case.
 * @example <caption>Create a new GoToAction</caption>
 * const action = new PSPDFKit.Actions.GoToAction({ pageIndex: 10 });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Go to a destination (page) in the current document.
 * @class GoToAction
 * @param {object} args An object with the `pageIndex` key used to initialize the action.
 * @extends PSPDFKit.Actions.Action
 */
interface IGoToAction extends ActionCtorProps {
    pageIndex?: number;
}
declare class GoToAction extends Action {
    pageIndex: number;
    static defaultValues: IObject;
    constructor(args?: IGoToAction);
}

/**
 * @classdesc
 * PDF action to go to an embedded file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example:
 * `action.set("relativePath", "/other_document.pdf");`.
 * @example <caption>Create a new GoToEmbeddedAction</caption>
 * const action = new PSPDFKit.Actions.GoToEmbeddedAction({
 *   relativePath: "/other_document.pdf"
 * });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Go to an embedded file.
 * @class GoToEmbeddedAction
 * @param {object} args
 * @extends PSPDFKit.Actions.Action
 */
interface IGoToEmbeddedAction extends ActionCtorProps {
    newWindow?: boolean;
    relativePath?: string;
    targetType?: 'parent' | 'child';
}
declare class GoToEmbeddedAction extends Action {
    newWindow: boolean;
    relativePath: string;
    targetType: 'parent' | 'child';
    static defaultValues: IObject;
    constructor(args?: IGoToEmbeddedAction);
}

/**
 * @classdesc
 * PDF action to go to a different (remote) file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example:
 * `action.set("relativePath", "/other_document.pdf");`.
 * @example <caption>Create a new GoToRemoteAction</caption>
 * const action = new PSPDFKit.Actions.GoToRemoteAction({
 *   relativePath: "/other_document.pdf"
 * });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Go to a different (remote) file.
 * @class GoToRemoteAction
 * @param {object} args
 * @extends PSPDFKit.Actions.Action
 */
interface IGoToRemoteAction extends ActionCtorProps {
    relativePath?: string;
    namedDestination?: string;
}
declare class GoToRemoteAction extends Action {
    relativePath: string;
    namedDestination: string;
    static defaultValues: IObject;
    constructor(args?: IGoToRemoteAction);
}

type AnnotationReference = {
    fieldName: string;
} | {
    pdfObjectId: number;
};
/**
 * @classdesc
 * PDF action to hide an annotation or form field.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("hide", true);`.
 *
 * When clicking on an annotation with a `HideAction`, the annotations specified in its
 * `annotationReferences` property will be hidden.
 * @example <caption>Create a new HideAction</caption>
 * const action = new PSPDFKit.Actions.HideAction({ hide: true });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Hide an annotation or form field.
 * @class HideAction
 * @param {object} args
 * @extends PSPDFKit.Actions.Action
 */
interface IHideAction extends ActionCtorProps {
    hide?: boolean;
    annotationReferences?: List<AnnotationReference>;
}
declare class HideAction extends Action {
    hide: boolean;
    annotationReferences: List<AnnotationReference>;
    static defaultValues: IObject;
    constructor(args?: IHideAction);
}

/**
 * @classdesc
 * PDF action to run arbitrary JavaScript.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("script", "alert(...)");`.
 * @example <caption>Create a new JavaScriptAction</caption>
 * const action = new PSPDFKit.Actions.JavaScriptAction({
 *   script: "alert(...)"
 * });
 * @example <caption>Create a button to import a image using a JavaScriptAction</caption>
 * const widget = new PSPDFKit.Annotations.WidgetAnnotation({
 *   id: PSPDFKit.generateInstantId(),
 *   pageIndex: 0,
 *   formFieldName: "buttonIcon",
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 100,
 *     top: 200,
 *     width: 100,
 *     height: 100
 *   }),
 *   action: new PSPDFKit.Actions.JavaScriptAction({
 *     script: "event.target.buttonImportIcon()"
 *   }),
 *   borderWidth: 0
 * });
 * const formField = new PSPDFKit.FormFields.ButtonFormField({
 *   name: "buttonIcon",
 *   annotationIds: PSPDFKit.Immutable.List([widget.id])
 * });
 * await instance.create([widget, formField]);
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Run arbitrary JavaScript.
 * @class JavaScriptAction
 * @param {object} args
 * @extends PSPDFKit.Actions.Action
 */
interface IJavaScriptAction extends ActionCtorProps {
    script?: string;
}
declare class JavaScriptAction extends Action {
    script: string;
    static defaultValues: IObject;
    constructor(args?: IJavaScriptAction);
}

/**
 * @classdesc
 * PDF action to launch a file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("filePath", 2);`.
 * @example <caption>Create a new LaunchAction</caption>
 * const action = new PSPDFKit.Actions.LaunchAction({ filePath: "./some/file.mp4" });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Launch a file.
 * @class LaunchAction
 * @param {object} args
 * @extends PSPDFKit.Actions.Action
 */
interface ILaunchAction extends ActionCtorProps {
    filePath?: string;
}
declare class LaunchAction extends Action {
    filePath: string;
    static defaultValues: IObject;
    constructor(args?: ILaunchAction);
}

/**
 * @classdesc
 * PDF action to trigger a named action. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("action", "nextPage");`.
 * @example <caption>Create a new NamedAction</caption>
 * var action = new PSPDFKit.Actions.NamedAction({ action: "nextPage" });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Trigger a named action.
 * @class NamedAction
 * @param {object} args
 * @extends PSPDFKit.Actions.Action
 */
interface INamedAction extends ActionCtorProps {
    action?: string;
}
declare class NamedAction extends Action {
    action: string;
    static defaultValues: IObject;
    constructor(args?: INamedAction);
}

/**
 * @classdesc
 * PDF action to reset form fields in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("includeExclude", false);`.
 *
 * A ResetFormAction defines which form fields should be reset, when clicked on it. By default all
 * form fields will be reset to their default value. The `includeExclude` field defines if the
 * fields specified by `fields`, which are a {@link PSPDFKit.Immutable.List} of form field names,
 * should reset all form fields excluding the defined fields or just the defined fields. When
 * `includeExclude` is set to `true`, all form fields except the fields defined in `fields` will be
 * reset. If `includeExclude` is set to false, which is the default value for this field, only the
 * form fields defined in `fields` will be reset.
 * @example <caption>Create a new ResetFormAction</caption>
 * const action = new PSPDFKit.Actions.ResetFormAction({
 *   fields: List(["exampleField"])
 * });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Reset form fields in the current document.
 * @class ResetFormAction
 * @param {object} args An object with the keys `fields` and `includeExclude` used to initialize the action.
 * @extends PSPDFKit.Actions.Action
 */
interface IResetFormAction extends ActionCtorProps {
    fields?: List<string> | null | undefined;
    includeExclude?: boolean;
}
declare class ResetFormAction extends Action {
    fields: List<string> | null | undefined;
    includeExclude: boolean;
    static defaultValues: IObject;
    constructor(args?: IResetFormAction);
}

/**
 * @classdesc
 * PDF action to submit form fields in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("uri", "https://pspdfkit.com");`.
 *
 * A SubmitFormAction defines which form fields should be submitted, when clicked on it. The form
 * field names and their values will get submitted to the provided URI defined by the `uri`
 * field. By default all form fields will be submitted. The `includeExclude` field defines if the
 * fields specified by `fields`, which are a {@link PSPDFKit.Immutable.List} of form field names,
 * should submit all form fields excluding the defined fields or just the defined fields. When
 * `includeExclude` is set to `true`, all form fields except the fields defined in `fields` will be
 * submitted. If `includeExclude` is set to false, which is the default value for this field, only
 * the form fields defined in `fields` will be submitted.
 * @example <caption>Create a new SubmitFormAction</caption>
 * const action = new PSPDFKit.Actions.SubmitFormAction({
 *   uri: "https://pspdfkit.com"
 * });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Submit form field names and values of the current document.
 * @class SubmitFormAction
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Actions.Action
 */
interface ISubmitFormAction extends ActionCtorProps {
    uri?: string;
    fields?: List<string>;
    includeExclude?: boolean;
    includeNoValueFields?: boolean;
    exportFormat?: boolean;
    getMethod?: boolean;
    submitCoordinated?: boolean;
    xfdf?: boolean;
    includeAppendSaves?: boolean;
    includeAnnotations?: boolean;
    submitPDF?: boolean;
    canonicalFormat?: boolean;
    excludeNonUserAnnotations?: boolean;
    excludeFKey?: boolean;
    embedForm?: boolean;
}
declare class SubmitFormAction extends Action {
    uri: string;
    fields: List<string> | null | undefined;
    includeExclude: boolean;
    includeNoValueFields: boolean;
    exportFormat: boolean;
    getMethod: boolean;
    submitCoordinated: boolean;
    xfdf: boolean;
    includeAppendSaves: boolean;
    includeAnnotations: boolean;
    submitPDF: boolean;
    canonicalFormat: boolean;
    excludeNonUserAnnotations: boolean;
    excludeFKey: boolean;
    embedForm: boolean;
    static defaultValues: IObject;
    constructor(args?: ISubmitFormAction);
}

/**
 * @classdesc
 * PDF action resolve a uniform resource identifier (web link).
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("uri", "https://pspdfkit.com");`.
 *
 * A URI action contains an URI. When executing this annotation, we use `window.open` to create a
 * new browser tab. We also clear the opener as a security measurement to avoid the target page to
 * have access to your PDF state.
 *
 * ```js
 * const newWindow = window.open(action.uri, "_blank");
 * newWindow.opener = null;
 * ```
 *
 * Learn more about the security problems when using `_blank` in [this article from JitBit](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/).
 *
 * Please refer to the individual browser documentations for a lists of supported URI protocols. The
 * most used protocols (`http`, `https` and `mailto`) are supported in all [supported browsers](https://pspdfkit.com/guides/web/current/pspdfkit-for-web/browser-support/).
 * @example <caption>Create a new URIAction</caption>
 * const action = new PSPDFKit.Actions.URIAction({ uri: "https://pspdfkit.com" });
 * @public
 * @memberof PSPDFKit.Actions
 * @summary Resolve a uniform resource identifier (web link).
 * @class URIAction
 * @param {object} args An object with the `uri` key used to initialize the action.
 * @extends PSPDFKit.Actions.Action
 */
interface IURIAction extends ActionCtorProps {
    uri?: string;
}
declare class URIAction extends Action {
    uri: string;
    static defaultValues: IObject;
    constructor(args?: IURIAction);
}

declare const Color_base: Record$1.Factory<{
    r: number;
    g: number;
    b: number;
    transparent: boolean;
}>;
/**
 * @classdesc
 * Color objects are used in annotations for defining colors. We're using an rgb representation
 * internally with the `r`, `g`, `b` values clipped between `0` and `255` inclusive, and a `transparent`
 * flag that can be used to indicate that the color is transparent, in which case the provided `r`, `g`,
 * and `b` values are ignored and set to `0` in the instantiated `Color`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `color.set("r", 255)`.
 *
 * However, in order to obtain a transparent color the static `TRANSPARENT` value should be used instead.
 *
 * The difference between using `Color.TRANSPARENT` and `null` as values for annotation color properties
 * may depend on the context; if the annotation is being created or updated:
 * - If an annotation with a non-transparent color value is updated to have a color value of `Color.TRANSPARENT`,
 * the color value will be updated and be transparent.
 * - But if that same annotation is updated to have a color value of `null`, the color change will not be saved
 * to the document, although it may appear as transparent in the viewer.
 *
 * To avoid inconsistencies, it is recommended to always use `Color.TRANSPARENT` instead of `null` when updating
 * annotations.
 * @example <caption>Create and update a color</caption>
 * var color = new PSPDFKit.Color({ r: 245, g: 0, b: 0 });
 * color = color.set("r", 255);
 * color.r; // => 255
 * @public
 * @memberof PSPDFKit
 * @summary A simple RGB color value.
 * @class Color
 * @param {object} args An object used to initialize the color. If `r`, `g` or `b` is omitted, `0`
 *        will be used instead.
 * @default { r: 0, g: 0, b: 0, transparent: false }
 * @extends Immutable.Record
 */
declare class Color extends Color_base {
    static BLACK: Color;
    static GREY: Color;
    static WHITE: Color;
    static DARK_BLUE: Color;
    static RED: Color;
    static PURPLE: Color;
    static PINK: Color;
    static GREEN: Color;
    static ORANGE: Color;
    static YELLOW: Color;
    static LIGHT_BLUE: Color;
    static LIGHT_RED: Color;
    static LIGHT_GREEN: Color;
    static LIGHT_YELLOW: Color;
    static BLUE: Color;
    static LIGHT_ORANGE: Color;
    static LIGHT_GREY: Color;
    static DARK_GREY: Color;
    static MAUVE: Color;
    static TRANSPARENT: Color;
    static fromHex: (hexColor: string) => Color;
    constructor(args: {
        r?: number;
        g?: number;
        b?: number;
        transparent?: boolean;
    });
    lighter(percent: number): Color;
    darker(percent: number): Color;
    equals(color: Color | {
        r: number;
        g: number;
        b: number;
        transparent: boolean;
    }): boolean;
    /**
     * Modifies the saturation of the Color and returns a new one.
     *
     * @example
     * const color = PSPDFKit.Color.RED.saturate(50);
     * @public
     * @instance
     * @function saturate
     * @memberof PSPDFKit.Color
     * @param {number} percent The percentage of saturation between 0 and 100.
     * @returns {Color} A Color with the new values.
     */
    saturate(percent: number): Color;
    sRGBToRGBComponent(RGBComponent: number): number;
    relativeLuminance(): number;
    contrastRatio(color: Color): number;
    toCSSValue(): string;
    toHex(): string;
}

/**
 * Represents one of the available blend modes for highlight and ink annotations.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.BlendMode} normal
 * @property {PSPDFKit.BlendMode} multiply
 * @property {PSPDFKit.BlendMode} screen
 * @property {PSPDFKit.BlendMode} overlay
 * @property {PSPDFKit.BlendMode} darken
 * @property {PSPDFKit.BlendMode} lighten
 * @property {PSPDFKit.BlendMode} colorDodge
 * @property {PSPDFKit.BlendMode} colorBurn
 * @property {PSPDFKit.BlendMode} hardLight
 * @property {PSPDFKit.BlendMode} softLight
 * @property {PSPDFKit.BlendMode} difference
 * @property {PSPDFKit.BlendMode} exclusion
 */
declare const BlendMode: {
    readonly normal: "normal";
    readonly multiply: "multiply";
    readonly screen: "screen";
    readonly overlay: "overlay";
    readonly darken: "darken";
    readonly lighten: "lighten";
    readonly colorDodge: "colorDodge";
    readonly colorBurn: "colorBurn";
    readonly hardLight: "hardLight";
    readonly softLight: "softLight";
    readonly difference: "difference";
    readonly exclusion: "exclusion";
};
type IBlendMode = (typeof BlendMode)[keyof typeof BlendMode];

interface ITextMarkupAnnotation extends AnnotationProperties {
    rects: List<Rect>;
    color: Color;
    blendMode: IBlendMode;
}
/**
 * @classdesc
 * Base annotation type from which all markup annotations inherit. You can not directly instantiate
 * from this type.
 *
 * A markup annotation in the UI will be created from the positions of the currently selected text
 * but will be persisted with a list of rectangles as per PDF spec.
 *
 * The `boundingBox` should be set to the {@link PSPDFKit.Geometry.Rect.union union} of all `rects`.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 *
 * For interacting with a markup annotation, please look at the subtypes:
 *
 * - {@link PSPDFKit.Annotations.HighlightAnnotation}
 * - {@link PSPDFKit.Annotations.SquiggleAnnotation}
 * - {@link PSPDFKit.Annotations.StrikeOutAnnotation}
 * - {@link PSPDFKit.Annotations.UnderlineAnnotation}
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Base annotation type for all markup annotations.
 * @class MarkupAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 * @seealso PSPDFKit.Instance#getMarkupAnnotationText
 * @seealso PSPDFKit.Configuration#disableTextSelection
 */
/**
 * The blend mode defines how the color of the annotation will be applied to its background.
 *
 * @public
 * @instance
 * @member {PSPDFKit.BlendMode} blendMode
 * @memberof PSPDFKit.Annotations.TextMarkupAnnotation
 * @default "normal"
 */
/**
 * A list of rects where the annotation is drawn. This is necessary to display a markup annotation
 * on multiple lines.
 *
 * The `boundingBox` should be set to the {@link PSPDFKit.Geometry.Rect.union union} of this list.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Immutable.List.<PSPDFKit.Geometry.Rect>} rects
 * @memberof PSPDFKit.Annotations.MarkupAnnotation
 * @default PSPDFKit.Immutable.List() Empty list
 */
/**
 * A {@link PSPDFKit.Color} for the markup.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Color} color
 * @memberof PSPDFKit.Annotations.MarkupAnnotation
 * @default Color.BLACK
 */
declare class TextMarkupAnnotation<T extends ITextMarkupAnnotation = ITextMarkupAnnotation> extends Annotation<T> {
    rects: List<Rect>;
    color: Color;
    blendMode: IBlendMode;
    static defaultValues: IObject;
    static readableName: string;
}

interface IHighlightAnnotation extends ITextMarkupAnnotation {
    color: Color;
    blendMode: IBlendMode | 'multiply';
}
/**
 * @classdesc
 * A highlight markup annotation. Please refer to {@link PSPDFKit.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a highlight annotation</caption>
 * var rects = PSPDFKit.Immutable.List([
 *   new PSPDFKit.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new PSPDFKit.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * var annotation = new PSPDFKit.Annotations.HighlightAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: PSPDFKit.Geometry.Rect.union(rects)
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Highlight markup annotation.
 * @class HighlightAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.MarkupAnnotation
 */
/**
 * The blend mode defines how the color of the annotation will be applied to its background.
 *
 * @public
 * @member {PSPDFKit.BlendMode} blendMode
 * @memberof PSPDFKit.Annotations.HighlightAnnotation
 * @instance
 * @default "multiply"
 * @override
 */
/**
 * The color of the highlight annotation.
 *
 * @public
 * @member {PSPDFKit.Color} color
 * @memberof PSPDFKit.Annotations.HighlightAnnotation
 * @instance
 * @default Color.LIGHT_YELLOW
 * @override
 */
declare class HighlightAnnotation<T extends IHighlightAnnotation = IHighlightAnnotation> extends TextMarkupAnnotation<T> {
    blendMode: IBlendMode;
    static className: string;
    static readableName: string;
    static defaultValues: IObject;
}

interface IImageAnnotation extends AnnotationProperties {
    description: string | null;
    fileName: string | null;
    contentType: string | null;
    imageAttachmentId: string | null;
    isSignature: boolean;
    xfdfAppearanceStream: string | null;
    xfdfAppearanceStreamOriginalPageRotation: number | null;
}
/**
 * @classdesc
 * Image annotations are images that are added to a PDF document.
 *
 * It is also possible to import the first page of a PDF by setting the
 * appropriate
 * [`contentType`]{@link PSPDFKit.Annotations.ImageAnnotation#contentType},
 * however the imported PDF won't include the annotations unless they are flattened in
 * advance.
 * @example <caption>Create an image annotation</caption>
 * const request = await fetch("https://example.com/image.jpg");
 * const blob = await request.blob();
 * const imageAttachmentId = await instance.createAttachment(blob);
 * const annotation = new PSPDFKit.Annotations.ImageAnnotation({
 *   pageIndex: 0,
 *   contentType: "image/jpeg",
 *   imageAttachmentId,
 *   description: "Example Image Annotation",
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 10,
 *     top: 20,
 *     width: 150,
 *     height: 150,
 *   }),
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display an image annotation, which represent an images in a PDF file.
 * @class ImageAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 * @seealso PSPDFKit.Instance#createAttachment PSPDFKit.Instance#getAttachment
 */
/**
 * A description of the image content.
 *
 * @public
 * @instance
 * @member {?string} description
 * @memberof PSPDFKit.Annotations.ImageAnnotation
 */
/**
 * The file name of the attached file.
 *
 * @public
 * @instance
 * @member {?string} fileName
 * @memberof PSPDFKit.Annotations.ImageAnnotation
 */
/**
 * The content type of the connected attachment binary data.
 *
 * We currently support:
 *   - `image/jpeg`
 *   - `image/png`
 *   - `application/pdf`
 *
 * @public
 * @instance
 * @member {string} contentType
 * @memberof PSPDFKit.Annotations.ImageAnnotation
 */
/**
 * The attachment identifier of the image. It holds the image data as binary.
 *
 * @public
 * @instance
 * @member {string} imageAttachmentId
 * @memberof PSPDFKit.Annotations.ImageAnnotation
 */
/**
 * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
 * annotation with a rotation value of `0` will make it appear in the same direction as the UI
 * appears, when no {@link PSPDFKit.ViewState#pagesRotation} is set.
 *
 * Can either be 0°, 90°, 180°, or 270°. Multiple or negative values are normalized to this
 * interval.
 *
 * @public
 * @instance
 * @member {number} rotation
 * @memberof PSPDFKit.Annotations.ImageAnnotation
 * @default 0
 */
/**
 * When an image annotation is created via the signature UI, this flag is set to true.
 *
 * @public
 * @instance
 * @member {boolean} isSignature
 * @memberof PSPDFKit.Annotations.ImageAnnotation
 * @default false
 */
declare class ImageAnnotation<T extends IImageAnnotation = IImageAnnotation> extends Annotation<T> {
    description: null | string;
    fileName: null | string;
    contentType: string;
    imageAttachmentId: string;
    isSignature: boolean;
    xfdfAppearanceStream: null | string;
    xfdfAppearanceStreamOriginalPageRotation: null | number;
    static defaultValues: IObject;
    static readableName: string;
}

interface IInkAnnotation extends AnnotationProperties {
    lines: List<List<DrawingPoint>>;
    lineWidth: number | null;
    strokeColor: Color | null;
    backgroundColor: Color | null;
    isDrawnNaturally: boolean;
    isSignature: boolean;
}
/**
 * @classdesc
 * Ink annotations are used for free hand drawings on a page. They can contain multiple segments
 * (see the definition of `lines` below). Points within the same segment are connected to a line.
 *
 * Ink annotations are only selectable around their visible lines. This means that you can create a
 * page full of line annotations while annotations behind the ink annotation are still selectable.
 *
 * Right now, ink annotations are implemented using SVG images. This behavior is object to change.
 *
 * <center>
 *   <img title="Example of an ink annotation" src="img/annotations/ink_annotation.png" width="350" class="shadow">
 * </center>
 * @example <caption>Create an ink annotation that displays a cross</caption>
 * const annotation = new PSPDFKit.Annotations.InkAnnotation({
 *   pageIndex: 0,
 *   lines: PSPDFKit.Immutable.List([
 *     PSPDFKit.Immutable.List([
 *       new PSPDFKit.Geometry.DrawingPoint({ x: 5,  y: 5 }),
 *       new PSPDFKit.Geometry.DrawingPoint({ x: 95, y: 95}),
 *     ]),
 *     PSPDFKit.Immutable.List([
 *       new PSPDFKit.Geometry.DrawingPoint({ x: 95, y: 5 }),
 *       new PSPDFKit.Geometry.DrawingPoint({ x: 5,  y: 95}),
 *     ])
 *   ]),
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 0,
 *     top: 0,
 *     width: 100,
 *     height: 100,
 *   }),
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display free hand drawings on a page.
 * @class InkAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 * @seealso PSPDFKit.Instance#getInkSignatures PSPDFKit.Instance#setInkSignatures
 * @seealso PSPDFKit.Configuration#populateInkSignatures
 * @seealso PSPDFKit.Instance~InkSignatureCreateEvent PSPDFKit.Instance~InkSignatureChangeEvent
 * @seealso PSPDFKit.Instance~InkSignatureUpdateEvent PSPDFKit.Instance~InkSignatureDeleteEvent
 */
/**
 * A list of line segments. Every segment consists again of a list of points with additional
 * intensity information.
 *
 * The two nested lists are required since one ink annotation can consist of multiple lines.
 * Within one segment, points will be connected using lines or curves.
 *
 * We use {@link PSPDFKit.Geometry.DrawingPoint} for an additional intensity value (usually
 * the pressure of a pointer device) that is used to reconstruct the naturally drawn image. If a
 * device without intensity is used, the default intensity of `0.5` will be used.
 *
 * If no lines are present, the annotation will not be visible.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Immutable.List.<PSPDFKit.Immutable.List.<PSPDFKit.Geometry.DrawingPoint>>} lines
 * @memberof PSPDFKit.Annotations.InkAnnotation
 * @default PSPDFKit.Immutable.List() Empty list
 */
/**
 * The width of the lines in page size pixels. Per default, we use values between 1 and 40 in
 * the UI.
 *
 * The line width will scale when you zoom in.
 *
 * @public
 * @instance
 * @member {number} lineWidth
 * @memberof PSPDFKit.Annotations.InkAnnotation
 * @default 5
 */
/**
 * A {@link PSPDFKit.Color} for the visible line
 *
 * @public
 * @instance
 * @member {PSPDFKit.Color} strokeColor
 * @memberof PSPDFKit.Annotations.InkAnnotation
 * @default Color.BLUE
 */
/**
 * Optional background color that will fill the complete bounding box.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} backgroundColor
 * @memberof PSPDFKit.Annotations.InkAnnotation
 * @default null
 */
/**
 * PSPDFKit's Natural Drawing mode. This value will currently not effect rendering on PSPDFKit
 * for Web.
 *
 * @public
 * @instance
 * @member {boolean} isDrawnNaturally
 * @memberof PSPDFKit.Annotations.InkAnnotation
 * @default false
 */
/**
 * When an ink annotation is created via the signature UI, this flag is set to true.
 *
 * @public
 * @instance
 * @member {boolean} isSignature
 * @memberof PSPDFKit.Annotations.InkAnnotation
 * @default false
 */
/**
 * The blend mode defines how the color of the annotation will be applied to its background.
 *
 * @public
 * @instance
 * @member {PSPDFKit.BlendMode} blendMode
 * @memberof PSPDFKit.Annotations.InkAnnotation
 * @default "normal"
 */
declare class InkAnnotation<T extends IInkAnnotation = IInkAnnotation> extends Annotation<T> {
    lines: List<List<DrawingPoint>>;
    lineWidth: number;
    strokeColor: Color | null;
    backgroundColor: Color | null;
    isDrawnNaturally: boolean;
    isSignature: boolean;
    static defaultValues: IObject;
    static readableName: string;
}

/**
 * Precision values for length of measurement annotations.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.MeasurementPrecision} WHOLE
 * @property {PSPDFKit.MeasurementPrecision} ONE
 * @property {PSPDFKit.MeasurementPrecision} TWO
 * @property {PSPDFKit.MeasurementPrecision} THREE
 * @property {PSPDFKit.MeasurementPrecision} FOUR
 * @property {PSPDFKit.MeasurementPrecision} HALVES
 * @property {PSPDFKit.MeasurementPrecision} QUARTERS
 * @property {PSPDFKit.MeasurementPrecision} EIGHTHS
 * @property {PSPDFKit.MeasurementPrecision} SIXTEENTHS
 *
 */
declare const MeasurementPrecision: {
    readonly WHOLE: "whole";
    readonly ONE: "oneDp";
    readonly TWO: "twoDp";
    readonly THREE: "threeDp";
    readonly FOUR: "fourDp";
    readonly HALVES: "1/2";
    readonly QUARTERS: "1/4";
    readonly EIGHTHS: "1/8";
    readonly SIXTEENTHS: "1/16";
};
type IMeasurementPrecision = (typeof MeasurementPrecision)[keyof typeof MeasurementPrecision];

/**
 * Represents one of the units from which you can scale from for measurement annotations.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.MeasurementScaleUnitFrom} INCHES
 * @property {PSPDFKit.MeasurementScaleUnitFrom} MILLIMETERS
 * @property {PSPDFKit.MeasurementScaleUnitFrom} CENTIMETERS
 * @property {PSPDFKit.MeasurementScaleUnitFrom} POINTS
 */
declare const MeasurementScaleUnitFrom: {
    readonly INCHES: "in";
    readonly MILLIMETERS: "mm";
    readonly CENTIMETERS: "cm";
    readonly POINTS: "pt";
};
type IMeasurementScaleUnitFrom = (typeof MeasurementScaleUnitFrom)[keyof typeof MeasurementScaleUnitFrom];

/**
 * Represents one of the units to which you can scale from for measurement annotations.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.MeasurementScaleUnitTo} INCHES
 * @property {PSPDFKit.MeasurementScaleUnitTo} MILLIMETERS
 * @property {PSPDFKit.MeasurementScaleUnitTo} CENTIMETERS
 * @property {PSPDFKit.MeasurementScaleUnitTo} POINTS
 * @property {PSPDFKit.MeasurementScaleUnitTo} FEET
 * @property {PSPDFKit.MeasurementScaleUnitTo} METERS
 * @property {PSPDFKit.MeasurementScaleUnitTo} YARDS
 * @property {PSPDFKit.MeasurementScaleUnitTo} KILOMETERS
 * @property {PSPDFKit.MeasurementScaleUnitTo} MILES
 */
declare const MeasurementScaleUnitTo: {
    readonly INCHES: "in";
    readonly MILLIMETERS: "mm";
    readonly CENTIMETERS: "cm";
    readonly POINTS: "pt";
    readonly FEET: "ft";
    readonly METERS: "m";
    readonly YARDS: "yd";
    readonly KILOMETERS: "km";
    readonly MILES: "mi";
};
type IMeasurementScaleUnitTo = (typeof MeasurementScaleUnitTo)[keyof typeof MeasurementScaleUnitTo];

interface IMeasurementScale {
    unitFrom: IMeasurementScaleUnitFrom;
    unitTo: IMeasurementScaleUnitTo;
    fromValue: number;
    toValue: number;
}
declare const MeasurementScale_base: Record$1.Factory<IMeasurementScale>;
/**
 * @classdesc
 * MeasurementScale is a class that represents the scale of measurement annotations.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `scale.set("fromValue", 15)`
 * @example <caption>Create and update a scale</caption>
 * const scale = new PSPDFKit.MeasurementScale({
 *   unitFrom: PSPDFKit.MeasurementScaleUnitFrom.Millimeters,
 *   unitTo: PSPDFKit.MeasurementScaleUnitTo.Inches,
 *   fromValue: 1,
 *   toValue: 10
 * });
 * const newScale = scale.set("fromValue", 2);
 * newScale.fromValue // => 2
 * @public
 * @memberof PSPDFKit
 * @summary The scale value of a measurement annotation.
 * @class MeasurementScale
 * @noconstructor
 * @extends Immutable.Record
 */
declare class MeasurementScale extends MeasurementScale_base {
}

interface IShapeAnnotation extends AnnotationProperties {
    strokeDashArray: [number, number] | null;
    strokeWidth: number | null;
    strokeColor: Color | null;
    fillColor: Color | null;
    measurementScale: MeasurementScale | null;
    measurementPrecision: IMeasurementPrecision | null;
}
/**
 * @classdesc
 * Base annotation type from which all shape annotations inherit. You can not directly instantiate
 * from this type.
 *
 * Shape annotations are used to draw different shapes on a page: lines, rectangles, ellipses,
 * polylines and polygons.
 *
 * Shapes which have start and ending points such as lines and polylines can have optional line
 * start and line ending markers which can be filled with an optional fill color.
 *
 * Shapes which define a closed area such as rectangles, ellipses and polygons, can have an optional
 * fill color for the enclosed area.
 *
 * Shapes lines can be solid or dashed with a dash pattern chosen from a predefined list.
 *
 * Shape annotations without a fill color or with transparent fill color are only selectable
 * around their visible lines or colored areas. This means that you can create a page full of
 * these annotations while annotations behind them are still selectable.
 *
 * Right now, shape annotations are implemented using SVG images. This behavior is subject to change.
 *
 * For interacting with a shape annotation, please look at the subtypes:
 *
 * - {@link PSPDFKit.Annotations.LineAnnotation}
 * - {@link PSPDFKit.Annotations.RectangleAnnotation}
 * - {@link PSPDFKit.Annotations.EllipseAnnotation}
 * - {@link PSPDFKit.Annotations.PolylineAnnotation}
 * - {@link PSPDFKit.Annotations.PolygonAnnotation}
 * @example <caption>Create a shape annotation (line) that displays a line</caption>
 * const annotation = new PSPDFKit.Annotations.LineAnnotation({
 *   pageIndex: 0,
 *   startPoint: new PSPDFKit.Geometry.Point({ x: 95, y: 5 }),
 *   endPoint: new PSPDFKit.Geometry.Point({ x: 5,  y: 95}),
 *   strokeWidth: 4
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Base annotation type for all shape annotations.
 * @class ShapeAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 */
/**
 * Optional dash pattern used to draw the shape lines for dashed line style.
 *
 * @public
 * @instance
 * @member {?Array<number>} strokeDashArray
 * @memberof PSPDFKit.Annotations.ShapeAnnotation
 */
/**
 * The width of the line in page size pixels. By default, we use values between 1 and 40 in
 * the UI.
 *
 * The stroke width will scale when you zoom in.
 *
 * @public
 * @instance
 * @member {number} strokeWidth
 * @memberof PSPDFKit.Annotations.ShapeAnnotation
 * @default 5
 */
/**
 * A {@link PSPDFKit.Color} for the shape lines
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} strokeColor
 * @memberof PSPDFKit.Annotations.ShapeAnnotation
 * @default Color.BLUE
 */
/**
 * A {@link PSPDFKit.Color} to fill the interior of closed shapes (ellipses, rectangles and polygons)
 * or start and / or end line caps of open shapes (lines and polylines).
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} fillColor
 * @memberof PSPDFKit.Annotations.ShapeAnnotation
 * @default null
 */
/**
 * The {@link PSPDFKit.MeasurementScale} used to set the scale for the annotation.
 *
 * @public
 * @instance
 * @member {PSPDFKit.MeasurementScale} measurementScale
 * @memberof PSPDFKit.Annotations.ShapeAnnotation
 */
/**
 * The {@link PSPDFKit.MeasurementPrecision} used to set the precision for the annotation.
 *
 * @public
 * @instance
 * @member {PSPDFKit.MeasurementPrecision} measurementPrecision
 * @memberof PSPDFKit.Annotations.ShapeAnnotation
 * @default PSPDFKit.MeasurementPrecision.TWO
 */
/**
 * A method that tels whether the annotation is a measurement annotation.
 *
 * @public
 * @instance
 * @function isMeasurement
 * @returns {boolean}
 * @memberof PSPDFKit.Annotations.ShapeAnnotation
 */
/**
 * A method the returns the measurement value and label of the annotation.
 *
 * @public
 * @instance
 * @function getMeasurementDetails
 * @returns {object}
 * @memberof PSPDFKit.Annotations.ShapeAnnotation
 * @example
 * const { value, label } = annotation.getMeasurementDetails();
 *
 * console.log(value, label);
 */
declare abstract class ShapeAnnotation<T extends IShapeAnnotation = IShapeAnnotation> extends Annotation<T> {
    strokeDashArray: null | [number, number];
    strokeWidth: number;
    strokeColor: null | Color;
    fillColor: null | Color;
    measurementPrecision: null | IMeasurementPrecision;
    measurementScale: null | MeasurementScale;
    static readableName: string;
    static defaultValues: IObject;
    isMeasurement(): boolean;
    getMeasurementDetails: () => {
        value: number;
        label: string;
    };
}

/**
 * Represents one of the available line caps for the line and polyline annotations.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.LineCap} square square line cap
 * @property {PSPDFKit.LineCap} circle circle line cap
 * @property {PSPDFKit.LineCap} diamond diamond line cap
 * @property {PSPDFKit.LineCap} openArrow open arrow line cap
 * @property {PSPDFKit.LineCap} closedArrow closed arrow line cap
 * @property {PSPDFKit.LineCap} butt butt line cap
 * @property {PSPDFKit.LineCap} reverseOpenArrow reverse open arrow line cap
 * @property {PSPDFKit.LineCap} reverseClosedArrow reverse closed arrow line cap
 * @property {PSPDFKit.LineCap} slash slash line cap
 */
declare const LineCap: {
    readonly square: "square";
    readonly circle: "circle";
    readonly diamond: "diamond";
    readonly openArrow: "openArrow";
    readonly closedArrow: "closedArrow";
    readonly butt: "butt";
    readonly reverseOpenArrow: "reverseOpenArrow";
    readonly reverseClosedArrow: "reverseClosedArrow";
    readonly slash: "slash";
};
type ILineCap = (typeof LineCap)[keyof typeof LineCap];
type LineCapsType = {
    start?: ILineCap | null;
    end?: ILineCap | null;
};

interface ILineAnnotation extends IShapeAnnotation {
    startPoint: Point | null;
    endPoint: Point | null;
    lineCaps: LineCapsType | null;
    points: List<Point> | null;
}
/**
 * @classdesc
 * Line annotations are used to draw straight lines on a page.
 *
 * Line annotations are only selectable around their visible line. This means that you can create a
 * page full of line annotations while annotations behind the line annotation are still selectable.
 *
 * Right now, line annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a line annotation" src="img/annotations/shape_line_annotation.png" width="379" height="155" class="shadow">
 * </center>
 * @example <caption>Create a line annotation</caption>
 * const annotation = new PSPDFKit.Annotations.LineAnnotation({
 *   pageIndex: 0,
 *   startPoint: new PSPDFKit.Geometry.Point({ x: 95, y: 95}),
 *   endPoint: new PSPDFKit.Geometry.Point({ x: 195, y: 195}),
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 90,
 *     top: 90,
 *     width: 200,
 *     height: 200,
 *   }),
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display a straight line on a page.
 * @class LineAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.ShapeAnnotation
 */
/**
 * A point tuple with x and y coordinates of the line starting point.
 *
 * If no starting point is provided, the annotation will not be visible.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Geometry.Point} startPoint
 * @memberof PSPDFKit.Annotations.LineAnnotation
 */
/**
 * A point tuple with x and y coordinates of the line ending point.
 *
 * If no ending point is provided, the annotation will not be visible.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Geometry.Point} endPoint
 * @memberof PSPDFKit.Annotations.LineAnnotation
 */
/**
 * An object with start and / or end entries for line caps.
 *
 * Line caps can have one of these values: "square", "circle", "diamond", "openArrow", "closedArrow",
 * "butt", "reverseOpenArrow", "reverseClosedArrow" or "slash".
 *
 * If the fillColor field is provided, its value is used as fill color for the line cap interior.
 *
 * @public
 * @instance
 * @member {?LineCapsType} lineCaps
 * @memberof PSPDFKit.Annotations.LineAnnotation
 */
declare class LineAnnotation<T extends ILineAnnotation = ILineAnnotation> extends ShapeAnnotation<T> {
    startPoint: Point;
    endPoint: Point;
    lineCaps: LineCapsType | null;
    points: List<Point> | null;
    static defaultValues: IObject;
    static readableName: string;
}

interface IRectangleAnnotation extends IShapeAnnotation {
    cloudyBorderIntensity?: number | null;
    cloudyBorderInset?: Inset | null;
}
/**
 * @classdesc
 * Rectangle annotations are used to draw rectangles on a page.
 *
 * Rectangle annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of rectangle annotations while annotations
 * behind the rectangle annotation are still selectable.
 *
 * Right now, rectangle annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a rectangle annotation" src="img/annotations/shape_rectangle_annotation.png" width="411" height="295" class="shadow">
 * </center>
 * @example <caption>Create a rectangle annotation</caption>
 * const annotation = new PSPDFKit.Annotations.RectangleAnnotation({
 *   pageIndex: 0,
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 10,
 *     top: 10,
 *     width: 100,
 *     height: 100,
 *   }),
 *   cloudyBorderIntensity: 2,
 *   cloudyBorderInset: new PSPDFKit.Geometry.Inset({
 *     left: 9,
 *     top: 9,
 *     right: 9,
 *     bottom: 9,
 *   })
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display a rectangle on a page.
 * @class RectangleAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.ShapeAnnotation
 */
/**
 * Intensity of the cloudy border.
 *
 * If not present or 0, the annotation will use a normal border.
 *
 * @public
 * @instance
 * @member {?number} cloudyBorderIntensity
 * @memberof PSPDFKit.Annotations.RectangleAnnotation
 * @default null Normal border.
 */
/**
 * Cloudy border inset.
 *
 * For rectangle annotations with a cloudy border, it contains the values for the distances from
 * the bounding box to bounding box wrapped by the inner, where the content fits.
 *
 * Visual representation of the property:
 *
 * <center>
 *   <img title="Example of a cloudy rectangle annotation" src="img/annotations/rectangle_inset.png" width="600" height="405" class="shadow">
 * </center>
 *
 * @public
 * @instance
 * @member {PSPDFKit.Geometry.Inset} cloudyBorderInset
 * @memberof PSPDFKit.Annotations.RectangleAnnotation
 */
declare class RectangleAnnotation<T extends IRectangleAnnotation = IRectangleAnnotation> extends ShapeAnnotation<T> {
    cloudyBorderIntensity: null | number;
    cloudyBorderInset: null | Inset;
    measurementBBox: null | Rect;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: Partial<T>);
}

interface IEllipseAnnotation extends IShapeAnnotation {
    cloudyBorderIntensity?: number | null;
    cloudyBorderInset?: Inset | null;
}
/**
 * @classdesc
 * Ellipse annotations are used to draw ellipses on a page.
 *
 * Ellipse annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of ellipse annotations while
 * annotations behind the ellipse annotation are still selectable.
 *
 * Right now, ellipse annotations are implemented using SVG images. This behavior is subject to
 * change.
 *
 * <center>
 *   <img title="Example of an ellipse annotation" src="img/annotations/shape_ellipse_annotation.png" width="388" height="266" class="shadow">
 * </center>
 * @example <caption>Create an ellipse annotation</caption>
 * const annotation = new PSPDFKit.Annotations.EllipseAnnotation({
 *   pageIndex: 0,
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 10,
 *     top: 10,
 *     width: 100,
 *     height: 100,
 *   }),
 *   cloudyBorderIntensity: 2,
 *   cloudyBorderInset: new PSPDFKit.Geometry.Inset({
 *     left: 9,
 *     top: 9,
 *     right: 9,
 *     bottom: 9,
 *   })
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display a ellipse on a page.
 * @class EllipseAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.ShapeAnnotation
 */
/**
 * Intensity of the cloudy border.
 *
 * If not present or 0, the annotation will use a normal border.
 *
 * @public
 * @instance
 * @member {?number} cloudyBorderIntensity
 * @memberof PSPDFKit.Annotations.EllipseAnnotation
 * @default null Normal border.
 */
/**
 * Cloudy border inset.
 *
 * For ellipse annotations with a cloudy border, it contains the values for the distances from
 * the bounding box to bounding box wrapped by the inner, where the content fits.
 *
 * Visual representation of the property:
 *
 * <center>
 *   <img title="Example of a cloudy ellipse annotation" src="img/annotations/ellipse_inset.png" width="600" height="405" class="shadow">
 * </center>
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Geometry.Inset} cloudyBorderInset
 * @memberof PSPDFKit.Annotations.EllipseAnnotation
 */
declare class EllipseAnnotation<T extends IEllipseAnnotation = IEllipseAnnotation> extends ShapeAnnotation<T> {
    cloudyBorderIntensity: null | number;
    cloudyBorderInset: null | Inset;
    measurementBBox: null | Rect;
    static defaultValues: IObject;
    static readableName: string;
    constructor(options?: Partial<T>);
}

interface IPolygonAnnotation extends IShapeAnnotation {
    points: List<Point> | null;
    cloudyBorderIntensity: number | null;
}
/**
 * @classdesc
 * Polygon annotations are used to hand draw polygons on a page. They can contain any number of sides
 * defined by the polygon vertices.
 *
 * Polygon annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of polygon annotations while annotations
 * behind the polygon annotation are still selectable.
 *
 * Right now, polygon annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a polygon annotation" src="img/annotations/shape_polygon_annotation.png" width="375" height="311" class="shadow">
 * </center>
 * @example <caption>Create a polygon annotation that displays a triangle</caption>
 * const annotation = new PSPDFKit.Annotations.PolygonAnnotation({
 *   pageIndex: 0,
 *   points: PSPDFKit.Immutable.List([
 *       new PSPDFKit.Geometry.Point({ x: 25,  y: 25 }),
 *       new PSPDFKit.Geometry.Point({ x: 35,  y: 30 }),
 *       new PSPDFKit.Geometry.Point({ x: 30,  y: 55 }),
 *   ]),
 *   strokeWidth: 10,
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 20,
 *     top: 20,
 *     width: 20,
 *     height: 40,
 *   }),
 *   cloudyBorderIntensity: 2
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display a polygon on a page.
 * @class PolygonAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.ShapeAnnotation
 */
/**
 * A list of points.
 *
 * If no points are present, the annotation will not be visible.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Immutable.List.<PSPDFKit.Geometry.Point>} points
 * @memberof PSPDFKit.Annotations.PolygonAnnotation
 * @default PSPDFKit.Immutable.List() Empty list
 */
/**
 * Intensity of the cloudy border.
 *
 * If not present or 0, the annotation will use a normal border.
 *
 * @public
 * @instance
 * @member {?number} cloudyBorderIntensity
 * @memberof PSPDFKit.Annotations.PolygonAnnotation
 * @default null Normal border.
 */
declare class PolygonAnnotation<T extends IPolygonAnnotation = IPolygonAnnotation> extends ShapeAnnotation<T> {
    points: List<Point>;
    cloudyBorderIntensity: null | number;
    static defaultValues: IObject;
    static readableName: string;
}

interface IPolyLineAnnotation extends IShapeAnnotation {
    points: List<Point> | null;
    lineCaps: LineCapsType | null;
}
/**
 * @classdesc
 * Polyline annotations are used to hand draw polylines on a page. They can contain any number of sides
 * defined by the polyline vertices.
 *
 * Polyline annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of polyline annotations while annotations
 * behind the polyline annotation are still selectable.
 *
 * Right now, polyline annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a polyline annotation" src="img/annotations/shape_polyline_annotation.png" width="375" height="301" class="shadow">
 * </center>
 * @example <caption>Create a polyline annotation that displays a triangle</caption>
 * var annotation = new PSPDFKit.Annotations.PolylineAnnotation({
 *   pageIndex: 0,
 *   points: PSPDFKit.Immutable.List([
 *       new PSPDFKit.Geometry.Point({ x: 25,  y: 25 }),
 *       new PSPDFKit.Geometry.Point({ x: 35,  y: 30 }),
 *       new PSPDFKit.Geometry.Point({ x: 30,  y: 55 }),
 *   ]),
 *   strokeWidth: 10,
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 20,
 *     top: 20,
 *     width: 20,
 *     height: 40,
 *   }),
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display a polyline on a page.
 * @class PolylineAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.ShapeAnnotation
 */
/**
 * A list of points.
 *
 * If no points are present, the annotation will not be visible.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Immutable.List.<PSPDFKit.Geometry.Point>} points
 * @memberof PSPDFKit.Annotations.PolylineAnnotation
 * @default PSPDFKit.Immutable.List() Empty list
 */
/**
 * An object with start and / or end entries for line caps.
 *
 * Line caps can have one of these values: "square", "circle", "diamond", "openArrow", "closedArrow",
 * "butt", "reverseOpenArrow", "reverseClosedArrow" or "slash".
 *
 * If the fillColor field is provided, its value is used as fill color for the line cap interior.
 *
 * @public
 * @instance
 * @member {?LineCaps} lineCaps
 * @memberof PSPDFKit.Annotations.PolylineAnnotation
 */
declare class PolylineAnnotation<T extends IPolyLineAnnotation = IPolyLineAnnotation> extends ShapeAnnotation<T> {
    points: List<Point>;
    lineCaps: null | LineCapsType;
    static defaultValues: IObject;
    static readableName: string;
}

/**
 * Represents one of the available border styles for the widget annotations.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.BorderStyle} solid
 * @property {PSPDFKit.BorderStyle} dashed
 * @property {PSPDFKit.BorderStyle} beveled
 * @property {PSPDFKit.BorderStyle} inset
 * @property {PSPDFKit.BorderStyle} underline
 */
declare const BorderStyle: {
    readonly solid: "solid";
    readonly dashed: "dashed";
    readonly beveled: "beveled";
    readonly inset: "inset";
    readonly underline: "underline";
};
type IBorderStyle = (typeof BorderStyle)[keyof typeof BorderStyle];

interface ILinkAnnotation extends AnnotationProperties {
    action: Action | null;
    borderColor: Color | null;
    borderStyle: IBorderStyle | null;
    borderWidth: number | null;
}
/**
 * Optional border color that will be drawn at the border of the bounding box.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} borderColor
 * @memberof PSPDFKit.Annotations.LinkAnnotation
 * @default null
 */
/**
 * Optional border style used for the border of the bounding box. Valid options
 * are:
 *
 *   - `solid`
 *   - `dashed`
 *   - `beveled`
 *   - `inset`
 *   - `underline`
 *
 * @public
 * @instance
 * @member {?string} borderStyle
 * @memberof PSPDFKit.Annotations.LinkAnnotation
 * @default null
 */
/**
 * Optional border width in PDF pixels, that will be used for the border of the
 * bounding box.
 *
 * @public
 * @instance
 * @member {?number} borderWidth
 * @memberof PSPDFKit.Annotations.LinkAnnotation
 * @default 0
 */
/**
 * _The border on the image above is only for visual guidance and will not be rendered in the
 * viewer._
 *
 * @example <caption>Create a link with a go to action</caption>
 * var action = new PSPDFKit.Actions.GoToAction({ pageIndex: 10 });
 * var annotation = new PSPDFKit.Annotations.LinkAnnotation({
 *   pageIndex: 0,
 *   boundingBox: new PSPDFKit.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
 *   action: action,
 *   borderColor: new PSPDFKit.Color({ r: 245, g: 0, b: 0 })
 *   borderStyle: PSPDFKit.BorderStyle.solid
 *   borderWidth: 5
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Triggers an action when clicked.
 * @class LinkAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 */
declare class LinkAnnotation<T extends ILinkAnnotation = ILinkAnnotation> extends Annotation<T> {
    action: Action;
    borderColor: null | Color;
    borderStyle: null | IBorderStyle;
    borderWidth: null | number;
    static readableName: string;
    static defaultValues: IObject;
}

/**
 * Available icons for Note Annotations.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.NoteIcon} COMMENT
 * @property {PSPDFKit.NoteIcon} RIGHT_POINTER
 * @property {PSPDFKit.NoteIcon} RIGHT_ARROW
 * @property {PSPDFKit.NoteIcon} CHECK
 * @property {PSPDFKit.NoteIcon} CIRCLE
 * @property {PSPDFKit.NoteIcon} CROSS
 * @property {PSPDFKit.NoteIcon} INSERT
 * @property {PSPDFKit.NoteIcon} NEW_PARAGRAPH
 * @property {PSPDFKit.NoteIcon} NOTE
 * @property {PSPDFKit.NoteIcon} PARAGRAPH
 * @property {PSPDFKit.NoteIcon} HELP
 * @property {PSPDFKit.NoteIcon} STAR
 * @property {PSPDFKit.NoteIcon} KEY
 */
declare const NoteIcon: {
    readonly COMMENT: "COMMENT";
    readonly RIGHT_POINTER: "RIGHT_POINTER";
    readonly RIGHT_ARROW: "RIGHT_ARROW";
    readonly CHECK: "CHECK";
    readonly CIRCLE: "CIRCLE";
    readonly CROSS: "CROSS";
    readonly INSERT: "INSERT";
    readonly NEW_PARAGRAPH: "NEW_PARAGRAPH";
    readonly NOTE: "NOTE";
    readonly PARAGRAPH: "PARAGRAPH";
    readonly HELP: "HELP";
    readonly STAR: "STAR";
    readonly KEY: "KEY";
};
type INoteIcon = (typeof NoteIcon)[keyof typeof NoteIcon];

interface INoteAnnotation extends AnnotationProperties {
    text: {
        format: 'plain';
        value: string;
    };
    icon: string | INoteIcon;
    color: Color;
}
/**
 * @classdesc
 * Note annotations are "sticky notes" attached to a point in the PDF document.
 * They are represented as markers and each of them as an icon associated to it.
 * Its text content is revealed on selection.
 *
 * <center>
 *   <img title="Example of a note annotation" src="img/annotations/note_annotation.png" width="350" class="shadow">
 * </center>
 * @example <caption>Create a note annotation</caption>
 * const annotation = new PSPDFKit.Annotations.NoteAnnotation({
 *   pageIndex: 0,
 *   text: { format: "plain", value : "Remember the milk" },
 *   boundingBox: new PSPDFKit.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary A text note that will be rendered inside the bounding box.
 * @class NoteAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 * @seealso PSPDFKit.Instance#setEditingAnnotation
 */
/**
 * The note contents in plain text formats.
 * We don't support rich text formatting in the text field.
 *
 * @public
 * @instance
 * @member {Text} text
 * @memberof PSPDFKit.Annotations.NoteAnnotation
 * @default ""
 */
/**
 * The icon to represent the collapsed annotation in the document.
 *
 * @public
 * @instance
 * @member {PSPDFKit.NoteIcon} icon
 * @memberof PSPDFKit.Annotations.NoteAnnotation
 * @default {@link PSPDFKit.NoteIcon|PSPDFKit.NoteIcon.COMMENT}
 */
/**
 * Background color that will fill the complete bounding box.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Color} color
 * @memberof PSPDFKit.Annotations.NoteAnnotation
 * @default new Color({ r: 255, g: 216, b: 63 }) - yellow
 */
declare class NoteAnnotation<T extends INoteAnnotation = INoteAnnotation> extends Annotation<T> {
    text: {
        format: 'plain';
        value: string;
    };
    icon: INoteIcon;
    color: Color;
    static isEditable: boolean;
    static readableName: string;
    static defaultValues: IObject;
}

interface ISquiggleAnnotation extends ITextMarkupAnnotation {
    color: Color;
}
/**
 * @classdesc
 * A squiggle markup annotation. Please refer to {@link PSPDFKit.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a squiggle annotation</caption>
 * const rects = PSPDFKit.Immutable.List([
 *   new PSPDFKit.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new PSPDFKit.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new PSPDFKit.Annotations.SquiggleAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: PSPDFKit.Geometry.Rect.union(rects)
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Squiggle markup annotation.
 * @class SquiggleAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.MarkupAnnotation
 */
declare class SquiggleAnnotation<T extends ISquiggleAnnotation = ISquiggleAnnotation> extends TextMarkupAnnotation<T> {
    static className: string;
    static readableName: string;
    static defaultValues: IObject;
}

interface IStrikeOutAnnotation extends ITextMarkupAnnotation {
    color: Color;
}
/**
 * @classdesc
 * A strike out markup annotation. Please refer to {@link PSPDFKit.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a strike out annotation</caption>
 * const rects = PSPDFKit.Immutable.List([
 *   new PSPDFKit.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new PSPDFKit.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new PSPDFKit.Annotations.StrikeOutAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: PSPDFKit.Geometry.Rect.union(rects)
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Strike out markup annotation.
 * @class StrikeOutAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.MarkupAnnotation
 */
declare class StrikeOutAnnotation<T extends IStrikeOutAnnotation = IStrikeOutAnnotation> extends TextMarkupAnnotation<T> {
    static className: string;
    static readableName: string;
    static defaultValues: IObject;
}

/**
 * Properties of the arrow line attached to a callout (text) annotation.
 *
 * @public
 * @summary Callout arrow line properties.
 * @member {object} Callout
 * @memberof PSPDFKit
 * @property {?PSPDFKit.Geometry.Point} start - Starting point of the arrow line.
 * @property {?PSPDFKit.Geometry.Point} knee - Knee point of the arrow line.
 * @property {?PSPDFKit.Geometry.Point} end - Ending point of the arrow line.
 * @property {?PSPDFKit.LineCap} cap - The line cap style.
 * @property {?PSPDFKit.Geometry.Inset} innerRectInset - The inner rectangle inset.
 */
type ICallout = {
    start: Point | null;
    knee: Point | null;
    end: Point | null;
    cap: ILineCap | null;
    innerRectInset: Inset | null;
};
declare class Callout extends InheritableImmutableRecord<ICallout> {
    start: Point | null;
    knee: Point | null;
    end: Point | null;
    cap: ILineCap | null;
    innerRectInset: Inset | null;
    static defaultValues: {
        start: null;
        knee: null;
        end: null;
        cap: null;
        innerRectInset: null;
    };
}

interface ITextAnnotation extends AnnotationProperties {
    text: {
        format: 'plain' | 'xhtml';
        value: string | null;
    };
    fontColor: Color | null;
    backgroundColor: Color | null;
    font: string;
    fontSize: number | null;
    isBold: boolean | null;
    isItalic: boolean | null;
    isUnderline: boolean | null;
    horizontalAlign: 'left' | 'center' | 'right';
    verticalAlign: 'top' | 'center' | 'bottom';
    callout: Callout | null;
    borderStyle: IBorderStyle | null;
    borderWidth: number | null;
    borderColor: Color | null;
    isFitting: boolean;
    lineHeightFactor: number | null;
}
/**
 * @classdesc
 * A free form text that will be rendered inside the bounding box. It has no open or closed state -
 * instead of being displayed in a pop-up window, the text is always visible.
 *
 * Fonts are client specific and determined during runtime. If a font is not found, we will
 * automatically fall back to a sans serif font.
 *
 * <center>
 *   <img title="Example of a text annotation" src="img/annotations/text_annotation.png" width="350" class="shadow">
 * </center>
 * @example <caption>Create a text annotation</caption>
 * const annotation = new PSPDFKit.Annotations.TextAnnotation({
 *   pageIndex: 0,
 *   text: { format: "plain", value : "Welcome to\nPSPDFKit" },
 *   font: "Helvetica",
 *   isBold: true,
 *   horizontalAlign: "center",
 *   boundingBox: new PSPDFKit.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
 *   fontColor: PSPDFKit.Color.RED
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Free form text that will be rendered inside the bounding box.
 * @class TextAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 * @seealso PSPDFKit.Instance#calculateFittingTextAnnotationBoundingBox PSPDFKit.Instance#setEditingAnnotation
 */
/**
 * @public
 * @typedef {object} Text
 * @property {string} format The format of the text. Either `plain` or `xhtml`.
 * @property {string} value The text value.
 */
/**
 * The visible contents in plain text/xhtml formats.
 *
 * We use a simple newline delimiter `\n` for multi
 * line texts in case of plain text. A trailing newline (e.g. `foobar\n`) will result in an additional line.
 *
 * In case of XHTML, we support the following tags:
 * - `<b>`: Bold
 * - `<i>`: Italic
 * - `<span>`: Font color, background color and underline using the `style` attribute (e.g. `<span style="color: red; background-color: blue; text-decoration: underline">Hello</span>`)
 * - `p`: Paragraph. You can use this to add a newline between paragraphs.
 * @example <caption>Get the text value of a text annotation</caption>
 * const { value, format } = annotation.text;
 * @public
 * @instance
 * @member {Text} text
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default { format: "plain", value: "" }
 */
/**
 * A {@link PSPDFKit.Color} for the visible glyphs, or `null` for transparent color.
 * @public
 * @instance
 * @member {?PSPDFKit.Color} fontColor
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default Color.BLACK
 */
/**
 * Optional background color that will fill the complete bounding box.
 * @public
 * @instance
 * @member {?PSPDFKit.Color} backgroundColor
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default null
 */
/**
 * Optional border color that will be used for the text border and the line for text annotations
 * of type callout. It will be not be rendered if the `callout` property is not set.
 * @public
 * @instance
 * @member {?PSPDFKit.Color} borderColor
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default null
 */
/**
 * The name of the font family that should be used.
 *
 * Fonts are client specific and determined during runtime. If a font is not found, we will
 * automatically fall back to 'sans-serif'.
 *
 * We test the following list at runtime. The first available font will be used as the default
 * for all new text annotations: Helvetica, Arial, Calibri, Century Gothic, Consolas, Courier,
 * Dejavu Sans, Dejavu Serif, Georgia, Gill Sans, Impact, Lucida Sans, Myriad Pro, Open Sans,
 * Palatino, Tahoma, Times New Roman, Trebuchet, Verdana, Zapfino, Comic Sans.
 * @public
 * @instance
 * @member {string} font
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default "Helvetica"
 */
/**
 * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
 * annotation with a rotation value of `0` will make it appear in the same direction as the UI
 * appears, when no {@link PSPDFKit.ViewState#pagesRotation} is set.
 *
 * Text annotations support free rotation using integers between 0° and 359°. Negative values or values
 * above 359 are normalized to this interval. Attempting to use non-integer values will result in
 * an error.
 * @public
 * @instance
 * @member {number} rotation
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default 0
 */
/**
 * The font size in page size pixels. Per default, we use values between 10 and 192 inclusive
 * in the UI.
 *
 * The text will scale when you zoom in.
 * @public
 * @instance
 * @member {number} fontSize
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default 18
 */
/**
 * If `true`, the font will be **bold** if the font family supports this.
 * @public
 * @instance
 * @member {boolean} isBold
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default false
 */
/**
 * If `true`, the font will be _italic_ if the font family supports this.
 * @public
 * @instance
 * @member {boolean} isItalic
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default false
 */
/**
 * The horizontal alignment of the text inside the bounding box. Can be either one of:
 *
 * - `left`
 * - `center`
 * - `right`
 *
 * This is equal to the CSS `text-align` property.
 * @public
 * @instance
 * @member {"left" | "center" | "right"} horizontalAlign
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default "left"
 */
/**
 * The vertical alignment of the text inside the bounding box. Can be either one of:
 *
 * - `top`
 * - `center`
 * - `bottom`
 * @public
 * @instance
 * @member {"top" | "center" | "bottom"} verticalAlign
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default "top"
 */
/**
 * When the annotation is modified through PSPDFKit for Web, we will set this flag whenever the
 * whole text fits the bounds of the annotation without overflowing.
 * @public
 * @instance
 * @member {boolean} isFitting
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default false
 * {@link PSPDFKit.Instance#calculateFittingTextAnnotationBoundingBox}
 */
/**
 * When set, the annotation will not scale up in the page when it's zoomed in.
 * The flag doesn't have an effect when the page is zoomed out to a zoom level less than `1`.
 * The flag is not currently supported when the `callout` property is set.
 * @public
 * @instance
 * @member {?boolean} noZoom
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default false
 */
/**
 * The callout that is attached to the annotation.
 * @public
 * @instance
 * @member {?PSPDFKit.Callout} callout
 * @memberof PSPDFKit.Annotations.TextAnnotation
 * @default null
 */
declare class TextAnnotation<T extends ITextAnnotation = ITextAnnotation> extends Annotation<T> {
    text: {
        format: 'plain' | 'xhtml';
        value: string;
    };
    fontColor: null | Color;
    backgroundColor: null | Color;
    font: string;
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    horizontalAlign: 'left' | 'center' | 'right';
    verticalAlign: 'top' | 'center' | 'bottom';
    isFitting: boolean;
    callout: null | Callout;
    borderStyle: null | IBorderStyle;
    borderWidth: null | number;
    borderColor: Color | null;
    lineHeightFactor: null | number;
    static defaultValues: IObject;
    static readonly isEditable = true;
    static readonly readableName = "Text";
    static readonly fontSizePresets: readonly number[];
}

interface IUnderlineAnnotation extends ITextMarkupAnnotation {
    color: Color;
}
/**
 * @classdesc
 * An underline markup annotation. Please refer to {@link PSPDFKit.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a underline annotation</caption>
 * const rects = PSPDFKit.Immutable.List([
 *   new PSPDFKit.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new PSPDFKit.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new PSPDFKit.Annotations.UnderlineAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: PSPDFKit.Geometry.Rect.union(rects)
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Underline markup annotation.
 * @class UnderlineAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.MarkupAnnotation
 */
declare class UnderlineAnnotation<T extends IUnderlineAnnotation = IUnderlineAnnotation> extends TextMarkupAnnotation<T> {
    static className: string;
    static readableName: string;
    static defaultValues: IObject;
}

/**
 * @classdesc
 * Unknown or unsupported annotation. This can happen when we extract annotations from a PDF
 * document that are not supported on PSPDFKit for Web yet.
 *
 * Previously unsupported annotations can change to a new annotation type in a future release. More
 * detail in the appropriate change log entry.
 *
 * PSPDFKit for Web will attempt to render these annotations, but they cannot be modified, only deleted.
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Unknown or unsupported annotation type.
 * @class UnknownAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 */
declare class UnknownAnnotation extends Annotation {
}

type FontSize = 'auto' | number;
type WidgetActionTriggerEventType = Omit<ActionTriggerEventType, 'onPageOpen'> | 'onFocus' | 'onBlur';
type WidgetAnnotationAdditionalActionsType = {
    onFocus?: JavaScriptAction;
    onBlur?: JavaScriptAction;
    onChange?: JavaScriptAction;
    onFormat?: JavaScriptAction;
    onInput?: JavaScriptAction;
    onPointerDown?: Action;
    onPointerUp?: Action;
    onPointerEnter?: Action;
    onPointerLeave?: Action;
};
interface IWidgetAnnotation extends AnnotationProperties {
    formFieldName: string | null;
    borderColor: Color | null;
    borderStyle: IBorderStyle | null;
    borderDashArray: number[] | null;
    borderWidth: number | null;
    backgroundColor: Color | null;
    fontSize: FontSize | null;
    font: string | null;
    fontColor: Color | null;
    isBold: boolean | null;
    isItalic: boolean | null;
    horizontalAlign: 'left' | 'center' | 'right' | null;
    verticalAlign: 'top' | 'center' | 'bottom' | null;
    additionalActions: WidgetAnnotationAdditionalActionsType | null;
    rotation: number;
    lineHeightFactor: number | null;
    buttonIconUpdatedAt: number | null;
}
/**
 * @classdesc
 * Widget annotations are part of PDF forms and used to position form elements,
 * linked to {@link PSPDFKit.FormFields.FormField}s, on a page. To know how a
 * widget is rendered also depends on the linked form field. Widget annotations
 * may only be created or modified if the Form Creator component is present in
 * the license.
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Draw form elements, linked to
 * {@link PSPDFKit.FormFields.FormField}s, on a page.
 * @class WidgetAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 */
/**
 * The {@link PSPDFKit.FormFields.FormField#name} of the linked form field.
 * Based on the type of the field, a different element will be rendered
 *
 * @public
 * @instance
 * @member {string} formFieldName
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 */
/**
 * Optional border color that will be drawn at the border of the bounding box.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} borderColor
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * Optional border style used for the border of the bounding box. Valid options
 * are:
 *
 *   - `solid`
 *   - `dashed`
 *   - `beveled`
 *   - `inset`
 *   - `underline`
 *
 * @public
 * @instance
 * @member {?string} borderStyle
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * Optional dash pattern used to draw the border for dashed border style.
 *
 * @public
 * @instance
 * @member {?Array<number>} borderDashArray
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 */
/**
 * Optional border width in PDF pixels, that will be used for the border of the
 * bounding box.
 *
 * @public
 * @instance
 * @member {?number} borderWidth
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * Optional background color that will fill the bounding box.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} backgroundColor
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * Optional font color.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} fontColor
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * Optional font size in page size pixels.
 *
 * @public
 * @instance
 * @member {number} fontSize
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * The name of the font family that should be used.
 *
 * Fonts are client specific and determined during runtime. If a font is not found, we will
 * automatically fall back to 'sans-serif'.
 *
 * We test the following list at runtime. The first available font will be used as the default
 * for all new widget annotations: Helvetica, Arial, Calibri, Century Gothic, Consolas, Courier,
 * Dejavu Sans, Dejavu Serif, Georgia, Gill Sans, Impact, Lucida Sans, Myriad Pro, Open Sans,
 * Palatino, Tahoma, Times New Roman, Trebuchet, Verdana, Zapfino, Comic Sans.
 *
 * If the browser does not natively support the font, it's still possible to support it by
 * providing the required font data using {@link PSPDFKit.Configuration#styleSheets|a custom stylesheet}.
 *
 * @public
 * @instance
 * @member {?string} font
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * Optional horizontal text alignment.
 *
 * @public
 * @instance
 * @member {?'left' | 'center' | 'right'} horizontalAlign
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default left
 */
/**
 * Optional vertical text alignment.
 *
 * @public
 * @instance
 * @member {?'top' | 'center' | 'bottom'} verticalAlign
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * If `true`, the font will be **bold** if the font family supports this.
 *
 * @public
 * @instance
 * @member {boolean} isBold
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default false
 */
/**
 * If `true`, the font will be _italic_ if the font family supports this.
 *
 * @public
 * @instance
 * @member {boolean} isItalic
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default false
 */
/**
 * Optional actions to execute when an event is triggered.
 *
 * @example <caption>Adding an {@link PSPDFKit.Actions.JavaScriptAction} when the annotation is focused:</caption>
 * const widget = new PSPDFKit.Annotations.WidgetAnnotation({
 *   id: PSPDFKit.generateInstantId(),
 *   pageIndex: 0,
 *   formFieldName: "MyFormField",
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 100,
 *     top: 75,
 *     width: 200,
 *     height: 80
 *   }),
 *   additionalActions: {
 *     onFocus: new PSPDFKit.Actions.JavaScriptAction({
 *       script: "alert('onFocus')"
 *     })
 *   }
 * });
 *
 * const form = new PSPDFKit.FormFields.TextFormField({
 *     name: "MyFormField",
 *     annotationIds: new PSPDFKit.Immutable.List([annotation.id]),
 *     value: "Text shown in the form field"
 * });
 *
 * instance.create([widget, form])
 * @public
 * @instance
 * @member {?PSPDFKit.WidgetAnnotationAdditionalActions} additionalActions
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default null
 */
/**
 * Actions to execute when any of the events is triggered.
 *
 * @public
 * @extends PSPDFKit.AnnotationAdditionalActions
 * @memberof PSPDFKit
 * @interface WidgetAnnotationAdditionalActions
 */
/**
 * Execute an action when the widget is focused.
 *
 * The name of this event in the PDF spec is `Fo`.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.JavaScriptAction} onFocus
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * Execute an action when the widget loses focus.
 *
 * The name of this event in the PDF spec is `Bl`.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.JavaScriptAction} onBlur
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the user changes the value of the field.
 *
 * The name of this event in the PDF spec is `V`.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.JavaScriptAction} onChange
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the user types a key-stroke into a text field or combo box
 * or modifies the selection in a scrollable list box.
 *
 * The name of this event in the PDF spec is `K`.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.JavaScriptAction} onInput
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed before the field is formatted to display its current value.
 *
 * The name of this event in the PDF spec is `F`.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.JavaScriptAction} onFormat
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the pointer is pressed.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.Action} onPointerDown
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the pointer is released.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.Action} onPointerUp
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the pointer hovers the field.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.Action} onPointerEnter
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the pointer leaves the field area.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Actions.Action} onPointerLeave
 * @memberof PSPDFKit.WidgetAnnotationAdditionalActions
 */
/**
 * The counter-clockwise rotation value in degree relative to the rotated PDF page. Inserting an
 * annotation with a rotation value of `0` will make it appear in the same direction as the UI
 * appears, when no {@link PSPDFKit.ViewState#pagesRotation} is set.
 *
 * Can either be 0°, 90°, 180°, or 270°. Multiple or negative values are normalized to this
 * interval.
 *
 * Note: Due to browser constraints, the rotation property is currently reset once the edit mode
 *       is enabled via the user interface.
 *
 * @public
 * @instance
 * @member {number} rotation
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 * @default 0
 */
/**
 * This property is used to define the permission scope for this widget annotation.
 * If you want to change the `group`, you should update the `group` property of the corresponding form field.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @readonly
 * @instance
 * @member {string} group
 * @memberof PSPDFKit.Annotations.WidgetAnnotation
 */
declare class WidgetAnnotation<T extends IWidgetAnnotation = IWidgetAnnotation> extends Annotation<T> {
    formFieldName: string;
    borderColor: null | Color;
    borderStyle: null | IBorderStyle;
    borderDashArray: null | number[];
    borderWidth: null | number;
    backgroundColor: null | Color;
    fontSize: null | FontSize;
    font: null | string;
    fontColor: null | Color;
    isBold: boolean;
    isItalic: boolean;
    horizontalAlign: 'left' | 'center' | 'right' | null;
    verticalAlign: 'top' | 'center' | 'bottom' | null;
    additionalActions: null | WidgetAnnotationAdditionalActionsType;
    rotation: number;
    lineHeightFactor: null | number;
    action: null | Action;
    buttonIconUpdatedAt: null | number;
    static defaultValues: IObject;
    static readableName: string;
}

/**
 * @classdesc
 * Annotation specific to PSPDFKit that defines a general root annotation type
 * for comments to originate from, which can be placed at an arbitrary location
 * in the document.
 *
 * See our
 * {@link https://pspdfkit.com/guides/web/current/comments/introduction-to-instant-comments/|Instant Comments guide article}.
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Root annotation used for comments.
 * @class CommentMarkerAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 */
declare class CommentMarkerAnnotation extends Annotation {
    static readableName: string;
}

interface IRedactionAnnotation extends ITextMarkupAnnotation {
    color: Color;
    fillColor: null | Color;
    overlayText: null | string;
    repeatOverlayText: null | boolean;
    outlineColor: null | Color;
}
/**
 * @classdesc
 * Redaction annotations are used to mark regions of content or text of the
 * document to eventually redact (i.e. remove the content from the document
 * in an irreversible way).
 *
 * You can customize how a redaction annotation looks in its marked state,
 * which is when the redaction hasn't been applied yet, and the redacted
 * state, that is the final appearance that the redacted region will have.
 *
 * The `fillColor`, `overlayText`, `color` and `repeatOverlayText` influence
 * the redacted appearance, while `outlineColor` influences the marked
 * appearance.
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Mark a region for redaction.
 * @class RedactionAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.MarkupAnnotation
 */
/**
 * Background color of the redacted area.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} fillColor
 * @memberof PSPDFKit.Annotations.RedactionAnnotation
 * @default PSPDFKit.Color.BLACK
 */
/**
 * Text to be displayed at the specified region
 * when a redaction has been applied.
 *
 * @public
 * @instance
 * @member {?string} overlayText
 * @memberof PSPDFKit.Annotations.RedactionAnnotation
 */
/**
 * Whether the overlay text should be repeated
 * to fill the entire redaction area or just
 * be drawn once.
 *
 * It has no effect if there is no overlay text
 * specified.
 *
 * @public
 * @instance
 * @member {?boolean} repeatOverlayText
 * @memberof PSPDFKit.Annotations.RedactionAnnotation
 * @default false
 */
/**
 * Color of the overlay text.
 *
 * It has no effect if there is no overlay text
 * specified.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} color
 * @memberof PSPDFKit.Annotations.RedactionAnnotation
 * @default PSPDFKit.Color.RED
 */
/**
 * Color used for the redaction's border in its
 * marked state.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} outlineColor
 * @memberof PSPDFKit.Annotations.RedactionAnnotation
 * @default PSPDFKit.Color.RED
 */
declare class RedactionAnnotation<T extends IRedactionAnnotation = IRedactionAnnotation> extends TextMarkupAnnotation<T> {
    fillColor: null | Color;
    overlayText: null | string;
    repeatOverlayText: null | boolean;
    outlineColor: null | Color;
    color: Color;
    static readableName: string;
    static defaultValues: IObject;
}

interface IMediaAnnotation extends AnnotationProperties {
    description: null | string;
    fileName: null | string;
    contentType: string | null;
    mediaAttachmentId: string | null;
}
/**
 * @classdesc
 * Media Annotations specifies a region of a page upon which media clips may be played.
 *
 * With PSPDFKit for Web you can display and delete Media Annotations, meanwhile creating them is not supported.
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display a media file in a document.
 * @class MediaAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 */
/**
 * A description of the media content.
 *
 * @public
 * @instance
 * @member {?string} description
 * @memberof PSPDFKit.Annotations.MediaAnnotation
 */
/**
 * The file name of the attached file.
 *
 * @public
 * @instance
 * @member {?string} fileName
 * @memberof PSPDFKit.Annotations.MediaAnnotation
 */
/**
 * The content type of the connected attachment data. We expect it to be a MIME type (mp4, video, etc..).
 *
 * @public
 * @instance
 * @member {string} contentType
 * @memberof PSPDFKit.Annotations.MediaAnnotation
 */
/**
 * The attachment identifier of the media. It holds the media data as binary.
 *
 * @public
 * @instance
 * @member {string} mediaAttachmentId
 * @memberof PSPDFKit.Annotations.MediaAnnotation
 */
declare class MediaAnnotation<T extends IMediaAnnotation = IMediaAnnotation> extends Annotation<T> {
    description: null | string;
    fileName: null | string;
    contentType: string | null;
    mediaAttachmentId: string | null;
    static defaultValues: IObject;
    static readableName: string;
}

/**
 * Describes and persists the properties of a digital signature.
 *
 * @public
 * @property {string} type="pspdfkit/signature-info"
 * @property {?PSPDFKit.SignatureType} signatureType - Type of the signature: CMS, CAdES or Document Timestamp.
 * @property {?string} signerName - Signer's name.
 * @property {?string} creationDate - Date of the signature.
 * @property {?string} signatureReason - Purpose of the signature.
 * @property {?string} signatureLocation - Location where the signature has taken place.
 * @property {PSPDFKit.DocumentIntegrityStatus} documentIntegrityStatus - The different signature validation states the document can be in.
 * @property {PSPDFKit.CertificateChainValidationStatus} certificateChainValidationStatus - The different possible validation states of the certificate chain.
 * @property {PSPDFKit.SignatureValidationStatus} signatureValidationStatus - The different possible validation states of the signature.
 * @property {boolean} isTrusted - The signing certificate has been explicitly marked as trusted by the certificate store.
 * @property {boolean} isSelfSigned - The signing certificate is self-signed.
 * @property {boolean} isExpired - The signing certificate is expired.
 * @property {boolean} documentModifiedSinceSignature - The document has been modified since this signature has been added to it. Depending on the uncovered changes, the signature may be "valid with modifications", or "invalid".
 * @property {string} signatureFormFQN - The fully qualified name of the signature form field.
 * @property {?PSPDFKit.PAdESLevel} PAdESSignatureLevel - The PAdES level of the signature.
 * @property {?string} validFrom - The date from which the signature is valid.
 * @property {?string} validUntil - The date until which the signature is valid.
 * @property {?object} timestampInfo - Information about the timestamp of the signature.
 * @property {?string} timestampInfo.signerName - The name of the authority that issued a timestamp.
 * @property {?string} timestampInfo.type="pspdfkit/timestamp-info"
 * @property {boolean} ltv - Whether the signature is LTV enabled.
 * @summary Information from an individual signature.
 * @interface SignatureInfo
 * @memberof PSPDFKit
 */
type SignatureInfo = {
    type: 'pspdfkit/signature-info';
    signatureType?: SignatureTypeType | null | undefined;
    signerName: string | null | undefined;
    creationDate: Date | null | undefined;
    signatureReason: string | null | undefined;
    signatureLocation: string | null | undefined;
    documentIntegrityStatus: DocumentIntegrityStatusType;
    certificateChainValidationStatus: CertificateChainValidationStatusType;
    signatureValidationStatus: SignatureValidationStatusType;
    isTrusted: boolean;
    isSelfSigned: boolean;
    isExpired: boolean;
    documentModifiedSinceSignature: boolean;
    signatureFormFQN: string;
    PAdESSignatureLevel?: PAdESLevelType | null;
    validFrom: string | null | undefined;
    validUntil: string | null | undefined;
    timestampInfo: {
        type: 'pspdfkit/timestamp-info';
        signerName: string | null | undefined;
    };
    ltv: boolean;
};
/**
 * The different signature validation states the document can be in.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @enum
 */
declare const DocumentIntegrityStatus: {
    /**
     * The part of the document covered by the signature has not been modified.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly ok: "ok";
    /**
     * The part of the document covered by the signature has been modified.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly tampered_document: "tampered_document";
    /**
     * The signature /Contents couldn't be parsed.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
    /**
     * The signature /ByteRange couldn't be parsed.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly failed_to_retrieve_byterange: "failed_to_retrieve_byterange";
    /**
     * The digest of the document couldn't be calculated.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly failed_to_compute_digest: "failed_to_compute_digest";
    /**
     * The signing certificate from the signature contents couldn't be extracted.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly failed_retrieve_signing_certificate: "failed_retrieve_signing_certificate";
    /**
     * The public key from the signature contents couldn't be extracted.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly failed_retrieve_public_key: "failed_retrieve_public_key";
    /**
     * The encryption padding from the signature contents couldn't be extracted.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly failed_encryption_padding: "failed_encryption_padding";
    /**
     * The digital signature contains a timestamp that is not valid or the timestamped data was tampered with.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly tampered_or_invalid_timestamp: "tampered_or_invalid_timestamp";
    /**
     * An unspecific error.
     *
     * @public
     * @type {PSPDFKit.DocumentIntegrityStatus}
     */
    readonly general_failure: "general_failure";
};
type DocumentIntegrityStatusType = (typeof DocumentIntegrityStatus)[keyof typeof DocumentIntegrityStatus];
/**
 * The different possible validation states of the certificate chain.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @enum
 */
declare const CertificateChainValidationStatus: {
    /**
     * The certificate chain validates correctly.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly ok: "ok";
    /**
     * The certificate chain contains a self-signed certificate.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly ok_but_self_signed: "ok_but_self_signed";
    /**
     * Revocation check network error. Either due to invalid server URL or network timeout.
     * The certificate is valid with a warning.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly ok_but_could_not_check_revocation: "ok_but_could_not_check_revocation";
    /**
     * The certificate chain contains a certificate that has been classified as "untrusted".
     *
     * The certificate date is correct, but the identity is unknown because it has not been
     * included in the list of trusted certificates and none of its parents are trusted
     * certificates.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly untrusted: "untrusted";
    /**
     * The certificate used to sign the document has expired now.
     * Note that the certificate may be valid at the time the document was signed,
     * which is not checked.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly expired: "expired";
    /**
     * The certificate used to sign the document is not valid yet.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly not_yet_valid: "not_yet_valid";
    /**
     * The certificate is not valid.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly invalid: "invalid";
    /**
     * The certificate has been revoked.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly revoked: "revoked";
    /**
     * Could not fetch the contents of the signature.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
    /**
     * An unknown problem happened when the certificate trust chain was validated.
     *
     * Between the possible reasons for this could be that the signature is malformed,
     * the certificate chain is too long and other unknown conditions.
     *
     * @public
     * @type {PSPDFKit.CertificateChainValidationStatus}
     */
    readonly general_validation_problem: "general_validation_problem";
};
type CertificateChainValidationStatusType = (typeof CertificateChainValidationStatus)[keyof typeof CertificateChainValidationStatus];
/**
 * The different possible validation states of the signature.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @enum
 */
declare const SignatureValidationStatus: {
    /**
     * The overall status of the signature is valid, that is, it should be shown with a green checkmark
     * or similar in the UI.
     *
     * @public
     * @type {PSPDFKit.SignatureValidationStatus}
     */
    readonly valid: "valid";
    /**
     * The overall status of the signature is valid with concerns, that is, it should be shown with
     * a yellow warning or similar in the UI.
     *
     * @public
     * @type {PSPDFKit.SignatureValidationStatus}
     */
    readonly warning: "warning";
    /**
     * The overall status of the signature is that it is invalid, that is, it should be shown with
     * a red cross of similar in the UI.
     *
     * @public
     * @type {PSPDFKit.SignatureValidationStatus}
     */
    readonly error: "error";
};
type SignatureValidationStatusType = (typeof SignatureValidationStatus)[keyof typeof SignatureValidationStatus];
/**
 * The different types of digital signatures.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @enum
 */
declare const SignatureType: {
    /**
     * CMS
     *
     * @public
     * @type {PSPDFKit.SignatureType}
     */
    CMS: string;
    /**
     * CAdES
     *
     * @public
     * @type {PSPDFKit.SignatureType}
     */
    CAdES: string;
};
type SignatureTypeType = (typeof SignatureType)[keyof typeof SignatureType];
/**
 * The different PAdES levels.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @enum
 */
declare const PAdESLevel: {
    /**
     * B-B
     *
     * @public
     * @type {PSPDFKit.PAdESLevel}
     */
    readonly b_b: "b-b";
    /**
     * B-T
     *
     * @public
     * @type {PSPDFKit.PAdESLevel}
     */
    readonly b_t: "b-t";
    /**
     * B-LT
     *
     * @public
     * @type {PSPDFKit.PAdESLevel}
     */
    readonly b_lt: "b-lt";
};
type PAdESLevelType = (typeof PAdESLevel)[keyof typeof PAdESLevel];

/**
 * Describes and persists the overall validation status of the document, based on the
 * digital signatures it contains.
 *
 * The information contained in the digital signatures included in a document
 * can be extracted using {@link PSPDFKit.Instance#getSignaturesInfo()}, which resolves with
 * a `PSPDFKit.SignaturesInfo` object. This object represent the overall validation status
 * of the document. For getting information about each individual signature from the document,
 * an array of {@link PSPDFKit.SignatureInfo} is included under the `signatures` property.
 *
 * To learn more about digital signatures validation check
 * {@link https://pspdfkit.com/guides/web/current/digital-signatures/digital-signatures-on-web/#digital-signatures-validation|this guide article}.
 *
 * @example <caption>Getting digital signatures data from a document</caption>
 * instance.getSignaturesInfo()
 *   .then(function (signaturesInfo) {
 *      console.log(signaturesInfo)
 *   });
 * @public
 * @property {PSPDFKit.DocumentValidationStatus} status - The different possible validation states of the document.
 * @property {Array<PSPDFKit.SignatureInfo>} signatures - Array with the properties of each digital signature.
 * @property {boolean} documentModifiedSinceSignature - The document has been modified since the last signature was added to it.
 * @summary Digital signatures validation information.
 * @interface SignaturesInfo
 * @memberof PSPDFKit
 * @seealso PSPDFKit.Instance#getSignaturesInfo PSPDFKit.ViewState#showSignatureValidationStatus
 * @seealso PSPDFKit.Configuration#trustedCAsCallback
 */
type SignaturesInfo = {
    status: DocumentValidationStatusType;
    checkedAt: Date;
    signatures?: Array<SignatureInfo>;
    documentModifiedSinceSignature?: boolean;
};
/**
 * The different possible validation states of the document. Based on the validation
 * of the digital signatures it contains.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @enum
 */
declare const DocumentValidationStatus: {
    /**
     * All of the signatures of the document are valid, that is, it should be shown with a green
     * checkmark or similar in the UI.
     *
     * @public
     * @type {PSPDFKit.DocumentValidationStatus}
     */
    valid: string;
    /**
     * All of the signatures of the document are valid with concerns, that is, it should be shown with
     * a yellow warning or similar in the UI.
     *
     * @public
     * @type {PSPDFKit.DocumentValidationStatus}
     */
    warning: string;
    /**
     * At least one signature of the document is invalid, that is, it should be shown with
     * a red cross of similar in the UI.
     *
     * @public
     * @type {PSPDFKit.DocumentValidationStatus}
     */
    error: string;
    /**
     * The document does not contain digital signatures.
     *
     * @public
     * @type {PSPDFKit.DocumentValidationStatus}
     */
    not_signed: string;
};
type DocumentValidationStatusType = keyof typeof DocumentValidationStatus;

type Glyph = {
    c: string;
    rect: Rect;
};

type IAnnotationJSON = Omit<BaseAnnotationJSON, 'id' | 'group' | 'permissions'>;
declare class AnnotationSerializer {
    static VERSION: number;
    annotation: AnnotationsUnion;
    constructor(annotation: AnnotationsUnion);
    toJSON(): Omit<BaseAnnotationJSON, 'type'>;
    static fromJSON(id: ID | null, json: IAnnotationJSON, options?: ICollaboratorPermissionsOptions): {
        group?: string | null | undefined;
        canSetGroup?: boolean | undefined;
        isEditable?: boolean | undefined;
        isDeletable?: boolean | undefined;
        blendMode?: IBlendMode | undefined;
        id: string | null;
        name: string | null;
        subject: string | null;
        pdfObjectId: number | null;
        pageIndex: number;
        opacity: number;
        boundingBox: Rect;
        noPrint: boolean;
        noZoom: boolean;
        noRotate: boolean;
        noView: boolean;
        hidden: boolean;
        locked: boolean;
        lockedContents: boolean;
        readOnly: boolean;
        action: Action | null | undefined;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        creatorName: string | null;
        customData: Record<string, unknown> | null;
        isCommentThreadRoot: boolean;
        isAnonymous: boolean;
    };
    static blendModeObjectForAnnotation(json: IAnnotationJSON): {
        blendMode: IBlendMode;
    } | null;
    serializeFlags(): ("hidden" | "noView" | "noPrint" | "locked" | "lockedContents" | "readOnly" | "noZoom" | "noRotate")[] | null;
}

declare class InkAnnotationSerializer extends AnnotationSerializer {
    annotation: InkAnnotation;
    constructor(annotation: InkAnnotation);
    toJSON(): InkAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<InkAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): InkAnnotation;
    _linesToJSON(): {
        points: [number, number][][];
        intensities: number[][];
    };
    static _JSONToLines(linesJSON: {
        points: Array<Array<[number, number]>>;
        intensities: Array<Array<number>>;
    }): List<List<DrawingPoint>>;
}

declare abstract class ShapeAnnotationSerializer extends AnnotationSerializer {
    annotation: ShapeAnnotationsUnion;
    toJSON(): ShapeAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<ShapeAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): {
        strokeWidth: number | null;
        strokeColor: Color | null;
        fillColor: Color | null;
        strokeDashArray: [number, number] | null | undefined;
        measurementPrecision: IMeasurementPrecision | null | undefined;
        measurementScale: MeasurementScale | null;
        group?: string | null | undefined;
        canSetGroup?: boolean | undefined;
        isEditable?: boolean | undefined;
        isDeletable?: boolean | undefined;
        blendMode?: IBlendMode | undefined;
        id: string | null;
        name: string | null;
        subject: string | null;
        pdfObjectId: number | null;
        pageIndex: number;
        opacity: number;
        boundingBox: Rect;
        noPrint: boolean;
        noZoom: boolean;
        noRotate: boolean;
        noView: boolean;
        hidden: boolean;
        locked: boolean;
        lockedContents: boolean;
        readOnly: boolean;
        action: Action | null | undefined;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        creatorName: string | null;
        customData: Record<string, unknown> | null;
        isCommentThreadRoot: boolean;
        isAnonymous: boolean;
    };
    _pointsToJSON(): Array<[number, number]>;
    static _JSONToPoints(pointsJSON: Array<[number, number]>): List<Point>;
    static _JSONLinesToPoints(linesJSON: {
        points: Array<Array<[number, number]>>;
        intensities: Array<Array<number>>;
    }): List<Point>;
}
type MeasurementScaleJSON = {
    unitFrom: IMeasurementScaleUnitFrom;
    unitTo: IMeasurementScaleUnitTo;
    from: number;
    to: number;
};

declare class LineAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: LineAnnotation;
    toJSON(): LineAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<LineAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): LineAnnotation;
}

declare class RectangleAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: RectangleAnnotation;
    toJSON(): RectangleAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<RectangleAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): RectangleAnnotation;
}

declare class EllipseAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: EllipseAnnotation;
    toJSON(): EllipseAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<EllipseAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): EllipseAnnotation;
}

declare class PolygonAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: PolygonAnnotation;
    toJSON(): PolygonAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<PolygonAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: IObject): PolygonAnnotation;
}

declare class PolylineAnnotationSerializer extends ShapeAnnotationSerializer {
    annotation: PolylineAnnotation;
    toJSON(): PolylineAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<PolylineAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): PolylineAnnotation;
}

declare class LinkAnnotationSerializer extends AnnotationSerializer {
    annotation: LinkAnnotation;
    constructor(annotation: LinkAnnotation);
    toJSON(): LinkAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<LinkAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): LinkAnnotation;
}

declare abstract class BaseTextMarkupSerializer extends AnnotationSerializer {
    annotation: RedactionAnnotation | TextMarkupAnnotation;
    constructor(annotation: RedactionAnnotation | TextMarkupAnnotation);
    toJSON(): BaseTextMarkupAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<BaseTextMarkupAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): {
        rects: List<Rect>;
        group?: string | null | undefined;
        canSetGroup?: boolean | undefined;
        isEditable?: boolean | undefined;
        isDeletable?: boolean | undefined;
        blendMode?: IBlendMode | undefined;
        id: string | null;
        name: string | null;
        subject: string | null;
        pdfObjectId: number | null;
        pageIndex: number;
        opacity: number;
        boundingBox: Rect;
        noPrint: boolean;
        noZoom: boolean;
        noRotate: boolean;
        noView: boolean;
        hidden: boolean;
        locked: boolean;
        lockedContents: boolean;
        readOnly: boolean;
        action: Action | null | undefined;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        creatorName: string | null;
        customData: Record<string, unknown> | null;
        isCommentThreadRoot: boolean;
        isAnonymous: boolean;
    };
}

declare class TextMarkupAnnotationSerializer extends BaseTextMarkupSerializer {
    annotation: TextMarkupAnnotationsUnion;
    constructor(annotation: TextMarkupAnnotationsUnion);
    toJSON(): TextMarkupAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<TextMarkupAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): TextMarkupAnnotationsUnion;
    typeForAnnotation(): "pspdfkit/markup/highlight" | "pspdfkit/markup/squiggly" | "pspdfkit/markup/strikeout" | "pspdfkit/markup/underline" | "pspdfkit/markup/redaction";
}

declare class RedactionAnnotationSerializer extends BaseTextMarkupSerializer {
    annotation: RedactionAnnotation;
    constructor(annotation: RedactionAnnotation);
    toJSON(): RedactionAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<RedactionAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): RedactionAnnotation;
}

declare class TextAnnotationSerializer extends AnnotationSerializer {
    annotation: TextAnnotation;
    constructor(annotation: TextAnnotation);
    toJSON(): TextAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<TextAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): TextAnnotation;
    _calloutToJSON(): {
        start: [number, number];
        knee: [number, number] | null;
        end: [number, number];
        cap: ILineCap | null;
        innerRectInset: InsetJSON | null;
    } | null;
    static _JSONToCallout(calloutJSON: TextAnnotationJSON['callout']): Callout | null | undefined;
}

declare class NoteAnnotationSerializer extends AnnotationSerializer {
    annotation: NoteAnnotation;
    constructor(annotation: NoteAnnotation);
    toJSON(): NoteAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<NoteAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): NoteAnnotation;
}

declare class ImageAnnotationSerializer extends AnnotationSerializer {
    annotation: ImageAnnotation;
    constructor(annotation: ImageAnnotation);
    toJSON(): ImageAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<ImageAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): ImageAnnotation;
}

declare class StampAnnotationSerializer extends AnnotationSerializer {
    annotation: StampAnnotation;
    constructor(annotation: StampAnnotation);
    toJSON(): StampAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<StampAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): StampAnnotation;
}

declare class WidgetAnnotationSerializer extends AnnotationSerializer {
    annotation: WidgetAnnotation;
    constructor(annotation: WidgetAnnotation);
    toJSON(): WidgetAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<WidgetAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): WidgetAnnotation;
}

type InstantID = string;
declare function generateInstantId(): InstantID;

declare class CommentMarkerAnnotationSerializer extends AnnotationSerializer {
    annotation: CommentMarkerAnnotation;
    constructor(annotation: CommentMarkerAnnotation);
    toJSON(): CommentMarkerAnnotationJSON;
    static fromJSON(id: InstantID | null, json: Omit<CommentMarkerAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): CommentMarkerAnnotation;
}

declare class UnknownAnnotationSerializer extends AnnotationSerializer {
    annotation: UnknownAnnotation;
    constructor(annotation: UnknownAnnotation);
    toJSON(): UnknownAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<UnknownAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): UnknownAnnotation;
}

declare class MediaAnnotationSerializer extends AnnotationSerializer {
    annotation: MediaAnnotation;
    constructor(annotation: MediaAnnotation);
    toJSON(): MediaAnnotationJSON;
    static fromJSON(id: ID | null, json: Omit<MediaAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): MediaAnnotation;
}

type AnnotationSerializerTypeMap = {
    'pspdfkit/ink': {
        serializer: InkAnnotationSerializer;
        annotation: InkAnnotation;
        json: InkAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<InkAnnotationJSON>;
    };
    'pspdfkit/shape/line': {
        serializer: LineAnnotationSerializer;
        annotation: LineAnnotation;
        json: LineAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<LineAnnotationJSON>;
    };
    'pspdfkit/shape/rectangle': {
        serializer: RectangleAnnotationSerializer;
        annotation: RectangleAnnotation;
        json: RectangleAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<RectangleAnnotationJSON>;
    };
    'pspdfkit/shape/ellipse': {
        serializer: EllipseAnnotationSerializer;
        annotation: EllipseAnnotation;
        json: EllipseAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<EllipseAnnotationJSON>;
    };
    'pspdfkit/shape/polygon': {
        serializer: PolygonAnnotationSerializer;
        annotation: PolygonAnnotation;
        json: PolygonAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<PolygonAnnotationJSON>;
    };
    'pspdfkit/shape/polyline': {
        serializer: PolylineAnnotationSerializer;
        annotation: PolylineAnnotation;
        json: PolylineAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<PolylineAnnotationJSON>;
    };
    'pspdfkit/link': {
        serializer: LinkAnnotationSerializer;
        annotation: LinkAnnotation;
        json: LinkAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<LinkAnnotationJSON>;
    };
    'pspdfkit/markup/highlight': {
        serializer: TextMarkupAnnotationSerializer;
        annotation: HighlightAnnotation;
        json: TextMarkupAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;
    };
    'pspdfkit/markup/squiggly': {
        serializer: TextMarkupAnnotationSerializer;
        annotation: SquiggleAnnotation;
        json: TextMarkupAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;
    };
    'pspdfkit/markup/strikeout': {
        serializer: TextMarkupAnnotationSerializer;
        annotation: StrikeOutAnnotation;
        json: TextMarkupAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;
    };
    'pspdfkit/markup/underline': {
        serializer: TextMarkupAnnotationSerializer;
        annotation: UnderlineAnnotation;
        json: TextMarkupAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;
    };
    'pspdfkit/markup/redaction': {
        serializer: RedactionAnnotationSerializer;
        annotation: RedactionAnnotation;
        json: RedactionAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<RedactionAnnotationJSON>;
    };
    'pspdfkit/text': {
        serializer: TextAnnotationSerializer;
        annotation: TextAnnotation;
        json: TextAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<TextAnnotationJSON>;
    };
    'pspdfkit/note': {
        serializer: NoteAnnotationSerializer;
        annotation: NoteAnnotation;
        json: NoteAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<NoteAnnotationJSON>;
    };
    'pspdfkit/image': {
        serializer: ImageAnnotationSerializer;
        annotation: ImageAnnotation;
        json: ImageAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<ImageAnnotationJSON>;
    };
    'pspdfkit/stamp': {
        serializer: StampAnnotationSerializer;
        annotation: StampAnnotation;
        json: StampAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<StampAnnotationJSON, 'color'>;
    };
    'pspdfkit/widget': {
        serializer: WidgetAnnotationSerializer;
        annotation: WidgetAnnotation;
        json: WidgetAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<WidgetAnnotationJSON>;
    };
    'pspdfkit/comment-marker': {
        serializer: CommentMarkerAnnotationSerializer;
        annotation: CommentMarkerAnnotation;
        json: CommentMarkerAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<CommentMarkerAnnotationJSON>;
    };
    'pspdfkit/unknown': {
        serializer: UnknownAnnotationSerializer;
        annotation: UnknownAnnotation;
        json: UnknownAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<UnknownAnnotationJSON>;
    };
    'pspdfkit/media': {
        serializer: MediaAnnotationSerializer;
        annotation: MediaAnnotation;
        json: MediaAnnotationJSON;
        jsonForBackend: AnnotationBackendJSON<MediaAnnotationJSON>;
    };
};
type GetTypeFromAnnotationJSON<T extends {
    type: keyof AnnotationSerializerTypeMap;
}> = T extends {
    type: infer U;
} ? U : never;
type AnnotationJSONToAnnotation<T extends {
    type: keyof AnnotationSerializerTypeMap;
}> = AnnotationSerializerTypeMap[GetTypeFromAnnotationJSON<T>]['annotation'];
type Intersection<T, U> = T extends U ? T : never;
type BackendRequiredKeys = 'id' | 'v' | 'pageIndex' | 'type' | 'bbox';
type AnnotationBackendJSON<K extends BaseAnnotationJSON = AnnotationJSONUnion, R extends string = never> = {
    [P in keyof K]?: NonNullable<K[P]>;
} & {
    [P in Intersection<keyof K, BackendRequiredKeys | R>]-?: Exclude<NonNullable<K[P]>, undefined>;
};
type AnnotationsUnion = {
    [K in keyof AnnotationSerializerTypeMap]: AnnotationSerializerTypeMap[K]['annotation'];
}[keyof AnnotationSerializerTypeMap];
type AnnotationsUnionClass = {
    [K in keyof AnnotationSerializerTypeMap]: Class<AnnotationSerializerTypeMap[K]['annotation']>;
}[keyof AnnotationSerializerTypeMap];
type ShapeAnnotationsUnion = PolylineAnnotation | PolygonAnnotation | LineAnnotation | RectangleAnnotation | EllipseAnnotation;
type AnnotationsBackendJSONUnion = {
    [K in keyof AnnotationSerializerTypeMap]: AnnotationSerializerTypeMap[K]['jsonForBackend'];
}[keyof AnnotationSerializerTypeMap];
type TextMarkupAnnotationsUnion = HighlightAnnotation | UnderlineAnnotation | StrikeOutAnnotation | SquiggleAnnotation | RedactionAnnotation;

type CommentJSON = {
    id?: string | null;
    type: 'pspdfkit/comment';
    v: 2;
    rootId: string | number | null;
    pageIndex: number | null;
    pdfObjectId?: number | null;
    creatorName?: string | null;
    name?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    text: {
        value: string | null;
        format: 'xhtml' | 'plain';
    };
    customData?: {
        [key: string]: unknown;
    } | null;
    isAnonymous?: boolean | null;
} & ICollaboratorPermissionsOptions;

type CommentProps = {
    id: InstantID | null;
    rootId: InstantID | null;
    pageIndex: null | number;
    pdfObjectId: number | null;
    creatorName: string | null;
    createdAt: Date;
    updatedAt: Date;
    text: {
        format: 'plain' | 'xhtml';
        value: string | null;
    };
    customData: Record<string, unknown> | null;
    group?: string | null;
    isEditable?: boolean;
    isDeletable?: boolean;
    canSetGroup?: boolean;
    isAnonymous?: boolean | null;
};
declare const Comment_base: Record$1.Factory<CommentProps>;
/**
 * @classdesc
 * A text comment made by the user that stems from an existing root annotation.
 * @public
 * @memberof PSPDFKit
 * @summary Comment element.
 * @class Comment
 * @noconstructor
 * @extends Immutable.Record
 */
/**
 * A unique identifier for the comment. When comment is created in the UI, the
 * viewer has to generate a unique ID.
 *
 * @public
 * @instance
 * @member {InstantID} id
 * @memberof PSPDFKit.Comment
 */
/**
 * The ID of the annotation that this comment stems from. In PSPDFKit for Web,
 * this should be either a {@link PSPDFKit.Annotations.MarkupAnnotation} or
 * a {@link PSPDFKit.Annotations.CommentMarkerAnnotation}.
 *
 * @public
 * @instance
 * @member {InstantID} rootId
 * @memberof PSPDFKit.Comment
 */
/**
 * The page index that this comment resides at.
 *
 * @public
 * @instance
 * @member {number} pageIndex
 * @memberof PSPDFKit.Comment
 */
/**
 * If this comment is from the original PDF, then this ID is from that PDF
 * note annotation that defined the comment.
 *
 * @public
 * @instance
 * @member {number} pdfObjectId
 * @memberof PSPDFKit.Comment
 */
/**
 * The name of the person who created the comment.
 *
 * @public
 * @instance
 * @member {string} creatorName
 * @memberof PSPDFKit.Comment
 */
/**
 * The time when the comment was created.
 *
 * @public
 * @instance
 * @member {Date} createdAt
 * @memberof PSPDFKit.Comment
 */
/**
 * The time when the comment was last updated.
 *
 * @public
 * @instance
 * @member {Date} updatedAt
 * @memberof PSPDFKit.Comment
 */
/**
 * The text of the comment in xhtml/plain text format.
 *
 * In case of XHTML, we support the following tags:
 * - `<b>`: Bold
 * - `<i>`: Italic
 * - `<span>`: Font color, background color and underline using the `style` attribute (e.g. `<span style="color: red; background-color: blue; text-decoration: underline">Hello</span>`)
 * - `p`: Paragraph. You can use this to add a newline between paragraphs.
 * - `a`: Link. You can use this to add a link to the comment. The `href` attribute is required.
 *
 * @public
 * @instance
 * @member {Text} text
 * @memberof PSPDFKit.Comment
 */
/**
 * Arbitrary JSON-serializable data the user can attach to the comment.
 *
 * @public
 * @instance
 * @member {object} customData
 * @memberof PSPDFKit.Comment
 */
/**
 * This property is used to define the permission scope for a particular comment.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @instance
 * @member {string} group
 * @memberof PSPDFKit.Comment
 */
/**
 * This property defines whether this comment can be edited or not.
 * The value of this field depends on the set of collaboration permissions defined in the JWT token.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @readonly
 * @instance
 * @member {boolean} isEditable
 * @memberof PSPDFKit.Comment
 */
/**
 * This property defines whether this comment can be deleted or not.
 * The value of this field depends on the set of collaboration permissions defined in the JWT token.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @readonly
 * @instance
 * @member {boolean} isDeletable
 * @memberof PSPDFKit.Comment
 */
/**
 * This property defines whether the user has permission to edit the group of this comment.
 * The value of this field depends on the set of collaboration permissions defined in the JWT token.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @readonly
 * @instance
 * @member {boolean} canSetGroup
 * @memberof PSPDFKit.Comment
 */
/**
 * A method that returns a set of user IDs that are mentioned in the comment.
 *
 * @example
 * const ids = comment.getMentionedUserIds()
 * @public
 * @instance
 * @function getMentionedUserIds
 * @returns {Immutable.Set<string>} A immutable set of user IDs that are mentioned in the comment.
 * @memberof PSPDFKit.Comment
 */
/**
 * Comment serializer. Converts a comment to a InstantJSON compliant object.
 *
 * @public
 * @function toSerializableObject
 * @memberof PSPDFKit.Comment
 * @param {PSPDFKit.Comment}
 * @returns {object}
 */
/**
 * Comment deserializer. Converts a comment object to a {@link PSPDFKit.Comment}.
 *
 * @public
 * @function fromSerializableObject
 * @memberof PSPDFKit.Comment
 * @param {object}
 * @returns {PSPDFKit.Comment}
 */
declare class Comment extends Comment_base {
    static toSerializableObject: (comment: Comment) => CommentJSON;
    static fromSerializableObject: (comment: CommentJSON) => Comment;
    getMentionedUserIds(): Set$1<string>;
}
/**
 * @public
 * @typedef {object} MentionableUser
 * @property {string} id - The unique ID of the user.
 * @property {string} name - The name of the user.
 * @property {string} [avatarUrl] - The URL of the user's avatar.
 * @property {string} displayName - The display name of the user.
 * @property {string} [description] - The description of the user. This is shown in the mention list. If you want to show the email, you can pass it here.
 */
type MentionableUser = {
    id: string;
    name: string;
    avatarUrl?: string;
    displayName: string;
    description?: string;
};

type IGroup = string | null | undefined;
type IPermissions = {
    edit: boolean;
    delete: boolean;
    setGroup: boolean;
    fill?: boolean;
    reply?: boolean;
};

type ICollaboratorPermissionsOptions = {
    group?: IGroup;
    permissions?: IPermissions;
};

type SerializedAdditionalActionsType = {
    [key in ActionTriggerEventType | FormFieldEventTriggerType | FormFieldInputEventTriggerType | WidgetActionTriggerEventType as string]?: {
        type: string;
        [key: string]: unknown;
    };
};

/**
 * Describes the fonts that you would like to substitute in a document and the fonts you would like to use for that substitution
 *
 * Patterns are matched using the following rules:
 * - `*` matches multiple characters.
 * - `?` matches a single character.
 *
 * **Ordering matters** - As names could match multiple patterns, it's important to note that the order of the patterns matters.
 * **Case-insensitive** - Both the pattern and the target name are case-insensitive.
 *
 *
 * @public
 * @summary An array of fonts to be substituted and the fonts to substitute them with
 * @memberof PSPDFKit
 * @typedef {object} FontSubstitution
 * @property {string} pattern The font you would like to be substituted
 * @property {string} target  The font you would like to substitute the "from" font with
 * @example <caption>Substitute all Noto fonts found in the document with AwesomeFont</caption>
 *
 * const myFontsSubstitutions = [{
 *  pattern: "Noto*",
 *  target: "AwesomeFont"
 * }]
 *
 * PSPDFKit.load(
 *  //...
 *  fontSubstitutions: myFontsSubstitutions,
 * )
 */
type FontSubstitution = {
    pattern: string;
    target: string;
};

/**
 * PSPDFKit for Web allows you to pass a customized configuration for measurements annotation scale and precision through the following callback
 *
 * @public
 * @memberof PSPDFKit
 * @callback MeasurementValueConfigurationCallback
 * @typedef {object} MeasurementValueConfiguration
 * @property {string} name - Your custom configuration name. It has to be unique.
 * @property {IMeasurementScale} scale - The custom scale passed in the configuration, it represent the scale used in the document
 * @seealso PSPDFKit.MeasurementScale
 * @property {IMeasurementPrecision} precision - Precision values for the length of measurement annotations
 * @seealso PSPDFKit#.MeasurementPrecision
 * @property {?boolean} selected - Whether a custom scale is selected or not.
 *
 * @example <caption>Configure a custom scale and pass it to our viewer</caption>
 *
 * const customScales = [
 *   {
 *     scale: {
 *       unitFrom: PSPDFKit.MeasurementScaleUnitFrom.CENTIMETERS,
 *       unitTo: PSPDFKit.MeasurementScaleUnitTo.METERS,
 *       fromValue: 1,
 *       toValue: 2
 *     },
 *     precision: PSPDFKit.MeasurementPrecision.FOUR,
 *     selected: true
 *   }
 * ];
 *
 * PSPDFKit.load({
 *   // Other options.
 *   measurementValueConfiguration: (documentScales) => {
 *     return [...customScales, ...documentScales];
 *   }
 * });
 *
 */
type MeasurementValueConfiguration = {
    name?: string;
    scale: IMeasurementScale;
    precision: IMeasurementPrecision;
    selected?: boolean;
};
type MeasurementValueConfigurationCallback = (configuration: MeasurementValueConfiguration[]) => MeasurementValueConfiguration[];

type BaseFormFieldJSON = {
    v: 1;
    pdfObjectId?: number | null;
    annotationIds: Array<string>;
    name: string;
    label: string;
    flags?: FormFieldFlags;
    id: string;
    additionalActions?: SerializedAdditionalActionsType;
    group?: IGroup;
    permissions?: IPermissions;
};
type ChoiceFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/listbox' | 'pspdfkit/form-field/combobox';
    options: Array<FormOptionJSON>;
    multiSelect: boolean;
    commitOnChange: boolean;
    defaultValues: Array<string>;
};
type ListBoxFormFieldJSON = ChoiceFormFieldJSON & {
    type: 'pspdfkit/form-field/listbox';
};
type DoNotSpellCheckPropertyPair = XOR<Record<'doNotSpellCheck', boolean>, Record<'doNotSpellcheck', boolean>>;
type ComboBoxFormFieldJSON = ChoiceFormFieldJSON & {
    type: 'pspdfkit/form-field/combobox';
    edit: boolean;
} & DoNotSpellCheckPropertyPair;
type CheckBoxFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/checkbox';
    options: Array<FormOptionJSON>;
    defaultValues: Array<string>;
};
type RadioButtonFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/radio';
    options: Array<FormOptionJSON>;
    noToggleToOff: boolean;
    radiosInUnison: boolean;
    defaultValue: string;
};
type TextFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/text';
    password: boolean;
    maxLength?: number | null;
    doNotScroll: boolean;
    multiLine: boolean;
    defaultValue: string;
    comb: boolean;
} & DoNotSpellCheckPropertyPair;
type ButtonFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/button';
    buttonLabel: string | null;
};
type SignatureFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/signature';
};
type FormFieldJSON = ListBoxFormFieldJSON | ComboBoxFormFieldJSON | RadioButtonFormFieldJSON | CheckBoxFormFieldJSON | TextFormFieldJSON | ButtonFormFieldJSON | SignatureFormFieldJSON;

type SerializedJSON = {
    skippedPdfObjectIds?: number[];
    annotations?: AnnotationJSONUnion[];
    formFields?: FormFieldJSON[];
    skippedPdfFormFieldIds?: number[];
    formFieldValues?: Record<string, any>[];
    comments?: Record<string, any>[];
    skippedComments?: number[];
    attachments?: Record<string, {
        binary: string;
        contentType: string;
    }>;
    skippedPdfBookmarkIds?: string[];
    bookmarks?: BookmarkJSON[];
};
type InstantJSON = SerializedJSON & {
    format: 'https://pspdfkit.com/instant-json/v1';
    pdfId?: {
        permanent: string;
        changing: string;
    };
};

declare const ViewportPadding_base: Record$1.Factory<{
    horizontal: number;
    vertical: number;
}>;
declare class ViewportPadding extends ViewportPadding_base {
}

/**
 * Describes the properties of a text block detected on a page.
 *
 * Contains the text, the bounding box in PDF coordinates, and the anchor point.
 * @public
 * @memberof PSPDFKit.ContentEditing
 * @interface TextBlock
 * @seealso PSPDFKit.ContentEditing.Session#getTextBlocks
 */
/**
 * Unique identifier for the text block.
 * @public
 * @instance
 * @member {string} id
 * @memberof PSPDFKit.ContentEditing.TextBlock
 */
/**
 * The text content of the text block.
 *
 * If a text block contains multiple lines, the text will be a single string with new line characters.
 * @public
 * @instance
 * @member {string} text
 * @memberof PSPDFKit.ContentEditing.TextBlock
 */
/**
 * The current bounding box of the text block, in PDF coordinates.
 * @public
 * @instance
 * @member {object} boundingBox
 * @property {number} top - The top coordinate of the bounding box.
 * @property {number} left - The left coordinate of the bounding box.
 * @property {number} width - The width of the bounding box.
 * @property {number} height - The height of the bounding box.
 * @memberof PSPDFKit.ContentEditing.TextBlock
 */
/**
 * The anchor point of the text block.
 * @public
 * @instance
 * @member {object} anchor
 * @property {number} x - The x coordinate of the anchor point.
 * @property {number} y - The y coordinate of the anchor point.
 * @memberof PSPDFKit.ContentEditing.TextBlock
 */
/**
 * The maximum width of the text block.
 * @public
 * @instance
 * @member {number} maxWidth
 * @memberof PSPDFKit.ContentEditing.TextBlock
 */
type TextBlock$1 = {
    id: string;
    text: string;
    boundingBox: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
    anchor: {
        x: number;
        y: number;
    };
    maxWidth: number;
};
/**
 * Describes the properties used to update a text block.
 *
 * This is a partial text block that contains the id of the text block and the new text.
 * It is used to update the text block in the document.
 * @public
 * @memberof PSPDFKit.ContentEditing
 * @interface UpdatedTextBlock
 * @seealso PSPDFKit.ContentEditing.Session#updateTextBlocks
 */
/**
 * ***required***
 *
 * Unique identifier for the text block.
 * @public
 * @instance
 * @member {string} id
 * @memberof PSPDFKit.ContentEditing.UpdatedTextBlock
 */
/**
 * The new text content of the text block.
 * @public
 * @instance
 * @member {?string} text
 * @memberof PSPDFKit.ContentEditing.UpdatedTextBlock
 */
/**
 * The anchor point of the text block.
 * @public
 * @instance
 * @member {?object} anchor
 * @property {?number} x - The x coordinate of the anchor point.
 * @property {?number} y - The y coordinate of the anchor point.
 * @memberof PSPDFKit.ContentEditing.UpdatedTextBlock
 */
/**
 * The maximum width of the text block.
 * @public
 * @instance
 * @member {?number} maxWidth
 * @memberof PSPDFKit.ContentEditing.UpdatedTextBlock
 */
type UpdatedTextBlock = {
    id: string;
    text?: string;
    anchor?: {
        x?: number;
        y?: number;
    };
    maxWidth?: number;
};
/**
 * This describes the content editor session returned by {@link PSPDFKit.Instance#beginContentEditingSession}.
 *
 * It is independent of the content editor UI session, which is used to display the content editor UI. At one time, only one content editing session can be active, either this session or a UI session. Starting the UI session will deactivate this session.
 * Also, if the contents of an opened document are modified while this session is active, the session will be deactivated.
 *
 * Using this requires a license that includes the Content Editor component.
 * @public
 * @memberof PSPDFKit.ContentEditing
 * @interface Session
 */
/**
 * Completes the current editing session and saves all changes. Document will reload.
 * @returns A promise that resolves when the changes have been successfully saved.
 * @public
 * @function commit
 * @memberof PSPDFKit.ContentEditing.Session
 * @instance
 */
/**
 * Completes the current editing session without persisting any changes.
 * @returns A promise that resolves when the session is successfully discarded.
 * @public
 * @function discard
 * @memberof PSPDFKit.ContentEditing.Session
 * @instance
 */
/**
 * Retrieves all text blocks for a specific page.
 * @param {number} pageIndex - The index of the page to retrieve text blocks for.
 * @returns {Promise.<PSPDFKit.ContentEditing.TextBlock[]>} A promise that resolves with an array of TextBlocks for the given page.
 * @public
 * @function getTextBlocks
 * @memberof PSPDFKit.ContentEditing.Session
 * @throws {PSPDFKit.Error} If the page index is out of bounds.
 * @instance
 */
/**
 * Indicates whether the session is currently active.
 * @public
 * @instance
 * @member {boolean} active
 * @memberof PSPDFKit.ContentEditing.Session
 */
/**
 * Updates an array of text blocks with partial data.
 *
 * If a text block for the corresponding page wasn't previously loaded via `getTextBlocks`,
 * it will be loaded in the background automatically.
 * @param {PSPDFKit.ContentEditing.UpdatedTextBlock[]} textBlocks - Array of UpdatedTextBlock objects to update.
 *  Each object must be identified through its ID. Other fields are optional and will be updated in the document if not null.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @public
 * @function updateTextBlocks
 * @memberof PSPDFKit.ContentEditing.Session
 * @throws {PSPDFKit.Error} If the ID of any text block is missing or doesn't exist.
 * @instance
 */
type Session = {
    commit: () => Promise<void>;
    discard: () => Promise<void>;
    getTextBlocks: (pageIndex: number) => Promise<TextBlock$1[]>;
    updateTextBlocks: (textBlocks: UpdatedTextBlock[]) => Promise<void>;
    active: boolean;
};

/**
 * Document permissions flags.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.DocumentPermissions} annotationsAndForms When set, adding or modifying text annotations
 * and interactive form fields is allowed. If `fillForms` is also set, the user
 * can fill existing forms (including Digital Signatures).
 * @property {PSPDFKit.DocumentPermissions} assemble When set, it's allowed to assemble the document, that is: insert, rotate, or delete pages, or create bookmarks or thumbnail images.
 * @property {PSPDFKit.DocumentPermissions} extract When set, it's allowed to copy or extract text and graphics from the document.
 * @property {PSPDFKit.DocumentPermissions} extractAccessibility When set, it's allowed to extract text and graphics in support
 * of accessibility to users with disabilities.
 * @property {PSPDFKit.DocumentPermissions} fillForms When set, it's allowed to fill in existing interactive
 * form fields (including Digital Signatures).
 * @property {PSPDFKit.DocumentPermissions} modification When set, it's allowed to modify the contents of the document
 * by operations other than `assemble`.
 * @property {PSPDFKit.DocumentPermissions} printHighQuality When set, it's allowed to print the document
 * to a representation from which a faithful digital copy of the PDF content could be generated.
 *
 * When this flag is set to `true` the print resolution can be 300 dpi and 150 dpi otherwise.
 * @property {PSPDFKit.DocumentPermissions} printing When set, it's allowed to print the document.
 * Limited to degraded quality if `printHighQuality` is not also set.
 */
declare const DocumentPermissionsEnum: {
    readonly annotationsAndForms: "annotationsAndForms";
    readonly assemble: "assemble";
    readonly extract: "extract";
    readonly extractAccessibility: "extractAccessibility";
    readonly fillForms: "fillForms";
    readonly modification: "modification";
    readonly printHighQuality: "printHighQuality";
    readonly printing: "printing";
};
type IDocumentPermissions = (typeof DocumentPermissionsEnum)[keyof typeof DocumentPermissionsEnum];

interface IEmbeddedFile {
    id: ID;
    attachmentId: string;
    description: null | string;
    fileName: null | string;
    fileSize: null | number;
    updatedAt: null | Date;
}
declare const EmbeddedFile_base: Record$1.Factory<IEmbeddedFile>;
/**
 * @classdesc
 * This record is used to persist the information for an embedded file.
 * @public
 * @memberof PSPDFKit
 * @summary Embedded File.
 * @class EmbeddedFile
 * @noconstructor
 * @extends Immutable.Record
 * @seealso PSPDFKit.Instance#getEmbeddedFiles
 * @seealso PSPDFKit.Instance#getAttachment
 */
declare class EmbeddedFile extends EmbeddedFile_base {
}

/**
 * You can programmatically modify the properties of the comment just before it is created.
 *
 * @public
 * @callback OnCommentCreationStartCallback
 * @memberof PSPDFKit
 * @param {Comment} comment
 * @example <caption>Set default text of a Comment</caption>
 * PSPDFKit.load({
 *   onCommentCreationStart: comment => comment.set('text', { format: 'xhtml', value: '<p>This comment has a default value</p>' })
 *   // ...
 * });
 */
type OnCommentCreationStartCallback = (comment: Comment) => Comment;

/**
 * You can programmatically modify the properties of the widget annotation and the associated form field just
 * before it is created via the form creator UI.
 *
 * @public
 * @callback OnWidgetAnnotationCreationStartCallback
 * @memberof PSPDFKit
 * @param {PSPDFKit.Annotations.WidgetAnnotation} widgetAnnotation The widget annotation that is about to be created.
 * @param {PSPDFKit.FormFields.FormField} formField The original form field that is associated with the widget annotation.
 * @example <caption>Set the opacity of all widget annotations.</caption>
 * PSPDFKit.load({
 *   onWidgetAnnotationCreationStart: (annotation, formField) => {
 *     return { annotation: annotation.set('opacity', 0.7) };
 *   }
 *   // ...
 * });
 */
type OnWidgetAnnotationCreationStartCallback = (annotation: WidgetAnnotation, formField: FormField) => {
    annotation?: WidgetAnnotation;
    formField?: FormField;
};

/**
 * Describes the properties of a Tool Item.
 *
 * Tool items are standalone tools that can be used in different part of PSPDFKit's UI
 * such as annotation tooltips.
 *
 * @public
 * @memberof PSPDFKit
 * @interface ToolItem
 * @seealso PSPDFKit.Configuration.annotationTooltipCallback
 */
/**
 * ***required***
 *
 * The type of a tool item.
 *
 * At the moment the only supported type is `custom`.
 *
 * @example
 * // In your JavaScript
 * const item = { type: 'custom', ... }
 * @public
 * @instance
 * @member {string} type
 * @memberof PSPDFKit.ToolItem
 */
/**
 * Unique identifier for the item.
 *
 * This is useful to identify items whose `type` is `custom`.
 *
 * @example
 * // In your JavaScript
 * const item = { type: 'custom', id: 'my-button', ... }
 * @public
 * @instance
 * @member {?string} id
 * @memberof PSPDFKit.ToolItem
 */
/**
 * Title for the tool items.
 *
 * It is shown on hover or when the item doesn't have an icon.
 *
 * @public
 * @instance
 * @member {?string} title
 * @memberof PSPDFKit.ToolItem
 */
/**
 * Useful to set a custom CSS class name on the item.
 *
 * @public
 * @instance
 * @member {?string} className
 * @memberof PSPDFKit.ToolItem
 */
/**
 * Icon for the item.
 *
 * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
 *
 * @public
 * @instance
 * @member {?string} icon
 * @memberof PSPDFKit.ToolItem
 */
/**
 * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
 * first argument, the `id` of the tool item as the second.
 *
 * @public
 * @instance
 * @member {?Function} onPress
 * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter.
 * @param {string} id The tool item id.
 * @param {?string} preset The preset name.
 * @memberof PSPDFKit.ToolItem
 */
/**
 * Whether a custom item is selected or not.
 *
 * @public
 * @instance
 * @member {?boolean} selected
 * @memberof PSPDFKit.ToolItem
 */
/**
 * Whether the item is disabled or not.
 *
 * @public
 * @instance
 * @member {?boolean} disabled
 * @memberof PSPDFKit.ToolItem
 */
/**
 * Optionally `custom` tool items can define a DOM node.
 * PSPDFKit renders this node instead of a standard tool button.
 *
 * In this case the tool item is rendered inside of a container
 * which gets the `title` and `className` attributes set.
 *
 * The `icon` property is ignored.
 * The `selected` and `disabled` are used just to toggle the
 * PSPDFKit-Tool-Node-active and PSPDFKit-Tool-Node-disabled
 * class names but making the node effectively selected or disabled is up to
 * the implementation of the item.
 *
 * The `onPress` event is registered and fires any time the item is either clicked
 * or selected with keyboard (if part of a `dropdownGroup`).
 *
 * @public
 * @instance
 * @member {?Node} node
 * @memberof PSPDFKit.ToolItem
 */
type ToolItemType = 'custom';
type ToolItem = {
    type: ToolItemType;
    node?: Node;
    id?: string;
    title?: string;
    className?: string;
    icon?: string;
    onPress?: IFunction;
    selected?: boolean;
    disabled?: boolean;
};

type IAnnotationToolbarType = 'stroke-color' | 'fill-color' | 'background-color' | 'opacity' | 'line-width' | 'blend-mode' | 'spacer' | 'delete' | 'annotation-note' | 'border-color' | 'border-width' | 'border-style' | 'color' | 'linecaps-dasharray' | 'line-style' | 'font' | 'overlay-text' | 'outline-color' | 'apply-redactions' | 'measurementType' | 'measurementScale' | 'back' | 'crop-current' | 'crop-all' | 'close';
type BuiltInAnnotationToolbarItem = {
    type: IAnnotationToolbarType;
};
type Shared = Omit<ToolItem, 'selected' | 'type'> & {
    onPress?: (nativeEvent: MouseEvent, id?: string | undefined) => void;
    iconClassName?: string;
    onIconPress?: (nativeEvent: MouseEvent, id?: string) => void;
};
type AnnotationToolbarItem = (Omit<Shared, 'node'> & {
    type: IAnnotationToolbarType;
}) | (Omit<Shared, 'icon'> & {
    id: string;
    type: 'custom';
    icon?: string | Node;
    node?: Node;
});

/**
 * The additional options that are passed to `PSPDFKit.AnnotationToolbarItemsCallback`.
 *
 * @public
 * @typedef {object} AnnotationToolbarItemsCallbackOptions
 * @property {PSPDFKit.AnnotationToolbarItem[]} defaultAnnotationToolbarItems - The list of default items that are shown for this particular annotation.
 * @property {boolean} hasDesktopLayout - Whether the screen is in desktop layout.
 */
/**
 * This callback can be run on individual annotation toolbars to modify their toolbar items.
 *
 * For more information, see {@link PSPDFKit.Configuration#annotationToolbarItems}
 *
 * @public
 * @callback AnnotationToolbarItemsCallback
 * @memberof PSPDFKit
 * @param {AnnotationsUnion | null} annotation The annotation that is going to be created or is currently selected. In case
 * the annotation is not yet created, `pageIndex` is `null`. In case of items for annotation toolbars used in interaction modes
 * like {@link PSPDFKit.InteractionMode.INK_ERASER}, `annotation` is `null`.
 * @param {AnnotationToolbarItemsCallbackOptions} options The {@link AnnotationToolbarItemsCallbackOptions} that can be helpful in implementing custom toolbar.
 */
type AnnotationToolbarItemsCallback = (annotation: AnnotationsUnion | null, options: {
    defaultAnnotationToolbarItems: BuiltInAnnotationToolbarItem[];
    hasDesktopLayout: boolean;
}) => AnnotationToolbarItem[];

/**
 * Controls the current sidebar mode in the viewer.
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.SidebarMode} ANNOTATIONS Annotations sidebar.
 * @property {PSPDFKit.SidebarMode} BOOKMARKS Bookmarks.
 * @property {PSPDFKit.SidebarMode} DOCUMENT_OUTLINE Document Outline (table of contents).
 * @property {PSPDFKit.SidebarMode} THUMBNAILS Thumbnails preview.
 * @property {PSPDFKit.SidebarMode} SIGNATURES List of Signatures.
 * @property {PSPDFKit.SidebarMode} LAYERS List of OCG layers in the document.
 * @property {PSPDFKit.SidebarMode} ATTACHMENTS List of embedded files in the document.
 * @property {PSPDFKit.SidebarMode} CUSTOM Custom preview.
 */
declare const SidebarMode: {
    readonly ANNOTATIONS: "ANNOTATIONS";
    readonly BOOKMARKS: "BOOKMARKS";
    readonly DOCUMENT_OUTLINE: "DOCUMENT_OUTLINE";
    readonly THUMBNAILS: "THUMBNAILS";
    readonly SIGNATURES: "SIGNATURES";
    readonly LAYERS: "LAYERS";
    readonly ATTACHMENTS: "ATTACHMENTS";
    readonly CUSTOM: "CUSTOM";
};
type ISidebarMode = (typeof SidebarMode)[keyof typeof SidebarMode];

/**
 * Customizable user interface element.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.UIElement} Sidebar Sidebar element
 */
declare const UIElement: {
    readonly Sidebar: "Sidebar";
};
type IUIElement = (typeof UIElement)[keyof typeof UIElement];

/**
 * This object can contain callback functions ("renderers") used to customize the appearance of different built-in UI elements.
 *
 * The UI element to which the callback corresponds is determined by its key or keys. For example, a callback function
 * used to customize the annotations sidebar should be located under `PSPDFKit.Configuration.customUI[PSPDFKit.UIElement.Sidebar][PSPDFKit.SidebarMode.ANNOTATIONS]`.
 *
 * Currently only the Sidebar Element can be customized, using the `PSPDFKit.UIElement.Sidebar` key.
 * @public
 * @memberof PSPDFKit
 * @interface CustomUIConfiguration
 * @summary Configuration settings for customized rendering of built-in UI elements.
 * @example
 *
 * //Fully customized sidebar
 *
 * PSPDFKit.load({
 *   customUI: {
 *     [PSPDFKit.UIElement.Sidebar]: {
 *       [PSPDFKit.SidebarMode.CUSTOM]({ containerNode }) {
 *         // React Portals can be used as well.
 *         // Or Vue portals, or any other framework API that allows appending components
 *         // to arbitrary DOM nodes.
 *         // Using vanilla JS, you can just append a node to parentNode.
 *         const div = document.createElement("div");
 *         div.append("My custom sidebar");
 *         containerNode.appendChild(div);
 *
 *         return {
 *           // By returning the same node that was provided, we opt-out of having the node
 *           // appended. If we return a different node, it will be appended to the provided node.
 *           node: containerNode,
 *         };
 *       }
 *     }
 *   }
 * });
 *
 * //Partially customized sidebar
 *
 * PSPDFKit.load({
 *   customUI: {
 *     [PSPDFKit.UIElement.Sidebar]: {
 *       [PSPDFKit.SidebarMode.ANNOTATIONS]({ containerNode }) {
 *         containerNode.style.padding = "0.5rem";
 *
 *         if (!containerNode.querySelector(".MyCustomSidebarComponentHeader")) {
 *           const header = document.createElement("div");
 *           header.classList.add("MyCustomSidebarComponentHeader");
 *           containerNode.prepend(header);
 *         }
 *
 *         return {
 *           node: containerNode,
 *           onRenderItem({ itemContainerNode, item: annotation }) {
 *             const footerAuthor = itemContainerNode.querySelector(".PSPDFKit-Sidebar-Annotations-Footer span");
 *             // Change the format of the footer text by prefixing it with "Creator: " and removing the date
 *             footerAuthor.textContent = `Creator: ${annotation.creatorName}`;
 *
 *             // Add aria label to the annotation icon
 *             const annotationIcon = itemContainerNode.querySelector(".PSPDFKit-Icon");
 *             annotationIcon.setAttribute("aria-label", `Icon for an annotation created by ${annotation.creatorName}.`);
 *           }
 *         };
 *       }
 *     }
 *   }
 * });
 * @seealso PSPDFKit.Configuration#customUI PSPDFKit.Instance#setCustomUIConfiguration
 */
/**
 * Sidebar custom UI configuration.
 * @public
 * @instance
 * @member {PSPDFKit.CustomUIConfiguration.Sidebar} sidebarCustomUIConfiguration
 * @property {?PSPDFKit.CustomUIRendererCallback} ANNOTATIONS - Custom UI renderer callback for the annotations sidebar.
 * @property {?PSPDFKit.CustomUIRendererCallback} THUMBNAILS - Custom UI renderer callback for the thumbnails sidebar.
 * @property {?PSPDFKit.CustomUIRendererCallback} BOOKMARKS - Custom UI renderer callback for the bookmarks sidebar.
 * @property {?PSPDFKit.CustomUIRendererCallback} DOCUMENT_OUTLINE - Custom UI renderer callback for the document outline sidebar.
 * @property {?PSPDFKit.CustomUIRendererCallback} SIGNATURES - Custom UI renderer callback for the signatures sidebar.
 * @property {?PSPDFKit.CustomUIRendererCallback} CUSTOM - Custom UI renderer callback for the custom sidebar.
 * @memberof PSPDFKit.CustomUIConfiguration
 */
/**
 * This user defined function receives the element's container DOM node and the data it renders as argument. It's
 * called whenever the element is mounted, each time the data is modified, and whenever {@link PSPDFKit.Instance#setCustomUIConfiguration} is called.
 *
 * It must return a {@link PSPDFKit.CustomUIRendererConfiguration} object.
 * @public
 * @callback CustomUIRendererCallback
 * @param {object} payload - UI element data
 * @param {Node} payload.containerNode - Container DOM element.
 * @param {PSPDFKit.Immutable.List.<any> | null} payload.items - Data rendered by the element.
 * @returns {PSPDFKit.CustomUIRendererConfiguration}
 * @memberof PSPDFKit
 */
/**
 * This object is returned by customer's {@link PSPDFKit.CustomUIRendererCallback} functions to enhance the default appearance of a UI element.
 *
 * Its main, fundamental property is `node`, which is the DOM node that will be appended to the container node.
 *
 * Optionally it can contain an `onRenderItem` event handler, which is called for each item in the list.
 * @public
 * @interface CustomUIRendererConfiguration
 * @property {Node} node - DOM node to be appended to the container, if different from `containerNode`.
 * @property {?PSPDFKit.CustomUIItemRendererCallback} onRenderItem - Callback to be called whenever an item is rendered.
 * @memberof PSPDFKit
 */
/**
 * This user defined function receives the item element's container DOM node and the item data it renders as argument. It's called whenever the item element because of the container element updates.
 * @public
 * @callback CustomUIItemRendererCallback
 * @param {object} payload - UI element data
 * @param {Node} payload.itemContainerNode - Container DOM element.
 * @param {any} payload.item - Item data rendered by the element.
 * @memberof PSPDFKit
 */
type RendererProps = {
    containerNode: Node;
    items?: List<any> | null;
};
type ItemRendererProps = {
    itemContainerNode: Node;
    item: any;
};
type ItemCustomRenderer = (itemRendererProps: ItemRendererProps) => void;
type UIRendererConfiguration = {
    node: Node;
    onRenderItem?: ItemCustomRenderer;
};
type Renderer = (rendererProps: RendererProps) => UIRendererConfiguration;
type CustomUISidebarConfiguration = Partial<{
    [K in ISidebarMode]: Renderer;
}>;
type CustomUIElementConfiguration = CustomUISidebarConfiguration;
type CustomUI = Partial<Record<IUIElement, CustomUIElementConfiguration>>;

interface ITextRange {
    startNode: Text | null;
    startOffset: number | null;
    endNode: Text | null;
    endOffset: number | null;
}
declare const TextRange_base: Record$1.Factory<ITextRange>;
declare class TextRange extends TextRange_base {
    startNode: Text;
    startOffset: number;
    endNode: Text;
    endOffset: number;
    startAndEndIds(): {
        startTextLineId: number;
        endTextLineId: number;
        startNestedContentBlockId: string;
        endNestedContentBlockId: string;
        startPageIndex: number;
        endPageIndex: number;
    } | null;
}

interface ITextSelection$1 {
    textRange: TextRange | null;
    startTextLineId: number | null;
    endTextLineId: number | null;
    startNestedContentBlockId: string | null;
    endNestedContentBlockId: string | null;
    startPageIndex: number | null;
    endPageIndex: number | null;
}
declare const TextSelection_base: Record$1.Factory<ITextSelection$1>;
declare class TextSelection extends TextSelection_base {
}

/**
 * PSPDFKit for Web comes with a built-in toolbar that shows whenever some text is selected on a document, we will refer to said tooltip as inline toolbar from now on.
 * This callback allows users to customize said inline toolbar.
 *
 * @public
 * @memberof PSPDFKit
 * @callback InlineTextSelectionToolbarItemsCallback
 * @seealso PSPDFKit.Configuration#InlineTextSelectionToolbarItemsCallback
 * @seealso PSPDFKit#Instance.setInlineTextSelectionToolbarItems
 * @typedef {object} InlineToolbarItemsCallbackOptions
 * @property {BuiltInInlineToolbarItem[]} defaultAnnotationToolbarItems - The list of default items thats is shown in the inline toolbar
 * @property {boolean} hasDesktopLayout - Whether the screen is in desktop layout.
 */
/**
 * This callback can be run on specific text selection to modify its inline toolbar items.
 *
 *
 * @public
 * @memberof PSPDFKit
 * @callback InlineTextSelectionToolbarItemsCallback
 * @param {PSPDFKit.TextSelection} selection The text that is currently selected.
 */
declare const builtInItems: readonly ["highlight", "strikeout", "underline", "squiggle", "redact-text-highlighter", "comment", "ai-assistant"];
type InlineToolbarType = (typeof builtInItems)[number];
type InlineTextSelectionToolbarItem = Omit<ToolItem, 'type'> & {
    type: InlineToolbarType | 'custom';
};
type InlineTextSelectionToolbarItemsCallback = (options: {
    defaultItems: InlineTextSelectionToolbarItem[];
    hasDesktopLayout: boolean;
}, selection: TextSelection) => InlineTextSelectionToolbarItem[];

/**
 * Describes types for document comparison operation.
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.ComparisonOperationType} TEXT Compare the text of documents.
 * @property {PSPDFKit.ComparisonOperationType} AI Compare documents using AI-powered analysis.
 */
declare const ComparisonOperationType: {
    readonly TEXT: "text";
    readonly AI: "ai";
};
type IComparisonOperationType = (typeof ComparisonOperationType)[keyof typeof ComparisonOperationType];

declare global {
    interface SymbolConstructor {
        readonly observable: symbol;
    }
}

/**
 * Represents a pair of documents to be compared.
 * @public
 * @memberof PSPDFKit
 * @typedef {object} ComparisonDocuments
 * @property {PSPDFKit.DocumentDescriptor} originalDocument - The original document.
 * @property {PSPDFKit.DocumentDescriptor} changedDocument - The changed document.
 */
type ComparisonDocuments = {
    originalDocument: DocumentDescriptor;
    changedDocument: DocumentDescriptor;
};
/**
 * Describes a range within a document.
 * @public
 * @memberof PSPDFKit
 * @interface Range
 * @property {number} position - The starting position of the range.
 * @property {number} length - The length of the range.
 */
type Range$1 = {
    position: number;
    length: number;
};
/**
 * Describes a block of text within a document.
 * @public
 * @memberof PSPDFKit
 * @interface TextBlock
 * @property {PSPDFKit.Range} range - The range of the text block.
 * @property {number[][]} rects - The rectangular coordinates of the text block.
 */
type TextBlock = {
    range: Range$1;
    rect: [number, number, number, number];
};
/**
 * Describes an operation within a text comparison.
 * @public
 * @memberof PSPDFKit
 * @interface Operation
 * @property {'insert' | 'delete' | 'equal'} type - The type of operation.
 * @property {string} text - The text involved in the operation.
 * @property {Array<PSPDFKit.TextBlock>} originalTextBlocks - The text blocks from the original document.
 * @property {Array<PSPDFKit.TextBlock>} changedTextBlocks - The text blocks from the changed document.
 */
type Operation = {
    type: 'insert' | 'delete' | 'equal';
    text: string;
    originalTextBlocks: TextBlock[];
    changedTextBlocks: TextBlock[];
};
/**
 * Describes a hunk of changes within a document comparison.
 * @public
 * @memberof PSPDFKit
 * @interface Hunk
 * @property {PSPDFKit.Range} originalRange - The range in the original document.
 * @property {PSPDFKit.Range} changedRange - The range in the changed document.
 * @property {PSPDFKit.Operation[]} operations - The operations within the hunk.
 */
type Hunk = {
    originalRange: Range$1;
    changedRange: Range$1;
    operations: Operation[];
};
/**
 * Describes the result of a text comparison.
 * @public
 * @memberof PSPDFKit
 * @interface ComparisonResult
 * @property {'text'} type - The type of comparison result. Only "text" is supported for now.
 * @property {PSPDFKit.Hunk[]} hunks - The hunks of changes within the comparison result.
 */
type ComparisonResult = {
    type: 'text';
    hunks: Hunk[];
};
/**
 * Describes the result of a page comparison.
 * @public
 * @memberof PSPDFKit
 * @interface PageComparisonResult
 * @property {number} [originalPageIndex] - The index of the original page.
 * @property {number} [changedPageIndex] - The index of the changed page.
 * @property {PSPDFKit.ComparisonResult[]} comparisonResults - The comparison results for the page.
 */
type PageComparisonResult = {
    originalPageIndex?: number;
    changedPageIndex?: number;
    comparisonResults: ComparisonResult[];
};
/**
 * Object containing the result of a document comparison operation.
 * @public
 * @memberof PSPDFKit
 * @interface DocumentComparisonResult
 * @property {PSPDFKit.PageComparisonResult[]} documentComparisonResults - The comparison results for each page.
 */
type DocumentComparisonResult = {
    documentComparisonResults: PageComparisonResult[];
} | null;

/**
 * This event is emitted whenever an annotation is either clicked
 * or touched (on devices with touch capabilities) as well as when an already selected
 * annotation receives a click or touch event.
 *
 * Use this event to add custom behavior or prevent default ones from happening on press.
 *
 * Please note that this event will not be fired for annotations which are not
 * editable. If you still want to detect clicks for such annotations, for
 * example, to show a focus ring when clicked, you can use custom renderers to
 * made a clickable area above each annotation. This method is described fully
 * in our [Knowledge Base](https://pspdfkit.com/guides/web/current/knowledge-base/show-focus-ring-read-only).
 *
 * @example <caption>Prevent click and touch events on selected annotations</caption>
 * instance.addEventListener("annotations.press", (event) => {
 *   if (event.selected) {
 *     event.preventDefault();
 *   }
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsPressEvent
 */
/**
 * The annotation that was pressed.
 * Remember that annotations are `Immutable.map`.
 *
 * @public
 * @instance
 * @member {AnnotationsUnion} annotation
 * @memberof PSPDFKit.AnnotationsPressEvent
 */
/**
 * The browser event which caused the press event to dispatch. This is either a MouseEvent,
 * TouchEvent, or a PointerEvent.
 *
 * @public
 * @instance
 * @member {Event} nativeEvent
 * @memberof PSPDFKit.AnnotationsPressEvent
 */
/**
 * When invoked, the `preventDefault` method prevents the default press
 * actions associated with the annotation to occur.
 *
 * @public
 * @instance
 * @member {Function} preventDefault
 * @memberof PSPDFKit.AnnotationsPressEvent
 */
/**
 * Tells whether the pressed annotation is selected or not.
 *
 * @public
 * @instance
 * @member {boolean} selected
 * @memberof PSPDFKit.AnnotationsPressEvent
 */
type AnnotationsPressEvent = {
    annotation: AnnotationsUnion;
    nativeEvent: Event;
    preventDefault?: () => void;
    selected: boolean;
};

/**
 * Indicates the reason why {@link PSPDFKit.AnnotationsWillChangeEvent} was
 * emitted.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @enum
 */
declare enum AnnotationsWillChangeReason {
    /**
     * The user starts drawing an annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    DRAW_START = "DRAW_START",
    /**
     * The user stops drawing an annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    DRAW_END = "DRAW_END",
    /**
     * The user starts typing text into an annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    TEXT_EDIT_START = "TEXT_EDIT_START",
    /**
     * The user stops typing text into an annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    TEXT_EDIT_END = "TEXT_EDIT_END",
    /**
     * The user starts choosing an item from the picker presented.
     *
     * Used for image annotations, stamp annotations and ink signature annotations.
     *
     * Note that the annotation included in this event will not have any matching
     * field values (including ID) compared to the annotation in a
     * {@link PSPDFKit.AnnotationsWillChangeReason.SELECT_END} event. This is
     * because the actual annotation hasn't been created yet. As a result, this
     * annotation is used only to identify the type of annotation being selected.
     * The only exception to this is the `inkSignature` field in a
     * {@link PSPDFKit.Annotations.InkAnnotation}, which is set to `true` to
     * distiguish it from a regular ink annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    SELECT_START = "SELECT_START",
    /**
     * The user stops choosing an item from the picker presented.
     *
     * Used for image annotations, stamp annotations and ink signature
     * annotations.
     *
     * Note= An empty {@link PSPDFKit.AnnotationsWillChangeEvent#annotations}
     * list indicates that the selection was cancelled.
     *
     * Note that this will not be fired when cancelling the system dialog for
     * selecting an image, because there is no way to detect when this occurs.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    SELECT_END = "SELECT_END",
    /**
     * The user starts moving an annotation around.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    MOVE_START = "MOVE_START",
    /**
     * The user stops moving an annotation around.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    MOVE_END = "MOVE_END",
    /**
     * The user starts resizing an annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    RESIZE_START = "RESIZE_START",
    /**
     * The user stops resizing an annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    RESIZE_END = "RESIZE_END",
    /**
     * The user starts rotating an annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    ROTATE_START = "ROTATE_START",
    /**
     * The user stops rotating an annotation.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    ROTATE_END = "ROTATE_END",
    /**
     * The user initiates the delete process. This
     * will be emitted when the deletion confirmation
     * dialog appears.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    DELETE_START = "DELETE_START",
    /**
     * The user ends the delete process. This
     * will be emitted when the user confirms
     * or cancels the intention to delete an
     * annotation.
     *
     * An empty {@link PSPDFKit.AnnotationsWillChangeEvent#annotations}
     * list indicates that the deletion was cancelled.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    DELETE_END = "DELETE_END",
    /**
     * The value of one of the properties of the
     * annotation is changed by the user. e.g. the
     * color or the stroke width.
     *
     * @type {PSPDFKit.AnnotationsWillChangeReason}
     * @public
     */
    PROPERTY_CHANGE = "PROPERTY_CHANGE"
}

declare function toJSON(bookmark: Bookmark): BookmarkJSON;

/**
 * @classdesc
 * This record is used to persist the information for a bookmark.
 *
 * A bookmark is an object that registers a PDF action, usually triggered to go to a page.
 * @example <caption>Creating a bookmark for the 3rd page of a document.</caption>
 * const bookmark = new PSPDFKit.Bookmark({
 *   name: 'test bookmark',
 *   action: new PSPDFKit.Actions.GoToAction({ pageIndex: 3 })
 * });
 *
 * instance.create(bookmark);
 * @public
 * @memberof PSPDFKit
 * @summary Bookmark element.
 * @class Bookmark
 * @noconstructor
 * @extends Immutable.Record
 * @seealso PSPDFKit.Instance#create PSPDFKit.Instance#delete
 * @seealso PSPDFKit.Instance#ensureChangesSaved PSPDFKit.Instance#getBookmarks
 * @seealso PSPDFKit.Instance#hasUnsavedChanges PSPDFKit.Instance#save
 * @seealso PSPDFKit.Instance#update PSPDFKit.Instance~BookmarksChangeEvent
 * @seealso PSPDFKit.Instance~BookmarksWillSaveEvent PSPDFKit.Instance~BookmarksDidSaveEvent
 * @seealso PSPDFKit.Instance~BookmarksLoadEvent PSPDFKit.Instance~BookmarksCreateEvent
 * @seealso PSPDFKit.Instance~BookmarksUpdateEvent PSPDFKit.Instance~BookmarksDeleteEvent
 */
/**
 * A unique identifier to describe the bookmark. When a bookmark is created in the UI, the
 * viewer has to generate a unique ID.
 *
 * When changes are saved to the underlying bookmark provider, we call
 * {@link PSPDFKit.Instance#ensureBookmarkSaved} to make sure the annotation has been persisted
 * from the provider.
 *
 * @public
 * @instance
 * @member {string} id
 * @memberof PSPDFKit.Bookmark
 */
/**
 * When the bookmark is extracted directly from a PDF file, the `pdfBookmarkId` refers to the
 * identifier that was used in the PDF document.
 *
 * This ID is optional since newly created bookmarks using the SYNCProvider annotation provider
 * won't have a `pdfBookmarkId` assigned.
 *
 * @public
 * @instance
 * @member {?string} pdfBookmarkId
 * @memberof PSPDFKit.Bookmark
 * @default null
 */
/**
 * *optional*
 *
 * An optional name to associate to the bookmark.
 *
 * @public
 * @instance
 * @member {?string} name
 * @memberof PSPDFKit.Bookmark
 * @default null
 */
/**
 * The action that will be triggered when the bookmark is either clicked or tapped.
 *
 * Please refer to {@link PSPDFKit.Actions} for an in-depth look at PDF actions.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Actions.Action} action
 * @memberof PSPDFKit.Bookmark
 */
/**
 * Bookmark serializer. Converts a bookmark to InstantJSON compliant objects.
 *
 * @public
 * @function toSerializableObject
 * @memberof PSPDFKit.Bookmark
 * @param {PSPDFKit.Bookmark}
 * @returns {object}
 */
/**
 * Bookmark deserializer. Converts a bookmark object to a {@link PSPDFKit.Bookmark}.
 *
 * @public
 * @function fromSerializableObject
 * @memberof PSPDFKit.Bookmark
 * @param {object}
 * @returns {PSPDFKit.Bookmark}
 */
type ID$1 = string;
type BookmarkProps = {
    id: ID$1 | null;
    pdfBookmarkId: ID$1 | null;
    name: string | null;
    sortKey: number | null;
    action: Action | null;
};
declare const Bookmark_base: Record$1.Factory<BookmarkProps>;
declare class Bookmark extends Bookmark_base {
    id: ID$1;
    action: Action;
    static toSerializableObject: typeof toJSON;
    static fromSerializableObject: (bookmark: BookmarkJSON) => Bookmark;
}

declare class InstantClient {
    clientId: string;
    userId: string | null | undefined;
}

declare const SearchResult_base: Record$1.Factory<{
    pageIndex: number | null;
    previewText: string;
    locationInPreview: number | null;
    lengthInPreview: number | null;
    rectsOnPage: List<Rect>;
    isAnnotation: boolean | null;
    annotationRect?: Rect | null | undefined;
}>;
/**
 * @classdesc
 * A match when searching the PDF.
 *
 * You can retrieve search results by using {@link PSPDFKit.Instance#search}
 * @public
 * @memberof PSPDFKit
 * @summary A match when searching the PDF.
 * @class SearchResult
 * @noconstructor
 * @extends Immutable.Record
 */
declare class SearchResult extends SearchResult_base {
}

declare const SearchState_base: Record$1.Factory<ISearchState>;
/**
 * @classdesc
 * The current state of the search indicators inside the web view.
 *
 * You can update the search state using {@link PSPDFKit.Instance#setSearchState}.
 * @public
 * @memberof PSPDFKit
 * @summary Current search UI state.
 * @class SearchState
 * @noconstructor
 * @extends Immutable.Record
 */
/**
 * Indicates that the search input has focus.
 *
 * @public
 * @instance
 * @member {boolean} isFocused
 * @memberof PSPDFKit.SearchState
 */
/**
 * Indicates that we're currently loading search requests.
 *
 * @public
 * @instance
 * @member {boolean} isLoading
 * @memberof PSPDFKit.SearchState
 */
/**
 * The current search term. Changing this term will not start a search. Please use
 * {@link PSPDFKit.Instance#startUISearch} for that purpose.
 *
 * @public
 * @instance
 * @member {string} term
 * @memberof PSPDFKit.SearchState
 */
/**
 * The currently focused result. -1 if no item is focused yet.
 *
 * @public
 * @instance
 * @member {number} focusedResultIndex
 * @memberof PSPDFKit.SearchState
 * @default -1
 */
/**
 * The latest search results. These will be rendered as highlights in the page view.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Immutable.List.<PSPDFKit.SearchResult>} results
 * @memberof PSPDFKit.SearchState
 */
/**
 * Current minimum search query length. When using the UI or the API function
 * {@link PSPDFKit.Instance#search}, any query shorter than this number will not be performed.
 *
 * In Server mode, this value is retrieved from the server at load time.
 *
 * The default value is `1` (not configurable) in Standalone mode,
 * and `3` in Server mode (configurable in the server).
 *
 * @public
 * @instance
 * @readonly
 * @member {number} minSearchQueryLength
 * @memberof PSPDFKit.SearchState
 */
declare class SearchState extends SearchState_base {
}
interface ISearchState {
    isFocused: boolean;
    isLoading: boolean;
    term: string;
    focusedResultIndex: number;
    results: List<SearchResult>;
    minSearchQueryLength: number;
}

/**
 * This event will be emitted whenever a click on a page occurs that is not handled by any
 * occluding page element (annotation, form, etc.).
 *
 * @public
 * @example <caption>Register a PagePressEvent and get the point in PDF page coordinates.</caption>
 * instance.addEventListener("page.press", (event) => {
 *   console.log(event.point);
 * });
 * @memberof PSPDFKit
 * @interface PagePressEvent
 */
/**
 * The index of the page that was pressed.
 *
 * @public
 * @instance
 * @member {number} pageIndex
 * @memberof PSPDFKit.PagePressEvent
 */
/**
 * The point where the press event was detected in PDF page space coordinates.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Geometry.Point} point
 * @memberof PSPDFKit.PagePressEvent
 */
/**
 * The browser event which caused the press event to dispatch. Either a MouseEvent, TouchEvent, or
 * a PointerEvent.
 *
 * @public
 * @instance
 * @member {Event} nativeEvent
 * @memberof PSPDFKit.PagePressEvent
 */
type PagePressEvent = {
    pageIndex: number;
    point: Point;
    nativeEvent: Event;
};

/**
 * This event will be emitted whenever the current preset is about to be updated with new property values
 * set by the user in the annotation toolbar.
 *
 * @public
 * @example <caption>Register a AnnotationPresetsUpdateEvent handler and prevent the current preset from being
 * updated.</caption>
 * instance.addEventListener("annotationPresets.update", (event) => {
 *   event.preventDefault();
 * });
 * @memberof PSPDFKit
 * @interface AnnotationPresetsUpdateEvent
 */
/**
 * Call this method to opt-out from updating the current preset.
 *
 * @public
 * @instance
 * @member {Function} preventDefault
 * @memberof PSPDFKit.AnnotationPresetsUpdateEvent
 */
/**
 * Current active preset ID.
 *
 * @public
 * @instance
 * @member {string} currentPreset
 * @memberof PSPDFKit.AnnotationPresetsUpdateEvent
 */
/**
 * Properties and values of the current active preset.
 *
 * @public
 * @instance
 * @member {PSPDFKit.AnnotationPreset} currentPresetProperties
 * @memberof PSPDFKit.AnnotationPresetsUpdateEvent
 */
/**
 * Properties and values to be merged with the ones in the current active preset.
 *
 * @public
 * @instance
 * @member {PSPDFKit.AnnotationPreset} newPresetProperties
 * @memberof PSPDFKit.AnnotationPresetsUpdateEvent
 */
type AnnotationPresetsUpdateEvent = {
    preventDefault: () => boolean;
    currentPreset: AnnotationPresetID;
    currentPresetProperties: AnnotationPreset;
    newPresetProperties: AnnotationPreset;
};

/**
 * This event is emitted whenever an annotation is focused. Selecting an annotation also focuses it.
 *
 * When an annotation is deselected by pressing the `Escape` key, successive `annotations.blur`
 * and `annotations.focus` events will be dispatched for the same annotation.
 *
 * Use this event to add custom behavior like announcing the annotation value to screen readers.
 *
 * @example <caption>Log text annotation value</caption>
 * instance.addEventListener("annotations.focus", (event) => {
 *   if (event.annotation instanceof PSPDFKit.Annotations.TextAnnotation) {
 *     console.log(event.annotation.text);
 *   }
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsFocusEvent
 */
/**
 * The annotation that was focused.
 *
 * Remember that annotations are `Immutable.map`.
 *
 * @public
 * @instance
 * @member {AnnotationsUnion} annotation
 * @memberof PSPDFKit.AnnotationsFocusEvent
 */
/**
 * The browser event `FocusEvent` which caused the `annotations.focus` event to dispatch.
 * Its `type` property is set to `focus`.
 *
 * @public
 * @instance
 * @member {Event} nativeEvent
 * @memberof PSPDFKit.AnnotationsFocusEvent
 */
/**
 * This event is emitted whenever an annotation loses focus. Deselecting an annotation
 * with the pointer also blurs it.
 *
 * When an annotation is deselected by pressing the `Escape` key, successive `annotations.blur`
 * and `annotations.focus` events will be dispatched for the same annotation.
 *
 * Use this event to add custom behavior like announcing the annotation value to screen readers.
 *
 * @example <caption>Log widget annotation new value</caption>
 * instance.addEventListener("annotations.blur", (event) => {
 *  instance.getFormFields().then(formFields => {
 *    const formField = formFields.find(formField => formField.name === event.annotation.formFieldName);
 *    console.log(formField);
 *  });
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsBlurEvent
 */
/**
 * The annotation that was focused.
 *
 * Remember that annotations are `Immutable.map`.
 *
 * @public
 * @instance
 * @member {AnnotationsUnion} annotation
 * @memberof PSPDFKit.AnnotationsBlurEvent
 */
/**
 * The browser event `FocusEvent` which caused the `annotations.blur` event to dispatch.
 * Its `type` property is set to `blur`.
 *
 * @public
 * @instance
 * @member {Event} nativeEvent
 * @memberof PSPDFKit.AnnotationsBlurEvent
 */
type AnnotationsFocusEvent = {
    annotation: AnnotationsUnion;
    nativeEvent: FocusEvent;
};
type AnnotationsBlurEvent = {
    annotation: AnnotationsUnion;
    nativeEvent: FocusEvent;
};

/**
 * This event is emitted when document save state changes.
 * See {@link PSPDFKit.Instance~SaveStateChangeEvent}
 *
 * @public
 * @memberof PSPDFKit
 * @interface SaveStateChangeEvent
 */
/**
 * Indicates whether there are any local changes.
 *
 * @public
 * @instance
 * @member {boolean} hasUnsavedChanges
 * @memberof PSPDFKit.SaveStateChangeEvent
 */
type SaveStateChangeEvent = {
    hasUnsavedChanges: boolean;
};

/**
 * This event will fire whenever the customer types in a new search term in the search UI. It can
 * be used to plug the default search into your own search UI.
 *
 * @example <caption>Implement your custom search backend</caption>
 * instance.addEventListener("search.termChange", async (event) => {
 *   // Opt-out from the default implementation.
 *   event.preventDefault();
 *
 *   // We clear the search state, when the search term was removed.
 *   if (term.length == 0) {
 *     instance.setSearchState(searchState => searchState.set("term", ""));
 *   }
 *
 *   // Manually update the UI. If `SearchState#term` is not updated, the update will
 *   // be ignored.
 *   instance.setSearchState(searchState =>
 *     searchState
 *       .set("term", event.term)
 *       .set("isLoading", true)
 *   );
 *
 *   // Make sure to cancel all outstanding requests so that the loading state won't be
 *   // overwritten by an outdated search response (e.g. When the user types "foo" we
 *   // want to cancel all requests for "f" and "fo" while the user types - otherwise
 *   // incoming responses for "f" will clear the loading state of "foo"). This should
 *   // make `myCustomSearch` no longer resolve its promise.
 *   cancelSearchRequest();
 *
 *   // Implement your custom search logic that returns SearchResult objects. This can use
 *   // `Instance#search()` internally.
 *   const results = await myCustomSearch(term);
 *
 *   // Apply the new search results. For an actual use case, you probably want to update
 *   // `SearchState#focusedResultIndex` as well.
 *   instance.setSearchState(searchState =>
 *     searchState
 *       .set("isLoading", false)
 *       .set("results", results)
 *   );
 * });
 * @public
 * @memberof PSPDFKit
 * @interface SearchTermChangeEvent
 */
/**
 * The updated search term.
 *
 * @public
 * @instance
 * @member {string} term
 * @memberof PSPDFKit.SearchTermChangeEvent
 */
/**
 * Call this method to opt-out from the default search logic.
 *
 * @public
 * @instance
 * @member {Function} preventDefault
 * @memberof PSPDFKit.SearchTermChangeEvent
 */
type SearchTermChangeEvent = {
    term: string;
    preventDefault: () => void;
};

/**
 * This event will be emitted whenever a click on a text line occurs that is not handled by any
 * occluding page element (annotation, form, etc.).
 *
 * @public
 * @example <caption>Register a TextLinePressEvent and get the point in PDF page coordinates.</caption>
 * instance.addEventListener("textLine.press", (event) => {
 *   console.log(event.point);
 * });
 * @memberof PSPDFKit
 * @interface TextLinePressEvent
 */
/**
 * The text line that was clicked.
 *
 * @public
 * @instance
 * @member {PSPDFKit.TextLine} textLine
 * @memberof PSPDFKit.TextLinePressEvent
 */
/**
 * The point where the press event was detected in PDF page space coordinates.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Geometry.Point} point
 * @memberof PSPDFKit.TextLinePressEvent
 */
/**
 * The browser event which caused the press event to dispatch. This is either a MouseEvent,
 * TouchEvent, or a PointerEvent.
 *
 * @public
 * @instance
 * @member {Event} nativeEvent
 * @memberof PSPDFKit.TextLinePressEvent
 */
type TextLinePressEvent = {
    textLine: TextLine;
    point: Point;
    nativeEvent: Event;
};

/**
 * This event is emitted when the user **starts** changing the dimensions of the crop area on the document.
 * See {@link PSPDFKit.Instance~CropAreaChangeStartEvent}
 *
 * @public
 * @memberof PSPDFKit
 * @interface CropAreaChangeStartEvent
 */
type CropAreaChangeStartEvent = {
    cropBox: Rect;
    pageIndex: number;
};
/**
 * This event is emitted when the dimensions or position of the CropBox is changed.
 * See {@link PSPDFKit.Instance~CropAreaChangeStopEvent}
 *
 * @public
 * @memberof PSPDFKit
 * @interface CropAreaChangeStopEvent
 */
type CropAreaChangeStopEvent = {
    cropBox: Rect;
    pageIndex: number;
};

/**
 * This event is emitted whenever an annotation is either dragged
 * or resized.
 *
 * @example <caption>Get current bounding box of an transforming annotation</caption>
 * instance.addEventListener("annotations.transform", (event) => {
 *   const boundingBox = event.annotation.boundingBox;
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsTransformEvent
 */
/**
 * The annotation that is being transformed.
 *
 * @public
 * @instance
 * @member {AnnotationsUnion} annotation
 * @memberof PSPDFKit.AnnotationsTransformEvent
 */
type AnnotationsTransformEvent = {
    annotation: AnnotationsUnion;
};

/**
 * This event is emitted whenever an annotation is copied
 *
 * @example <caption>Get current copied annotation</caption>
 * instance.addEventListener("annotations.copy", (event) => {
 *   const copiedAnnotation = event.annotation;
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsCopyEvent
 */
/**
 * The annotation that was copied.
 *
 * @public
 * @instance
 * @member {AnnotationsUnion} annotation
 * @memberof PSPDFKit.AnnotationsCopyEvent
 */
type AnnotationsCopyEvent = {
    annotation: AnnotationsUnion;
};

/**
 * This event is emitted whenever an annotation is cut.
 *
 * @example <caption>Get current cut annotation</caption>
 * instance.addEventListener("annotations.cut", (event) => {
 *   const cutAnnotation = event.annotation;
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsCutEvent
 */
/**
 * The annotation that was cut.
 *
 * @public
 * @instance
 * @member {AnnotationsUnion} annotation
 * @memberof PSPDFKit.AnnotationsCutEvent
 */
type AnnotationsCutEvent = {
    annotation: AnnotationsUnion;
};

/**
 * This event is emitted whenever an annotation is duplicated. You can
 * do this by pressing `Cmd/Ctrl+D` on the keyboard.
 *
 * @example <caption>Get current duplicate annotation</caption>
 * instance.addEventListener("annotations.duplicate", (event) => {
 *   const duplicatedAnnotations = event.annotations;
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsDuplicateEvent
 */
/**
 * The annotation that was duplicated.
 *
 * @public
 * @instance
 * @member {Array<AnnotationsUnion>} annotations
 * @memberof PSPDFKit.AnnotationsDuplicateEvent
 */
/**
 * The newly created form field for the duplicated widget annotation.
 *
 * @public
 * @instance
 * @member {Array<PSPDFKit.FormFields.FormField>} formFields
 * @memberof PSPDFKit.AnnotationsDuplicateEvent
 */
/**
 * The original annotation that was duplicated.
 *
 * @public
 * @instance
 * @member {Array<AnnotationsUnion>} originalAnnotations
 * @memberof PSPDFKit.AnnotationsDuplicateEvent
 */
/**
 * The form field of the widget annotation that was duplicated.
 *
 * @public
 * @instance
 * @member {Map<string, PSPDFKit.FormFields.FormField>} originalFormField
 * @memberof PSPDFKit.AnnotationsDuplicateEvent
 */
type AnnotationsDuplicateEvent = {
    annotations: AnnotationsUnion[];
    formFields?: FormField[];
    originalAnnotations: AnnotationsUnion[];
    originalFormFields?: Map<string, FormField>;
};

/**
 * This event is emitted whenever an annotation is pasted.
 *
 * @example <caption>Get current pasted annotation</caption>
 * instance.addEventListener("annotations.paste", (event) => {
 *   const pastedAnnotations = event.annotations;
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsPasteEvent
 */
/**
 * The annotation that was pasted.
 *
 * @public
 * @instance
 * @member {Array<AnnotationsUnion>} annotations
 * @memberof PSPDFKit.AnnotationsPasteEvent
 */
/**
 * The formField generated for the pasted annotation.
 *
 * @public
 * @instance
 * @member {Array<PSPDFKit.FormFields.FormField>} formFields
 * @memberof PSPDFKit.AnnotationsPasteEvent
 */
/**
 * The action that was taken on the original annotation.
 * This can be `CUT` or `COPY`.
 *
 * @public
 * @instance
 * @member {"COPY" | "CUT"} previousAction
 * @memberof PSPDFKit.AnnotationsPasteEvent
 */
/**
 * The original annotation that was cut or copied.
 *
 * @public
 * @instance
 * @member {Array<AnnotationsUnion>} originalAnnotations
 * @memberof PSPDFKit.AnnotationsPasteEvent
 */
/**
 * The form field associated with the original widget annotation that was cut or copied.
 *
 * @public
 * @instance
 * @member {Map<string, PSPDFKit.FormFields.FormField>} originalFormFields
 * @memberof PSPDFKit.AnnotationsPasteEvent
 */
type AnnotationsPasteEvent = AnnotationsDuplicateEvent & {
    previousAction: 'COPY' | 'CUT';
};

interface ITextSelection {
    startNestedContentBlockId: string | null;
    startTextLineId: number | null;
    startPageIndex: number | null;
    startNode: Text | null;
    startOffset: number | null;
    endNestedContentBlockId: string | null;
    endTextLineId: number | null;
    endPageIndex: number | null;
    endNode: Text | null;
    endOffset: number | null;
    getText: (() => Promise<string>) | null;
    getSelectedTextLines: (() => Promise<List<TextLine>>) | null;
    getBoundingClientRect: (() => Promise<Rect | null>) | null;
    getSelectedRectsPerPage: (() => Promise<List<{
        pageIndex: number;
        rects: List<Rect>;
    }>>) | null;
}
declare const PublicTextSelection_base: Record$1.Factory<ITextSelection>;
/**
 * @classdesc
 * Information about the currently selected text in the PDF. You can listen for changes using the
 * {@link PSPDFKit.Instance~TextSelectionChangeEvent}.
 *
 * <h5>Example</h5>
 * <p class="code-caption">Read the currently selected text of an Instance</p>
 *
 * <pre class="prettyprint">
 * const textSelection = instance.getTextSelection();
 * textSelection.getText().then(text => console.log(text));
 * </pre>
 *
 * <p class="code-caption">Register a TextSelectionChangeEvent</p>
 *
 * <pre class="prettyprint">
 * instance.addEventListener("textSelection.change", (textSelection) => {
 *   if (textSelection) {
 *     console.log("text is selected");
 *   } else {
 *     console.log("no text is selected");
 *   }
 * });
 * </pre>
 * @public
 * @memberof PSPDFKit
 * @summary The current text selection.
 * @class TextSelection
 * @noconstructor
 * @extends Immutable.Record
 */
declare class PublicTextSelection extends PublicTextSelection_base {
    startTextLineId: number;
    startNestedContentBlockId: string;
    startPageIndex: number;
    startNode: Text;
    startOffset: number;
    endTextLineId: number;
    endNestedContentBlockId: string;
    endPageIndex: number;
    endNode: Text;
    endOffset: number;
    getText: () => Promise<string>;
    getSelectedTextLines: () => Promise<List<TextLine>>;
    getBoundingClientRect: () => Promise<Rect | null>;
    getSelectedRectsPerPage: () => Promise<List<{
        pageIndex: number;
        rects: List<Rect>;
    }>>;
}

interface AnnotationNoteProps extends INoteAnnotation {
    parentAnnotation: AnnotationsUnion | null;
    position: Point;
    notePosition?: Point;
}
declare class AnnotationNote<T extends AnnotationNoteProps = AnnotationNoteProps> extends NoteAnnotation<T> {
    parentAnnotation?: AnnotationsUnion;
    position: Point;
    notePosition?: Point;
    static defaultValues: IObject;
}

/**
 * This event will be emitted whenever an annotation note is selected by pressing its associated icon.
 *
 * @public
 * @example <caption>Register a AnnotationNotePressEvent handler and prevent the default annotation note UI from showing.</caption>
 * instance.addEventListener("annotationNote.press", (event) => {
 *   event.preventDefault();
 * });
 * @memberof PSPDFKit
 * @interface AnnotationNotePressEvent
 */
/**
 * Call this method to opt-out from showing the default annotation note UI.
 *
 * @public
 * @instance
 * @member {Function} preventDefault
 * @memberof PSPDFKit.AnnotationNotePressEvent
 */
/**
 * Annotation note for which the icon has been pressed.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.AnnotationNote | null} annotationNote
 * @memberof PSPDFKit.AnnotationNotePressEvent
 */
type AnnotationNotePressEvent = {
    preventDefault: () => boolean;
    annotationNote?: AnnotationNote | null;
};

/**
 * This event will be emitted whenever an annotation note is hovered.
 *
 * @public
 * @example <caption>Register a AnnotationNoteHoverEvent handler and prevent the default annotation note UI from showing.</caption>
 * instance.addEventListener("annotationNote.press", (event) => {
 *   event.preventDefault();
 * });
 * @memberof PSPDFKit
 * @interface AnnotationNoteHoverEvent
 */
/**
 * Call this method to opt-out from showing the default annotation note UI.
 *
 * @public
 * @instance
 * @member {Function} preventDefault
 * @memberof PSPDFKit.AnnotationNoteHoverEvent
 */
/**
 * Annotation note for which the icon has been hovered.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.AnnotationNote | null} annotationNote
 * @memberof PSPDFKit.AnnotationNoteHoverEvent
 */
type AnnotationNoteHoverEvent = {
    preventDefault: () => boolean;
    annotationNote?: AnnotationNote | null;
};

/**
 * Represents one of the available document sources to be used
 * in document comparison.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.DocumentComparisonSourceType} USE_OPEN_DOCUMENT - use the currently open document as source.
 * @property {PSPDFKit.DocumentComparisonSourceType} USE_FILE_DIALOG - show the file dialog for the user to choose the source document from the local file system.
 */
declare const DocumentComparisonSourceType: {
    readonly USE_OPEN_DOCUMENT: "USE_OPEN_DOCUMENT";
    readonly USE_FILE_DIALOG: "USE_FILE_DIALOG";
};
type IDocumentComparisonSourceType = (typeof DocumentComparisonSourceType)[keyof typeof DocumentComparisonSourceType];

/**
 * Specifies the data and settings for documents used for document comparison.
 *
 * @public
 * @memberof PSPDFKit
 * @interface DocumentComparisonSource
 * @summary Object containing data and settings for documents used for document comparison.
 * @example
 * instance.setDocumenComparisonMode({
 *   documentA: {
 *     source: PSPDFKit.DocumentComparisonSourceType.USE_OPEN_DOCUMENT,
 *     pageIndex: 0,
 *     strokeColor: PSPDFKit.Color.RED
 *   },
 *   documentB: {
 *     source: PSPDFKit.DocumentComparisonSource.USE_FILE_DIALOG,
 *     pageIndex: 0,
 *     strokeColor: PSPDFKit.Color.BLUE
 *   },
 *   autoCompare: false
 * });
 */
/**
 * Data for one of the source documents used for document comparison.
 *
 * @public
 * @instance
 * @member {PSPDFKit.DocumentComparisonSourceType | string | ArrayBuffer | Promise<string | ArrayBuffer>} source
 * @memberof PSPDFKit.DocumentComparisonSource
 */
/**
 * ***optional***
 *
 * Page index of the source document to be used for document comparison.
 *
 * Defaults to page `0`.
 *
 * @public
 * @instance
 * @member {?number} pageIndex
 * @memberof PSPDFKit.DocumentComparisonSource
 * @default 0
 */
type DocumentComparisonSource = {
    source: IDocumentComparisonSourceType | string | ArrayBuffer | Promise<string | ArrayBuffer>;
    pageIndex?: number;
};

/**
 * ***optional***
 * Specifies the stroke colors used for overlaid strokes of the base and second documents documents used in document comparison.
 *
 * @public
 * @memberof PSPDFKit
 * @interface DocumentComparisonStrokeColors
 * @summary Object containing the stroke colors used for overlaid strokes of the base and second documents documents used in document comparison.
 * @example
 * instance.setDocumentComparisonMode({
 *   documentA: {
 *     source: PSPDFKit.DocumentComparisonSourceType.USE_OPEN_DOCUMENT,
 *     pageIndex: 0
 *   },
 *   documentB: {
 *     source: PSPDFKit.DocumentComparisonSourceType.USE_FILE_DIALOG,
 *     pageIndex: 0
 *   },
 *   strokeColors: {
 *     documentA: PSPDFKit.Color.RED,
 *     documentB: PSPDFKit.Color.BLUE
 *   },
 *   autoCompare: false
 * });
 */
/**
 * ***optional***
 *
 * Stroke color for the base document used for document comparison.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Color} documentA
 * @memberof PSPDFKit.DocumentComparisonStrokeColors
 * @default new PSPDFKit.Color({ r: 245, g: 40, b: 27 })
 */
/**
 * Stroke color for the second document used for document comparison.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Color} documentB
 * @memberof PSPDFKit.DocumentComparisonStrokeColors
 * @default new PSPDFKit.Color({ r: 49, g: 193, b: 255 })
 */
type DocumentComparisonStrokeColors = {
    documentA?: Color;
    documentB?: Color;
};

/**
 * Defines specific configuration options related to the document comparison feature. Passed when calling {@link PSPDFKit.Instance#setDocumentComparisonMode}.
 *
 * @public
 * @memberof PSPDFKit
 * @interface DocumentComparisonConfiguration
 * @summary Object containing configuration options for document comparison.
 * @callback
 * @example
 * instance.setDocumentComparisonMode({
 *   documentA: {
 *     source: PSPDFKit.DocumentComparisonSourceType.USE_OPEN_DOCUMENT
 *   },
 *   documentB: {
 *     source: PSPDFKit.DocumentComparisonSourceType.USE_FILE_DIALOG
 *   },
 *   autoCompare: false
 * });
 */
/**
 * Settings for the base document used for document comparison.
 *
 * @public
 * @instance
 * @member {PSPDFKit.DocumentComparisonSource} documentA
 * @memberof PSPDFKit.DocumentComparisonConfiguration
 */
/**
 * Settings for the second document used for document comparison.
 *
 * @public
 * @instance
 * @member {PSPDFKit.DocumentComparisonSource} documentB
 * @memberof PSPDFKit.DocumentComparisonConfiguration
 */
/**
 * ***optional***
 *
 * Stroke colors to be used for the base and second documents strokes when overlaid for document comparison.
 *
 * Defaults to:
 *
 * ```js
 * {
 *   documentA: new PSPDFKit.Color({ r: 245, g: 40, b: 27 }),
 *   documentB: new PSPDFKit.Color({ r: 49, g: 193, b: 255 })
 * }
 * ```
 *
 * @public
 * @instance
 * @member {?PSPDFKit.DocumentComparisonStrokeColors} strokeColors
 * @memberof PSPDFKit.DocumentComparisonConfiguration
 * @default { documentA: new PSPDFKit.Color({ r: 245, g: 40, b: 27 }), documentB: new PSPDFKit.Color({ r: 49, g: 193, b: 255 }) }
 */
/**
 * ***optional***
 *
 * {@link PSPDFKit.BlendMode|Blend mode} to be used for overlaying the two source documents when performing document comparison.
 *
 * Defaults to `"darken"`.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.BlendMode} blendMode
 * @memberof PSPDFKit.DocumentComparisonConfiguration
 * @default "darken"
 */
/**
 * Set to `true` to perform automatic comparison without manual alignment of both documents. Set to `false` to manually align them.
 *
 * @public
 * @instance
 * @member {boolean} autoCompare
 * @memberof PSPDFKit.DocumentComparisonConfiguration
 */
type DocumentComparisonConfiguration = {
    documentA: DocumentComparisonSource;
    documentB: DocumentComparisonSource;
    strokeColors?: DocumentComparisonStrokeColors;
    blendMode?: IBlendMode;
    autoCompare: boolean;
};

/**
 * Describes how the pages will be laid out in the document view.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.LayoutMode} SINGLE Pages will always be displayed in the single page mode.
 *
 * This is the default mode.
 * @property {PSPDFKit.LayoutMode} DOUBLE Pages will always be displayed in groups of two.
 * @property {PSPDFKit.LayoutMode} AUTO Automatically sets the layout mode to {@link PSPDFKit.LayoutMode.SINGLE} or
 * {@link PSPDFKit.LayoutMode.DOUBLE} depending on the available space.
 *
 * Specifically {@link PSPDFKit.LayoutMode.DOUBLE} is chosen when the PSPDFKit container is in
 * landscape mode and its size is greater than 992px.
 *
 * This mode is a perfect fit for tablets in particular since it will automatically update the
 * layout mode then device orientation changes.
 *
 * When the dimensions of the viewport change (i.e. the browser window is resized), the view will
 * be restored to make the current page visible.
 */
declare const LayoutMode: {
    readonly SINGLE: "SINGLE";
    readonly DOUBLE: "DOUBLE";
    readonly AUTO: "AUTO";
};
type ILayoutMode = (typeof LayoutMode)[keyof typeof LayoutMode];

/**
 * Describes mode of page scrolling in the document view - either continuous, per spread
 * (paginated) or disabled (changing pages through the UI is disabled).
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.ScrollMode} CONTINUOUS Render all pages as a list and allow smooth scrolling.
 *
 * This is the default mode.
 * @property {PSPDFKit.ScrollMode} PER_SPREAD Makes scrolling only possible within a spread. Whenever this mode is activated, or pages are
 * changed when this mode is active, the zoom mode will be reset to
 * {@link PSPDFKit.ZoomMode.FIT_TO_VIEWPORT}.
 * @property {PSPDFKit.ScrollMode} DISABLED Makes scrolling only possible within a spread and doesn't allow changing pages.
 * Whenever this mode is activated the zoom mode will be reset to
 * {@link PSPDFKit.ZoomMode.FIT_TO_VIEWPORT}.
 */
declare const ScrollMode: {
    readonly CONTINUOUS: "CONTINUOUS";
    readonly PER_SPREAD: "PER_SPREAD";
    readonly DISABLED: "DISABLED";
};
type IScrollMode = (typeof ScrollMode)[keyof typeof ScrollMode];

/**
 * A specific zoom mode that will always be applied whenever the viewport is resized.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.ZoomMode} AUTO Generates a zoomLevel that will automatically align the page
 *   for the best viewing experience.
 * @property {PSPDFKit.ZoomMode} FIT_TO_WIDTH Uses a zoomLevel that will fit the width of the broadest
 *   page into the viewport. The height might overflow.
 * @property {PSPDFKit.ZoomMode} FIT_TO_VIEWPORT Uses a zoomLevel that will fit the current page into the
 *   viewport completely.
 */
declare const ZoomMode: {
    readonly AUTO: "AUTO";
    readonly FIT_TO_WIDTH: "FIT_TO_WIDTH";
    readonly FIT_TO_VIEWPORT: "FIT_TO_VIEWPORT";
    readonly CUSTOM: "CUSTOM";
};
type IZoomMode = (typeof ZoomMode)[keyof typeof ZoomMode];

/**
 * A specific zoom configuration that will always be applied whenever the viewport is resized.
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.WheelZoomMode} DEFAULT The viewer zooms when scroll wheel + Ctrl key is pressed.
 * @property {PSPDFKit.WheelZoomMode} ALWAYS The viewer will always zoom when scrolling using the mouse wheel
 * @property {PSPDFKit.WheelZoomMode} DISABLED Zooming via scroll wheel is disabled completely, irregardless of which key is pressed
 */
declare const WheelZoomMode: {
    readonly WITH_CTRL: "WITH_CTRL";
    readonly ALWAYS: "ALWAYS";
    readonly DISABLED: "DISABLED";
};
type IWheelZoomMode = (typeof WheelZoomMode)[keyof typeof WheelZoomMode];

/**
 * This object contains configuration options for zooming. It allows granular control over the viewer zooming behavior.
 * @public
 * @typedef {Object} ZoomConfiguration
 * @memberof PSPDFKit
 * @summary Object containing setup for zooming.
 * @example
 * deafult config:
 * PSPDFKit.load({
 *   zoom: {
 *     zoomMode: PSPDFKit.ZoomMode.AUTO,
 *     wheelZoomMode: PSPDFKit.WheelZoomMode.WITH_CTRL,
 *     options: {
 *       enableKeyboardZoom: true,
 *       enableGestureZoom: true,
 *     },
 *   },
 * });
 * @example
 * The following example sets the zoom mode to FIT_TO_WIDTH, the scroll zoom mode to DISABLED, and disables the keyboard zooming.
 * PSPDFKit.load({
 *   zoom: {
 *     zoomMode: PSPDFKit.ZoomMode.FIT_TO_WIDTH,
 *     wheelZoomMode: PSPDFKit.WheelZoomMode.DISABLED,
 *     options: {
 *       enableKeyboardZoom: false,
 *     },
 *   },
 * });
 * @property {PSPDFKit.ZoomMode | undefined} zoomMode {@link PSPDFKit.ZoomMode} - Defines the zoom mode to use.
 * @property {PSPDFKit.WheelZoomMode | undefined} wheelZoomMode {@link PSPDFKit.WheelZoomMode} - Defines the scroll zoom mode to use.
 * @property {PSPDFKit.ZoomOptions | undefined} options - The zoom options to use.
 * @property {boolean | undefined} options.enableKeyboardZoom - Controls whether keyboard shortcuts for zooming (e.g., Ctrl/Cmd +/-) are enabled. Defaults to true.
 * @property {boolean | undefined} options.enableGestureZoom - Controls whether pinch-to-zoom and other touch/trackpad zoom gestures are enabled. Defaults to true.
 */
type IZoomOptions = {
    enableKeyboardZoom?: boolean;
    enableGestureZoom?: boolean;
};
type ZoomConfiguration = {
    zoomMode?: IZoomMode | number;
    wheelZoomMode?: IWheelZoomMode;
    options?: IZoomOptions;
};

/**
 * This event will be emitted whenever the document comparison UI is shown.
 *
 * The event listener will receive the {@link PSPDFKit.DocumentComparisonConfiguration|document comparison configuration object} with which
 * {@link PSPDFKit.Instance.setDocumentComparisonMode} has been called.
 *
 * @public
 * @memberof PSPDFKit
 * @interface DocumentComparisonUIStartEvent
 */
type DocumentComparisonUIStartEvent = DocumentComparisonConfiguration;

/**
 * This event is emitted when the list of users mentioned in a comment changes or a new
 * comment is created with mentions. The `modifications` property contains a list of
 * modifications that were applied to the comment. Each modification contains the user ID
 * and the action that was performed.
 *
 * The event is *only emitted for the user that created or updated the comment* either via the
 * UI or the API. If you want to listen for changes to comments made by other users, you can
 * use the `comments.create`, `comments.change` and `comments.delete` event. You get the affected
 * comment in the event payload and can check the mentioned users using {@link PSPDFKit.Comment.getMentionedUserIds} method.
 *
 * @public
 * @example <caption>Listen for changes to the changes in the list of mentioned users in a comment</caption>
 * instance.addEventListener("comments.mention", (event) => {
 *  const { comment, modifications } = event;
 *  modifications.forEach((modification) => {
 *    const { userId, action } = modification;
 *    if (action === "ADDED") {
 *      console.log(`User ${userId} was mentioned in comment ${comment.id}`);
 *    } else {
 *      console.log(`User ${userId} was unmentioned in comment ${comment.id}`);
 *    }
 *  });
 * });
 * @memberof PSPDFKit
 * @interface CommentsMentionEvent
 * @see {@link PSPDFKit.Comment.getMentionedUserIds}
 */
/**
 * The comment that was updated.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Comment} comment
 * @memberof PSPDFKit.CommentsMentionEvent
 */
/**
 * A list of modifications that were applied to the comment.
 *
 * @public
 * @instance
 * @member {Immutable.List<{ userId: string, action: 'ADDED' | 'REMOVED' }>} modifications
 * @memberof PSPDFKit.CommentsMentionEvent
 */
type CommentsMentionEvent = {
    comment: Comment;
    modifications: List<{
        userId: string;
        action: 'ADDED' | 'REMOVED';
    }>;
};

type Signature = InkAnnotation | ImageAnnotation;
interface HistoryEvent<T> {
    action: T;
    before: AnnotationsUnion;
    after: AnnotationsUnion;
}
interface ViewStateEventMap {
    'viewState.change': (viewState: ViewState, previousViewState: ViewState) => void;
    'viewState.currentPageIndex.change': (pageIndex: number) => void;
    'viewState.zoom.change': (zoom: number) => void;
}
interface EventMap extends ViewStateEventMap {
    'annotationPresets.update': (event: AnnotationPresetsUpdateEvent) => void;
    'annotations.blur': (event: AnnotationsBlurEvent) => void;
    'annotations.change': () => void;
    'annotations.create': (annotations: List<AnnotationsUnion>) => void;
    'annotations.delete': (annotations: List<AnnotationsUnion>) => void;
    'annotations.didSave': () => void;
    'annotations.focus': (event: AnnotationsFocusEvent) => void;
    'annotations.load': (annotations: List<AnnotationsUnion>) => void;
    'annotations.press': (event: AnnotationsPressEvent) => void;
    'annotations.update': (annotations: List<AnnotationsUnion>) => void;
    'annotations.willChange': (event: {
        reason: AnnotationsWillChangeReason;
        annotations: List<AnnotationsUnion>;
    }) => void;
    'annotations.willSave': () => void;
    'annotationSelection.change': (annotations: List<AnnotationsUnion>) => void;
    'annotations.transform': (event: AnnotationsTransformEvent) => void;
    'annotations.copy': (event: AnnotationsCopyEvent) => void;
    'annotations.cut': (event: AnnotationsCutEvent) => void;
    'annotations.paste': (event: AnnotationsPasteEvent) => void;
    'annotations.duplicate': (event: AnnotationsDuplicateEvent) => void;
    'bookmarks.change': () => void;
    'bookmarks.create': (bookmarks: List<Bookmark>) => void;
    'bookmarks.update': (bookmarks: List<Bookmark>) => void;
    'bookmarks.delete': (bookmarks: List<Bookmark>) => void;
    'bookmarks.load': (bookmarks: List<Bookmark>) => void;
    'bookmarks.didSave': () => void;
    'bookmarks.willSave': () => void;
    'comments.change': () => void;
    'comments.create': (comments: List<Comment>) => void;
    'comments.delete': (comments: List<Comment>) => void;
    'comments.update': (comments: List<Comment>) => void;
    'comments.load': () => void;
    'comments.willSave': () => void;
    'comments.didSave': () => void;
    'instant.connectedClients.change': (clients: Map<string, InstantClient>) => void;
    'document.change': (operations: DocumentOperation[]) => void;
    'document.saveStateChange': (event: SaveStateChangeEvent) => void;
    'formFieldValues.update': (formFields: List<FormField>) => void;
    'formFieldValues.willSave': () => void;
    'formFieldValues.didSave': (res: {
        response: Response;
        error: Error;
    }) => void;
    'forms.willSubmit': (event: {
        preventDefault: () => void;
    }) => void;
    'forms.didSubmit': (event: {
        preventDefault: () => void;
    }) => void;
    'formFields.change': () => void;
    'formFields.create': (formFields: List<FormField>) => void;
    'formFields.delete': (formFields: List<FormField>) => void;
    'formFields.didSave': () => void;
    'formFields.load': (formFields: List<FormField>) => void;
    'formFields.update': (formFields: List<FormField>) => void;
    'formFields.willSave': () => void;
    'search.stateChange': (searchState: SearchState) => void;
    'search.termChange': (event: SearchTermChangeEvent) => void;
    'storedSignatures.change': () => void;
    'storedSignatures.create': (signature: Signature) => void;
    'storedSignatures.delete': (signature: Signature) => void;
    'storedSignatures.update': (signatures: List<Signature>) => void;
    'textLine.press': (event: TextLinePressEvent) => void;
    'textSelection.change': (selection: PublicTextSelection | null) => void;
    'history.change': (event: HistoryEvent<'undo' | 'redo'>) => void;
    'history.willChange': (event: {
        type: 'create' | 'update' | 'delete';
        annotation: Annotation;
        preventDefault: () => void;
    }) => void;
    'history.clear': () => void;
    'history.redo': (event: HistoryEvent<'redo'>) => void;
    'history.undo': (event: HistoryEvent<'undo'>) => void;
    'page.press': (event: PagePressEvent) => void;
    'inkSignatures.create': (signature: Signature) => void;
    'inkSignatures.delete': (signature: Signature) => void;
    'inkSignatures.update': (signatures: Signature[]) => void;
    'inkSignatures.change': () => void;
    'cropArea.changeStart': (opts: CropAreaChangeStartEvent) => void;
    'cropArea.changeStop': (opts: CropAreaChangeStopEvent) => void;
    'documentComparisonUI.start': (opts: DocumentComparisonUIStartEvent) => void;
    'documentComparisonUI.end': () => void;
    'annotationNote.press': (event: AnnotationNotePressEvent) => void;
    'annotationNote.hover': (event: AnnotationNoteHoverEvent) => void;
    'comments.mention': (event: CommentsMentionEvent) => void;
}

/**
 * Describes mode used to print a PDF document.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.PrintMode} DOM This method will render all pages of the PDF document in advance before it sends the results to
 * the printer. This works in all major browsers and will not give your users access to the source
 * PDF file. However, this method is CPU-bound and memory usage scales with PDF size.
 *
 * Because of its reliability and cross browsers support this method is the default.
 *
 * Some caveats when using this method:
 *
 *  - To achieve cross-browser support, we render the resulting images into the main window. We
 *    try to hide already existing HTML by applying `display: none !important`. If the printed
 *    page still contains other HTML elements, make sure to apply an appropriate print stylesheet
 *    to your web app.
 *  - This method will produce incorrect results, when pages of the document have different sizes.
 *    Unfortunately, there's no way to work around this issue since it's a CSS limitation.
 * @property {PSPDFKit.PrintMode} EXPORT_PDF This method is built to be resource efficient and to avoid having to render all pages in
 * advance, which might balloon memory usage to multi-GB on PDFs with 100+ pages.
 *
 * It supports all common browsers, however some fall back to opening the PDF file in a new tab,
 * which might give your users unwanted access to the source files.
 *
 * Google Chrome and Microsoft Internet Explorer provide the APIs required to use the native
 * renderer, as a fallback on other browser we generate and open a PDF in a new tab. This allows
 * users to print the PDF in a native PDF reader which can, as opposed to browser-built
 * implementations, talk directly to the connected printer.
 *
 * When using this print mode, we can not call the {@link PSPDFKit.RenderPageCallback} when
 * printing pages.
 *
 * Note: If the PDF is password-protected, we always fall back to opening the PDF in a new tab.
 */
declare const PrintMode: {
    readonly DOM: "DOM";
    readonly EXPORT_PDF: "EXPORT_PDF";
};
type IPrintMode = (typeof PrintMode)[keyof typeof PrintMode];

/**
 * Allows you to perform a search by a built-in pattern that matches common strings.
 *
 * Note that by design, some of these patterns might overfit the criteria (i.e. include false positive results). This might happen since we strive for
 * including all positive results and avoid data loss. Make sure to review the matches found.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.SearchPattern} CREDIT_CARD_NUMBER Catches credit card numbers with a number beginning with 1-6, and must be 13 to 19 digits long. Spaces and - are allowed anywhere in the number.
 * @property {PSPDFKit.SearchPattern} DATE Matches date formats such as mm/dd/yyyy, mm/dd/yy, dd/mm/yyyy, and dd/mm/yy.
 * It will reject any days/months greater than 31 and will match if a
 * leading zero is or is not used for a single digit day or month.
 * The delimiter can either be `-`, `.` or `/`.
 * @property {PSPDFKit.SearchPattern} TIME Matches time formats such as 00:00:00, 00:00, 00:00 PM. 12 and 24 hour formats are allowed.
 * Seconds and 12 hour AM/PM denotation are both optional.
 * @property {PSPDFKit.SearchPattern} EMAIL_ADDRESS Matches an email address with the format of xyz@xyz.xyz where xyz can be any alpha numeric character or a .
 * For more information on the pattern please see http://emailregex.com/.
 * @property {PSPDFKit.SearchPattern} INTERNATIONAL_PHONE_NUMBER Matches International style phone numbers with a prefix of + or 00, containing between 7 - 15 digits with spaces or - occurring anywhere within the number.
 * @property {PSPDFKit.SearchPattern} IP_V4 Matches an IPV4 address limited to number ranges of 0-255 with an optional mask.
 * @property {PSPDFKit.SearchPattern} IP_V6 Matches full and compressed IPv6 addresses as defined in RFC 2373.
 * @property {PSPDFKit.SearchPattern} MAC_ADDRESS Matches a MAC address with delimiters of either `-` or `:`
 * @property {PSPDFKit.SearchPattern} NORTH_AMERICAN_PHONE_NUMBER Matches a NANP (https://en.wikipedia.org/wiki/North_American_Numbering_Plan) style phone number. In general this will match US, Canadian and various other Caribbean countries.
 * The pattern will also match an optional international prefix of `+1`.
 * @property {PSPDFKit.SearchPattern} SOCIAL_SECURITY_NUMBER Matches a US social security number (SSN). The format of the number should be either XXX-XX-XXXX or XXXXXXXXX with X denoting [0-9].
 * We expect the number to have word boundaries on either side, or to be the start/end of the string.
 * @property {PSPDFKit.SearchPattern} URL Matches a URL with a prefix of http|https|www with an optional subdomain.
 * @property {PSPDFKit.SearchPattern} US_ZIP_CODE Matches a USA style Zip Code. The format expected is 00000 or 00000-0000, where the delimiter can either be `-` or `/`.
 * @property {PSPDFKit.SearchPattern} VIN Matches US and ISO 3779 standard VINs.
 * The format expects 17 characters with the last 5 characters being numeric. `I`,`O`,`Q`,`_` characters are not allowed in upper or lower case.
 */
declare const SearchPattern: {
    readonly CREDIT_CARD_NUMBER: "credit_card_number";
    readonly DATE: "date";
    readonly TIME: "time";
    readonly EMAIL_ADDRESS: "email_address";
    readonly INTERNATIONAL_PHONE_NUMBER: "international_phone_number";
    readonly IP_V4: "ipv4";
    readonly IP_V6: "ipv6";
    readonly MAC_ADDRESS: "mac_address";
    readonly NORTH_AMERICAN_PHONE_NUMBER: "north_american_phone_number";
    readonly SOCIAL_SECURITY_NUMBER: "social_security_number";
    readonly URL: "url";
    readonly US_ZIP_CODE: "us_zip_code";
    readonly VIN: "vin";
};
type ISearchPattern = (typeof SearchPattern)[keyof typeof SearchPattern];

/**
 * Defines the search type used for text search operations or when creating redaction annotations based on text search.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.SearchType} TEXT This is the default search type. This is used when you want to search for strings/text.
 * @property {PSPDFKit.SearchType} PRESET The search type when you want to use the patterns provided by us. see {@link PSPDFKit.SearchPattern} for the list of all the patterns.
 * @property {PSPDFKit.SearchType} REGEX The search type when you want to search using regex.
 * Regex syntax:
 * - Standalone: JavaScript (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions}).
 * - Server: {@link http://userguide.icu-project.org/strings/regexp|ICU regular expression}, a derivative of Perl regular expressions.
 * Regular expressions that follow the JavaScript syntax are matched in a similar way to the `RegExp.prototype.exec()` method (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec}), but ignoring capturing groups, that is, the function only returns full string matches.
 *
 */
declare const SearchType: {
    readonly TEXT: "text";
    readonly PRESET: "preset";
    readonly REGEX: "regex";
};
type ISearchType = (typeof SearchType)[keyof typeof SearchType];

/**
 * Describes and persists the properties of an annotation preset.
 *
 * Annotation presets are sets of property-value pairs for annotations that can be applied as default
 * annotations settings for toolbar items. When an annotation toolbar setting is changed by the user,
 * the annotation preset associated with the toolbar item that triggered the annotation toolbar is updated.
 * If the associated annotation preset doesn't exist, it's created with the settings that have changed.
 *
 * For properties not included in an annotation preset, the default values used when creating
 * an annotation are those of the annotation type.
 *
 * @example <caption>Creating an annotation preset and adding it to the available annotation presets</caption>
 * const myAnnotationPresets = instance.annotationPresets
 * myAnnotationPresets['my-annotation-preset'] = {
 *  strokeWidth: 2,
 * }
 * instance.setAnnotationPresets(myAnnotationPresets);
 * @public
 * @summary Annotation preset properties.
 * @interface AnnotationPreset
 * @memberof PSPDFKit
 * @seealso PSPDFKit.Configuration#annotationPresets
 * @seealso PSPDFKit.Instance#setAnnotationPresets
 * @seealso PSPDFKit.Instance~AnnotationPresetsUpdateEvent
 */
type AnnotationPreset$1 = Record<string, any>;
type AnnotationPresetID$1 = string;

type Change = AnnotationsUnion | Bookmark | FormField | FormFieldValue | Comment;

type CustomOverlayItemID = string;
interface ICustomOverlayItem {
    disableAutoZoom?: boolean;
    id: CustomOverlayItemID | null;
    node: Node | null;
    noRotate?: boolean;
    pageIndex: number;
    position: Point;
    onAppear?: null | ((...args: Array<any>) => any);
    onDisappear?: null | ((...args: Array<any>) => any);
}
declare const CustomOverlayItem_base: Record$1.Factory<ICustomOverlayItem>;
/**
 * This record is used to persist the information for a Custom Overlay Item.
 *
 * Custom Overlay Items are user defined DOM `Node`s that are rendered in a page at a given position.
 *
 * @example <caption>Creating an image and rendering it as Custom Overlay Item</caption>
 * let img = document.createElement("img");
 * img.src = "https://example.com/logo.png";
 *
 * const item = new PSPDFKit.CustomOverlayItem({
 *   id: "logo-item",
 *   node: img,
 *   pageIndex: 0,
 *   position: new PSPDFKit.Geometry.Point({ x: 100, y: 100 }),
 *   onAppear() {
 *     console.log('rendered!');
 *   }
 * });
 *
 * instance.setCustomOverlayItem(item);
 * @public
 * @memberof PSPDFKit
 * @summary Custom Item to render in a page.
 * @class CustomOverlayItem
 * @extends Immutable.Record
 * @seealso PSPDFKit.Instance#setCustomOverlayItem
 * @seealso PSPDFKit.Configuration
 */
declare class CustomOverlayItem extends CustomOverlayItem_base {
    disableAutoZoom: boolean;
    id: CustomOverlayItemID;
    node: Node;
    noRotate: boolean;
    pageIndex: number;
    position: Point;
    onAppear?: ((...args: Array<any>) => any) | null;
    onDisappear?: ((...args: Array<any>) => any) | null;
    constructor(args: ICustomOverlayItem);
}

type RendererConfiguration = {
    node: Node;
    append?: boolean | null;
    noZoom?: boolean | null;
    onDisappear?: ((arg0: Node | null) => void) | null;
};

/**
 * This object can include functions to be called when specific entities, like annotations,
 * are being rendered in the viewport, and return additional or replacement DOM content for
 * the entity instance.
 *
 * Currently only annotation's rendering can be customized using the `Annotation` key.
 *
 * If the callback returns null, the instance will be rendered normally.
 *
 * @public
 * @memberof PSPDFKit
 * @interface CustomRenderers
 * @summary Keyed list of callbacks called when entities are rendered.
 * @example
 * PSPDFKit.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => ({
 *       node: document.createElement("div").appendChild(document.createTextNode("Custom rendered!")),
 *       append: true,
 *     })
 *   }
 * });
 * @seealso PSPDFKit.Configuration.customRenderers PSPDFKit.Instance#setCustomRenderers
 */
/**
 * Annotations custom renderer callback.
 *
 * @public
 * @instance
 * @member {PSPDFKit.CustomRenderers.AnnotationCustomRendererCallback} Annotation
 * @memberof PSPDFKit.CustomRenderers
 */
/**
 * This user defined function receives the {@link AnnotationsUnion} to be rendered as argument.
 *
 * It must return a {@link PSPDFKit.RendererConfiguration} object or null.
 *
 * @public
 * @callback AnnotationCustomRendererCallback
 * @param {object} payload - Annotation data
 * @param {AnnotationsUnion} payload.annotation - Annotation to be rendered
 * @returns {PSPDFKit.RendererConfiguration}
 * @memberof PSPDFKit.CustomRenderers
 */
/**
 * This object defines the properties of a custom annotation renderer.
 *
 * It's returned from a {@link PSPDFKit.CustomRenderers.AnnotationCustomRendererCallback} function.
 *
 * Note that when `append=false` (which is the default value for the property), the default appearance
 * of the annotation is not rendered, including the pointer event listeners.
 *
 * This means that, if you want you custom content to select the annotation when clicked,
 * you'll have to add some logic to support it.
 *
 * You can add an event listener to your node in your custom renderer code,
 * and also supply a callback to the `onDisappear` property to remove the listener:
 *
 * ```js
 * PSPDFKit.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => {
 *       function selectAnnotation(event) {
 *         event.stopImmediatePropagation();
 *         instance.setSelectedAnnotation(annotation.id);
 *       }
 *       const node = document.createElement("div").appendChild(document.createTextNode("Custom rendered!"));
 *       node.addEventListener("pointerdown", selectAnnotation, {
 *         capture: true
 *       });
 *       return {
 *         node,
 *         append: false,
 *         onDisappear: () => {
 *           node.removeEventListener("pointerdown", selectAnnotation, {
 *             capture: true
 *           });
 *         }
 *       };
 *     }
 *   }
 * });
 * ```
 *
 * The `onDisappear` callback function will be run whenever the returned node reference changes,
 * and when the custom rendered component unmounts (is removed from the DOM). With this in mind,
 * and in order to save the browser some unnecessary work, you could rewrite the previous example
 * as follows:
 *
 * ```js
 * let node
 * PSPDFKit.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => {
 *       function selectAnnotation(event) {
 *         event.stopImmediatePropagation();
 *         instance.setSelectedAnnotation(annotation.id);
 *       }
 *       if (!node) {
 *         node = document.createElement("div").appendChild(document.createTextNode("Custom rendered!"));
 *         node.addEventListener("pointerdown", selectAnnotation, {
 *           capture: true
 *         });
 *       }
 *       return {
 *         node,
 *         append: false,
 *         onDisappear: () => {
 *           node.removeEventListener("pointerdown", selectAnnotation, {
 *             capture: true
 *           });
 *         }
 *       };
 *     }
 *   }
 * });
 * ```
 *
 * In this example the `onDisappear()` reference changes on every call, but since the `node` reference
 * doesn't change, `onDisappear()` will only be called when the component unmounts.
 *
 * Note that the component does not only unmount when the page it's included is scrolled some pages out,
 * but also, for example, when the annotation it's associated with is selected in the UI, in which case
 * the component is unmounted and mounted again.
 *
 * @public
 * @interface RendererConfiguration
 * @property {Node} node - DOM node to be rendered.
 * @property {?boolean} append=false - Whether the DOM node should be appended after the annotation, or replace it.
 * @property {?boolean} noZoom=false - Whether to automatically zoom the DOM node as the current {@link PSPDFKit.ViewState#zoomLevel} changes.
 * @property {?Function} onDisappear - Callback to be called whenever the custom DOM node is unmounted.
 * @memberof PSPDFKit
 */
type CustomRenderers = {
    Annotation?: (arg0: {
        annotation: AnnotationsUnion;
    }) => RendererConfiguration | null | undefined;
    CommentAvatar?: (arg0: {
        comment: Comment;
    }) => RendererConfiguration | null | undefined;
};

/**
 * An object provided the PSPDFKit for Web to custom items in the document editor toolbar and footer. This object contains methods that can be
 * invoked to retrieve and modify the current stack of document operations to be applied to the open document.
 *
 * @public
 * @interface DocumentEditorUIHandler
 * @param {PSPDFKit.DocumentEditorUIHandler.SetOperationsCallback} setOperations Hook function to modify the current stack of document operations to be applied to the open document.
 * @param {PSPDFKit.DocumentEditorUIHandler.GetSelectedPageIndexesCallback} getSelectedPageIndexes Returns the page indexes of the currently selected pages; can be used to set the scope of a new document operation, for example.
 * @memberof PSPDFKit
 */
/**
 * Callback function to modify the current stack of document operations to be applied to the open document.
 * This function is invoked with the current stack of document operations as the first argument, and must return the new stack of document operations.
 * The new stack of document operations can be the same as the current one, or a new one.
 *
 * @public
 * @callback SetOperationsCallback
 * @param {PSPDFKit.Immutable.List.<PSPDFKit.DocumentOperation|PSPDFKit.Immutable.List.<PSPDFKit.DocumentOperation>>} callback Callback that receives the current operations committed and returns a new list of operations.
 * @param {?boolean} clearPagesSelection Whether to clear the current selection of pages after returning the new operations or not.
 * @returns {PSPDFKit.Immutable.List.<PSPDFKit.DocumentOperation|PSPDFKit.Immutable.List.<PSPDFKit.DocumentOperation>>} The new stack of document operations.
 * @memberof PSPDFKit.DocumentEditorUIHandler
 */
/**
 * Retrieve the page indexes of the currently selected pages. This function can be used to set the scope of a new document operation, for example.
 *
 * @public
 * @callback GetSelectedPageIndexesCallback
 * @returns {?Array<number>} The page indexes of the currently selected pages.
 * @memberof PSPDFKit.DocumentEditorUIHandler
 */
type DocumentEditorUIHandler = {
    setOperations: (callback: (stagedDocumentOperations: List<DocumentOperation | List<DocumentOperation>>) => List<DocumentOperation | List<DocumentOperation>>, clearPagesSelection?: boolean) => void | Promise<void>;
    getSelectedPageIndexes: () => number[];
};

type BuiltInDocumentEditorFooterItem = 'cancel' | 'spacer' | 'save-as' | 'save' | 'selected-pages' | 'loading-indicator';
/**
 * Describes the properties of a Document Editor Footer Item.
 *
 * Check out [our guides](https://pspdfkit.com/guides/web/customizing-the-interface/customizing-the-document-editor-toolbar-and-footer/)
 * for more examples.
 *
 * @public
 * @memberof PSPDFKit
 * @interface DocumentEditorFooterItem
 * @seealso PSPDFKit.Instance#setDocumentEditorFooterItems PSPDFKit.Configuration#documentEditorFooterItems
 */
type BasicDocumentEditorFooterItem = {
    /**
     * ***required***
     *
     * The type of a document editor footer item.
     *
     * It can either be `custom` for user defined items or one from the {@link PSPDFKit.defaultDocumentEditorFooterItems}.
     *
     * Note: It is ***not*** possible to override this option for built-in toolbar items.
     *
     * @example
     * // In your JavaScript
     * const documentEditorFooterItems = PSPDFKit.defaultDocumentEditorFooterItems
     * documentEditorFooterItems.push({ type: 'custom', ... })
     * PSPDFKit.load({
     *  ...otherOptions,
     *  documentEditorFooterItems
     * });
     * @public
     * @instance
     * @member {string} type
     * @memberof PSPDFKit.DocumentEditorFooterItem
     */
    type: BuiltInDocumentEditorFooterItem | 'custom';
    /**
     * `custom` tool items have to define a DOM node which PSPDFKit will render.
     *
     * In this case the tool item is rendered inside of a container div. The `className` which you pass is set to this container div and not to the node that you passed.
     *
     * The `onPress` event is registered and fires any time the item is clicked.
     *
     * @public
     * @instance
     * @member {?Node} node
     * @memberof PSPDFKit.DocumentEditorFooterItem
     */
    node?: Node;
    /**
     * Useful to set a custom CSS class name on the item.
     *
     * For {@link PSPDFKit.defaultDocumentEditorFooterItems|default document editor footer items} the `className` is appended to the default
     * item ones.
     *
     * @public
     * @instance
     * @member {?string} className
     * @memberof PSPDFKit.DocumentEditorFooterItem
     */
    className?: string;
    /**
     * Unique identifier for the item.
     *
     * This is useful to identify items whose `type` is `custom`.
     *
     * @example
     * // In your JavaScript
     * const documentEditorFooterItems = PSPDFKit.defaultDocumentEditorFooterItems
     * documentEditorFooterItems.push({ type: 'custom', id: 'my-button', ... })
     * PSPDFKit.load({
     *  ...otherOptions,
     *  documentEditorFooterItems
     * });
     *
     * Note: It is ***not*** possible to override this option for built-in document editor footer items.
     * @public
     * @instance
     * @member {?string} id
     * @memberof PSPDFKit.DocumentEditorFooterItem
     */
    id?: string;
    /**
     * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
     * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
     *
     * @public
     * @member {?PSPDFKit.DocumentEditorFooterItem.OnPressCallback} onPress
     * @memberof PSPDFKit.DocumentEditorFooterItem
     */
    /**
     * @public
     * @callback OnPressCallback
     * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
     * @param {PSPDFKit.DocumentEditorUIHandler} documentEditorUIHandler An instance object to set and retrieve different state properties of the document editor UI.
     * @param {string} id The tool item id.
     * @memberof PSPDFKit.DocumentEditorFooterItem
     */
    onPress?: (e: MouseEvent, documentEditorUIHandler?: DocumentEditorUIHandler, id?: string) => void;
};
type DocumentEditorFooterItem = Omit<BasicDocumentEditorFooterItem, 'type' | 'onPress'> & ({
    type: BuiltInDocumentEditorFooterItem;
    onPress?: (e: Event) => void;
} | {
    type: 'custom';
    onPress?: (e: Event, documentEditorUIHandler: DocumentEditorUIHandler, id?: string) => void;
});

type BuiltInDocumentEditorToolbarItem = 'add' | 'remove' | 'duplicate' | 'rotate-left' | 'rotate-right' | 'move' | 'move-left' | 'move-right' | 'import-document' | 'extract-pages' | 'spacer' | 'undo' | 'redo' | 'select-all' | 'select-none' | 'zoom-out' | 'zoom-in';
/**
 * Describes the properties of a Document Editor Toolbar Item.
 *
 * Check out [our guides](https://pspdfkit.com/guides/web/customizing-the-interface/customizing-the-document-editor-toolbar-and-footer/)
 * for more examples.
 *
 * @public
 * @memberof PSPDFKit
 * @interface DocumentEditorToolbarItem
 * @extends PSPDFKit.ToolItem
 * @seealso PSPDFKit.Instance#setDocumentEditorToolbarItems PSPDFKit.Configuration#documentEditorToolbarItems
 */
/**
 * ***required***
 *
 * The type of a document editor toolbar item.
 *
 * It can either be `custom` for user defined items or one from the {@link PSPDFKit.defaultDocumentEditorToolbarItems}.
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 *
 * @example
 * // In your JavaScript
 * const documentEditorToolbarItems = PSPDFKit.defaultDocumentEditorToolbarItems
 * documentEditorToolbarItems.push({ type: 'custom', ... })
 * PSPDFKit.load({
 *  ...otherOptions,
 *  documentEditorToolbarItems
 * });
 * @public
 * @instance
 * @member {string} type
 * @memberof PSPDFKit.DocumentEditorToolbarItem
 */
/**
 * Unique identifier for the item.
 *
 * This is useful to identify items whose `type` is `custom`.
 *
 * @example
 * // In your JavaScript
 * const documentEditorToolbarItems = PSPDFKit.defaultDocumentEditorToolbarItems
 * documentEditorToolbarItems.push({ type: 'custom', id: 'my-button', ... })
 * PSPDFKit.load({
 *  ...otherOptions,
 *  documentEditorToolbarItems
 * });
 *
 * Note: It is ***not*** possible to override this option for built-in document editor toolbar items.
 * @public
 * @instance
 * @member {?string} id
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Useful to set a custom CSS class name on the item.
 *
 * For {@link PSPDFKit.defaultDocumentEditorToolbarItems|default document editor toolbar items} the `className` is appended to the default
 * item ones.
 *
 * @public
 * @instance
 * @member {?string} className
 * @memberof PSPDFKit.DocumentEditorToolbarItem
 */
/**
 * Icon for the item.
 *
 * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
 * This property can override the {@link PSPDFKit.defaultDocumentEditorToolbarItems|default items}' ones.
 *
 * @public
 * @instance
 * @member {?string} icon
 * @memberof PSPDFKit.DocumentEditorToolbarItem
 */
/**
 * Whether a custom item is selected or not.
 *
 * The selected status of {@link PSPDFKit.defaultDocumentEditorToolbarItems|default items} cannot be altered.
 *
 * Note: It is ***not*** possible to override this option for built-in document editor toolbar items.
 *
 * @public
 * @instance
 * @member {?boolean} selected
 * @memberof PSPDFKit.DocumentEditorToolbarItem
 */
/**
 * Whether the item is disabled or not.
 *
 * The property can be used to force a {@link PSPDFKit.defaultDocumentEditorToolbarItems|default item} to be
 * disabled by setting it to `true`.
 *
 * @public
 * @instance
 * @member {?boolean} disabled
 * @memberof PSPDFKit.DocumentEditorToolbarItem
 */
/**
 * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
 * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.DocumentEditorToolbarItem.OnPressCallback} onPress
 * @memberof PSPDFKit.DocumentEditorToolbarItem
 */
/**
 * @public
 * @callback OnPressCallback
 * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
 * @param {PSPDFKit.DocumentEditorUIHandler} documentEditorUIHandler An instance object to set and retrieve different state properties of the document editor UI.
 * @param {string} id The tool item id.
 * @memberof PSPDFKit.DocumentEditorToolbarItem
 */
type DocumentEditorBuiltinToolbarItem = Omit<ToolItem, 'type' | 'onPress'> & {
    type: BuiltInDocumentEditorToolbarItem;
    onPress?: (e: Event) => void;
};
type DocumentEditorToolbarItem = Omit<ToolItem, 'type' | 'onPress'> & (DocumentEditorBuiltinToolbarItem | {
    type: 'custom';
    onPress?: (e: Event, documentEditorUIHandler: DocumentEditorUIHandler, id?: string) => void;
});

/**
 * This callback defines which annotations are read-only. This callback will receive the Annotation
 * a user wants to modify and by returning `true` or `false` you can define if the annotation should
 * be read-only (`false`) or modifiable (`true`).
 *
 * For more information, see {@link PSPDFKit.Configuration#isEditableAnnotation}.
 *
 * @public
 * @callback IsEditableAnnotationCallback
 * @memberof PSPDFKit
 * @param {AnnotationsUnion} annotation
 * @example <caption>Only allow the modification of annotations from the same author</caption>
 * PSPDFKit.load({
 *   isEditableAnnotation: function(annotation) {
 *     return annotation.creatorName === myCurrentUser.name;
 *   },
 * });
 */
type IsEditableAnnotationCallback = (annotation: AnnotationsUnion) => boolean;

/**
 * This callback can be run on individual comments to detect whether the comment
 * can be edited based on its returned boolean.
 *
 * For more information, see {@link PSPDFKit.Configuration#isEditableComment}
 *
 * @public
 * @callback IsEditableCommentCallback
 * @memberof PSPDFKit
 * @param {Comment} comment
 * @example <caption>Only allow the modification of comment from the same author.</caption>
 * PSPDFKit.load({
 *   isEditableComment: function(comment) {
 *     return comment.creatorName === myCurrentUser.name;
 *   },
 * });
 */
type IsEditableCommentCallback = (comment: Comment) => boolean;

type OCGLayer = {
    name: string;
    ocgId: number;
    radioGroup?: number;
};
type OCGCollection = {
    name?: string;
    ocgId?: number;
    layers: OCGLayer[];
};
type OCG = OCGLayer | OCGCollection;
type OCGLayers = OCG[];
type OCGLayersVisibilityState = {
    visibleLayerIds: number[];
};

type OutlineElementProps = {
    children: List<OutlineElement>;
    title: string;
    color: Color | null;
    isBold: boolean;
    isItalic: boolean;
    isExpanded: boolean;
    action: Action | null;
};
declare const OutlineElement_base: Record$1.Factory<OutlineElementProps>;
/**
 * This record is used to represent document outline elements.
 * These allow the user to navigate interactively from one part of the document to another.
 *
 * Outline elements can be nested in a tree-like structure where elements are collapsible/expandable
 * to hide/reveal their subtrees.
 *
 * @public
 * @memberof PSPDFKit
 * @summary Element in the document outline tree.
 * @class OutlineElement
 * @extends Immutable.Record
 */
/**
 * Each outline element can have nested outline elements.
 * The visibility of which is controlled by {@link PSPDFKit.OutlineElement.isExpanded}.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Immutable.List.<PSPDFKit.OutlineElement>} children
 * @memberof PSPDFKit.OutlineElement
 * @seealso PSPDFKit.Instance#getDocumentOutline
 */
/**
 * The outline element title, must be human readable.
 *
 * @public
 * @instance
 * @member {string} title
 * @memberof PSPDFKit.OutlineElement
 */
/**
 * The text color of the outline element title.
 * When this value is `null` the color is the default PSPDFKit for Web UI
 * which can be configured via PSPDFKit's public CSS API.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} color
 * @memberof PSPDFKit.OutlineElement
 * @default null
 */
/**
 * Whether the outline element title is bold.
 *
 * @public
 * @instance
 * @member {boolean} isBold
 * @memberof PSPDFKit.OutlineElement
 * @default false
 */
/**
 * Whether the outline element title is italic.
 *
 * @public
 * @instance
 * @member {boolean} isItalic
 * @memberof PSPDFKit.OutlineElement
 * @default false
 */
/**
 * Whether the outline element is expanded and shows its child elements.
 *
 * @public
 * @instance
 * @member {boolean} isExpanded
 * @memberof PSPDFKit.OutlineElement
 * @default false
 */
/**
 * The action that will be triggered when the outline element is either clicked or tapped.
 *
 * Please refer to {@link PSPDFKit.Actions} for an in-depth look at PDF actions.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Actions.Action} action
 * @memberof PSPDFKit.OutlineElement
 */
declare class OutlineElement extends OutlineElement_base {
}

interface ITextLine {
    id: number | null;
    pageIndex: number | null;
    boundingBox: Rect;
    contents: string;
    hints: Hints | null;
}
declare const TextLine_base: Record$1.Factory<ITextLine>;
/**
 * @classdesc
 * A line of text displayed at a specific bounding box in the PDF file.
 *
 * You can retrieve text lines using {@link PSPDFKit.Instance#textLinesForPageIndex}.
 * @public
 * @memberof PSPDFKit
 * @summary A line of text in the PDF file.
 * @class TextLine
 * @noconstructor
 * @extends Immutable.Record
 */
declare class TextLine extends TextLine_base {
}

declare class PageInfo {
    index: number;
    label: string;
    height: number;
    width: number;
    rotation: number;
    rawPdfBoxes: RawPdfBoxes;
}

/**
 *
 * Redaction Annotation presets are sets of property-value pairs for annotations that can be applied as default
 * annotations settings for Redaction Annotations. When a property of a Redaction Annotation is changed by the user,
 * the annotation preset of the redaction annotations gets updated. This means that all the Redaction annotations
 * created after this action will use that preset unless a different preset is specified.
 *
 * For properties not included in the annotation preset, the default values of those properties are used.
 *
 * @example <caption>Creating an annotation preset and adding it to the available annotation presets</caption>
 * const myAnnotationPresets = instance.annotationPresets
 * myAnnotationPresets['redaction'] = {
 *  color: PSPDFKit.Color.BLACK,
 * }
 * instance.setAnnotationPresets(myAnnotationPresets);
 * @public
 * @summary Annotation Preset for Redaction Annotations
 * @interface RedactionAnnotationPreset
 * @memberof PSPDFKit
 */
type RedactionAnnotationPreset = {
    /**
     * Background color of the redacted area.
     *
     * @public
     * @instance
     * @member {?PSPDFKit.Color} fillColor
     * @memberof PSPDFKit.RedactionAnnotationPreset
     * @default PSPDFKit.Color.BLACK
     */
    fillColor?: Color;
    /**
     * Text to be displayed at the specified region
     * when a redaction has been applied.
     *
     * @public
     * @instance
     * @member {?string} overlayText
     * @memberof PSPDFKit.RedactionAnnotationPreset
     */
    overlayText?: string;
    /**
     * Whether the overlay text should be repeated
     * to fill the entire redaction area or just
     * be drawn once.
     *
     * It has no effect if there is no overlay text
     * specified.
     *
     * @public
     * @instance
     * @member {?boolean} repeatOverlayText
     * @memberof PSPDFKit.RedactionAnnotationPreset
     * @default false
     */
    repeatOverlayText?: boolean;
    /**
     * Color of the overlay text.
     *
     * It has no effect if there is no overlay text
     * specified.
     *
     * @public
     * @instance
     * @member {?PSPDFKit.Color} color
     * @memberof PSPDFKit.RedactionAnnotationPreset
     * @default PSPDFKit.Color.RED
     */
    color?: Color;
    /**
     * Color used for the redaction's border in its
     * marked state.
     *
     * @public
     * @instance
     * @member {?PSPDFKit.Color} outlineColor
     * @memberof PSPDFKit.RedactionAnnotationPreset
     * @default PSPDFKit.Color.RED
     */
    outlineColor?: Color;
    /**
     * Name of the creator
     *
     * @public
     * @instance
     * @member {?string} creatorName
     * @memberof PSPDFKit.RedactionAnnotationPreset
     */
    creatorName?: string;
};

declare const allowedToolbarTypes: ("link" | "ellipse" | "image" | "line" | "polygon" | "polyline" | "text" | "spacer" | "search" | "distance" | "note" | "comment" | "zoom-in" | "zoom-out" | "callout" | "arrow" | "highlighter" | "undo" | "redo" | "custom" | "signature" | "ink" | "document-editor" | "print" | "layout-config" | "marquee-zoom" | "responsive-group" | "redact-text-highlighter" | "redact-rectangle" | "cloudy-rectangle" | "dashed-rectangle" | "cloudy-ellipse" | "dashed-ellipse" | "dashed-polygon" | "document-comparison" | "measure" | "form-creator" | "content-editor" | "perimeter" | "rectangle-area" | "ellipse-area" | "polygon-area" | "ai-assistant" | "pager-expanded" | "sidebar-thumbnails" | "sidebar-document-outline" | "sidebar-annotations" | "sidebar-bookmarks" | "sidebar-signatures" | "sidebar-attachments" | "sidebar-layers" | "pager" | "multi-annotations-selection" | "pan" | "zoom-mode" | "linearized-download-indicator" | "annotate" | "text-highlighter" | "ink-eraser" | "stamp" | "rectangle" | "cloudy-polygon" | "document-crop" | "export-pdf" | "debug")[];

/**
 * Describes the properties of a Toolbar Item.
 *
 * Check out [our guides](https://pspdfkit.com/guides/web/current/customizing-the-interface/configure-the-toolbar/)
 * for more examples.
 *
 * @public
 * @memberof PSPDFKit
 * @interface ToolbarItem
 * @extends PSPDFKit.ToolItem
 * @seealso PSPDFKit.Instance#setToolbarItems PSPDFKit.Configuration#toolbarItems
 * @seealso PSPDFKit.Configuration#toolbarPlacement
 */
/**
 * ***required***
 *
 * The type of a toolbar item.
 *
 * It can either be `custom` for user defined items, `responsive-group` to combine items on smaller
 * screens, or one from the {@link PSPDFKit.defaultToolbarItems}.
 *
 * **Special types:**
 *
 * - `responsive-group` (and `annotate` as a predefined responsive group): These types can be
 *    referenced by other toolbar items via the {@link PSPDFKit.ToolbarItem#responsiveGroup}
 *    property. When the media query of the group matches, all referenced toolbar items will be
 *    hidden and the group's icon will be shown instead. When it is clicked, it will expand into
 *    the referenced toolbar items.
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 *
 * @example
 * // In your JavaScript
 * const toolbarItems = PSPDFKit.defaultToolbarItems
 * toolbarItems.push({ type: 'custom', ... })
 * PSPDFKit.load({
 *   ...otherOptions,
 *   toolbarItems
 * });
 * @public
 * @instance
 * @member {string} type
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Unique identifier for the item.
 *
 * This is useful to identify items whose `type` is `custom` or `responsive-group`.
 *
 * @example
 * // In your JavaScript
 * const toolbarItems = PSPDFKit.defaultToolbarItems
 * toolbarItems.push({ type: 'custom', id: 'my-button', ... })
 * PSPDFKit.load({
 *   ...otherOptions,
 *   toolbarItems
 * });
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 * @public
 * @instance
 * @member {?string} id
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Useful to set a custom CSS class name on the item.
 *
 * For {@link PSPDFKit.defaultToolbarItems|default items} the`className` is appended to the default
 * item ones.
 *
 * @public
 * @instance
 * @member {?string} className
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Icon for the item.
 *
 * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
 * This property can override the {@link PSPDFKit.defaultToolbarItems|default items}' ones.
 *
 * @public
 * @instance
 * @member {?string} icon
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * An array of valid {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries|media queries}
 * which are used to determine the visibility of an item.
 *
 * Internally media queries are managed using the {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia|Window.matchMedia() API}.
 *
 * As per the {@link https://www.w3.org/TR/css3-mediaqueries/#syntax|W3C Spec} in many cases media
 * queries require parenthesis for example `min-width: 480px` won't work whereas
 * `(min-width: 480px)` will.
 *
 * @public
 * @instance
 * @example <caption>Overwrite the default media query for the zoom-in default button.</caption>
 * const toolbarItems = PSPDFKit.defaultToolbarItems;
 * const index = toolbarItems.findIndex(item => item.type === "zoom-in");
 * toolbarItems[index]["mediaQueries"] = ["(min-width: 1000px)"];
 * instance.setToolbarItems(toolbarItems);
 * @member {?Array.<string>} mediaQueries
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Whether a custom item is selected or not.
 *
 * The selected status of {@link PSPDFKit.defaultToolbarItems|default items} cannot be altered.
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 *
 * @public
 * @instance
 * @member {?boolean} selected
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Whether the item is disabled or not.
 *
 * The property can be used to force a {@link PSPDFKit.defaultToolbarItems|default item} to be
 * disabled by setting it to `true`.
 *
 * @public
 * @instance
 * @member {?boolean} disabled
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Can be used to link multiple toolbar items to the same
 * {@link PSPDFKit.ToolbarItem#type|responsive-group}. Those items will be hidden when the
 * responsive group icon is displayed and can be seen when we click (i.e. open) the group.
 *
 * Whenever a toolbar item is active and it's responsive group is shown, the responsive group is
 * open so the active state can be seen.
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 *
 * @example
 * const toolbarItems = [
 *   {
 *     type: "responsive-group",
 *     id: "my-group",
 *     mediaQueries: ["max-width..."],
 *     icon: "https://example.com/icon.png",
 *   },
 *   {
 *     type: "custom",
 *     id: "my-button-one",
 *     responsiveGroup: "my-group",
 *   },
 *   {
 *     type: "custom",
 *     id: "my-button-two",
 *     responsiveGroup: "my-group",
 *   },
 * ];
 * @public
 * @instance
 * @member {?string} responsiveGroup
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Can be used to group multiple toolbar buttons in the same
 * {@link PSPDFKit.ToolbarItem#dropdownGroup}. Only one of the buttons will be visible,
 * with a dropdown arrow to hint the user about the dropdown group.
 * When the user clicks on the arrow, the rest of the buttons will be shown vertically piled.
 *
 * The toolbar buttons that belong to a dropdown group will preserve all the properties
 * of individual toolbar buttons.
 *
 * In order to decide which toolbar item is visible, the following criteria is used:
 * - If a button is globally selected, it's rendered on top.
 * - Otherwise, the last globally selected button of the list is rendered on top.
 * - If none of those has been selected before, the first button on the dropdown group is rendered on top.
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 *
 * @example
 * const toolbarItems = [
 *   {
 *     type: "responsive-group",
 *     id: "my-group",
 *     mediaQueries: ["(min-width: 980px)"],
 *     icon: "https://example.com/icon.png",
 *   },
 *   {
 *     type: "custom",
 *     id: "my-button-one",
 *     responsiveGroup: "my-group",
 *     dropdownGroup: "my-dropdown-group",
 *   },
 *   {
 *     type: "custom",
 *     id: "my-button-two",
 *     dropdownGroup: "my-dropdown-group",
 *   },
 * ];
 * @public
 * @instance
 * @member {?string} dropdownGroup
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Annotation preset for annotations. It will be passed to the `onPress` event handler in the third argument.
 *
 * @public
 * @instance
 * @member {?string} preset
 * @memberof PSPDFKit.ToolbarItem
 */
type ToolbarItemType = ToolItemType | (typeof allowedToolbarTypes)[number];
type ToolbarItem$1 = Omit<ToolItem, 'type'> & {
    type: ToolbarItemType;
    mediaQueries?: string[];
    responsiveGroup?: string;
    dropdownGroup?: string;
    preset?: AnnotationPresetID$1;
    onKeyPress?: (...args: Array<any>) => any;
};

/**
 * Contains metadata information to be included in a Digital Signature.
 *
 * This object can be passed optionally to {@link PSPDFKit.Instance#signDocument|`PSPDFKit.Instance.signDocument()`}
 * as part of {@link PSPDFKit.SignaturePreparationData|`PSPDFKit.SignaturePreparationData`}.
 *
 * @example <caption>Specifying the signer name, signature reason and location for a Digital Signature (Standalone)</caption>
 * instance.signDocument(
 *   {
 *     signatureMetadata: {
 *       signerName: "John Doe",
 *       signatureReason: "Testing",
 *       signatureLocation: "San Francisco"
 *     }
 *   }, getPKCS7Container)
 *   .then(function () {
 *     console.log("The document has been signed!");
 *   });
 * @public
 * @summary Digital Signature Metadata.
 * @property {?string} signerName The name of the entity that signed the document.
 * @property {?string} signatureReason The motivation for signing the document.
 * @property {?string} signatureLocation The place where the document was signed.
 * @summary Digital signing preparation data.
 * @interface SignatureMetadata
 * @memberof PSPDFKit
 */
type SignatureMetadata = {
    signerName?: string;
    signatureReason?: string;
    signatureLocation?: string;
};

/**
 * @public
 * @property {number} pageIndex Index of the page for the digital signature.
 * @property {PSPDFKit.Geometry.Rect} boundingBox Coordinates and dimensions of the digital signature.
 * @summary Page, coordinates and dimensions of a digital signature.
 * @interface SignaturePosition
 * @memberof PSPDFKit
 */
type SignaturePosition = {
    pageIndex: number;
    boundingBox: Rect;
};

/**
 * Specifies the signature appearance mode: whether graphics, description, or both are included in it.
 * See https://pspdfkit.com/guides/web/signatures/digital-signatures/signature-lifecycle/configure-digital-signature-appearance/ for a detailed discussion of the signature modes.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.SignatureAppearanceMode} signatureOnly Only the graphic is included in the signature appearance.
 * @property {PSPDFKit.SignatureAppearanceMode} signatureAndDescription Both the graphic and description are included in the signature appearance.
 * @property {PSPDFKit.SignatureAppearanceMode} descriptionOnly Only the description is included in the signature appearance.
 */
declare const SignatureAppearanceMode: {
    readonly signatureOnly: "signatureOnly";
    readonly signatureAndDescription: "signatureAndDescription";
    readonly descriptionOnly: "descriptionOnly";
};
type ISignatureAppearanceMode = (typeof SignatureAppearanceMode)[keyof typeof SignatureAppearanceMode];

type SignatureAppearance = {
    mode?: ISignatureAppearanceMode;
    showSigner?: boolean;
    showSignDate?: boolean;
    showReason?: boolean;
    showLocation?: boolean;
    showWatermark?: boolean;
    showDateTimezone?: boolean;
    watermarkImage?: Blob | File;
    graphicImage?: Blob | File;
};

/**
 * Contains information to be used for preparing a document to be signed digitally.
 *
 * This object can be passed optionally to {@link `PSPDFKit.Instance.signDocument()`}
 * with specific parameters for the preparation of the digital signature.
 *
 * `formFieldName` and `position` cannot be set at the same time, or an error will be thrown.
 *
 * This is the property that can be included in the object:
 *
 * @example <caption>Setting the digital signature container reserved size when signing (Server)</caption>
 * instance.signDocument({
 *   placeholderSize: 65536 // Specify a container with a 64 KB size
 * })
 *   .then(function () {
 *     console.log("The document has been signed!");
 *   });
 * @public
 * @summary Digital signing preparation data.
 * @property {?number} placeholderSize - Size (bytes) to be reserved for the digital signature container. The default is 32 KB (32768 bytes).
 * @property {?boolean} flatten - Whether the document should be flatten before digitally signing it. The default is `false`. Note that flattening a document may remove previous digital signatures.
 * @property {?PSPDFKit.SignatureMetadata} signatureMetadata  - Signature Meta Data for the digitally signing it.
 * @property {?string} formFieldName - Name of the existing signature form field to apply the signature to.
 * @property {?PSPDFKit.SignaturePosition} position - Page index and bounding box of the signature.
 * @property {?PSPDFKit.SignatureAppearance} appearance - Appearance options for the digital signature.
 * @property {?PSPDFKit.SigningData} signingData  - Certificates, private key and signature type to sign the document with.
 * @interface SignaturePreparationData
 * @memberof PSPDFKit
 */
/**
 * This object can be provided optionally as part of the {@link PSPDFKit.SignaturePreparationData|`PSPDFKit.SignaturePreparationData`}
 * passed as first argument when calling {@link PSPDFKit.Instance#signDocument|`instance.signDocument()`} and contains
 * the certificates, private key and signature type for the SDK to use for signing the document using the Web Crypto API.
 *
 * `certificates` must be an `Array` of `ArrayBuffer` (DER-encoded) or `string` (PEM-encoded) containing X.509 certificates.
 *
 * The SDK can sign the document using the {@link https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto|Web SubtleCrypto API}
 * as long as the certificate chain and private key are provided here.
 *
 * `privatekey` must be a `string` that contains the private key to sign (PEM-encoded). If `privateKey` is not included, {@link PSPDFKit.TwoStepSignatureCallback|`PSPDFKit.TwoStepSignatureCallback`} needs to be passed
 * as second argument for the `instance.signDocument()` call to perform the signing.
 *
 * If `certificates` is not provided, only `PSPDFKit.SignatureType.CMS` can be created.
 *
 * If `signatureType` is not provided, `PSPDFKit.SignatureType.CAdES` will be used by default as long as `certificates` is provided,
 * and will default to `PSPDFKit.SignatureType.CMS` otherwise.
 *
 * If `timestamp` is provided, the `signatureType` must be `PSPDFKit.SignatureType.CAdES`.
 *
 * @public
 * @memberof PSPDFKit
 * @member {object} SigningData
 * @property {?(ArrayBuffer[] | string[])} certificates - Certificates used to sign the document.
 * @property {?PSPDFKit.SignatureType} signatureType - Signature type.
 * @property {?string} privateKey - Private key used to sign the document.
 * @property {?PSPDFKit.SignatureContainerType} signatureContainer - Signature container type. Can be `PSPDFKit.SignatureContainerType.raw` or `PSPDFKit.SignatureContainerType.pkcs7`.
 * @property {?PSPDFKit.PAdESLevel} padesLevel - PAdES level to use when creating the signature (Document Engine only). This parameter is ignored when the signatureType is `cms`. Defaults to `b-lt`.
 * @property {?object} timestamp - Timestamping authority information (Standalone only).
 * @property {string} timestamp.url - URL of the timestamp server.
 * @property {?string} timestamp.username - Username for the timestamp server.
 * @property {?string} timestamp.password - Password for the timestamp server.
 * @property {?boolean} ltv - Flag to enable LTV (Long Term Validation) for the signature (Standalone only).
 */
type SignatureContainerType = 'raw' | 'pkcs7';
type TimestampType = {
    url: string;
    username?: string;
    password?: string;
};
type SigningData = {
    certificates?: ArrayBuffer[] | string[];
    signatureType: SignatureTypeType;
    signatureContainer?: SignatureContainerType;
    privateKey?: string;
    timestamp?: TimestampType;
    ltv?: boolean;
    padesLevel?: PAdESLevelType;
};
type SignaturePreparationData = {
    placeholderSize?: number;
    flatten?: boolean;
    formFieldName?: string;
    position?: SignaturePosition;
    appearance?: SignatureAppearance;
};
type SignatureCreationData = SignaturePreparationData & {
    signatureMetadata?: SignatureMetadata;
} & {
    signingData?: SigningData;
};

/**
 * Represents an OCSP (Online Certificate Status Protocol) response.
 *
 * @public
 * @interface OcspResponse
 * @memberof PSPDFKit
 */
/**
 * The serial number of the certificate whose revocation status was checked.
 *
 * @public
 * @instance
 * @member {string} serialNumber
 * @memberof PSPDFKit.OcspResponse
 */
/**
 * The OCSP response body as an `ArrayBuffer` (DER-encoded structure), as defined in [RFC6960]{@link https://www.rfc-editor.org/info/rfc6960}.
 *
 * @public
 * @instance
 * @member {ArrayBuffer} body
 * @memberof PSPDFKit.OcspResponse
 */
type OcspResponse = {
    serialNumber: string;
    body: ArrayBuffer;
};
/**
 * Represents the result of a signing process that returns a PKCS#7 (CMS) signature.
 *
 * @public
 * @interface SignatureCallbackResponsePkcs7
 * @memberof PSPDFKit
 */
/**
 * The DER-encoded PKCS#7 signature as an `ArrayBuffer`.
 *
 * @public
 * @instance
 * @member {ArrayBuffer} pkcs7
 * @memberof PSPDFKit.SignatureCallbackResponsePkcs7
 */
/**
 * Optional array of OCSP responses. Required if the signature needs to be LTV enabled.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.OcspResponse[]} ocspResponses
 * @memberof PSPDFKit.SignatureCallbackResponsePkcs7
 */
type SignatureCallbackResponsePkcs7 = {
    pkcs7: ArrayBuffer;
    ocspResponses?: OcspResponse[];
};
/**
 * Represents the result of a signing process that returns a raw, (for instance, PKCS#1) signature.
 *
 * @public
 * @interface SignatureCallbackResponseRaw
 * @memberof PSPDFKit
 */
/**
 * The certificate chain to include in the digital signature.
 * It can be a list of DER-encoded (represented as an `ArrayBuffer`) or PEM-encoded certificates.
 *
 * @public
 * @instance
 * @member {ArrayBuffer[] | string[]} certificates
 * @memberof PSPDFKit.SignatureCallbackResponseRaw
 */
/**
 * The raw (for example, PKCS#1) signature as an ArrayBuffer.
 *
 * @public
 * @instance
 * @member {ArrayBuffer} signedData
 * @memberof PSPDFKit.SignatureCallbackResponseRaw
 */
/**
 * Optional timestamp token, DER-encoded. The format should be as
 * specified by [RFC3161]{@link https://www.rfc-editor.org/info/rfc3161}. If no timestamp response is provided, the signing
 * process will fallback to the optional `signingData.timestamp` field of
 * `PSPDFKit.SignaturePreparationData`.
 *
 * @public
 * @instance
 * @member {?ArrayBuffer} timestampResponse
 * @memberof PSPDFKit.SignatureCallbackResponseRaw
 */
/**
 * Optional array of OCSP responses. Required if the signature needs to be LTV enabled.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.OcspResponse[]} ocspResponses
 * @memberof PSPDFKit.SignatureCallbackResponseRaw
 */
type SignatureCallbackResponseRaw = {
    certificates: ArrayBuffer[] | string[];
    signedData: ArrayBuffer;
    timestampResponse?: ArrayBuffer;
    ocspResponses?: OcspResponse[];
};
/**
 * This callback is called when a document has been prepared for digitally signing by calling
 * {@link PSPDFKit.Instance#signDocument|`instance.signDocument()`}. It receives the current document hash, file contents and data to be signed
 * as arguments, and must return a `Promise` object that resolves to any of these types:
 *  - An `ArrayBuffer` that contains either the signed data or a PKCS7 container that includes it.
 *  - A `SignatureCallbackResponsePkcs7` that is structured type for when the signature device or service creates signatures
 *    in the PKCS#7 format.
 *  - A `SignatureCallbackResponseRaw` that is structured type for when the signature device or service creates signatures
 *    in the raw (for instance, PKCS#1.5) format.
 * If the returned `Promise` object rejects, the document will not be signed.
 *
 * The provided file contents or the data to be signed can be used as input for the Web Crypto API, or for a
 * signing service of your choice to be signed (hashed and encrypted). The file contents hash is
 * also provided so it can be used it to verify the validity of the contents.
 *
 * See
 * {@link https://pspdfkit.com/guides/web/current/digital-signatures/digital-signatures-on-web/#setting-up-digital-signatures-on-standalone|this guide article}
 * for more information on how to digitally sign a document on Standalone.
 *
 * @public
 * @callback TwoStepSignatureCallback
 * @memberof PSPDFKit
 * @param {object} signaturePreparedData - Signature prepared data.
 * @param {string} signaturePreparedData.hash - Hash of the current document.
 * @param {?ArrayBuffer} signaturePreparedData.fileContents - Content of the file to be signed. Provided only for CMS signatures.
 * @param {ArrayBuffer} signaturePreparedData.dataToBeSigned - Data to be signed for CAdES signatures.
 * @returns {Promise<ArrayBuffer | PSPDFKit.SignatureCallbackResponsePkcs7 | PSPDFKit.SignatureCallbackResponseRaw>} A promise that resolves to any of these:
 *  - An `ArrayBuffer` that contains the signed data in the PKCS#1.5 or PKCS#7 format.
 *  - A `SignatureCallbackResponsePkcs7`, for when the signature device or service creates signatures in the PKCS#7 format.
 *  - A `SignatureCallbackResponseRaw`, for when the signature device or service creates signatures in the raw (for instance, PKCS#1.5) format.
 * The `ArrayBuffer` return type is deprecated. It's recommended to return either a `SignatureCallbackResponsePkcs7` or `SignatureCallbackResponseRaw`, depending on the signature format.
 * @example <caption>Sign document (Standalone)</caption>
 * instance.signDocument(null, function({ hash, fileContents }) {
 *   return new Promise(function(resolve, reject) {
 *     const PKCS7Container = getPKCS7Container(hash, fileContents);
 *     if (PKCS7Container != null) {
 *       return resolve(PKCS7Container)
 *     }
 *     reject(new Error("Could not retrieve the PKCS7 container."))
 *   })
 * }).then(function() {
 *   console.log("Document signed!");
 * })
 */
type TwoStepSignatureCallback = (arg0: {
    hash: string;
    fileContents: ArrayBuffer | null;
    dataToBeSigned: ArrayBuffer;
}) => Promise<ArrayBuffer | SignatureCallbackResponsePkcs7 | SignatureCallbackResponseRaw>;

/**
 * Contains information to be optionally passed along to the backend signing service when
 * {@link `PSPDFKit.Instance.signDocument()`} is called, so it can be used
 * for identification, security or any other purpose.
 *
 * @public
 * @summary Data for the digital signing service.
 * @typedef {PSPDFKit.ServerSigningServiceData | PSPDFKit.StandaloneSigningServiceData} SigningServiceData
 * @memberof PSPDFKit
 */
type SigningServiceData = ServerSigningServiceData | StandaloneSigningServiceData;
/**
 * *Server only*
 *
 * Contains information to be optionally passed along to the signing service when
 * {@link `PSPDFKit.Instance.signDocument()`} is called in server mode, so it can be used
 * for identification, security or any other purpose.
 *
 * To learn more about how to set up the signing service check
 * {@link https://pspdfkit.com/guides/web/current/digital-signatures/digital-signatures-on-web/#setting-up-digital-signatures-on-the-server|this guide article}.
 *
 * This is the property that can be included in the object:
 *
 * @example <caption>Passing a string for the signing service when signing (Server)</caption>
 * instance.signDocument(null, {
 *   signingToken: "My security token"
 * })
 *   .then(function () {
 *     console.log("The document has been signed!");
 *   });
 * @public
 * @property {string} signingToken - Token to be passed by the backend to the signing service.
 * @summary Data for the digital signing service.
 * @interface ServerSigningServiceData
 * @memberof PSPDFKit
 */
type ServerSigningServiceData = {
    signingToken: string;
};
/**
 * *Standalone only*
 *
 * Contains information needed for signing with Nutrient backend in standalone mode. Supports the following backends:
 *
 * * Document Engine (requires Document Engine >= 1.6.0)
 * * {@link https://www.nutrient.io/api/|DWS}
 *
 * The document loaded in your instance will not be transferred over the network, instead document hash and
 * signature properties will be prepared locally and passed to the backend to perform the signing via certificate,
 * finally digital signature is embedded into the document locally.
 *
 * Uses JSON Web Token (JWT) to authorize with the PSPDFKit backend. See Document Engine's
 * {@link https://pspdfkit.com/api/reference/document-engine/upstream/#tag/JWT-authorization|API Reference}
 * for more details about the JWT authorization.
 *
 * @example <caption>Signing document in Web standalone via PSPDFKit backend</caption>
 * instance.signDocument(null, {
 *   jwt: "<auth_token>"
 * })
 *   .then(function () {
 *     console.log("The document has been signed!");
 *   });
 * @public
 * @property {string} jwt - Authentication token needed to authenticate the signing request with the backend.
 * @property {string} serverUrl - Base server URL to use as the signing backend.
 *                                The `<server_url>/api/sign_hash` is used as the signing endpoint
 *                                and `<server_url>/api/get_certificates` is used to retrieve the certificates.
 * @property {string} signingToken - Optional signing token to be passed by the backend to the signing service. Valid only when signing via Document Engine.
 * @summary Data for the hash signing process.
 * @interface StandaloneSigningServiceData
 * @memberof PSPDFKit
 * @since Document Engine 1.6.0
 */
type StandaloneSigningServiceData = {
    jwt: string;
    serverUrl?: string;
    signingToken?: string;
};

/**
 * This event is emitted whenever an annotation is about to be resized.
 *
 * You can use this event to add custom resize behavior for individual annotations.
 *
 * @example <caption>Log text annotation value</caption>
 * instance.setOnAnnotationResizeStart((event) => {
 *   if (event.annotation instanceof PSPDFKit.Annotations.TextAnnotation) {
 *     return {
 *         maintainAspectRatio: true
 *     }
 *   }
 * });
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsResizeEvent
 */
/**
 * The annotation that is resizing.
 *
 * Remember that annotations are `Immutable.map`.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Annotations} annotation
 * @memberof PSPDFKit.AnnotationsResizeEvent
 */
/**
 * This boolean represents if the user is holding the shift key.
 *
 * @public
 * @instance
 * @member {boolean} isShiftPressed
 * @memberof PSPDFKit.AnnotationsResizeEvent
 */
/**
 * This holds the name of the anchor the user is using the resize the annotation.
 *
 * @public
 * @instance
 * @member {PSPDFKit.ResizeAnchor} resizeAnchor
 * @memberof PSPDFKit.AnnotationsResizeEvent
 */
type AnnotationsResizeEvent = {
    annotation: AnnotationsUnion;
    isShiftPressed: boolean;
    resizeAnchor: ResizeAnchor;
};
type ResizeAnchor = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT';

/**
 * The configuration of the resizing behavior of the annotations
 *
 * @public
 * @typedef AnnotationResizeStartCallbackConfiguration
 * @property {?boolean} maintainAspectRatio - set to `true` to keep aspect ratio while resizing.
 * @property {?number} minWidth - minimum width of the annotation while resizing.
 * @property {?number} maxWidth - maximum width of the annotation while resizing.
 * @property {?number} minHeight - minimum height of the annotation while resizing.
 * @property {?number} maxHeight - maximum height of the annotation while resizing.
 */
type AnnotationResizeStartCallbackConfiguration = {
    maintainAspectRatio?: boolean;
    minWidth?: number | undefined;
    minHeight?: number | undefined;
    maxWidth?: number | undefined;
    maxHeight?: number | undefined;
};
/**
 * This callback is called whenever an annotation is about to be resized. You can use it to control resize behavior.
 *
 * @public
 * @callback AnnotationResizeStartCallback
 * @memberof PSPDFKit
 * @param {PSPDFKit.AnnotationsResizeEvent} event The event containing information regarding the resizing of the annotation
 * @returns {AnnotationResizeStartCallbackConfiguration|undefined} The configuration of the resize behavior or undefined for default behavior.
 */
type AnnotationResizeStartCallback = (event: AnnotationsResizeEvent) => AnnotationResizeStartCallbackConfiguration | undefined;

/**
 * Describes the properties of a Text Comparison Instance Toolbar Item.
 * @public
 * @memberof PSPDFKit
 * @interface TextComparisonInnerToolbarItem
 * @extends PSPDFKit.ToolItem
 * @seealso PSPDFKit.TextComparisonInstance#setInnerToolbarItems PSPDFKit.TextComparisonConfiguration#instanceToolbarItems
 */
/**
 * ***required***
 *
 * The type of a text comparison instance toolbar item.
 *
 * It can either be `custom` for user defined items or one from the {@link PSPDFKit.defaultTextComparisonInnerToolbarItems}.
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 * @example
 * // In your JavaScript
 * const innerToolbarItems = PSPDFKit.defaultTextComparisonInnerToolbarItems
 * innerToolbarItems.push({ type: 'custom', ... })
 * PSPDFKit.loadTextComparison({
 *  ...otherOptions,
 *  innerToolbarItems,
 * });
 * @public
 * @instance
 * @member {string} type
 * @memberof PSPDFKit.TextComparisonInnerToolbarItem
 */
/**
 * Unique identifier for the item.
 *
 * This is useful to identify items whose `type` is `custom`.
 * @example
 * // In your JavaScript
 * const innerToolbarItems = PSPDFKit.defaultTextComparisonInnerToolbarItems
 * innerToolbarItems.push({ type: 'custom', id: 'my-button', ... })
 * PSPDFKit.loadTextComparison({
 *  ...otherOptions,
 *  innerToolbarItems,
 * });
 *
 * Note: It is ***not*** possible to override this option for built-in text comparison toolbar items.
 * @public
 * @instance
 * @member {?string} id
 * @memberof PSPDFKit.TextComparisonInnerToolbarItem
 */
/**
 * Useful to set a custom CSS class name on the item.
 *
 * For {@link PSPDFKit.defaultTextComparisonInnerToolbarItems|default text comparison instance toolbar items} the `className` is appended to the default
 * item ones.
 * @public
 * @instance
 * @member {?string} className
 * @memberof PSPDFKit.TextComparisonInnerToolbarItem
 */
/**
 * Icon for the item.
 *
 * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
 * This property can override the {@link PSPDFKit.defaultTextComparisonInnerToolbarItems|default items}' ones.
 * @public
 * @instance
 * @member {?string} icon
 * @memberof PSPDFKit.TextComparisonInnerToolbarItem
 */
/**
 * Whether a custom item is selected or not.
 *
 * The selected status of {@link PSPDFKit.defaultTextComparisonInnerToolbarItems|default items} cannot be altered.
 *
 * Note: It is ***not*** possible to override this option for built-in text comparison instance toolbar items.
 * @public
 * @instance
 * @member {?boolean} selected
 * @memberof PSPDFKit.TextComparisonInnerToolbarItem
 */
/**
 * Whether the item is disabled or not.
 *
 * The property can be used to force a {@link PSPDFKit.defaultTextComparisonInnerToolbarItems|default item} to be
 * disabled by setting it to `true`.
 * @public
 * @instance
 * @member {?boolean} disabled
 * @memberof PSPDFKit.TextComparisonInnerToolbarItem
 */
/**
 * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
 * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
 * @public
 * @instance
 * @member {?PSPDFKit.TextComparisonInnerToolbarItem.OnPressCallback} onPress
 * @memberof PSPDFKit.TextComparisonInnerToolbarItem
 */
/**
 * @public
 * @callback OnPressCallback
 * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
 * @param {PSPDFKit.DocumentEditorUIHandler} documentEditorUIHandler An instance object to set and retrieve different state properties of the document editor UI.
 * @param {string} id The tool item id.
 * @memberof PSPDFKit.TextComparisonInnerToolbarItem
 */
declare const allowedTextComparisonInnerToolbarItem: string[];
type TextComparisonInnerToolbarItemType = ToolItemType | (typeof allowedTextComparisonInnerToolbarItem)[number];
type TextComparisonInnerToolbarItem = Omit<ToolItem, 'type' | 'onPress'> & {
    type: TextComparisonInnerToolbarItemType;
    mediaQueries?: string[];
    responsiveGroup?: string;
    dropdownGroup?: string;
};

/**
 * Describes the properties of a Text Comparison Toolbar Item.
 * @public
 * @memberof PSPDFKit
 * @interface TextComparisonToolbarItem
 * @extends PSPDFKit.ToolItem
 * @seealso PSPDFKit.TextComparisonInstance#setToolbarItems PSPDFKit.TextComparisonConfiguration#toolbarItems
 */
/**
 * ***required***
 *
 * The type of a text comparison toolbar item.
 *
 * It can either be `custom` for user defined items or one from the {@link PSPDFKit.defaultTextComparisonToolbarItems}.
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 * @example
 * // In your JavaScript
 * const toolbarItems = PSPDFKit.defaultTextComparisonToolbarItems
 * toolbarItems.push({ type: 'custom', ... })
 * PSPDFKit.loadTextComparison({
 *  ...otherOptions,
 *  toolbarItems
 * });
 * @public
 * @instance
 * @member {string} type
 * @memberof PSPDFKit.TextComparisonToolbarItem
 */
/**
 * Unique identifier for the item.
 *
 * This is useful to identify items whose `type` is `custom`.
 * @example
 * // In your JavaScript
 * const toolbarItems = PSPDFKit.defaultTextComparisonToolbarItems
 * toolbarItems.push({ type: 'custom', id: 'my-button', ... })
 * PSPDFKit.loadTextComparison({
 *  ...otherOptions,
 *  toolbarItems
 * });
 *
 * Note: It is ***not*** possible to override this option for built-in text comparison toolbar items.
 * @public
 * @instance
 * @member {?string} id
 * @memberof PSPDFKit.ToolbarItem
 */
/**
 * Useful to set a custom CSS class name on the item.
 *
 * For {@link PSPDFKit.defaultTextComparisonToolbarItems|default text comparison toolbar items} the `className` is appended to the default
 * item ones.
 * @public
 * @instance
 * @member {?string} className
 * @memberof PSPDFKit.TextComparisonToolbarItem
 */
/**
 * Icon for the item.
 *
 * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
 * This property can override the {@link PSPDFKit.defaultTextComparisonToolbarItems|default items}' ones.
 * @public
 * @instance
 * @member {?string} icon
 * @memberof PSPDFKit.TextComparisonToolbarItem
 */
/**
 * Whether a custom item is selected or not.
 *
 * The selected status of {@link PSPDFKit.defaultTextComparisonToolbarItems|default items} cannot be altered.
 *
 * Note: It is ***not*** possible to override this option for built-in text comparison toolbar items.
 * @public
 * @instance
 * @member {?boolean} selected
 * @memberof PSPDFKit.TextComparisonToolbarItem
 */
/**
 * Whether the item is disabled or not.
 *
 * The property can be used to force a {@link PSPDFKit.defaultTextComparisonToolbarItems|default item} to be
 * disabled by setting it to `true`.
 * @public
 * @instance
 * @member {?boolean} disabled
 * @memberof PSPDFKit.TextComparisonToolbarItem
 */
/**
 * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
 * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
 * @public
 * @instance
 * @member {?PSPDFKit.TextComparisonToolbarItem.OnPressCallback} onPress
 * @memberof PSPDFKit.TextComparisonToolbarItem
 */
/**
 * @public
 * @callback OnPressCallback
 * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
 * @param {PSPDFKit.DocumentEditorUIHandler} documentEditorUIHandler An instance object to set and retrieve different state properties of the document editor UI.
 * @param {string} id The tool item id.
 * @memberof PSPDFKit.TextComparisonToolbarItem
 */
declare const allowedTextComparisonToolbarItem: string[];
type TextComparisonToolbarItemType = ToolItemType | (typeof allowedTextComparisonToolbarItem)[number];
type TextComparisonToolbarItem = Omit<ToolItem, 'type' | 'onPress'> & {
    type: TextComparisonToolbarItemType;
    mediaQueries?: string[];
    responsiveGroup?: string;
    dropdownGroup?: string;
};

/**
 * Describes theme to use.
 *
 * Note: Themes are not supported in IE and setting this option won't have any effect: IE users
 * will get the default light theme. You can customize the appearance of the UI using our public
 * CSS classes. Please refer to
 * {@link https://pspdfkit.com/guides/web/current/customizing-the-interface/css-customization/|this guide article}
 * for information on how to customize the appearance.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.Theme} LIGHT Light mode. This is the default theme.
 * @property {PSPDFKit.Theme} DARK Dark mode.
 * @property {PSPDFKit.Theme} AUTO Uses {@link PSPDFKit.Theme.LIGHT} or {@link PSPDFKit.Theme.DARK} based on the user preferences
 * and the `prefers-color-scheme` media query. Note this is not available in every browser.
 */
declare const Theme: {
    readonly LIGHT: "LIGHT";
    readonly DARK: "DARK";
    readonly AUTO: "AUTO";
};
type ITheme = (typeof Theme)[keyof typeof Theme];

declare const _default: {};

/**
 * This describes the properties of a {@link PSPDFKit.loadTextComparison} configuration.
 * @public
 * @memberof PSPDFKit
 * @interface TextComparisonConfiguration
 */
/**
 * ***required***
 *
 * Selector or element where Text Comparison UI for Web will be mounted.
 *
 * The element must have a `width` and `height` that's greater than zero. Text Comparison UI for Web adapts to the dimensions
 * of this element. This way, applying responsive rules will work as expected.
 *
 * The element can be styled using relative values as you would expect it to (CSS media queries
 * are encouraged).
 * @example
 * // In your HTML
 * <div class="foo"></div>
 *
 * // In your JavaScript
 * PSPDFKit.loadTextComparison({ container: '.foo', documentA: ..., documentB: ..., ... });
 * // or
 * const element = document.getElementsByClassName('foo')[0]
 * PSPDFKit.loadTextComparison({  container: element, documentA: ..., documentB: ..., ... });
 * @public
 * @instance
 * @member {string|HTMLElement} container
 * @memberof PSPDFKit.TextComparisonConfiguration
 */
/**
 * ***required, Standalone only***
 *
 * The URL for the base document or its content as `ArrayBuffer` used for comparison.
 *
 * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
 * @example <caption>Load a PDF document from an URI</caption>
 * PSPDFKit.loadTextComparison({ documentA: 'https://example.com/document.pdf', ... });
 * @example <caption>Load a document from an ArrayBuffer</caption>
 * PSPDFKit.loadTextComparison({ documentA: arrayBuffer, ... });
 * @public
 * @standalone
 * @instance
 * @member {string|ArrayBuffer} documentA
 * @memberof PSPDFKit.TextComparisonConfiguration
 */
/**
 * ***required, Standalone only***
 *
 * The URL for the second document or its content as `ArrayBuffer` used for comparison.
 *
 * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
 * @example <caption>Load a PDF document from an URI</caption>
 * PSPDFKit.loadTextComparison({ documentB: 'https://example.com/document.pdf', ... });
 * @example <caption>Load a document from an ArrayBuffer</caption>
 * PSPDFKit.loadTextComparison({ documentB: arrayBuffer, ... });
 * @public
 * @standalone
 * @instance
 * @member {string|ArrayBuffer} documentB
 * @memberof PSPDFKit.TextComparisonConfiguration
 */
/**
 * ***Standalone only***
 *
 * PSPDFKit for Web license key from https://customers.pspdfkit.com.
 *
 * If not provided, the Text Comparison UI will run in trial mode for a limited time and then request the user to visit
 * {@link https://pspdfkit.com/try/} to request a trial license.
 * @example <caption>Activate with a license key</caption>
 * PSPDFKit.loadTextComparison({ licenseKey: "YOUR_LICENSE_KEY_GOES_HERE", ... });
 * @public
 * @standalone
 * @instance
 * @member {?string} licenseKey
 * @memberof PSPDFKit.TextComparisonConfiguration
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected URL for all PSPDFKit assets. This setting is
 * necessary when you load Text Comparison UI for Web JavaScript from a different URL.
 *
 * If your assets are served from a different origin, you have to include proper CORS headers:
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
 * @example
 * PSPDFKit.loadTextComparison({ baseUrl: 'https://public-server.pspdfkit.com/' });
 * @instance
 * @public
 * @member {?string} baseUrl
 * @memberof PSPDFKit.TextComparisonConfiguration
 * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected URL for the Core worker Text Comparison UI assets in Standalone mode.
 * This setting may be necessary when you integrate TextComparison UI for Web JavaScript in an environment that limits
 * the size of the static assets, like Salesforce.
 *
 * If your Core assets are served from a different origin, you have to include proper CORS headers:
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
 *
 * and `nutrient-viewer-[hash].wasm`) must be located in a `nutrient-viewer-lib` subfolder accessible
 * from the `baseCoreUrl`.
 * @example
 * PSPDFKit.loadTextComparison({ baseCoreUrl: 'https://public-server.pspdfkit.com/pspdfkit-core/' });
 * @instance
 * @public
 * @member {?string} baseCoreUrl
 * @memberof PSPDFKit.TextComparisonConfiguration
 * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
 * from the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected Text Comparison UI Document Engine URL. This setting is necessary
 * when your Text Comparison UI Document Engine is located under a different URL.
 * @example
 * PSPDFKit.loadTextComparison({ serverUrl: 'https://public-server.pspdfkit.com/' })
 * @instance
 * @public
 * @member {?string} serverUrl
 * @memberof PSPDFKit.TextComparisonConfiguration
 * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This property allows you to set an initial list of main toolbar items for the Text Comparison UI.
 * This can be used to customize the main toolbar before the application mounts.
 *
 * When omitted, it will default to {@link PSPDFKit.defaultTextComparisonToolbarItems}.
 * @example
 * const toolbarItems = PSPDFKit.defaultTextComparisonToolbarItems;
 * toolbarItems.reverse();
 * PSPDFKit.loadTextComparison({ toolbarItems, ... });
 * @public
 * @instance
 * @member {?Array.<PSPDFKit.TextComparisonToolbarItem>} toolbarItems
 * @memberof PSPDFKit.TextComparisonConfiguration
 * @default Default {@link PSPDFKit.defaultTextComparisonToolbarItems}
 */
/**
 * *optional*
 *
 * This property allows you to set an initial list of inner toolbar items for instanceA (left) and instanceB (right) for the Text Comparison UI.
 * This can be used to customize the inner toolbar before the application mounts.
 *
 * When omitted, it will default to {@link PSPDFKit.defaultTextComparisonInnerToolbarItems}.
 * @example
 * const innerToolbarItems = PSPDFKit.defaultTextComparisonInnerToolbarItems;
 * innerToolbarItems.reverse();
 * PSPDFKit.loadTextComparison({ innerToolbarItems: toolbarItems, ... });
 * @public
 * @instance
 * @member {?Array.<PSPDFKit.TextComparisonInnerToolbarItem>} innerToolbarItems
 * @memberof PSPDFKit.TextComparisonConfiguration
 * @default Default {@link PSPDFKit.defaultTextComparisonInnerToolbarItems}
 */
/**
 * *optional*
 *
 * This will load your custom CSS as a `<link rel="stylesheet">` inside the Text Comparison UI. This
 * is necessary to isolate styling of the primary toolbar, comparison sidebar from the outside application and avoid external
 * stylesheets overwriting important viewer attributes.
 *
 * An array is allowed to load multiple stylesheets. The order in the array will also be the
 * order in which the stylesheets get loaded.
 *
 * The array will be copied by us on start up time, which means that you can not mutate it
 * after the viewer has started.
 *
 * More information on how to style PSPDFKit for Web can be found in our guides.
 * @example
 * PSPDFKit.loadTextComparison({
 *   styleSheets: [
 *     'https://example.com/my-stylesheet.css',
 *     'https://example.com/other-stylesheet.css'
 *   ]
 * })
 * @public
 * @instance
 * @member {?Array.<string>} styleSheets
 * @memberof PSPDFKit.TextComparisonConfiguration
 * @default []
 */
/**
 * *optional*
 *
 * This property allows you to set theme to use for the UI. See {@link PSPDFKit.Theme}
 *
 * Note: Themes are not supported in IE and setting this option won't have any effect: IE users
 * will get the default light theme. You can customize the appearance of the UI using our public
 * CSS classes. Please refer to
 * {@link https://pspdfkit.com/guides/web/current/customizing-the-interface/css-customization/|this guide article}
 * for information on how to customize the appearance.
 * @example
 * PSPDFKit.loadTextComparison({ theme: PSPDFKit.Theme.DARK })
 * @public
 * @instance
 * @member {?PSPDFKit.Theme} theme
 * @default PSPDFKit.Theme.DARK
 * @memberof PSPDFKit.TextComparisonConfiguration
 */
/**
 * The initial `locale` (language) for the application.
 * All the available locales are defined in {@link PSPDFKit.I18n.locales}.
 * When a locale is not provided Text Comparison UI for Web tries to autodetect the locale using `window.navigator.language`.
 * If the detected locale is not supported then the `en` locale is used instead.
 * @example
 * PSPDFKit.loadTextComparison({
 *   locale: 'de',
 *   // ...
 * });
 * @public
 * @instance
 * @member {?string} locale
 * @memberof PSPDFKit.TextComparisonConfiguration
 */
interface TextComparisonDiffColors {
    insertionColor?: Color;
    insertionBackgroundColor?: Color;
    deletionColor?: Color;
    deletionBackgroundColor?: Color;
    disabledColor?: Color;
    disabledBackgroundColor?: Color;
}
type TextComparisonSidebarConfiguration = {
    diffColors?: TextComparisonDiffColors;
    openByDefault?: boolean;
};
type SharedTextComparisonConfiguration = {
    container: string | HTMLElement;
    baseUrl?: string;
    baseCoreUrl?: string;
    serverUrl?: string;
    licenseKey?: string;
    toolbarItems?: Array<TextComparisonToolbarItem>;
    styleSheets?: Array<string>;
    theme?: ITheme;
    locale?: string;
    innerToolbarItems?: Array<TextComparisonInnerToolbarItem>;
    comparisonSidebarConfig?: TextComparisonSidebarConfiguration;
};
type StandaloneTextComparisonConfiguration = SharedTextComparisonConfiguration & {
    documentA: string | ArrayBuffer;
    documentB: string | ArrayBuffer;
    ai?: boolean;
};
type TextComparisonConfiguration = StandaloneTextComparisonConfiguration;

declare const textComparisonActionCreators: {
    setInstances: (payload: {
        instanceA: Instance;
        instanceB: Instance;
        aiComparisonData?: AIComparisonData | null;
    }) => {
        type: "SET_INSTANCES";
        payload: {
            instanceA: Instance;
            instanceB: Instance;
            aiComparisonData?: AIComparisonData | null | undefined;
        };
    };
    setToolbarItems: (payload: List<ToolbarItem>) => {
        type: "SET_TOOLBAR_ITEMS";
        payload: List<ToolbarItem$1>;
    };
    setInnerToolbarItems: (payload: List<TextComparisonInnerToolbarItem>) => {
        type: "SET_INNER_TOOLBAR_ITEMS";
        payload: List<TextComparisonInnerToolbarItem>;
    };
    setComparisonSidebarConfig: (payload: TextComparisonSidebarConfiguration) => {
        type: "SET_COMPARISON_SIDEBAR_CONFIG";
        payload: TextComparisonSidebarConfiguration;
    };
    setScrollLock: (payload: boolean) => {
        type: "SET_SCROLL_LOCK";
        payload: boolean;
    };
    setComparisonVisibility: (payload: boolean) => {
        type: "SET_COMPARISON_VISIBILITY";
        payload: boolean;
    };
    setTextComparisonChanges: (payload: List<TextComparisonChange>) => {
        type: "SET_TEXT_COMPARISON_CHANGES";
        payload: List<TextComparisonChange>;
    };
    setCurrentChangeIndex: (payload: number) => {
        type: "SET_CURRENT_CHANGE_INDEX";
        payload: number;
    };
    setAIComparisonData: (payload: AIComparisonData | null) => {
        type: "SET_AI_COMPARISON_DATA";
        payload: AIComparisonData | null;
    };
    updateAIComparisonPhase: (phase: AIComparisonPhase) => {
        type: "UPDATE_AI_COMPARISON_PHASE";
        payload: AIComparisonPhase;
    };
    setAIComparisonError: (error: AIComparisonError | null) => {
        type: "SET_AI_COMPARISON_ERROR";
        payload: AIComparisonError | null;
    };
    toggleSummaryPanel: (payload: boolean) => {
        type: "TOGGLE_SUMMARY_PANEL";
        payload: boolean;
    };
    setActiveFilters: (payload: Set<string>) => {
        type: "SET_ACTIVE_FILTERS";
        payload: Set<string>;
    };
    setFilteredChanges: (payload: AIADocumentChangeTaggingItem[] | null) => {
        type: "SET_FILTERED_CHANGES";
        payload: AIADocumentChangeTaggingItem[] | null;
    };
    setDisplayChanges: (payload: List<TextComparisonChange>) => {
        type: "SET_DISPLAY_CHANGES";
        payload: List<TextComparisonChange>;
    };
    setHasActiveFilters: (payload: boolean) => {
        type: "SET_HAS_ACTIVE_FILTERS";
        payload: boolean;
    };
};
type ActionCreators = typeof textComparisonActionCreators;
type TextComparisonAction = ReturnType<ActionCreators[keyof ActionCreators]>;

type EventListener = (...args: Array<any>) => any;
declare class EventEmitter {
    listeners: Record<string, EventListener[]>;
    events: Array<string>;
    constructor(events?: Array<string>);
    on(event: string, listener: EventListener): void;
    off(event: string, listener: EventListener): void;
    emit(event: string, ...args: Array<any>): void;
    supportsEvent(event: string): boolean;
    isListening(events: Array<keyof EventMap>): boolean;
}

interface TextComparisonState {
    instanceA: Instance | null;
    instanceB: Instance | null;
    textComparisonChanges: List<TextComparisonChange>;
    isScrollLockEnabled: boolean;
    isComparisonVisible: boolean;
    eventEmitter: EventEmitter;
    frameWindow: Window;
    instancesLoaded: boolean;
    currentChangeIndex: number;
    lastSelectedChangeIndex: number;
    ui: any;
    toolbarItems: List<TextComparisonToolbarItem>;
    innerToolbarItems: List<TextComparisonInnerToolbarItem>;
    comparisonSidebarConfig: TextComparisonSidebarConfiguration | null;
    mainShadowRoot: ShadowRoot | Document;
    container: HTMLElement;
    rootElement: HTMLElement;
    aiComparisonData?: AIComparisonData | null;
    isSummaryPanelOpen: boolean;
    activeFilters: Set<string>;
    filteredChanges: AIADocumentChangeTaggingItem[] | null;
    displayChanges: List<TextComparisonChange>;
    hasActiveFilters: boolean;
}

type Dispatch<A> = (value: A) => void;
interface MutableRefObject<T> {
    current: T;
}
declare const enum TextComparisonOperationTypes {
    inserted = "Inserted",
    deleted = "Deleted",
    replaced = "Replaced"
}
type TextComparisonSharedProps = {
    dispatch: Dispatch<TextComparisonAction>;
    stateRef: MutableRefObject<TextComparisonState>;
};
type TextComparisonSharedState = {
    dispatch: Dispatch<TextComparisonAction>;
    getTextComparisonState: () => TextComparisonState;
};
interface TextComparisonChange {
    insertionAnnotations: List<HighlightAnnotation>;
    deletionAnnotations: List<HighlightAnnotation>;
    pages: Set$1<number>;
    insertedText: string;
    deletedText: string;
    insertionCount: number;
    deletionCount: number;
    operationType: TextComparisonOperationTypes;
}

/**
 * Enhanced TextComparisonChange with AI-related properties
 * @public
 */
interface AIEnhancedTextComparisonChange extends TextComparisonChange {
    aiId?: string;
    categories?: string[];
    aiProcessed?: boolean;
}
/**
 * Payload for sending changes to AI services
 * @public
 */
interface AIADocumentChangePayload {
    id: string;
    type: string;
    text: string;
    contextBefore: string;
    contextAfter: string;
    page: number;
}
/**
 * Response item from AI services
 * @public
 */
interface AIADocumentChangeResponseItem {
    id: string;
    type: string;
    text: string;
    page: number;
    contextBefore?: string;
    contextAfter?: string;
}
/**
 * Response item with tags from tagging service
 * @public
 */
interface AIADocumentChangeTaggingItem extends AIADocumentChangeResponseItem {
    tag: string[];
}
/**
 * Response from analysis service
 * @public
 */
interface AIADocumentChangesAnalysisResponse {
    summary: string;
    categories: string[];
    changes: DocumentComparisonResult;
}
/**
 * Response from tagging service
 * @public
 */
interface AIADocumentChangesTaggingResponse {
    references: AIADocumentChangeTaggingItem[];
}
/**
 * Type alias for AI document comparison result
 * @public
 */
type AIDocumentComparisonResult = AIADocumentChangesAnalysisResponse | AIADocumentChangesTaggingResponse;
declare enum AIComparisonPhase {
    IDLE = "IDLE",
    LOADING = "LOADING",
    ANALYZING = "ANALYZING",
    TAGGING = "TAGGING",
    COMPLETED = "COMPLETED",
    ERROR = "ERROR"
}
interface AIComparisonError {
    phase: 'ANALYSIS' | 'TAGGING';
    message: string;
    details?: unknown;
}
interface AIComparisonData {
    summary: string;
    categories: string[];
    changes: DocumentComparisonResult;
    phase: AIComparisonPhase;
    error: AIComparisonError | null;
    taggedChanges?: AIADocumentChangeTaggingItem[];
    transformedChanges?: AIADocumentChangePayload[];
    aiEnhancedChanges?: List<AIEnhancedTextComparisonChange>;
}

/**
 * Configuration for the AI Assistant.
 * @example
 * {
 *     sessionId: 'session-id',
 *     jwt: 'xxx.xxx.xxx'
 *     backendUrl: 'https://localhost:4000',
 * }
 * @public
 * @memberof PSPDFKit
 * @typedef {object} AIAssistantConfiguration
 * @property {string}  sessionId - The session to reopen, or an ID for the new session to create. This ID should be unique for each session and should use alphanumeric characters only.
 * @property {string}  jwt - The JWT token to authenticate the user.
 * @property {string}  backendUrl - The URL that hosts AI Assistant service. e.g. 'https://localhost:4000'.
 * @property {?string} userId - An optional user ID for the current user. This ID should be unique for each user and should use alphanumeric characters only.
 */
type AIAssistantConfiguration = {
    sessionId: string;
    jwt: string;
    backendUrl: string;
    userId?: string;
};

/**
 * @classdesc
 * ComparisonOperation is a class that provides methods to describe a comparison operation.
 * It encapsulates the type and optional settings for the comparison.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `scale.set("options", { numberOfContextWords: 4 })`
 * @example <caption>Create a new text comparison operation</caption>
 * const operation = new ComparisonOperation(PSPDFKit.ComparisonOperationType.TEXT, { numberOfContextWords: 2 });
 * @example <caption>Create a new AI comparison operation</caption>
 * const aiOperation = new ComparisonOperation(
 *   PSPDFKit.ComparisonOperationType.AI,
 *   { operationType: PSPDFKit.AIComparisonOperationType.ANALYZE, model: 'gpt4o' }
 * );
 * @public
 * @memberof PSPDFKit
 * @class ComparisonOperation
 * @summary The descriptor for a comparison operation.
 * @extends Immutable.Record
 * @default { type: PSPDFKit.ComparisonOperationType.TEXT, options: { numberOfContextWords: 0 } }
 */
interface IComparisonOperationOptions {
    [key: string]: any;
}
interface ITextComparisonOperationOptions extends IComparisonOperationOptions {
    numberOfContextWords?: number;
}
interface IAIComparisonOperationOptions extends IComparisonOperationOptions {
    operationType: IAIComparisonOperationType;
    categories?: string[];
}
interface IComparisonOperation {
    type: IComparisonOperationType;
    options?: IComparisonOperationOptions;
}
declare const ComparisonOperation_base: Record$1.Factory<IComparisonOperation>;
declare class ComparisonOperation extends ComparisonOperation_base {
    constructor(type: IComparisonOperationType, options?: ITextComparisonOperationOptions | IAIComparisonOperationOptions);
    isTextComparison(): boolean;
    isAIComparison(): boolean;
    getAIOperationType(): IAIComparisonOperationType | undefined;
}

/**
 * Describes types of AI operations for document comparison.
 * These operations can be used with ComparisonOperationType.AI.
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.AIComparisonOperationType} ANALYZE Analyze and summarize differences between documents.
 * @property {PSPDFKit.AIComparisonOperationType} TAG Tag changes with specified categories.
 */
declare const AIComparisonOperationType: {
    readonly ANALYZE: "analyze";
    readonly TAG: "tag";
};
type IAIComparisonOperationType = (typeof AIComparisonOperationType)[keyof typeof AIComparisonOperationType];

type ViewStateSetter = (currentState: ViewState) => ViewState;
type ToolbarItemsSetter = (currentState: ToolbarItem$1[]) => ToolbarItem$1[];
type StoredSignaturesSetter = (annotations: List<InkAnnotation | ImageAnnotation>) => List<InkAnnotation | ImageAnnotation>;
type SearchStateSetter = (currentState: SearchState) => SearchState;
type AnnotationPresetsSetter = (currentState: Record<string, AnnotationPreset$1>) => Record<string, AnnotationPreset$1>;
type StampAnnotationTemplatesSetter = (currentState: Array<StampAnnotation | ImageAnnotation>) => Array<StampAnnotation | ImageAnnotation>;
type SetDocumentEditorFooterFunction = (currentState: DocumentEditorFooterItem[]) => DocumentEditorFooterItem[];
type SetDocumentEditorToolbarFunction = (currentState: DocumentEditorToolbarItem[]) => DocumentEditorToolbarItem[];
/**
 * @classdesc
 * A mounted document instance.
 *
 * You can generate an instance by using {@link PSPDFKit.load}.
 * @noconstructor
 * @public
 * @class Instance
 * @memberof PSPDFKit
 * @summary A mounted document instance.
 */
declare class Instance {
    totalPageCount: number;
    pageInfoForIndex: (pageIndex: number) => PageInfo | null | undefined;
    textLinesForPageIndex: (pageIndex: number) => Promise<List<TextLine>>;
    getMarkupAnnotationText: (annotation: TextMarkupAnnotationsUnion) => Promise<string>;
    getTextFromRects: (pageIndex: number, rects: List<Rect>) => Promise<string>;
    getDocumentPermissions: () => Promise<Record<IDocumentPermissions, boolean>>;
    currentZoomLevel: number;
    annotationCreatorName: string | null;
    maximumZoomLevel: number;
    minimumZoomLevel: number;
    zoomStep: number;
    disablePointSnapping: boolean;
    connectedClients: Map<string, InstantClient>;
    addEventListener: <K extends keyof EventMap>(action: K, listener: EventMap[K]) => void;
    removeEventListener: <K extends keyof EventMap>(action: K, listener: EventMap[K]) => void;
    jumpToRect: (pageIndex: number, rect: Rect) => void;
    jumpAndZoomToRect: (pageIndex: number, rect: Rect) => void;
    transformContentClientToPageSpace: <T extends Rect | Point>(rectOrPoint: T, pageIndex: number) => T;
    transformContentPageToClientSpace: <T extends Rect | Point>(rectOrPoint: T, pageIndex: number) => T;
    transformClientToPageSpace: <T extends Rect | Point>(rectOrPoint: T, pageIndex: number) => T;
    transformPageToClientSpace: <T extends Rect | Point>(rectOrPoint: T, pageIndex: number) => T;
    transformRawToPageSpace: (rawInset: InsetJSON | Inset, pageIndex: number) => Rect;
    transformPageToRawSpace: (rect: Rect, pageIndex: number) => Inset;
    exportOffice: (options: ExportOfficeFlags) => Promise<ArrayBuffer>;
    exportPDF: (flags?: ExportPDFFlags) => Promise<ArrayBuffer>;
    exportXFDF: (ignorePageRotation?: boolean) => Promise<string>;
    exportInstantJSON: (version?: number) => Promise<InstantJSON>;
    renderPageAsArrayBuffer: (options: {
        width: number;
    } | {
        height: number;
    }, pageIndex: number) => Promise<ArrayBuffer>;
    renderPageAsImageURL: (options: {
        width: number;
    } | {
        height: number;
    }, pageIndex: number) => Promise<string>;
    print: (printMode?: IPrintMode | {
        mode?: IPrintMode;
        excludeAnnotations?: boolean;
    }) => void;
    abortPrint: () => void;
    setCustomRenderers: (customRenderers: CustomRenderers) => void;
    setCustomUIConfiguration: (customUIConfigurationOrConfigurationSetter: CustomUI | ((customUI: CustomUI | null) => CustomUI)) => void;
    getDocumentOutline: () => Promise<List<OutlineElement>>;
    setDocumentOutline: (outline: List<OutlineElement>) => void;
    getPageGlyphs: (pageIndex: number) => Promise<List<Glyph>>;
    setAnnotationCreatorName: (annotationCreatorName?: string | null) => void;
    setOnWidgetAnnotationCreationStart: (callback: OnWidgetAnnotationCreationStartCallback) => void;
    setOnCommentCreationStart: (callback: OnCommentCreationStartCallback) => void;
    getLayers: () => Promise<OCGLayers>;
    getLayersVisibilityState: () => Promise<OCGLayersVisibilityState>;
    setLayersVisibilityState: (visibilityState: OCGLayersVisibilityState) => Promise<void>;
    contentWindow: Window;
    contentDocument: Document | ShadowRoot;
    readonly viewState: ViewState;
    setViewState: (stateOrFunction: ViewStateSetter | ViewState) => void;
    readonly toolbarItems: ToolbarItem$1[];
    setToolbarItems: (stateOrFunction: ToolbarItemsSetter | ToolbarItem$1[]) => void;
    setAnnotationToolbarItems: (annotationToolbarItemsCallback: AnnotationToolbarItemsCallback) => void;
    setInlineTextSelectionToolbarItems: (InlineTextSelectionToolbarItemsCallback: InlineTextSelectionToolbarItemsCallback) => void;
    annotationPresets: Record<AnnotationPresetID$1, AnnotationPreset$1>;
    setAnnotationPresets: (stateOrFunction: AnnotationPresetsSetter | Record<AnnotationPresetID$1, AnnotationPreset$1>) => void;
    setCurrentAnnotationPreset: (annotationPresetID?: string | null) => void;
    readonly currentAnnotationPreset: string | null | undefined;
    readonly stampAnnotationTemplates: Array<StampAnnotation | ImageAnnotation>;
    setStampAnnotationTemplates: (stateOrFunction: StampAnnotationTemplatesSetter | Array<StampAnnotation | ImageAnnotation>) => void;
    getAnnotations: (pageIndex: number) => Promise<List<AnnotationsUnion>>;
    createAttachment: (file: Blob) => Promise<string>;
    getAttachment: (attachmentId: string) => Promise<Blob>;
    calculateFittingTextAnnotationBoundingBox: (annotation: TextAnnotation) => TextAnnotation;
    setOnAnnotationResizeStart: (callback: AnnotationResizeStartCallback) => void;
    getOverlappingAnnotations: (annotationOrFormField: AnnotationsUnion | FormField) => Promise<List<AnnotationsUnion>>;
    getBookmarks: () => Promise<List<Bookmark>>;
    getFormFields: () => Promise<List<FormField>>;
    getFormFieldValues: () => Record<string, null | string | Array<string>>;
    setFormFieldValues: (formFieldValues: Record<string, null | string | Array<string>>) => void;
    getTextSelection: () => PublicTextSelection | null | undefined;
    getSelectedAnnotation: () => AnnotationsUnion | null | undefined;
    getSelectedAnnotations: () => List<AnnotationsUnion> | null | undefined;
    getAnnotationsGroups: () => Map<string, {
        groupKey: string;
        annotationsIds: Set$1<ID>;
    }> | null | undefined;
    setSelectedAnnotation: (annotationOrAnnotationId?: (AnnotationsUnion | ID) | null) => void;
    setSelectedAnnotations: (annotationsOrAnnotationsId?: List<AnnotationsUnion | ID> | null) => void;
    groupAnnotations: (annotationsOrAnnotationsId?: List<AnnotationsUnion | ID>) => void;
    deleteAnnotationsGroup: (annotationGroupId?: string) => void;
    setEditingAnnotation: (annotationOrAnnotationId?: (AnnotationsUnion | ID) | null, autoSelectText?: boolean | null) => void;
    setCustomOverlayItem: (item: CustomOverlayItem) => void;
    removeCustomOverlayItem: (id: CustomOverlayItemID) => void;
    readonly locale: string;
    setLocale: (arg0: string) => Promise<void>;
    getInkSignatures: () => Promise<List<InkAnnotation | ImageAnnotation>>;
    getStoredSignatures: () => Promise<List<InkAnnotation | ImageAnnotation>>;
    setInkSignatures: (stateOrFunction: StoredSignaturesSetter | List<InkAnnotation | ImageAnnotation>) => Promise<void>;
    setStoredSignatures: (stateOrFunction: StoredSignaturesSetter | List<InkAnnotation | ImageAnnotation>) => Promise<void>;
    search: (term: string, options?: {
        startPageIndex?: number;
        endPageIndex?: number;
        searchType?: ISearchType;
        searchInAnnotations?: boolean;
        caseSensitive?: boolean;
    }) => Promise<List<SearchResult>>;
    startUISearch: (term: string) => void;
    readonly searchState: SearchState;
    setSearchState: (stateOrFunction: SearchStateSetter | SearchState) => void;
    readonly editableAnnotationTypes: Array<Class<AnnotationsUnion>>;
    setEditableAnnotationTypes: (arg0: Array<Class<AnnotationsUnion>>) => void;
    setIsEditableAnnotation: (arg0: IsEditableAnnotationCallback) => void;
    setIsEditableComment: (arg0: IsEditableCommentCallback) => void;
    setGroup: (group: string) => void;
    resetGroup: () => void;
    setMentionableUsers: (users: MentionableUser[]) => void;
    setMaxMentionSuggestions: (maxSuggestions: number) => void;
    getComments: () => Promise<List<Comment>>;
    setDocumentEditorFooterItems: (stateOrFunction: DocumentEditorFooterItem[] | SetDocumentEditorFooterFunction) => void;
    setDocumentEditorToolbarItems: (stateOrFunction: DocumentEditorToolbarItem[] | SetDocumentEditorToolbarFunction) => void;
    getSignaturesInfo: () => Promise<SignaturesInfo>;
    signDocument: (arg0: SignatureCreationData | null, arg1?: TwoStepSignatureCallback | SigningServiceData) => Promise<void>;
    setSignaturesLTV: (certificates?: ArrayBuffer[] | string[]) => Promise<SignaturesInfo>;
    applyOperations: (operations: Array<DocumentOperation>) => Promise<void>;
    exportPDFWithOperations: (arg0: Array<DocumentOperation>) => Promise<ArrayBuffer>;
    applyRedactions: () => Promise<void>;
    save: () => Promise<void>;
    hasUnsavedChanges: () => boolean;
    ensureChangesSaved: (changes: Change | Array<Change>) => Promise<Array<Change>>;
    create: (changes: Change | Array<Change> | List<Change>) => Promise<Array<Change>>;
    update: (changes: Change | Array<Change> | List<Change>) => Promise<Array<Change>>;
    delete: (ids: InstantID | Change | Array<InstantID | Change> | List<InstantID | Change>) => Promise<Array<Change>>;
    toggleClipboardActions: (enable: boolean) => void;
    setMeasurementSnapping: (enable: boolean) => void;
    setMeasurementPrecision: (precision: IMeasurementPrecision) => void;
    setMeasurementScale: (scale: MeasurementScale) => void;
    setMeasurementValueConfiguration: (configurationCallback: MeasurementValueConfigurationCallback) => void;
    createRedactionsBySearch: (term: string | ISearchPattern, options?: {
        searchType?: ISearchType;
        searchInAnnotations?: boolean;
        caseSensitive?: boolean;
        annotationPreset?: RedactionAnnotationPreset;
    }) => Promise<List<string>>;
    history: {
        undo: () => Promise<boolean>;
        redo: () => Promise<boolean>;
        clear: () => void;
        enable: () => void;
        disable: () => void;
        canUndo: () => boolean;
        canRedo: () => boolean;
    };
    setDocumentComparisonMode: (documentComparisonConfiguration: DocumentComparisonConfiguration | null) => void;
    compareDocuments: (comparisonDocuments: ComparisonDocuments, operations: ComparisonOperation) => Promise<DocumentComparisonResult | AIDocumentComparisonResult>;
    getEmbeddedFiles: () => Promise<List<EmbeddedFile>>;
    beginContentEditingSession: () => Promise<Session>;
    getPageTabOrder: (pageIndex: number) => Promise<ID[]>;
    setPageTabOrder: (pageIndex: number, annotationIdsSortCallback: (tabOrderedAnnotations: AnnotationsUnion[]) => ID[]) => Promise<void>;
}

/**
 * Controls the sidebar placement.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.SidebarPlacement} START The sidebar is shown before the content in the reading direction. For any LTR languages this
 * will be the left side, for RTL languages this will be the right side.
 * @property {PSPDFKit.SidebarPlacement} END The sidebar is shown after the content in the reading direction. For any LTR languages this
 * will be the right side, for RTL languages this will be the left side.
 */
declare const SidebarPlacement: {
    readonly START: "START";
    readonly END: "END";
};
type ISidebarPlacement = (typeof SidebarPlacement)[keyof typeof SidebarPlacement];

/**
 * Controls when the digital signature validation UI should be shown.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.ShowSignatureValidationStatusMode} IF_SIGNED Show the digital signature validation UI if digital signatures
 * are found on the current document.
 * @property {PSPDFKit.ShowSignatureValidationStatusMode} HAS_WARNINGS Only show the digital signature validation UI if digital signatures
 * with problems or invalid ones are found, and also if the document has been modified since the moment it's been signed.
 * @property {PSPDFKit.ShowSignatureValidationStatusMode} HAS_ERRORS Only show the digital signature validation UI if invalid signatures are found.
 * @property {PSPDFKit.ShowSignatureValidationStatusMode} NEVER Never show the digital signature validation UI.
 */
declare const ShowSignatureValidationStatusMode: {
    readonly IF_SIGNED: "IF_SIGNED";
    readonly HAS_WARNINGS: "HAS_WARNINGS";
    readonly HAS_ERRORS: "HAS_ERRORS";
    readonly NEVER: "NEVER";
};
type IShowSignatureValidationStatusMode = (typeof ShowSignatureValidationStatusMode)[keyof typeof ShowSignatureValidationStatusMode];

/**
 * Controls the current interaction mode in the viewer.
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.InteractionMode} TEXT_HIGHLIGHTER When this mode is activated, the creation of new highlight annotations will
 * be enabled and the text will be highlighted as it's selected.
 * @property {PSPDFKit.InteractionMode} INK When this mode is activated, the creation of new ink annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it. If
 * properties (e.g. color) or the page index changes, a new annotation is created.
 * @property {PSPDFKit.InteractionMode} INK_SIGNATURE Deprecated: When this mode is activated, the creation of new ink signatures will be enabled. This
 * this shows a dialog where it is possible to select an existing ink signature or create a new one
 * and store it.
 *
 * This interaction mode is deprecated and it will act just like `SIGNATURE`.
 * @property {PSPDFKit.InteractionMode} SIGNATURE When this mode is activated, the creation of new signatures will be enabled. This
 * shows a dialog where it is possible to select an existing signature or create a new
 * one and potentially save it.
 * @property {PSPDFKit.InteractionMode} STAMP_PICKER When this mode is activated, the stamp annotation templates picker modal UI will
 * be shown. Once a template is selected, the new annotation is configured and created\
 * in the document.
 * @property {PSPDFKit.InteractionMode} STAMP_CUSTOM When this mode is activated, the custom stamp annotation template editor modal UI will
 * be shown. Once a the custom template is edited, the new custom stamp annotation
 * will be created in the document.
 * @property {PSPDFKit.InteractionMode} SHAPE_LINE When this mode is activated, the creation of new line annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {PSPDFKit.InteractionMode} SHAPE_RECTANGLE When this mode is activated, the creation of new rectangle annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {PSPDFKit.InteractionMode} SHAPE_ELLIPSE When this mode is activated, the creation of new ellipse annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it. If
 * properties (e.g. color) or the page index changes, a new annotation is created.
 * @property {PSPDFKit.InteractionMode} SHAPE_POLYGON When this mode is activated, the creation of new polygon annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it. If
 * properties (e.g. color) or the page index changes, a new annotation is created.
 * @property {PSPDFKit.InteractionMode} SHAPE_POLYLINE When this mode is activated, the creation of new polyline annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it. If
 * properties (e.g. color) or the page index changes, a new annotation is created.
 * @property {PSPDFKit.InteractionMode} INK_ERASER When this mode is activated, removing of current ink annotation points will be enabled. This
 * transforms the page to a canvas where the cursor can remove ink annotation points by hand,
 * as well as choose the cursor width.
 * @property {PSPDFKit.InteractionMode} NOTE When this mode is activated, the creation of new note annotations will be enabled. This
 * transforms the page to a clickable area where the annotation will be created at the position
 * of the click.
 * @property {PSPDFKit.InteractionMode} COMMENT_MARKER When this mode is activated, the creation of new comment marker annotations will be enabled. This
 * transforms the page to a clickable area where the annotation will be created at the position
 * of the click.
 * @property {PSPDFKit.InteractionMode} TEXT When this mode is activated, the creation of new text annotations will be enabled. This
 * transforms the page to a clickable area where the annotation will be created at the position
 * of the click.
 * @property {PSPDFKit.InteractionMode} CALLOUT When this mode is activated, the creation of new callout annotations will be enabled. This
 * transforms the page to a clickable area where the annotation will be created at the position
 * of the click.
 * @property {PSPDFKit.InteractionMode} PAN This enables the pan tool to allow the user to navigate on a desktop browser using mouse
 * dragging. This will disable text selection.
 *
 * On a touch device, this will have no effect since panning is already the default technique for
 * scrolling on websites.
 * @property {PSPDFKit.InteractionMode} SEARCH Enables the search mode and focuses the search input field.
 * @property {PSPDFKit.InteractionMode} DOCUMENT_EDITOR This shows the document editor modal.
 * @property {PSPDFKit.InteractionMode} MARQUEE_ZOOM  This enables the Marquee Zoom tool. When enabled, you can draw a rectangle
 * on the screen which is zoomed into and scrolled to, once the pointer is
 * released.
 * @property {PSPDFKit.InteractionMode} REDACT_TEXT_HIGHLIGHTER When this mode is activated, the creation of new redaction annotations will
 * be enabled by highlighting regions of text and the text will be marked for
 * redaction as it's selected.
 * @property {PSPDFKit.InteractionMode} REDACT_SHAPE_RECTANGLE When this mode is activated, the creation of new redaction annotations will be enabled by
 * drawing rectangles on the pages. This transforms the page to a drawable canvas and annotations
 * are created while drawing on it.
 * @property {PSPDFKit.InteractionMode} DOCUMENT_CROP When this mode is activated, the creation of cropping area selection is enabled.
 * @property {PSPDFKit.InteractionMode} BUTTON_WIDGET When this mode is activated, the creation of button widget annotations is enabled.
 * @property {PSPDFKit.InteractionMode} TEXT_WIDGET When this mode is activated, the creation of text widget annotations is enabled.
 * @property {PSPDFKit.InteractionMode} RADIO_BUTTON_WIDGET When this mode is activated, the creation of radio button widget annotations is enabled.
 * @property {PSPDFKit.InteractionMode} CHECKBOX_WIDGET When this mode is activated, the creation of checkbox widget annotations is enabled.
 * @property {PSPDFKit.InteractionMode} COMBO_BOX_WIDGET When this mode is activated, the creation of combo box widget annotations is enabled.
 * @property {PSPDFKit.InteractionMode} LIST_BOX_WIDGET When this mode is activated, the creation of list box widget annotations is enabled.
 * @property {PSPDFKit.InteractionMode} SIGNATURE_WIDGET When this mode is activated, the creation of signature widget annotations is enabled.
 * @property {PSPDFKit.InteractionMode} DATE_WIDGET When this mode is activated, the creation of date widget annotations is enabled.
 * @property {PSPDFKit.InteractionMode} FORM_CREATOR When this mode is activated, you will be able to edit and create widget annotations.
 * @property {PSPDFKit.InteractionMode} LINK When this mode is activated, you will be able to create link annotations.
 * @property {PSPDFKit.InteractionMode} DISTANCE When this mode is activated, you will be able to create distance annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {PSPDFKit.InteractionMode} PERIMETER When this mode is activated, you will be able to create perimeter annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {PSPDFKit.InteractionMode} RECTANGLE_AREA When this mode is activated, you will be able to create Rectangle Area annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {PSPDFKit.InteractionMode} ELLIPSE_AREA When this mode is activated, you will be able to create Ellipse Area annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {PSPDFKit.InteractionMode} POLYGON_AREA When this mode is activated, you will be able to create Polygon Area annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {PSPDFKit.InteractionMode} CONTENT_EDITOR Available only in Standalone mode with the content editor license: when this mode is activated, you will be able to edit the page contents.
 * @property {PSPDFKit.InteractionMode} MULTI_ANNOTATIONS_SELECTION When this mode is activated, multiple annotations can be selected with the UI.
 * @property {PSPDFKit.InteractionMode} MEASUREMENT Available only with the measurement license: when this mode is activated, the measurement annotations mode will be activated.
 * @property {PSPDFKit.InteractionMode} MEASUREMENT_SETTINGS Available only with the measurement license: when this mode is activated, the measurement settings mode will be activated.
 */
declare const InteractionMode: {
    readonly TEXT_HIGHLIGHTER: "TEXT_HIGHLIGHTER";
    readonly INK: "INK";
    readonly INK_SIGNATURE: "INK_SIGNATURE";
    readonly SIGNATURE: "SIGNATURE";
    readonly STAMP_PICKER: "STAMP_PICKER";
    readonly STAMP_CUSTOM: "STAMP_CUSTOM";
    readonly SHAPE_LINE: "SHAPE_LINE";
    readonly SHAPE_RECTANGLE: "SHAPE_RECTANGLE";
    readonly SHAPE_ELLIPSE: "SHAPE_ELLIPSE";
    readonly SHAPE_POLYGON: "SHAPE_POLYGON";
    readonly SHAPE_POLYLINE: "SHAPE_POLYLINE";
    readonly INK_ERASER: "INK_ERASER";
    readonly NOTE: "NOTE";
    readonly COMMENT_MARKER: "COMMENT_MARKER";
    readonly TEXT: "TEXT";
    readonly CALLOUT: "CALLOUT";
    readonly PAN: "PAN";
    readonly SEARCH: "SEARCH";
    readonly DOCUMENT_EDITOR: "DOCUMENT_EDITOR";
    readonly MARQUEE_ZOOM: "MARQUEE_ZOOM";
    readonly REDACT_TEXT_HIGHLIGHTER: "REDACT_TEXT_HIGHLIGHTER";
    readonly REDACT_SHAPE_RECTANGLE: "REDACT_SHAPE_RECTANGLE";
    readonly DOCUMENT_CROP: "DOCUMENT_CROP";
    readonly BUTTON_WIDGET: "BUTTON_WIDGET";
    readonly TEXT_WIDGET: "TEXT_WIDGET";
    readonly RADIO_BUTTON_WIDGET: "RADIO_BUTTON_WIDGET";
    readonly CHECKBOX_WIDGET: "CHECKBOX_WIDGET";
    readonly COMBO_BOX_WIDGET: "COMBO_BOX_WIDGET";
    readonly LIST_BOX_WIDGET: "LIST_BOX_WIDGET";
    readonly SIGNATURE_WIDGET: "SIGNATURE_WIDGET";
    readonly DATE_WIDGET: "DATE_WIDGET";
    readonly FORM_CREATOR: "FORM_CREATOR";
    readonly LINK: "LINK";
    readonly DISTANCE: "DISTANCE";
    readonly PERIMETER: "PERIMETER";
    readonly RECTANGLE_AREA: "RECTANGLE_AREA";
    readonly ELLIPSE_AREA: "ELLIPSE_AREA";
    readonly POLYGON_AREA: "POLYGON_AREA";
    readonly CONTENT_EDITOR: "CONTENT_EDITOR";
    readonly MULTI_ANNOTATIONS_SELECTION: "MULTI_ANNOTATIONS_SELECTION";
    readonly MEASUREMENT: "MEASUREMENT";
    readonly MEASUREMENT_SETTINGS: "MEASUREMENT_SETTINGS";
    readonly ATTACHMENT_PREVIEW: "ATTACHMENT_PREVIEW";
};
type IInteractionMode = (typeof InteractionMode)[keyof typeof InteractionMode];

/**
 * Specifies the alignment of an UI element relative to its parent container.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.Alignment} START
 * @property {PSPDFKit.Alignment} END
 */
declare const Alignment: {
    readonly START: "START";
    readonly END: "END";
};
type IAlignment = (typeof Alignment)[keyof typeof Alignment];

/**
 * The annotations sidebar options allows to specify options available for the annotations sidebar.
 * Currently, you can define a `includeContent` array in which you
 * can provide a list of annotation classes to be accepted as part of
 * the annotations sidebar, or also whether to include {@link PSPDFKit.Comment}
 * instances or not. By default, the value of `includeContent` is {@link PSPDFKit.defaultAnnotationsSidebarContent}.
 *
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationsSidebarOptions
 * @property {Array<PSPDFKit.AnnotationsUnionClass | Class<PSPDFKit.Comment>>} includeContent - Array of annotation classes to be accepted as part of the annotations sidebar
 * @summary Options available to the annotations sidebar
 * @example <caption>Customizing the annotations sidebar to include only {@link PSPDFKit.ImageAnnotation} instances</caption>
 * PSPDFKit.load({
 *   initialViewState: new PSPDFKit.ViewState({
 *     sidebarOptions: {
 *       [PSPDFKit.SidebarMode.ANNOTATIONS]: {
 *         includeContent: [PSPDFKit.Annotations.ImageAnnotation]
 *       }
 *     }
 *   })
 * });
 * @default PSPDFKit.defaultAnnotationsSidebarContent
 * @seealso PSPDFKit.ViewState#sidebarOptions
 */
/**
 * The layers sidebar options allow to specify options available for the Layers sidebar.
 *
 * Here you can define Currently, you can define a `lockedLayers` array in which you
 * can provide an array of `id`s for the layers for which visibility should not be modifieable
 * using the sidebar.
 *
 * @public
 * @memberof PSPDFKit
 * @interface LayersSidebarOptions
 * @property {Array<number>} lockedLayers - Array of ocg.ocgId present in the document
 * @property {PSPDFKit.Alignment} iconsAlignment - Alignment relative to the parent container
 * @summary Keyed list of options that apply to the layers sidebar.
 * @example <caption>Customizing the layers sidebar to align icons to the right</caption>
 * PSPDFKit.load({
 *   initialViewState: new PSPDFKit.ViewState({
 *     sidebarOptions: {
 *       [PSPDFKit.SidebarMode.LAYERS]: {
 *         LockedLayers: [],
 *         iconsAlignment: PSPDFKit.Alignment.START
 *       }
 *     }
 *   })
 * });
 * @seealso PSPDFKit.ViewState#sidebarOptions
 */
/**
 * The attachments sidebar options allow to specify options available for the Attachments sidebar.
 * @public
 * @memberof PSPDFKit
 * @interface AttachmentsSidebarOptions
 * @property {boolean} disablePreview - If true, the preview of the attachment will be disabled and attachments can only be downloaded.
 * @summary Keyed list of options that apply to the attachments sidebar.
 * @example <caption>Disabling preview of attachments.</caption>
 * PSPDFKit.load({
 *   initialViewState: new PSPDFKit.ViewState({
 *     sidebarOptions: {
 *       [PSPDFKit.SidebarMode.ATTACHMENTS]: {
 *         disablePreview: true
 *       }
 *     }
 *   })
 * });
 * @seealso PSPDFKit.ViewState#sidebarOptions
 */
type SidebarOptions<T> = T extends AnnotationsSidebarOptions ? {
    [SidebarMode.ANNOTATIONS]: AnnotationsSidebarOptions;
} : T extends LayersSidebarOptions ? {
    [SidebarMode.LAYERS]: LayersSidebarOptions;
} : T extends AttachmentsSidebarOptions ? {
    [SidebarMode.ATTACHMENTS]: AttachmentsSidebarOptions;
} : never;
type AnnotationsSidebarOptions = {
    includeContent: Array<AnnotationsUnionClass | Class<Comment>>;
};
type AttachmentsSidebarOptions = {
    disablePreview: boolean;
};
type LayersSidebarOptions = {
    lockedLayers: number[];
    iconsAlignment: IAlignment;
};

type Rotation = 0 | 90 | 180 | 270;
interface IViewState {
    allowPrinting: boolean;
    allowExport: boolean;
    currentPageIndex: number;
    instance: Instance | null;
    interactionMode: IInteractionMode | null;
    keepFirstSpreadAsSinglePage: boolean;
    layoutMode: ILayoutMode;
    pageSpacing: number;
    pagesRotation: Rotation;
    readOnly: boolean;
    scrollMode: IScrollMode;
    showAnnotations: boolean;
    showComments: boolean;
    showAnnotationNotes: boolean;
    showToolbar: boolean;
    enableAnnotationToolbar: boolean;
    sidebarMode: ISidebarMode | null | undefined;
    sidebarOptions: SidebarOptions<AnnotationsSidebarOptions> | SidebarOptions<LayersSidebarOptions> | SidebarOptions<AttachmentsSidebarOptions> | IObject;
    sidebarPlacement: ISidebarPlacement;
    spreadSpacing: number;
    viewportPadding: ViewportPadding;
    zoom: ZoomConfiguration | IZoomMode | number;
    zoomStep: number;
    formDesignMode: boolean;
    showSignatureValidationStatus: IShowSignatureValidationStatusMode;
    previewRedactionMode: boolean;
    canScrollWhileDrawing: boolean;
    keepSelectedTool: boolean;
    resolvedLayoutMode: ILayoutMode;
    sidebarWidth: number;
    disablePointSnapping: boolean;
    forceRenderWidgetsInAnnotationsOrder: boolean;
    prerenderedPageSpreads: number | null;
    showAIAssistant: boolean;
}
declare const ViewState_base: Record$1.Factory<IViewState>;
/**
 * The `ViewState` holds information about the current UI representation of a specific document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `viewState.set("showToolbar", false)`.
 *
 * An initial `ViewState` can be set in {@link PSPDFKit.Configuration}.
 *
 * Because the `ViewState` is an immutable data type, you must use {@link PSPDFKit.Instance#setViewState}
 * on the {@link PSPDFKit.Instance} to update it.
 *
 * To be notified when PSPDFKit updates the `ViewState`, you can use the dedicated
 * {@link PSPDFKit.Instance~ViewStateChangeEvent}.
 *
 * The following examples show you how to update the `ViewState` and how to get notified about
 * `ViewState` changes:
 * @example <caption>Adding a listener for the {@link PSPDFKit.Instance~ViewStateChangeEvent| view state changed event}</caption>
 * instance.addEventListener("viewState.change", (viewState) => {
 *   console.log(viewState.toJS());
 * });
 * @example <caption>Update values for the immutable state object using {@link PSPDFKit.Instance#setViewState}</caption>
 *
 * const state = instance.viewState;
 * const newState = state.set("currentPageIndex", 2);
 * instance.setViewState(newState);
 * @public
 * @class ViewState
 * @memberof PSPDFKit
 * @extends Immutable.Record
 * @summary The current UI state of a document instance.
 * @seealso PSPDFKit.Configuration#initialViewState
 * @seealso PSPDFKit.Instance#setViewState
 * @seealso PSPDFKit.Instance~ViewStateChangeEvent
 * @seealso PSPDFKit.Instance~ViewStateCurrentPageIndexChangeEvent
 * @seealso PSPDFKit.Instance~ViewStateZoomChangeEvent
 */
declare class ViewState extends ViewState_base {
    zoomIn(): ViewState;
    zoomOut(): ViewState;
    rotateLeft(): ViewState;
    rotateRight(): ViewState;
    goToNextPage(): ViewState;
    goToPreviousPage(): ViewState;
}

/**
 * This object determines the operation to be performed on the document.
 *
 * Available operations:
 *
 * - `{ type: "addPage", afterPageIndex: number, ...AddPageConfiguration }`
 *
 * Adds a blank page after the specified page index using the provided configuration.
 *
 * ```js
 * type AddPageConfiguration = {
 *   backgroundColor: PSPDFKit.Color,
 *   pageWidth: number,
 *   pageHeight: number,
 *   rotateBy: 0 | 90 | 180 | 270,
 *   insets?: PSPDFKit.Geometry.Inset
 * }
 * ```
 *
 * - `{ type: "addPage", beforePageIndex: number, ...AddPageConfiguration }`
 *
 * Adds a blank page before the specified page index using the provided configuration.
 *
 * - `{ type: "keepPages", pageIndexes: Array<number> }`
 *
 * Removes all pages from the document except for the pages specified in the
 * `pageIndexes` array.
 *
 * - `{ type: "duplicatePages", pageIndexes: Array<number> }`
 *
 * Duplicates the pages specified in the `pageIndexes` array. Each new page will
 * be inserted after the original page.
 *
 * - `{ type: "movePages", pageIndexes: Array<number>, afterPageIndex: number }`
 *
 * Moves the pages specified in the `pageIndexes` array after the page specified.
 *
 * - `{ type: "movePages", pageIndexes: Array<number>, beforePageIndex: number }`
 *
 * Moves the pages specified in the `pageIndexes` array before the page specified.
 *
 * - `{ type: "rotatePages", pageIndexes: Array<number>, rotateBy: 0 | 90 | 180 | 270 }`
 *
 * Rotates the the pages specified in the `pageIndexes` array by the amount of degrees set
 * in `rotateBy`.
 *
 * - `{ type: "removePages", pageIndexes: Array<number> }`
 *
 * Removes the pages specified in the `pageIndexes` array.
 *
 * - `{ type: "importDocument", afterPageIndex: number, treatImportedDocumentAsOnePage: boolean, document: Blob | File }`
 *
 * Imports the provided document after the specified page index. `treatImportedDocumentAsOnePage`
 * determines whether it will be treated as a single page for other document operations
 * (e.g. a rotation) provided during the same call. After these operations
 * are applied, the imported pages will behave like regular pages in the document.
 *
 * Flattening and importing a document where `treatImportedDocumentAsOnePage` in the same operations
 * batch is not supported and will raise an error.
 *
 * Importing the same document more than once in the same operations block is not allowed with the UI
 * in order to prevent possible user mistakes, but can be done programmatically.
 *
 * - `{ type: "importDocument", beforePageIndex: number, treatImportedDocumentAsOnePage: boolean, document: Blob | File }`
 *
 * Imports the provided document before the specified page index.
 *
 * - `{ type: "importDocument", beforePageIndex: number, importedPageIndexes?: ImportPageIndex, treatImportedDocumentAsOnePage: boolean, document: Blob | File }`
 *
 * ```js
 * type Range = [min, max]; // 'min' and 'max' are inclusive.
 * type ImportPageIndex = Array<number | Range>;
 * ```
 *
 * Imports the specified page indexes from the provided document before the specified page index.
 *
 * - `{ type: "applyInstantJson", instantJson: Object }`
 *
 * Applies the given Instant JSON object specified in the `instantJson` property.
 * To learn about Instant JSON please refer to
 * {@link https://www.nutrient.io/guides/web/importing-exporting/instant-json/|this guide article}.
 *
 * - `{ type: "applyXfdf", xfdf: string, ignorePageRotation?: boolean }`
 *
 * Applies the given XFDF string specified in the `xfdf` property.
 * To learn about XFDF please refer to
 * {@link https://pspdfkit.com/guides/web/current/importing-exporting/xfdf-support/|this guide article}.
 *
 * - `{ type: "flattenAnnotations", pageIndexes?: Array<number>, annotationIds?: Array<string>, noteAnnotationOpacity?: number, noteAnnotationBackgroundColor?: PSPDFKit.Color }`
 *
 * Flattens the annotations of the specified pages, or of all pages if none is specified.
 *
 * Flattening and importing a document where `treatImportedDocumentAsOnePage` in the same operations
 * batch is not supported and will raise an error.
 *
 * - `{ type: "setPageLabel", pageIndexes?: Array<number>, pageLabel?: string }`
 *
 * Sets the page label of a given page index.
 *
 * - `{ type: "performOcr", pageIndexes?: Array<number> | "all", language: string }`
 *
 * ***Server only***
 *
 * If the OCR component is present in the license, performs OCR on the pages given with the language requested. See {@link https://pspdfkit.com/guides/server/current/ocr/language-support/} for supported languages.
 *
 * Server only.
 *
 * ```js
 * instance.applyOperations([{
 *   type: "performOcr",
 *   pageIndexes: "all",
 *   language: "en"
 * }]);
 * ```
 *
 * - `{ type: "applyRedactions" }`
 *
 * If the Redaction component is present in the license, applies any redaction annotations, redacting the page content and removing the annotations.
 *
 * This operation doesn't have any option and it doesn't matter when it is executed - the redactions will always be applied when exporting the document at the end.
 *
 * - `{ type: "updateMetadata", metadata: { title?: string, author?: string } }`
 *
 * Updates metadata on the destination document.
 *
 * Standalone only.
 *
 * - `{ type: "cropPages", pageIndexes?: Array<number>, cropBox: Rect }`
 *
 * Crops the pages of PDF document. If the `pageIndexes` property is undefined,
 * the cropping operation is applied to all pages.
 *
 * ```js
 * instance.applyOperations([{
 *   type: "cropPages",
 *   pageIndexes: [1, 2],
 *   cropBox: new PSPDFKit.Geometry.Rect({
 *     top: 100,
 *     left: 100,
 *     width: 100,
 *     height: 100
 *   })
 * }]);
 * ```
 *
 * * - `{ type: "addPageMargins", pageIndexes?: Array<number>, margins: Inset }`
 *
 * *** Standalone only ***
 *
 * Adds margins to the pages of the document. If the `pageIndexes` property is undefined,
 * the new margins are applied to all pages. Negative numbers will shrink the page.
 *
 * Content and annotations will be repositioned back to the original location on the page,
 * and other boxes (crop, bleed, trim, art) will be adjusted to encompass the same area.
 *
 * ```js
 * instance.applyOperations([{
 *   type: "addPageMargins",
 *   pageIndexes: [1, 2],
 *   margins: new PSPDFKit.Geometry.Inset({
 *     top: 100,
 *     left: 100,
 *     right: 100,
 *     bottom: 100
 *   })
 * }]);
 * ````
 *
 * Standalone only.
 * @public
 * @memberof PSPDFKit
 * @interface DocumentOperation
 * @summary Operation to be performed on the document.
 * @seealso PSPDFKit.Instance#applyOperations PSPDFKit.Configuration#instantJSON
 * @seealso PSPDFKit.Configuration#XFDF
 * @example
 * // Rotate page 0 90 degrees clockwise
 * instance.applyOperations({
 *   type: "rotatePages",
 *   pageIndexes: [0],
 *   rotateBy: 90
 * });
 */
type AddPageConfiguration = {
    backgroundColor: Color;
    pageWidth: number;
    pageHeight: number;
    rotateBy: Rotation;
    insets?: Rect;
};
type OperationAttachment = string | File | Blob;
type min = number;
type max = number;
type Range = [min, max];
type ImportPageIndex = Array<number | Range>;
type DocumentMetadata = {
    title?: string;
    author?: string;
};
type NonSerializableDocumentOperationsCommon = {
    type: 'removePages';
    pageIndexes: Array<number>;
} | {
    type: 'duplicatePages';
    pageIndexes: Array<number>;
} | {
    type: 'movePages';
    pageIndexes: Array<number>;
    afterPageIndex: number;
} | {
    type: 'movePages';
    pageIndexes: Array<number>;
    beforePageIndex: number;
} | {
    type: 'rotatePages';
    pageIndexes: Array<number>;
    rotateBy: Rotation;
} | {
    type: 'keepPages';
    pageIndexes: Array<number>;
} | {
    type: 'importDocument';
    afterPageIndex: number;
    treatImportedDocumentAsOnePage?: boolean;
    document: OperationAttachment;
    importedPageIndexes?: ImportPageIndex;
} | {
    type: 'importDocument';
    beforePageIndex: number;
    treatImportedDocumentAsOnePage?: boolean;
    document: OperationAttachment;
    importedPageIndexes?: ImportPageIndex;
} | {
    type: 'setPageLabel';
    pageIndexes?: Array<number>;
    pageLabel?: string;
} | {
    type: 'performOcr';
    pageIndexes?: Array<number> | 'all';
    language: string;
} | {
    type: 'applyRedactions';
} | {
    type: 'updateMetadata';
    metadata: DocumentMetadata;
};
type NonSerializableDocumentOperations = {
    type: 'applyInstantJson';
    instantJson: Record<string, any>;
    dataFilePath?: OperationAttachment;
} | {
    type: 'applyXfdf';
    xfdf: string;
    ignorePageRotation?: boolean;
    dataFilePath?: OperationAttachment;
} | {
    type: 'flattenAnnotations';
    pageIndexes?: Array<number>;
    annotationIds?: string[];
    noteAnnotationBackgroundColor?: Color;
    noteAnnotationOpacity?: number;
};
type DocumentOperation = (AddPageConfiguration & {
    type: 'addPage';
    afterPageIndex: number;
}) | (AddPageConfiguration & {
    type: 'addPage';
    beforePageIndex: number;
}) | {
    type: 'cropPages';
    pageIndexes?: Array<number>;
    cropBox: Rect;
} | {
    type: 'addPageMargins';
    pageIndexes?: Array<number>;
    margins: Inset;
} | NonSerializableDocumentOperationsCommon | NonSerializableDocumentOperations;

/**
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.ProductId} SharePoint Enables using the SDK in a SharePoint environment. When used, the document should be loaded from a SharePoint site.
 * @property {PSPDFKit.ProductId} Salesforce Enables using the SDK in a Salesforce environment. When used, the SDK should be loaded from a Salesforce site.
 */
declare const ProductId: {
    SharePoint: string;
    Salesforce: string;
    Maui_Android: string;
    Maui_iOS: string;
    Maui_MacCatalyst: string;
    Maui_Windows: string;
    FlutterForWeb: string;
    Electron: string;
};
type IProductId = (typeof ProductId)[keyof typeof ProductId];

type ActionFlags = 'includeExclude' | 'includeNoValueFields' | 'exportFormat' | 'getMethod' | 'submitCoordinated' | 'xfdf' | 'includeAppendSaves' | 'includeAnnotations' | 'submitPDF' | 'canonicalFormat' | 'excludeNonUserAnnotations' | 'excludeFKey' | 'embedForm';
type ActionJSON = {
    type: 'uri';
    uri: string;
    subactions?: Array<ActionJSON>;
} | {
    type: 'goTo';
    pageIndex: number;
    subactions?: Array<ActionJSON>;
} | {
    type: 'goToEmbedded';
    newWindow: boolean;
    relativePath: string;
    targetType: 'parent' | 'child';
    subactions?: Array<ActionJSON>;
} | {
    type: 'goToRemote';
    relativePath: string;
    namedDestination: string;
    subactions?: Array<ActionJSON>;
} | {
    type: 'hide';
    hide: boolean;
    annotationReferences: Array<AnnotationReference>;
    subactions?: Array<ActionJSON>;
} | {
    type: 'resetForm';
    fields: Array<AnnotationReference> | null;
    flags: string | null;
    subactions?: Array<ActionJSON>;
} | {
    type: 'submitForm';
    uri: string;
    fields: Array<string> | null;
    flags: Array<ActionFlags> | null;
    subactions?: Array<ActionJSON>;
} | {
    type: 'launch';
    filePath: string;
    subactions?: Array<ActionJSON>;
} | {
    type: 'named';
    action: string;
    subactions?: Array<ActionJSON>;
} | {
    type: 'javaScript';
    script: string;
    subactions?: Array<ActionJSON>;
};
type BookmarkJSON = {
    v: 1;
    type: 'pspdfkit/bookmark';
    id: string;
    name: string | null;
    sortKey: number | null;
    action: ActionJSON;
    pdfBookmarkId: string | null;
};
type RawPdfBoxes = {
    bleedBox: null | IRectJSON;
    cropBox: null | IRectJSON;
    mediaBox: null | IRectJSON;
    trimBox: null | IRectJSON;
};
type Hints = {
    glyphs: Array<number | string>;
};

type IRectJSON = [left: number, top: number, width: number, height: number];

type BaseAnnotationJSON = {
    v: number;
    type?: 'pspdfkit/ink' | 'pspdfkit/shape/line' | 'pspdfkit/shape/rectangle' | 'pspdfkit/shape/ellipse' | 'pspdfkit/shape/polygon' | 'pspdfkit/shape/polyline' | 'pspdfkit/link' | 'pspdfkit/markup/highlight' | 'pspdfkit/markup/squiggly' | 'pspdfkit/markup/strikeout' | 'pspdfkit/markup/underline' | 'pspdfkit/markup/redaction' | 'pspdfkit/stamp' | 'pspdfkit/text' | 'pspdfkit/note' | 'pspdfkit/image' | 'pspdfkit/media' | 'pspdfkit/widget' | 'pspdfkit/comment-marker' | 'pspdfkit/unknown';
    name?: string | null;
    id: string;
    subject?: string | null;
    pdfObjectId?: number | null;
    pageIndex: number;
    bbox: IRectJSON;
    opacity?: number;
    flags?: ('noPrint' | 'noZoom' | 'noRotate' | 'noView' | 'hidden' | 'locked' | 'lockedContents' | 'readOnly')[] | null;
    action?: ActionJSON | null;
    note?: string | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    creatorName?: string | null;
    customData?: Record<string, unknown> | null;
    isCommentThreadRoot?: boolean;
    isAnonymous?: boolean;
    APStreamCache?: {
        cache: string;
    } | {
        attach: string;
    };
    blendMode?: IBlendMode | null;
} & ICollaboratorPermissionsOptions;
type ImageAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/image';
    description?: string | null;
    fileName?: string | null;
    contentType: string;
    imageAttachmentId: string;
    rotation: number;
    isSignature?: boolean;
    xfdfAppearanceStream?: string;
    xfdfAppearanceStreamOriginalPageRotation?: number;
};
type ShapeAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    strokeWidth: number;
    strokeColor: string | null;
    fillColor: string | null;
    strokeDashArray?: [number, number] | null;
    measurementPrecision?: IMeasurementPrecision | null;
    measurementScale?: MeasurementScaleJSON | null;
    lineWidth?: number | null;
};
type EllipseAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/ellipse';
    cloudyBorderIntensity: number | null;
    cloudyBorderInset: InsetJSON | null;
    measurementBBox: IRectJSON | null;
};
type LineAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/line';
    startPoint: [number, number];
    endPoint: [number, number];
    lineCaps?: LineCapsType | null;
    lines?: {
        points: [number, number][][];
        intensities: number[][];
    };
};
type PolygonAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/polygon';
    points: [number, number][];
    cloudyBorderIntensity: number | null;
    lines?: {
        points: [number, number][][];
        intensities: number[][];
    };
};
type PolylineAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/polyline';
    points: [number, number][];
    lineCaps?: LineCapsType | null;
    lines?: {
        points: [number, number][][];
        intensities: number[][];
    };
};
type RectangleAnnotationJSON = ShapeAnnotationJSON & {
    type: 'pspdfkit/shape/rectangle';
    cloudyBorderIntensity: number | null;
    cloudyBorderInset?: InsetJSON | null;
    measurementBBox: IRectJSON | null;
};
type InkAnnotationJSON = BaseAnnotationJSON & {
    type: 'pspdfkit/ink';
    lines: {
        points: [number, number][][];
        intensities: number[][];
    };
    lineWidth: number;
    strokeColor: string | null;
    backgroundColor: string | null;
    isDrawnNaturally: boolean;
    isSignature: boolean;
};
type LinkAnnotationJSON = BaseAnnotationJSON & {
    type: 'pspdfkit/link';
    borderColor?: string | null;
    borderWidth?: number | null;
    borderStyle?: IBorderStyle | null;
};
type NoteAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/note';
    text?: {
        format: 'plain';
        value: string;
    };
    icon?: string;
    color?: string;
};
type MediaAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/media';
    description: string | null;
    fileName: string | null;
    contentType: string | null;
    mediaAttachmentId: string | null;
};
type BaseTextMarkupAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    rects: [number, number, number, number][];
};
type TextMarkupAnnotationJSON = BaseTextMarkupAnnotationJSON & {
    type: 'pspdfkit/markup/highlight' | 'pspdfkit/markup/squiggly' | 'pspdfkit/markup/strikeout' | 'pspdfkit/markup/underline' | 'pspdfkit/markup/redaction';
    color: string | null;
};
type RedactionAnnotationJSON = BaseTextMarkupAnnotationJSON & {
    type: 'pspdfkit/markup/redaction';
    fillColor?: string | null;
    outlineColor?: string | null;
    overlayText?: string | null;
    repeatOverlayText?: boolean | null;
    rotation?: number;
    color?: string | null;
};
type StampAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/stamp';
    stampType: StampKind;
    title: string | null;
    color?: string | null;
    subTitle?: string | null;
    subtitle: string | null;
    rotation: number | null;
    xfdfAppearanceStream?: string;
    xfdfAppearanceStreamOriginalPageRotation?: number;
    kind?: StampKind;
};
type TextAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/text';
    text: {
        format: 'xhtml' | 'plain';
        value: string;
    };
    fontColor?: string | null;
    backgroundColor?: string | null;
    font?: string | null;
    rotation?: number | null;
    fontSize?: number | null;
    fontStyle?: string[] | null;
    horizontalAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'center' | 'bottom';
    callout?: {
        start: [number, number];
        knee?: [number, number] | null;
        end: [number, number];
        cap?: ILineCap | null;
        innerRectInset?: InsetJSON | null;
    } | null;
    borderStyle?: IBorderStyle | null;
    borderWidth?: number | null;
    borderColor?: string | null;
    isFitting?: boolean;
    lineHeightFactor?: number | null;
};
type UnknownAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/unknown';
};
type WidgetAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/widget';
    formFieldName: string;
    borderColor?: string | null;
    borderStyle?: IBorderStyle | null;
    borderDashArray?: number[] | null;
    borderWidth?: number | null;
    font?: string | null;
    fontSize?: 'auto' | number | null;
    fontColor?: string | null;
    backgroundColor?: string | null;
    horizontalAlign?: 'left' | 'center' | 'right' | null;
    verticalAlign?: 'top' | 'center' | 'bottom' | null;
    fontStyle?: string[] | null | undefined;
    rotation?: number;
    additionalActions?: SerializedAdditionalActionsType | null;
    lineHeightFactor?: number | null;
};
type CommentMarkerAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
    type: 'pspdfkit/comment-marker';
};
type AnnotationJSONUnion = TextMarkupAnnotationJSON | TextAnnotationJSON | WidgetAnnotationJSON | RedactionAnnotationJSON | StampAnnotationJSON | NoteAnnotationJSON | LinkAnnotationJSON | InkAnnotationJSON | RectangleAnnotationJSON | PolylineAnnotationJSON | PolygonAnnotationJSON | LineAnnotationJSON | EllipseAnnotationJSON | ImageAnnotationJSON | UnknownAnnotationJSON | MediaAnnotationJSON | CommentMarkerAnnotationJSON;

/**
 * On Standalone, this callback receives the name of a font to retrieve as an argument
 * and you can return from it a `Promise` that resolves to a `Blob` with the font data to
 * use.
 *
 * See {@link https://pspdfkit.com/guides/web/current/features/custom-fonts/|this guide}
 * to learn more.
 *
 * @public
 * @callback FontCallback
 * @param {string} fontName The `name` specified on the same {@link PSPDFKit.Font} constructor.
 * @example <caption>Create a custom font for retrieving "Arial.ttf"</caption>
 * new PSPDFKit.Font({
 *   name: "Arial.ttf",
 *   callback: name => fetch(`https://example.com/${name}`).then(r => r.blob());
 * })
 */
type FontCallback = (arg0: string) => Promise<Blob>;

/**
 * @classdesc
 * This record is used to persist information related to custom fonts on Standalone deployments.
 * Custom fonts need to be specified during the instance load and correctly fetched.
 * They will be used while rendering the document contents and exporting its annotations.
 * @example <caption>Create a new Font object</caption>
 * const fetcher = name =>
 *   fetch(`https://example.com/${name}`).then(r => {
 *     if (r.status === 200) {
 *       return r.blob();
 *     } else {
 *       throw new Error();
 *     }
 *   });
 *
 * const customFonts = ["arial.ttf", "helvetica.ttf", "tahoma.ttf"]
 *   .map(font => new PSPDFKit.Font({ name: font, callback: fetcher }));
 *
 * PSPDFKit.load({
 *   customFonts,
 *   regular options...
 * }).then(instance => {});
 * @public
 * @memberof PSPDFKit
 * @summary An object used to load a new font.
 * @class Font
 * @extends Immutable.Record
 * @param {object} args An object used to load a new font.
 */
interface IFont {
    name: string | null;
    callback: FontCallback | null;
}
declare const Font_base: Record$1.Factory<IFont>;
declare class Font extends Font_base {
    constructor(args: {
        name: string;
        callback?: FontCallback;
    });
}

declare const HighlightState_base: Record$1.Factory<IHighlightState>;
declare class HighlightState extends HighlightState_base {
}
interface IHighlightState {
    pageIndex: number;
    rectsOnPage: List<Rect>;
}

/**
 * Defines specific configuration options related to forms.
 *
 * @public
 * @memberof PSPDFKit
 * @interface FormsConfiguration
 * @summary Object containing configuration options for forms
 * @example
 * PSPDFKit.load({
 *   formsConfiguration: {
 *     export: { disableComboBoxArrow: true }
 *   }
 * });
 */
/**
 * Defines configuration options regarding settings when exporting/saving a PDF.
 *
 * @public
 * @memberof PSPDFKit
 * @interface FormsConfigurationExport
 * @summary Object containing configuration options for exporting/saving a PDF with forms.
 * @example
 * PSPDFKit.load({
 *   formsConfiguration: {
 *     export: { disableComboBoxArrow: true }
 *   }
 * });
 */
/**
 * When true, disables writing the arrow button into the saved PDF.
 *
 * @public
 * @instance
 * @member {?boolean} [disableComboBoxArrow]
 * @memberof PSPDFKit.FormsConfigurationExport
 * @default false
 */
type FormsConfigurationExport = {
    disableComboBoxArrow?: boolean;
};
type FormsConfiguration = {
    export?: FormsConfigurationExport;
};

/**
 *
 * @public
 * @summary An object that allows you to configure the Document Editor UI.
 * @memberof PSPDFKit
 * @typedef {object} documentEditorUIConfig
 * @property {number} thumbnailMinSize The minimum size of the thumbnail
 * @property {number} thumbnailMaxSize  The maximum size of the thumbnail
 * @property {number} thumbnailDefaultSize  The default size of the thumbnail
 * @example
 *
 * const myDocumentEditorUIConfig =  {
 *       thumbnailDefaultSize: 500,
 *       thumbnailMinSize: 100,
 *       thumbnailMaxSize: 600,
 *     }
 *
 * PSPDFKit.load(
 *  //...
 *  documentEditorConfig: myDocumentEditorUIConfig,
 * )
 */
type documentEditorUIConfig = {
    thumbnailMinSize: number;
    thumbnailMaxSize: number;
    thumbnailDefaultSize: number;
};

/**
 * This callback is called whenever an annotation gets selected and can be used to
 * define and return an array of {@link PSPDFKit.ToolItem} that will be rendered in a tooltip
 * for the given annotation.
 *
 * If the callback returns an empty array then PSPDFKit won't show any tooltip for the selected annotation.
 *
 * @public
 * @callback AnnotationTooltipCallback
 * @memberof PSPDFKit
 * @param {Annotation} annotation The selected annotation.
 * @example <caption>Register a AnnotationTooltipCallback handler to show a tooltip for text annotations only.</caption>
 * PSPDFKit.load({
 *   annotationTooltipCallback: function(annotation) {
 *     if (annotation instanceof PSPDFKit.Annotations.TextAnnotation) {
 *       var toolItem = {
 *         type: 'custom',
 *         title: 'tooltip item for text annotations',
 *         id: 'item-text-tooltip-annotation',
 *         className: 'TooltipItem-Text',
 *         onPress: function () {
 *           console.log(annotation)
 *         }
 *       }
 *       return [toolItem]
 *     } else {
 *       return []
 *     }
 *   }
 *   // ...
 * });
 */
type AnnotationTooltipCallback = (annotation: AnnotationsUnion) => Array<ToolItem>;

/**
 * This callback is called whenever a page is rendered or printed (only for
 * {@link PSPDFKit.PrintMode}.DOM). You can use it to render watermarks on the page.
 *
 * Make sure that the rendering commands are as efficient as possible as they might be invoked
 * multiple times per page (once per tile).
 *
 * For more information, see {@link PSPDFKit.Configuration#renderPageCallback}.
 *
 * @public
 * @callback RenderPageCallback
 * @memberof PSPDFKit
 * @param {CanvasRenderingContext2D} canvas A 2D `<canvas/>` rendering context.
 * @param {number} pageIndex The current page index, starting with `0` for the first page.
 * @param {PSPDFKit.Geometry.Size} size The size of the page that you're drawing at. The canvas is
 *                                      already scaled accordingly.
 * @example <caption>Register a RenderPageCallback handler at configuration time.</caption>
 * PSPDFKit.load({
 *   renderPageCallback: function(ctx, pageIndex, pageSize) {
 *     ctx.beginPath();
 *     ctx.moveTo(0, 0);
 *     ctx.lineTo(pageSize.width, pageSize.height);
 *     ctx.stroke();
 *
 *     ctx.font = "30px Comic Sans MS";
 *     ctx.fillStyle = "red";
 *     ctx.textAlign = "center";
 *     ctx.fillText(
 *       `This is page ${pageIndex + 1}`,
 *       pageSize.width / 2,
 *       pageSize.height / 2
 *     );
 *   }
 *   // ...
 * });
 */
type RenderPageCallback = (context: CanvasRenderingContext2D, pageIndex: number, pageSize: Size) => unknown;

/**
 * On Standalone, by implementing this callback you have a fine grained control over
 * which certificates are going to be used for digital signatures validation.
 *
 * For more information, see {@link PSPDFKit.Configuration#trustedCAsCallback}
 *
 * @public
 * @callback TrustedCAsCallback
 * @memberof PSPDFKit
 * @example <caption>Fetch and use custom set of certificates (Standalone)</caption>
 * @returns {Promise.<Array<ArrayBuffer | string>>} The CA certificates in DER (`ArrayBuffer`) or PEM (`string`) format.
 * PSPDFKit.load({
 *   trustedCAsCallback: function() {
 *     return new Promise((resolve, reject) => {
 *        fetch("/your-certificate.cer")
 *         .then(res => res.arrayBuffer())
 *         .then(cert => resolve([cert]))
 *         .catch(reject)
 *     });
 *   },
 *   // ...
 * });
 */
type TrustedCAsCallback = () => Promise<Array<ArrayBuffer | string>>;

/**
 * Represents one of the available signing methods for adding
 * new electronic signatures using the UI.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.ElectronicSignatureCreationMode} DRAW - UI in which users draw a signature.
 * @property {PSPDFKit.ElectronicSignatureCreationMode} IMAGE - UI in which users pick or drag an image to use that as the signature.
 * @property {PSPDFKit.ElectronicSignatureCreationMode} TYPE - UI in which users can type a text and generate an image signature from it.
 */
declare const ElectronicSignatureCreationMode: {
    readonly DRAW: "DRAW";
    readonly IMAGE: "IMAGE";
    readonly TYPE: "TYPE";
};
type IElectronicSignatureCreationMode = (typeof ElectronicSignatureCreationMode)[keyof typeof ElectronicSignatureCreationMode];

type ColorPreset = {
    color: Color | null;
    localization: {
        id: string;
        defaultMessage?: string;
        description?: string;
    };
};

/**
 * Defines specific configuration options related to the electronic signatures feature.
 *
 * @public
 * @memberof PSPDFKit
 * @interface ElectronicSignaturesConfiguration
 * @summary Object containing configuration options for electronic signatures
 * @example
 * PSPDFKit.load({
 *   electronicSignatures: {
 *     creationModes: [PSPDFKit.ElectronicSignatureCreationMode.IMAGE],
 *     fonts: [new PSPDFKit.Font("mycustomfont")]
 *   }
 * });
 */
/**
 * Array of tabs that should be offered to users on the
 * electronic signatures modal.
 *
 * @public
 * @instance
 * @member {Array<PSPDFKit.ElectronicSignatureCreationMode>} creationModes
 * @memberof PSPDFKit.ElectronicSignaturesConfiguration
 */
/**
 * Array of {@link PSPDFKit.Font} fonts that users can choose from
 * when typing text for adding a new electronic signature.
 *
 * You can specify any additional font to use on a custom style sheet
 * set via {@link PSPDFKit.Configuration#styleSheets} via `@font-face`
 * CSS at-rule.
 *
 * When specifying the `name` of each `PSPDFKit.Font` record make sure
 * that it matches the one specified on the style sheet.
 *
 * @public
 * @instance
 * @member {Array<PSPDFKit.Font>} fonts
 * @memberof PSPDFKit.ElectronicSignaturesConfiguration
 */
/**
 * Optionally set an initial default text for the Type Electronic Signature UI.
 *
 * The default placeholder will be shown if the callback does not return a non-empty string,
 * or is not set to a non-empty string.
 *
 * @example <caption>Setting a default text for the Type Electronic Signature UI</caption>
 *  PSPDFKit.load({
 *   electronicSignatures: {
 *    setDefaultTypeText: () => "My default text"
 *  }
 * });
 * @public
 * @optional
 * @instance
 * @member {?(PSPDFKit.ElectronicSignatureDefaultTextCallback | string)} setDefaultTypeText
 * @memberof PSPDFKit.ElectronicSignaturesConfiguration
 */
/**
 * Optionally set color presets to be used in the Electronic Signatures dialog.
 *
 * @example <caption>Setting custom color presets for the Type Electronic Signature UI</caption>
 *  PSPDFKit.load({
 *   electronicSignatures: {
 *     colorPresets: [
 *       {
 *         color: Color.RED,
 *         localization: {
 *           id: 'red',
 *           defaultMessage: 'Red',
 *           description: 'Red color',
 *         },
 *       },
 *       {
 *         color: Color.ORANGE,
 *         localization: {
 *           id: 'orange',
 *           defaultMessage: 'Orange',
 *           description: 'Orange color',
 *         },
 *       },
 *       {
 *         color: Color.YELLOW,
 *         localization: {
 *           id: 'yellow',
 *           defaultMessage: 'Yellow',
 *           description: 'Yellow color',
 *         },
 *       },
 *     ],
 *   }
 * });
 * @public
 * @optional
 * @instance
 * @member {?Array<PSPDFKit.ColorPreset>} colorPresets
 * @memberof PSPDFKit.ElectronicSignaturesConfiguration
 */
type ElectronicSignaturesConfiguration = {
    creationModes?: Readonly<IElectronicSignatureCreationMode[]>;
    fonts?: Readonly<Font[]>;
    setDefaultTypeText?: ElectronicSignatureDefaultTextCallback | string;
    colorPresets?: Readonly<ColorPreset[]>;
};
/**
 * @public
 * @callback ElectronicSignatureDefaultTextCallback
 * @memberof PSPDFKit
 * @summary Callback that returns the default text for the Type Electronic Signature UI.
 * @returns {string | null} The default text for the Type Electronic Signature UI.
 */
type ElectronicSignatureDefaultTextCallback = () => string | undefined | void;

/**
 * When working with annotations and form field values, there are multiple options when the data can
 * get saved. The AutoSaveMode controls this behavior.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.AutoSaveMode} IMMEDIATE Saves immediately whenever an attribute of the annotation changed, or whenever a form field
 * value got updated.
 * @property {PSPDFKit.AutoSaveMode} INTELLIGENT Saves annotations automatically, when the user finishes editing an annotation. For form fields,
 * this behaves like {@link PSPDFKit.AutoSaveMode.IMMEDIATE}.
 * @property {PSPDFKit.AutoSaveMode} DISABLED Never saves annotations or form field values automatically. Annotations and form field values
 * can still be saved via {@link PSPDFKit.Instance#save} or
 * {@link PSPDFKit.Instance#saveFormFieldValues}
 *
 * In this mode, document signatures validation information will not be automatically updated
 * if the document is modified, until changes are saved.
 */
declare const AutoSaveMode: {
    readonly IMMEDIATE: "IMMEDIATE";
    readonly INTELLIGENT: "INTELLIGENT";
    readonly DISABLED: "DISABLED";
};
type IAutoSaveMode = (typeof AutoSaveMode)[keyof typeof AutoSaveMode];

/**
 * Describes Quality used to print a PDF document.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.PrintQuality} LOW Low will print the PDF in original quality.
 * @property {PSPDFKit.PrintQuality} MEDIUM Medium quality printing (150 dpi).
 * @property {PSPDFKit.PrintQuality} HIGH High quality printing (300 dpi).
 *
 * Note: With increase in the PDF print Quality speed of printing will decrease.
 */
declare const PrintQuality: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
};
type IPrintQuality = (typeof PrintQuality)[keyof typeof PrintQuality];

/**
 * Configure where the toolbar is placed.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.ToolbarPlacement} TOP The default value. The toolbar will be placed at the top of the viewport.
 * @property {PSPDFKit.ToolbarPlacement} BOTTOM The toolbar will be placed at the bottom of the viewport.
 */
declare const ToolbarPlacement: {
    readonly TOP: "TOP";
    readonly BOTTOM: "BOTTOM";
};
type IToolbarPlacement = (typeof ToolbarPlacement)[keyof typeof ToolbarPlacement];

/**
 * By default, all the URLs on which the user clicks explicitly open as expected but the URLs which open due to a result of JavaScript action are not opened due to security reasons.
 * You can override this behaviour using this callback. If this callback returns `true`, the URL will open.
 *
 * For more information, see {@link PSPDFKit.Configuration#onOpenURI}.
 *
 * @public
 * @callback OnOpenUriCallback
 * @memberof PSPDFKit
 * @param {string} url
 * @param {boolean} isUserInitiated Tells you whether the URL is being opened because of user's interaction or not.
 * @example <caption>Render rectangle annotations using their AP stream</caption>
 * PSPDFKit.load({
 *   onOpenURI: (url, isUserInitiated) => {
 *     if (url.startsWith('https://abc.com') && isUserInitiated) {
 *       return true
 *     }
 *
 *     return false;
 *   }
 *   // ...
 * });
 */
type OnOpenUriCallback = (uri: string, isUserInitiated: boolean) => boolean;

/**
 * Indicates which UI element certain JavaScript `Date` instance will be rendered in.
 * Used as part of {@link PSPDFKit.Configuration#dateTimeString}.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.UIDateTimeElement} COMMENT_THREAD Comment thread.
 * @property {PSPDFKit.UIDateTimeElement} ANNOTATIONS_SIDEBAR Annotations sidebar.
 */
declare const UIDateTimeElement: {
    readonly COMMENT_THREAD: "COMMENT_THREAD";
    readonly ANNOTATIONS_SIDEBAR: "ANNOTATIONS_SIDEBAR";
};
type IUIDateTimeElement = (typeof UIDateTimeElement)[keyof typeof UIDateTimeElement];

/**
 * Defining this callback allows you to customize how dates are rendered as part
 * of the PSPDFKit UI.
 *
 * @public
 * @callback DateTimeStringCallback
 * @memberof PSPDFKit
 * @param {object} args Arguments passed to the callback.
 * @param {Date} args.date The date to be formatted.
 * @param {PSPDFKit.UIDateTimeElement} args.element The PSPDFKit UI element on which the date is going to be rendered.
 * @param {AnnotationsUnion | PSPDFKit.Comment} args.object The annotation or comment that contains the date that is being rendered.
 * @example
 * PSPDFKit.load({
 *   dateTimeString: ({ dateTime, element }) => {
 *     if(element === PSPDFKit.UIDateTimeElement.ANNOTATIONS_SIDEBAR) {
 *       return new Intl.DateTimeFormat("en-US", {
 *         dateStyle: "short",
 *         timeStyle: "short",
 *       }).format(dateTime);
 *     } else {
 *       return new Intl.DateTimeFormat("en-US", {
 *         dateStyle: "full",
 *         timeStyle: "long",
 *       }).format(dateTime);
 *     }
 *   }
 *   // ...
 * });
 */
type DateTimeStringCallback = (args: {
    dateTime: Date;
    element: IUIDateTimeElement;
    object: AnnotationsUnion | Comment;
}) => string;

declare const InkEraserMode: {
    readonly POINT: "POINT";
    readonly STROKE: "STROKE";
};
type IInkEraserMode = (typeof InkEraserMode)[keyof typeof InkEraserMode];

/**
 * This callback allows users to customize the colors that will be displayed in our color dropdown picker, and to add a custom color picker UI to it.
 *
 * @public
 * @memberof PSPDFKit
 * @callback AnnotationToolbarColorPresetsCallback
 * @seealso PSPDFKit.Configuration#AnnotationToolbarColorPresetsCallback
 * @param {object} options
 * @param {BuiltInColorProperty} options.propertyName The annotation property for which we need to render a customized array of colors in the color dropdown.
 * The built-in color properties are:
 *
 * -'color'
 * -'stroke-color'
 * -'fill-color'
 * -'background-color'
 * -'font-color'
 * -'outline-color
 *
 * Different annotations have different color properties, but all of them are listed above. If you pass a color property that it's not supported, you will get an error.
 * @param {ColorPreset[]} options.defaultItems array of default colors
 * @returns {PSPDFKit.AnnotationToolbarColorPresetConfig} the configuration of the customized color picker
 * @example <caption>Customize different color dropdowns.</caption>
 * PSPDFKit.load({
 *  annotationToolbarColorPresets: function ({ propertyName }) {
 *    if (propertyName === "font-color") {
 *      return {
 *        presets: [
 *          {
 *            color: new PSPDFKit.Color({ r: 0, g: 0, b: 0 }),
 *            localization: {
 *              id: "brightRed",
 *              defaultMessage: "Bright Red",
 *            },
 *          },
 *          {
 *            color: new PSPDFKit.Color({ r: 100, g: 100, b: 180 }),
 *            localization: {
 *              id: "deepBlue",
 *              defaultMessage: "deepBlue",
 *            },
 *          },
 *        ],
 *      };
 *    }
 *
 *    if (propertyName === "stroke-color") {
 *      return {
 *        presets: [
 *          {
 *            color: new PSPDFKit.Color({ r: 0, g: 0, b: 0 }),
 *            localization: {
 *              id: "brightRed",
 *              defaultMessage: "Bright Red",
 *            },
 *          },
 *          {
 *            color: new PSPDFKit.Color({ r: 100, g: 100, b: 180 }),
 *            localization: {
 *              id: "deepBlue",
 *              defaultMessage: "deepBlue",
 *            },
 *          },
 *        ],
 *        showColorPicker: false,
 *      };
 *    }
 *  },
 *  //...
 *});
 */
/**
 * @public
 * @memberof PSPDFKit
 * @interface AnnotationToolbarColorPresetConfig
 * @property {ColorPreset[]} presets - the array of colors to be displayed in a customized color picker dropdown
 * @property {?boolean} colorPicker - Defines whether you want to render the custom color picker UI. The default value is `true`, meaning that by default we render the custom color picker in the color dropdown.
 */
type BuiltInColorProperty = 'color' | 'stroke-color' | 'fill-color' | 'background-color' | 'font-color' | 'outline-color' | 'border-color';
type AnnotationToolbarColorPresetConfig = {
    presets: ColorPreset[];
    showColorPicker?: boolean;
};
type AnnotationToolbarColorPresetsCallback = (options: {
    propertyName: BuiltInColorProperty;
    defaultAnnotationToolbarColorPresets: ColorPreset[];
}) => AnnotationToolbarColorPresetConfig | undefined;

/**
 * This call back defines which text annotations should be treated as rich text annotation.
 * By default, all the text annotations are treated as plain text annotations, which means that
 * when you edit them, you will see the plain text editor. You can change this behavior by
 * returning `true` for the text annotations that you want to be treated as rich text annotations.
 *
 * For more information, see {@link PSPDFKit.Configuration#enableRichText}.
 *
 * @public
 * @callback EnableRichTextCallback
 * @memberof PSPDFKit
 * @param {TextAnnotation} textAnnotation
 * @example <caption>Only treat newly created annotations as rich text annotations</caption>
 * PSPDFKit.load({
 *   enableRichText: annotation => annotation.pageIndex === null
 *   // ...
 * });
 */
type EnableRichTextCallback = (annotation: TextAnnotation) => boolean;

/**
 * ***optional, Standalone only***
 *
 * Document processing can be a time-consuming task, especially when working with large documents. In order to improve the user experience
 * it is possible to choose between two different processor engines with different optimizations applied: either one with a
 * smaller bundle size (the default), but slower overall performance, or one with a larger bundle size, but faster processing time.
 *
 * Either case it's recommended to enable asset compression on your Server to improve loading time.
 *
 * Processor Engine Comparison:
 *
 * | Preference                  | Bundle Size | Document Processing | Recommended Use               |
 * |-----------------------------|-------------|---------------------|-------------------------------|
 * | smallerSize                 | Smaller     | Slower              | Prioritize compact app size   |
 * | fasterProcessing            | Larger      | Faster              | Quick document processing     |
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.ProcessorEngine} smallerSize A smaller processor engine will be used for processing (default).
 * @property {PSPDFKit.ProcessorEngine} fasterProcessing A faster processor engine will be used for processing.
 */
declare const ProcessorEngine: {
    smallerSize: string;
    fasterProcessing: string;
};
type IProcessorEngine = (typeof ProcessorEngine)[keyof typeof ProcessorEngine];

/**
 * This describes the properties of a {@link PSPDFKit.load} configuration.
 * @public
 * @memberof PSPDFKit
 * @interface Configuration
 */
/**
 * ***required***
 *
 * Selector or element where PSPDFKit for Web will be mounted.
 *
 * The element must have a `width` and `height` that's greater than zero. PSPDFKit for Web adapts to the dimensions
 * of this element. This way, applying responsive rules will work as expected.
 *
 * The element can be styled using relative values as you would expect it to (CSS media queries
 * are encouraged).
 * @example
 * // In your HTML
 * <div class="foo"></div>
 *
 * // In your JavaScript
 * PSPDFKit.load({ container: '.foo', ... });
 * // or
 * const element = document.getElementsByClassName('foo')[0]
 * PSPDFKit.load({ container: element, ... });
 * @public
 * @instance
 * @member {string|HTMLElement} container
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***required, Server only***
 *
 * The document ID for the document that should be displayed. You can create a document via the
 * Nutrient Document Engine API.
 *
 * Please refer to the Server API documentation for a guide on how to create valid documents.
 * @example
 * PSPDFKit.load({ documentId: '85203', ... });
 * @public
 * @server
 * @instance
 * @member {string} documentId
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Server only***
 *
 * The `session` token used to authenticate Web Viewer session with DWS Viewer API or Document Engine.
 *
 * @example
 * PSPDFKit.load({ session: 'xxx.xxx.xxx' });
 * @public
 * @server
 * @instance
 * @member {string} session
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***required, Server only***
 *
 * The `authPayload` is the configuration for the JSON Web Token.
 *
 * Please refer to {@link https://pspdfkit.com/guides/web/current/server-backed/client-authentication/|this guide article} for information how to create valid JWTs.
 * @example
 * PSPDFKit.load({ authPayload: { jwt: 'xxx.xxx.xxx' }, ... });
 * @public
 * @server
 * @instance
 * @member {object} authPayload
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***required, Server only***
 *
 * PSPDFKit Instant is a real-time collaboration platform that enables your users to annotate documents
 * using PSPDFKit across iOS, Android and their browser simultaneously. Annotations synchronized
 * using PSPDFKit Instant are pushed in real-time to every connected device.
 *
 * All document editing features, such as text annotations, ink drawing or text highlighting, are instantly saved and propagated across all connected devices.
 *
 * When this flag is set to `true`, different parts of the API will also be enabled, for example:
 * {@link PSPDFKit.Instance#connectedInstantClients}.
 *
 * This value does not have a default. You either need to define `instant: true` or
 * `instant: false` in your PSPDFKit configuration.
 * @example
 * PSPDFKit.load({ instant: true, ... });
 * @public
 * @server
 * @instance
 * @member {boolean} instant
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***required, Standalone only***
 *
 * The URL to a supported document or its content as `ArrayBuffer`.
 *
 * PSPDFKit supports the following type of documents:
 *
 * - PDF
 * - Image
 *
 * Note that all the formats except for PDF require a dedicate license.
 * Please contact sales to find out more about this.
 *
 * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
 * @example <caption>Load a PDF document from an URI</caption>
 * PSPDFKit.load({ document: 'https://example.com/document.pdf', ... });
 * @example <caption>Load a document from an ArrayBuffer</caption>
 * PSPDFKit.load({ document: arrayBuffer, ... });
 * @public
 * @standalone
 * @instance
 * @member {string|ArrayBuffer} document
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * PSPDFKit for Web license key from https://customers.pspdfkit.com.
 *
 * If not provided, the instance will run in trial mode for a limited time and then request the user to visit
 * {@link https://pspdfkit.com/try/} to request a trial license.
 * @example <caption>Activate with a license key</caption>
 * PSPDFKit.load({ licenseKey: "YOUR_LICENSE_KEY_GOES_HERE", ... });
 * @public
 * @standalone
 * @instance
 * @member {?string} licenseKey
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This property allows you to set an initial list of toolbar items for the PSPDFKit instance.
 * This can be used to customize the main toolbar before the application mounts.
 *
 * When omitted, it will default to {@link PSPDFKit.defaultToolbarItems}.
 * @example
 * const toolbarItems = PSPDFKit.defaultToolbarItems;
 * toolbarItems.reverse();
 * PSPDFKit.load({ toolbarItems: toolbarItems, ... });
 * @public
 * @instance
 * @member {?Array.<PSPDFKit.ToolbarItem>} toolbarItems
 * @memberof PSPDFKit.Configuration
 * @default Default {@link PSPDFKit.defaultToolbarItems}
 */
/**
 * *optional*
 *
 * This property allows you to change a default list of annotation presets for the PSPDFKit instance.
 * This can be used to customize the main toolbar buttons behaviour before the application mounts.
 *
 * When omitted, it will default to {@link PSPDFKit.defaultAnnotationPresets}.
 * @example
 * const annotationPresets = PSPDFKit.defaultAnnotationPresets
 * annotationPresets.mypreset = {
 *   strokeWidth: 10,
 * };
 * PSPDFKit.load({ annotationPresets, ... });
 * @public
 * @instance
 * @member {?object} annotationPresets
 * @memberof PSPDFKit.Configuration
 * @default Default {@link PSPDFKit.defaultAnnotationPresets}
 */
/**
 * *optional*
 *
 * This property allows you to set an initial list of stamp and image annotation templates for the PSPDFKit instance.
 * This can be used to customize the list of available stamp and image annotation templates that will be available in the stamps picker UI before the application mounts.
 *
 * When omitted, it will default to {@link PSPDFKit.defaultStampAnnotationTemplates}.
 * @example
 * const stampAnnotationTemplates = PSPDFKit.defaultStampAnnotationTemplates
 * const stampAnnotationTemplates.push(new PSPDFKit.Annotations.StampAnnotation({
 *   stampType: "Custom",
 *   title: "My custom text",
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     left: 0,
 *     top: 0,
 *     width: 300,
 *     height: 100
 *   })
 * }));
 * PSPDFKit.load({ stampAnnotationTemplates, ... });
 * @public
 * @instance
 * @member {Array<PSPDFKit.Annotations.StampAnnotation | PSPDFKit.Annotations.ImageAnnotation>} stampAnnotationTemplates
 * @memberof PSPDFKit.Configuration
 * @default Default {@link PSPDFKit.defaultStampAnnotationTemplates}
 */
/**
 * *optional*
 *
 * This property allows you to set an initial viewing state for the PSPDFKit instance.
 *
 * This can be used to customize behavior before the application mounts (e.g Scroll to a specific
 * page or use the SINGLE_PAGE mode)
 *
 * It will default to a view state with its default properties (see {@link PSPDFKit.ViewState}).
 *
 * If the initial view state is invalid (for example, when you define a page index that does not
 * exist), the method will fall back to the default value for the invalid property. This means when
 * you set the initial `currentPageIndex` to 5 but the document only has three pages, PSPDFKit will
 * start on the first page but will still apply other rules defined in this initial view state.
 * @example
 * const initialViewState = new PSPDFKit.ViewState({ currentPageIndex: 2 });
 * PSPDFKit.load({ initialViewState: initialViewState, ... });
 * @public
 * @instance
 * @member {?PSPDFKit.ViewState} initialViewState
 * @memberof PSPDFKit.Configuration
 * @default Default {@link PSPDFKit.ViewState}
 */
/**
 * *optional*
 *
 * This property allows you to change the size of the tiles used to render the document, in pixels. The bigger the tile, the fewer requests is made, but each tile will take longer to render.
 *
 * This is useful for situations where you want to reduce the number of requests made to the server.
 *
 * By default, the tile size is set to 512px in Nutrient Document Engine (server-backed) deployment, and 1536px in Standalone deployment.
 * @example
 * PSPDFKit.load({
 *   tileSize: 1024
 * })
 * @public
 * @instance
 * @member {?number} tileSize
 * @memberof PSPDFKit.Configuration
 * @default 512 in Nutrient Document Engine (server-backed), 1536 in Standalone
 */
/**
 * *optional*
 *
 * This will load your custom CSS as a `<link rel="stylesheet">` inside the PSPDFKit component. This
 * is necessary to isolate styling of the viewer from the outside application and avoid external
 * stylesheets overwriting important viewer attributes.
 *
 * An array is allowed to load multiple stylesheets. The order in the array will also be the
 * order in which the stylesheets get loaded.
 *
 * The array will be copied by us on start up time, which means that you can not mutate it
 * after the viewer has started.
 *
 * More information on how to style PSPDFKit for Web can be found in our guides.
 * @example
 * PSPDFKit.load({
 *   styleSheets: [
 *     'https://example.com/my-stylesheet.css',
 *     'https://example.com/other-stylesheet.css'
 *   ]
 * })
 * @public
 * @instance
 * @member {?Array.<string>} styleSheets
 * @memberof PSPDFKit.Configuration
 * @default []
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected Nutrient Document Engine URL. This setting is necessary
 * when your Nutrient Document Engine is located under a different URL.
 * @example
 * PSPDFKit.load({ serverUrl: 'https://public-server.pspdfkit.com/' })
 * @instance
 * @public
 * @member {?string} serverUrl
 * @memberof PSPDFKit.Configuration
 * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected URL for all PSPDFKit assets. This setting is
 * necessary when you load PSPDFKit for Web JavaScript from a different URL.
 *
 * If your assets are served from a different origin, you have to include proper CORS headers:
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
 * @example
 * PSPDFKit.load({ baseUrl: 'https://public-server.pspdfkit.com/' });
 * @instance
 * @public
 * @member {?string} baseUrl
 * @memberof PSPDFKit.Configuration
 * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected URL for the Core worker PSPDFKit assets in Standalone mode.
 * This setting may be necessary when you integrate PSPDFKit for Web JavaScript in an environment that limits
 * the size of the static assets, like Salesforce.
 *
 * If your Core assets are served from a different origin, you have to include proper CORS headers:
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
 *
 * This must end with a trailing slash, and the Core assets (`nutrient-viewer-[hash].wasm.js`
 * and `nutrient-[hash].wasm`) must be located in a `nutrient-viewer-lib` subfolder accessible
 * from the `baseCoreUrl`.
 * @example
 * PSPDFKit.load({ baseCoreUrl: 'https://public-server.pspdfkit.com/pspdfkit-core/' });
 * @instance
 * @public
 * @member {?string} baseCoreUrl
 * @memberof PSPDFKit.Configuration
 * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
 * from the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional, Standalone only*
 *
 * This allows you to overwrite the auto-detected URL for the processor engine worker PSPDFKit assets in Standalone mode.
 * This setting may be necessary when you integrate PSPDFKit for Web JavaScript in an environment that limits
 * the size of the static assets, like Salesforce.
 *
 * If these assets are served from a different origin, you have to include proper CORS headers:
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
 *
 * This must end with a trailing slash, and the assets in the `/nutrient-viewer-lib/gdpicture-[hash]/` folder must be directly located
 * in the folder pointed to by `baseProcessorEngineUrl`.
 * @example
 * PSPDFKit.load({ baseProcessorEngineUrl: 'https://public-cdn.example.com/pspdfkit-processor-engine/' });
 * @instance
 * @public
 * @member {?string} baseProcessorEngineUrl
 * @memberof PSPDFKit.Configuration
 * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
 * from the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This property allows you to set the auto save mode, which controls when annotations or form field
 * values get saved.
 *
 * When using `instant: true`, the default auto save mode is IMMEDIATE, otherwise it's
 * INTELLIGENT.
 * @example
 * PSPDFKit.load({ autoSaveMode: PSPDFKit.AutoSaveMode.INTELLIGENT })
 * @public
 * @instance
 * @member {?PSPDFKit.AutoSaveMode} autoSaveMode
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This property allows you to set the {@link PSPDFKit.PrintMode} to use.
 * @example
 * PSPDFKit.load({ printMode: PSPDFKit.PrintMode.DOM })
 * @public
 * @instance
 * @member {?PSPDFKit.PrintMode} printMode
 * @default PSPDFKit.PrintMode.DOM
 * @memberof PSPDFKit.Configuration
 * deprecated
 */
/**
 * *optional*
 *
 * Allows to set different printing options like mode and printing quality.
 * @public
 * @instance
 * @member {?object} printOptions
 * @property {PSPDFKit.PrintMode} mode {@link PSPDFKit.PrintMode} mode to use for printing.
 * @property {PSPDFKit.PrintQuality} quality {@link PSPDFKit.PrintQuality} The option to control the quality of the printing.
 * @memberof PSPDFKit.Configuration
 * @default { mode: PSPDFKit.PrintMode.DOM, quality: PSPDFKit.PrintQuality.HIGH }
 */
/**
 * *optional*
 *
 * This property allows you to disable high quality printing, which will print the document in a higher
 * resolution (300dpi) than the default (150dpi). When not explicitly set, high quality printing is disabled
 * for iOS and Android devices on standalone deployments to improve performances.
 * @example
 * PSPDFKit.load({ disableHighQualityPrinting: true })
 * @default false
 * @public
 * @instance
 * @member {?boolean} disableHighQualityPrinting
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * When this property is set to true, text in the document can not be highlighted.
 * @example
 * PSPDFKit.load({ disableTextSelection: true })
 * @public
 * @instance
 * @member {?boolean} disableTextSelection
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This property is used to force the disabling of form rendering and parsing, even if your license
 * would permit it.
 * @example
 * PSPDFKit.load({ disableForms: true })
 * @public
 * @instance
 * @member {?boolean} disableForms
 * @default false
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * [Instant JSON](https://www.nutrient.io/guides/web/importing-exporting/instant-json/) can be
 * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be used
 * to store annotation changes on your server and conveniently instantiate the viewer with the same
 * content at a later time.
 *
 * Instead of storing the updated PDF, this serialization only contains a diff that is applied
 * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
 * potentially large PDF all the time.
 *
 * You can export this format from a standalone instance by using
 * {@link PSPDFKit.Instance#exportInstantJSON}.
 *
 * `annotations` will follow the [Instant Annotation JSON format specification](https://pspdfkit.com/guides/server/current/api/json-format/).
 * @example
 * PSPDFKit.load({
 *   instantJSON: {
 *     format: 'https://pspdfkit.com/instant-json/v1',
 *     skippedPdfObjectIds: [1],
 *     annotations: [
 *       { id:  1, pdfObjectId: 1, type: 'pspdfkit/text', content: 'Hello World', ...},
 *       { id: -1, type: 'pspdfkit/text', content: 'Hello Universe', ...},
 *     ],
 *   },
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @member {?object} instantJSON
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * [XFDF](https://en.wikipedia.org/wiki/Portable_Document_Format#XML_Forms_Data_Format_(XFDF)) can be
 * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be used
 * to store annotation and form fields changes on your server and conveniently instantiate the viewer with the same
 * content at a later time.
 *
 * Instead of storing the updated PDF, this serialization only contains a diff that is applied
 * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
 * potentially large PDF all the time.
 *
 * You can export this format from a standalone instance by using
 * {@link PSPDFKit.Instance#exportXFDF}.
 * @example
 * PSPDFKit.load({
 *   XFDF: xfdfString,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @member {?string} XFDF
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * Whether the annotations embedded in the PDF document should be kept instead of replaced importing XFDF.
 *
 * The default import behavior will replace all annotations.
 * @example
 * PSPDFKit.load({
 *   XFDF: xfdfString,
 *   XFDFKeepCurrentAnnotations: true,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @member {?boolean} XFDFKeepCurrentAnnotations
 * @memberof PSPDFKit.Configuration
 * @default false
 */
/**
 * ***Standalone only***
 *
 * Whether the imported XFDF should ignore the page rotation.
 *
 * The default import behavior will take the page rotation into account.
 *
 * This is useful when you have PDF pages that look the same, but have different underlying page rotations.
 * Use in connection with {@link PSPDFKit.Instance#exportXFDF} ignorePageRotation parameter.
 * @example
 * PSPDFKit.load({
 *   XFDF: xfdfString,
 *   XFDFIgnorePageRotation: true,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @member {?boolean} XFDFIgnorePageRotation
 * @memberof PSPDFKit.Configuration
 * @default false
 */
/**
 * ***Optional***
 *
 * When `disableWebAssemblyStreaming` is set to `true`, we force disable WebAssembly streaming
 * instantiation. More info about this optimization can be found at:
 * {@link https://pspdfkit.com/blog/2018/optimize-webassembly-startup-performance/#streaming-instantiation-combining-download-and-instantiation-2dc410}
 * @example
 * PSPDFKit.load({
 *   disableWebAssemblyStreaming: true,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @member {?boolean} disableWebAssemblyStreaming
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * By default, only links that are represented as valid link annotations in the PDF will be enabled.
 * When `enableAutomaticLinkExtraction` is set to `true`, the text of the PDF will be scanned and
 * links will automatically be created.
 *
 * To enable automatic link extraction on a Nutrient Document Engine (server-backed) deployment, check out:
 * {@link https://www.nutrient.io/guides/web/pspdfkit-server/configuration/overview/}
 * @example
 * PSPDFKit.load({
 *   enableAutomaticLinkExtraction: true,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @member {?boolean} enableAutomaticLinkExtraction
 * @memberof PSPDFKit.Configuration
 */
/**
 * Loads PSPDFKit for Web in Headless mode i.e. without a UI.
 * Some UI-specific APIs, like the Toolbars API, are not available in this mode
 * and, when used, will throw an error.
 * @example
 * PSPDFKit.load({
 *   headless: true,
 *   // ...
 * });
 * @public
 * @instance
 * @member {?boolean} headless
 * @memberof PSPDFKit.Configuration
 */
/**
 * The initial `locale` (language) for the application.
 * All the available locales are defined in {@link PSPDFKit.I18n.locales}.
 * When a locale is not provided PSPDFKit for Web tries to autodetect the locale using `window.navigator.language`.
 * If the detected locale is not supported then the `en` locale is used instead.
 * @example
 * PSPDFKit.load({
 *   locale: 'de',
 *   // ...
 * });
 * @public
 * @instance
 * @member {?string} locale
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * Loads Ink Signatures when the UI displays them for the first time.
 *
 * Ink Signatures are special Ink Annotations whose `pageIndex` and `boundingBox` are defined at creation time.
 * They can be converted to serializable objects with {@link PSPDFKit.Annotations.toSerializableObject} and stored as JSON using their InstantJSON format.
 * Serialized JSON annotations can be deserialized with `JSON.parse` and then converted to annotations with {@link PSPDFKit.Annotations.fromSerializableObject}.
 * @example <caption>Populate Ink Signatures on demand.</caption>
 * PSPDFKit.load({
 *   populateInkSignatures: () => {
 *    return fetch('/signatures')
 *       .then(r => r.json())
 *       .then(a => (
 *           PSPDFKit.Immutable.List(
 *             a.map(PSPDFKit.Annotations.fromSerializableObject))
 *           )
 *        );
 *   },
 *   // ...
 * });
 * @public
 * @instance
 * @default () => Promise.resolve(PSPDFKit.Immutable.List())
 * @member {?Function} populateInkSignatures
 * @returns {Promise.<PSPDFKit.Immutable.List.<PSPDFKit.Annotations.InkAnnotation>>} A Promise that resolves to a {@link PSPDFKit.Immutable.List} of {@link PSPDFKit.Annotations.InkAnnotation InkAnnotation} that describe signatures.
 * @memberof PSPDFKit.Configuration
 * @deprecated
 */
/**
 * *optional*
 *
 * Loads signatures when the UI displays them for the first time.
 *
 * Signatures can be added as special Ink Annotations or Image Annotations whose `pageIndex` and `boundingBox` are defined at creation time.
 * They can be converted to serializable objects with {@link PSPDFKit.Annotations.toSerializableObject} and stored as JSON using their InstantJSON format.
 * Serialized JSON annotations can be deserialized with `JSON.parse` and then converted to annotations with {@link PSPDFKit.Annotations.fromSerializableObject}.
 * @example <caption>Populate Signatures on demand.</caption>
 * PSPDFKit.load({
 *   populateStoredSignatures: () => {
 *    return fetch('/signatures')
 *       .then(r => r.json())
 *       .then(a => (
 *           PSPDFKit.Immutable.List(
 *             a.map(PSPDFKit.Annotations.fromSerializableObject))
 *           )
 *        );
 *   },
 *   // ...
 * });
 * @public
 * @instance
 * @default () => Promise.resolve(PSPDFKit.Immutable.List())
 * @member {?Function} populateStoredSignatures
 * @returns {Promise.<PSPDFKit.Immutable.List.<PSPDFKit.Annotations.InkAnnotation | PSPDFKit.Annotations.ImageAnnotation>>} A Promise that resolves to a {@link PSPDFKit.Immutable.List} of {@link PSPDFKit.Annotations.InkAnnotation InkAnnotation} or {@link PSPDFKit.Annotations.ImageAnnotation ImageAnnotation} that describe signatures.
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * List of signature form fields names that are not allowed to store Ink Signatures.
 *
 * When a signature form field name is on this list, any new ink signature for this field that is created via the UI won't be stored.
 * @example <caption>.</caption>
 * PSPDFKit.load({
 *   formFieldsNotSavingSignatures: ['signatureField1'],
 *   // ...
 * });
 * @public
 * @instance
 * @default []
 * @member {?Array.<string>} formFieldsNotSavingSignatures
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * If set, it will try to unlock the PDF with the provided password when loading it. PDFs which do
 * not require a password won't open if this property is set.
 * @example
 * PSPDFKit.load({
 *   password: 'secr3t',
 *   // ...
 * });
 * @public
 * @instance
 * @member {?string} password
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * Defines how often the password modal is presented after a wrong password has been entered. By
 * default, there won't be a limit for a regular PSPDFKit for Web installation.
 *
 * When running in the headless mode, this option is ignored as we don't have an interface where
 * we could request a password (This is the same as setting `maxPasswordRetries` to `0`).
 * @example
 * PSPDFKit.load({
 *   maxPasswordRetries: 3,
 *   // ...
 * });
 * @public
 * @instance
 * @member {?number} maxPasswordRetries
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * When you're using a ServiceWorker, set this flag to `true` to be able to use PSPDFKit for Web
 * offline. Due to a browser bug, loading CSS files would bypass service workers and we therefore
 * load all CSS files via XHR and embed the content. Instead of loading files like SVGs by using
 * `url` in your CSS, please add them as base64, otherwise these requests would bypass the service
 * worker as well.
 * @example
 * PSPDFKit.load({
 *   enableServiceWorkerSupport: true,
 *   // ...
 * });
 * @public
 * @instance
 * @member {?boolean} enableServiceWorkerSupport
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * PSPDFKit for Web uses an object pool to keep disposed instances in memory for fast reuse.
 * Since this process can be memory inefficient, by default we only keep one instance in memory.
 *
 * With this configuration option you can tune in the number of instances to keep in memory,
 * or disable object pooling by setting this parameter to 0.
 *
 * More about this feature: https://pspdfkit.com/blog/2018/optimize-webassembly-startup-performance/#object-pooling-caching-instances-d548cb
 * @example
 * PSPDFKit.load({
 *   standaloneInstancesPoolSize: 2,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @default 1
 * @member {?number} standaloneInstancesPoolSize
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * By default, PSPDFKit for Web will initialize using [PDF Open Parameters](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDFOpenParameters.pdf)
 * that are supported by our viewer. This option can be used if you want to opt-out from this
 * behavior.
 *
 * Setting a custom {@link PSPDFKit.ViewState} will overwrite these defaults. You can use
 * {@link PSPDFKit#viewStateFromOpenParameters} to manually extract those values.
 *
 * Currently, we only support the `page` parameter.
 * @example
 * PSPDFKit.load({
 *   disableOpenParameters: true,
 * });
 * @public
 * @instance
 * @member {?boolean} disableOpenParameters
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * When copying of text is disabled, it's still possible to select text but copying either using the
 * shortcut or a context menu will have no effect.
 *
 * This is implemented internally by listening to the `copy` event and prevent the default
 * implementation.
 *
 * Please note that preventing text copying only provides limited security since the text will still
 * be transmitted to the client.
 * @example
 * PSPDFKit.load({
 *   preventTextCopy: true,
 *   // ...
 * });
 * @public
 * @instance
 * @member {?boolean} preventTextCopy
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This callback is called whenever an annotation gets selected and can be used to
 * define and return an array of {@link PSPDFKit.ToolItem} that will be rendered in a tooltip
 * for the given annotation.
 *
 * If the callback returns an empty array then PSPDFKit won't show any tooltip for the selected annotation.
 * @public
 * @member {?PSPDFKit.AnnotationTooltipCallback} annotationTooltipCallback The callback called when an annotation is selected.
 * @memberof PSPDFKit.Configuration
 * @example
 * PSPDFKit.load({
 *   annotationTooltipCallback: function(annotation) {
 *     if (annotation instanceof PSPDFKit.Annotations.TextAnnotation) {
 *       var toolItem = {
 *         type: 'custom',
 *         title: 'tooltip item for text annotations',
 *         id: 'item-text-tooltip-annotation',
 *         className: 'TooltipItem-Text',
 *         onPress: function () {
 *           console.log(annotation)
 *         }
 *       }
 *       return [toolItem]
 *     } else {
 *       return []
 *     }
 *   }
 *   // ...
 * });
 */
/**
 * *optional*
 *
 * This callback is called whenever a page is rendered or printed (only for
 * {@link PSPDFKit.PrintMode}.DOM). You can use it to render watermarks on the page.
 * @example
 * PSPDFKit.load({
 *   renderPageCallback: function(ctx, pageIndex, pageSize) {
 *     ctx.beginPath();
 *     ctx.moveTo(0, 0);
 *     ctx.lineTo(pageSize.width, pageSize.height);
 *     ctx.stroke();
 *
 *     ctx.font = "30px Comic Sans MS";
 *     ctx.fillStyle = "red";
 *     ctx.textAlign = "center";
 *     ctx.fillText(
 *       `This is page ${pageIndex + 1}`,
 *       pageSize.width / 2,
 *       pageSize.height / 2
 *     );
 *   }
 *   // ...
 * });
 * @instance
 * @public
 * @member {?PSPDFKit.RenderPageCallback} renderPageCallback The render page callback.
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * Overrides the allocable maximum memory when using PSPDFKit for Web Standalone. Only set this if
 * you know that your users have web browsers with enough memory available.
 *
 * This can improve rendering of documents with large images.
 * @example
 * PSPDFKit.load({
 *   overrideMemoryLimit: 4096, // 4 GB
 *   // ...
 * });
 * @instance
 * @standalone
 * @public
 * @member {?number} overrideMemoryLimit The new total memory limit in megabytes.
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This property defines all annotation types that a user is able to modify. If it's not set, the
 * user is allowed to select, create, edit or delete every annotation type. By allowing only certain
 * annotation types for modification, you can be sure that there is no annotation type that gets
 * introduced in the future that your user is then able to modify.
 * @example <caption>Allow only the modification of ink annotations</caption>
 * PSPDFKit.load({
 *   editableAnnotationTypes: [PSPDFKit.Annotations.InkAnnotation],
 *   // ...
 * });
 * @public
 * @instance
 * @member {Array<AnnotationsUnion>} editableAnnotationTypes
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * Defines specific configuration options related to the electronic signatures feature.
 *
 * The `creationModes` key accepts an array of {@link PSPDFKit.ElectronicSignatureCreationMode} values that
 * define which signature creation modes and in which order will be offered as part of the Electronic Signatures
 * UI. It defaults to {@link PSPDFKit.defaultElectronicSignatureCreationModes}.
 *
 * The `fonts` key accepts an array of {@link PSPDFKit.Font} instances that specify the name of fonts to be used as part
 * of the 'Type' signing tab. It defaults to {@link PSPDFKit.defaultSigningFonts}.
 *
 * You can specify a subset of our built-in signing fonts or specify entirely custom ones.
 *
 * For using custom fonts, you need to load a custom style sheet (via {@link PSPDFKit.Configuration#styleSheets})
 * in which you can either specify `@font-face` rules for the custom font or `@import` other style sheets containing the fonts loading rules.
 *
 * As an example of the latter, if we would wish to use the Cookie font from Google Fonts you could use the
 * following style sheet:
 *
 * ```css
 * &#64;import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');
 * ```
 *
 * And then pass an `new PSPDFKit.Font({ name: 'Cookie' })` as part of the `fonts` array of
 * `PSPDFKit.Configuration#electronicSignatures`.
 * @public
 * @member {?PSPDFKit.ElectronicSignaturesConfiguration} electronicSignatures Options that allow you to customize the Electronic Signatures UI
 * @memberof PSPDFKit.Configuration
 * @example
 * PSPDFKit.load({
 *   electronicSignatures: {
 *     creationModes: [PSPDFKit.ElectronicSignatureCreationMode.IMAGE],
 *     fonts: [new PSPDFKit.Font("Cookie")]
 *   }
 * });
 */
/**
 * *optional*
 *
 * By implementing this callback you have a fine grained control over which annotations are read-only.
 * This callback will receive the Annotation a user wants to modify and by returning `true` or
 * `false` you can define if the annotation should be read-only (`false`) or modifiable (`true`).
 *
 * This API will not disable ToolbarButtons for you, but will not allow the user to create
 * a new Annotation with the UI.
 * @example <caption>Only allow the modification of annotations from the same author</caption>
 * PSPDFKit.load({
 *   isEditableAnnotation: function(annotation) {
 *     return annotation.creatorName === myCurrentUser.name;
 *   },
 * });
 * @example <caption>Do not allow changing the value of a specific form field</caption>
 * PSPDFKit.load({
 *   isEditableAnnotation: function(annotation) {
 *     // Check if the annotation is associated with a specific form field
 *     if (
 *       annotation instanceof PSPDFKit.Annotations.WidgetAnnotation &&
 *       annotation.formFieldName === "MyFormField"
 *     ) {
 *       // If it is, disallow editing it
 *       return false;
 *     }
 *     // Otherwise, allow editing
 *     return true;
 *   },
 * });
 * @public
 * @instance
 * @member {?PSPDFKit.IsEditableAnnotationCallback} isEditableAnnotation
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * You can customise the items inside the annotation toolbars by using this callback. The callback will receive the
 * annotation which is being created or selected and based on it, you can have different annotation
 * toolbars for different annotations.
 *
 * You can do the following modifications using this API:
 *
 * - Add new annotation toolbar items
 * - Remove existing annotation toolbar items
 * - Change the order of the existing annotation toolbar items
 * - Modify selected properties of the annotation toolbar items
 *
 * You can also use the `hasDesktopLayout` to determine if the current UI is being rendered on
 * mobile or desktop layout mode, which depends on the current viewport width. Based on that,
 * you can implement different designs for Desktop and Mobile.
 *
 * This callback gets called every time the annotation toolbar is mounted.
 * @example <caption>Add a new annotation toolbar item</caption>
 * PSPDFKit.load({
 *   annotationToolbarItems: (annotation, { defaultAnnotationToolbarItems, hasDesktopLayout }) => {
 *     const node = document.createElement('node')
 *     node.innerText = "Custom Item"
 *
 *     const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>`
 *
 *     return [{
 *       id: "custom",
 *       type: "custom",
 *       node: node,
 *       icon: icon,
 *       className: 'Custom-Node',
 *       onPress: () => alert("Custom item pressed!")
 *     }, ...defaultAnnotationToolbarItems];
 *   }
 * });
 * @public
 * @instance
 * @member {?PSPDFKit.AnnotationToolbarItemsCallback} annotationToolbarItems
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * You can customize the color dropdown of individual annotation properties using this callback.
 * This callback receives the property name associated with the color dropdown and the array of default colors used by PSPDFKit.
 *
 * With this API you can:
 * - render a customised color pallet in each and all color dropdowns
 * - control if the custom color picker UI should be rendered in the color dropdowns
 * @example <caption>Customize different color dropdowns.</caption>
 * PSPDFKit.load({
 *  annotationToolbarColorPresets: function ({ propertyName }) {
 *    if (propertyName === "font-color") {
 *      return {
 *        presets: [
 *          {
 *            color: new PSPDFKit.Color({ r: 0, g: 0, b: 0 }),
 *            localization: {
 *              id: "brightRed",
 *              defaultMessage: "Bright Red",
 *            },
 *          },
 *          {
 *            color: new PSPDFKit.Color({ r: 100, g: 100, b: 180 }),
 *            localization: {
 *              id: "deepBlue",
 *              defaultMessage: "deepBlue",
 *            },
 *          },
 *        ],
 *      };
 *    }
 *
 *    if (propertyName === "stroke-color") {
 *      return {
 *        presets: [
 *          {
 *            color: new PSPDFKit.Color({ r: 0, g: 0, b: 0 }),
 *            localization: {
 *              id: "brightRed",
 *              defaultMessage: "Bright Red",
 *            },
 *          },
 *          {
 *            color: new PSPDFKit.Color({ r: 100, g: 100, b: 180 }),
 *            localization: {
 *              id: "deepBlue",
 *              defaultMessage: "deepBlue",
 *            },
 *          },
 *        ],
 *        showColorPicker: false,
 *      };
 *    }
 *  },
 *  //...
 *});
 * @public
 * @memberof PSPDFKit.Configuration
 * @member  {?PSPDFKit.AnnotationToolbarColorPresetsCallback} annotationToolbarColorPresets
 */
/**
 * *optional*
 *
 * By implementing this callback you have a fine grained control over which comments are read-only.
 * This callback will receive the Comment a user wants to modify and by returning `true` or
 * `false` you can define if the comment should be read-only (`false`) or modifiable (`true`).
 *
 * To learn more check
 * {@link https://pspdfkit.com/guides/web/current/comments/introduction-to-instant-comments/#comment-permissions|this guide article}.
 * @example <caption>Only allow the modification of comment from the same author.</caption>
 * PSPDFKit.load({
 *   isEditableComment: function(comment) {
 *     return comment.creatorName === myCurrentUser.name;
 *   },
 * });
 * @public
 * @instance
 * @member {?PSPDFKit.IsEditableCommentCallback} isEditableComment
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This object can include functions to be called when specific entities, like annotations,
 * are being rendered in the viewport, and return additional or replacement DOM content for
 * the entity instance.
 *
 * Currently only annotation's rendering can be customized using the `Annotation` key.
 *
 * If the callback returns null, the instance will be rendered normally.
 * @public
 * @member {?PSPDFKit.CustomRenderers} customRenderers Keyed list of callbacks called when entities are rendered.
 * @memberof PSPDFKit.Configuration
 * @example
 * PSPDFKit.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => ({
 *       node: document.createElement('div').appendChild(document.createTextNode('Custom rendered!')),
 *       append: true,
 *     })
 *   }
 *   // ...
 * });
 */
/**
 * *optional*
 *
 * This property allows you to set theme to use for the UI. See {@link PSPDFKit.Theme}
 *
 * Note: Themes are not supported in IE and setting this option won't have any effect: IE users
 * will get the default light theme. You can customize the appearance of the UI using our public
 * CSS classes. Please refer to
 * {@link https://pspdfkit.com/guides/web/current/customizing-the-interface/css-customization/|this guide article}
 * for information on how to customize the appearance.
 * @example
 * PSPDFKit.load({ theme: PSPDFKit.Theme.DARK })
 * @public
 * @instance
 * @member {?PSPDFKit.Theme} theme
 * @default PSPDFKit.Theme.LIGHT
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This property allows you to configure where the toolbar is placed. If nothing
 * is configured, it will default to the top.
 * @example
 * PSPDFKit.load({ toolbarPlacement: PSPDFKit.ToolbarPlacement.TOP })
 * @public
 * @instance
 * @member {?PSPDFKit.ToolbarPlacement} toolbarPlacement
 * @default PSPDFKit.ToolbarPlacement.TOP
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This property allows you to configure the minimum zoom level. The smallest
 * zoom level at a given time will be calculated based on the page proportions
 * and this option. This is not necessarily a hard limit. For example, in order
 * to zoom out to show the entire page, the actual minimum zoom may be lower.
 *
 * When omitted, the default is 0.5.
 * @example
 * PSPDFKit.load({ minDefaultZoomLevel: 0.1 })
 * @public
 * @instance
 * @member {?number} minDefaultZoomLevel
 * @default 0.5
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * This property allows you to configure the maximum zoom level. The largest
 * zoom level at a given time will be calculated based on the page proportions
 * and this option. This is not necessarily a hard limit. For example, in order
 * to satisfy the 'fit to width' and 'fit to page' zoom modes, the actual
 * maximum zoom may be higher.
 *
 * When omitted, the default is 10.
 * @example
 * PSPDFKit.load({ maxDefaultZoomLevel: 20 })
 * @public
 * @instance
 * @member {?number} maxDefaultZoomLevel
 * @default 10
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***required, Standalone only***
 *
 * By implementing this callback you have a fine grained control over which
 * certificates are going to be used for digital signatures validation.
 *
 * The callback must return an `Array` of `ArrayBuffer` (DER) or `string` (PEM)
 * containing X.509 certificates.
 *
 * See
 * {@link https://pspdfkit.com/guides/web/current/digital-signatures/create-custom-certificate-sets/#standalone-deployment|this guide article}
 * to learn more.
 * @example <caption>Fetch and use custom set of certificates (Standalone)</caption>
 * PSPDFKit.load({
 *   trustedCAsCallback: function() {
 *     return new Promise((resolve, reject) => {
 *        fetch("/your-certificate.cer")
 *         .then(res => res.arrayBuffer())
 *         .then(cert => resolve([cert]))
 *         .catch(reject)
 *     });
 *   },
 *   // ...
 * })
 * @public
 * @standalone
 * @instance
 * @member {?PSPDFKit.TrustedCAsCallback} trustedCAsCallback
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***optional, Standalone only***
 *
 * This property allows you to provide custom fonts you want to use when loading a Standalone
 * instance.
 *
 * From the `callback` defined on each {@link PSPDFKit.Font} instance you can return a promise
 * that resolves to a `Blob` of the font you want to use. You are free to fetch it in whatever
 * way you want, and optimize its loading by retrieving it from a cache using the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Cache|Cache API}, get it
 * from {@link https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API|IndexedDB}, etc.
 *
 *
 * See
 * {@link https://pspdfkit.com/guides/web/current/features/custom-fonts/|this guide article}
 * to learn more.
 * @example <caption>Fetch and use a custom set of fonts (Standalone)</caption>
 * const fetcher = name =>
 *   fetch(`https://example.com/${name}`).then(r => {
 *     if (r.status === 200) {
 *       return r.blob();
 *     } else {
 *       throw new Error();
 *     }
 *   });
 *
 * const customFonts = ["arial.ttf", "helvetica.ttf", "tahoma.ttf"]
 *    .map(font => new PSPDFKit.Font({ name: font, callback: fetcher }));
 *
 * PSPDFKit.load({
 *   customFonts,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @member {?Array<PSPDFKit.Font>} customFonts
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***optional, Standalone only***
 *
 * This property allows you to provide a URL to JSON file with fonts available for downloading, associated
 * with specific ranges of characters and font variations.
 *
 * The downloadable font files need to be in the same scope as the JSON file.
 *
 * The JSON file needs to be in the following format:
 *
 * ```js
 * type FontName = {
 * // The full name of the font.
 * fullName: string;
 * // The next four properties are from the `name` table in the font.
 * // See https://learn.microsoft.com/en-us/typography/opentype/spec/name#name-ids
 * // Name ID 1: Font Family name
 * family?: string;
 * // Name ID 2: Font Subfamily name
 * subfamily?: string;
 * // Name ID 16: Typographic Family name
 * typographicFamily?: string;
 * // Name ID 17: Typographic Subfamily name
 * typographicSubfamily?: staring;
 * }
 *
 * // Represents a font that can be downloaded.
 * // filePath + faceIndex should be unique.
 * type Font = {
 * name: FontName;
 * // Path to the font file.
 * filePath: string;
 * // If the font file is a collection, this specifies the face index.
 * faceIndex?: int;
 * // A list of all code points supported by the font.
 * // This can either be a range ([number, number]) or a single codepoint.
 * codePoints: [[number, number] | number];
 * // The unicode ranges from the OS/2 table: https://learn.microsoft.com/en-us/typography/opentype/spec/os2#ur
 * unicodeRanges?: [4 numbers];
 * // A sha1 of the font file. For collections, this is a SHA of the whole file, not a single font.
 * sha1: string;
 * // Specifies true if the font is allowed to be embedded, false otherwise.
 * // Should only be used to make a decision to download the font, proper licensing handling should be done with the downloaded font.
 * allowedToEmbed: boolean;
 * // The boldness of the font. See https://learn.microsoft.com/en-us/typography/opentype/spec/os2#wtc
 * weight?: number;
 * }
 *
 * type DynamicFonts = {
 * availableFonts: [Font];
 * v: 1;
 * }
 * ```
 * @example <caption>Provide a list of downloadable font files (Standalone)</caption>
 * PSPDFKit.load({
 *   dynamicFonts: "https://example.com/assets/fonts.json",
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @member {string} dynamicFonts
 * @memberof PSPDFKit.Configuration
 */
/**
 * This property allows you to restrict the movement of annotations to the page boundary. This is set to `true` by default.
 * If you want to disable this, you can set it to `false`.
 * @public
 * @instance
 * @member {boolean} restrictAnnotationToPageBounds
 * @memberof PSPDFKit.Configuration
 * @default true
 */
/**
 * *optional*
 *
 * This property allows you to set an initial list of document editor footer items for the PSPDFKit instance.
 *
 * When omitted, it will default to {@link PSPDFKit.defaultDocumentEditorFooterItems}.
 * @example
 * const footerItems = PSPDFKit.defaultDocumentEditorFooterItems;
 * footerItems.reverse();
 * PSPDFKit.load({ documentEditorFooterItems: footerItems, ... });
 * @public
 * @instance
 * @member {?Array.<PSPDFKit.DocumentEditorFooterItem>} documentEditorFooterItems
 * @memberof PSPDFKit.Configuration
 * @throws {PSPDFKit.Error} will throw an error when the supplied items array is not valid. This will also throw an error if your license does not include the Document Editor feature.
 * @default Default {@link PSPDFKit.defaultDocumentEditorFooterItems}
 */
/**
 * *optional*
 *
 * This property allows you to set an initial list of document editor toolbar items for the PSPDFKit instance.
 *
 * When omitted, it will default to {@link PSPDFKit.defaultDocumentEditorToolbarItems}.
 * @example
 * const toolbarItems = PSPDFKit.defaultDocumentEditorToolbarItems;
 * toolbarItems.reverse();
 * PSPDFKit.load({ documentEditorToolbarItems: toolbarItems, ... });
 * @public
 * @instance
 * @member {?Array.<PSPDFKit.DocumentEditorToolbarItem>} documentEditorToolbarItems
 * @memberof PSPDFKit.Configuration
 * @throws {PSPDFKit.Error} will throw an error when the supplied items array is not valid. This will also throw an error if your license does not include the Document Editor feature.
 * @default Default {@link PSPDFKit.defaultDocumentEditorToolbarItems}
 */
/**
 * *optional*
 *
 * Enable actions history for annotations. Disabled by default, when enabled it allows to undo and redo annotation actions consecutively
 * by calling {@link PSPDFKit.Instance.history.undo} or {@link PSPDFKit.Instance.history.redo}, or using the undo and redo UI buttons, which can be
 * optionally enabled:
 *
 * Actions history tracking can be enabled and disabled at any moment by calling {@link PSPDFKit.Instance.history.enable} or {@link PSPDFKit.Instance.history.disable}.
 * @example
 * PSPDFKit.load({
 *   enableHistory: true,
 *   toolbarItems: PSPDFKit.defaultToolbarItems.reduce((acc, item) => {
 *     if (item.type === "spacer") {
 *       return acc.concat([item, { type: "undo" }, { type: "redo" }]);
 *     }
 *     return acc.concat([item]);
 *   }, [])
 * });
 * @public
 * @instance
 * @member {boolean} enableHistory
 * @memberof PSPDFKit.Configuration
 * @default false
 */
/**
 * *optional*
 *
 * Enable actions like cut, copy, paste and duplicate for annotations using keyboard shortcuts `Cmd/Ctrl+X`, `Cmd/Ctrl+C`, `Cmd/Ctrl+V` and `Cmd/Ctrl+D` respectively.
 * @example
 * PSPDFKit.load({
 *   enableClipboardActions: true,
 * });
 * @public
 * @instance
 * @member {boolean} enableClipboardActions
 * @memberof PSPDFKit.Configuration
 * @default false
 */
/**
 * *optional*
 *
 * By default, all the URLs on which the user clicks explicitly open as expected but the URLs which open due to a result of JavaScript action are not opened due to security reasons.
 * You can override this behaviour using this callback. If this callback returns `true`, the URL will open.
 * @example
 * PSPDFKit.load({
 *   onOpenURI: (url, isUserInitiated) => {
 *     if (url.startsWith('https://abc.com') && isUserInitiated) {
 *       return true
 *     }
 *
 *     return false;
 *   }
 *   // ...
 * });
 * @public
 * @instance
 * @member {PSPDFKit.OnOpenUriCallback} onOpenURI
 * @memberof PSPDFKit.Configuration
 * @default undefined
 */
/**
 *
 **optional*
 *
 *You can programmatically modify the properties of the widget annotation and the associated form field just
 *before it is created via the Form Creator UI.
 * @public
 * @instance
 * @member {PSPDFKit.OnWidgetAnnotationCreationStartCallback} onCreateWidgetAnnotationStart
 * @memberof PSPDFKit.Configuration
 * @example <caption>Set the opacity of all widget annotations.</caption>
 * PSPDFKit.load({
 *   onWidgetAnnotationCreationStart: (annotation, formField) => {
 *     return { annotation: annotation.set('opacity', 0.7) };
 *   }
 *   // ...
 * });
 * @default undefined
 */
/**
 * *optional*
 * Object with callback methods to be called when different elements of the UI are being rendered. Can return DOM content to be appended to them, as well as callback functions to individually process different parts of the element (items) as they're rendered.
 *
 * UI elements currently supported: sidebars.
 * @example
 * //Fully customized sidebar
 *
 * PSPDFKit.load({
 *   customUI: {
 *     [PSPDFKit.UIElement.Sidebar]: {
 *       [PSPDFKit.SidebarMode.CUSTOM]({ containerNode }) {
 *         // React portals can be used as well.
 *         // Or Vue portals, or any other framework API that allows appending components
 *         // to arbitrary DOM nodes.
 *         // Using vanilla JS, you can just append a node to parentNode.
 *         const div = document.createElement("div");
 *         div.append("My custom sidebar");
 *         containerNode.appendChild(div);
 *
 *         return {
 *           // By returning the same node that was provided, we opt-out of having the node
 *           // appended. If we return a different node, it will be appended to the provided node.
 *           node: containerNode,
 *         };
 *       }
 *     }
 *   }
 * });
 *
 * //Partially customized sidebar
 *
 * PSPDFKit.load({
 *   customUI: {
 *     [PSPDFKit.UIElement.Sidebar]: {
 *       [PSPDFKit.SidebarMode.ANNOTATIONS]({ containerNode }) {
 *         containerNode.style.padding = "0.5rem";
 *
 *         if (!containerNode.querySelector(".MyCustomSidebarComponentHeader")) {
 *           const header = document.createElement("div");
 *           header.classList.add("MyCustomSidebarComponentHeader");
 *           containerNode.prepend(header);
 *         }
 *
 *         return {
 *           node: containerNode,
 *           onRenderItem({ itemContainerNode, item: annotation }) {
 *             const footerAuthor = itemContainerNode.querySelector(".PSPDFKit-Sidebar-Annotations-Footer span");
 *             // Change the format of the footer text by prefixing it with "Creator: " and removing the date
 *             footerAuthor.textContent = `Creator: ${annotation.creatorName}`;
 *
 *             // Add aria label to the annotation icon
 *             const annotationIcon = itemContainerNode.querySelector(".PSPDFKit-Icon");
 *             annotationIcon.setAttribute("aria-label", `Icon for an annotation created by ${annotation.creatorName}.`);
 *           }
 *         };
 *       }
 *     }
 *   }
 * });
 * @public
 * @member {PSPDFKit.CustomUIConfiguration} customUIConfiguration Custom UI Configuration.
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 * Allows to modify the default behavior when annotations are resized using the selection corner
 * handles by returning an object. This provides more control over whether annotations should keep their aspect ratio when resized, for example.
 * @example <caption>Unlock aspect ratio for the top left resize anchor</caption>
 * PSPDFKit.load({
 *   onAnnotationResizeStart: event => {
 *     return {
 *       maintainAspectRatio: event.resizeAnchor === 'TOP_LEFT',
 *     }
 *   }
 * });
 * @public
 * @instance
 * @member {PSPDFKit.AnnotationResizeStartCallback} onAnnotationResizeStart This callback is called whenever an annotation is about to be resized.
 * @param PSPDFKit.AnnotationResizeEvent
 * @returns PSPDFKit.AnnotationResizeStartCallbackConfiguration
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * Allows you to customize how to format dates displayed in the UI.
 *
 * When a date is about to be rendered in specific UI elements, this function is called so the date can be formatted as desired instead of
 * using the default date formatter.
 *
 * UI elements with customizable dates currently include the annotations sidebar, and comment threads.
 *
 * This function is called for each date to be formatted, and receives the corresponding `Date` object, the UI element to which it belongs
 * (either the annotations sidebar or a comment thread) and the {@link AnnotationsUnion} or {@link PSPDFKit.Comment} instance
 * to which it is associated.
 * @example
 * PSPDFKit.load({
 *   dateTimeString: ({ dateTime, element }) => {
 *     if(element === PSPDFKit.UIDateTimeElement.ANNOTATIONS_SIDEBAR) {
 *       return new Intl.DateTimeFormat("en-US", {
 *         dateStyle: "short",
 *         timeStyle: "short",
 *       }).format(dateTime);
 *     } else {
 *       return new Intl.DateTimeFormat("en-US", {
 *         dateStyle: "full",
 *         timeStyle: "long",
 *       }).format(dateTime);
 *     }
 *   }
 *   // ...
 * });
 * @public
 * @instance
 * @member {PSPDFKit.DateTimeStringCallback} dateTimeString
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * When integrating PSPDFKit for Electron with context isolation enabled, this
 * property needs to be set for the SDK to work. It will be ignored in any other case.
 *
 * The value of this property needs to match the provided license key's bundle ID.
 * @example
 * PSPDFKit.load({ electronAppName: "my-electron-app" })
 * @public
 * @instance
 * @member {?string} electronAppName
 * @memberof PSPDFKit.Configuration
 * @deprecated Use {@link PSPDFKit.Configuration#appName|`Configuration.appName`} and {@link PSPDFKit.Configuration#productId|`Configuration.productId`} instead.
 */
/**
 * *optional*
 *
 * When integrating PSPDFKit for Electron with context isolation enabled, this
 * property needs to be set for the SDK to work. It will be ignored in any other case.
 *
 * The value of this property needs to match the provided license key's bundle ID.
 * @example
 * PSPDFKit.load({ appName: "my-electron-app" })
 * @public
 * @instance
 * @member {?string} appName
 * @memberof PSPDFKit.Configuration
 */
/**
 * *optional*
 *
 * You can customize the items inside the inline text selection toolbar that is rendered every time some text is selected on the document.
 * The callback will receive the
 * default items of the inline toolbar and the text that is currently selected {@linkPSPDFKit.TextSelection}
 *
 * You can do the following modifications using this API:
 *
 * - Add new toolbar items
 * - Remove existing  toolbar items
 * - Change the order of the existing annotation toolbar items
 * - Customise each item eg change the `icon` of the a default toolbar item.
 *
 * You can also use the `hasDesktopLayout` to determine if the current UI is being rendered on
 * mobile or desktop layout mode, which depends on the current viewport width. Based on that,
 * you can implement different designs for Desktop and Mobile.
 *
 * This callback gets called every time the inline text selection toolbar is mounted.
 * @example <caption>Add a custom button and a custom node to the toolbar in desktop layout.</caption>
 * PSPDFKit.load({
 * inlineTextSelectionToolbarItems: ({ defaultItems, hasDesktopLayout }, selection) => {
 *  console.log(selection)
 *  if (hasDesktopLayout) {
 *    const node = document.createElement("div");
 *    node.innerText = "Custom Item";
 *      return [
 *        ...defaultItems,
 *        {
 *          type: "custom",
 *          id: "custom-1",
 *          node: node,
 *          className: "Custom-Node",
 *          onPress: () => alert("Custom node pressed!"),
 *        },
 *        {
 *          type: "custom",
 *          id: "custom-2",
 *          title: "custom-button-2",
 *          onPress: () => alert("Custom item pressed!"),
 *        },
 *      ];
 *     }
 *  return defaultItems
 *   },
 * })
 * @public
 * @instance
 * @member {?PSPDFKit.InlineTextSelectionToolbarItemsCallback} inlineTextSelectionToolbarItems
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***optional, Standalone only***
 *
 * Allows specifying the environment in which the SDK is running.
 * @example
 * PSPDFKit.load({ productId: PSPDFKit.ProductId.SharePoint });
 * @public
 * @instance
 * @member {PSPDFKit.ProductId} productId
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***optional, Standalone only***
 *
 * Document processing can be a time-consuming task, especially when working with large documents. In order to improve the user experience
 * it is possible to choose between two different processor engines with different optimizations applied: either one with a
 * smaller bundle size (the default), but slower overall performance, or one with a larger bundle size, but faster processing time.
 *
 * Either case it's recommended to enable asset compression on your Server to improve loading time.
 * @example
 * PSPDFKit.load({ processorEngine: PSPDFKit.ProcessorEngine.fasterProcessing });
 * @public
 * @instance
 * @member {PSPDFKit.ProcessorEngine} processorEngine
 * @memberof PSPDFKit.Configuration
 * @default PSPDFKit.ProcessorEngine.fasterProcessing
 */
/**
 * *optional*
 *
 * Allows the user to toggle the snapping behavior while creation of measurement annotations. The snapping points are the points are a combination of endpoints, midpoints and intersections.
 * @example
 * PSPDFKit.load({ measurementSnapping: false });
 * @instance
 * @public
 * @member {?boolean} measurementSnapping Whether to enable/disable snapping behaviour for creation of measurement annotations.
 * @memberof PSPDFKit.Configuration
 * @default false
 */
/**
 * Set the precision value of all the newly created measurement annotations.
 * @example
 * PSPDFKit.load({ measurementPrecision: PSPDFKit.MeasurementPrecision.THREE });
 * @public
 * @instance
 * @member {PSPDFKit.MeasurementPrecision} measurementPrecision The precision value.
 * @memberof PSPDFKit.Configuration
 * @default PSPDFKit.MeasurementPrecision.TWO
 */
/**
 * Set the default value of scale for all newly created measurement annotations.
 * @example
 * PSPDFKit.load(new PSPDFKit.MeasurementScale({
 *   unitFrom: PSPDFKit.MeasurementScaleUnitFrom.CENTIMETERS,
 *   unitTo: PSPDFKit.MeasurementScaleUnitTo.INCHES,
 *   fromValue: 1,
 *   toValue: 2,
 * }));
 * @public
 * @instance
 * @member {PSPDFKit.MeasurementScale} measurementScale The default value of scale.
 * @memberof PSPDFKit.Configuration
 * @default 1 inch = 1 inch
 */
/**
 * This call back defines which text annotations should be treated as rich text annotation.
 * By default, all the text annotations are treated as plain text annotations, which means that
 * when you edit them, you will see the plain text editor. You can change this behavior by
 * returning `true` for the text annotations that you want to be treated as rich text annotations.
 * @example
 * PSPDFKit.load({ enableRichText: annotation => true });
 * @public
 * @instance
 * @member {PSPDFKit.EnableRichTextCallback} enableRichText
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***optional, Server only***
 *
 * A list of users that can be mentioned in comments.
 * @example
 * PSPDFKit.load({ mentionableUsers: [
 *   { id: "1", name: "John Doe", displayName: "John", avatar: "https://example.com/avatar.png", description: "john.doe@gmail.com" },
 *   { id: "2", name: "Jane Doe", displayName: "Jane", avatar: "https://example.com/avatar.png", description: "jane.doe@gmail.com" },
 *   { id: "3", name: "John Smith", displayName: "John", avatar: "https://example.com/avatar.png", description: "john.smith@gmail.com" },
 * ] });
 * @public
 * @instance
 * @member {Array<MentionableUser>} mentionableUsers
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***optional, Server only***
 *
 * The maximum number of users that will be shown in the suggestion dropdown
 * when mentioning a user in a comment.
 * @example
 * PSPDFKit.load({ maxMentionSuggestions: 5 });
 * @public
 * @instance
 * @member {number} maxMentionSuggestions
 * @memberof PSPDFKit.Configuration
 * @default 5
 */
/**
 * *optional*
 *
 * Disable multi selection for annotations. Disabled by default, when enabled it doesn't allow multiple selection of annotations
 * by calling {@link PSPDFKit.Instance.setSelectedAnnotations}, or using the multiple annotations selection UI button.
 * @example
 * PSPDFKit.load({
 *   disableMultiSelection: true,
 * });
 * @public
 * @instance
 * @member {boolean} disableMultiSelection
 * @memberof PSPDFKit.Configuration
 * @default false
 */
/**
 * *optional*
 *
 * Threshold in pixels determines when the active anchor should automatically close
 * and snap to the origin anchor, effectively closing the shape.
 * @example
 * PSPDFKit.load({
 *   autoCloseThreshold: 50,
 * });
 * @public
 * @instance
 * @member {number} autoCloseThreshold
 * @memberof PSPDFKit.Configuration
 * @default 4px
 */
/**
 * *optional*
 *
 * You can programmatically modify the properties of the comment just before it is created.
 * @example
 * PSPDFKit.load({ onCommentCreationStart: comment => comment.set('text', { format: 'xhtml', value: '<p>Default text</p>' }) });
 * @public
 * @instance
 * @member {PSPDFKit.OnCommentCreationStartCallback} onCommentCreationStart
 * @memberof PSPDFKit.Configuration
 */
/**
 *
 *Allows specifying fonts that you would like to substitute in a document and the fonts you would like to use for that substitution.
 *
 *Patterns are matched using the following rules:
 *- `*` matches multiple characters.
 *- `?` matches a single character.
 *
 ***Ordering matters** - As names could match multiple patterns, it's important to note that the order of the patterns matters.
 *
 ***Case-insensitive** - Both the pattern and the target name are case-insensitive.
 * @example <caption>Substitute all Noto fonts found in the document with Awesome font</caption>
 * PSPDFKit.load({
 *   fontSubstitutions: [
 *     {
 *       pattern: "Noto*",
 *       target: "AwesomeFont"
 *     }
 *   ]
 * });
 * @public
 * @instance
 * @member {FontSubstitution[]} fontSubstitutions
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * By default, we load the required Web Workers inline. That means that the Web Workers are loaded as a
 * blob URL, which allows us to load a Worker from other domains. However, this might interfere with strict CSP policies like `worker-src: 'self'`.
 * In that case, you can disable the inline loading of the Web Workers by setting this option to `false`.
 *
 * **Note**: This option is currently not supported in Salesforce environment.
 * @example
 * PSPDFKit.load({
 *   inlineWorkers: false,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @default true
 * @member {?boolean} inlineWorkers
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * Enables or disables loading of linearized PDFs.
 * When enabled, the SDK takes advantage of linearized (also known as "fast web view") PDFs,
 * allowing portions of the document to be displayed while it's still being downloaded.
 * If enabled, the PDF viewer will render the document progressively, starting with the first pages,
 * while the rest of the file is downloaded in the background. The user interface will be in read-only
 * mode during the download.
 *
 * A indicator is displayed in the toolbar showing that the document is being downloaded.
 *
 * **Note**: Linearized loading requires the server to support byte-range requests and the PDF document to be linearized.
 * @example
 * PSPDFKit.load({
 *   allowLinearizedLoading: true,
 *   // ...
 * });
 * @public
 * @standalone
 * @instance
 * @default false
 * @member {?boolean} allowLinearizedLoading
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Server only***
 *
 * This configuration describes a connection with AI Assistant service which provides AI capabilities directly in the viewer.
 * @example
 * PSPDFKit.load({
 *   aiAssistant: {
 *     sessionId: 'session-id',
 *     jwt: 'xxx.xxx.xxx'
 *     backendUrl: 'https://localhost:4000',
 *   },
 *   // ...
 * });
 * @public
 * @server
 * @instance
 * @member {?AIAssistantConfiguration} aiAssistant
 * @memberof PSPDFKit.Configuration
 */
/**
 * ***Standalone only***
 *
 * Allows configuring some behavior around forms in the viewer.
 * @example
 * PSPDFKit.load({
 *   formsConfiguration: { ... },
 * });
 * @public
 * @standalone
 * @instance
 * @default undefined
 * @member {?FormsConfiguration} formsConfiguration
 * @memberof PSPDFKit.Configuration
 */
type SharedConfiguration = {
    container: string | HTMLElement;
    initialViewState?: ViewState;
    baseUrl?: string;
    serverUrl?: string;
    tileSize?: number;
    styleSheets?: Array<string>;
    toolbarItems?: Array<ToolbarItem$1>;
    annotationPresets?: Record<AnnotationPresetID$1, AnnotationPreset$1>;
    stampAnnotationTemplates?: Array<StampAnnotation | ImageAnnotation>;
    autoSaveMode?: IAutoSaveMode;
    disableHighQualityPrinting?: boolean;
    printMode?: IPrintMode;
    printOptions?: {
        mode?: IPrintMode;
        quality?: IPrintQuality;
    };
    disableTextSelection?: boolean;
    disableForms?: boolean;
    headless?: boolean;
    locale?: string;
    populateInkSignatures?: () => Promise<List<InkAnnotation | ImageAnnotation>>;
    populateStoredSignatures?: () => Promise<List<InkAnnotation | ImageAnnotation>>;
    formFieldsNotSavingSignatures?: Array<string>;
    password?: string;
    disableOpenParameters?: boolean;
    maxPasswordRetries?: number;
    enableServiceWorkerSupport?: boolean;
    preventTextCopy?: boolean;
    renderPageCallback?: RenderPageCallback;
    annotationTooltipCallback?: AnnotationTooltipCallback;
    editableAnnotationTypes?: Array<Class<AnnotationsUnion>>;
    isEditableAnnotation?: IsEditableAnnotationCallback;
    onAnnotationResizeStart?: AnnotationResizeStartCallback;
    customRenderers?: CustomRenderers;
    customUI?: CustomUI;
    theme?: ITheme;
    toolbarPlacement?: IToolbarPlacement;
    minDefaultZoomLevel?: number;
    maxDefaultZoomLevel?: number;
    isEditableComment?: IsEditableCommentCallback;
    restrictAnnotationToPageBounds?: boolean;
    electronicSignatures?: ElectronicSignaturesConfiguration;
    documentEditorFooterItems?: DocumentEditorFooterItem[];
    documentEditorToolbarItems?: DocumentEditorToolbarItem[];
    enableHistory?: boolean;
    onOpenURI?: OnOpenUriCallback;
    dateTimeString?: DateTimeStringCallback;
    annotationToolbarColorPresets?: AnnotationToolbarColorPresetsCallback;
    annotationToolbarItems?: AnnotationToolbarItemsCallback;
    enableClipboardActions?: boolean;
    renderPagePreview?: boolean;
    unstable_inkEraserMode?: IInkEraserMode;
    onWidgetAnnotationCreationStart?: OnWidgetAnnotationCreationStartCallback;
    inlineTextSelectionToolbarItems?: InlineTextSelectionToolbarItemsCallback;
    measurementSnapping?: boolean;
    measurementPrecision?: IMeasurementPrecision;
    measurementScale?: MeasurementScale;
    measurementValueConfiguration?: MeasurementValueConfigurationCallback;
    enableRichText?: EnableRichTextCallback;
    disableMultiSelection?: boolean;
    autoCloseThreshold?: number;
    useIframe?: boolean;
    fontSubstitutions?: FontSubstitution[];
    onCommentCreationStart?: OnCommentCreationStartCallback;
    documentEditorConfiguration?: documentEditorUIConfig;
    ui?: any;
    aiAssistant?: AIAssistantConfiguration;
    disableWebAssemblyStreaming?: boolean;
    overrideMemoryLimit?: number;
    baseCoreUrl?: string;
    unifiedCommentsSupport?: boolean;
};
type Instant = {
    public: boolean;
};
type ServerAuthPayloadConfiguration = {
    authPayload: {
        jwt: string;
    };
};
type ServerSessionAuthConfiguration = {
    session: string;
};
type ServerConfiguration = SharedConfiguration & {
    instant: Instant[keyof Instant];
    anonymousComments?: boolean;
    mentionableUsers?: Array<MentionableUser>;
    maxMentionSuggestions?: number;
    documentId?: string;
} & (ServerAuthPayloadConfiguration | ServerSessionAuthConfiguration);
type StandaloneConfiguration = SharedConfiguration & {
    document: string | ArrayBuffer;
    baseProcessorEngineUrl?: string;
    licenseKey?: string;
    instantJSON?: InstantJSON;
    XFDF?: string;
    XFDFKeepCurrentAnnotations?: boolean;
    XFDFIgnorePageRotation?: boolean;
    disableIndexedDBCaching?: boolean;
    enableAutomaticLinkExtraction?: boolean;
    standaloneInstancesPoolSize?: number;
    trustedCAsCallback?: TrustedCAsCallback;
    customFonts?: Array<Font>;
    electronAppName?: string;
    appName?: string;
    isSharePoint?: boolean;
    isSalesforce?: boolean;
    productId?: IProductId;
    processorEngine?: IProcessorEngine;
    dynamicFonts?: string;
    inlineWorkers?: boolean;
    formsConfiguration?: FormsConfiguration;
    allowLinearizedLoading?: boolean;
    isTextComparison?: boolean;
    textComparisonSharedState?: TextComparisonSharedState;
    officeConversionSettings?: OfficeConversionSettings;
};
type Configuration = ServerConfiguration | StandaloneConfiguration;

/**
 * Indicates the type of modification made to a {@link PSPDFKit.Change}.
 *
 * @public
 * @typedef {'CREATED'|'UPDATED'|'DELETED'} PSPDFKit.ModificationType
 */
declare const ModificationType: {
    readonly CREATED: "CREATED";
    readonly UPDATED: "UPDATED";
    readonly DELETED: "DELETED";
};
type IModificationType = (typeof ModificationType)[keyof typeof ModificationType];

type SaveErrorReason = {
    error: any;
    object: any;
    modificationType: IModificationType;
};
/**
 * @classdesc
 * A save error indicates a problem with saving. It is a subclass of {@link PSPDFKit.Error}
 * that behaves like a regular JavaScript error.
 * @example
 * try {
 *   await instance.save();
 * } catch (error) {
 *   (error instanceof PSPDFKit.SaveError); // => true
 *   error.message; // Useful error message
 *   error.reason; // Array of errors for changes that could not be saved.
 * }
 * @public
 * @memberof PSPDFKit
 * @class SaveError
 * @extends PSPDFKit.Error
 * @summary PSPDFKit related error related to saving.
 */
/**
 * Save error reason. Contains detailed error information for each change that could not be saved.
 *
 * @public
 * @instance
 * @memberof PSPDFKit.SaveError
 * @member {Array<PSPDFKit.SaveError~ErrorReason>} reason
 */
/**
 * Reason for the error that occurred when saving a certain modification.
 *
 * @public
 * @instance
 * @memberof PSPDFKit.SaveError
 * @typedef {object} PSPDFKit.SaveError~ErrorReason
 * @property {Error} error Reason of the save failure.
 * @property {PSPDFKit.Change} object Object that was being saved.
 * @property {PSPDFKit.ModificationType} modificationType Type of modification that was being saved.
 */
declare function PSPDFKitSaveError(messageOrError: string | Error, reason: Array<SaveErrorReason>): Error;
declare namespace PSPDFKitSaveError {
    var prototype: any;
}

declare const FormFieldValue_base: Record$1.Factory<{
    name?: string | undefined;
    value?: string | number | List<string> | null | undefined;
    optionIndexes?: List<number> | undefined;
    isFitting?: boolean | undefined;
}>;
/**
 * @classdesc
 * Record representing a form field value.
 *
 * To retrieve a list of all form field values, use {@link PSPDFKit.Instance#getFormFieldValues}.
 *
 * Please see our {@link https://pspdfkit.com/guides/web/current/forms/introduction-to-forms/|forms guide
 * article} to learn more about forms and for examples on how to set form field values.
 * @example <caption>Setting a form field value.</caption>
 * const formFieldValue = new PSPDFKit.FormFieldValue({
 *   name: 'Form field name',
 *   value: 'Form field value'
 * });
 * instance.update(formFieldValue);
 * @public
 * @memberof PSPDFKit
 * @summary Type representing a single form field value.
 * @class FormFieldValue
 * @extends Immutable.Record
 * @seealso PSPDFKit.Instance#update
 * @seealso PSPDFKit.Instance#setFormFieldValues
 * @seealso PSPDFKit.Instance#getFormFieldValues
 */
declare class FormFieldValue extends FormFieldValue_base {
    /**
     * Unique name of the form field (often referred to as fully qualified name). This name is used
     * to link form field value to a {@link PSPDFKit.FormFields.FormField}.
     *
     * @public
     * @instance
     * @member {string} name
     * @memberof PSPDFKit.FormFieldValue
     */
    name: string;
    /**
     * The value of the form field.
     *
     * @public
     * @instance
     * @member {string} value
     * @memberof PSPDFKit.FormFieldValue
     */
    value: string | List<string> | null;
    /**
     * Radio buttons and checkboxes can have multiple widgets with the same form value associated, but can be
     * selected independently. `optionIndexes` contains the value indexes that should be actually set.
     *
     * If set, the `value` field doesn't get used, and the widget found at the corresponding indexes in the form field's
     * `annotationIds` property are checked.
     *
     * If set on fields other than radio buttons or checkboxes, setting the form value will fail.
     *
     * @public
     * @optional
     * @instance
     * @member {?PSPDFKit.Immutable.List.<number>} optionIndexes
     * @memberof PSPDFKit.FormFieldValue
     */
    optionIndexes?: List<number>;
    isFitting?: boolean;
    static defaultValues: IObject;
    constructor(args?: IObject);
}

/**
 * Represents one of the available conformance types for PDF/A documents.
 *
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.Conformance} PDFA_1A
 * @property {PSPDFKit.Conformance} PDFA_1B
 * @property {PSPDFKit.Conformance} PDFA_2A
 * @property {PSPDFKit.Conformance} PDFA_2U
 * @property {PSPDFKit.Conformance} PDFA_2B
 * @property {PSPDFKit.Conformance} PDFA_3A
 * @property {PSPDFKit.Conformance} PDFA_3U
 * @property {PSPDFKit.Conformance} PDFA_3B
 * @property {PSPDFKit.Conformance} PDFA_4
 * @property {PSPDFKit.Conformance} PDFA_4E
 * @property {PSPDFKit.Conformance} PDFA_4F
 */
declare const Conformance: {
    readonly PDFA_1A: "pdfa-1a";
    readonly PDFA_1B: "pdfa-1b";
    readonly PDFA_2A: "pdfa-2a";
    readonly PDFA_2U: "pdfa-2u";
    readonly PDFA_2B: "pdfa-2b";
    readonly PDFA_3A: "pdfa-3a";
    readonly PDFA_3U: "pdfa-3u";
    readonly PDFA_3B: "pdfa-3b";
    readonly PDFA_4: "pdfa-4";
    readonly PDFA_4E: "pdfa-4e";
    readonly PDFA_4F: "pdfa-4f";
};
type IConformance = (typeof Conformance)[keyof typeof Conformance];

/**
 * Describes the data format used to populate a document template.
 * @public
 * @memberof PSPDFKit
 * @interface TemplateDataToPopulateDocument
 * @property {PSPDFKit.TemplateDataToPopulateDocument.Config} config The configuration used to populate the document template.
 * @property {Array<Record<string, unknown>>} model The data used to populate the document template.
 */
type TemplateDataToPopulateDocument = {
    config: DelimiterConfig;
    model: Array<Record<string, unknown>>;
};
/**
 * Describes the configuration used to populate a document template.
 * @public
 * @memberof PSPDFKit.TemplateDataToPopulateDocument
 * @interface Config
 * @property {PSPDFKit.TemplateDataToPopulateDocument.DelimiterSettings} delimiter The delimiter settings used in data parsing.
 */
type DelimiterConfig = {
    delimiter: DelimiterSettings;
};
/**
 * Describes the delimiter settings config used in data parsing.
 *
 * @public
 * @memberof PSPDFKit.TemplateDataToPopulateDocument
 * @interface DelimiterSettings
 * @property {string} start The start delimiter for data parsing.
 * @property {string} end The end delimiter for data parsing.
 */
type DelimiterSettings = {
    start: string;
    end: string;
};

/**
 * Document conversion output formats.
 * @public
 * @readonly
 * @memberof PSPDFKit
 * @property {PSPDFKit.OfficeDocumentFormat} docx DOCX document format.
 * @property {PSPDFKit.OfficeDocumentFormat} xlsx XLSX document format.
 * @property {PSPDFKit.OfficeDocumentFormat} pptx PPTX document format.
 */
declare const OfficeDocumentFormat: {
    docx: string;
    xlsx: string;
    pptx: string;
};
type IDocumentOfficeFormat = (typeof OfficeDocumentFormat)[keyof typeof OfficeDocumentFormat];

type FormFieldFlags = Array<'readOnly' | 'required' | 'noExport'>;
type FormOptionJSON = {
    label: string;
    value: string;
};
type ExportPDFFlags = {
    flatten?: boolean;
    incremental?: boolean;
    includeComments?: boolean;
    saveForPrinting?: boolean;
    excludeAnnotations?: boolean;
    permissions?: {
        userPassword: string;
        ownerPassword: string;
        documentPermissions: Array<IDocumentPermissions>;
    };
    outputFormat?: boolean | PDFAFlags;
    optimize?: boolean | OptimizationFlags;
    flattenElectronicSignatures?: boolean;
    officeConversionSettings?: OfficeConversionSettings;
};
/**
 * *** Standalone Only ***
 *
 * Options for exporting the document to PDF from an office format.
 *
 * Only used when exporting from an office format like XLSX.
 *
 * @example
 * ```
 * const officeDocument = await fetch('example.xlsx').then(response => response.arrayBuffer())
 * PSPDFKit.convertToPDF(file, null, {
 *   splitExcelSheetsIntoPages: true,
 *   spreadsheetMaximumContentHeightPerSheet: 1000,
 *   spreadsheetMaximumContentWidthPerSheet: 50,
 * })
 * ```
 * @public
 * @memberof PSPDFKit
 * @member  {object} OfficeConversionSettings {Object}
 * @property {?boolean} splitExcelSheetsIntoPages - If true, each sheet in the Excel document will be exported as a separate page in the PDF.
 * @property {?number} spreadsheetMaximumContentHeightPerSheet - The maximum height of the content in a single sheet. If the content exceeds this height, it will be split into multiple pages.
 * @property {?number} spreadsheetMaximumContentWidthPerSheet - The maximum width of the content in a single sheet. If the content exceeds this width, it will be split into multiple pages.
 * @default { splitExcelSheetsIntoPages: false }
 */
type OfficeConversionSettings = {
    splitExcelSheetsIntoPages?: boolean;
    spreadsheetMaximumContentHeightPerSheet?: number;
    spreadsheetMaximumContentWidthPerSheet?: number;
};
type ExportOfficeFlags = {
    format: IDocumentOfficeFormat;
};
type PDFAFlags = {
    conformance?: IConformance;
    vectorization?: boolean;
    rasterization?: boolean;
};
type OptimizationFlags = {
    documentFormat?: 'pdf' | 'pdfa';
    grayscaleText?: boolean;
    grayscaleGraphics?: boolean;
    grayscaleFormFields?: boolean;
    grayscaleAnnotations?: boolean;
    grayscaleImages?: boolean;
    disableImages?: boolean;
    mrcCompression?: boolean;
    imageOptimizationQuality?: 1 | 2 | 3 | 4;
    linearize?: boolean;
};

type FormFieldAdditionalActionsType = {
    onChange?: Action;
    onCalculate?: Action;
};
type FormFieldEventTriggerType = keyof FormFieldAdditionalActionsType;
type FormFieldInputAdditionalActionsType = FormFieldAdditionalActionsType & {
    onInput?: Action;
    onFormat?: Action;
};
type FormFieldInputEventTriggerType = keyof FormFieldInputAdditionalActionsType;
type FormFieldName = string;
interface IFormField {
    id?: ID;
    pdfObjectId?: number | null;
    annotationIds?: List<string>;
    name?: FormFieldName;
    label?: string;
    readOnly?: boolean;
    required?: boolean;
    noExport?: boolean;
    additionalActions?: any;
    group?: string | null;
    isEditable?: boolean;
    isFillable?: boolean;
    isDeletable?: boolean;
    canSetGroup?: boolean;
    [key: string]: any;
}
declare const FormField_base: Record$1.Factory<IFormField>;
/**
 * @classdesc
 * Form field type from which all form fields inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record}.
 *
 * To retrieve a list of all form fields, use {@link PSPDFKit.Instance#getFormFields}.
 *
 * Please see our {@link https://pspdfkit.com/guides/web/current/forms/introduction-to-forms/|forms guide
 * article} to learn more about form fields and for examples on how to create them.
 * @example <caption>Creating a form field.</caption>
 * const widget = new PSPDFKit.Annotations.WidgetAnnotation({
 *    // Generate unique ID so it can be referenced in form field before the widget is created.
 *    id: PSPDFKit.generateInstantId(),
 *    pageIndex: 0,
 *    formFieldName: 'form-field',
 *    boundingBox: new PSPDFKit.Geometry.Rect({
 *       left: 50,
 *       top: 50,
 *       width: 50,
 *       height: 50,
 *    }),
 * }),
 * const formField = new PSPDFKit.FormFields.TextFormField({
 *    name: 'form-field',
 *    annotationIds: new PSPDFKit.Immutable.List([widget.id]),
 * })
 * instance.create([widget, formField]);
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary Base form field type from which all form fields inherit.
 * @class FormField
 * @noconstructor
 * @extends Immutable.Record
 * @seealso PSPDFKit.Instance#create PSPDFKit.Instance#delete
 * @seealso PSPDFKit.Instance#ensureChangesSaved PSPDFKit.Instance#getFormFields
 * @seealso PSPDFKit.Instance#hasUnsavedChanges PSPDFKit.Instance#save
 * @seealso PSPDFKit.Instance#update
 * @seealso PSPDFKit.Configuration#disableForms PSPDFKit.Instance~FormFieldsLoadEvent
 * @seealso PSPDFKit.Instance~FormFieldsChangeEvent PSPDFKit.Instance~FormFieldsCreateEvent
 * @seealso PSPDFKit.Instance~FormFieldsUpdateEvent PSPDFKit.Instance~FormFieldsDeleteEvent
 * @seealso PSPDFKit.Instance~FormFieldsWillSaveEvent PSPDFKit.Instance~FormFieldsDidSaveEvent
 * @seealso PSPDFKit.Instance~FormWillSubmitEvent PSPDFKit.Instance~FormDidSubmitEvent
 */
declare class FormField extends FormField_base {
    /**
     * A unique identifier to describe the form field record. When a form field is created in the UI, the
     * viewer has to generate a unique ID.
     *
     * When changes are saved to the underlying form field provider, we call
     * {@link PSPDFKit.Instance#ensureFormFieldSaved} to make sure the form field has been persisted
     * from the provider.
     *
     * @public
     * @instance
     * @member {string} id
     * @memberof PSPDFKit.FormFields.FormField
     */
    id: ID;
    /**
     * Unique name of the form field (often referred to as fully qualified name). This name is used
     * to link {@link PSPDFKit.Annotations.WidgetAnnotation} and is also used as an identifier for
     * form field values.
     *
     * @public
     * @instance
     * @member {string} name
     * @memberof PSPDFKit.FormFields.FormField
     */
    name: FormFieldName;
    /**
     * The object ID of the form field object in the PDF.
     *
     * @public
     * @instance
     * @member {number} pdfObjectId
     * @memberof PSPDFKit.FormFields.FormField
     */
    pdfObjectId: number;
    /**
     * Holds an immutable list of {@link PSPDFKit.Annotations.WidgetAnnotation#id}s.
     *
     * @public
     * @instance
     * @member {Immutable.List.<string>} annotationIds
     * @memberof PSPDFKit.FormFields.FormField
     */
    annotationIds: List<string>;
    /**
     * Used to identify the form field in the UI or for accessibility.
     *
     * @public
     * @instance
     * @member {string} label
     * @memberof PSPDFKit.FormFields.FormField
     */
    label: string;
    /**
     * Read only form fields can not be filled out (similar to disabled HTML input elements).
     *
     * @public
     * @instance
     * @member {boolean} readOnly
     * @memberof PSPDFKit.FormFields.FormField
     * @default false
     */
    readOnly: boolean;
    /**
     * Required form fields must be filled out in order to submit the form.
     *
     * {@link PSPDFKit.FormFields.TextFormField}, {@link PSPDFKit.FormFields.ComboBoxFormField} and
     * {@link PSPDFKit.FormFields.ListBoxFormField} with this flag set will be rendered with
     * the [`PSPDFKit-Annotation-Widget-Required`]{@link https://www.nutrient.io/api/web/css-Widget-Annotation.html#.PSPDFKit-Annotation-Widget-Required} public CSS class and the HTML `required` attribute set.
     *
     * @public
     * @instance
     * @member {boolean} required
     * @memberof PSPDFKit.FormFields.FormField
     * @default false
     */
    required: boolean;
    /**
     * Form fields with the `noExport` flag won't appear in the serialized payload of a form
     * submission.
     *
     * @public
     * @instance
     * @member {boolean} noExport
     * @memberof PSPDFKit.FormFields.FormField
     * @default false
     */
    noExport: boolean;
    /**
     * Optional actions to execute when an event is triggered.
     *
     * @public
     * @instance
     * @member {?PSPDFKit.FormFieldAdditionalActions} additionalActions
     * @memberof PSPDFKit.FormFields.FormField
     * @default null
     */
    additionalActions: any;
    /**
     * This property is used to define the permission scope for this form-field, it's corresponding widget-annotations and form field values. If you change the `group` of a form field, the corresponding widget annotations and form field values will inherit it.
     *
     * It is only available when collaboration permissions is enabled on Server-Backed deployments.
     *
     * @public
     * @instance
     * @member {string} group
     * @memberof PSPDFKit.FormFields.FormField
     */
    group?: string | null;
    /**
     * This property defines whether this form-field can be edited or not.
     * The value of this field depends on the set of collaboration permissions defined in the JWT token.
     *
     * It is only available when collaboration permissions is enabled on Server-Backed deployments.
     *
     * @public
     * @readonly
     * @instance
     * @member {boolean} isEditable
     * @memberof PSPDFKit.FormFields.FormField
     */
    isEditable?: boolean;
    /**
     * This property defines whether this form-field can be filled or not.
     * The value of this field depends on the set of collaboration permissions defined in the JWT token.
     *
     * It is only available when collaboration permissions is enabled on Server-Backed deployments.
     *
     * @public
     * @readonly
     * @instance
     * @member {boolean} isFillable
     * @memberof PSPDFKit.FormFields.FormField
     */
    isFillable?: boolean;
    /**
     * This property defines whether this form field can be deleted or not.
     * The value of this field depends on the set of collaboration permissions defined in the JWT token.
     *
     * It is only available when collaboration permissions is enabled on Server-Backed deployments.
     *
     * @public
     * @readonly
     * @instance
     * @member {boolean} isDeletable
     * @memberof PSPDFKit.FormFields.FormField
     */
    isDeletable?: boolean;
    /**
     * This property defines whether the user has permission to edit the group of this form field.
     * The value of this field depends on the set of collaboration permissions defined in the JWT token.
     *
     * It is only available when collaboration permissions is enabled on Server-Backed deployments.
     *
     * @public
     * @readonly
     * @instance
     * @member {boolean} canSetGroup
     * @memberof PSPDFKit.FormFields.FormField
     */
    canSetGroup?: boolean;
    static defaultValues: IObject;
    constructor(args?: IFormField);
}

/**
 * @classdesc
 * A button that can be pressed.
 *
 * To retrieve a list of all form fields, use {@link PSPDFKit.Instance#getFormFields}.
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary A clickable button.
 * @class ButtonFormField
 * @noconstructor
 * @extends PSPDFKit.FormFields.FormField
 */
/**
 * The label for the button widget annotation.
 *
 * @public
 * @instance
 * @member {string} buttonLabel
 * @memberof PSPDFKit.FormFields.ButtonFormField
 */
declare class ButtonFormField extends FormField {
    buttonLabel: string | null;
    static defaultValues: IObject;
}

declare const FormOption_base: Record$1.Factory<{
    label: string;
    value: string;
}>;
/**
 * @classdesc
 * A form option is used to identify all possible options for the following form field types:
 *
 * - {@link PSPDFKit.FormFields.CheckBoxFormField}
 * - {@link PSPDFKit.FormFields.ListBoxFormField}
 * - {@link PSPDFKit.FormFields.RadioButtonFormField}
 * - {@link PSPDFKit.FormFields.ComboBoxFormField}
 *
 * The index of the {@link PSPDFKit.Annotations.WidgetAnnotation#id} in the
 * {@link PSPDFKit.FormFields.FormField#annotationIds} property is used to find the option
 * for this widget annotation (the index is the same):
 *
 * ```
 * const index = formField.annotationIds.findIndex(id => id === annotation.id);
 * const option = formField.options.get(index);
 * console.log(option.value);
 * ```
 * @public
 * @memberof PSPDFKit
 * @summary Form field options
 * @class FormOption
 * @param {object} args An object of the members.
 * @extends Immutable.Record
 */
declare class FormOption extends FormOption_base {
}

/**
 * @classdesc
 * A check box that can either be checked or unchecked. One check box form field can also be
 * associated to multiple single check box widgets. In this case, `option` contains the value of the
 * associated {@link PSPDFKit.FormOption}
 *
 * To retrieve a list of all form fields, use {@link PSPDFKit.Instance#getFormFields}.
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary A check box or a group of many check boxes.
 * @class CheckBoxFormField
 * @noconstructor
 * @extends PSPDFKit.FormFields.FormField
 */
declare class CheckBoxFormField extends FormField {
    values: List<string>;
    defaultValues: List<string>;
    options: List<FormOption>;
    optionIndexes?: List<number>;
    static defaultValues: IObject;
}

/**
 * @classdesc
 *
 * Base form field type for all form fields that allow multiple choices:
 *
 * - {@link PSPDFKit.FormFields.ComboBoxFormField}
 * - {@link PSPDFKit.FormFields.ListBoxFormField}
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary Base form field for all fields allowing multiple choices.
 * @class ChoiceFormField
 * @noconstructor
 * @extends PSPDFKit.FormFields.FormField
 */
declare class ChoiceFormField extends FormField {
    options: List<FormOption>;
    values: List<string>;
    defaultValues: List<string>;
    multiSelect: boolean;
    commitOnChange: boolean;
    static defaultValues: IObject;
}

/**
 * @classdesc
 *
 * A combo box is a drop down box with the option to add custom entries
 * (see {@link PSPDFKit.FormFields.ComboBoxFormField#edit}).
 *
 * Please note that {@link PSPDFKit.Instance#getFormFieldValues} will not return
 * the latest value for this field until the user leaves this field by default. If you
 * want this value to update on every change then set the {@link PSPDFKit.FormFields.ChoiceFormField#commitOnChange}) to
 * true.
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary A drop down box with the option to add custom entries.
 * @class ComboBoxFormField
 * @noconstructor
 * @extends PSPDFKit.FormFields.FormField
 */
declare class ComboBoxFormField extends ChoiceFormField {
    edit: boolean;
    doNotSpellCheck: boolean;
    static defaultValues: IObject;
}

/**
 * @classdesc
 *
 * A list box where multiple values can be selected.
 *
 * To retrieve a list of all form fields, use {@link PSPDFKit.Instance#getFormFields}.
 *
 * Please note that {@link PSPDFKit.Instance#getFormFieldValues} will not return
 * the latest value for this field until the user leaves this field by default. If you
 * want this value to update on every change then set the {@link PSPDFKit.FormFields.ChoiceFormField#commitOnChange}) to
 * true.
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary A list box where multiple values can be selected.
 * @class ListBoxFormField
 * @noconstructor
 * @extends PSPDFKit.FormFields.ChoiceFormField
 */
declare class ListBoxFormField extends ChoiceFormField {
    additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
}

/**
 * @classdesc
 *
 * A group of radio buttons. Similar to {@link PSPDFKit.FormFields.CheckBoxFormField}, but there can
 * only be one value set at the same time.
 *
 * To retrieve a list of all form fields, use {@link PSPDFKit.Instance#getFormFields}.
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary A group of radio buttons.
 * @class RadioButtonFormField
 * @noconstructor
 * @extends PSPDFKit.FormFields.FormField
 */
declare class RadioButtonFormField extends FormField {
    noToggleToOff: boolean;
    radiosInUnison: boolean;
    value: string;
    defaultValue: string;
    options: List<FormOption>;
    optionIndexes?: List<number>;
    static defaultValues: IObject;
}

/**
 * @classdesc
 *
 * A text input element, that can either span a single or multiple lines.
 *
 * To retrieve a list of all form fields, use {@link PSPDFKit.Instance#getFormFields}.
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary A text input element, that can either span a single or multiple lines.
 * @class TextFormField
 * @noconstructor
 * @extends PSPDFKit.FormFields.FormField
 */
declare class TextFormField extends FormField {
    value: string;
    defaultValue: string;
    password: boolean;
    maxLength?: number | null;
    doNotSpellCheck: boolean;
    doNotScroll: boolean;
    multiLine: boolean;
    comb: boolean;
    additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
    static defaultValues: IObject;
}

/**
 * @classdesc
 * A field that contains an ink signature.
 *
 * To retrieve a list of all form fields, use {@link PSPDFKit.Instance#getFormFields}.
 * @public
 * @memberof PSPDFKit.FormFields
 * @summary A filed that contains a ink signature.
 * @class SignatureFormField
 * @noconstructor
 * @extends PSPDFKit.FormFields.FormField
 * @seealso PSPDFKit.Configuration#formFieldsNotSavingSignatures
 */
declare class SignatureFormField extends FormField {
}

/**
 * @classdesc
 * DocumentDescriptor is a class that provides methods to describe a document for comparison.
 * It encapsulates the file path, optional password, and page indexes for the document.
 * @example <caption>Create a new DocumentDescriptor</caption>
 * const doc = new DocumentDescriptor({ filePath: "path/to/document.pdf", pageIndexes: [0, 1] });
 * @public
 * @memberof PSPDFKit
 * @summary The descriptor for a document to be compared.
 * @extends Immutable.Record
 * @class DocumentDescriptor
 */
interface IDocumentDescriptor {
    filePath?: string | ArrayBuffer;
    password?: string;
    pageIndexes: Array<number | [number, number]>;
    jwt?: string;
}
declare const DocumentDescriptor_base: Record$1.Factory<IDocumentDescriptor>;
declare class DocumentDescriptor extends DocumentDescriptor_base {
    constructor(documentDescriptorOptions: IDocumentDescriptor);
}

type ToolbarItem = ToolbarItem$1;
type AnnotationPreset = AnnotationPreset$1;
type AnnotationPresetID = AnnotationPresetID$1;

declare class __dangerousImmutableRecordFactory<TProps extends Record<string, unknown>> {
    has(key: unknown): boolean;
    get<K extends keyof TProps>(key: K): TProps[K];
    set<K extends keyof TProps>(key: K, value: TProps[K]): this;
    delete<K extends keyof TProps>(key: K): this;
    clear(): this;
    update<K extends keyof TProps>(key: K, updater: (value: TProps[K]) => TProps[K]): this;
    merge(...collections: Array<Partial<TProps>>): this;
    mergeWith(merger: (previous?: unknown, next?: unknown, key?: string) => unknown, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
    mergeDeep(...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
    mergeDeepWith(merger: (previous?: unknown, next?: unknown, key?: string) => unknown, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
    setIn(keyPath: Iterable<unknown>, value: unknown): this;
    deleteIn(keyPath: Iterable<unknown>): this;
    removeIn(keyPath: Iterable<unknown>): this;
    updateIn(keyPath: Iterable<unknown>, notSetValue: unknown, updater: (value: unknown) => unknown): this;
    updateIn(keyPath: Iterable<unknown>, updater: (value: unknown) => unknown): this;
    mergeIn(keyPath: Iterable<unknown>, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
    mergeDeepIn(keyPath: Iterable<unknown>, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
    withMutations(mutator: (mutable: this) => unknown): this;
    asMutable(): this;
    asImmutable(): this;
    getIn(keyPath: Iterable<unknown>, notSetValue?: unknown): unknown;
    toJS(): TProps;
    toJSON(): TProps;
    equals(other: unknown): boolean;
    toSeq(): Seq.Keyed<string, unknown>;
}
declare const InheritableImmutableRecord_base: any;
declare class InheritableImmutableRecord<T extends Record<string, unknown>> extends InheritableImmutableRecord_base {
    constructor(values?: Partial<T> | Iterable<[string, unknown]>);
}
interface InheritableImmutableRecord<T extends Record<string, unknown>> extends __dangerousImmutableRecordFactory<T> {
}

type ID = string;
type AnnotationProperties = {
    id: string | null;
    name: string | null;
    subject: string | null;
    pdfObjectId: number | null;
    pageIndex: number | null;
    boundingBox: Rect | null;
    opacity: number | null;
    note: string | null;
    creatorName: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    customData: Record<string, unknown> | null;
    noView: boolean | null;
    noPrint: boolean | null;
    locked: boolean | null;
    lockedContents: boolean | null;
    readOnly: boolean | null;
    hidden: boolean | null;
    group: string | null | undefined;
    isEditable: boolean | undefined;
    isDeletable: boolean | undefined;
    canSetGroup: boolean | undefined;
    canReply: boolean | undefined;
    rotation: number;
    additionalActions: any;
    noZoom: boolean;
    noRotate: boolean;
    isCommentThreadRoot: boolean;
    isAnonymous: boolean;
    APStreamCache: {
        cache: string;
    } | {
        attach: string;
    } | undefined;
    blendMode: IBlendMode;
    action: any;
    [key: string]: unknown;
};
/**
 * @classdesc
 * Base annotation type from which all annotations inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record}.
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Base annotation type from which all annotations inherit.
 * @class Annotation
 * @noconstructor
 * @extends Immutable.Record
 * @seealso PSPDFKit.Instance#getSelectedAnnotation PSPDFKit.Instance#setSelectedAnnotation
 * @seealso PSPDFKit.Instance#setEditableAnnotationTypes PSPDFKit.Instance#setIsEditableAnnotation
 * @seealso PSPDFKit.Instance#createAnnotation PSPDFKit.Instance#deleteAnnotation
 * @seealso PSPDFKit.Instance#getAnnotations PSPDFKit.Instance#ensureAnnotationSaved
 * @seealso PSPDFKit.Instance#hasUnsavedAnnotations PSPDFKit.Instance#saveAnnotations
 * @seealso PSPDFKit.Instance#setAnnotationCreatorName PSPDFKit.Instance#updateAnnotation
 * @seealso PSPDFKit.Configuration#editableAnnotationTypes PSPDFKit.Configuration#isEditableAnnotation
 * @seealso PSPDFKit.Instance~AnnotationsLoadEvent PSPDFKit.Instance~AnnotationsChangeEvent
 * @seealso PSPDFKit.Instance~AnnotationsCreateEvent PSPDFKit.Instance~AnnotationsUpdateEvent
 * @seealso PSPDFKit.Instance~AnnotationsDeleteEvent PSPDFKit.Instance~AnnotationsPressEvent
 * @seealso PSPDFKit.Instance~AnnotationsWillSaveEvent PSPDFKit.Instance~AnnotationsDidSaveEvent
 * @seealso PSPDFKit.Instance~AnnotationsFocusEvent PSPDFKit.Instance~AnnotationsBlurEvent
 * @seealso PSPDFKit.Instance~AnnotationsWillChangeEvent PSPDFKit.Instance~AnnotationSelectionChangeEvent
 */
/**
 * A unique identifier to describe the annotation. When an annotation is created in the UI, the
 * viewer has to generate a unique ID.
 *
 * When changes are saved to the underlying annotation provider, we call
 * {@link PSPDFKit.Instance#ensureAnnotationSaved} to make sure the annotation has been persisted
 * from the provider.
 *
 * @public
 * @instance
 * @member {string} id
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * An optional field that may be used to identify the annotation.
 *
 * By default, we'll set that to the same value as the automatically generated
 * {@link PSPDFKit.Annotations.Annotation#id}.
 *
 * @public
 * @instance
 * @member {?string} name
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * An optional annotation subject, representing a short description of
 * the subject being addressed by the annotation. This property has no effect
 * on the annotation rendering.
 *
 * @public
 * @instance
 * @member {?string} subject
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * When the annotation is extracted directly from a PDF file, the `pdfObjectId` refers to the
 * identifier that was used in the PDF document.
 *
 * This ID is optional since newly created annotations using the SYNCProvider annotation provider
 * won't have a `pdfObjectId` assigned.
 *
 * @public
 * @instance
 * @member {?number} pdfObjectId
 * @memberof PSPDFKit.Annotations.Annotation
 * @default null
 */
/**
 * The page index on which the annotation is placed. It's important to notice that an annotation
 * can only ever be on one page. If you create for example an ink annotation with lines on two
 * pages, two annotation records will be created.
 *
 * `pageIndex` is zero-based and has a maximum value of `totalPageCount - 1`.
 *
 * @public
 * @instance
 * @member {number} pageIndex
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * Position of this annotation on the page. It's necessary that this spans all visible points of
 * the annotation, otherwise hit testing and other features may not work.
 *
 * @public
 * @instance
 * @member {PSPDFKit.Geometry.Rect} boundingBox
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * A transparency value that is applied to the complete annotation. The value is capped between 0
 * and 1 inclusive.
 *
 * @public
 * @instance
 * @member {number} opacity
 * @memberof PSPDFKit.Annotations.Annotation
 * @default 1
 */
/**
 * An optional note that can be set on any annotation.
 *
 * This value is displayed in the Nutrient Web SDK UI for all annotations except
 * {@link PSPDFKit.Annotations.NoteAnnotation|NoteAnnotation}, {@link PSPDFKit.Annotations.TextAnnotation|TextAnnotation}, {@link PSPDFKit.Annotations.WidgetAnnotation|WidgetAnnotation} and {@link PSPDFKit.Annotations.CommentMarkerAnnotation|CommentMarkerAnnotation}.
 *
 * @public
 * @instance
 * @member {?string} note
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * The name of the creator of the annotation. This is a general purpose string which can easily be
 * spoofed and might not reflect the actual creator of the annotation.
 *
 * @public
 * @instance
 * @member {?string} creatorName
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * The date of the annotation creation.
 *
 * @public
 * @instance
 * @member {Date} createdAt
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * The date of last annotation update.
 *
 * @public
 * @instance
 * @member {Date} updatedAt
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * Annotations can store additional user-specified data.
 *
 * PSPDFKit will not use or evaluate `customData` in the UI directly.
 * You have full control over this property. For new annotations, this defaults to null.
 *
 * customData will be stored as JSON through `JSON.serialize()` and `JSON.parse()`, and
 * so must be a plain JSON-serializable object.
 *
 * @example <caption>Adding a new {@link PSPDFKit.Annotations.EllipseAnnotation} with custom data attached:</caption>
 * const annotation = new PSPDFKit.Annotations.EllipseAnnotation({
 *   pageIndex: 0,
 *   boundingBox: new PSPDFKit.Geometry.Rect({
 *     top: 10,
 *     left: 10,
 *     width: 100,
 *     height: 100
 *   }),
 *   customData: {
 *     circleId: "my-circle"
 *   }
 * });
 * @public
 * @instance
 * @member {?object} customData
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * The annotation flag that prevents the annotation from being rendered in the UI.
 *
 * The annotation may still be part of the printed page, depending of the value of the
 * {@link PSPDFKit.Annotations.Annotation#noPrint} flag.
 *
 * @public
 * @instance
 * @member {boolean} noView
 * @memberof PSPDFKit.Annotations.Annotation
 * @default false
 */
/**
 * The annotation flag that prevents the annotation from being printed.
 *
 * @public
 * @instance
 * @member {boolean} noPrint
 * @memberof PSPDFKit.Annotations.Annotation
 * @default false
 */
/**
 * The annotation flag that prevents the annotation from being modified.
 *
 * @public
 * @instance
 * @member {boolean} locked
 * @memberof PSPDFKit.Annotations.Annotation
 * @default false
 */
/**
 * The annotation flag that prevents the annotation content from being modified.
 *
 * @public
 * @instance
 * @member {boolean} lockedContents
 * @memberof PSPDFKit.Annotations.Annotation
 * @default false
 */
/**
 * The annotation flag that makes the annotation read only.
 *
 * @public
 * @instance
 * @member {boolean} readOnly
 * @memberof PSPDFKit.Annotations.Annotation
 * @default false
 */
/**
 * The blend mode defines how the color of the annotation will be applied to its background.
 *
 * @public
 * @member {PSPDFKit.BlendMode} blendMode
 * @memberof PSPDFKit.Annotations.Annotation
 * @instance
 * @default "normal"
 */
/**
 * If set, do not display or print the annotation or allow it to interact with the user.
 *
 * @public
 * @instance
 * @member {boolean} hidden
 * @memberof PSPDFKit.Annotations.Annotation
 * @default false
 */
/**
 * This property is used to define the permission scope for this annotation.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @instance
 * @member {string} group
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * This property defines whether this annotation can be edited or not.
 * The value of this field depends on the set of collaboration permissions defined in the JWT token.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @readonly
 * @instance
 * @member {boolean} isEditable
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * This property defines whether this annotation can be deleted or not.
 * The value of this field depends on the set of collaboration permissions defined in the JWT token.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @readonly
 * @instance
 * @member {boolean} isDeletable
 * @memberof PSPDFKit.Annotations.Annotation
 */
/**
 * This property defines whether the user has permission to edit the group of this annotation.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 *
 * @public
 * @readonly
 * @instance
 * @member {boolean} canSetGroup
 * @memberof PSPDFKit.Annotations.Annotation
 */
declare class Annotation<T extends AnnotationProperties = AnnotationProperties> extends InheritableImmutableRecord<T> {
    id: ID;
    name: null | string;
    subject: null | string;
    pdfObjectId: null | number;
    pageIndex: number;
    boundingBox: Rect;
    opacity: number;
    note: null | string;
    creatorName: null | string;
    createdAt: Date;
    updatedAt: Date;
    noView: boolean;
    noPrint: boolean;
    locked: boolean;
    lockedContents: boolean;
    readOnly: boolean;
    hidden: boolean;
    customData: null | Record<string, unknown>;
    noZoom: boolean;
    noRotate: boolean;
    additionalActions: any;
    rotation: number;
    blendMode: IBlendMode;
    isCommentThreadRoot: boolean;
    isAnonymous: boolean;
    group?: string | null;
    isEditable?: boolean;
    isDeletable?: boolean;
    canSetGroup?: boolean;
    canReply?: boolean;
    APStreamCache?: {
        cache: string;
    } | {
        attach: string;
    };
    action: any;
    static defaultValues: IObject;
    constructor(record?: Partial<T>);
}

type StampKind = 'Approved' | 'NotApproved' | 'Draft' | 'Final' | 'Completed' | 'Confidential' | 'ForPublicRelease' | 'NotForPublicRelease' | 'ForComment' | 'Void' | 'PreliminaryResults' | 'InformationOnly' | 'Rejected' | 'Accepted' | 'InitialHere' | 'SignHere' | 'Witness' | 'AsIs' | 'Departmental' | 'Experimental' | 'Expired' | 'Sold' | 'TopSecret' | 'Revised' | 'RejectedWithText' | 'Custom';
interface IStampAnnotation extends AnnotationProperties {
    stampType: string | StampKind | null;
    title: string | null;
    subtitle: string | null;
    color: Color | null;
    xfdfAppearanceStream: string | null;
    xfdfAppearanceStreamOriginalPageRotation: number | null;
}
/**
 * @classdesc
 * PSPDFKit for Web supports stamp annotations and comes with some out-of-the-box stamp annotations
 * available.
 * @example <caption>Create a stamp annotation</caption>
 * var annotation = new PSPDFKit.Annotations.StampAnnotation({
 *   pageIndex: 0,
 *   stampType: 'Custom'
 *   title: 'Example Stamp',
 *   subtitle: 'Example Stamp Annotation',
 *   color: new Color({ r: 0, g: 51, b: 79 }),
 *   boundingBox: new PSPDFKit.Geometry.Rect({ left: 10, top: 20, width: 150, height: 40 }),
 * });
 * @public
 * @memberof PSPDFKit.Annotations
 * @summary Display a stamp annotation, which represent a predefined or customized stamp in a PDF file.
 * @class StampAnnotation
 * @param {object} args An object of the members.
 * @extends PSPDFKit.Annotations.Annotation
 * @seealso PSPDFKit.Instance#setStampAnnotationTemplates PSPDFKit.defaultStampAnnotationTemplates
 * @seealso  PSPDFKit.Configuration#stampAnnotationTemplates
 */
/**
 * One of the predefined stamp types. Can be any of:
 *  - `Approved`
 *  - `NotApproved`
 *  - `Draft`
 *  - `Final`
 *  - `Completed`
 *  - `Confidential`
 *  - `ForPublicRelease`
 *  - `NotForPublicRelease`
 *  - `ForComment`
 *  - `Void`
 *  - `PreliminaryResults`
 *  - `InformationOnly`
 *  - `Rejected`
 *  - `Accepted`
 *  - `InitialHere`
 *  - `SignHere`
 *  - `Witness`
 *  - `AsIs`
 *  - `Departmental`
 *  - `Experimental`
 *  - `Expired`
 *  - `Sold`
 *  - `TopSecret`
 *  - `Revised`
 *  - `RejectedWithText`
 *  - `Custom`
 *
 * @public
 * @instance
 * @member {string} stampType
 * @memberof PSPDFKit.Annotations.StampAnnotation
 * @default "Custom"
 */
/**
 * The main text of a custom stamp annotation.
 *
 * @public
 * @instance
 * @member {?string} title
 * @memberof PSPDFKit.Annotations.StampAnnotation
 */
/**
 * The sub text of a custom stamp annotation.
 *
 * @public
 * @instance
 * @member {?string} subtitle
 * @memberof PSPDFKit.Annotations.StampAnnotation
 */
/**
 * The color of a stamp annotation.
 *
 * @public
 * @instance
 * @member {?PSPDFKit.Color} color
 * @memberof PSPDFKit.Annotations.StampAnnotation
 */
/**
 * When set, the annotation will not scale up in the page when it's zoomed in.
 * The flag doesn't have an effect when the page is zoomed out to a zoom level less than `1`.
 *
 * @public
 * @instance
 * @member {?boolean} noZoom
 * @memberof PSPDFKit.Annotations.StampAnnotation
 * @default false
 */
/**
 * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
 * annotation with a rotation value of `0` will make it appear in the same direction as the UI
 * appears, when no {@link PSPDFKit.ViewState#pagesRotation} is set.
 *
 * Stamp annotations support free rotation using integers between 0° and 359°. Negative values or values
 * above 359 are normalized to this interval. Attempting to use non-integer values will result in
 * an error.
 *
 * @public
 * @instance
 * @member {number} rotation
 * @memberof PSPDFKit.Annotations.StampAnnotation
 * @default 0
 */
declare class StampAnnotation<T extends IStampAnnotation = IStampAnnotation> extends Annotation<T> {
    stampType: StampKind;
    title: null | string;
    subtitle: null | string;
    color: null | Color;
    xfdfAppearanceStream: null | string;
    xfdfAppearanceStreamOriginalPageRotation: null | number;
    static defaultValues: IObject;
    static readableName: string;
}

/**
 * ***Standalone only***
 *
 * Preloads the standalone WASM worker.
 *
 * In cases where you don't want to load a PDF right away, the first invocation
 * of {@link PSPDFKit.load} after allowing this function to resolve will be
 * significantly faster.
 *
 * If {@link PSPDFKit.load} is called while this function has not yet resolved,
 * then {@link PSPDFKit.load} will simply reuse the request from this function
 * without adding any overhead.
 * @example
 * // Fetches worker asynchronously
 * PSPDFKit.preloadWorker(configuration);
 * document.querySelector("#open-pdf-button").addEventListener(async () => {
 *   await PSPDFKit.load({ ...configuration, document: "my-doc.pdf" });
 * });
 * @public
 * @function preloadWorker
 * @memberof PSPDFKit
 * @param {PSPDFKit.Configuration} configuration A configuration Object
 * @returns {Promise.<void>} Promise that resolves when preloading is complete
 */
declare function preloadWorker(configuration: StandaloneConfiguration): Promise<void>;
/**
 * Creates a new PSPDFKit instance.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to a new {@link PSPDFKit.Instance}, or rejecting with a {@link PSPDFKit.Error}.
 *
 * It requires a {@link PSPDFKit.Configuration|configuration object}. When the configuration is
 * invalid, the promise will be rejected with a {@link PSPDFKit.Error}.
 * @example <caption>Load PSPDFKit for Web Server</caption>
 * PSPDFKit.load({
 *   authPayload: { jwt: "xxx.xxx.xxx" },
 *   container: ".foo",
 *   documentId: "85203",
 *   instant: true,
 * }).then((instance) => {
 *   console.log("Successfully mounted PSPDFKit", instance);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @example <caption>Load PSPDFKit for Web Standalone</caption>
 * PSPDFKit.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * }).then((instance) => {
 *   console.log("Successfully mounted PSPDFKit", instance);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @public
 * @function load
 * @memberof PSPDFKit
 * @param {PSPDFKit.Configuration} configuration A configuration Object
 * @returns {Promise.<PSPDFKit.Instance,PSPDFKit.Error>} Promise that resolves in an {@link PSPDFKit.Instance}
 */
declare function load(configuration: Configuration): Promise<Instance>;
/**
 * Converts a file to a PDF.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of a PDF, or rejecting with a {@link PSPDFKit.Error}.
 *
 * The resulting `ArrayBuffer` can be directly loaded with {@link PSPDFKit.load()}.
 *
 * It requires a {@link PSPDFKit.Configuration|configuration object}. If the configuration is
 * invalid, the promise will be rejected with a {@link PSPDFKit.Error}.
 * @example
 * PSPDFKit.convertToPDF({
 *   document: "/sales-report.docx",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * }).then((arrayBuffer) => {
 *   console.log("Successfully converted document", arrayBuffer);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @public
 * @function convertToPDF
 * @memberof PSPDFKit
 * @param {PSPDFKit.Configuration} configuration A configuration Object
 * @param {?PSPDFKit.Conformance | null} conformance A conformance level of the output PDF
 * @param {?PSPDFKit.OfficeConversionSettings} officeConversionSettings Settings specific to office conversion
 * @returns {Promise.<ArrayBuffer>} Promise that resolves to an ArrayBuffer of a file converted to PDF
 */
declare function convertToPDF(configuration: StandaloneConfiguration, conformance?: IConformance | null, officeConversionSettings?: OfficeConversionSettings): Promise<ArrayBuffer>;
/**
 * Converts a document to the specified supported conversion format.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of the converted document, or rejecting with a {@link PSPDFKit.Error}.
 *
 * It requires a {@link PSPDFKit.Configuration|configuration object}. If the configuration is
 * invalid, the promise will be rejected with a {@link PSPDFKit.Error}.
 * @example
 * PSPDFKit.convertToOffice({
 *   document: "/article.pdf",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * },
 * PSPDFKit.OfficeDocumentFormat.docx
 * ).then((arrayBuffer) => {
 *   console.log("Successfully converted document", arrayBuffer);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @public
 * @function convertToOffice
 * @memberof PSPDFKit
 * @param {PSPDFKit.Configuration} configuration A configuration Object.
 * @param {PSPDFKit.OfficeDocumentFormat} format Format to export the document to.
 * @returns {Promise.<ArrayBuffer>} Promise that resolves to an ArrayBuffer of the converted file
 */
declare function convertToOffice(configuration: StandaloneConfiguration, format: IDocumentOfficeFormat): Promise<ArrayBuffer>;
/**
 * This is used to Populate the document template (Docx format) with corresponding data.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of a Docx, or rejecting with a {@link PSPDFKit.Error}.
 *
 * The resulting `ArrayBuffer` can be converted to PDF with {@link PSPDFKit.convertToPDF()}.
 * and finally loaded with {@link PSPDFKit.load()}.
 *
 * It requires a {@link PSPDFKit.Configuration|configuration object} and config object with
 * data {@link PSPDFKit.TemplateDataToPopulateDocument} which contains the data to be populated in document
 * and delimiter marker to know placeholder of the data. If the configuration is
 * invalid, the promise will be rejected with a {@link PSPDFKit.Error}.
 * @example
 * PSPDFKit.populateDocumentTemplate(
 * {
 *   document: '/sales-report.docx',
 *   licenseKey: 'YOUR_LICENSE_KEY',
 * },
 * {
 *   config: {
 *     delimiter: {
 *       start: '{{',
 *       end: '}}',
 *     },
 *   },
 *   model: {
 *     products: [
 *       {
 *         title: 'Duk',
 *         name: 'DukSoftware',
 *         reference: 'DS0',
 *       },
 *       {
 *         title: 'Tingerloo',
 *         name: 'Tingerlee',
 *         reference: 'T00',
 *       },
 *     ],
 *   },
 * },
 * )
 * .then(arrayBuffer => {
 *   console.log('Successfully populated the template Document with data', arrayBuffer)
 * })
 * .catch(error => {
 *   console.error(error.message)
 * })
 * The `delimiter` object sets the pair of delimiters that encloses a template marker
 * i.e. placeholder marker that need to be substituted with the data.
 *
 * The `model` object associates a template marker with the corresponding substitution in the final, produced document.
 *
 * === Supported Template Features ===
 * Placeholders let users substitute a marker with some text and Loops generate repetitions
 * of a given pattern.
 *
 * The syntax for loops is `#` for the opening tag, and `/` for the closing one in the docs.
 *
 * For instance if the document contains:
 *
 * ```
 * {#ITEMS} {name} {price} {/ITEMS}
 * ```
 *
 * Here, `ITEMS` is the name of the loop template marker, and `name` and `price` are regular placeholder
 * template markers over which the SDK iterates replacing the `name` placeholder with corresponding `name` value
 * in `model`, and similarly the `price` placeholder is replaced by the corresponding `price` value in `model`.
 *
 * ```
 * {
 *   model: {
 *     items: [
 *       {
 *         name: "A",
 *         price: 10
 *       },
 *       {
 *         name: "B",
 *         price: 15
 *       }
 *     ]
 *   }
 * }
 * ```
 * @public
 * @function populateDocumentTemplate
 * @memberof PSPDFKit
 * @param {PSPDFKit.Configuration} configuration A configuration Object
 * @param {PSPDFKit.TemplateDataToPopulateDocument} templateData A template data object
 * @returns {Promise.<ArrayBuffer>} Promise that resolves to an ArrayBuffer of a file converted to PDF
 */
declare function populateDocumentTemplate(configuration: StandaloneConfiguration, templateData: TemplateDataToPopulateDocument): Promise<ArrayBuffer>;

declare function serializeAnnotation(annotation: InkAnnotation): AnnotationBackendJSON<InkAnnotationJSON>;
declare function serializeAnnotation(annotation: LineAnnotation): AnnotationBackendJSON<LineAnnotationJSON>;
declare function serializeAnnotation(annotation: RectangleAnnotation): AnnotationBackendJSON<RectangleAnnotationJSON>;
declare function serializeAnnotation(annotation: EllipseAnnotation): AnnotationBackendJSON<EllipseAnnotationJSON>;
declare function serializeAnnotation(annotation: PolygonAnnotation): AnnotationBackendJSON<PolygonAnnotationJSON>;
declare function serializeAnnotation(annotation: PolylineAnnotation): AnnotationBackendJSON<PolylineAnnotationJSON>;
declare function serializeAnnotation(annotation: TextAnnotation): AnnotationBackendJSON<TextAnnotationJSON>;
declare function serializeAnnotation(annotation: NoteAnnotation): AnnotationBackendJSON<NoteAnnotationJSON>;
declare function serializeAnnotation(annotation: StampAnnotation): AnnotationBackendJSON<StampAnnotationJSON, 'color'>;
declare function serializeAnnotation(annotation: ImageAnnotation): AnnotationBackendJSON<ImageAnnotationJSON>;
declare function serializeAnnotation(annotation: MediaAnnotation): AnnotationBackendJSON<MediaAnnotationJSON>;
declare function serializeAnnotation(annotation: LinkAnnotation): AnnotationBackendJSON<LinkAnnotationJSON>;
declare function serializeAnnotation(annotation: WidgetAnnotation): AnnotationBackendJSON<WidgetAnnotationJSON>;
declare function serializeAnnotation(annotation: TextMarkupAnnotation): AnnotationBackendJSON<TextMarkupAnnotationJSON>;
declare function serializeAnnotation(annotation: RedactionAnnotation): AnnotationBackendJSON<RedactionAnnotationJSON>;
declare function serializeAnnotation(annotation: CommentMarkerAnnotation): AnnotationBackendJSON<CommentMarkerAnnotationJSON>;
declare function serializeAnnotation(annotation: UnknownAnnotation): AnnotationBackendJSON<UnknownAnnotationJSON>;
declare function serializeAnnotation(annotation: AnnotationsUnion): AnnotationsBackendJSONUnion;
declare function serializeFormField(formField: FormField): FormFieldJSON;
declare function serializePreset(preset: AnnotationPreset$1): Record<string, any>;
declare function unserializePreset(presetJSON: Record<string, any>): AnnotationPreset$1;

type TargetType = string | HTMLElement | Instance | null;
/**
 * Unloads an existing PSPDFKit instance.
 *
 * It requires an `target` parameter that is a CSS selector, an HTMLElement or
 * the reference to a {@link PSPDFKit.Instance} returned by {@link PSPDFKit.load}.
 *
 * @example <caption>Unload PSPDFKit for Web using an instance</caption>
 * let instance = null;
 * PSPDFKit.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * }).then((i) => {
 *   instance = i
 * })
 * .then(() => {
 *   // Unload the given instance
 *   PSPDFKit.unload(instance)
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @example <caption>Unload PSPDFKit for Web using a CSS selector</caption>
 * PSPDFKit.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * })
 * .then(() => {
 *   // Unload the given instance
 *   PSPDFKit.unload(".foo")
 * })
 * @example <caption>Unload PSPDFKit for Web using an HTMLElement</caption>
 * PSPDFKit.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * })
 * .then(() => {
 *   // Unload the given instance
 *   PSPDFKit.unload(document.querySelector(".foo"))
 * })
 * @public
 * @function unload
 * @memberof PSPDFKit
 * @param {HTMLElement | string | PSPDFKit.Instance} target A target to unload
 * @returns {boolean} When true, an instance of PSPDFKit for Web was unmounted.
 * @throws {PSPDFKit.Error} Will throw an error when the `target` is invalid but
 *   will work when it does not have a mounted PSPDFKit for Web instance.
 */
declare function unload(target: TargetType): boolean;

declare function viewStateFromOpenParameters(viewState: ViewState, hash?: string | null | undefined): ViewState;

interface TextComparisonEventsMap {
    'textComparison.scrollLock': (scrollLockFlag: boolean) => void;
    'textComparison.comparisonSidebarVisibilityChange': (scrollLockFlag: boolean) => void;
    'textComparison.selectionChange': (newSelectedIndex: number) => void;
}

type TextComparisonInstanceConstructor = TextComparisonSharedProps & {
    instanceA: Instance;
    instanceB: Instance;
    unmount: () => void;
};
type SetToolbarItemsFunction = (currentState: TextComparisonToolbarItem[]) => TextComparisonToolbarItem[];
/**
 * @classdesc
 * A mounted text comparison instance.
 *
 * You can generate an instance for text comparison by using {@link PSPDFKit.loadTextComparison}.
 * @noconstructor
 * @public
 * @class TextComparisonInstance
 * @memberof PSPDFKit
 * @summary A mounted text comparison instance.
 */
declare class TextComparisonInstance {
    getScrollLock: () => boolean;
    getComparisonVisibility: () => boolean;
    getCurrentChangeIndex: () => number;
    getToolbarItems: () => TextComparisonToolbarItem[];
    getInnerToolbarItems: () => TextComparisonInnerToolbarItem[];
    getChanges: () => TextComparisonChange[];
    addEventListener: <K extends keyof TextComparisonEventsMap>(action: K, listener: TextComparisonEventsMap[K]) => void;
    removeEventListener: <K extends keyof TextComparisonEventsMap>(action: K, listener: TextComparisonEventsMap[K]) => void;
    unload: () => void;
    setComparisonSidebarConfig: (comparisonSidebarConfig: TextComparisonSidebarConfiguration) => Promise<void>;
    setScrollLock: (flag: boolean) => void;
    setComparisonVisibility: (flag: boolean) => void;
    setCurrentChangeIndex: (changeIndex: number) => void;
    setToolbarItems: (toolbarItemsCallback: TextComparisonToolbarItem[] | SetToolbarItemsFunction) => void;
    setInnerToolbarItems: (toolbarItemsCallback: TextComparisonInnerToolbarItem[] | SetToolbarItemsFunction) => void;
    jumpToChange: (changeIndex: number) => number;
    goToPreviousChange: () => number;
    goToNextChange: () => number;
    constructor(params: TextComparisonInstanceConstructor);
}

declare function loadTextComparison(configuration: TextComparisonConfiguration): Promise<TextComparisonInstance>;

/**
 * Contains information needed to authenticate processing request with Nutrient backend (Document Engine or DWS API).
 *
 * **DWS API**
 *
 * JSON Web Token (JWT) are used to authorize with the DWS API. See DWS's
 * {@link https://www.nutrient.io/api/documentation/developer-guides/authentication/|guides}
 * for more details about the JWT authorization.
 *
 * Auth token can be generated via DWS API. For example, you can generate a token that can only access
 * the `document_Editor_api` operation from the `example.com` origin and expires in 1 hour, without having access to other
 * operations or origins:
 *
 * ```sh
 * curl -X POST https://api.nutrient.io/tokens \
 *  -H 'Authorization: Bearer pdf_live_<rest_of_your_api_key>' \
 *  -H "Content-Type: application/json" \
 *  -d '{
 *    "allowedOperations": [
 *      "document_editor_api",
 *    ],
 *    "allowedOrigins": [
 *      "example.com"
 *    ],
 *    "expirationTime": 3600
 *  }'
 * ```
 *
 * **Document Engine**
 *
 * JSON Web Token (JWT) are used to authorize with the Document Engine. See Document Engine's
 * {@link https://nutrient.io/api/reference/document-engine/upstream/#tag/JWT-authorization|API Reference}
 * for more details about the JWT authorization.
 *
 * @public
 * @property {string} jwt - Authorization token needed to authorize the processing request with the backend.
 * @property {string} serverUrl - Base server URL to use as the Build API endpoint (`<server_url>/api/build`).
 *                                Optional, since it's possible to encode it in the auth token, DWS API does that by default.
 * @interface ProcessingAuthPayload
 * @memberof PSPDFKit
 */
type ProcessingAuthPayload = {
    jwt: string;
    serverUrl?: string;
};
/**
 * The description of the processing operation performed via Build API.
 *
 * For a full reference of the Build API instructions, see the
 * {@link https://www.nutrient.io/api/reference/public/#tag/Build-API/Instructions-Schema|Instructions Schema}.
 *
 * @public
 * @interface BuildInstructions
 * @memberof PSPDFKit
 */
type BuildInstructions = {
    [key: string]: any;
};
/**
 * Represents a processing input referenced by {@link PSPDFKit.BuildInstructions} that needs to be uploaded with the processing request.
 *
 * @public
 * @property {string} name - Name of the input, used to reference the input in {@link PSPDFKit.BuildInstructions}
 * @property {ArrayBuffer | Blob} content - Content of the input that will be uploaded to the backend for processing.
 * @interface BuildInput
 * @memberof PSPDFKit
 */
type BuildInput = {
    name: string;
    content: ArrayBuffer | Blob;
};
/**
 * Performs processing via Nutrient Backend {@link https://www.nutrient.io/api/reference/public/#tag/Build-API|Build API}.
 *
 * * Document Engine (requires Document Engine >= 1.6.0)
 * * {@link https://www.nutrient.io/api/|DWS}
 *
 * In you are running in standalone mode, the resulting `ArrayBuffer` can be converted to PDF with {@link PSPDFKit.convertToPDF()} (if it's not already PDF)
 * and then loaded with {@link PSPDFKit.load()}.
 *
 * @example
 * PSPDFKit.build(
 *  // Authorize request.
 *  { jwt: authPayload.jwt },
 *  // Instructions for the processing request.
 *  {
 *    parts: [
 *      // Use first input as the first part of the final document.
 *      { file: "document" },
 *      // Use a sample DOCX document served from URL as the second part of the final document.
 *      {
 *        file: {
 *          url: "https://www.nutrient.io/api/downloads/samples/docx/document.docx",
 *        },
 *      },
 *    ],
 *  },
 *  // Inputs required by the request. These will be uploaded with the request. The remote file served from URL does not need to be uploaded.
 *  [{ name: "document", content: document }]
 *);
 *
 * @public
 * @function build
 * @memberof PSPDFKit
 * @param {PSPDFKit.ProcessingAuthPayload} authPayload Information needed to authenticate processing request with Nutrient backend.
 * @param {PSPDFKit.BuildInstructions} instructions Build API instructions that describe the processing operation.
 * @param {PSPDFKit.BuildInput[]} inputs An array of all inputs required for the processing operation.
 * @returns {Promise.<ArrayBuffer>} Promise that resolves to an `ArrayBuffer` with the processing result.
 *                                  In case of an error, rejects with a {@link PSPDFKit.Error} with detailed error message.
 *
 * @since Document Engine 1.6.0
 */
declare function build(authPayload: ProcessingAuthPayload, instructions: BuildInstructions, inputs?: BuildInput[]): Promise<ArrayBuffer>;

type RotatableAnnotation = TextAnnotation | StampAnnotation;

/**
 * The main PSPDFKit namespace is exported in the global `PSPDFKit`.
 * @public
 * @namespace PSPDFKit
 */
declare const PSPDFKit: {
    UI: Record<string, any>;
    /**
     * This namespaces exposes classes from the [Immutable.js](https://immutable-js.github.io/immutable-js/).
     * Since all of our state objects are implemented as [Immutable.Record](https://immutable-js.github.io/immutable-js/docs/#/Record),
     * we also assume that the props are immutable.
     *
     * To do this, we export the required classes directly from Immutable.js
     * @public
     * @summary Exports from Immutable.js
     * @namespace PSPDFKit.Immutable
     */
    Immutable: {
        List: typeof List;
        Set: typeof Set$1;
    };
    /**
     * Returns the framework version (e.g. "2019.4.0").
     * @public
     * @readonly
     */
    version: string;
    /**
     * Geometry helper classes that are based on [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record).
     *
     * We use the classes here when we deal with points, rects, sizes and insets within our annotation classes.
     * @public
     * @summary Geometry helper classes.
     * @namespace PSPDFKit.Geometry
     */
    Geometry: {
        Point: typeof Point;
        DrawingPoint: typeof DrawingPoint;
        Rect: typeof Rect;
        Size: typeof Size;
        Inset: typeof Inset;
    };
    /**
     * Actions define what happens when you click an annotation (for example a `LinkAnnotation`). All
     * classes are based on [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record).
     *
     * Only {@link PSPDFKit.Annotations.LinkAnnotation|LinkAnnotation} and
     * {@link PSPDFKit.Annotations.WidgetAnnotation|WidgetAnnotation} can have
     * associated actions set through the `action` property.
     * @public
     * @summary PDF action types.
     * @namespace PSPDFKit.Actions
     */
    Actions: {
        Action: typeof Action;
        GoToAction: typeof GoToAction;
        GoToEmbeddedAction: typeof GoToEmbeddedAction;
        GoToRemoteAction: typeof GoToRemoteAction;
        HideAction: typeof HideAction;
        JavaScriptAction: typeof JavaScriptAction;
        LaunchAction: typeof LaunchAction;
        NamedAction: typeof NamedAction;
        ResetFormAction: typeof ResetFormAction;
        SubmitFormAction: typeof SubmitFormAction;
        URIAction: typeof URIAction;
    };
    /**
     * Annotation API (with all available annotation types). All
     * classes are based on [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record).
     * @public
     * @summary PDF annotation types.
     * @namespace PSPDFKit.Annotations
     */
    Annotations: {
        Annotation: typeof Annotation;
        CommentMarkerAnnotation: typeof CommentMarkerAnnotation;
        HighlightAnnotation: typeof HighlightAnnotation;
        InkAnnotation: typeof InkAnnotation;
        ShapeAnnotation: typeof ShapeAnnotation;
        LineAnnotation: typeof LineAnnotation;
        RectangleAnnotation: typeof RectangleAnnotation;
        EllipseAnnotation: typeof EllipseAnnotation;
        PolygonAnnotation: typeof PolygonAnnotation;
        PolylineAnnotation: typeof PolylineAnnotation;
        LinkAnnotation: typeof LinkAnnotation;
        NoteAnnotation: typeof NoteAnnotation;
        MarkupAnnotation: typeof TextMarkupAnnotation;
        RedactionAnnotation: typeof RedactionAnnotation;
        SquiggleAnnotation: typeof SquiggleAnnotation;
        StampAnnotation: typeof StampAnnotation;
        StrikeOutAnnotation: typeof StrikeOutAnnotation;
        TextAnnotation: typeof TextAnnotation;
        UnderlineAnnotation: typeof UnderlineAnnotation;
        ImageAnnotation: typeof ImageAnnotation;
        UnknownAnnotation: typeof UnknownAnnotation;
        WidgetAnnotation: typeof WidgetAnnotation;
        MediaAnnotation: typeof MediaAnnotation;
        /**
         * Annotation serializer. Converts one of the supported {@link PSPDFKit.Annotations} to InstantJSON compliant objects.
         * @public
         * @function toSerializableObject
         * @memberof PSPDFKit.Annotations
         * @param {AnnotationsUnion}
         * @returns {object}
         */
        toSerializableObject: typeof serializeAnnotation;
        /**
         * Annotation deserializer. Converts an annotation object to a {@link AnnotationsUnion}.
         * @public
         * @function fromSerializableObject
         * @memberof PSPDFKit.Annotations
         * @param {object} annotation Serialized Annotation
         * @returns {AnnotationsUnion}
         */
        fromSerializableObject: <K extends AnnotationJSONUnion | AnnotationsBackendJSONUnion>(annotation: K) => AnnotationJSONToAnnotation<K>;
        /**
         * Annotation free rotate helper. Rotates a {@link AnnotationsUnion} by the provided angle in degrees,
         * counter-clockwise. It only works with free rotatable annotations, such as {@link PSPDFKit.Annotations.TextAnnotation},
         * {@link PSPDFKit.Annotations.ImageAnnotation} and {@link PSPDFKit.Annotations.StampAnnotation}.
         *
         * In order to rotate an annotation it's not enough to just change the rotation property. The annotation's
         * bounding box need to be resized and repositioned as well so as to fit the rotated content inside.
         *
         * This helper facilitates this task by updating both the rotation property and the bounding box.
         * @example <caption>Rotate a text annotation to 110 degrees.</caption>
         * const annotation = new PSPDFKit.Annotations.TextAnnotation({
         *   text: `This is a test text for rotating
         * an annotation to 110 degrees.`,
         *   boundingBox: new PSPDFKit.Geometry.Rect({
         *     x: 300,
         *     y: 300,
         *     width: 246,
         *     height: 44
         *   }),
         *   fontSize: 18,
         *   font: "Helvetica"
         * });
         * const rotatedAnnotation = PSPDFKit.Annotations.rotate(
         *   annotation,
         *   110
         * );
         * instance.create(rotatedAnnotation.set('pageIndex', 0));
         *
         * There is an edge case where the original annotation is already rotated by a multiple of 45 degrees. In this case
         * it's not possible to figure out the dimensions of the content, which will default to a square that fits in the bounding box.
         * In order to use the correct content dimensions, you can optionally provide a {@link PSPDFKit.Geometry.Size} object
         * that specifies the content's width and height, which should fit in the annotation's bounding box when using the
         * annotation rotation.
         *
         * For cases when the original annotation is rotated by any other angle, the content dimensions are calculated automatically,
         * but you can still provide this object if the annotation's bounding box does not correctly bound the content, so as to obtain
         * an annotation with a correctly bounding box as a result.
         * @example <caption>Rotate a 45 degree rotated annotation to 60 degrees.</caption>
         * const rotated45Annotation = new PSPDFKit.Annotations.TextAnnotation({
         *   text: `This is a test text for a 45
         * degree rotated text annotation.`,
         *   rotation: 45,
         *   boundingBox: new PSPDFKit.Geometry.Rect({
         *     x: 300,
         *     y: 300,
         *     width: 348,
         *     height: 348
         *   }),
         *   fontSize: 18,
         *   font: "Helvetica"
         * });
         * const rotated60Annotation = PSPDFKit.Annotations.rotate(
         *   rotated45Annotation,
         *   60,
         *   new PSPDFKit.Geometry.Size({ width: 246, height: 44 })
         * );
         * instance.create(rotated60Annotation.set('pageIndex', 0));
         *
         * This helper does not check if the resulting rotated annotation overflows the page limits.
         * @public
         * @function rotate
         * @memberof PSPDFKit.Annotations
         * @param {PSPDFKit.Annotations.TextAnnotation | PSPDFKit.Annotations.ImageAnnotation | PSPDFKit.Annotations.StampAnnotation}
         * @param {number} rotation Rotation angle in degrees
         * @param {?PSPDFKit.Geometry.Size} contentSize Size of the annotation's content for annotations rotated a in multiple of 45 degrees.
         * @returns {PSPDFKit.Annotations.TextAnnotation | PSPDFKit.Annotations.ImageAnnotation | PSPDFKit.Annotations.StampAnnotation}
         */
        rotate: (annotation: RotatableAnnotation, rotation: number, contentSize?: Size) => RotatableAnnotation;
    };
    /**
     * Annotation Presets API.
     * @public
     * @summary annotation presets namespace.
     * @namespace PSPDFKit.AnnotationPresets
     */
    AnnotationPresets: {
        /**
         * Annotation preset serializer. Converts a {@link PSPDFKit.AnnotationPreset} to an object.
         * @public
         * @function toSerializableObject
         * @memberof PSPDFKit.AnnotationPresets
         * @param {PSPDFKit.AnnotationPreset} preset Annotation preset to serialize.
         * @returns {object}
         */
        toSerializableObject: typeof serializePreset;
        /**
         * Annotation preset deserializer. Converts an annotation preset object to a {@link PSPDFKit.AnnotationPreset}.
         * @public
         * @function fromSerializableObject
         * @memberof PSPDFKit.AnnotationPresets
         * @param {object} - Serialized annotation preset to rebuild.
         * @returns {PSPDFKit.AnnotationPreset}
         */
        fromSerializableObject: typeof unserializePreset;
    };
    Comment: typeof Comment;
    Bookmark: typeof Bookmark;
    CustomOverlayItem: typeof CustomOverlayItem;
    OutlineElement: typeof OutlineElement;
    /**
     * Form fields API (with all available types). All classes are based on
     * [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record).
     *
     * Form fields may only be created or modified if the Form Creator component
     * is included in the license.
     * @public
     * @summary PDF form field types.
     * @namespace PSPDFKit.FormFields
     */
    FormFields: {
        FormField: typeof FormField;
        ButtonFormField: typeof ButtonFormField;
        CheckBoxFormField: typeof CheckBoxFormField;
        ChoiceFormField: typeof ChoiceFormField;
        ComboBoxFormField: typeof ComboBoxFormField;
        ListBoxFormField: typeof ListBoxFormField;
        RadioButtonFormField: typeof RadioButtonFormField;
        TextFormField: typeof TextFormField;
        SignatureFormField: typeof SignatureFormField;
        /**
         * Form field serializer. Converts one of the supported {@link PSPDFKit.FormFields} to InstantJSON compliant objects.
         * @public
         * @function toSerializableObject
         * @memberof PSPDFKit.FormFields
         * @param {PSPDFKit.FormFields.FormField}
         * @returns {object}
         */
        toSerializableObject: typeof serializeFormField;
        /**
         * FormField deserializer. Converts a form field InstantJSON object to a {@link PSPDFKit.FormFields.FormField}.
         * @public
         * @function fromSerializableObject
         * @memberof PSPDFKit.FormFields
         * @param {object} formField Serialized FormField
         * @returns {PSPDFKit.FormFields.FormField}
         */
        fromSerializableObject: (formField: FormFieldJSON) => FormField;
    };
    FormFieldValue: typeof FormFieldValue;
    FormOption: typeof FormOption;
    Callout: typeof Callout;
    Color: typeof Color;
    Instance: typeof Instance;
    preloadWorker: typeof preloadWorker;
    load: typeof load;
    unload: typeof unload;
    loadTextComparison: typeof loadTextComparison;
    convertToOffice: typeof convertToOffice;
    convertToPDF: typeof convertToPDF;
    populateDocumentTemplate: typeof populateDocumentTemplate;
    build: typeof build;
    Error: any;
    SaveError: typeof PSPDFKitSaveError;
    ViewState: typeof ViewState;
    PageInfo: typeof PageInfo;
    TextLine: typeof TextLine;
    InstantClient: typeof InstantClient;
    TextSelection: typeof PublicTextSelection;
    SearchResult: typeof SearchResult;
    SearchState: typeof SearchState;
    HighlightState: typeof HighlightState;
    AutoSaveMode: {
        readonly IMMEDIATE: "IMMEDIATE";
        readonly INTELLIGENT: "INTELLIGENT";
        readonly DISABLED: "DISABLED";
    };
    SignatureSaveMode: {
        readonly ALWAYS: "ALWAYS";
        readonly NEVER: "NEVER";
        readonly USING_UI: "USING_UI";
    };
    LayoutMode: {
        readonly SINGLE: "SINGLE";
        readonly DOUBLE: "DOUBLE";
        readonly AUTO: "AUTO";
    };
    PrintMode: {
        readonly DOM: "DOM";
        readonly EXPORT_PDF: "EXPORT_PDF";
    };
    PrintQuality: {
        readonly LOW: "LOW";
        readonly MEDIUM: "MEDIUM";
        readonly HIGH: "HIGH";
    };
    ScrollMode: {
        readonly CONTINUOUS: "CONTINUOUS";
        readonly PER_SPREAD: "PER_SPREAD";
        readonly DISABLED: "DISABLED";
    };
    ZoomMode: {
        readonly AUTO: "AUTO";
        readonly FIT_TO_WIDTH: "FIT_TO_WIDTH";
        readonly FIT_TO_VIEWPORT: "FIT_TO_VIEWPORT";
        readonly CUSTOM: "CUSTOM";
    };
    InteractionMode: {
        readonly TEXT_HIGHLIGHTER: "TEXT_HIGHLIGHTER";
        readonly INK: "INK";
        readonly INK_SIGNATURE: "INK_SIGNATURE";
        readonly SIGNATURE: "SIGNATURE";
        readonly STAMP_PICKER: "STAMP_PICKER";
        readonly STAMP_CUSTOM: "STAMP_CUSTOM";
        readonly SHAPE_LINE: "SHAPE_LINE";
        readonly SHAPE_RECTANGLE: "SHAPE_RECTANGLE";
        readonly SHAPE_ELLIPSE: "SHAPE_ELLIPSE";
        readonly SHAPE_POLYGON: "SHAPE_POLYGON";
        readonly SHAPE_POLYLINE: "SHAPE_POLYLINE";
        readonly INK_ERASER: "INK_ERASER";
        readonly NOTE: "NOTE";
        readonly COMMENT_MARKER: "COMMENT_MARKER";
        readonly TEXT: "TEXT";
        readonly CALLOUT: "CALLOUT";
        readonly PAN: "PAN";
        readonly SEARCH: "SEARCH";
        readonly DOCUMENT_EDITOR: "DOCUMENT_EDITOR";
        readonly MARQUEE_ZOOM: "MARQUEE_ZOOM";
        readonly REDACT_TEXT_HIGHLIGHTER: "REDACT_TEXT_HIGHLIGHTER";
        readonly REDACT_SHAPE_RECTANGLE: "REDACT_SHAPE_RECTANGLE";
        readonly DOCUMENT_CROP: "DOCUMENT_CROP";
        readonly BUTTON_WIDGET: "BUTTON_WIDGET";
        readonly TEXT_WIDGET: "TEXT_WIDGET";
        readonly RADIO_BUTTON_WIDGET: "RADIO_BUTTON_WIDGET";
        readonly CHECKBOX_WIDGET: "CHECKBOX_WIDGET";
        readonly COMBO_BOX_WIDGET: "COMBO_BOX_WIDGET";
        readonly LIST_BOX_WIDGET: "LIST_BOX_WIDGET";
        readonly SIGNATURE_WIDGET: "SIGNATURE_WIDGET";
        readonly DATE_WIDGET: "DATE_WIDGET";
        readonly FORM_CREATOR: "FORM_CREATOR";
        readonly LINK: "LINK";
        readonly DISTANCE: "DISTANCE";
        readonly PERIMETER: "PERIMETER";
        readonly RECTANGLE_AREA: "RECTANGLE_AREA";
        readonly ELLIPSE_AREA: "ELLIPSE_AREA";
        readonly POLYGON_AREA: "POLYGON_AREA";
        readonly CONTENT_EDITOR: "CONTENT_EDITOR";
        readonly MULTI_ANNOTATIONS_SELECTION: "MULTI_ANNOTATIONS_SELECTION";
        readonly MEASUREMENT: "MEASUREMENT";
        readonly MEASUREMENT_SETTINGS: "MEASUREMENT_SETTINGS";
        readonly ATTACHMENT_PREVIEW: "ATTACHMENT_PREVIEW";
    };
    unstable_InkEraserMode: {
        readonly POINT: "POINT";
        readonly STROKE: "STROKE";
    };
    SidebarMode: {
        readonly ANNOTATIONS: "ANNOTATIONS";
        readonly BOOKMARKS: "BOOKMARKS";
        readonly DOCUMENT_OUTLINE: "DOCUMENT_OUTLINE";
        readonly THUMBNAILS: "THUMBNAILS";
        readonly SIGNATURES: "SIGNATURES";
        readonly LAYERS: "LAYERS";
        readonly ATTACHMENTS: "ATTACHMENTS";
        readonly CUSTOM: "CUSTOM";
    };
    UIElement: {
        readonly Sidebar: "Sidebar";
    };
    Alignment: {
        readonly START: "START";
        readonly END: "END";
    };
    BlendMode: {
        readonly normal: "normal";
        readonly multiply: "multiply";
        readonly screen: "screen";
        readonly overlay: "overlay";
        readonly darken: "darken";
        readonly lighten: "lighten";
        readonly colorDodge: "colorDodge";
        readonly colorBurn: "colorBurn";
        readonly hardLight: "hardLight";
        readonly softLight: "softLight";
        readonly difference: "difference";
        readonly exclusion: "exclusion";
    };
    BorderStyle: {
        readonly solid: "solid";
        readonly dashed: "dashed";
        readonly beveled: "beveled";
        readonly inset: "inset";
        readonly underline: "underline";
    };
    LineCap: {
        readonly square: "square";
        readonly circle: "circle";
        readonly diamond: "diamond";
        readonly openArrow: "openArrow";
        readonly closedArrow: "closedArrow";
        readonly butt: "butt";
        readonly reverseOpenArrow: "reverseOpenArrow";
        readonly reverseClosedArrow: "reverseClosedArrow";
        readonly slash: "slash";
    };
    SidebarPlacement: {
        readonly START: "START";
        readonly END: "END";
    };
    SignatureAppearanceMode: {
        readonly signatureOnly: "signatureOnly";
        readonly signatureAndDescription: "signatureAndDescription";
        readonly descriptionOnly: "descriptionOnly";
    };
    ShowSignatureValidationStatusMode: {
        readonly IF_SIGNED: "IF_SIGNED";
        readonly HAS_WARNINGS: "HAS_WARNINGS";
        readonly HAS_ERRORS: "HAS_ERRORS";
        readonly NEVER: "NEVER";
    };
    NoteIcon: {
        readonly COMMENT: "COMMENT";
        readonly RIGHT_POINTER: "RIGHT_POINTER";
        readonly RIGHT_ARROW: "RIGHT_ARROW";
        readonly CHECK: "CHECK";
        readonly CIRCLE: "CIRCLE";
        readonly CROSS: "CROSS";
        readonly INSERT: "INSERT";
        readonly NEW_PARAGRAPH: "NEW_PARAGRAPH";
        readonly NOTE: "NOTE";
        readonly PARAGRAPH: "PARAGRAPH";
        readonly HELP: "HELP";
        readonly STAR: "STAR";
        readonly KEY: "KEY";
    };
    Theme: {
        readonly LIGHT: "LIGHT";
        readonly DARK: "DARK";
        readonly AUTO: "AUTO";
    };
    ToolbarPlacement: {
        readonly TOP: "TOP";
        readonly BOTTOM: "BOTTOM";
    };
    ElectronicSignatureCreationMode: {
        readonly DRAW: "DRAW";
        readonly IMAGE: "IMAGE";
        readonly TYPE: "TYPE";
    };
    I18n: {
        readonly locales: string[];
        readonly messages: Record<string, Record<string, string>>;
        readonly preloadLocalizationData: (locale: string, options?: {
            baseUrl?: string | undefined;
        }) => Promise<void>;
    };
    baseUrl: string | undefined;
    DocumentIntegrityStatus: {
        readonly ok: "ok";
        readonly tampered_document: "tampered_document";
        readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
        readonly failed_to_retrieve_byterange: "failed_to_retrieve_byterange";
        readonly failed_to_compute_digest: "failed_to_compute_digest";
        readonly failed_retrieve_signing_certificate: "failed_retrieve_signing_certificate";
        readonly failed_retrieve_public_key: "failed_retrieve_public_key";
        readonly failed_encryption_padding: "failed_encryption_padding";
        readonly tampered_or_invalid_timestamp: "tampered_or_invalid_timestamp";
        readonly general_failure: "general_failure";
    };
    SignatureValidationStatus: {
        readonly valid: "valid";
        readonly warning: "warning";
        readonly error: "error";
    };
    SignatureType: {
        CMS: string;
        CAdES: string;
    };
    SignatureContainerType: {
        raw: string;
        pkcs7: string;
    };
    PAdESLevel: {
        readonly b_b: "b-b";
        readonly b_t: "b-t";
        readonly b_lt: "b-lt";
    };
    CertificateChainValidationStatus: {
        readonly ok: "ok";
        readonly ok_but_self_signed: "ok_but_self_signed";
        readonly ok_but_could_not_check_revocation: "ok_but_could_not_check_revocation";
        readonly untrusted: "untrusted";
        readonly expired: "expired";
        readonly not_yet_valid: "not_yet_valid";
        readonly invalid: "invalid";
        readonly revoked: "revoked";
        readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
        readonly general_validation_problem: "general_validation_problem";
    };
    DocumentValidationStatus: {
        valid: string;
        warning: string;
        error: string;
        not_signed: string;
    };
    AnnotationsWillChangeReason: typeof AnnotationsWillChangeReason;
    DocumentComparisonSourceType: {
        readonly USE_OPEN_DOCUMENT: "USE_OPEN_DOCUMENT";
        readonly USE_FILE_DIALOG: "USE_FILE_DIALOG";
    };
    MeasurementScaleUnitFrom: {
        readonly INCHES: "in";
        readonly MILLIMETERS: "mm";
        readonly CENTIMETERS: "cm";
        readonly POINTS: "pt";
    };
    MeasurementScaleUnitTo: {
        readonly INCHES: "in";
        readonly MILLIMETERS: "mm";
        readonly CENTIMETERS: "cm";
        readonly POINTS: "pt";
        readonly FEET: "ft";
        readonly METERS: "m";
        readonly YARDS: "yd";
        readonly KILOMETERS: "km";
        readonly MILES: "mi";
    };
    MeasurementPrecision: {
        readonly WHOLE: "whole";
        readonly ONE: "oneDp";
        readonly TWO: "twoDp";
        readonly THREE: "threeDp";
        readonly FOUR: "fourDp";
        readonly HALVES: "1/2";
        readonly QUARTERS: "1/4";
        readonly EIGHTHS: "1/8";
        readonly SIXTEENTHS: "1/16";
    };
    MeasurementScale: typeof MeasurementScale;
    ProductId: {
        SharePoint: string;
        Salesforce: string;
        Maui_Android: string;
        Maui_iOS: string;
        Maui_MacCatalyst: string;
        Maui_Windows: string;
        FlutterForWeb: string;
        Electron: string;
    };
    ProcessorEngine: {
        smallerSize: string;
        fasterProcessing: string;
    };
    Conformance: {
        readonly PDFA_1A: "pdfa-1a";
        readonly PDFA_1B: "pdfa-1b";
        readonly PDFA_2A: "pdfa-2a";
        readonly PDFA_2U: "pdfa-2u";
        readonly PDFA_2B: "pdfa-2b";
        readonly PDFA_3A: "pdfa-3a";
        readonly PDFA_3U: "pdfa-3u";
        readonly PDFA_3B: "pdfa-3b";
        readonly PDFA_4: "pdfa-4";
        readonly PDFA_4E: "pdfa-4e";
        readonly PDFA_4F: "pdfa-4f";
    };
    DocumentPermissions: {
        readonly annotationsAndForms: "annotationsAndForms";
        readonly assemble: "assemble";
        readonly extract: "extract";
        readonly extractAccessibility: "extractAccessibility";
        readonly fillForms: "fillForms";
        readonly modification: "modification";
        readonly printHighQuality: "printHighQuality";
        readonly printing: "printing";
    };
    ComparisonOperation: typeof ComparisonOperation;
    DocumentDescriptor: typeof DocumentDescriptor;
    ComparisonOperationType: {
        readonly TEXT: "text";
        readonly AI: "ai";
    };
    OfficeDocumentFormat: {
        docx: string;
        xlsx: string;
        pptx: string;
    };
    WheelZoomMode: {
        readonly WITH_CTRL: "WITH_CTRL";
        readonly ALWAYS: "ALWAYS";
        readonly DISABLED: "DISABLED";
    };
    AIComparisonOperationType: {
        readonly ANALYZE: "analyze";
        readonly TAG: "tag";
    };
    /**
     * Merges the properties extracted from the location.hash into the {@link PSPDFKit.ViewState}.
     *
     * Properties will be extracted following the [PDF Open Parameters spec](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDFOpenParameters.pdf).
     *
     * Currently, we only support the `page` parameter.
     * @public
     * @function viewStateFromOpenParameters
     * @memberof PSPDFKit
     * @param {PSPDFKit.ViewState}
     * @returns {PSPDFKit.ViewState}
     */
    viewStateFromOpenParameters: typeof viewStateFromOpenParameters;
    readonly defaultElectronicSignatureColorPresets: ColorPreset[];
    readonly defaultToolbarItems: readonly [{
        readonly type: "sidebar-thumbnails";
    }, {
        readonly type: "sidebar-document-outline";
    }, {
        readonly type: "sidebar-annotations";
    }, {
        readonly type: "sidebar-bookmarks";
    }, {
        readonly type: "sidebar-signatures";
    }, {
        readonly type: "sidebar-attachments";
    }, {
        readonly type: "sidebar-layers";
    }, {
        readonly type: "pager";
    }, {
        readonly type: "multi-annotations-selection";
    }, {
        readonly type: "pan";
    }, {
        readonly type: "zoom-out";
    }, {
        readonly type: "zoom-in";
    }, {
        readonly type: "zoom-mode";
    }, {
        readonly type: "linearized-download-indicator";
    }, {
        readonly type: "spacer";
    }, {
        readonly type: "annotate";
    }, {
        readonly type: "ink";
    }, {
        readonly type: "highlighter";
    }, {
        readonly type: "text-highlighter";
    }, {
        readonly type: "ink-eraser";
    }, {
        readonly type: "signature";
    }, {
        readonly type: "image";
    }, {
        readonly type: "stamp";
    }, {
        readonly type: "note";
    }, {
        readonly type: "text";
    }, {
        readonly type: "callout";
    }, {
        readonly type: "line";
    }, {
        readonly type: "link";
    }, {
        readonly type: "arrow";
    }, {
        readonly type: "rectangle";
    }, {
        readonly type: "ellipse";
    }, {
        readonly type: "polygon";
    }, {
        readonly type: "cloudy-polygon";
    }, {
        readonly type: "polyline";
    }, {
        readonly type: "print";
    }, {
        readonly type: "document-editor";
    }, {
        readonly type: "document-crop";
    }, {
        readonly type: "search";
    }, {
        readonly type: "export-pdf";
    }, {
        readonly type: "debug";
    }];
    readonly defaultDocumentEditorFooterItems: {
        type: BuiltInDocumentEditorFooterItem;
    }[];
    readonly defaultDocumentEditorToolbarItems: {
        type: BuiltInDocumentEditorToolbarItem;
    }[];
    readonly defaultTextComparisonToolbarItems: {
        type: string;
    }[];
    readonly defaultTextComparisonInnerToolbarItems: {
        type: string;
    }[];
    readonly defaultAnnotationPresets: {
        [key: string]: Record<string, unknown>;
    };
    readonly defaultStampAnnotationTemplates: StampAnnotation<IStampAnnotation>[];
    readonly defaultAnnotationsSidebarContent: readonly [typeof EllipseAnnotation, typeof HighlightAnnotation, typeof ImageAnnotation, typeof InkAnnotation, typeof LineAnnotation, typeof NoteAnnotation, typeof PolygonAnnotation, typeof PolylineAnnotation, typeof RectangleAnnotation, typeof SquiggleAnnotation, typeof StampAnnotation, typeof StrikeOutAnnotation, typeof TextAnnotation, typeof UnderlineAnnotation, typeof WidgetAnnotation];
    defaultEditableAnnotationTypes: readonly (typeof TextAnnotation | typeof CommentMarkerAnnotation)[];
    defaultElectronicSignatureCreationModes: readonly ("DRAW" | "TYPE" | "IMAGE")[];
    defaultSigningFonts: readonly Font[];
    Options: {
        MIN_TEXT_ANNOTATION_SIZE: number;
        MIN_INK_ANNOTATION_SIZE: number;
        MIN_SHAPE_ANNOTATION_SIZE: number;
        MIN_IMAGE_ANNOTATION_SIZE: number;
        MIN_STAMP_ANNOTATION_SIZE: number;
        MIN_WIDGET_ANNOTATION_SIZE: number;
        ENABLE_INK_SMOOTH_LINES: boolean;
        INK_EPSILON_RANGE_OPTIMIZATION: number;
        SIGNATURE_SAVE_MODE: ISignatureSaveMode;
        INITIAL_DESKTOP_SIDEBAR_WIDTH: number;
        IGNORE_DOCUMENT_PERMISSIONS: boolean;
        SELECTION_OUTLINE_PADDING: (viewportSize: Size) => number;
        RESIZE_ANCHOR_RADIUS: (viewportSize: Size) => number;
        SELECTION_STROKE_WIDTH: number;
        TEXT_ANNOTATION_AUTOFIT_TEXT_ON_EXPORT: boolean;
        TEXT_ANNOTATION_AUTOFIT_BOUNDING_BOX_ON_EDIT: boolean;
        TEXT_ANNOTATION_AUTOFIT_ON_BOTTOM_KNOB_RESIZE: boolean;
        DISABLE_KEYBOARD_SHORTCUTS: boolean;
        DEFAULT_INK_ERASER_CURSOR_WIDTH: number;
        COLOR_PRESETS: ColorPreset[];
        LINE_CAP_PRESETS: string[];
        LINE_WIDTH_PRESETS: number[] | null | undefined;
        HIGHLIGHT_COLOR_PRESETS: ColorPreset[];
        TEXT_MARKUP_COLOR_PRESETS: ColorPreset[];
        NOTE_COLOR_PRESETS: ColorPreset[];
        PDF_JAVASCRIPT: boolean;
        BREAKPOINT_MD_TOOLBAR: number;
        BREAKPOINT_SM_TOOLBAR: number;
        ANNOTATION_TOOLBAR_RESPONSIVE_BREAKPOINT: number;
    };
    SearchPattern: {
        readonly CREDIT_CARD_NUMBER: "credit_card_number";
        readonly DATE: "date";
        readonly TIME: "time";
        readonly EMAIL_ADDRESS: "email_address";
        readonly INTERNATIONAL_PHONE_NUMBER: "international_phone_number";
        readonly IP_V4: "ipv4";
        readonly IP_V6: "ipv6";
        readonly MAC_ADDRESS: "mac_address";
        readonly NORTH_AMERICAN_PHONE_NUMBER: "north_american_phone_number";
        readonly SOCIAL_SECURITY_NUMBER: "social_security_number";
        readonly URL: "url";
        readonly US_ZIP_CODE: "us_zip_code";
        readonly VIN: "vin";
    };
    SearchType: {
        readonly TEXT: "text";
        readonly PRESET: "preset";
        readonly REGEX: "regex";
    };
    UIDateTimeElement: {
        readonly COMMENT_THREAD: "COMMENT_THREAD";
        readonly ANNOTATIONS_SIDEBAR: "ANNOTATIONS_SIDEBAR";
    };
    /**
     * Generates a new unique ID usable as an ID of annotation, formField, bookmark or comment.
     * @public
     * @function generateInstantId
     * @memberof PSPDFKit
     * @returns {string} A unique identifier.
     */
    generateInstantId: typeof generateInstantId;
    Font: typeof Font;
};

type _Interfaces = Record<string, string>;
type ContentEditing = {
    TextBlock: TextBlock$1;
    UpdatedTextBlock: UpdatedTextBlock;
    Session: Session;
};

export { Action, Annotation, AnnotationsWillChangeReason, Bookmark, ButtonFormField, CheckBoxFormField, ChoiceFormField, Color, ComboBoxFormField, Comment, CommentMarkerAnnotation, Conformance, CustomOverlayItem, DrawingPoint, EllipseAnnotation, Font, FormField, FormFieldValue, FormOption, GoToAction, GoToEmbeddedAction, GoToRemoteAction, HideAction, HighlightAnnotation, HighlightState, ImageAnnotation, InkAnnotation, Inset, Instance, InstantClient, JavaScriptAction, LaunchAction, LineAnnotation, LinkAnnotation, List, ListBoxFormField, NamedAction, NoteAnnotation, OutlineElement, PageInfo, Point, PolygonAnnotation, PolylineAnnotation, RadioButtonFormField, Rect, RectangleAnnotation, RedactionAnnotation, ResetFormAction, SearchResult, SearchState, Set$1 as Set, ShapeAnnotation, SignatureFormField, Size, SquiggleAnnotation, StampAnnotation, StrikeOutAnnotation, SubmitFormAction, TextAnnotation, _default as TextComparisonConfiguration, TextComparisonInstance, TextFormField, TextLine, TextMarkupAnnotation, PublicTextSelection as TextSelection, URIAction, UnderlineAnnotation, UnknownAnnotation, ViewState, WidgetAnnotation, PSPDFKit as default };
export type { AnnotationJSONUnion, AnnotationToolbarItem, AnnotationsUnion, BuildInput, BuildInstructions, Configuration, ContentEditing, DocumentEditorFooterItem, DocumentEditorToolbarItem, EllipseAnnotationJSON, ImageAnnotationJSON, InkAnnotationJSON, _Interfaces as Interfaces, LineAnnotationJSON, MentionableUser, NoteAnnotationJSON, OfficeConversionSettings, PolygonAnnotationJSON, PolylineAnnotationJSON, ProcessingAuthPayload, RectangleAnnotationJSON, RedactionAnnotationJSON, ServerConfiguration, ShapeAnnotationsUnion, StampAnnotationJSON, StandaloneConfiguration, TemplateDataToPopulateDocument, TextAnnotationJSON, TextMarkupAnnotationJSON, TextMarkupAnnotationsUnion, ToolbarItem$1 as ToolbarItem, UnknownAnnotationJSON, WidgetAnnotationJSON };
