import type { TreeNode } from 'primevue/treenode';

interface FieldOptions {
    key: string;
    label: string;
    children: string;
}

function treeToPrimeTreeLocal(
    tree: Record<string, any>[],
    fieldOptions: FieldOptions,
    parentKey?: string
): TreeNode[] {
    const { children: childrenField, key: keyField, label: labelField } = fieldOptions;

    return tree.map((item) => {
        let key = item[keyField].toString();
        key = parentKey ? `${parentKey}-${key}` : key;
        const label = item[labelField];
        const children = item[childrenField];

        const isValidChildren = Array.isArray(children) && children.length > 0;
        return {
            key,
            label,
            children: isValidChildren ? treeToPrimeTreeLocal(children, fieldOptions, key) : [],
        };
    });
}

export function treeToPrimeTree(tree: Record<string, any>[], fieldOptions: FieldOptions) {
    return treeToPrimeTreeLocal(tree, fieldOptions);
}
