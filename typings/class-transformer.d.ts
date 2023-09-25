import {ClassTransformOptions, plainToInstance} from 'class-transformer';
import { ClassUtils } from "~/typings/class";

declare module 'class-transformer' {
	export declare function instanceToPlain<T>(object: T, options?: ClassTransformOptions): ClassUtils.Plain<T>;
	export declare function instanceToPlain<T>(object: T[], options?: ClassTransformOptions): ClassUtils.Plain<T>[];
}
