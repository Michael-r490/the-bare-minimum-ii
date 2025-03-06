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
    classesAndObjects: {
        name: "Classes and Objects",
        code: `class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void introduce() {
        System.out.println("Hi, my name is " + name + " and I'm " + age + " years old.");
    }

    public static void main(String[] args) {
        Person person1 = new Person("Alice", 25);
        person1.introduce();
    }
}`
    },
    inheritanceExample: {
        name: "Inheritance",
        code: `public class InheritanceExample {

    static class Animal {
        void sound() {
            System.out.println("Animal makes a sound");
        }
    }

    static class Dog extends Animal {
        void sound() {
            System.out.println("Dog barks");
        }
    }

    public static void main(String[] args) {
        Animal myAnimal = new Animal();
        Animal myDog = new Dog();

        myAnimal.sound();  // Output: Animal makes a sound
        myDog.sound();     // Output: Dog barks
    }
}
`
    },
    recursionExample: {
        name: "Recursion",
        code: `public class RecursionExample {
    public static int factorial(int n) {
        if (n == 1) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        int result = factorial(5);
        System.out.println("Factorial of 5: " + result);
    }
}`
    },
    bubbleSort: {
        name: "Bubble Sort",
        code: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        bubbleSort(arr);

        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`
    }
};

