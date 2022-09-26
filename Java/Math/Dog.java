package Java.Math;

public class Dog {
    // Two Functions that will be later used to transform the values of age
    public static double toDogAge(double n){
        // human_age = 16ln(dog_age) + 31
        // e^(human_age - 31)/(16) = dog age
            return Math.exp((double)(n-31)/16);
    }

    public static double toHumanAge(double n){
        // human_age = 16ln(dog_age) + 31
        return 16*Math.log(n) + 31;
    }
}