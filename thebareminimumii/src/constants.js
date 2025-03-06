export const LANGUAGE_VERSIONS={
    java:"15.0.2",
}

export const CODE_SNIPPETS={
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
}

export const CODE_LIBRARY = {
    helloWorld: {
        name: "Hello World",
        code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
    },
    methodsExample: {
        name: "Methods Example",
        code: `public class MethodsExample {
    public static void greet() {
        System.out.println("Hello from a method!");
    }
    public static void main(String[] args) {
        greet();
    }
}`
    },
    recursionExample: {
        name: "Recursion Example",
        code: `public class RecursionExample {
    public static int factorial(int n) {
        if (n == 1) return 1;
        return n * factorial(n - 1);
    }
    public static void main(String[] args) {
        System.out.println(factorial(5));
    }
}`
    }
};
