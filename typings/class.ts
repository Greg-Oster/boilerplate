import { ClassTransformOptions } from 'class-transformer'

export namespace ClassUtils {
    export type Plain<T> = {
        [K in keyof T]: T[K];
    }
    export type TransformOptions = ClassTransformOptions & Partial<{ maybeNull: boolean }>
}
