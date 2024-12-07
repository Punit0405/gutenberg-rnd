export declare const TOKENS: Record<string, RegExp>;
export declare const TRIM_TOKENS: Set<string>;
export declare const RECURSIVE_PSEUDO_CLASSES: Set<string>;
export declare const RECURSIVE_PSEUDO_CLASSES_ARGS: Record<string, RegExp>;
export declare function gobbleParens(text: string, offset: number): string;
export declare function tokenizeBy(text: string, grammar?: Record<string, RegExp>): Token[];
export declare function tokenize(selector: string, grammar?: Record<string, RegExp>): Token[];
/**
 * Traverse an AST in depth-first order
 */
export declare function flatten(node: AST, 
/**
 * @internal
 */
parent?: AST): IterableIterator<[Token, AST | undefined]>;
/**
 * Traverse an AST (or part thereof), in depth-first order
 */
export declare function walk(node: AST | undefined, visit: (node: AST, parentNode?: AST) => void, 
/**
 * @internal
 */
parent?: AST): void;
export interface ParserOptions {
    recursive?: boolean;
    list?: boolean;
}
/**
 * Parse a CSS selector
 *
 * @param selector - The selector to parse
 * @param options.recursive - Whether to parse the arguments of pseudo-classes like :is(), :has() etc. Defaults to true.
 * @param options.list - Whether this can be a selector list (A, B, C etc). Defaults to true.
 */
export declare function parse(selector: string, { recursive, list }?: ParserOptions): AST | undefined;
/**
 * Converts the given list or (sub)tree to a string.
 */
export declare function stringify(listOrNode: Token[] | AST): string;
/**
 * To convert the specificity array to a number
 */
export declare function specificityToNumber(specificity: number[], base: number): number;
/**
 * Calculate specificity of a selector.
 *
 * If the selector is a list, the max specificity is returned.
 */
export declare function specificity(selector: string | AST): number[];
export interface BaseToken {
    type: string;
    content: string;
    pos: [number, number];
}
export interface CommaToken extends BaseToken {
    type: 'comma';
}
export interface CombinatorToken extends BaseToken {
    type: 'combinator';
}
export interface NamedToken extends BaseToken {
    name: string;
}
export interface IdToken extends NamedToken {
    type: 'id';
}
export interface ClassToken extends NamedToken {
    type: 'class';
}
export interface PseudoElementToken extends NamedToken {
    type: 'pseudo-element';
    argument?: string;
}
export interface PseudoClassToken extends NamedToken {
    type: 'pseudo-class';
    argument?: string;
    subtree?: AST;
}
export interface NamespacedToken extends BaseToken {
    namespace?: string;
}
export interface UniversalToken extends NamespacedToken {
    type: 'universal';
}
export interface AttributeToken extends NamespacedToken, NamedToken {
    type: 'attribute';
    operator?: string;
    value?: string;
    caseSensitive?: 'i' | 'I' | 's' | 'S';
}
export interface TypeToken extends NamespacedToken, NamedToken {
    type: 'type';
}
export interface UnknownToken extends BaseToken {
    type: never;
}
export type Token = AttributeToken | IdToken | ClassToken | CommaToken | CombinatorToken | PseudoElementToken | PseudoClassToken | UniversalToken | TypeToken | UnknownToken;
export interface Complex {
    type: 'complex';
    combinator: string;
    right: AST;
    left: AST;
}
export interface Relative {
    type: 'relative';
    combinator: string;
    right: AST;
}
export interface Compound {
    type: 'compound';
    list: Token[];
}
export interface List {
    type: 'list';
    list: AST[];
}
export type AST = Complex | Relative | Compound | List | Token;
